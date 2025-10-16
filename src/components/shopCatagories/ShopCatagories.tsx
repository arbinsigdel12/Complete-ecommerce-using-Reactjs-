import React from "react";
import ProductCategory from "../productCatagory/ProductCatagory";
import "./shopCatagories.css";

const ShopCategory: React.FC = () => {
  return (
    <section className="shop-category-section">
      <div className="shop-category-heading">
        <h2>Shop Our Top Categories</h2>
      </div>

      <ProductCategory />
    </section>
  );
};

export default ShopCategory;
