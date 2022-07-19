import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box, Container } from "@mui/material";

import { useAuthState } from "react-firebase-hooks/auth";
import { dbReal, auth } from "firebase";
import { ref, onValue } from "firebase/database";

const Wrapper = styled(Box)(() => ({
  width: "100%",
}));

const Content = styled(Container)(() => ({
  padding: "60px 0",
  margin: "0 auto",
}));

const ProductDetail = () => {
  const { id } = useParams();
  console.log("id: ", id);

  const [user, loading, error] = useAuthState(auth);
  const [product, setProduct] = useState({});

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

  return (
    <Wrapper>
      <Content>
        <p>ID: {id}</p>
        <h3>{product.title || ""}</h3>
        <Box sx={{ width: "200px" }}>
          <img alt="" src={product.image || ""} style={{ width: "100%" }} />{" "}
        </Box>
        <p>Price: {product.price || ""}</p>
        <p>Description: {product.description || ""}</p>
      </Content>
    </Wrapper>
  );
};

export default ProductDetail;
