import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Footer from "./components/footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/hero/Hero";
import ShopCategories from "./components/shopCategories/ShopCategories";
import TopRatedProducts from "./components/topProduct/TopRatedProducts";
import AllCategories from "./components/categories/allCategories/AllCategories";
import Electronics from "./components/categories/electronics/Electronics";
import Jewelery from "./components/categories/jewelery/Jewelery";
import MensClothing from "./components/categories/mensclothing/Mensclothing";
import WomensClothing from "./components/categories/womensclothing/Womensclothing";
import ProductDetail from "./components/productdetail/ProductDetail";
import CartPage from "./components/cart/CartPage";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <TopRatedProducts />
                <ShopCategories />
              </>
            }
          />
          <Route path="/products" element={<AllCategories />} />
          <Route path="/category/electronics" element={<Electronics />} />
          <Route path="/category/jewelery" element={<Jewelery />} />
          <Route path="/category/mensclothing" element={<MensClothing />} />
          <Route path="/category/womensclothing" element={<WomensClothing />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>
      <Footer />
    </Provider>
  );
}

export default App;
