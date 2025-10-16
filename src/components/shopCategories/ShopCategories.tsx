import React from "react";
import ProductCategory from "../productCatagory/ProductCatagory";
import "./shopCategories.css";

const ShopCategory: React.FC = () => {
  return (
    <section className="shop-category-section">
      <h2>Shop Our Top Categories</h2>

      <ProductCategory />
    </section>
  );
};

export default ShopCategory;
