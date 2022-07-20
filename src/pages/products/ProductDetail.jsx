import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box, Container, Grid, Button } from "@mui/material";

import { useAuthState } from "react-firebase-hooks/auth";
import { dbReal, auth, storage } from "firebase";
import { ref, onValue } from "firebase/database";
import { ref as refStorage, getDownloadURL } from "firebase/storage";

const Wrapper = styled(Box)(() => ({
  width: "100%",
}));

const Content = styled(Container)(() => ({
  padding: "60px 0",
  margin: "0 auto",
}));

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("id: ", id);

  const [user, loading, error] = useAuthState(auth);
  const [product, setProduct] = useState({});
  const [imgSrc, setImgSrc] = useState(null);

  const getProductDetail = () => {
    const productsRef = ref(dbReal, "products/" + id);
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      setProduct(data);
    });
  };

  useEffect(() => {
    getProductDetail();
  }, [id]);

  useEffect(() => {
    if (product.photos) {
      getDownloadURL(
        refStorage(storage, product.photos[Object.keys(product.photos)[0]].name)
      ).then((url) => {
        setImgSrc(url);
      });
    }
  }, [product]);

  const handleBook = () => {
    navigate(`/products/${id}/booking`, { replace: true });
  };

  return (
    <Wrapper>
      <Content>
        <Grid container spacing={4}>
          <Grid item md={4} xs={12}>
            <Box sx={{ width: "100%" }}>
              <img alt="" src={imgSrc || ""} style={{ width: "100%" }} />{" "}
            </Box>
          </Grid>
          <Grid item md={8} xs={12}>
            <h2>{product.title || ""}</h2>
            <h4 style={{ margin: "20px 0" }}>
              Price: ${product.price || ""}{" "}
              <span style={{ fontSize: "14px", color: "#666" }}>/night</span>
            </h4>
            <p>{product.description || ""}</p>

            <Box sx={{ mt: "20px", textAlign: "center" }}>
              <Button variant="contained" onClick={handleBook}>
                Book Now
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Content>
    </Wrapper>
  );
};

export default ProductDetail;
