<<<<<<< HEAD:src/UI/DocAppointTableContent.js
import React from 'react';
import { doctorArr } from '../Data/LocalData';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../assets/css/Empowering.css';
import clock from '../assets/images/clock.png';
import calendar from '../assets/images/calendar.png';
import BookingAppointment from './BookingAppointment';
import { Link } from 'react-router-dom';
=======
import React from "react";
import { doctorArr } from "../Data/LocalData";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../assets/css/Empowering.css";
import clock from "../assets/images/clock.png";
import calendar from "../assets/images/calendar.png";
import BookingAppointment from "./BookingAppointment";
import { Link } from "react-router-dom";
>>>>>>> d8848ac479e07ee59c77f9897e3b3b06dee52b48:bizaario frontend/src/UI/DocAppointTableContent.js

const DocAppointTableContent = () => {
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 3 },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      partialVisibilityGutter: 20,
    },
    tablet: { breakpoint: { max: 1024, min: 767 }, items: 2 },
    mobile: { breakpoint: { max: 767, min: 0 }, items: 1 },
  };

  return (
    <div className="mt-3 doctor-slider position-relative">
      <Carousel
        arrows={false}
        responsive={responsive}
        containerClass="carousel-container py-3"
        itemClass="ps-1 pe-3 pb-3 "
        // showDots={true}
        infinite={true}
        renderDotsOutside={true}
        partialVisible={true}
      >
        {doctorArr.map((element) => (
          <div
            key={element.id}
            className="w-full  hover:shadow-lg p-4 rounded-lg bg-white relative transition-all border"
          >
            {/* Profile */}
            <div style={{ position: "relative", width: "100%" }}>
              {/* Header Section */}
              <div
<<<<<<< HEAD:src/UI/DocAppointTableContent.js
                style={{
                  paddingLeft: "20%",
                  display: "flex",
                  height: "88px",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center", // ✅ center horizontally
                  gap: "10px",
                  alignSelf: "stretch",
                  background: "rgba(189, 196, 212, 0.30)",
                  textAlign: "center", // ✅ ensure text stays centered
                }}
              >
                <h5
                  style={{
                    color: "#000",
                    fontFamily: "Lora",
                    fontSize: "20px",
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "normal",
                    margin: 0,
                  }}
                >
                  {element.name}
                </h5>

                <p
                  style={{
                    color: "rgba(0, 0, 0, 0.70)",
                    fontFamily: "Poppins",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "normal",
                    margin: "4px 0 0",
                  }}
                >
                  {element.exp}
                </p>
              </div>
            </div>

            {/* Doctor Image - overlapping */}
            <div
              style={{
                position: "absolute",
                left: "20px", // adjust overlap distance from left
                top: "50%", // vertical center
                transform: "translateY(-50%)", // adjust to half inside header
                marginTop: "-45%"
              }}
            >
              <img
                src={element.image}
                alt="doctor"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "10%",
                  border: "2px solid #fff",
                  objectFit: "cover",
                  boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
                }}
              />
            </div>

            <div style={{ textAlign: "right", marginTop: "5%", paddingRight: "15px" }}>
              <a
                href={element.profileUrl || '#'}
=======
>>>>>>> d8848ac479e07ee59c77f9897e3b3b06dee52b48:bizaario frontend/src/UI/DocAppointTableContent.js
                style={{
                  paddingLeft: "20%",
                  display: "flex",
                  height: "88px",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  alignSelf: "stretch",
                  background: "rgba(189, 196, 212, 0.30)",
                  textAlign: "center", // ✅ ensure text stays centered
                }}
              >
                <h5
                  style={{
                    color: "#000",
                    fontFamily: "Lora",
                    fontSize: "20px",
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "normal",
                    margin: 0,
                  }}
                >
                  {element.name}
                </h5>

                <p
                  style={{
                    color: "rgba(0, 0, 0, 0.70)",
                    fontFamily: "Poppins",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "normal",
                    margin: "4px 0 0",
                  }}
                >
                  {element.exp}
                </p>
              </div>
            </div>

            {/* Doctor Image - overlapping */}
            <div
              style={{
                position: "absolute",
                left: "20px", // adjust overlap distance from left
                top: "50%", // vertical center
                transform: "translateY(-50%)", // adjust to half inside header
                marginTop: "-45%",
              }}
            >
              <img
                src={element.image}
                alt="doctor"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "10%",
                  border: "2px solid #fff",
                  objectFit: "cover",
                  boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
                }}
              />
            </div>

            <div
              style={{
                textAlign: "right",
                marginTop: "5%",
                paddingRight: "15px",
              }}
            >
              <a
                href={element.profileUrl || "#"}
                style={{
                  fontSize: "13px",
                  color: "#78829d",
                  textDecoration: "none",
                }}
              >
                View Profile
              </a>
            </div>

            <div style={{ marginTop: "-18%" }}>
