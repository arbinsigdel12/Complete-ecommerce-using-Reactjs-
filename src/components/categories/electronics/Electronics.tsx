import React, { useEffect, useState } from "react";
import Product from "../../products/Product";
import "./electronics.css";

interface ProductType {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: { rate: number; count: number };
}

const Electronics: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [filter, setFilter] = useState("best-match");

  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://fakestoreapi.com/products/category/electronics"
      );
      const data: ProductType[] = await res.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setFilter(selected);

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

    setFilteredProducts(sorted);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div className="all-categories-container">
      <div className="all-categories-header">
        <div className="heading">
          <h1>Electronics</h1>
          <p>Browse our complete collection of products</p>
        </div>
        <div className="filter-button">
          <select value={filter} onChange={handleFilterChange}>
            <option value="best-match">Best Match</option>
            <option value="price-low-to-high">Price low to high</option>
            <option value="price-high-to-low">Price high to low</option>
            <option value="top-rated">Top Rated</option>
          </select>
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Electronics;
