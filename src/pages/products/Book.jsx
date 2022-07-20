import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { styled } from "@mui/material/styles";
import {
  Box,
  Container,
  Button,
  Grid,
  TextField,
  Card,
  Typography,
  Divider,
} from "@mui/material";
import { MuiDateRangePicker } from "common/MuiDateRangePicker";

import { useAuthState } from "react-firebase-hooks/auth";
import { dbReal, auth, storage } from "firebase";
import { ref, onValue, update, child } from "firebase/database";
import { ref as refStorage, getDownloadURL } from "firebase/storage";

const Wrapper = styled(Box)(() => ({
  width: "100%",
}));

const Content = styled(Container)(() => ({
  padding: "60px 0",
}));

const Value = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  marginBottom: "15px",

  p: {
    fontSize: "16px",
  },
  h4: {
    fontSize: "16px",
    marginLeft: "auto",
  },
}));

const Book = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("id: ", id);

  const [user, loading, error] = useAuthState(auth);
  const [product, setProduct] = useState({});
  const [dateRange, setDateRange] = useState({});
  const [totalDays, setTotalDays] = useState(0);
  const [priceWithDays, setPriceWithDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
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

  const handleChangeDate = (values) => {
    console.log("values: ", values);
    setDateRange(values);

    const start = moment(values.startDate, "YYYY-MM-DD");
    const end = moment(values.endDate, "YYYY-MM-DD");
    const days = moment.duration(end.diff(start)).asDays();
    console.log("days: ", days);
    setPriceWithDays(Number(product.price) * days);
    setTotalPrice(product.price * days + Number(product.fee));
    setTotalDays(days);
  };

  const handleSubmit = async () => {
    const updates = {};
    updates["/booking/" + uuidv4()] = {
      product,
      total_price: totalPrice,
      days: totalDays,
      start_date: dateRange.startDate,
      end_date: dateRange.endDate,
      status: "pending",
      date_created: moment().format(),
      user_book: {
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
        <Grid container spacing={4}>
          <Grid item md={6} xs={12}>
            <Box sx={{ width: "100%", mb: "20px" }}>
              <img alt="" src={imgSrc || ""} style={{ width: "100%" }} />{" "}
            </Box>
            <h2>{product.title || ""}</h2>
            <h4 style={{ margin: "20px 0" }}>
              Price: ${product.price || ""}{" "}
              <span style={{ fontSize: "14px", color: "#666" }}>/night</span>
            </h4>
            <p>{product.description || ""}</p>
          </Grid>
          <Grid item md={6} xs={12}>
            <h1 style={{ marginBottom: "15px" }}>Booking now</h1>
            <h3>
              ${product.price}{" "}
              <span style={{ fontSize: "14px", color: "#666" }}>/night</span>
            </h3>

            <Box sx={{ my: "16px" }}>
              <MuiDateRangePicker
                TextFieldProps={{
                  label: "Check-in & Check-out",
                  placeholder: "Check-in & Check-out",
                  fullWidth: true,
                }}
                fullWidth
                dateRange={dateRange}
                onDateRangeChange={handleChangeDate}
              />
            </Box>

            <Box sx={{ mb: "15px" }}>
              <Button
                fullWidth
                variant="contained"
                color="error"
                disabled={!dateRange.startDate || !dateRange.endDate}
                onClick={handleSubmit}
              >
                Reserve
              </Button>
            </Box>

            <Value>
              <p>
                ${product.price || 0} x {totalDays} night
                {totalDays.length > 1 && "s"}
              </p>
              <h4>${priceWithDays.toLocaleString()}</h4>
            </Value>
            <Value>
              <p>Fee</p>
              <h4>${product.fee || 0}</h4>
            </Value>
            <Divider sx={{ mb: "15px" }} />
            <Value>
              <p>Total before taxes</p>
              <h4>${totalPrice.toLocaleString()}</h4>
            </Value>
          </Grid>
        </Grid>
      </Content>
    </Wrapper>
  );
};

export default Book;
