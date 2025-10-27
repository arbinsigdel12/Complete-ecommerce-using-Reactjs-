import React, { useEffect, useState } from "react";
import Product from "../../products/Product";
import "../catagories.css";
import { fetchProductsByCategory } from "../../../services/product.services";

interface ProductType {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: { rate: number; count: number };
}

const SkeletonLoader = () => (
  <div className="skeleton-grid">
    {Array.from({ length: 8 }).map((_, index) => (
      <div key={index} className="skeleton-card">
        <div className="skeleton-image"></div>
        <div className="skeleton-content">
          <div className="skeleton-title"></div>
          <div className="skeleton-title short"></div>
          <div className="skeleton-price"></div>
          <div className="skeleton-rating"></div>
        </div>
      </div>
    ))}
  </div>
);

const Electronics: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [sortedProducts, setSortedProducts] = useState<ProductType[]>([]);
  const [sortOption, setSortOption] = useState("best-match");

  useEffect(() => {
    const loadData = async () => {
      try {
        const data: ProductType[] = await fetchProductsByCategory(
          "electronics"
        );
        setProducts(data);
        setSortedProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };
    loadData();
  }, []);

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

  return (
    <div className="all-categories-container">
      <div className="all-categories-header">
        <div className="heading">
          <h1>Electronics</h1>
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
      {loading ? (
        <SkeletonLoader />
      ) : (
        <div className="products-grid">
          {sortedProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Electronics;
