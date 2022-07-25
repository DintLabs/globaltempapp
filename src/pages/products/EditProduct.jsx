import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import FileUpload from "react-material-file-upload";
import Slider from "react-slick";
import { styled } from "@mui/material/styles";
import { Box, TextField, Button, Card, Typography, Alert } from "@mui/material";

import { useAuthState } from "react-firebase-hooks/auth";
import { dbReal, auth, storage } from "firebase";
import { ref, update, onValue } from "firebase/database";
import {
  uploadBytes,
  ref as refStorage,
  getDownloadURL,
} from "firebase/storage";

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

const SlideItem = styled(Box)(() => ({
  padding: "2px",
  boxSizing: "border-box",

  img: {
    height: "80px",
    width: "100%",
  },
}));

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const [files, setFiles] = useState([]);
  const [product, setProduct] = useState({});
  const [values, setValues] = useState({
    title: "",
    price: "",
    fee: "",
    description: "",
    date_expired: "",
  });
  const [errors, setErrors] = useState(null);
  const [photos, setPhotos] = useState([]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login", { replace: true });
    }
  }, [user, loading, navigate]);

  const getProductDetail = () => {
    const productsRef = ref(dbReal, "listings/" + id);
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data.title) {
        setValues({
          title: data.title,
          description: data.description,
          price: data.price,
          fee: data.fee,
        });
      }

      if (data.photos) {
        let count = 0;
        let images = [];
        for (let [key, value] of Object.entries(data.photos)) {
          if (count < 5) {
            getDownloadURL(refStorage(storage, value.name)).then((url) => {
              images.push(url);
              setPhotos(photos.concat(images));
            });
          }
          count++;
        }
      }
      setProduct(data);
    });
  };

  useEffect(() => {
    getProductDetail();
  }, [id]);

  useEffect(() => {}, [product]);

  console.log(">>> product: ", product);
  console.log(">>> photos: ", photos);
  console.log(">>> photos 0: ", photos[0]);

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
      updates["/listings/" + id] = {
        ...product,
        ...values,
        photos: JSON.parse(JSON.stringify(imgUpload)),
        date_updated: moment().format(),
        user_updated: {
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
      // update no changes photos
      const updates = {};
      updates["/listings/" + id] = {
        ...product,
        ...values,
        date_updated: moment().format(),
        user_updated: {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          accessToken: user.accessToken,
        },
      };

      await update(ref(dbReal), updates);
      navigate("/account", { replace: true });
    }
  };

  return (
    <Wrapper>
      <Content>
        <form onSubmit={handleSubmit}>
          <Title>Edit Product</Title>

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
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
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
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
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

          {photos.length > 4 && (
            <Box sx={{ mb: "35px" }}>
              <p>
                <strong>Photos</strong>
              </p>
              <Slider {...settings}>
                {photos.map((item) => (
                  <SlideItem key={item}>
                    <img alt="" src={item} />
                  </SlideItem>
                ))}
              </Slider>
            </Box>
          )}

          <Box sx={{ mb: "16px" }}>
            <FileUpload value={files} accept="image/*" onChange={setFiles} />
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            // disabled={files.length < 5}
          >
            Submit
          </Button>
        </form>
      </Content>
    </Wrapper>
  );
};

export default EditProduct;
