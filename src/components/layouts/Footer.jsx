import React from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

const Wrapper = styled(Box)(() => ({
  width: "100%",
  textAlign: "center",
  padding: "16px",
  boxSizing: "border-box",
  overflow: "hidden",
}));

function Footer() {
  return (
    <Wrapper>
      <p>© 2022 Global Temp Housing, LLC.</p>
    </Wrapper>
  );
}

export default Footer;
