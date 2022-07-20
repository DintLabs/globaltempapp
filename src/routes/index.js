import React from "react";
import Home from "pages/home";
import Search from "../SearchPage";
import AddProduct from "pages/products/AddProduct";
import { Login, Register, Account } from "pages/auth";
import ProductDetail from "pages/products/ProductDetail";
import Book from "pages/products/Book";

const routes = [
  {
    path: "",
    element: <Home />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "account",
    element: <Account />,
  },
  {
    path: "search",
    element: <Search />,
  },
  {
    path: "products/create",
    element: <AddProduct />,
  },
  {
    path: "products/:id/booking",
    element: <Book />,
  },
  {
    path: "products/:id",
    element: <ProductDetail />,
  },
];

export default routes;
