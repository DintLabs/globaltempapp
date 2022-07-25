import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { v4 as uuidv4 } from "uuid";
import { styled } from "@mui/material/styles";
import {
  Box,
  Container,
  Button,
  Grid,
  TextField,
  Card,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";
import { MuiDateRangePicker } from "common/MuiDateRangePicker";
// import { DateRangePicker } from 'rsuite'
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";

import { useAuthState } from "react-firebase-hooks/auth";
import { dbReal, auth, storage } from "firebase";
import { ref, onValue, update, child } from "firebase/database";
import { ref as refStorage, getDownloadURL } from "firebase/storage";
import BookPicker from "common/BookPicker";

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

const disabledDates = ["2022-07-12", "2022-07-25", "2022-07-29"];

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
  const [imgSrc, setImgSrc] = useState([]);
  // const [disabledDates, setDisabledDates] = useState([])
  const [booking, setBooking] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 0),
      key: "selection",
    },
  ]);
  const [booked, setBooked] = useState([]);

  const getDaysArray = (start, end) => {
   
  };

  console.log(">>> product: ", product);
  console.log(">>> booked: ", booked);
  const getProductDetail = () => {
    const productsRef = ref(dbReal, "listings/" + id);
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();

      setProduct(data);
    });
  };

  const getDatesBooked = (productId) => {
    const productsRef = ref(dbReal, "bookings/" + id);
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

    if (product.bookings) {
      let dates = [];
      for (let [key, value] of Object.entries(product.bookings)) {
        console.log("key: ", key);
        const startDate = value.start_date;
        const endDate = value.end_date;

        // const arr = [];
        for (
          const dt = new Date(startDate);
          dt <= new Date(endDate);
          dt.setDate(dt.getDate() + 1)
        ) {
          dates.push(new Date(dt));
        }

        // const dates = getDaysArray(startDate, endDate);
        // dates.concat(arr);
        console.log(">>> arr: ", dates);
      }
      console.log(">>> dates: ", dates);
      setBooked(booked.concat(dates));
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

  const handleChangeDates = (item) => {
    console.log("item: ", item);
    setBooking([item.selection]);

    const start = moment(item.selection.startDate, "YYYY-MM-DD");
    const end = moment(item.selection.endDate, "YYYY-MM-DD");
    const days = (moment.duration(end.diff(start)).asDays() + 1).toFixed(0);
    console.log("days: ", days);
    setPriceWithDays(Number(product.price) * days);
    setTotalPrice(product.price * days + Number(product.fee));
    setTotalDays(days);
  };

  const handleSubmit = async () => {
    const updates = {};
    updates[`/listings/${id}/bookings/${uuidv4()}`] = {
      // updates["/bookings/" + uuidv4()] = {
      // product,
      product_id: id,
      total_price: totalPrice,
      days: totalDays,
      start_date: booking[0].startDate,
      end_date: booking[0].endDate,
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
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <Box sx={{ width: "100%" }}>
              <img
                alt=""
                src={(imgSrc && imgSrc[0]) || ""}
                style={{ width: "100%" }}
              />{" "}
            </Box>
          </Grid>
          <Grid item md={6} xs={12}>
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <Box sx={{ width: "100%" }}>
                  <img
                    alt=""
                    src={(imgSrc && imgSrc[1]) || ""}
                    style={{ width: "100%" }}
                  />{" "}
                </Box>
              </Grid>

              <Grid item md={6} xs={12}>
                <Box sx={{ width: "100%" }}>
                  <img
                    alt=""
                    src={(imgSrc && imgSrc[2]) || ""}
                    style={{ width: "100%" }}
                  />{" "}
                </Box>
              </Grid>

              <Grid item md={6} xs={12}>
                <Box sx={{ width: "100%" }}>
                  <img
                    alt=""
                    src={(imgSrc && imgSrc[3]) || ""}
                    style={{ width: "100%" }}
                  />{" "}
                </Box>
              </Grid>

              <Grid item md={6} xs={12}>
                <Box sx={{ width: "100%" }}>
                  <img
                    alt=""
                    src={(imgSrc && imgSrc[4]) || ""}
                    style={{ width: "100%" }}
                  />{" "}
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Box sx={{ my: "24px" }}>
          <h2>{product.title || ""}</h2>
          <h4 style={{ margin: "20px 0" }}>
            Price: ${product.price || ""}{" "}
            <span style={{ fontSize: "14px", color: "#666" }}>/night</span>
          </h4>
          <p>{product.description || ""}</p>
        </Box>

        <h1 style={{ marginBottom: "15px" }}>Booking now</h1>

        <Grid container spacing={4}>
          <Grid item md={6} xs={12}>
            <Box sx={{ my: "16px" }}>
              <DateRange
                onChange={handleChangeDates}
                // showSelectionPreview={false}
                // moveRangeOnFirstSelection={false}
                // months={1}
                ranges={booking}
                direction="vertical"
                scroll={{ enabled: true }}
                disabledDates={booked}
                // disabledDates={disabledDates.map((date) => new Date(date))}
                // disabledDay={(date) => {
                //   // console.log(">>> date: ", date);
                //   if (moment(date).format("YYYY/MM/DD") === "2022/07/28") {
                //     return true;
                //   }
                // }}
              />
            </Box>
          </Grid>
          <Grid item md={6} xs={12}>
            <Card>
              <CardContent>
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

                <Box sx={{ mb: "15px" }}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="error"
                    disabled={!booking[0].startDate || !booking[0].endDate}
                    onClick={handleSubmit}
                  >
                    Reserve
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Content>
    </Wrapper>
  );
};

export default Book;
