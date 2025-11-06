import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import { fetchProductsByCategory } from "../../store/slices/fetchapiSlice";
import SkeletonLoader from "../skeletonLoader/CatagoriesSkeletonloader";
import { type Product as ProductType } from "../../type/Product";
import ProductItem from "../products/Product";
import "./catagories.css";

interface CategoryProductsProps {
  category?: string;
}

const CategoryProducts: React.FC<CategoryProductsProps> = ({ category }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { product, productByCategory } = useSelector(
    (state: RootState) => state.fetchapi
  );

  const [sortedProducts, setSortedProducts] = useState<ProductType[]>([]);
  const [sortOption, setSortOption] = useState("best-match");

  // Load products from Redux
  useEffect(() => {
    console.log(category, productByCategory.status);
    if (!category || category === "all") {
      return;
    } else {
      if (category && productByCategory.status === "idle")
        dispatch(fetchProductsByCategory(category));
    }
  }, [category, dispatch, productByCategory.status]);

  // Sync with Redux data
  useEffect(() => {
    const productsData =
      !category || category === "all" ? product.data : productByCategory.data;

    setSortedProducts(productsData);
  }, [product.data, productByCategory.data, category]);

  const loading =
    !category || category === "all"
      ? product.status === "loading"
      : productByCategory.status === "loading";

  // Sorting logic
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setSortOption(selected);

    let sorted = [...sortedProducts];

    if (selected === "price-low-to-high") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (selected === "price-high-to-low") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (selected === "top-rated") {
      sorted.sort((a, b) => b.rating.rate - a.rating.rate);
    } else {
      // reset to default ordering
      const productsData =
        !category || category === "all" ? product.data : productByCategory.data;
      sorted = [...productsData];
    }

    setSortedProducts(sorted);
  };

  const headingText = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "All Products";

  return (
    <div className="all-categories-container">
      <div className="all-categories-header">
        <div className="heading">
          <h1>{headingText}</h1>
          <p>Browse our complete collection of products</p>
        </div>
        <div className="filter-button">
          <select value={sortOption} onChange={handleSortChange}>
            <option value="best-match">Best Match</option>
            <option value="price-low-to-high">Price low to high</option>
            <option value="price-high-to-low">Price high to low</option>
            <option value="top-rated">Top Rated</option>
          </select>
        </div>
      </div>

      <div className="products-grid">
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <SkeletonLoader key={index} />
          ))
        ) : sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))
        ) : (
          <p className="no-products">No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
