import React from "react";
import "./App.css";
import Home from "./Home";
import Header from "./Header";
import Footer from "./Footer";
import SearchPage from "./SearchPage";
import { Box } from "@mui/material";
import { Login, Register } from "pages/auth";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    // BEM
    <Box>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<SearchPage />} />
          <Route index element={<Home />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </Box>
  );
}

export default App;
