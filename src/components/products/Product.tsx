import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Product.css";
import { useAppDispatch } from "../../hooks/redux";
import { addToCart } from "../../store/slices/cartSlice";

interface ProductProps {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: { rate: number; count: number };
}

const Product: React.FC<{ product: ProductProps }> = ({ product }) => {
  const dispatch = useAppDispatch();

  const renderStars = (rating: number) => {
    const stars = [];
    const rounded = Math.round(rating);
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rounded ? <FaStar key={i} /> : <FaRegStar key={i} />);
    }
    return stars;
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      })
    );
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-content">
        <img src={product.image} alt={product.title} />
        <div className="product-info">
          <h3>{product.title}</h3>
          <p className="price">${product.price.toFixed(2)}</p>
          <div className="rating">
            {renderStars(product.rating.rate)}
            <span>({product.rating.count})</span>
          </div>
        </div>
      </div>
      <button className="details-btn" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </Link>
  );
};

export default Product;
