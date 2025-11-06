import { Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import ProductDetail from "./components/productdetail/ProductDetail";
import CartPage from "./components/cart/CartPage";
import AllCategories from "./components/categories/CatagoryProducts";
import {
  fetchAllProducts,
  fetchCategories,
} from "./store/slices/fetchapiSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { product, categories } = useSelector(
    (state: RootState) => state.fetchapi
  );

  useEffect(() => {
    if (product.status === "idle") {
      dispatch(fetchAllProducts());
    }
    if (categories.status === "idle") {
      dispatch(fetchCategories());
    }
  }, [dispatch, product.status, categories.status]);
  return (
    <>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<AllCategories category="all" />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
