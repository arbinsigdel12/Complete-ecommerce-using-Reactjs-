import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import van from "../../../public/assets/Images/navbarlogo/van.webp";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdOutlineAccountCircle } from "react-icons/md";
import { LiaCartPlusSolid } from "react-icons/lia";
import { CiPhone } from "react-icons/ci";
import NavbarSearch from "../NavbarSearch/NavbarSearch";
import { useAppSelector } from "../../hooks/redux";
import type { RootState } from "../../store";
import { useSelector } from "react-redux";

const Navbar: React.FC = () => {
  // categories from Redux store
  const { categories } = useSelector((state: RootState) => state.fetchapi);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItems = useAppSelector((state) => state.cart.items);

  const getTotalItems = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
  }, [isMobileMenuOpen]);

  const categoryList = categories.data || [];

  return (
    <>
      <div
        className={`mobile-menu-overlay ${isMobileMenuOpen ? "active" : ""}`}
        onClick={closeMobileMenu}
      />

      {/* Top bar */}
      <div className="top-bar">
        <div className="top-left">
          <span className="cellphone">
            <CiPhone /> +056-23485
          </span>
        </div>
        <div className="top-center">
          <span>Get 50% off on selected items |</span>
          <Link to="/products">
            <button>Shop Now</button>
          </Link>
        </div>
        <div className="top-right">
          <select name="eng">
            <option value="eng-language">Eng</option>
            <option value="nep-language">Nep</option>
          </select>
          <span className="divider">|</span>
          <select name="nep">
            <option value="nep">Nepal</option>
            <option value="ind">India</option>
            <option value="bhtn">Bhutan</option>
          </select>
        </div>
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="logowrapper">
          <button
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <FaBars />
          </button>

          <Link to="/" className="logo-section">
            <div className="logo-placeholder">
              <img src={van} alt="ClickCart Logo" />
            </div>
            <p>ClickCart</p>
          </Link>
        </div>

        <NavbarSearch />

        <div className="account-section">
          <div className="account">
            <MdOutlineAccountCircle />
            <span>Account</span>
          </div>

          <Link to="/cart" className="cart">
            <LiaCartPlusSolid />
            <span>Cart</span>
            <div className="counter-circle">
              <p className="cart-counter">{getTotalItems()}</p>
            </div>
          </Link>
        </div>
      </nav>

      <NavbarSearch isMobile={true} />

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? "active" : ""}`}>
        <div className="mobile-menu-header">
          <h3>Menu</h3>
          <button
            className="mobile-menu-close"
            onClick={closeMobileMenu}
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
        </div>

        <div className="mobile-menu-items">
          <h4 className="mobile-menu-subheading">Categories</h4>
          <ul>
            <li>
              <Link to="/products" onClick={closeMobileMenu}>
                All
              </Link>
            </li>
            {categoryList.map((cat) => (
              <li key={cat}>
                <Link to={`/category/${cat}`} onClick={closeMobileMenu}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Desktop Category Bar */}
      <div className="category-bar">
        <ul>
          <li>
            <Link to="/products">All</Link>
          </li>
          {categoryList.map((cat) => (
            <li key={cat}>
              <Link to={`/category/${cat}`}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
