import React, { useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import "./NavbarSearch.css";

interface NavbarSearchProps {
  isMobile?: boolean;
  selectRef: React.RefObject<HTMLSelectElement | null>;
}

const NavbarSearch: React.FC<NavbarSearchProps> = ({
  isMobile = false,
  selectRef,
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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

  return (
    <div className={`search-wrapper ${isMobile ? "mobile-visible" : ""}`}>
      <div className="search-section">
        <select ref={selectRef}>
          <option>All</option>
          <option>Electronics</option>
          <option>Jewellery</option>
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
  );
};

export default NavbarSearch;
