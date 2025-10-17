import { Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";
import Hero from "./components/hero/Hero.tsx";
import ShopCategories from "./components/shopCategories/ShopCategories.tsx";
import TopRatedProducts from "./components/topProduct/TopRatedProducts.tsx";
import AllCategories from "./components/categories/allCategories/AllCategories";
import Electronics from "./components/categories/electronics/Electronics";
import Jewelery from "./components/categories/jewelery/Jewelery";
import MensClothing from "./components/categories/mensclothing/Mensclothing";
import WomensClothing from "./components/categories/womensclothing/Womensclothing";

function App() {
  return (
    <>
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
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
