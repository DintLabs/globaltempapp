import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword, signInWithGoogle } from "firebase";

import { styled } from "@mui/material/styles";
import { Box, Paper, Button, TextField, Typography } from "@mui/material";

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
    textDecoration: "none",
  },
}));

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  console.log("user: ", user);

  const register = () => {
    registerWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/", { replace: true });
  }, [user, loading]);

  return (
    <Wrapper>
      <Content>
        <Title>Register</Title>

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
          onClick={register}
          sx={{ mb: "16px" }}
        >
          Register
        </Button>
        <Button
          variant="contained"
          fullWidth
          color="error"
          onClick={signInWithGoogle}
          sx={{ mb: "16px" }}
        >
          Register with Google
        </Button>

        <OtherLink>
          Already have an account? <Link to="/">Login</Link> now.
        </OtherLink>
      </Content>
    </Wrapper>
  );
};
export default Register;
