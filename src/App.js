import React from "react";
import "./App.css";
import Header from "components/layouts/header";
import Footer from "components/layouts/footer";
import { Box } from "@mui/material";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import routes from "routes";

function App() {
  return (
    // BEM
    <Box>
      <BrowserRouter>
        <Header />

        <Routes>
          {routes.map((route, i) => (
            <Route key={i} path={route.path} element={route.element} />
          ))}
        </Routes>

        <Footer />
      </BrowserRouter>
    </Box>
  );
}

export default App;
