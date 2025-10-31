import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { sliderArray } from '../../Data/LocalData';
import "../../assets/css/hero.css";

const HeroSlickSlider = () => {
  return (
    <div className="main-banner">
      <div className="hero-slick-slider">
        {/* Hero Banner Section */}
        <div
          className="banner-bg"
          style={{
            backgroundImage: `url(${sliderArray.videoSource})`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 0,
              animation: "zoomIn 20s ease-in-out infinite alternate",
            }}
          >
            <source src={sliderArray.videoSource} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Dark Overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(0deg, rgba(0, 0, 0, 0.67), rgba(0, 0, 0, 0.67))",
              zIndex: 1,
              animation: "fadeIn 1.5s ease-out",
            }}
          ></div>

          <div
            className="container"
            style={{
              position: "relative",
              zIndex: 2,
              animation: "slideUp 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <div className="row">
              <div className="col-md-8">
                <div className="hero-content">
                  <h1
                    className="hero-title"
                    style={{
                      animation: "fadeInUp 1s ease-out 0.3s both",
                      transform: "translateY(30px)",
                      opacity: 0,
                      animationFillMode: "forwards",
                    }}
                  >
                    {sliderArray.bannerTitle}
                  </h1>
                  <p
                    className="hero-text"
                    style={{
                      animation: "fadeInUp 1s ease-out 0.6s both",
                      transform: "translateY(30px)",
                      opacity: 0,
                      animationFillMode: "forwards",
                    }}
                  >
                    {sliderArray.dsc}
                  </p>

                  <div
                    className="hero-btns"
                    style={{
                      animation: "fadeInUp 1s ease-out 0.9s both",
                      transform: "translateY(30px)",
                      opacity: 0,
                      animationFillMode: "forwards",
                    }}
                  >
                    <a
                      href="#"
                      className="join-our-network"
                      style={{
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        position: "relative",
                        overflow: "hidden",
                        display: "inline-block",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform =
                          "translateY(-3px) scale(1.05)";
                        e.target.style.boxShadow =
                          "0 8px 25px rgba(18, 104, 179, 0.4)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = "translateY(0) scale(1)";
                        e.target.style.boxShadow =
                          "0 4px 15px rgba(18, 104, 179, 0.2)";
                      }}
                    >
                      <span
                        style={{
                          position: "relative",
                          zIndex: 1,
                        }}
                      >
                        Join Our Network
                      </span>
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: "-100%",
                          width: "100%",
                          height: "100%",
                          background:
                            "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                          transition: "left 0.5s ease",
                          zIndex: 0,
                        }}
                      ></div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div
          className="banner-data"
          style={{
            animation: "slideUpStats 1s ease-out 1.2s both",
            transform: "translateY(50px)",
            opacity: 0,
            animationFillMode: "forwards",
          }}
        >
          {[
            { number: "120k", text: "Patient Referral" },
            { number: "2k", text: "Doctors Connected" },
            { number: "0.5k", text: "Hospitals Connected" },
          ].map((stat, index) => (
            <div
              key={index}
              className="banner-data1"
              style={{
                animation: `bounceIn 0.8s ease-out ${1.5 + index * 0.2}s both`,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-10px) scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 10px 30px rgba(18, 104, 179, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <h3
                style={{
                  animation: `countUp 2s ease-out ${2 + index * 0.1}s both`,
                  transition: "color 0.3s ease",
                }}
              >
                {stat.number}
              </h3>
              <p
                style={{
                  transition: "all 0.3s ease",
                  opacity: 0.9,
                }}
              >
                {stat.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Add CSS Keyframes */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes zoomIn {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.1);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUpStats {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(50px);
          }
          50% {
            opacity: 1;
            transform: scale(1.05) translateY(-10px);
          }
          70% {
            transform: scale(0.9) translateY(0);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes countUp {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(18, 104, 179, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(18, 104, 179, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(18, 104, 179, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSlickSlider;