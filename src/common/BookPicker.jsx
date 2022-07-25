import React from "react";
import "rsuite/dist/rsuite.css";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { DateRangePicker } from "rsuite";
import { isAfter, isSameDay } from "date-fns";
import moment from "moment";

const BookPicker = () => {
  const disabledDates = ["2022-07-23", "2022-07-27"];
  const formatStr = "YYYY-MM-DD";
  return (
    <Box>
      <DateRangePicker
        disabledDate={(date, dt) => {
          console.log(">>> date: ", moment(date).format());
          console.log(">>> dt: ", moment(dt).format());
          // for (let i = 0; i < disabledDates.length; i++) {
          //   const el = disabledDates[i];
          //   console.log(">>> el: ", moment(el).format());
          //   if (
          //     moment(date).format(formatStr) === moment(el).format(formatStr)
          //   ) {
          //     console.log(">>>>>> True");
          //     return true;
          //   } else {
          //     console.log(">>>>>> check: ");
          //     return false;
          //   }
          // }
          // if(moment(date).format("YYYY-MM-DD"))
          // isAfter(date, new Date())
        }}
      />
    </Box>
  );
};

export default BookPicker;
