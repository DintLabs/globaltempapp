import React, { useState } from "react";
import "./index.css";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

import Search from "components/home/search";

function Banner() {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="banner">
    
      <div className="banner__info">
        <h1>Get out and stretch your imagination</h1>
        <h5>
          Plan a different kind of getaway to uncover the hidden gems near you.
        </h5>
        <Button
          onClick={() => navigate("/search", { replace: true })}
          variant="outlined"
        >
          Explore Nearby
        </Button>
      </div>
    </div>
  );
}

export default Banner;
