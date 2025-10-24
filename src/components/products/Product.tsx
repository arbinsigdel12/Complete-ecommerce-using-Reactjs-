import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Product.css";

interface ProductProps {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: { rate: number; count: number };
}

const Product: React.FC<{ product: ProductProps }> = ({ product }) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const rounded = Math.round(rating);
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rounded ? <FaStar key={i} /> : <FaRegStar key={i} />);
    }
    return stars;
  };

  return (
    <div className="product-card" key={product.id}>
      <img src={product.image} alt={product.title} />
      <div className="product-info">
        <h3>
          {product.title.length > 20
            ? product.title.slice(0, 15) + "..."
            : product.title}
        </h3>
        <p className="price">${product.price.toFixed(2)}</p>
        <div className="rating">
          {renderStars(product.rating.rate)}
          <span>({product.rating.count})</span>
        </div>

        {/*Link to detail page */}
        <Link to={`/product/${product.id}`}>
          <button className="details-btn">View Details</button>
        </Link>
      </div>
    </div>
  );
};

export default Product;
