import React, { useState, useRef, useEffect, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./navbarSearch.css";
import SearchResultsDropdown from "../searchresultsdropdown/SearchResultsDropdown";
import type { Product } from "../../type/Product";
import type { RootState } from "../../store";
import { useSelector } from "react-redux";
import useDebounce from "../../hooks/useDebounce";
interface NavbarSearchProps {
  isMobile?: boolean;
  onSearch?: (query: string, category: string) => void;
}

const NavbarSearch: React.FC<NavbarSearchProps> = ({
  isMobile = false,
  onSearch,
}) => {
  const { product, categories } = useSelector(
    (state: RootState) => state.fetchapi
  );
  const navigate = useNavigate();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [dropdownWidth, setDropdownWidth] = useState<number>(0);
  const [dropdownLeft, setDropdownLeft] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const searchSelectSpanRef = useRef<HTMLSpanElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const [isSearchLoading, setIsSearchLoading] = useState(false);

  const searchProduct = useCallback(
    function searchProduct(query: string) {
      const filtered = product.data.filter((p) => {
        const matchesQuery = p.title
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesCategory =
          selectedCategory === "All" ||
          p.category.toLowerCase() === selectedCategory.toLowerCase();
        return matchesQuery && matchesCategory;
      });
      return filtered;
    },
    [product.data, selectedCategory]
  );

  useEffect(() => {
    if (debouncedSearchQuery.trim() === "") {
      setFilteredProducts([]);
    } else {
      const res = searchProduct(debouncedSearchQuery);
      setFilteredProducts(res.slice(0, 5));
      setIsSearchLoading(false);
    }
  }, [searchProduct, debouncedSearchQuery]);

  useEffect(() => {
    if (searchQuery) setIsSearchLoading(true);
  }, [searchQuery]);

  const adjustSelectWidth = useCallback(() => {
    const select = selectRef.current;
    const span = searchSelectSpanRef.current;
    if (!select || !span) return;
    const option = select.options[select.selectedIndex];
    span.textContent = option ? option.text : "";
    requestAnimationFrame(() => {
      const selectWidth = span.offsetWidth + 40;
      select.style.width = `${selectWidth}px`;
      adjustDropdownWidth(selectWidth);
    });
  }, []);

  const adjustDropdownWidth = (selectWidth: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const totalWidth = section.offsetWidth;
    const left = selectWidth;
    const width = totalWidth - selectWidth;
    setDropdownLeft(left);
    setDropdownWidth(width);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setSearchQuery("");
    setFilteredProducts([]);
    adjustSelectWidth();
    if (onSearch) onSearch("", category);
  };

  const resetSearchState = () => {
    setIsSearchFocused(false);
    setSearchQuery("");
    setFilteredProducts([]);
    if (inputRef.current) inputRef.current.blur();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) onSearch(query, selectedCategory);
  };

  const handleSearchClick = () => {
    if (filteredProducts.length > 0) {
      navigate(`/products/${filteredProducts[0].id}`);
      resetSearchState();
      return;
    }
    if (searchQuery.trim()) {
      const matched = product.data.find((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (matched) navigate(`/products/${matched.id}`);
      resetSearchState();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (filteredProducts.length > 0) {
        navigate(`/products/${filteredProducts[0].id}`);
      } else if (searchQuery.trim()) {
        const matched = product.data.find((p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (matched) navigate(`/products/${matched.id}`);
      }
      resetSearchState();
    } else if (e.key === "Escape") {
      resetSearchState();
    }
  };

  const handleProductClick = (productId: number) => {
    navigate(`/products/${productId}`);
    resetSearchState();
  };

  useEffect(() => {
    adjustSelectWidth();
    requestAnimationFrame(() => adjustSelectWidth());
    const handleResize = () => {
      const select = selectRef.current;
      if (select) adjustDropdownWidth(select.offsetWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [adjustSelectWidth]);

  return (
    <>
      <span
        ref={searchSelectSpanRef}
        style={{
          visibility: "hidden",
          position: "absolute",
          whiteSpace: "nowrap",
        }}
      />
      <div className={`search-wrapper ${isMobile ? "mobile-visible" : ""}`}>
        <div className="search-section" ref={sectionRef}>
          <select
            ref={selectRef}
            value={selectedCategory}
            onChange={handleSelectChange}
          >
            <option>All</option>
            {categories.data.map((cat) => (
              <option key={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={() => setIsSearchFocused(true)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="search-btn"
            onClick={handleSearchClick}
            type="button"
          >
            <FaSearch />
          </button>
        </div>
        <SearchResultsDropdown
          isVisible={isSearchFocused}
          isLoading={false}
          searchQuery={searchQuery}
          filteredProducts={filteredProducts}
          onProductClick={handleProductClick}
          onClose={resetSearchState}
          width={dropdownWidth}
          left={dropdownLeft}
          isSearchLoading={isSearchLoading}
        />
      </div>
    </>
  );
};

export default NavbarSearch;