<<<<<<< HEAD:src/UI/DocAppointTableContent.js

              {/* country/city */}
              <p style={{ marginTop: "80px", padding: "0px 15px" }}>Country/City</p>
              <div style={{
                background: "#eef2fb",
                borderRadius: "7px",
                padding: "10px 0",
                marginBottom: "14px",
                textAlign: "center",
                fontWeight: 600,
                fontSize: "15px",
                color: "#495057",
                margin: "0px 15px"
              }}>
=======
              {/* country/city */}
              <p style={{ marginTop: "80px", padding: "0px 15px" }}>
                Country/City
              </p>
              <div
                style={{
                  background: "#eef2fb",
                  borderRadius: "7px",
                  padding: "10px 0",
                  marginBottom: "14px",
                  textAlign: "center",
                  fontWeight: 600,
                  fontSize: "15px",
                  color: "#495057",
                  margin: "0px 15px",
                }}
              >
>>>>>>> d8848ac479e07ee59c77f9897e3b3b06dee52b48:bizaario frontend/src/UI/DocAppointTableContent.js
                {element.country}/{element.city}
              </div>

              {/* Date/Time */}
<<<<<<< HEAD:src/UI/DocAppointTableContent.js
              <p style={{ marginTop: "10px", padding: "0px 15px" }}>Schedule(Date/Time) </p>
              <div style={{ display: "flex", gap: "12px", marginBottom: "12px", padding: "0px 15px" }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: "7px",
                  background: "#eef2fb", borderRadius: "8px", padding: "8px 12px"
                }}>
                  <img src={calendar} alt="calendar" style={{ width: "17px", height: "17px" }} />
=======
              <p style={{ marginTop: "10px", padding: "0px 15px" }}>
                Schedule(Date/Time){" "}
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  marginBottom: "12px",
                  padding: "0px 15px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    background: "#eef2fb",
                    borderRadius: "8px",
                    padding: "8px 12px",
                  }}
                >
                  <img
                    src={calendar}
                    alt="calendar"
                    style={{ width: "17px", height: "17px" }}
                  />
>>>>>>> d8848ac479e07ee59c77f9897e3b3b06dee52b48:bizaario frontend/src/UI/DocAppointTableContent.js
                  <span style={{ fontSize: "15px" }}>{element.date}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    background: "#eef2fb",
                    borderRadius: "8px",
                    padding: "8px 14px",
                  }}
                >
                  <img
                    src={clock}
                    alt="clock"
                    style={{ width: "17px", height: "17px" }}
                  />
                  <span style={{ fontSize: "15px" }}>{element.time}</span>
                </div>
              </div>

              {/* Slots */}
<<<<<<< HEAD:src/UI/DocAppointTableContent.js
              <p style={{ marginTop: "10px", padding: "0px 15px" }}>No. Of Slots </p>
              <div style={{ display: "flex", gap: "18px", marginBottom: "12px", padding: "0px 15px" }}>
                <div style={{
                  background: "#eef2fb",
                  borderRadius: "7px",
                  padding: "10px 14px",
                  flex: 1,
                  textAlign: "center"
                }}>
                  <div style={{ fontSize: "16px", fontWeight: 700 }}>{element.totalSlots}</div>
                  <div style={{ fontSize: "13px", color: "#6e7689" }}>20 Total Seats</div>
=======
              <p style={{ marginTop: "10px", padding: "0px 15px" }}>
                No. Of Slots{" "}
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "18px",
                  marginBottom: "12px",
                  padding: "0px 15px",
                }}
              >
                <div
                  style={{
                    background: "#eef2fb",
                    borderRadius: "7px",
                    padding: "10px 14px",
                    flex: 1,
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "16px", fontWeight: 700 }}>
                    {element.totalSlots}
                  </div>
                  <div style={{ fontSize: "13px", color: "#6e7689" }}>
                    20 Total Seats
                  </div>
