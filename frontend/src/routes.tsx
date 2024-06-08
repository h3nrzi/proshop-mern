import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import PrivateRoute from "./components/PrivateRoute";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductPage from "./pages/ProductPage";
import RegisterPage from "./pages/RegisterPage";
import ShippingPage from "./pages/ShippingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "product/:id", element: <ProductPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      {
        path: "",
        element: <PrivateRoute />,
        children: [
          { path: "shipping", element: <ShippingPage /> },
          { path: "shipping", element: <ShippingPage /> },
        ],
      },
    ],
  },
]);

export default router;
