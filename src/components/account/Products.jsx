import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box, Button } from "@mui/material";

import { ref, onValue } from "firebase/database";
import { dbReal } from "firebase";
import ProductsList from "./ProductsList";

const Wrapper = styled(Box)(() => ({
  width: "100%",
}));

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  console.log("products: ", products);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    console.log("getProducts");

    const productsRef = ref(dbReal, "listings");
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      console.log("data: ", data);
      setProducts(data);
    });
  };

  const handleAddProduct = () => {
    navigate("/products/create", { replace: true });
  };

  return (
    <Wrapper>
      <Box sx={{ mb: "24px" }}>
        <Button variant="contained" onClick={handleAddProduct}>
          Add Product
        </Button>
      </Box>
      <ProductsList data={products} />
    </Wrapper>
  );
};

export default Products;