>>>>>>> d8848ac479e07ee59c77f9897e3b3b06dee52b48:bizaario frontend/src/UI/DocAppointTableContent.js
                </div>
                <div
                  style={{
                    background: "#eef2fb",
                    borderRadius: "7px",
                    padding: "10px 14px",
                    flex: 1,
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "16px", fontWeight: 700 }}>
                    {element.availableSlots}
                  </div>
                  <div style={{ fontSize: "13px", color: "#6e7689" }}>
                    18 Available Seats
                  </div>
                </div>
              </div>

              {/* Waiting Time */}
<<<<<<< HEAD:src/UI/DocAppointTableContent.js
              <p style={{ marginTop: "10px", padding: "0px 15px" }}>Waiting Time</p>
              <div style={{
                background: "#eef2fb",
                borderRadius: "7px",
                padding: "10px 0",
                marginBottom: "14px",
                textAlign: "center",
                fontWeight: 600,
                fontSize: "15px",
                color: "#495057",
                margin: "0px 15px"
              }}>
=======
              <p style={{ marginTop: "10px", padding: "0px 15px" }}>
                Waiting Time
              </p>
              <div
                style={{
                  background: "#eef2fb",
                  borderRadius: "7px",
                  padding: "10px 0",
                  marginBottom: "14px",
                  textAlign: "center",
                  fontWeight: 600,
                  fontSize: "15px",
                  color: "#495057",
                  margin: "0px 15px",
                }}
              >
>>>>>>> d8848ac479e07ee59c77f9897e3b3b06dee52b48:bizaario frontend/src/UI/DocAppointTableContent.js
                00:20:33
              </div>
            </div>

            {/* Action Buttons */}
<<<<<<< HEAD:src/UI/DocAppointTableContent.js
            <div style={{ display: "flex", gap: "10px", margin: "15px", paddingBottom: "20px" }}>
=======
            <div
              style={{
                display: "flex",
                gap: "10px",
                margin: "15px",
                paddingBottom: "20px",
              }}
            >
>>>>>>> d8848ac479e07ee59c77f9897e3b3b06dee52b48:bizaario frontend/src/UI/DocAppointTableContent.js
              {/* <button data-bs-toggle="modal" data-bs-target="#exampleModal" className='view-all' style={{width:"100%"}} >
                Book Appointment
              </button> */}
              <Link to="/appointment-form">
<<<<<<< HEAD:src/UI/DocAppointTableContent.js
                <button className='w-full view-all'  >
                  Book Appointment
                </button>
=======
                <button className="w-full view-all">Book Appointment</button>
>>>>>>> d8848ac479e07ee59c77f9897e3b3b06dee52b48:bizaario frontend/src/UI/DocAppointTableContent.js
              </Link>
            </div>
          </div>
        ))}
      </Carousel>

      <div
        style={{ paddingTop: "80px" }}
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
<<<<<<< HEAD:src/UI/DocAppointTableContent.js
        <div className="modal-dialog modal-fullscreen pt-3">
          <div className="modal-content spacing-top">
            <div className="modal-header py-4"  >
=======
        <div className="pt-3 modal-dialog modal-fullscreen">
          <div className="modal-content spacing-top">
            <div className="py-4 modal-header">
>>>>>>> d8848ac479e07ee59c77f9897e3b3b06dee52b48:bizaario frontend/src/UI/DocAppointTableContent.js
              <button
                type="button"
                className="btn-close "
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body ">
              <h2
<<<<<<< HEAD:src/UI/DocAppointTableContent.js
                className="modal-title  pb-3 fs-5 text-center"
=======
                className="pb-3 text-center modal-title fs-5"
>>>>>>> d8848ac479e07ee59c77f9897e3b3b06dee52b48:bizaario frontend/src/UI/DocAppointTableContent.js
                id="exampleModalLabel"
              >
                Choose Date and Time
              </h2>
              <BookingAppointment />
            </div>
          </div>
        </div>
      </div>
<<<<<<< HEAD:src/UI/DocAppointTableContent.js

=======
>>>>>>> d8848ac479e07ee59c77f9897e3b3b06dee52b48:bizaario frontend/src/UI/DocAppointTableContent.js
    </div>
  );
};

export default DocAppointTableContent;
