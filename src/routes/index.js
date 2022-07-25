import React from "react";
import Home from "pages/home";
import Search from "../SearchPage";
import AddProduct from "pages/products/AddProduct";
import EditProduct from "pages/products/EditProduct";
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
    isPrivate: true,
  },
  {
    path: "search",
    element: <Search />,
  },
  {
    path: "products/create",
    element: <AddProduct />,
    isPrivate: true,
  },
  {
    path: "products/:id/booking",
    element: <Book />,
    isPrivate: true,
  },
  {
    path: "products/:id/update",
    element: <EditProduct />,
    isPrivate: true,
  },
  {
    path: "products/:id",
    element: <ProductDetail />,
  },
];

export default routes;
