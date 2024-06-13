import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import AppLayout from "./layout/AppLayout";
import PrivateLayout from "./layout/PrivateLayout";
import OrderListPage from "./pages/admin/OrderListPage";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import OrderPage from "./pages/OrderPage";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import ProductPage from "./pages/ProductPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import ShippingPage from "./pages/ShippingPage";
import ProductListPage from "./pages/admin/ProductListPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "product/:id", element: <ProductPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      {
        path: "",
        element: <PrivateLayout />,
        children: [
          { path: "shipping", element: <ShippingPage /> },
          { path: "payment", element: <PaymentPage /> },
          { path: "placeorder", element: <PlaceOrderPage /> },
          { path: "order/:id", element: <OrderPage /> },
          { path: "profile", element: <ProfilePage /> },
          {
            path: "admin",
            element: <AdminLayout />,
            children: [
              { path: "order-list", element: <OrderListPage /> },
              { path: "product-list", element: <ProductListPage /> },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
