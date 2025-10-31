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
import EmailService from "../../services/EmailService";
import { type CartProduct as CartItemType } from "../../type/Product";

const CartPage: React.FC = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    postalCode: "",
    address: "",
  });

  const [emailData, setEmailData] = useState<{
    customerName: string;
    customerEmail: string;
    cartItems: CartItemType[];
    total: number;
  } | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const discount = subtotal > 350 ? subtotal * 0.1 : 0;
  const shipping = subtotal > 0 ? 5.99 : 0;
  const total = subtotal + shipping - discount;

  const hasStockError = cartItems.some((item) => {
    const initialStock = 10 + (item.id % 10);
    return item.quantity > initialStock;
  });

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };

  const handleRemoveItem = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0 || hasStockError) return;

    // Save snapshot for email
    setEmailData({
      customerName: customerInfo.fullName,
      customerEmail: customerInfo.email,
      cartItems: cartItems,
      total,
    });

    setOrderPlaced(true);
    dispatch(clearCart());
  };

  if (orderPlaced) {
    return (
      <div className="cart-wrapper">
        <div className="order-success">
          <h2>Order Completed Successfully!</h2>
          <p>Thank you for your purchase, {customerInfo.fullName}!</p>
          <p>Your order has been placed and will be shipped soon.</p>
          <Link to="/products">
            <button>Continue Shopping</button>
          </Link>
        </div>

        {emailData && (
          <EmailService
            customerName={emailData.customerName}
            customerEmail={emailData.customerEmail}
            cartItems={emailData.cartItems}
            total={emailData.total}
          />
        )}
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
              <span>Discount (10% for purchase greater than $350):</span>
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
            Some items exceed available stock.
          </div>
        )}

        <form className="order-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={customerInfo.fullName}
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
              value={customerInfo.email}
              onChange={handleInputChange}
              placeholder="Enter email"
              required
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={customerInfo.phone}
              onChange={handleInputChange}
              placeholder="Enter phone"
              required
            />
          </div>
          <div className="form-group">
            <label>Postal Code</label>
            <input
              type="text"
              name="postalCode"
              value={customerInfo.postalCode}
              onChange={handleInputChange}
              placeholder="Enter postal code"
              required
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <textarea
              name="address"
              value={customerInfo.address}
              onChange={handleInputChange}
              placeholder="Enter your address"
              required
            />
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
