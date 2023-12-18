import "moment/locale/ko";
import { Providers } from "providers";
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "styles/globals.scss";
import router from "./router";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Providers>
      <RouterProvider router={router} />
      <ToastContainer
        theme="dark"
        position="top-center"
        hideProgressBar={true}
        icon={false}
        style={{ width: "unset", height: 44, right: 16, left: 16 }}
        toastClassName={"customContainer"}
        bodyClassName={"customBody"}
      />
    </Providers>
  </React.StrictMode>
);
