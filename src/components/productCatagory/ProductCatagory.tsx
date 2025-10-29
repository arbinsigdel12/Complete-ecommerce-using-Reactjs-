import React from "react";
import { Link } from "react-router-dom";
import "./productCatagory.css";

interface ProductCategoryProps {
  title: string;
  image: string;
  url: string;
}

const categories: ProductCategoryProps[] = [
  {
    title: "Electronics",
    image: "/assets/Images/productcatagory/electronics.webp",
    url: "/category/electronics",
  },
  {
    title: "Jewellery",
    image: "/assets/Images/productcatagory/jewelery.webp",
    url: "/category/jewelery",
  },
  {
    title: "Men's Clothing",
    image: "/assets/Images/productcatagory/mensclothing.webp",
    url: "/category/mensclothing",
  },
  {
    title: "Women's Clothing",
    image: "/assets/Images/productcatagory/womensclothing.webp",
    url: "/category/womensclothing",
  },
];

const ProductCategory: React.FC = () => {
  return (
    <div className="category-container">
      {categories.map((product, index) => (
        <Link to={product.url} key={index} className="category-card">
          <div className="category-inner">
            <img
              src={product.image}
              alt={product.title}
              className="category-image"
            />
            <h3 className="category-title">{product.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductCategory;
