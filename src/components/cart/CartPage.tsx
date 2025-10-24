import React, { useEffect, useState } from "react";
import "./cartpage.css";

interface ProductType {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

const CartPage: React.FC = () => {
  const [product, setProduct] = useState<ProductType | null>(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/2")
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="cart-wrapper">
      <div className="cart-left">
        <h3>Review Item and Shipping</h3>

        {product ? (
          <div className="cart-item">
            <img src={product.image} alt={product.title} />
            <div className="cart-item-info">
              <h4>{product.title}</h4>
              <p className="cart-price">${product.price}</p>
              <p className="cart-quantity">Quantity: 01</p>
            </div>
          </div>
        ) : (
          <p>Loading product...</p>
        )}
      </div>

      <div className="cart-right">
        <h3>Order Summary</h3>

        <form className="order-form">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="Enter full name" />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter email address" />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input type="text" placeholder="Enter phone number" />
          </div>

          <div className="form-group">
            <label>Postal Code</label>
            <input type="text" placeholder="Enter postal code" />
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea placeholder="Enter your address"></textarea>
          </div>

          <button type="submit" className="place-order-btn">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default CartPage;
