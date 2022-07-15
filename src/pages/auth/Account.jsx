import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { auth, logout } from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { Box, Button } from "@mui/material";

const Account = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    console.log("user: ", user);
  }, [user, loading, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <Box sx={{ padding: "30px 60px" }}>
      <p>ID: {(user && user.uid) || ""}</p>
      <p>Name: {(user && user.displayName) || ""}</p>
      <p>Email: {(user && user.email) || ""}</p>

      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default Account;
