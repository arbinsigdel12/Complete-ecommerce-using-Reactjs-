import React from "react";
import "./productCatagory.css";

interface ProductCategoryProps {
  title: string;
  image: string;
}

const categories: ProductCategoryProps[] = [
  {
    title: "Electronics",
    image: "/assets/Images/productcatagory/electronics.webp",
  },
  {
    title: "Jewellery",
    image: "/assets/Images/productcatagory/jewelery.webp",
  },
  {
    title: "Men's Clothing",
    image: "/assets/Images/productcatagory/mensclothing.webp",
  },
  {
    title: "Women's Clothing",
    image: "/assets/Images/productcatagory/womensclothing.webp",
  },
];

const ProductCategory: React.FC = () => {
  return (
    <div className="category-container">
      {categories.map((product, index) => (
        <div key={index} className="category-card">
          <div className="category-inner">
            <img
              src={product.image}
              alt={product.title}
              className="category-image"
            />
            <h3 className="category-title">{product.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCategory;
