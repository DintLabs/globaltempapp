import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { auth, logout } from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { Box, Button } from "@mui/material";

const Wrapper = styled(Box)(() => ({
  width: "100%",
}));

const Content = styled(Box)(() => ({
  width: "100%",
}));

const Setting = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  console.log("error: ", error);

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
  }, [user, loading, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <Wrapper>
      <Content>
        <p>ID: {(user && user.uid) || ""}</p>
        <p>Name: {(user && user.displayName) || ""}</p>
        <p>Email: {(user && user.email) || ""}</p>

        <Button variant="contained" onClick={handleLogout}>
          Logout
        </Button>
      </Content>
    </Wrapper>
  );
};

export default Setting;
