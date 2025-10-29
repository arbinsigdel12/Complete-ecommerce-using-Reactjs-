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
  const [quantity, setQuantity] = useState<number>(1);
  const [notice, setNotice] = useState<string>("");

  const cartItems = useAppSelector((state) => state.cart.items);

  const initialStock = 10 + (product.id % 10);
  const cartItem = cartItems.find((item) => item.id === product.id);
  const currentCartQuantity = cartItem?.quantity || 0;
  const availableStock = Math.max(0, initialStock - currentCartQuantity);

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) =>
      i < Math.round(rating) ? <FaStar key={i} /> : <FaRegStar key={i} />
    );

  const increaseQty = () => setQuantity((q) => Math.min(q + 1, availableStock));
  const decreaseQty = () => setQuantity((q) => Math.max(q - 1, 1));

  const handleAddToCart = (navigateAfter = false) => {
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
    if (navigateAfter) navigate("/cart");
  };

  return (
    <div className="product-info-section">
      <h2 className="product-title">{product.title}</h2>
      <p className="product-description">{product.description}</p>

      <div className="product-bottom-section">
        <div className="left-section">
          <div className="rating">
            {renderStars(product.rating.rate)}
            <span className="rating-count">
              ({product.rating.count} reviews)
            </span>
          </div>
        </div>

        <div className="middle-section">
          <div className="pricelist">
            <h3 className="product-price">${product.price.toFixed(2)}</h3>
            <p className="monthly">
              or ${(product.price / 6).toFixed(2)}/month
            </p>
          </div>

          <div className="quantity-section">
            <label>Quantity</label>
            <div className="quantity-box" role="group" aria-label="quantity">
              <button
                onClick={decreaseQty}
                disabled={quantity <= 1}
                aria-label="decrease"
              >
                −
              </button>
              <span>{quantity}</span>
              <button
                onClick={increaseQty}
                disabled={quantity >= availableStock}
                aria-label="increase"
              >
                +
              </button>
            </div>
          </div>

          <p className="stock-info">
            Only <span className="highlight">{availableStock}</span> items left!
            {currentCartQuantity > 0 && (
              <span className="cart-notice">
                {" "}
                ({currentCartQuantity} in cart)
              </span>
            )}
          </p>

          {notice && <p className="cart-notice">{notice}</p>}

          {availableStock < 5 && availableStock > 0 && (
            <p className="low-stock-warning">
              Hurry! Only a few left in stock!
            </p>
          )}
        </div>

        <div className="right-section">
          <div className="buttons">
            <button
              className="buy-now"
              onClick={() => handleAddToCart(true)}
              disabled={availableStock === 0}
            >
              {availableStock === 0 ? "Out of Stock" : "Buy Now"}
            </button>
            <button
              className="add-cart"
              onClick={() => handleAddToCart()}
              disabled={availableStock === 0}
            >
              {availableStock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoSection;
