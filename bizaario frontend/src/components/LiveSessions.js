import React from "react";
import "../assets/css/hero.css";
import doctorlogo from "../assets/images/doctor1.png";

const LiveSessions = () => {
  // Calendar icon SVG component
  const CalendarIcon = () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="2"
        y="3"
        width="14"
        height="12"
        rx="1"
        stroke="#FFFFFF"
        strokeWidth="1.5"
      />
      <path
        d="M6 1.5V4.5"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 1.5V4.5"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M2 7.5H16" stroke="#FFFFFF" strokeWidth="1.5" />
    </svg>
  );

  // Clock icon SVG component
  const ClockIcon = () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="9" cy="9" r="7.5" stroke="#FFFFFF" strokeWidth="1.5" />
      <path
        d="M9 4.5V9L12 10.5"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "933px",
        background: "linear-gradient(180deg, #043055 0%, #1268B3 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "92px 120px",
        gap: "36px",
        isolation: "isolate",
      }}
    >
      {/* Background Pattern Overlay */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          left: 0,
          top: 0,
          opacity: 0.08,
          background: `
            radial-gradient(circle at 20% 30%, rgba(128, 128, 128, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(128, 128, 128, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 40% 70%, rgba(128, 128, 128, 0.25) 0%, transparent 50%),
            radial-gradient(circle at 90% 80%, rgba(128, 128, 128, 0.15) 0%, transparent 50%)
          `,
          zIndex: 0,
        }}
      />

      {/* Header Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "0px",
          gap: "4px",
          width: "100%",
          maxWidth: "1272px",
          height: "80px",
          zIndex: 1,
        }}
      >
        <h1
          style={{
            width: "100%",
            height: "44px",
            fontFamily: "Montserrat, sans-serif",
            fontStyle: "normal",
            fontWeight: 700,
            fontSize: "36px",
            lineHeight: "44px",
            color: "#FFFFFF",
            margin: 0,
          }}
        >
          Live Sessions – Join Now!
        </h1>
        <p
          style={{
            width: "100%",
            height: "32px",
            fontFamily: "Arial, sans-serif",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "18px",
            lineHeight: "32px",
            color: "#FFFFFF",
            margin: 0,
          }}
        >
          Our expert doctors will be going live soon to answer your questions
          and share valuable health insights. Stay tuned for the next session.
        </p>
      </div>

      {/* Live Sessions Cards Container */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          padding: "0px",
          gap: "20px",
          width: "100%",
          maxWidth: "1299px",
          height: "633px",
          zIndex: 2,
        }}
      >
        {/* Main Featured Session Card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "flex-start",
            padding: "20px",
            gap: "10px",
            width: "515px",
            height: "633px",
            background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.57) 53.11%, #000000 73.07%, #000000 100%), url(${doctorlogo})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "12px",
          }}
        >
          {/* Session Info */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              padding: "0px",
              gap: "5px",
              width: "475px",
              height: "128px",
            }}
          >
            <h3
              style={{
                width: "475px",
                height: "29px",
                fontFamily: "Montserrat, sans-serif",
                fontStyle: "normal",
                fontWeight: 700,
                fontSize: "24px",
                lineHeight: "29px",
                color: "#FFFFFF",
                margin: 0,
              }}
            >
              Your Health Matters Live
            </h3>
            <p
              style={{
                width: "475px",
                height: "28px",
                fontFamily: "Arial, sans-serif",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: "14px",
                color: "#FFFFFF",
                margin: 0,
              }}
            >
              Our expert doctors will be going live soon to answer your
              questions and share valuable health insights.
            </p>

            {/* Date and Time */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: "0px",
                gap: "36px",
                width: "223px",
                height: "18px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "0px",
                  gap: "10px",
                  width: "99px",
                  height: "18px",
                }}
              >
                <CalendarIcon />
                <span
                  style={{
                    width: "71px",
                    height: "16px",
                    fontFamily: "Arial, sans-serif",
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "16px",
                    textAlign: "center",
                    color: "#FFFFFF",
                  }}
                >
                  20/12/2025
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "0px",
                  gap: "10px",
                  width: "88px",
                  height: "18px",
                }}
              >
                <ClockIcon />
                <span
                  style={{
                    width: "60px",
                    height: "16px",
                    fontFamily: "Arial, sans-serif",
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "16px",
                    textAlign: "center",
                    color: "#FFFFFF",
                  }}
                >
                  02:30 AM
                </span>
              </div>
            </div>

            {/* Doctor Info */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: "0px",
                gap: "4px",
                width: "475px",
                height: "38px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  padding: "0px",
                  width: "173px",
                  height: "34px",
                }}
              >
                <p
                  style={{
                    width: "124px",
                    height: "20px",
                    fontFamily: "Lora, serif",
                    fontStyle: "normal",
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: "20px",
                    color: "#FFFFFF",
                    margin: 0,
                  }}
                >
                  By Doctor Malik
                </p>
                <p
                  style={{
                    width: "173px",
                    height: "14px",
                    fontFamily: "Arial, sans-serif",
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "14px",
                    color: "#FFFFFF",
                    margin: 0,
                  }}
                >
                  Senior Cardiologist (MBBS, MD)
                </p>
              </div>
            </div>
          </div>

          {/* Join Button */}
          <button
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: "16px 36px",
              gap: "10px",
              width: "475px",
              height: "52px",
              background: "#1268B3",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            <span
              style={{
                width: "113px",
                height: "20px",
                fontFamily: "Montserrat, sans-serif",
                fontStyle: "normal",
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "20px",
                color: "#FFFFFF",
              }}
            >
              Join Our Network
            </span>
          </button>
        </div>

        {/* Smaller Session Cards */}
        {[1, 2, 3, 4].map((index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "flex-start",
              padding: "20px",
              gap: "10px",
              width: "176px",
              height: "633px",
              background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%), url(${doctorlogo})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "12px",
            }}
          >
            <button
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: "16px 36px",
                gap: "10px",
                width: "136px",
                height: "52px",
                background: "#1268B3",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  width: "113px",
                  height: "20px",
                  fontFamily: "Montserrat, sans-serif",
                  fontStyle: "normal",
                  fontWeight: 700,
                  fontSize: "16px",
                  lineHeight: "20px",
                  color: "#FFFFFF",
                }}
              >
                Join Our Network
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveSessions;
