import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../src/app/store";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import router from "./routes";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const paypalOptions = { clientId: "" };

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true} options={paypalOptions}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
