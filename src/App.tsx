import Hero from "./components/hero/Hero.tsx";
import Navbar from "./components/navbar/Navbar.tsx";
import TopRatedProducts from "./components/topProduct/TopRatedProducts.tsx";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <TopRatedProducts />
    </>
  );
}

export default App;
