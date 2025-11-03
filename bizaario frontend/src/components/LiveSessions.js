import React, { useState } from "react";
import doctorImage from "../assets/images/livedoctor.png";
import Image from "../assets/images/livedoctor2.png";

const LiveSessions = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // JSON data for live sessions
  const sessionsData = {
    header: {
      title: "Live Sessions – Join Now!",
      description:
        "Our expert doctors will be going live soon to answer your questions and share valuable health insights. Stay tuned for the next session.",
    },
    featuredSession: {
      id: "featured",
      title: "MENTAL HEALTH",
      subtitle: "JOIN OUR FACEBOOK LIVE SESSION ON",
      doctor: {
        name: "DR. JOHN SMITH",
        image:
          "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400",
        // image: doctorImage,
        details: [
          "Personality disorders",
          "Psychotic disorders",
          "Mood Disorders",
        ],
      },
      sessionTitle: "Your Health Matters Live",
      description:
        "Our expert doctors will be going live soon to answer your questions and share valuable health insights.",
      date: "20/12/2025",
      time: "02:30 PM",
      doctorCredentials: "Senior Cardiologist (MBBS, MD)",
      isLive: true,
    },
    sessions: [
      {
        id: "session1",
        title: "OUR PRIORITY",
        subtitle: "A FREE CONSULTATION",
        date: "FRIDAY, APRIL 15TH, 2022",
        time: "10AM - 4PM",
        location: "SITE GROUNDS, LAGOS",
        bgImage:
          "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800",
        // bgImage: Image,
        bgColor: "from-blue-600 to-blue-700",
      },
      {
        id: "session2",
        title: "WE CARE ABOUT YOUR HEALTH",
        subtitle: "SAVING LIVES EVERYDAY",
        services: [
          "SPECIALIST DOCTORS",
          "POSITIVE ENVIRONMENT",
          "EMERGENCY SERVICES",
        ],
        bgImage:
          "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800",
        bgColor: "from-gray-800 to-gray-900",
      },
      {
        id: "session3",
        title: "QUALITY HEALTH STARTS HERE",
        subtitle: "OUR SERVICES",
        features: [
          "24/7 Emergency Care",
          "Expert Medical Team",
          "Modern Equipment",
          "Patient-Centered Care",
        ],
        bgImage:
          "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800",
        bgColor: "from-blue-400 to-blue-500",
      },
      {
        id: "session4",
        title: "TOP MEDICAL CARE",
        subtitle: "FOR YOUR FAMILY",
        company: "HEALTH PLUS MEDICAL",
        bgImage:
          "https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=800",
        bgColor: "from-teal-500 to-teal-600",
      },
    ],
  };

  // Facebook Live Badge Component
  const FacebookLiveBadge = () => (
    <div className="flex items-center gap-1 mb-3">
      <div className="flex items-center gap-2 px-3 py-1 text-sm text-white bg-blue-600 rounded animate-pulse">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </div>
      <span className="flex items-center px-3 py-1 text-sm font-bold text-white bg-red-600 rounded animate-pulse">
        LIVE
      </span>
    </div>
  );

  // Crown Logo Component
  const CrownLogo = () => (
    <div className="absolute flex items-center justify-center w-8 h-8 bg-var(--primary) rounded-full top-3 right-3 bg-opacity-20">
      <svg
        className="w-8 h-8 text-var(--primary)"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M5 16L3 6l5.5 4L12 4l3.5 6L21 6l-2 10H5z" />
      </svg>
    </div>
  );

  // Carousel navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sessionsData.sessions.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? sessionsData.sessions.length - 1 : prev - 1
    );
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-[#043055] to-[#1268B3] flex flex-col items-center px-4 sm:px-6 md:px-8 lg:px-20 xl:px-[120px] py-8 md:py-12 lg:py-16 xl:py-[92px] gap-6 md:gap-9">
      {/* Background Pattern Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(205, 232, 255, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(205, 232, 255, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 40% 70%, rgba(205, 232, 255, 0.25) 0%, transparent 50%),
            radial-gradient(circle at 90% 80%, rgba(205, 232, 255, 0.15) 0%, transparent 50%)
          `,
        }}
      />

      {/* Header Section */}
      <div className="z-10 flex flex-col items-start w-full max-w-[1272px] gap-1">
        <h1
          className="w-full text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-bold leading-tight text-white"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {sessionsData.header.title}
        </h1>
        <p
          className="w-full text-sm sm:text-base md:text-lg lg:text-[18px] leading-relaxed text-white opacity-90"
          style={{ fontFamily: "'Arial', sans-serif" }}
        >
          {sessionsData.header.description}
        </p>
      </div>

      {/* Live Sessions Cards Container */}
      <div className="z-10 w-full max-w-[1299px]">
        <div className="flex flex-col gap-5 lg:flex-row">
          {/* Main Featured Facebook Live Session Card */}
          <div
            className={`group flex flex-col justify-end items-start p-5 gap-3 rounded-xl overflow-hidden relative transition-all duration-500 ease-in-out cursor-pointer ${
              hoveredCard === "featured"
                ? "lg:w-[700px] xl:w-[800px]"
                : "lg:w-[515px]"
            } w-full h-[500px] lg:h-[633px]`}
            onMouseEnter={() => setHoveredCard("featured")}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.57) 53%, #000000 73%, #000000 100%), url(${sessionsData.featuredSession.doctor.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Crown Logo */}
            <CrownLogo />

            {/* Facebook Live Badge */}
            <FacebookLiveBadge />

            {/* Content Container */}
            <div
              className={`flex items-start gap-4 w-full transition-all duration-500 ${
                hoveredCard === "featured" ? "flex-row" : "flex-col"
              }`}
            >
              {/* Doctor Image */}
              {/* <div
                className={`rounded-full overflow-hidden border-4 border-white flex-shrink-0 transition-all duration-500  ${
                  hoveredCard === "featured"
                    ? "w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 mt-24"
                    : "w-16 h-16 md:w-20 md:h-20"
                }`}
              >
                <img
                  src={sessionsData.featuredSession.doctor.image}
                  alt="Doctor"
                  className="object-cover w-full h-full"
                />
              </div> */}

              {/* Text Content */}
              <div className="flex-1">
                <p
                  className="mb-1 text-xs text-white md:text-sm"
                  style={{ fontFamily: "'Arial', sans-serif" }}
                >
                  {sessionsData.featuredSession.subtitle}
                </p>
                <h2
                  className={`text-white font-bold mb-1 transition-all duration-500 ${
                    hoveredCard === "featured"
                      ? "text-xl md:text-2xl lg:text-3xl"
                      : "text-lg md:text-xl lg:text-2xl"
                  }`}
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {sessionsData.featuredSession.title}
                </h2>
                <p
                  className="mb-1 text-xs text-white md:text-sm"
                  style={{ fontFamily: "'Arial', sans-serif" }}
                >
                  WITH
                </p>
                <h3
                  className={`text-white font-bold mb-2 transition-all duration-500 ${
                    hoveredCard === "featured"
                      ? "text-base md:text-lg lg:text-xl"
                      : "text-sm md:text-base lg:text-lg"
                  }`}
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {sessionsData.featuredSession.doctor.name}
                </h3>

                {/* Doctor Details - Show when expanded */}
                {hoveredCard === "featured" && (
                  <ul
                    className="mb-3 space-y-1 text-xs text-white transition-all duration-500 md:text-sm"
                    style={{ fontFamily: "'Arial', sans-serif" }}
                  >
                    {sessionsData.featuredSession.doctor.details.map(
                      (detail, index) => (
                        <li key={index}>• {detail}</li>
                      )
                    )}
                  </ul>
                )}
              </div>
            </div>

            {/* Session Details - Show when expanded */}
            {hoveredCard === "featured" && (
              <div className="w-full transition-all duration-500">
                <div className="p-3 bg-black bg-opacity-50 rounded-lg md:p-4">
                  <h4
                    className="mb-2 text-base font-bold text-white md:text-lg lg:text-xl"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {sessionsData.featuredSession.sessionTitle}
                  </h4>
                  <p
                    className="mb-3 text-xs text-white md:text-sm"
                    style={{ fontFamily: "'Arial', sans-serif" }}
                  >
                    {sessionsData.featuredSession.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 mb-3 text-xs text-white md:text-sm">
                    <span>📅 {sessionsData.featuredSession.date}</span>
                    <span>🕐 {sessionsData.featuredSession.time}</span>
                  </div>
                  <p
                    className="text-xs text-white md:text-sm"
                    style={{ fontFamily: "'Arial', sans-serif" }}
                  >
                    By Doctor Malik -{" "}
                    {sessionsData.featuredSession.doctorCredentials}
                  </p>
                </div>
              </div>
            )}

            {/* Register Button */}
            <button
              className={`w-full bg-[#1268B3] hover:bg-[#0f5a9a] text-white rounded-lg font-bold transition-all duration-300 transform hover:scale-105 ${
                hoveredCard === "featured"
                  ? "py-3 px-6 text-sm md:text-base"
                  : "py-3 px-4 text-sm"
              }`}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Register Now
            </button>
          </div>

          {/* Carousel Container for Smaller Cards */}
          <div className="relative flex-1">
            {/* Carousel Wrapper */}
            <div className="relative h-[500px] lg:h-[633px] overflow-hidden">
              {/* Cards Container */}
              <div
                className="flex h-full transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`,
                }}
              >
                {sessionsData.sessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex-shrink-0 w-full h-full px-2"
                  >
                    <div
                      className={`group flex flex-col justify-end items-start p-5 gap-3 rounded-xl overflow-hidden relative h-full transition-all duration-500 ease-in-out cursor-pointer bg-gradient-to-br ${session.bgColor} text-white hover:shadow-2xl`}
                      onMouseEnter={() => setHoveredCard(session.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                      style={{
                        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%), url(${session.bgImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      {/* Content based on card type */}
                      <div className="flex-1 w-full">
                        {session.id === "session1" && (
                          <>
                            <h3
                              className={`text-yellow-400 font-bold mb-2 transition-all duration-500 ${
                                hoveredCard === session.id
                                  ? "text-2xl md:text-3xl"
                                  : "text-xl md:text-2xl"
                              }`}
                              style={{ fontFamily: "'Montserrat', sans-serif" }}
                            >
                              {session.title}
                            </h3>
                            <p
                              className={`text-white font-semibold mb-4 transition-all duration-500 ${
                                hoveredCard === session.id
                                  ? "text-base md:text-lg"
                                  : "text-sm md:text-base"
                              }`}
                              style={{ fontFamily: "'Arial', sans-serif" }}
                            >
                              {session.subtitle}
                            </p>
                            {hoveredCard === session.id && (
                              <div
                                className="space-y-1 text-sm text-white transition-all duration-500"
                                style={{ fontFamily: "'Arial', sans-serif" }}
                              >
                                <p>{session.date}</p>
                                <p>{session.time}</p>
                                <p>{session.location}</p>
                              </div>
                            )}
                          </>
                        )}

                        {session.id === "session2" && (
                          <>
                            <h3
                              className={`text-white font-bold mb-2 transition-all duration-500 ${
                                hoveredCard === session.id
                                  ? "text-xl md:text-2xl"
                                  : "text-lg md:text-xl"
                              }`}
                              style={{ fontFamily: "'Montserrat', sans-serif" }}
                            >
                              {session.title}
                            </h3>
                            <p
                              className={`text-gray-300 mb-4 transition-all duration-500 ${
                                hoveredCard === session.id
                                  ? "text-sm md:text-base"
                                  : "text-xs md:text-sm"
                              }`}
                              style={{ fontFamily: "'Arial', sans-serif" }}
                            >
                              {session.subtitle}
                            </p>
                            {hoveredCard === session.id && (
                              <div className="space-y-2 transition-all duration-500">
                                <h4 className="text-sm font-semibold text-white">
                                  OUR SERVICES
                                </h4>
                                <ul
                                  className="space-y-1 text-sm text-white"
                                  style={{ fontFamily: "'Arial', sans-serif" }}
                                >
                                  {session.services?.map((service, idx) => (
                                    <li key={idx}>• {service}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </>
                        )}

                        {session.id === "session3" && (
                          <>
                            <h3
                              className={`text-white font-bold mb-2 transition-all duration-500 ${
                                hoveredCard === session.id
                                  ? "text-xl md:text-2xl"
                                  : "text-lg md:text-xl"
                              }`}
                              style={{ fontFamily: "'Montserrat', sans-serif" }}
                            >
                              {session.title}
                            </h3>
                            <p
                              className={`text-white mb-4 transition-all duration-500 ${
                                hoveredCard === session.id
                                  ? "text-sm md:text-base"
                                  : "text-xs md:text-sm"
                              }`}
                              style={{ fontFamily: "'Arial', sans-serif" }}
                            >
                              {session.subtitle}
                            </p>
                            {hoveredCard === session.id && (
                              <ul
                                className="space-y-1 text-sm text-white transition-all duration-500"
                                style={{ fontFamily: "'Arial', sans-serif" }}
                              >
                                {session.features?.map((feature, idx) => (
                                  <li key={idx}>• {feature}</li>
                                ))}
                              </ul>
                            )}
                          </>
                        )}

                        {session.id === "session4" && (
                          <>
                            <div
                              className={`bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4 transition-all duration-500 ${
                                hoveredCard === session.id
                                  ? "w-20 h-20"
                                  : "w-16 h-16"
                              }`}
                            >
                              <span
                                className={`transition-all duration-500 ${
                                  hoveredCard === session.id
                                    ? "text-3xl"
                                    : "text-2xl"
                                }`}
                              >
                                👩‍⚕️
                              </span>
                            </div>
                            <h3
                              className={`text-white font-bold mb-2 transition-all duration-500 ${
                                hoveredCard === session.id
                                  ? "text-xl md:text-2xl"
                                  : "text-lg md:text-xl"
                              }`}
                              style={{ fontFamily: "'Montserrat', sans-serif" }}
                            >
                              {session.title}
                            </h3>
                            <p
                              className={`text-white mb-4 transition-all duration-500 ${
                                hoveredCard === session.id
                                  ? "text-sm md:text-base"
                                  : "text-xs md:text-sm"
                              }`}
                              style={{ fontFamily: "'Arial', sans-serif" }}
                            >
                              {session.subtitle}
                            </p>
                            {hoveredCard === session.id && (
                              <p
                                className="text-sm text-white transition-all duration-500"
                                style={{ fontFamily: "'Arial', sans-serif" }}
                              >
                                {session.company}
                              </p>
                            )}
                          </>
                        )}
                      </div>

                      {/* Register Button */}
                      <button
                        className={`w-full bg-[#1268B3] hover:bg-[#0f5a9a] text-white rounded-lg font-bold transition-all duration-300 transform hover:scale-105 ${
                          hoveredCard === session.id
                            ? "py-3 px-4 text-sm"
                            : "py-3 px-3 text-sm"
                        }`}
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        Register Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-0 z-10 p-2 text-white transition-all duration-300 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full top-1/2 hover:bg-opacity-75 hover:scale-110"
              aria-label="Previous slide"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 z-10 p-2 text-white transition-all duration-300 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full top-1/2 hover:bg-opacity-75 hover:scale-110"
              aria-label="Next slide"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Carousel Indicators */}
            <div className="absolute flex gap-2 transform -translate-x-1/2 bottom-4 left-1/2">
              {sessionsData.sessions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? "bg-white w-8"
                      : "bg-white bg-opacity-50 hover:bg-opacity-75"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveSessions;
