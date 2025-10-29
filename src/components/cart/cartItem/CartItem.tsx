import React from "react";

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
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.title} />
      <div className="cart-item-info">
        <h4>{item.title}</h4>
        <p className="cart-price">${item.price.toFixed(2)}</p>
        <div className="cart-quantity-controls">
          <div className="quantity-buttons">
            <button
              onClick={() => onQuantityChange(item.id, item.quantity - 1)}
            >
              −
            </button>
            <span>Qty: {item.quantity}</span>
            <button
              onClick={() => onQuantityChange(item.id, item.quantity + 1)}
            >
              +
            </button>
          </div>
          <button className="remove-btn" onClick={() => onRemove(item.id)}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
