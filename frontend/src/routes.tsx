import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import PrivateRoute from "./components/PrivateRoute";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import OrderPage from "./pages/OrderPage";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
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
          { path: "payment", element: <PaymentPage /> },
          { path: "placeorder", element: <PlaceOrderPage /> },
          { path: "order/:id", element: <OrderPage /> },
        ],
      },
    ],
  },
]);

export default router;
