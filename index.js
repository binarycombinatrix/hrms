import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./store/Index";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.2.0";
import "assets/demo/demo.css";
import "assets/scss/custom.scss"; //custom scss file
import "perfect-scrollbar/css/perfect-scrollbar.css";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import "index.css";
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ToastContainer autoClose={3000} />
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
