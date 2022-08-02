import React, { useEffect, useState } from "react";
import "./ClientDetails.css";
import hotelImg from "assets/images/hotel.jpg";
import StarRatings from "react-star-ratings";
import ThumbUpAlt from "@material-ui/icons/ThumbUpAlt";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";
import HelpOutline from "@material-ui/icons/HelpOutline";
import PermIdentityOutlined from "@material-ui/icons/PermIdentityOutlined";
import ClientForm from "./ClientForm";
import ClientFormPart2 from "./ClientFormPart2";
import { useLocation } from "react-router-dom";
import { ref as refStorage, getDownloadURL } from "firebase/storage";
import { dbReal, auth, storage } from "firebase";
import Moment from "react-moment";
const ClientDetails = () => {
  const { state } = useLocation();
  console.log(state);
  const [data, setData] = useState(state.product);
  const [data1, setData1] = useState(state);
  const [open, setOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState([]);
  useEffect(() => {
    if (data.photos) {
      let count = 0;
      let photos = [];
      for (let [key, value] of Object.entries(data.photos)) {
        if (count < 5) {
          getDownloadURL(refStorage(storage, value.name)).then((url) => {
            photos.push(url);
            setImgSrc(imgSrc.concat(photos));
          });
        }
        count++;
      }
    }
  }, [data]);
  return (
    <div className="fontSize css-apenfw-MuiContainer-root">
      <div
        style={{
          padding: "15px",
        }}
        className="space_between main"
      >
        <div
          style={{
            width: "28.5%",
            padding: "10px",
          }}
          className="fullWidth padding1"
        >
          <div className="divLeft 1" id="resOrder2">
            <h4>Your booking details</h4>
            <div className="flex marTop notFlex">
              <div className="checkOutD" style={{ position: "relative" }}>
                <ul
                  className="paddOut"
                  style={{ listStyle: "none", padding: "0px 40px 0px 0px" }}
                >
                  <li>Check-in</li>
                  <li>
                    <h4>
                      {" "}
                      <Moment format="dddd, MMMM Do YYYY">
                        {data1.start_date}
                      </Moment>
                    </h4>
                  </li>
                  <li style={{ color: "#6b6b6b" }}>From 3:00 PM</li>
                </ul>
              </div>
              <div className="checkOutD">
                <ul
                  className="paddOut"
                  style={{ listStyle: "none", padding: "0px 0px 0px 10px" }}
                >
                  <li>Check-out</li>
                  <li>
                    <h4>
                      <Moment format="dddd, MMMM Do YYYY">
                        {data1.end_date}
                      </Moment>
                    </h4>
                  </li>
                  <li style={{ color: "#6b6b6b" }}>Until 12:00 PM</li>
                </ul>
              </div>
            </div>
            <div className="marTop">
              <span>
                Total length of stay: <h4>{data1.days} nights</h4>
              </span>
            </div>
            {open == false ? (
              <div className="marTop borderTop paddingTop">
                <h4>You selected:</h4>
                <span>1 King Bed, City View, Aloft Room</span>
                <h4 style={{ color: "#0071c2", marginTop: "10px" }}>
                  Change your Selection
                </h4>
              </div>
            ) : null}
          </div>

          {open == false ? (
            <>
              <div className="divLeft 2 marTop bg" id="resOrder3">
                <div className="padding">
                  <h4 className="space_between">
                    <span>Price</span>
                    <span>$ {data1.priceWithDays}</span>
                  </h4>
                  <span className="bracketGrey">
                    (for 2 guests and {data1.days} nights)
                  </span>
                </div>
              </div>
              <div className="divLeft 3">
                <div className="padding">
                  <h4>Excluded charges</h4>
                  <div className="space_between">
                    <span>Goods & services tax</span>
                    <span>$ 1,560</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="divLeft 3 marTop">
                <div className="padding">
                  <h4 className="">Your Price Summary</h4>
                  <div className="space_between marTop">
                    <span>Studio</span>
                    <span>$ 1,560</span>
                  </div>
                  <div className="space_between">
                    <span>13 % Tax</span>
                    <span>$ 1,560</span>
                  </div>
                </div>
              </div>
              <div className="divLeft 2  bg">
                <div className="padding">
                  <h4 className="space_between">
                    <span>Price</span>
                    <span>$ 13,000</span>
                  </h4>
                  <span className="bracketGrey">
                    (for 2 guests and 2 nights)
                  </span>
                </div>
              </div>
            </>
          )}
          {open == false ? (
            <>
              <div className="divLeft 4 marTop">
                <div className="padding">
                  <h4>Your payment schedule</h4>
                  <div className="greenFont marTop">
                    No payment today. You'll pay when you stay.
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {" "}
              <div className="divLeft 4 marTop">
                <div className="padding">
                  <h4>Your payment schedule</h4>
                  <div className="space_between marTop">
                    <span> before you stay you'll pay</span>
                    <span>$ 569.90</span>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="divLeft 5 marTop">
            <div className="padding">
              <h4>How much will it cost to cancel?</h4>
              <div className="greenFont marTop">
                Free cancellation until 11:59 PM on Aug 9
              </div>
              <div
                className="space_between"
                style={{ fontSize: "15px", marginTop: "10px" }}
              >
                <span>From 12:00 AM on Aug 10</span>
                <span>$ 6,300</span>
              </div>
            </div>
          </div>
          {open == true ? (
            <>
              <div className="divLeft 4 marTop">
                <div className="padding">
                  <h4>Do you have a promo code?</h4>
                  <div className="marTop10 ">
                    <p className="labelFont ">Enter your promo code</p>
                    <input type="text" className="input " />
                    <div className="marTop10 ">
                      <button
                        style={{
                          padding: "10px 25px",
                          backgroundColor: "white",
                          color: "#0071c2",
                          border: "1px solid #0071c2",
                        }}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}

          <div className="divLeft 6 marTop">
            <div className="padding">
              <h4>The fine print</h4>
              <div className="marTop" style={{ fontSize: "12px" }}>
                <p>
                  {" "}
                  Please note food from outside vendors is not allowed in the
                  hotel.
                </p>
                <br />
                <p>
                  In response to the coronavirus (COVID-19), additional safety
                  and sanitation measures are in effect at this property.
                </p>
                <br />
                <p>
                  Please inform Aloft New Delhi Aerocity of your expected
                  arrival time in advance. You can use the Special Requests box
                  when booking, or contact the property directly using the
                  contact details in your confirmation.
                </p>
                <br />
                <p>
                  Guests are required to show a photo ID and credit card upon
                  check-in. Please note that all Special Requests are subject to
                  availability and additional charges may apply.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ width: "68.5%", padding: "10px" }}
          className="fullWidth padding2"
        >
          <div className="divRight 1 space_between img" id="resOrder1">
            <div style={{ width: "20%" }} className="imgDiv">
              <img
                src={(imgSrc && imgSrc[0]) || ""}
                alt="image"
                className="logoImg"
                width="100%"
              />
            </div>
            <div style={{ width: "78%" }} className="content1Right marTop10">
              <div style={{ display: "flex", gap: "2%" }}>
                <span
                  style={{
                    color: "#6b6b6b",
                    fontWeight: "500",
                    fontSize: "18px",
                  }}
                >
                  Hotel
                </span>
                <span>
                  {" "}
                  <StarRatings
                    rating={5}
                    starRatedColor="#febb02"
                    numberOfStars={5}
                    name="rating"
                    starDimension="20px"
                    starSpacing="1px"
                  />
                </span>
                <span>
                  <ThumbUpAlt style={{ color: "#febb02" }} />
                </span>
              </div>
              <h4 className="font23dark ">{data.title}</h4>
              <p className="marTop10">
                No. 5B, Aerocity, 110037 New Delhi, India
              </p>
              <p className="greenFont marTop10">
                This property is in a good location. Guests have rated it 9.0
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "2%" }}>
                <div className="bluebox marTop10">8.1</div>
                <span style={{ fontWeight: "500", fontSize: "15px" }}>
                  Very Good
                </span>
                <span style={{ color: "#6b6b6b", fontSize: "12px" }}>
                  . 2,198 reviews
                </span>
              </div>
              <div className="marTop10 parkRes">
                <div className="borderBlack">Free parking</div>
                <div className="borderBlack">4 Restaurants On Site</div>
              </div>
            </div>
          </div>
          <div className="divRight 2 marTop" id="resOrder4">
            <h4 className="font23dark">Good to know:</h4>
            <div style={{ display: "flex" }} className="marTop">
              <span style={{ marginRight: "2%" }}>
                <CheckCircleOutline style={{ color: "rgb(0, 128, 9)" }} />
              </span>
              <span style={{ fontSize: "15px" }}>
                Free cancellation until 11:59 PM on August 9, 2022&nbsp;
              </span>
              <span>
                <HelpOutline style={{ color: "#0071c2", width: "16px" }} />
              </span>
            </div>
            <div style={{ display: "flex" }} className="marTop10">
              <span style={{ marginRight: "2%" }}>
                <CheckCircleOutline style={{ color: "rgb(0, 128, 9)" }} />
              </span>
              <span style={{ fontSize: "15px" }}>
                No payment needed today. You'll pay when you stay.
              </span>
            </div>
          </div>
          <div
            className="divRight 3 marTop"
            style={{ display: "flex", gap: "2%" }}
          >
            <span>
              <PermIdentityOutlined style={{ color: "#0071c2" }} />
            </span>
            <p>
              <span style={{ color: "#0071c2" }}>Sign in</span> to book with
              your saved details or{" "}
              <span style={{ color: "#0071c2" }}>register</span> to manage your
              bookings on the go!
            </p>
          </div>
          {open == false ? (
            <ClientForm setOpen={setOpen} />
          ) : (
            <ClientFormPart2 setOpen={setOpen} />
          )}

          {/* <ClientFormPart2 /> */}
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;
