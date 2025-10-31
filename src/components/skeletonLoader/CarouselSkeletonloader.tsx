import React from "react";
import "../topProduct/topRatedProducts.css";

const CarouselSkeleton: React.FC = () => (
  <div className="carousel-skeleton">
    {Array.from({ length: 5 }).map((_, index) => (
      <div key={index} className="carousel-skeleton-card">
        <div className="carousel-skeleton-image"></div>
        <div className="carousel-skeleton-content">
          <div className="carousel-skeleton-title"></div>
          <div className="carousel-skeleton-title short"></div>
          <div className="carousel-skeleton-price"></div>
        </div>
      </div>
    ))}
  </div>
);

export default CarouselSkeleton;
