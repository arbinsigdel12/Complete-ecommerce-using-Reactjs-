import React, { useState, useRef, useEffect, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./navbarSearch.css";
import {
  fetchAllProducts,
  fetchProductsByCategory,
} from "../../services/product.services";
import SearchResultsDropdown from "../searchresultsdropdown/SearchResultsDropdown";
import { fetchCategories } from "../../services/product.services";
import type { Product } from "../../type/Product";
interface NavbarSearchProps {
  isMobile?: boolean;
  onSearch?: (query: string, category: string) => void;
}

const NavbarSearch: React.FC<NavbarSearchProps> = ({
  isMobile = false,
  onSearch,
}) => {
  const navigate = useNavigate();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dropdownWidth, setDropdownWidth] = useState<number>(0);
  const [dropdownLeft, setDropdownLeft] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const searchSelectSpanRef = useRef<HTMLSpanElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        let data: Product[];
        if (selectedCategory === "All") {
          data = await fetchAllProducts();
        } else {
          data = await fetchProductsByCategory(selectedCategory.toLowerCase());
        }
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, [selectedCategory]);

  // Fetch categories from API
  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts([]);
    } else {
      const filtered = products.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered.slice(0, 5));
    }
  }, [searchQuery, products]);

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
      navigate(`/product/${filteredProducts[0].id}`);
      resetSearchState();
      return;
    }
    if (searchQuery.trim()) {
      const matched = products.find((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (matched) navigate(`/product/${matched.id}`);
      resetSearchState();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (filteredProducts.length > 0) {
        navigate(`/product/${filteredProducts[0].id}`);
      } else if (searchQuery.trim()) {
        const matched = products.find((p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (matched) navigate(`/product/${matched.id}`);
      }
      resetSearchState();
    } else if (e.key === "Escape") {
      resetSearchState();
    }
  };

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
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
            {categories.map((cat) => (
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
          isLoading={isLoading}
          searchQuery={searchQuery}
          filteredProducts={filteredProducts}
          onProductClick={handleProductClick}
          onClose={resetSearchState}
          width={dropdownWidth}
          left={dropdownLeft}
        />
      </div>
    </>
  );
};

export default NavbarSearch;
