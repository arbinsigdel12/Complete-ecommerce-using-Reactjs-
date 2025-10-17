import { Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";
import Hero from "./components/hero/Hero.tsx";
import ShopCategories from "./components/shopCategories/ShopCategories.tsx";
import TopRatedProducts from "./components/topProduct/TopRatedProducts.tsx";
import AllCategories from "./components/allCategories/AllCategories.tsx";

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
          <Route path="/all-categories" element={<AllCategories />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
