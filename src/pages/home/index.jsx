import React, { useEffect, useState } from "react";
import "./index.css";
import Banner from "components/home/banner";
import Card from "components/home/card";

import { dbReal } from "firebase";
import { get, ref, onValue } from "firebase/database";
import { Grid, Box } from "@mui/material";
// ES7 snippets to do 'rfce'

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    console.log("getProducts");

    const productsRef = ref(dbReal, "products");
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      console.log("data: ", data);
      setProducts(data);
    });
  };

  console.log("products: ", products);

  return (
    <div className="home">
      <Banner />

      <Box sx={{ p: 4 }}>
        <Grid container spacing={4}>
          {products &&
            Object.entries(products).length > 0 &&
            Object.entries(products).map(([key, item], i) => (
              <Grid item md={4} sx={12} key={i}>
                <Card
                  id={key}
                  src={item.image || ""}
                  title={item.title || ""}
                  description={item.description || ""}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
    </div>
  );
}

export default Home;
