import React, { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { addToCartWithQuantity } from "../../store/slices/cartSlice";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductInfoSectionProps {
  product: Product;
}

const ProductInfoSection: React.FC<ProductInfoSectionProps> = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const [notice, setNotice] = useState("");

  const cartItems = useAppSelector((state) => state.cart.items);

  const initialStock = 10 + (product.id % 10);
  const cartItem = cartItems.find((item) => item.id === product.id);
  const currentCartQuantity = cartItem ? cartItem.quantity : 0;
  const availableStock = initialStock - currentCartQuantity;

  const renderStars = (rating: number) => {
    const stars = [];
    const rounded = Math.round(rating);
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rounded ? <FaStar key={i} /> : <FaRegStar key={i} />);
    }
    return stars;
  };

  const increaseQty = () => {
    if (quantity < availableStock) setQuantity((q) => q + 1);
  };

  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    if (quantity > availableStock) {
      setNotice(`Only ${availableStock} items available.`);
      return;
    }
    dispatch(
      addToCartWithQuantity({
        product: {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
        },
        quantity,
      })
    );
    setQuantity(1);
    setNotice("");
  };

  const handleBuyNow = () => {
    if (quantity > availableStock) {
      setNotice(`Only ${availableStock} items available.`);
      return;
    }

    dispatch(
      addToCartWithQuantity({
        product: {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
        },
        quantity,
      })
    );
    setQuantity(1);
    navigate("/cart");
  };

  return (
    <div className="product-info-section">
      <h2 className="product-title">{product.title}</h2>
      <p className="product-description">{product.description}</p>

      <div className="rating">
        {renderStars(product.rating.rate)}
        <span className="rating-count">({product.rating.count} reviews)</span>
      </div>

      <h3 className="product-price">${product.price.toFixed(2)}</h3>
      <p className="monthly">or ${(product.price / 6).toFixed(2)}/month</p>

      <div className="quantity-section">
        <button onClick={decreaseQty} disabled={quantity <= 1}>
          −
        </button>
        <span>{quantity}</span>
        <button onClick={increaseQty} disabled={quantity >= availableStock}>
          +
        </button>
      </div>

      <p className="stock-info">
        Only <span className="highlight">{availableStock}</span> items left!
        {currentCartQuantity > 0 && (
          <span className="cart-notice"> ({currentCartQuantity} in cart)</span>
        )}
      </p>

      {notice && <p className="cart-notice">{notice}</p>}

      <div className="buttons">
        <button
          className="buy-now"
          onClick={handleBuyNow}
          disabled={availableStock === 0}
        >
          {availableStock === 0 ? "Out of Stock" : "Buy Now"}
        </button>
        <button
          className="add-cart"
          onClick={handleAddToCart}
          disabled={availableStock === 0}
        >
          {availableStock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>

      {availableStock < 5 && availableStock > 0 && (
        <p className="low-stock-warning">Hurry! Only a few left in stock!</p>
      )}
    </div>
  );
};

export default ProductInfoSection;
