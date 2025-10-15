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

  const adjustSelectWidth = (select: HTMLSelectElement | null) => {
    if (!select) return;
    const option = select.options[select.selectedIndex];
    const temp = document.createElement("span");
    temp.textContent = option.text;
    document.body.appendChild(temp);
    select.style.width = `${temp.offsetWidth + 40}px`;
    document.body.removeChild(temp);
  };

  useEffect(() => {
    const select = selectRef.current;
    if (!select) return;

    adjustSelectWidth(select);
    select.addEventListener("change", () => adjustSelectWidth(select));

    return () => {
      select.removeEventListener("change", () => adjustSelectWidth(select));
    };
  }, []);

  return (
    <>
      {isSearchFocused && (
        <div className="search-overlay" onClick={handleOverlayClick} />
      )}
      <div className={`search-wrapper ${isMobile ? "mobile-visible" : ""}`}>
        <div className="search-section">
          <select ref={selectRef} id="product-catagory">
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
    </>
  );
};

export default NavbarSearch;
