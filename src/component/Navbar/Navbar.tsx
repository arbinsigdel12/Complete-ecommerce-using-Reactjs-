import React, { useState, useRef, useEffect } from "react";
import "./Navbar.css";
import van from "../../../public/assets/Images/van.webp";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdOutlineAccountCircle } from "react-icons/md";
import { LiaCartPlusSolid } from "react-icons/lia";
import { CiPhone } from "react-icons/ci";
import NavbarSearch from "./NavbarSearch";

const Navbar: React.FC = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const selectRefDesktop = useRef<HTMLSelectElement>(null);
  const selectRefMobile = useRef<HTMLSelectElement>(null);

  const handleSearchFocus = () => setIsSearchFocused(true);

  const handleSearchBlur = () => {
    setTimeout(() => setIsSearchFocused(false), 200);
  };

  const handleOverlayClick = () => {
    setIsSearchFocused(false);
  };

  const handleSearchHintClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const input = document.querySelector(
      ".search-wrapper input"
    ) as HTMLInputElement;
    if (input) {
      input.focus();
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const adjustWidth = (select: HTMLSelectElement | null) => {
    if (!select) return;
    const option = select.options[select.selectedIndex];
    const temp = document.createElement("span");
    temp.style.visibility = "hidden";
    temp.style.whiteSpace = "nowrap";
    temp.style.font = window.getComputedStyle(select).font;
    temp.textContent = option.text;
    document.body.appendChild(temp);
    select.style.width = `${temp.offsetWidth + 35}px`;
    document.body.removeChild(temp);
  };

  useEffect(() => {
    const selects = [selectRefDesktop.current, selectRefMobile.current];
    selects.forEach((sel) => {
      if (!sel) return;
      adjustWidth(sel);
      sel.addEventListener("change", () => adjustWidth(sel));
    });
    return () => {
      selects.forEach((sel) =>
        sel?.removeEventListener("change", () => adjustWidth(sel))
      );
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        isMobileMenuOpen &&
        target.classList.contains("mobile-menu-overlay")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen]);

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
        className={`search-overlay ${isSearchFocused ? "visible" : ""}`}
        onClick={handleOverlayClick}
      />

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
          <a href="#">Shop Now</a>
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
        <div className="top-center-mobile">
          <span>Get 50% off on selected items |</span>
          <a href="#">Shop Now</a>
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

          <div className="logo-section">
            <div className="logo-placeholder">
              <img src={van} alt="ClickCart Logo" />
            </div>
            <p>ClickCart</p>
          </div>
        </div>

        <NavbarSearch
          selectRef={selectRefDesktop}
          isSearchFocused={isSearchFocused}
          onSearchFocus={handleSearchFocus}
          onSearchBlur={handleSearchBlur}
          onSearchHintClick={handleSearchHintClick}
        />

        <div className="account-section">
          <div className="account">
            <MdOutlineAccountCircle />
            <span>Account</span>
          </div>
          <div className="cart">
            <LiaCartPlusSolid />
            <span>Cart</span>
            <div className="counter-circle">
              <p className="cart-counter">1</p>
            </div>
          </div>
        </div>
      </nav>

      <NavbarSearch
        isMobile={true}
        selectRef={selectRefMobile}
        isSearchFocused={isSearchFocused}
        onSearchFocus={handleSearchFocus}
        onSearchBlur={handleSearchBlur}
        onSearchHintClick={handleSearchHintClick}
      />

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
          <ul>
            <li onClick={closeMobileMenu}>All</li>
            <li onClick={closeMobileMenu}>Electronics</li>
            <li onClick={closeMobileMenu}>Jewellery</li>
            <li onClick={closeMobileMenu}>Men's Clothing</li>
            <li onClick={closeMobileMenu}>Women's Clothing</li>
          </ul>
        </div>
      </div>

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
