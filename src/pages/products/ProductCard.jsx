import React, { useState } from "react";
import { Box, TextField, Button, Card, Typography, Alert } from "@mui/material";
import "./Product.css";
import image from "../../assets/images/property.png";
import property from "./Property";
import { useNavigate } from "react-router-dom";

const ProductCard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(property);
  return (
    <div className="grid-container">
      {data.property.map((data) => {
        return (
          <div style={{ maxWidth: "320px", marginTop: "50%" }}>
            <Card
              style={{
                padding: "20px 10px",
                maxWidth: "400px",
                cursor: "pointer",
              }}
              key={data.id}
              onClick={() => navigate("/multipleForm", { replace: true })}
            >
              <div className="centerMode">
                <img src={data.img} alt="image" width="50%" />
              </div>
              <div className="textCenter">
                <h3>{data.name}</h3>
              </div>
              <div className="centerMode">
                <Typography
                  className="textCenter"
                  style={{ padding: "10px 0px" }}
                >
                  {data.details}
                </Typography>
              </div>
              <div className="textCenter">
                <Button variant="contained">List your property</Button>
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default ProductCard;
