import React from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";

import routes from "routes";

import Header from "components/layouts/Header";
import Footer from "components/layouts/Footer";
import NotFound from "pages/not-found";

function App() {
  return (
    // BEM
    <Box>
      <BrowserRouter>
        <Header />

        <Routes>
          {routes.map((route, i) => {
            return <Route key={i} path={route.path} element={route.element} />;
          })}

          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </Box>
  );
}

export default App;
