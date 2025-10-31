import React, { useEffect, useState } from "react";
import {
  fetchAllProducts,
  fetchProductsByCategory,
} from "../../services/product.services";
import SkeletonLoader from "../skeletonLoader/CatagoriesSkeletonloader";
import { type Product as ProductType } from "../../type/Product";
import ProductItem from "../products/Product";
import "./catagories.css";
interface CategoryProductsProps {
  category?: string;
}

const CategoryProducts: React.FC<CategoryProductsProps> = ({ category }) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [sortedProducts, setSortedProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("best-match");

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        let data: ProductType[] = [];
        if (!category || category === "all") {
          data = await fetchAllProducts();
        } else {
          data = await fetchProductsByCategory(category);
        }
        setProducts(data);
        setSortedProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [category]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setSortOption(selected);

    let sorted = [...products];

    if (selected === "price-low-to-high") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (selected === "price-high-to-low") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (selected === "top-rated") {
      sorted.sort((a, b) => b.rating.rate - a.rating.rate);
    } else {
      sorted = [...products];
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

      {/* Products grid or skeleton */}
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
