import React, { useState } from "react";
import "./cartpage.css";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { Link } from "react-router-dom";
import CartItem from "./cartItem/CartItem";
import {
  updateQuantity,
  removeFromCart,
  clearCart,
} from "../../store/slices/cartSlice";

const CartPage: React.FC = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    postalCode: "",
    address: "",
  });

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };

  const handleRemoveItem = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomerName(formData.fullName);
    setOrderPlaced(true);
    dispatch(clearCart());
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      postalCode: "",
      address: "",
    });
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const discount = subtotal > 350 ? subtotal * 0.1 : 0;
  const shipping = subtotal > 0 ? 5.99 : 0;
  const total = subtotal + shipping - discount;

  // Stock validation check
  const hasStockError = cartItems.some((item) => {
    const initialStock = 10 + (item.id % 10);
    return item.quantity > initialStock;
  });

  if (orderPlaced) {
    return (
      <div className="cart-wrapper">
        <div className="order-success">
          <h2>Order Completed Successfully!</h2>
          <p>Thank you for your purchase, {customerName}!</p>
          <p>Your order has been placed and will be shipped soon.</p>
          <Link to="/products">
            <button>Continue Shopping</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-wrapper">
      <div className="cart-left">
        <h3>Review Items ({cartItems.length})</h3>

        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemoveItem}
            />
          ))
        )}
      </div>

      <div className="cart-right">
        <h3>Order Summary</h3>

        {cartItems.length > 0 && (
          <div className="order-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Discount (10% for purchase more than $350):</span>
              <span>${discount.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        )}

        {hasStockError && (
          <div className="stock-error-message">
            Some items in your cart exceed available stock. Please update
            quantities.
          </div>
        )}

        <form className="order-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email address"
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter phone number"
              required
            />
          </div>

          <div className="form-group">
            <label>Postal Code</label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
              placeholder="Enter postal code"
              required
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter your address"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="place-order-btn"
            disabled={cartItems.length === 0 || hasStockError}
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default CartPage;
