import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { styled } from "@mui/material/styles";
import {
  Box,
  Paper,
  Button,
  TextField,
  Typography,
} from "@mui/material";

const Wrapper = styled(Box)(() => ({
  width: "100%",
  overflow: "hidden",
  background: "#f8f8f8",
  minHeight: "50vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "60px 0",
}));

const Content = styled(Paper)(() => ({
  width: "400px",
  overflow: "hidden",
  margin: "0 auto",
  padding: "30px",
}));

const Title = styled(Typography)(() => ({
  fontSize: "2rem",
  textAlign: "center",
  margin: "0 0 30px",
}));

const OtherLink = styled(Box)(() => ({
  textAlign: "center",
  marginBottom: "16px",

  a: {
    textDecoration: 'none',
  }
}))

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/account", { replace: true });
  }, [user, loading, navigate]);

  return (
    <Wrapper>
      <Content>
        <Title>Login</Title>

        <Box sx={{ mb: "16px" }}>
          <TextField
            variant="standard"
            label="Email Address"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
        </Box>

        <Box sx={{ mb: "16px" }}>
          <TextField
            type="password"
            variant="standard"
            label="Password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
        </Box>

        <Button
          variant="contained"
          fullWidth
          onClick={() => logInWithEmailAndPassword(email, password)}
          sx={{ marginBottom: "16px" }}
        >
          Login
        </Button>
        <Button
          variant="contained"
          fullWidth
          color="error"
          onClick={signInWithGoogle}
          sx={{ marginBottom: "16px" }}
        >
          Login with Google
        </Button>

        <OtherLink>
          <Link to="/reset">Forgot Password</Link>
        </OtherLink>
        <OtherLink>
          Don't have an account? <Link to="/register">Register</Link> now.
        </OtherLink>
      </Content>
    </Wrapper>
  );
};
export default Login;
