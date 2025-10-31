import React from "react";
import Hero from "../components/hero/Hero";
import TopRatedProducts from "../components/topProduct/TopRatedProducts";
import ShopCategories from "../components/shopCategories/ShopCategories";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <TopRatedProducts />
      <ShopCategories />
    </>
  );
};

export default HomePage;
