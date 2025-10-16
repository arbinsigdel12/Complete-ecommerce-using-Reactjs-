import Footer from "./components/footer/Footer.tsx";
import Hero from "./components/hero/Hero.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";
import ShopCategories from "./components/shopCategories/ShopCategories.tsx";
import TopRatedProducts from "./components/topProduct/TopRatedProducts.tsx";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <TopRatedProducts />
      <ShopCategories />
      <Footer />
    </>
  );
}

export default App;
