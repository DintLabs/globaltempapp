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
    const productsRef = ref(dbReal, "products");
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      setProducts(data);
    });
  };

  return (
    <div className="home">
      <Banner />

      <Box sx={{ p: 4 }}>
        <Grid container spacing={4}>
          {products &&
            Object.entries(products).length > 0 &&
            Object.entries(products).map(([key, item], i) => (
              <Grid item md={4} sm={6} xs={12} key={i}>
                <Card
                  id={key}
                  src={item.photos[Object.keys(item.photos)[0]] || ""}
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
