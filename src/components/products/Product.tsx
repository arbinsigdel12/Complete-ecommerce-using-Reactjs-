import React from "react";
import "./Product.css";

interface ProductProps {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: { rate: number; count: number };
}

const Product: React.FC<{ product: ProductProps }> = ({ product }) => {
  return (
    <div className="product-card" key={product.id}>
      <img src={product.image} alt={product.title} />
      <div className="product-info">
        <h3>
          {product.title.length > 20
            ? product.title.slice(0, 20) + "..."
            : product.title}
        </h3>
        <p className="price">${product.price.toFixed(2)}</p>
        <div className="rating">
          {"⭐".repeat(Math.round(product.rating.rate))}{" "}
          <span>({product.rating.count})</span>
        </div>
        <button className="details-btn">View Details</button>
      </div>
    </div>
  );
};

export default Product;
