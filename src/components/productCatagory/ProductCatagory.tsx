import React from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const navigateToElectronics = () => {
    navigate("/category/electronics");
  };
  const navigateToJewelery = () => {
    navigate("/category/jewelery");
  };
  const navigateToMensClothing = () => {
    navigate("/category/mensclothing");
  };
  const navigateToWomensClothing = () => {
    navigate("/category/womensclothing");
  };

  const handleNavigation = (title: string) => {
    switch (title.toLowerCase()) {
      case "electronics":
        navigateToElectronics();
        break;
      case "jewellery":
        navigateToJewelery();
        break;
      case "men's clothing":
        navigateToMensClothing();
        break;
      case "women's clothing":
        navigateToWomensClothing();
        break;
      default:
        break;
    }
  };

  return (
    <div className="category-container">
      {categories.map((product, index) => (
        <div
          key={index}
          className="category-card"
          onClick={() => handleNavigation(product.title)}
        >
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
