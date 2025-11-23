import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Builder from "./frontend/pages/builder";
import Calculator from "./frontend/pages/calculator";
import Catalog from "./frontend/pages/catalog";
import Home from "./frontend/pages/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/builder",
    element: <Builder />,
  },
  {
    path: "/catalog",
    element: <Catalog />,
  },
  {
    path: "/calculator",
    element: <Calculator />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
