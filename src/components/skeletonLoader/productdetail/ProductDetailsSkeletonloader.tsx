import React from "react";
import "./ProductDetailSkeleton.css";

const ProductDetailSkeleton: React.FC = () => {
  return (
    <div className="product-detail-container">
      <div className="product-detail">
        {/* Image Section Skeleton */}
        <div className="product-image-section">
          <div className="skeleton-main-image-container">
            <div className="skeleton-main-image" />
          </div>

          <div className="skeleton-thumbnail-container">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="skeleton-thumbnail-wrapper">
                <div className="skeleton-thumbnail-image" />
              </div>
            ))}
          </div>
        </div>

        {/* Info Section Skeleton */}
        <div className="product-info-section">
          <div className="skeleton-title" />
          <div className="skeleton-description-line" />
          <div className="skeleton-description-line medium" />
          <div className="skeleton-description-line short" />
          <div className="skeleton-rating" />
          <div className="skeleton-price" />
          <div className="skeleton-monthly" />
          <div className="skeleton-quantity-section">
            <div className="skeleton-quantity-button" />
            <div className="skeleton-quantity-number" />
            <div className="skeleton-quantity-button" />
          </div>
          <div className="skeleton-stock-info" />
          <div className="skeleton-buttons">
            <div className="skeleton-button" />
            <div className="skeleton-button" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
