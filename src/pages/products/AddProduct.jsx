import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import FileUpload from "react-material-file-upload";
import { styled } from "@mui/material/styles";
import { Box, TextField, Button, Card, Typography, Alert } from "@mui/material";
import "./Product.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { dbReal, auth, storage } from "firebase";
import { ref, update } from "firebase/database";
import { uploadBytes, ref as refStorage } from "firebase/storage";
import ProductCard from "./ProductCard";

const Wrapper = styled(Box)(() => ({
  width: "100%",
}));

const Content = styled(Card)(() => ({
  width: "100%",
  maxWidth: "400px",
  margin: "60px auto",
  overflow: "hidden",
  padding: "30px",
  boxSizing: "border-box",
}));

const Title = styled(Typography)(() => ({
  fontSize: "2rem",
  textAlign: "center",
  margin: "0 0 30px",
}));

const AddProduct = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const [files, setFiles] = useState([]);
  const [values, setValues] = useState({
    title: "",
    price: null,
    fee: null,
    description: "",
    date_expired: "",
  });
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login", { replace: true });
    }
  }, [user, loading, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("files: ", files, files.length);
    let imgUpload = {};
    if (files.length > 4) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        console.log("file: ", file);
        const storageRef = refStorage(storage, file.name);
        await uploadBytes(storageRef, file).then((snapshot) => {
          console.log("Uploaded a blob or file! ", snapshot);
          imgUpload[uuidv4()] = snapshot.metadata;
        });
      }
      console.log("imgUpload: ", imgUpload);

      const updates = {};
      updates["/listings/" + uuidv4()] = {
        ...values,
        photos: JSON.parse(JSON.stringify(imgUpload)),
        date_created: moment().format(),
        user_created: {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          accessToken: user.accessToken,
        },
      };

      await update(ref(dbReal), updates);
      navigate("/account", { replace: true });
    } else {
      setErrors({
        message: "Please upload at least 5 images",
      });
    }
  };

  return (
    <Wrapper>
      <div style={{ height: "100vh" }}>
        <ProductCard />
      </div>
      {/* <Content>
        <form onSubmit={handleSubmit}>
          <Title>Create Product</Title>

          {errors && (
            <Alert severity="error">
              This is an error alert — check it out!
            </Alert>
          )}

          <Box sx={{ mb: "16px" }}>
            <TextField
              variant="standard"
              name="title"
              label="Title"
              placeholder="Title"
              value={values.title}
              onChange={handleChange}
              fullWidth
              required
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
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              fullWidth
              required
            />
          </Box>

          <Box sx={{ mb: "16px" }}>
            <TextField
              variant="standard"
              name="fee"
              label="Fee"
              placeholder="Fee"
              value={values.fee}
              onChange={handleChange}
              type="number"
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              fullWidth
              required
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

          <Box sx={{ mb: "16px" }}>
            <FileUpload value={files} accept="image/*" onChange={setFiles} />
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={files.length < 5}
          >
            Submit
          </Button>
        </form>
      </Content> */}
    </Wrapper>
  );
};

export default AddProduct;
