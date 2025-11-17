import Footer from "./components/footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import {
  fetchAllProducts,
  fetchCategories,
} from "./store/slices/fetchapiSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import type { AppDispatch } from "./store";
import { Outlet } from "react-router-dom";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
    <>
      <Navbar />
      <div className="App">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
