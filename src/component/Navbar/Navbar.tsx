import React, { useState, useRef, useEffect } from "react";
import "./Navbar.css";
import van from "../../assets/Images/van.webp";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { MdOutlineAccountCircle } from "react-icons/md";
import { LiaCartPlusSolid } from "react-icons/lia";
import { CiPhone } from "react-icons/ci";

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
    // Focus back on search input when hint is clicked
    const input = document.querySelector(
      ".search-section input, .search-section-mobile input"
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

  // Close mobile menu when clicking on overlay
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

  // Prevent body scroll when mobile menu is open
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

      {/* Mobile Menu Overlay */}
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
        {/* Mobile Menu Button */}
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

        {/* Desktop Search */}
        <div className="search-section">
          <select ref={selectRefDesktop}>
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
            onMouseDown={handleSearchHintClick}
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

      {/* Mobile Search */}
      <div className="search-section-mobile">
        <select ref={selectRefMobile}>
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
          onMouseDown={handleSearchHintClick}
        >
          Start typing to search...
        </div>
      </div>

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
