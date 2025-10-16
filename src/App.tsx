import Hero from "./components/hero/Hero.tsx";
import Navbar from "./components/navbar/Navbar.tsx";
import ShopCatagories from "./components/shopCatagories/ShopCatagories.tsx";
import TopRatedProducts from "./components/topProduct/TopRatedProducts.tsx";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <TopRatedProducts />
      <ShopCatagories />
    </>
  );
}

export default App;
