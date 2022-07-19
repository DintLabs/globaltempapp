import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { styled } from "@mui/material/styles";
import { Box, TextField, Button, Card, Typography } from "@mui/material";
import { MuiDateRangePicker } from "common/MuiDateRangePicker";

import { useAuthState } from "react-firebase-hooks/auth";
import { dbReal, auth } from "firebase";
import { ref, push, child, update } from "firebase/database";

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
  const [user, loading, error] = useAuthState(auth);

  console.log("user: ", user);
  console.log("error: ", error);

  const [values, setValues] = useState({
    title: "",
    price: null,
    description: "",
    date_expired: "",
    image: "",
  });
  const [dateRange, setDateRange] = useState({});

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login", { replace: true });
    }
  }, [user, loading, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async () => {
    const updates = {};
    updates["/products/" + uuidv4()] = {
      ...values,
      date_expired: dateRange,
      date_created: moment().format(),
      // slug: uuidv4(),
      user: {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        accessToken: user.accessToken,
      },
    };

    await update(ref(dbReal), updates);
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
          <MuiDateRangePicker
            TextFieldProps={{
              label: "Date Expired",
              // helperText: "hello",
              // error: true,
              // variant: "outlined",
              placeholder: "Date Expired",
              fullWidth: true,
            }}
            fullWidth
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
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
