import React, { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "./NavbarSearch.css";
import { useCallback } from "react";

interface NavbarSearchProps {
  isMobile?: boolean;
  onSearch?: (query: string, category: string) => void;
}

const NavbarSearch: React.FC<NavbarSearchProps> = ({
  isMobile = false,
  onSearch,
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const searchSelectSpanRef = useRef<HTMLSpanElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const adjustSelectWidth = useCallback(() => {
    const select = selectRef.current;
    const span = searchSelectSpanRef.current;
    if (!select || !span) return;

    const option = select.options[select.selectedIndex];
    span.textContent = option ? option.text : "";

    // Wait for browser to render the updated span
    requestAnimationFrame(() => {
      const selectWidth = span.offsetWidth + 40;
      select.style.width = `${selectWidth}px`;
      adjustHintWidth(selectWidth);
    });
  }, []);

  const adjustHintWidth = (selectWidth: number) => {
    const section = sectionRef.current;
    const select = selectRef.current;
    const hint = hintRef.current;
    if (!section || !select || !hint) return;

    const totalWidth = section.offsetWidth;
    const left = selectWidth;
    const width = totalWidth - selectWidth;

    hint.style.left = `${left}px`;
    hint.style.width = `${width}px`;
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedCategory(category);
    adjustSelectWidth();
    if (onSearch) {
      onSearch(searchQuery, category);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query, selectedCategory);
    }
  };

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(searchQuery, selectedCategory);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(searchQuery, selectedCategory);
    }
  };

  useEffect(() => {
    adjustSelectWidth();
    // Initial adjustment after render
    requestAnimationFrame(() => {
      adjustSelectWidth();
    });
    const handleResize = () => {
      const select = selectRef.current;
      if (select) adjustHintWidth(select.offsetWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [adjustSelectWidth]);

  return (
    <>
      {isSearchFocused && (
        <div
          className="search-overlay"
          onClick={() => setIsSearchFocused(false)}
        />
      )}
      <span
        ref={searchSelectSpanRef}
        style={{
          visibility: "hidden",
          position: "absolute",
          whiteSpace: "nowrap",
        }}
      ></span>

      <div className={`search-wrapper ${isMobile ? "mobile-visible" : ""}`}>
        <div className="search-section" ref={sectionRef}>
          <select
            ref={selectRef}
            value={selectedCategory}
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
            value={searchQuery}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
          <button className="search-btn" onClick={handleSearchClick}>
            <FaSearch />
          </button>
        </div>

        <div
          ref={hintRef}
          className={`search-hint ${isSearchFocused ? "visible" : ""}`}
          onMouseDown={() => inputRef.current?.focus()}
        >
          Start typing to search...
        </div>
      </div>
    </>
  );
};

export default NavbarSearch;
