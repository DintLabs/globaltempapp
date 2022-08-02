import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box, Button } from "@mui/material";
import "../MainForm.css";

const Wrapper = styled(Box)(() => ({
  width: "100%",
}));

const Name = () => {
  return (
    <Wrapper>
      <Box sx={{ mb: "24px" }}>
        <div
          className="sub1_Form_steps"
          style={{ border: "1px solid black", textAlign: "left" }}
        >
          <h5 style={{ padding: "20px 0px", fontWeight: "400" }}>
            What's the name of your place?
          </h5>
          <div className="space_between" style={{ width: "100%" }}>
            <div
              style={{
                width: "79%",
              }}
            >
              <div className="min-height">
                <Box>
                  <div style={{ padding: "10px" }}>
                    <p className="labelFont">Property Name</p>
                    <input
                      type="text"
                      className="input"
                      style={{ width: "100%" }}
                      placeholder="GTH-Art Miami"
                    />
                  </div>
                </Box>
              </div>
            </div>
            <div style={{ width: "20%" }}>
              <div>
                <Box style={{ backgroundColor: "white", padding: "10px" }}>
                  <div className="space_between">
                    <div>icon</div>
                    <h5>What should I consider when choosing a name?</h5>
                    <div>icon</div>
                  </div>
                  <div>
                    <ul>
                      <li>Keep it short and catchy</li>
                      <li>Avoid abbreviations</li>
                      <li>Stick to the facts</li>
                    </ul>
                  </div>
                </Box>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Wrapper>
  );
};

export default Name;
