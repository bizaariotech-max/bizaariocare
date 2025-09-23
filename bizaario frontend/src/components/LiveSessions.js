import React from "react";
import "../assets/css/hero.css";
import livesessionlogo from '../assets/images/LiveSessions.png';
import doctorlogo from '../assets/images/doctor1.png';
import clock from '../assets/images/clock.png'
import calender from '../assets/images/calendar.png'

const LiveSessions = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "561px",
        backgroundImage: `url(${livesessionlogo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
         
      }}
    >
      {/* Dark overlay for better text readability */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />

      {/* Content */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 2,
          color: "#fff",
        }}
      >
        <div className="row">
          <div className="col-md-8">
            <div className="hero-content">
              <h1
                className="hero-title"
                style={{
                  fontFamily:"var(--heading-font)",
                  fontSize: "36px",
                  fontWeight: 700,
                  lineHeight: "normal",
                  marginBottom: "16px",
                  color:"white"
                }}
              >
                Live Session - Coming Soon
              </h1>
              <p
                className="light-color"
                style={{color:"white"}}
              
              >
                Our expert doctors will be going live soon to answer your questions
                and share valuable health insights. Stay tuned for the next session.
              </p>
              <p
                className="light-color"
                style={{
                  color:"white"
                }}
              >
               Sessions are conducted by certified doctors
              </p>
<div
  style={{
    display: "flex",
     width: "100%", 
     maxWidth: "622px",
    padding: "12px 24px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "4px",
    borderRadius: "10px",
    background: "rgba(189, 196, 212, 0.30)",
  }}
>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    {/* Profile Image */}
                    <img
                        src={doctorlogo}
                        alt=""
                        style={{
                        borderRadius: "270.5px",
                        border: "2px solid #FFF",
                        width: "88px",
                        height: "88px",
                        flexShrink: 0,
                        objectFit: "cover", // ensures image fits nicely
                        }}
                    />

                    {/* Text Content */}
                    <div>
                        <p
                        style={{
                            color: "white",
                            fontFamily: "Lora",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 700,
                            lineHeight: "normal",
                            margin: 0,
                        }}
                        >
                        <strong>By Doctor Malik</strong>
                        </p>

                        <p
                        style={{
                            color: "white",
                            fontFamily: "Poppins",
                            fontSize: "12px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "normal",
                            margin: 0,
                        }}
                        >
                        <strong>Seniour Cordialogist Apollo Hospitals</strong>
                        </p>

                                <div style={{display:"flex",gap:"24px",marginTop:"10px"}}>
                    <div style={{display:'flex',gap:"5px"}}>
                          <img src={clock} style={{width: "14px",height: "14px",display:"inline-block"}} alt=''></img> 
                           <p
                            style={{
                                color: "white",
                                fontFamily: "Poppins",
                                fontSize: "12px",
                                fontStyle: "normal",
                                fontWeight: 400,
                                lineHeight: "normal",
                            }}
                            >
                                02.30 AM
                               </p> 
                    </div>
                 
                   <div style={{display:'flex',gap:"5px"}}>
                          <img src={calender} style={{width: "14px",height: "14px",display:"inline-block"}} alt=''></img> 
                            <p  style={{
                                color: "white",
                                fontFamily: "Poppins",
                                fontSize: "12px",
                                fontStyle: "normal",
                                fontWeight: 400,
                                lineHeight: "normal",
                            }}>01/01/2025</p> 
                    </div>
                </div>

                    </div>
                    </div>
                

</div>

  {/* Wrapper for input + button */}
  <div style={{ position: "relative", width: "100%", maxWidth: "622px",marginTop:"36px" }}>
    <input
      type="text"
      placeholder="Write Your Email Id"
      style={{
        display: "block",
        width: "100%",
        height: "60px",
        padding: "12px 120px 12px 24px", // extra right padding for button space
        borderRadius: "10px",
        border: "1px solid #ccc",
        boxSizing: "border-box",
        background:"white"
      }}
    >
      </input>
    <button
      className="view-all"
      style={{
        maxWidth:"150px",
        position: "absolute",
        top: "50%",
        right: "10px",
        transform: "translateY(-50%)",
        height: "50px",
        padding: "12px 24px",
        border: "none",
        cursor: "pointer"
      }}
    >
      Notify Me &#8594;
    </button>
  </div>

   <div style={{ position: "relative", width: "622px",marginTop:"36px"}}>
    <p className="light-color" style={{color:"white"}}>sessions are stream click below to Connect</p>
    <button
      className="view-all"
      style={{
        width:"200px",
        height: "50px",
        border: "none",
        cursor: "pointer",
        border:"1px solid white"
      }}
    >
      Connect Now
    </button>
  </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveSessions;
