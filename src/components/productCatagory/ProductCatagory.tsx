import React from "react";
import { Link } from "react-router-dom";
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
  const getCategoryLink = (title: string) => {
    switch (title.toLowerCase()) {
      case "electronics":
        return "/category/electronics";
      case "jewellery":
        return "/category/jewelery";
      case "men's clothing":
        return "/category/mensclothing";
      case "women's clothing":
        return "/category/womensclothing";
      default:
        return "/";
    }
  };

  return (
    <div className="category-container">
      {categories.map((product, index) => (
        <Link
          to={getCategoryLink(product.title)}
          key={index}
          className="category-card"
        >
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
