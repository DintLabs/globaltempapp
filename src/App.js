import React from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@mui/material";

import routes from "routes";

import Header from "components/layouts/Header";
import Footer from "components/layouts/Footer";
import NotFound from "pages/not-found";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "firebase";

function App() {
  const { user, loading } = useAuthState(auth);

  return (
    // BEM
    <Box>
      <BrowserRouter>
        <Header />

        <Routes>
          {routes.map((route, i) => {
            if (route.isPrivate) {
              return (
                <Route
                  key={i}
                  path={route.path}
                  element={
                    user && !loading ? (
                      route.element
                    ) : (
                      <Navigate key={i} to="/login" replace={true} />
                    )
                  }
                />
              );
            } else {
              return (
                <Route key={i} path={route.path} element={route.element} />
              );
            }
          })}

          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </Box>
  );
}

export default App;
