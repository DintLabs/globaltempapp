import React, { useState } from "react";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";
import HelpOutline from "@material-ui/icons/HelpOutline";
import HourglassEmpty from "@material-ui/icons/HourglassEmpty";
import LocalOfferIcon from "@material-ui/icons/LocalOfferOutlined";

const ClientForm = ({ setOpen }) => {
  return (
    <form>
      <div className="divRight 4 marTop bg" id="resOrder5">
        <h4 className="font23dark">Enter your details</h4>
        <div className="greenBox marTop10">
          Almost done! Just fill in the <span style={{ color: "red" }}>*</span>{" "}
          required info
        </div>
        {/* < action="" className="marTop10"> */}
        <p className="labelFont marTop10">Are you traveling for work?</p>
        <p>
          {" "}
          <input type="radio" name="" id="" />
          &nbsp; Yes&nbsp;&nbsp;&nbsp;
          <input type="radio" name="" id="" />
          &nbsp; No
        </p>
        <div
          className="marTop10 notFlex"
          style={{ display: "flex", gap: "2%" }}
        >
          <div>
            <p className="labelFont">
              First Name <span style={{ color: "red" }}>*</span>
            </p>
            <input type="text" className="input" />
          </div>
          <div>
            <p className="labelFont">
              Last Name <span style={{ color: "red" }}>*</span>
            </p>
            <input type="text" className="input" />
          </div>
        </div>
        <div className="marTop10 ">
          <p className="labelFont">
            Email Address <span style={{ color: "red" }}>*</span>
          </p>
          <input
            type="text"
            className="input"
            placeholder="Double-check for typos"
          />
          <p className="bracketGrey" style={{ marginTop: "5px" }}>
            Confirmation email sent to this address
          </p>
        </div>
        <div className="marTop10 ">
          <p className="labelFont">
            Confirm Email Address <span style={{ color: "red" }}>*</span>
          </p>
          <input type="text" className="input" />
        </div>
        <div className="marTop10 ">
          <p className="labelFont">Who are you booking for?</p>
          <p style={{ fontSize: "15px" }} className="marTop10 ">
            {" "}
            <div>
              {" "}
              <input type="radio" name="" id="" />
              &nbsp; I'm the main guest
            </div>
            <div style={{ marginTop: "5px" }}>
              <input type="radio" name="" id="" />
              &nbsp; I'm booking for someone else
            </div>
          </p>
        </div>
      </div>
      <div className="divRight 5 marTop bg">
        <h4 className="font23dark">1 King Bed, City View, Aloft Room</h4>
        <p style={{ display: "flex" }} className="marTop10 ">
          <span>
            <CheckCircleOutline style={{ color: "rgb(0, 128, 9)" }} />
          </span>
          <p style={{ color: "rgb(0, 128, 9)", fontSize: "13px" }}>
            {" "}
            <span
              className="fontSize"
              style={{ fontWeight: "700", fontSize: "15px" }}
            >
              Free cancellation
            </span>{" "}
            until 11:59 PM on August 9, 2022
          </p>
          <span>
            <HelpOutline style={{ color: "#0071c2", width: "16px" }} />
          </span>
        </p>
        <p className="bracketGrey">Exceptionally clean rooms ??? 8.7</p>
        <div
          style={{ display: "flex", alignItems: "center", gap: "1%" }}
          className="marTop10"
        >
          <p className="labelFont">Guests:</p>
          <div>
            <select value="2" className="selectbox">
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
        </div>
        <div className="marTop10">
          <p className="labelFont">Full Guest Name</p>
          <input
            type="text"
            className="input"
            placeholder="First name, Last name"
          />
        </div>
      </div>
      <div className="divRight 6 marTop bg">
        <h4 className="font23dark">Add to your stay</h4>
        <div className="marTop10" style={{ display: "flex", gap: "1%" }}>
          <input type="checkbox" name="" id="" style={{ marginTop: "-23px" }} />
          <p>
            {" "}
            <p style={{ fontSize: "14px" }}>I'm interested in renting a car</p>
            <p className="bracketGrey marTop10">
              Make the most of your trip ??? check out car rental options in your
              booking confirmation.
            </p>
          </p>
        </div>
      </div>
      <div className="divRight 7 marTop bg">
        <h4 className="font23dark">Special requests</h4>
        <p className=" marTop10" style={{ fontSize: "14px" }}>
          Special requests can't be guaranteed, but the property will do its
          best to meet your needs. You can always make a special request after
          your booking is complete.
        </p>
        <p className="labelFont marTop10">
          Please write your requests in English or Hindi.{" "}
          <span className="bracketGrey">(optional)</span>
        </p>
        <textarea
          className="marTop10"
          name=""
          id=""
          cols="30"
          rows="10"
          style={{ width: "100%" }}
        ></textarea>
        <div className="marTop10" style={{ display: "flex", gap: "1%" }}>
          <input type="checkbox" name="" id="" />

          <p style={{ fontSize: "14px" }}>
            I'd like free private parking on site
          </p>
        </div>
      </div>
      <div className="divRight 8 marTop bg">
        <h4 className="font23dark">Your arrival time</h4>
        <div style={{ display: "flex" }} className="marTop10">
          <span style={{ marginRight: "2%" }}>
            <CheckCircleOutline style={{ color: "rgb(0, 128, 9)" }} />
          </span>
          <span style={{ fontSize: "15px" }}>
            Your room will be ready for check-in at 3:00 PM.
          </span>
        </div>
        <div style={{ display: "flex" }} className="marTop10">
          <span style={{ marginRight: "2%" }}>
            <HourglassEmpty style={{ color: "rgb(0, 128, 9)" }} />
          </span>
          <span style={{ fontSize: "15px" }}>
            Your room will be ready for check-in at 3:00 PM.
          </span>
        </div>
        <div className="marTop10 ">
          <p className="labelFont">
            Add your estimated arrival time{" "}
            <span style={{ color: "red" }}>*</span>
          </p>
          <select defaultValue="Please Select" className="selectbox">
            <option value="1">Please Select</option>
            <option value="2">2</option>
          </select>
        </div>
        <p className="bracketGrey marTop10">Time is for New Delhi time zone</p>
      </div>
      <div
        className="divRightButton marTop "
        style={
          {
            //   justifyContent: "center",
            //   display: "flex",
            //   flexDirection: "column",
          }
        }
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <p
            style={{
              display: "flex",
              color: "#0071c2",
              fontSize: "15px",
              fontWeight: "400",
              marginRight: "10px",
            }}
          >
            <span>
              {" "}
              <LocalOfferIcon style={{ color: "#0071c2" }} />
            </span>
            We Price Match
          </p>
          <button
            style={{
              padding: "10px 25px",
              color: "white",
              backgroundColor: "#0071c2",
              border: "none",
            }}
            onClick={() => setOpen(true)}
          >
            Next: Final details
          </button>
        </div>
        <p
          style={{
            color: "#0071c2",
            textDecorationLine: "underline",
            textAlign: "right",
            fontSize: "14px",
            fontWeight: "700",
          }}
          className="marTop10"
        >
          What are my booking conditions?
        </p>
      </div>
    </form>
  );
};

export default ClientForm;
