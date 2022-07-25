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

const ViewImage = styled(Box)(() => ({
  width: "100%",
  height: "100%",

  img: {
    width: "100%",
    height: "100%",
  },
}));

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, loading, error] = useAuthState(auth);
  const [product, setProduct] = useState({});
  const [imgSrc, setImgSrc] = useState([]);

  const getProductDetail = () => {
    const productsRef = ref(dbReal, "listings/" + id);
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
      let count = 0;
      let photos = [];
      for (let [key, value] of Object.entries(product.photos)) {
        if (count < 5) {
          getDownloadURL(refStorage(storage, value.name)).then((url) => {
            photos.push(url);
            setImgSrc(imgSrc.concat(photos));
          });
        }
        count++;
      }
    }
  }, [product]);

  const handleBook = () => {
    navigate(`/products/${id}/booking`, { replace: true });
  };

  return (
    <Wrapper>
      <Content>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <ViewImage>
              <img
                alt=""
                src={(imgSrc && imgSrc[0]) || ""}
                style={{ width: "100%" }}
              />{" "}
            </ViewImage>
          </Grid>
          <Grid item md={6} xs={12}>
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <ViewImage>
                  <img
                    alt=""
                    src={(imgSrc && imgSrc[1]) || ""}
                    style={{ width: "100%" }}
                  />{" "}
                </ViewImage>
              </Grid>

              <Grid item md={6} xs={12}>
                <ViewImage>
                  <img
                    alt=""
                    src={(imgSrc && imgSrc[2]) || ""}
                    style={{ width: "100%" }}
                  />{" "}
                </ViewImage>
              </Grid>

              <Grid item md={6} xs={12}>
                <ViewImage>
                  <img
                    alt=""
                    src={(imgSrc && imgSrc[3]) || ""}
                    style={{ width: "100%" }}
                  />{" "}
                </ViewImage>
              </Grid>

              <Grid item md={6} xs={12}>
                <ViewImage>
                  <img
                    alt=""
                    src={(imgSrc && imgSrc[4]) || ""}
                    style={{ width: "100%" }}
                  />{" "}
                </ViewImage>
              </Grid>
            </Grid>
          </Grid>

          {/* <Grid item md={4} xs={12}>
            <ViewImage>
              <img alt="" src={imgSrc || ""} style={{ width: "100%" }} />{" "}
            </ViewImage>
          </Grid> */}
          <Grid item xs={12}>
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
