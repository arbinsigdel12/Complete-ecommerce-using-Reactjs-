import React, { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "./NavbarSearch.css";

interface NavbarSearchProps {
  isMobile?: boolean;
}

const NavbarSearch: React.FC<NavbarSearchProps> = ({ isMobile = false }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const search_selectRef = useRef<HTMLSpanElement>(null);

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setTimeout(() => setIsSearchFocused(false), 0);
  };

  const handleSearchHintClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleOverlayClick = () => {
    setIsSearchFocused(false);
  };

  const adjustSelectWidth = () => {
    const select = selectRef.current;
    const span = search_selectRef.current;
    if (!select || !span) return;

    const option = select.options[select.selectedIndex];
    span.textContent = option.text;
    select.style.width = `${span.offsetWidth + 40}px`;
  };

  useEffect(() => {
    adjustSelectWidth();
  }, []);

  const handleSelectChange = () => {
    adjustSelectWidth();
  };

  return (
    <>
      {isSearchFocused && (
        <div className="search-overlay" onClick={handleOverlayClick} />
      )}
      <span
        ref={search_selectRef}
        style={{ visibility: "hidden", position: "absolute" }}
      ></span>
      <div className={`search-wrapper ${isMobile ? "mobile-visible" : ""}`}>
        <div className="search-section">
          <select
            ref={selectRef}
            id="product-catagory"
            onChange={handleSelectChange}
          >
            <option>All</option>
            <option>Electronics</option>
            <option>Jewelery</option>
            <option>Men's Clothing</option>
            <option>Women's Clothing</option>
          </select>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search products..."
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
          />
          <button className="search-btn">
            <FaSearch />
          </button>
        </div>
        <div
          className={`search-hint ${isSearchFocused ? "visible" : ""}`}
          onMouseDown={handleSearchHintClick}
        >
          Start typing to search...
        </div>
      </div>
    </>
  );
};

export default NavbarSearch;
