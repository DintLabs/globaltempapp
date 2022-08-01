import React from "react";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";
import HelpOutline from "@material-ui/icons/HelpOutline";
import HourglassEmpty from "@material-ui/icons/HourglassEmpty";
import LocalOfferIcon from "@material-ui/icons/LocalOfferOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
const ClientFormPart2 = ({ setOpen }) => {
  return (
    <form>
      <div className="divRight 4 marTop bg">
        <h4 className="font23dark">Enter your Address</h4>
        <div className="greenBox marTop10">
          Almost done! Just fill in the <span style={{ color: "red" }}>*</span>{" "}
          required info
        </div>
        <div className="space_between">
          <div>
            <div className="marTop10 ">
              <p className="labelFont">
                Address <span style={{ color: "red" }}>*</span>
              </p>
              <input type="text" className="input" />
            </div>
            <div className="marTop10 ">
              <p className="labelFont">
                City <span style={{ color: "red" }}>*</span>
              </p>
              <input type="text" className="input" />
            </div>
          </div>
          <div
            style={{
              border: "1px solid #dbd2d2",
              backgroundColor: " #ebf3ff",
              padding: "10px",
            }}
          >
            <div style={{ gap: "2%", display: "flex" }}>
              <span>
                <AccountCircleOutlinedIcon />
              </span>
              <p style={{ color: "#0071c2", textDecorationLine: "underline" }}>
                Change
              </p>
            </div>
            <p className="labelFont">Name</p>
            <p style={{ color: "#6b6b6b" }}>Max passa</p>
            <p className="labelFont marTop10">Email</p>
            <p style={{ color: "#6b6b6b" }}>admin@globaltemphous...</p>
          </div>
        </div>
        <div>
          <p className="labelFont">
            Zip Code <span style={{ color: "red" }}>*</span>
          </p>
          <input type="text" className="input" />
        </div>
        <div className="marTop10 ">
          <p className="labelFont">
            Country/Region <span style={{ color: "red" }}>*</span>
          </p>
          <div>
            <select value="1" className="selectbox">
              <option value="1">United states of America</option>
              <option value="2">UK</option>
            </select>
          </div>
        </div>
        <div className="marTop10 ">
          <p className="labelFont">
            Telephone (mobile number preferred){" "}
            <span style={{ color: "red" }}>*</span>
          </p>
          <input type="text" className="input" placeholder="+1" />
        </div>
        <p className="bracketGrey marTop10">So the property can reach you</p>
        <div className="marTop10" style={{ display: "flex", gap: "1%" }}>
          <input type="checkbox" name="" id="" style={{ marginTop: "-23px" }} />
          <p>
            {" "}
            <p style={{ fontSize: "14px" }}>
              Yes, I want free paperless confirmation (recommended)
            </p>
            <p className="bracketGrey marTop10">
              We 'll text you a link to download our app
            </p>
          </p>
        </div>
      </div>
      <div className="divRight 5 marTop bg">
        <h4 className="font23dark">Save your details</h4>
        <p className=" marTop10" style={{ fontSize: "14px" }}>
          Use your contact details to create an account and speed up future
          bookings.
          <br />
          (We won't save your payment info.)
        </p>

        <div className="marTop10" style={{ display: "flex", gap: "1%" }}>
          <input type="checkbox" name="" id="" />

          <p style={{ fontSize: "14px" }}>
            Save my details so I can book faster next time
          </p>
        </div>
        <p style={{ fontSize: "14px" }} className="marTop10">
          By signing in or creating an account, you agree with our{" "}
          <span
            style={{
              color: "#0071c2",
              fontSize: "14px",
              fontWeight: "600",
              textDecorationLine: "underline",
            }}
          >
            Teams & Conditions
          </span>
          and{" "}
          <span
            style={{
              color: "#0071c2",
              fontSize: "14px",
              fontWeight: "600",
              textDecorationLine: "underline",
            }}
          >
            Privacy Statement
          </span>
        </p>
      </div>
      <div className="divRight 6 marTop bg">
        <div className="space_between">
          <h4 className="font23dark">How do you want to pay?</h4>
          <div
            style={{
              color: "#0071c2",
              display: "flex",
              fontSize: "15px",
              fontWeight: "600",
              justifyContent: "center",
            }}
          >
            <span>
              <HelpOutline style={{ width: "18px" }} />
            </span>
            &nbsp;No card?
          </div>
        </div>

        <div className="marTop10 ">
          <p className="labelFont">
            cardholder's name<span style={{ color: "red" }}>*</span>
          </p>
          <input type="text" className="input" placeholder="" />
        </div>
        <div className="marTop10 ">
          <p className="labelFont">
            Card Type <span style={{ color: "red" }}>*</span>
          </p>
          <div>
            <select value="1" className="selectbox">
              <option value="1">---Select---</option>
              <option value="2">UK</option>
            </select>
          </div>
        </div>
        <div className="marTop10 ">
          <p className="labelFont">
            Card Number
            <span style={{ color: "red" }}>*</span>
          </p>
          <input type="number" className="input" />
        </div>
        <div className="marTop10 ">
          <p className="labelFont">
            Expiration Date <span style={{ color: "red" }}>*</span>
          </p>
          <div style={{ display: "flex" }}>
            <div>
              <select value="1" className="selectbox">
                <option value="1">01-jan</option>
                <option value="2">02-jan</option>
              </select>
            </div>
            &nbsp;/&nbsp;
            <div>
              <select value="1" className="selectbox">
                <option value="1">2022</option>
                <option value="2">2021</option>
              </select>
            </div>
          </div>
        </div>
        <div className="marTop10 ">
          <p className="labelFont">
            CVC code<span style={{ color: "red" }}>*</span>
          </p>
          <input type="text" className="input" />
        </div>
      </div>
      <div className="divRightButton 7 marTop ">
        <div className="marTop10" style={{ display: "flex", gap: "1%" }}>
          <input type="checkbox" name="" id="" />

          <p style={{ fontSize: "14px" }}>
            Get access to members-only deals, just like the millions of other
            email subscribers
          </p>
        </div>
        <p style={{ fontSize: "14px" }} className="marTop10">
          Your booking is directly with The Guild Downtown | X Miami and by
          completing this booking you agree on the
          <span
            style={{
              color: "#0071c2",
              fontSize: "14px",
              fontWeight: "600",
              textDecorationLine: "underline",
            }}
          >
            booking conditions, general terms,
          </span>
          and{" "}
          <span
            style={{
              color: "#0071c2",
              fontSize: "14px",
              fontWeight: "600",
              textDecorationLine: "underline",
            }}
          >
            privacy policy.
          </span>
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "2%",
          }}
          className="marTop10"
        >
          <button
            style={{
              padding: "10px 25px",
              backgroundColor: "white",
              color: "#0071c2",
              border: "1px solid #0071c2",
            }}
          >
            Check your booking
          </button>
          <button
            style={{
              padding: "10px 25px",
              color: "white",
              backgroundColor: "#0071c2",
              border: "1px solid #0071c2",
            }}
            onClick={() => setOpen(false)}
          >
            Complete booking
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

export default ClientFormPart2;
