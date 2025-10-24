import React, { useState } from "react";
import { FaStar, FaRegStar, FaRegClipboard } from "react-icons/fa";
import { CiDeliveryTruck } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

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
        <button className="buy-now">Buy Now</button>
        <button className="add-cart" onClick={() => navigate("/cart")}>
          Add to Cart
        </button>
      </div>

      <div className="delivery-info">
        <div className="delivery-box">
          <h4>
            <CiDeliveryTruck /> Free Delivery
          </h4>
          <p>Enter your postal code for delivery availability</p>
        </div>
        <div className="delivery-box">
          <h4>
            <FaRegClipboard /> Return Delivery
          </h4>
          <p>Free 30 days delivery returns.</p>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoSection;
