import React from "react";
import "./cartitem.css";

interface CartItemProps {
  item: {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
  };
  onQuantityChange: (productId: number, newQuantity: number) => void;
  onRemove: (productId: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onQuantityChange,
  onRemove,
}) => {
  // Calculate available stock (same logic as other components)
  const initialStock = 10 + (item.id % 10);
  const availableStock = Math.max(0, initialStock);
  const isOutOfStock = availableStock === 0;
  const maxQuantity = Math.min(availableStock, item.quantity + availableStock);

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.title} />
      {isOutOfStock && <div className="out-of-stock-badge">Out of Stock</div>}
      <div className="cart-item-info">
        <h4>{item.title}</h4>
        <p className="cart-price">${item.price.toFixed(2)}</p>
        {isOutOfStock && (
          <p className="stock-warning">This item is no longer available</p>
        )}
        <div className="cart-quantity-controls">
          <div className="quantity-buttons">
            <button
              onClick={() => onQuantityChange(item.id, item.quantity - 1)}
              disabled={isOutOfStock}
            >
              −
            </button>
            <span>Qty: {item.quantity}</span>
            <button
              onClick={() => onQuantityChange(item.id, item.quantity + 1)}
              disabled={isOutOfStock || item.quantity >= maxQuantity}
            >
              +
            </button>
          </div>
          <button className="remove-btn" onClick={() => onRemove(item.id)}>
            Remove
          </button>
        </div>
        {!isOutOfStock && item.quantity >= maxQuantity && (
          <p className="max-quantity-warning">Maximum quantity reached</p>
        )}
      </div>
    </div>
  );
};

export default CartItem;
