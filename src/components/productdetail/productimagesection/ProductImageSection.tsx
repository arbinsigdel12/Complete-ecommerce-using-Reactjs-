import React, { useState } from "react";
import "./productimagesection.css";

interface ProductImageSectionProps {
  image: string;
  title: string;
}

const ProductImageSection: React.FC<ProductImageSectionProps> = ({
  image,
  title,
}) => {
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const colorVariants = ["#fce4ec", "#e8f5e9", "#e3f2fd", "#fff3e0"];

  return (
    <div className="product-image-section">
      <div
        className="main-image-container"
        style={{ backgroundColor: colorVariants[selectedColor] }}
      >
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="main-product-image"
        />
      </div>

      <div className="thumbnail-container" role="list">
        {colorVariants.map((color, index) => (
          <div
            key={index}
            role="listitem"
            className={`thumbnail-wrapper ${
              selectedColor === index ? "active" : ""
            }`}
            onClick={() => setSelectedColor(index)}
            aria-label={`select variant ${index + 1}`}
          >
            <img
              src={image}
              alt={`Variant ${index + 1}`}
              loading="lazy"
              className="thumbnail-image"
            />
            <span
              className="color-overlay"
              style={{ backgroundColor: color }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImageSection;
