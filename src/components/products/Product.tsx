import React from "react";
import { renderStars } from "../../utils/renderstar";
import { Link } from "react-router-dom";
import "./product.css";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
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
  const cartItems = useAppSelector((state) => state.cart.items);

  // Calculate available stock
  const initialStock = 10 + (product.id % 10);
  const cartItem = cartItems.find((item) => item.id === product.id);
  const currentCartQuantity = cartItem?.quantity || 0;
  const availableStock = Math.max(0, initialStock - currentCartQuantity);
  const isOutOfStock = availableStock === 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;

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
        {isOutOfStock && (
          <div className="out-of-stock-overlay">
            <span>Out of Stock</span>
          </div>
        )}
        <div className="product-info">
          <h3>{product.title}</h3>
          <p className="price">${product.price.toFixed(2)}</p>
          <div className="rating">
            {renderStars(product.rating.rate)}
            <span>({product.rating.count})</span>
          </div>
        </div>
      </div>
      <button
        className={`details-btn ${isOutOfStock ? "out-of-stock-btn" : ""}`}
        onClick={handleAddToCart}
        disabled={isOutOfStock}
      >
        {isOutOfStock ? "Out of Stock" : "Add to Cart"}
      </button>
    </Link>
  );
};

export default Product;
