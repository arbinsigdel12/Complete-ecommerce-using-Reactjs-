import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Footer from "./components/footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import AllCategories from "./components/categories/allCategories/AllCategories";
import ProductDetail from "./components/productdetail/ProductDetail";
import CartPage from "./components/cart/CartPage";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<AllCategories />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>
      <Footer />
    </Provider>
  );
}

export default App;
