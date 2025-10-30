import React from "react";
import "./searchresultsdropdown.css";
import { renderStars } from "../../utils/renderstar";
import type { Product } from "../../type/Product";

interface SearchResultsDropdownProps {
  isVisible: boolean;
  isLoading: boolean;
  searchQuery: string;
  filteredProducts: Product[];
  onProductClick: (id: number) => void;
  onClose: () => void;
  width: number;
  left: number;
}

const SearchResultsDropdown: React.FC<SearchResultsDropdownProps> = ({
  isVisible,
  isLoading,
  searchQuery,
  filteredProducts,
  onProductClick,
  onClose,
  width,
  left,
}) => {
  if (!isVisible) return null;

  return (
    <>
      <div className="search-results-dropdown-overlay" onClick={onClose} />
      <div
        className="search-results-dropdown"
        style={{
          left: `${left}px`,
          width: width > 0 ? `${width}px` : "100%",
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {isLoading ? (
          <div className="search-loading">Loading products...</div>
        ) : searchQuery && filteredProducts.length > 0 ? (
          <div className="search-results">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="search-result-item"
                onClick={() => onProductClick(product.id)}
              >
                <div className="result-image">
                  <img src={product.image} alt={product.title} />
                </div>
                <div className="result-details">
                  <h4 className="result-title">{product.title}</h4>
                  <div className="result-rating">
                    <div className="stars">
                      {renderStars(product.rating.rate)}
                    </div>
                    <span className="rating-count">
                      ({product.rating.count})
                    </span>
                  </div>
                  <div className="result-price">
                    ${product.price.toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
            <div className="search-footer">
              Press Enter or click search icon to view "
              {filteredProducts[0]?.title}"
            </div>
          </div>
        ) : searchQuery && filteredProducts.length === 0 ? (
          <div className="no-results">
            No products found matching "{searchQuery}"
          </div>
        ) : (
          <div className="search-initial-hint">
            Start typing to search products...
          </div>
        )}
      </div>
    </>
  );
};

export default SearchResultsDropdown;
