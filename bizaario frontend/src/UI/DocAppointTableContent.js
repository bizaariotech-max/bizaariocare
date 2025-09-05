import React from 'react';
import { doctorArr } from '../Data/LocalData';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../assets/css/Empowering.css';
import clock from '../assets/images/clock.png';
import calendar from '../assets/images/calendar.png';

const DocAppointTableContent = () => {
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 3 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3, partialVisibilityGutter: 20 },
    tablet: { breakpoint: { max: 1024, min: 767 }, items: 2 },
    mobile: { breakpoint: { max: 767, min: 0 }, items: 1 }
  };
  
  return (
    <div className="doctor-slider mt-4 position-relative">
      <Carousel
        arrows={false}
        responsive={responsive}
        containerClass="carousel-container"
        itemClass="pe-md-4 px-1"
        showDots={true}
        infinite={true}
        renderDotsOutside={true}
        partialVisible={true}
      >
        {doctorArr.map((element) => (
          <div key={element.id}
            style={{
              borderRadius: "20px",
              background: "#fff",
              // padding: "20px",
              boxShadow: "0px 2px 10px rgba(150,156,173,0.10)",
              maxWidth: "370px",
              margin: "auto"
            }}
          >
            {/* Profile */}
          <div style={{ position: "relative", width: "100%" }}>
  {/* Header Section */}
  <div
    style={{
      paddingLeft:"20%",
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
      marginTop:"-45%"
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

 <div style={{ textAlign: "right", marginTop: "5%" ,paddingRight:"15px"}}>
              <a
                href={element.profileUrl || '#'}
                style={{
                  fontSize: "13px", color: "#78829d", textDecoration: "none"
                }}>
                View Profile
              </a>
            </div>
           
            <div style={{ marginTop: "-18%" }}>
           
            {/* country/city */}
            <p style={{marginTop:"80px",padding:"0px 15px"}}>Country/City</p> 
             <div style={{
                background: "#eef2fb",
                borderRadius: "7px",
                padding: "10px 0",
                marginBottom: "14px",
                textAlign: "center",
                fontWeight: 600,
                fontSize: "15px",
                color: "#495057",
                margin:"0px 15px"
              }}>
               {element.country}/{element.city}
              </div>

              {/* Date/Time */}
               <p style={{marginTop:"10px",padding:"0px 15px"}}>Schedule(Date/Time) </p> 
              <div style={{ display: "flex", gap: "12px", marginBottom: "12px",padding:"0px 15px" }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: "7px",
                  background: "#eef2fb", borderRadius: "8px", padding: "8px 12px"
                }}>
                  <img src={calendar} alt="calendar" style={{ width: "17px", height: "17px" }} />
                  <span style={{ fontSize: "15px" }}>{element.date}</span>
                </div>
                <div style={{
                  display: "flex", alignItems: "center", gap: "7px",
                  background: "#eef2fb", borderRadius: "8px", padding: "8px 14px"
                }}>
                  <img src={clock} alt="clock" style={{ width: "17px", height: "17px" }} />
                  <span style={{ fontSize: "15px" }}>{element.time}</span>
                </div>
              </div>

              {/* Slots */}
               <p style={{marginTop:"10px",padding:"0px 15px"}}>No. Of Slots </p> 
              <div style={{ display: "flex", gap: "18px", marginBottom: "12px",padding:"0px 15px" }}>
                <div style={{
                  background: "#eef2fb",
                  borderRadius: "7px",
                  padding: "10px 14px",
                  flex: 1,
                  textAlign: "center"
                }}>
                  <div style={{ fontSize: "16px", fontWeight: 700 }}>{element.totalSlots}</div>
                  <div style={{ fontSize: "13px", color: "#6e7689" }}>20 Total Seats</div>
                </div>
                <div style={{
                  background: "#eef2fb",
                  borderRadius: "7px",
                  padding: "10px 14px",
                  flex: 1,
                  textAlign: "center"
                }}>
                  <div style={{ fontSize: "16px", fontWeight: 700 }}>{element.availableSlots}</div>
                  <div style={{ fontSize: "13px", color: "#6e7689" }}>18 Available Seats</div>
                </div>
              </div>

              {/* Waiting Time */}
               <p style={{marginTop:"10px",padding:"0px 15px"}}>Waiting Time</p> 
              <div style={{
                background: "#eef2fb",
                borderRadius: "7px",
                padding: "10px 0",
                marginBottom: "14px",
                textAlign: "center",
                fontWeight: 600,
                fontSize: "15px",
                color: "#495057",
                margin:"0px 15px"
              }}>
             00:20:33
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "10px", margin:"15px",paddingBottom:"20px" }}>
              <button style={{
                flex: 1,
                background: "#324763",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                padding: "13px",
                fontSize: "15px",
                fontWeight: 600,
                cursor: "pointer",
                textAlign: "center"
              }}>
                Book Appointment
              </button>
              <button style={{
                flex: 1,
                background: "#fff",
                color: "#324763",
                border: "1px solid #cbd5e1",
                borderRadius: "10px",
                padding: "13px",
                fontSize: "15px",
                fontWeight: 600,
                cursor: "pointer",
                textAlign: "center"
              }}>
                Join
              </button>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default DocAppointTableContent;
