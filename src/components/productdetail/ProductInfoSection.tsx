import React, { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
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

  const renderStars = (rating: number) => {
    const stars = [];
    const rounded = Math.round(rating);
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rounded ? <FaStar key={i} /> : <FaRegStar key={i} />);
    }
    return stars;
  };

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
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
  };

  const handleBuyNow = () => {
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
        <button onClick={decreaseQty}>−</button>
        <span>{quantity}</span>
        <button onClick={increaseQty}>+</button>
      </div>

      <p className="stock-info">
        Only <span className="highlight">{10 + (product.id % 10)}</span> items
        left!
      </p>

      <div className="buttons">
        <button className="buy-now" onClick={handleBuyNow}>
          Buy Now
        </button>
        <button className="add-cart" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductInfoSection;
