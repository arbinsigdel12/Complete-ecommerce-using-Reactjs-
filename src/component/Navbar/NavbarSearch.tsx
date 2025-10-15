import React from "react";
import { FaSearch } from "react-icons/fa";

interface NavbarSearchProps {
  isMobile?: boolean;
  selectRef: React.RefObject<HTMLSelectElement | null>;
  isSearchFocused: boolean;
  onSearchFocus: () => void;
  onSearchBlur: () => void;
  onSearchHintClick: (e: React.MouseEvent) => void;
}

const NavbarSearch: React.FC<NavbarSearchProps> = ({
  isMobile = false,
  selectRef,
  isSearchFocused,
  onSearchFocus,
  onSearchBlur,
  onSearchHintClick,
}) => {
  return (
    <div className={`search-wrapper ${isMobile ? "mobile-visible" : ""}`}>
      <div className={isMobile ? "search-section-mobile" : "search-section"}>
        <select ref={selectRef}>
          <option>All</option>
          <option>Electronics</option>
          <option>Jewellery</option>
          <option>Men's Clothing</option>
          <option>Women's Clothing</option>
        </select>
        <input
          type="text"
          placeholder="Search products..."
          onFocus={onSearchFocus}
          onBlur={onSearchBlur}
        />
        <button className="search-btn">
          <FaSearch />
        </button>
      </div>
      <div
        className={`search-hint ${isSearchFocused ? "visible" : ""}`}
        onMouseDown={onSearchHintClick}
      >
        Start typing to search...
      </div>
    </div>
  );
};

export default NavbarSearch;
