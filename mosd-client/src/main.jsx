import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "aos";
import "aos/dist/aos.css";
import { BrowserRouter } from "react-router-dom";
import { store } from "./App/store";
import { Provider } from "react-redux";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
);
