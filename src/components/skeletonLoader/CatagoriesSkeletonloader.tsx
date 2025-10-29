import React from "react";
import "../categories/catagories.css";

const SkeletonLoader: React.FC<{ count?: number }> = ({ count = 8 }) => (
  <div className="skeleton-grid">
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className="skeleton-card">
        <div className="skeleton-image"></div>
        <div className="skeleton-content">
          <div className="skeleton-title"></div>
          <div className="skeleton-title short"></div>
          <div className="skeleton-price"></div>
          <div className="skeleton-rating"></div>
        </div>
      </div>
    ))}
  </div>
);

export default SkeletonLoader;
