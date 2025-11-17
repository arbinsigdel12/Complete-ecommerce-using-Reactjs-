import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AllCategories from "../components/categories/CatagoryProducts";
import CategoryPage from "../pages/CategoryPage";
import App from "../App";
import ProductDetail from "../components/productdetail/ProductDetail";
import CartPage from "../components/cart/CartPage";

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: "/",
        Component: HomePage,
      },
      {
        path: "/products",
        Component: AllCategories,
      },
      {
        path: "/products/:id",
        Component: ProductDetail,
      },
      {
        path: "category/:category",
        Component: CategoryPage,
      },
      { path: "/cart", Component: CartPage },
    ],
  },
]);

export default router;
