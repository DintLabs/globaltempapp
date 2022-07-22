import React, { useState } from "react";
import "./index.css";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";



function Banner() {
  const navigate = useNavigate();


  return (
    <div className="banner">
    
      <div className="banner__info">
        <h1>Get out and stretch your imagination</h1>
        <h5>
          Plan a different kind of getaway to uncover the hidden gems near you.
        </h5>
     
      </div>
    </div>
  );
}

export default Banner;
