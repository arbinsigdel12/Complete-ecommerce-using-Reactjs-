import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import van from "../../../public/assets/Images/navbarlogo/van.webp";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdOutlineAccountCircle } from "react-icons/md";
import { LiaCartPlusSolid } from "react-icons/lia";
import { CiPhone } from "react-icons/ci";
import NavbarSearch from "../NavbarSearch/NavbarSearch";
import { useAppSelector } from "../../hooks/redux";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItems = useAppSelector((state) => state.cart.items);
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Make overlay not scrollable when sidebar is active
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <div
        className={`mobile-menu-overlay ${isMobileMenuOpen ? "active" : ""}`}
        onClick={closeMobileMenu}
      />

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
            <li>
              <Link to="/category/electronics" onClick={closeMobileMenu}>
                Electronics
              </Link>
            </li>
            <li>
              <Link to="/category/jewelery" onClick={closeMobileMenu}>
                Jewelery
              </Link>
            </li>
            <li>
              <Link to="/category/mensclothing" onClick={closeMobileMenu}>
                Men's Clothing
              </Link>
            </li>
            <li>
              <Link to="/category/womensclothing" onClick={closeMobileMenu}>
                Women's Clothing
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="category-bar">
        <ul>
          <li>
            <Link to="/products">All</Link>
          </li>
          <li>
            <Link to="/category/electronics">Electronics</Link>
          </li>
          <li>
            <Link to="/category/jewelery">Jewelery</Link>
          </li>
          <li>
            <Link to="/category/mensclothing">Men's Clothing</Link>
          </li>
          <li>
            <Link to="/category/womensclothing">Women's Clothing</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
