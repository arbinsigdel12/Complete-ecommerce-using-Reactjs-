import React from "react";
import "./Navbar.css";
import van from "../../assets/Images/van.webp";
import { FaSearch } from "react-icons/fa";
import { MdOutlineAccountCircle } from "react-icons/md";
import { LiaCartPlusSolid } from "react-icons/lia";
import { CiPhone } from "react-icons/ci";
import { RiArrowDropDownLine } from "react-icons/ri";

const Navbar: React.FC = () => {
  return (
    <>
      {/* Top Green Info Bar */}
      <div className="top-bar">
        <div className="top-left">
          <span>
            <CiPhone />
            +056-23485
          </span>
        </div>
        <div className="top-center">
          <span>Get 50% off on selected items |</span>
          <a href="#">Shop Now</a>
        </div>
        <div className="top-right">
          <span>
            Eng
            <RiArrowDropDownLine />
          </span>
          <span className="divider">|</span>
          <span>
            Nepal
            <RiArrowDropDownLine />
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="navbar">
        <div className="logo-section">
          <div className="logo-placeholder">
            <img src={van} alt="" />
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
          <input type="text" placeholder="Search Product" />
          <button className="search-btn">
            <FaSearch />
          </button>
        </div>

        <div className="account-section">
          <div className="account">
            <MdOutlineAccountCircle /> Account
          </div>
          <div className="cart">
            <LiaCartPlusSolid /> Cart
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
