import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box, TextField, Button, Card, Typography } from "@mui/material";

import { dbReal } from "firebase";
import { ref, set, get, onValue, push, child, update } from "firebase/database";

const Wrapper = styled(Box)(() => ({
  width: "100%",
}));

const Content = styled(Card)(() => ({
  width: "100%",
  maxWidth: "400px",
  margin: "60px auto",
  overflow: "hidden",
  padding: "30px",
}));

const Title = styled(Typography)(() => ({
  fontSize: "2rem",
  textAlign: "center",
  margin: "0 0 30px",
}));

const AddProduct = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    title: "",
    price: 0,
    description: "",
    date_expired: "",
    image: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async () => {
    const newProductKey = push(child(ref(dbReal), "products")).key;
    const updates = {};
    updates["/products/" + newProductKey] = values;

    console.log("newProduct: ", newProductKey);

    const response = await update(ref(dbReal), updates);
    console.log("response: ", response);
    navigate("/", { replace: true });
  };

  return (
    <Wrapper>
      <Content>
        <Title>Create Product</Title>

        <Box sx={{ mb: "16px" }}>
          <TextField
            variant="standard"
            name="title"
            label="Title"
            placeholder="Title"
            value={values.title}
            onChange={handleChange}
            fullWidth
          />
        </Box>

        <Box sx={{ mb: "16px" }}>
          <TextField
            variant="standard"
            name="price"
            label="Price"
            placeholder="Price"
            value={values.price}
            onChange={handleChange}
            type="number"
            fullWidth
          />
        </Box>

        <Box sx={{ mb: "16px" }}>
          <TextField
            variant="standard"
            name="image"
            label="Image URL"
            placeholder="Image URL"
            value={values.image}
            onChange={handleChange}
            fullWidth
          />
        </Box>

        <Box sx={{ mb: "16px" }}>
          <TextField
            variant="standard"
            name="description"
            label="Description"
            placeholder="Description"
            value={values.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
          />
        </Box>

        <Button variant="contained" fullWidth onClick={handleSubmit}>
          Submit
        </Button>
      </Content>
    </Wrapper>
  );
};

export default AddProduct;
