import React, { useState } from "react";
import "./Navbar.css";
import van from "../../assets/Images/van.webp";
import { FaSearch } from "react-icons/fa";
import { MdOutlineAccountCircle } from "react-icons/md";
import { LiaCartPlusSolid } from "react-icons/lia";
import { CiPhone } from "react-icons/ci";

const Navbar: React.FC = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setTimeout(() => setIsSearchFocused(false), 200);
  };

  return (
    <>
      {/* Top Green Info Bar */}
      <div className="top-bar">
        <div className="top-left">
          <span className="cellphone">
            <CiPhone />
            +056-23485
          </span>
        </div>
        <div className="top-center">
          <span>Get 50% off on selected items |</span>
          <a href="#">Shop Now</a>
        </div>
        <div className="top-right">
          <select name="eng" id="">
            <option value="eng-language">Eng</option>
            <option value="nep-language">Nep</option>
          </select>
          <span className="divider">|</span>
          <select name="nep" id="">
            <option value="nep">Nepal</option>
            <option value="ind">India</option>
            <option value="bhtn">Bhutan</option>
          </select>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="navbar">
        <div className="logo-section">
          <div className="logo-placeholder">
            <img src={van} alt="ClickCart Logo" />
          </div>
          <p>ClickCart</p>
        </div>

        <div className="search-section">
          <select>
            <option>All</option>
            <option>Electronics</option>
            <option>Jewellery</option>
            <option>Men's Clothing</option>
            <option>Women's Clothing</option>
          </select>
          <input
            type="text"
            placeholder="Search products..."
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
          />
          <button className="search-btn">
            <FaSearch />
          </button>
          <div
            className={`search-hint ${isSearchFocused ? "visible" : ""}`}
            onMouseDown={(e) => e.preventDefault()}
          >
            Start typing to search...
          </div>
        </div>

        <div className="account-section">
          <div className="account">
            <MdOutlineAccountCircle />
            <span>Account</span>
          </div>
          <div className="cart">
            <LiaCartPlusSolid />
            <span>Cart</span>
            <div className="counter-circle">
              <span>1</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Category Bar */}
      <div className="category-bar">
        <ul>
          <li>All</li>
          <li>Electronics</li>
          <li>Jewellery</li>
          <li>Men's Clothing</li>
          <li>Women's Clothing</li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
