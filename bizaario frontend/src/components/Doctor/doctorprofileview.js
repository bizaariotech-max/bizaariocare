import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../api";
import Header from "../../AppLayout/Header";
import Footer from "../../AppLayout/Footer";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { __postApiData } from "../../utils/api";
import {
  FaLinkedin,
  FaInstagram,
  FaFacebookF,
  FaTelegram,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

export default function DoctorProfile() {
  const location = useLocation();
  const id = location.state?.id;

  const [doctorprofile, setdoctorprofile] = useState([]);
  const getdoctordata = async () => {
    try {
      const resp = await api.get(`api/v1/admin/GetAsset/${id}`);
      console.log(resp);

      setdoctorprofile(resp.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdoctordata();
  }, [id]);

  const [doctor_digitalcme, setdoctor_digitalcme] = useState([]);

  const getdoctor_digitalcme = async () => {
    try {
      // const resp=await api.get(`api/v1/admin/GetAsset/${id}`)
      const resp = await __postApiData("/api/v1/admin/ContentList", {
        page: 1,
        limit: 100,
        ContentTypeId: "68affee3874340d8d79dbf3b",
        AssetId: id,
      });

      setdoctor_digitalcme(resp.data.list);
    } catch (error) {
      console.log(error);
    }
  };

  const [doctor_awards, setdoctor_awards] = useState([]);

  const getdoctor_awards = async () => {
    try {
      // const resp=await api.get(`api/v1/admin/GetAsset/${id}`)
      const resp = await __postApiData("/api/v1/admin/ContentList", {
        page: 1,
        limit: 100,
        ContentTypeId: "68afff10874340d8d79dbf53",
        AssetId: id,
      });

      setdoctor_awards(resp.data.list);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdoctor_digitalcme();
    getdoctor_awards();
  }, [id]);

  console.log(doctor_awards);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      partialVisibilityGutter: 20,
    },
    tablet: {
      breakpoint: { max: 1024, min: 767 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
    },
  };

  const [activeTab, setActiveTab] = useState("About Us");

  // Sample data (replace/fetch as needed)
  const events = [
    {
      date: "30th July",
      services: [
        "ECG & Blood Pressure Check",
        "Doctor Consultation",
        "Basic Cardiac Screening",
        "Medication Assistance (if eligible)",
      ],
      location: "Fortis Hospital, Sector 62, Noida",
      doctor:
        "Dr. Stonehart | In Association with Fortis Heart Institute, Delhi",
    },
    {
      date: "30th July",
      services: [
        "ECG & Blood Pressure Check",
        "Doctor Consultation",
        "Basic Cardiac Screening",
        "Medication Assistance (if eligible)",
      ],
      location: "Fortis Hospital, Sector 62, Noida",
      doctor:
        "Dr. Stonehart | In Association with Fortis Heart Institute, Delhi",
    },
    {
      date: "30th July",
      services: [
        "ECG & Blood Pressure Check",
        "Doctor Consultation",
        "Basic Cardiac Screening",
        "Medication Assistance (if eligible)",
      ],
      location: "Fortis Hospital, Sector 62, Noida",
      doctor:
        "Dr. Stonehart | In Association with Fortis Heart Institute, Delhi",
    },
  ];

  const testimonials = [
    {
      name: "Simon Arpad",
      location: "Uttar Pradesh",
      message:
        "Dr. Stonehart is not only a great cardiologist but also a kind human being. He explained my condition clearly, eased my fears, and guided me through successful treatment.",
      video: "/videos/testimonial1.mp4",
    },
    {
      name: "Sarah Thomas",
      location: "Mumbai",
      message:
        "Dr.Stonehart treated my father during a critical time. His calm attitude, timely diagnosis, and deep knowledge gave us immense hope.",
      video: "/videos/testimonial2.mp4",
    },
    {
      name: "Mrs. Anjali Sinha",
      location: "Gurgaon",
      message:
        "After years of struggling with hypertension, I finally found the right guidance with Dr. Stonehart. His lifestyle advice and medication plan worked wonders.",
      video: "/videos/testimonial3.mp4",
    },
    {
      name: "Ravi N.",
      location: "New Delhi",
      message:
        "After years of struggling with hypertension, I finally found the right guidance with Dr. Stonehart. His lifestyle advice and medication plan worked wonders.",
      video: "/videos/testimonial3.mp4",
    },
  ];

  // const cmeContents = Array(5).fill({
  //   videoSrc: "https://www.youtube.com/embed/bwx2Z69S0YA",
  //   title: "Doctor Mike hosts the AMA Tribute to the Medical School Class of 2023",
  //   date: "20/07/2025, 02:03"
  // });

  const caseStudies = Array(5).fill({
    img: "https://tse2.mm.bing.net/th/id/OIP.WOVyXByfddCawMN5KVQN8AHaFz?pid=Api&P=0&h=180",
    text: "Doctor Mike hosts the AMA Tribute to the Medical School Class of 2003",
  });

  const TestimonialCard = ({ name, location, message, video }) => (
    <div
      className="flex flex-col gap-4 p-4 shadow md:flex-row"
      style={{
        borderRadius: "32px",
        background: "rgba(82, 95, 225, 0.06)",
      }}
    >
      <div className="flex-1">
        <p className="text-gray-700">{message}</p>
        <h4 className="mt-2 font-semibold">{name}</h4>
        <p className="text-sm text-gray-500">{location}</p>
      </div>

      {video && (
        <div className="flex-shrink-0 w-full md:w-52">
          <video
            controls
            preload="none"
            className="w-full h-32 md:h-40 rounded-xl"
          >
            <source src={video} type="video/mp4" />
          </video>
        </div>
      )}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "About Us":
        return (
          <div className="space-y-6">
            <p className="leading-relaxed text-gray-700">
              {doctorprofile?.LongDescription}
            </p>
            <p className="text-gray-700">
              Known for a patient-first approach, Dr. Stonehart combines
              evidence-based medicine with cutting-edge technologies to deliver
              personalized treatment. Also involved in continuing medical
              education and several medical publications.
            </p>
            <div>
              <h6 className="mt-8 text-lg font-semibold">Bio Video</h6>
              <iframe
                className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] rounded-md shadow-md mt-2"
                src={doctorprofile?.bio_video}
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div>
              <h6 className="mt-8 text-lg font-semibold">
                Digital CME Content
              </h6>
              <Carousel
                arrows={false}
                responsive={responsive}
                draggable={true}
                showDots={true}
                className="mt-2"
              >
                {doctor_digitalcme.map((cme, idx) => (
                  <div key={idx} className="px-1">
                    <div className="bg-gray-100 rounded-2xl p-2 flex flex-col shadow-sm h-[440px]">
                      {/* ✅ Fixed Image Container */}
                      <div className="w-full h-48 overflow-hidden rounded-lg">
                        <img
                          src={cme?.ContentImage}
                          alt={cme?.ContentTitle}
                          className="object-cover w-full h-full"
                        />
                      </div>

                      {/* ✅ Content Section */}
                      <div className="flex flex-col justify-between flex-1 mt-3 text-left">
                        <div>
                          <p className="text-black font-semibold text-[18px] leading-tight mb-1 ">
                            {cme?.ContentTitle}
                          </p>
                          <p className="text-gray-700 text-[15px] font-normal leading-snug line-clamp-6">
                            {cme?.ShortDescription}
                          </p>
                        </div>

                        {/* ✅ Date */}
                        <div className="mt-2 text-sm text-gray-500">
                          {new Date(cme?.Date).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
            <div>
              <h6 className="mt-8 text-lg font-semibold">
                Innovative Case Studies
              </h6>

              <Carousel
                responsive={responsive}
                arrows={false}
                infinite={true}
                autoPlay={false}
                draggable={true}
                showDots={true}
                keyBoardControl={true}
                containerClass="mt-4"
                dotListClass="custom-dot-list"
              >
                {caseStudies.map((cs, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center p-3 m-2 rounded-lg bg-gray-50"
                  >
                    <img
                      src={cs.img}
                      alt="Case Study"
                      className="object-cover w-full rounded h-28"
                    />
                    <p className="mt-2 text-xs text-center">{cs.text}</p>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        );
      case "Hospital Associations":
        return (
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Work Experience</h4>
            {doctorprofile?.work_experience?.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "15px",
                }}
              >
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/1b856e809c7235f840a5c224f76e47c868c95e60?width=96"
                  alt="hospital"
                  style={{ width: "70px", height: "70px", marginRight: "12px" }}
                />
                <div>
                  <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                    {item.hospital_name}
                  </span>
                  <br />
                  <span style={{ fontSize: "14px" }}>
                    {item.designation} <br></br>(
                    {new Date(item.from_year).toLocaleDateString()} -{" "}
                    {new Date(item.to_year).toLocaleDateString()})
                  </span>
                </div>
              </div>
            ))}
            <h4 className="mt-6 text-lg font-semibold">Our Gallery</h4>
            <div className="grid grid-cols-2 gap-4 mt-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {doctorprofile?.PictureGallery?.map((img, idx) => (
                <div
                  key={idx}
                  className="w-full overflow-hidden rounded-md shadow"
                  style={{ aspectRatio: "7/5", flexShrink: 0 }} // approximate 350x250 ratio
                >
                  <img
                    src={img}
                    alt="Gallery"
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        );
      case "Awards & Certificates":
        return (
          <div className="space-y-6">
            {doctor_awards?.map((a, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center gap-6 p-4 bg-white rounded-lg shadow md:flex-row md:items-start"
              >
                {/* Award Image */}
                <div className="flex-shrink-0 w-full md:w-40 lg:w-48 aspect-[67/60] rounded-lg overflow-hidden">
                  <img
                    src={a.ContentImage}
                    alt="Award"
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h4 className="mb-1 text-xl font-bold">{a.ContentTitle}</h4>
                  <p className="mb-2 text-gray-700">{a.GrantingBody}</p>
                  <p className="mb-2 text-gray-700">{a.ShortDescription}</p>
                  <div className="mb-1 text-xs text-gray-500">
                    📅{" "}
                    {new Date(a?.Date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                  <div className="mb-2 text-xs text-gray-500">{a.venue}</div>
                  <a
                    href="#"
                    className="text-sm text-blue-600 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🔗 View Certificate
                  </a>
                </div>
              </div>
            ))}
          </div>
        );
      case "Upcoming Event":
        return (
          <div className="space-y-6">
            {(doctorprofile?.upcoming_events || []).map((event, idx) => (
              <div
                key={idx}
                className="flex flex-col overflow-hidden bg-white border rounded shadow-lg md:flex-row"
              >
                {/* Image on left */}
                <div className="w-full md:w-1/3">
                  <img
                    src={
                      event.event_image || "https://via.placeholder.com/400x300"
                    }
                    alt="Event"
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Content on right */}
                <div className="flex flex-col justify-between w-full p-4 md:w-2/3">
                  <div>
                    <h3 className="mb-2 text-lg font-bold">
                      {event.event_title || "Event Title"}
                    </h3>
                    <p className="mb-2 text-sm text-gray-500">
                      by{" "}
                      {`${doctorprofile?.firstName} ${doctorprofile?.lastName}` ||
                        "Doctor Name"}
                    </p>
                    <p className="mb-1 font-semibold">
                      Event Type: {event.event_type}
                    </p>
                    <p className="mt-1 text-sm font-medium">
                      📍 {event.venue || "Location"}
                    </p>
                    <p className="mt-1 text-sm font-medium">
                      📅{" "}
                      {event.start_date
                        ? new Date(event.start_date).toLocaleDateString()
                        : "-"}{" "}
                      -{" "}
                      {event.end_date
                        ? new Date(event.end_date).toLocaleDateString()
                        : "-"}
                    </p>
                    <p className="mt-1 text-sm font-medium">
                      {event.start_time || ""} - {event.end_time || ""}
                    </p>
                    <p className="mt-1 text-sm font-medium">
                      {event.instructions_for_attendees || ""}
                    </p>
                    <p className="mt-1 text-sm font-medium">
                      Fee: {event.fee || "Free"} {event.currency || ""}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case "Patient Testimonials":
        return (
          <div className="space-y-6">
            {testimonials.map((item, idx) => (
              <TestimonialCard key={idx} {...item} />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Header />

      <div className="max-w-6xl px-1 py-8 mx-auto sm:px-2">
        {/* Profile header */}
        <div className="bg-[#f2f3f6] rounded-lg">
          <div className="flex flex-col gap-4 p-6 rounded-lg shadow">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="max-w-[200px]">
                <img
                  src={doctorprofile?.ProfilePicture}
                  alt={doctorprofile?.AssetName}
                  className="h-auto max-w-full rounded-md"
                />
              </div>
              <div className="w-full">
                <div className="flex flex-col justify-between gap-2 mb-4 md:mb-0 md:flex-row">
                  <h2 className="text-2xl font-semibold">
                    {doctorprofile?.AssetName}{" "}
                  </h2>
                  <a
                    href="/pdfs/Dr_Dominic_Stonehart_Profile.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 text-[var(--primary)] border-[var(--primary)] rounded-md py-3 px-4 flex items-center gap-2"
                  >
                    <span className="inline-block align-middle">
                      <i className="bi bi-file-earmark-pdf"></i>
                    </span>
                    Doctor Profile PDF
                  </a>
                </div>
                <p className="mb-1 font-medium text-gray-700">
                  {doctorprofile?.qualification?.join(",")}
                </p>
                <p className="text-[18px] text-[rgba(0,0,0,0.75)] font-medium mb-1">
                  Specializes in:{" "}
                  <span className="text-[18px] text-[rgba(0,0,0,0.75)]">
                    {doctorprofile?.MedicalSpecialties?.map(
                      (item) => item.lookup_value
                    ).join(",")}
                  </span>
                </p>
                <p className="my-2 text-gray-700">
                  {doctorprofile?.ShortDescription}
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-4 md:flex-row">
              <div className="flex gap-3 mt-1">
                {doctorprofile?.linkedInAccount && (
                  <a
                    href={doctorprofile.linkedInAccount}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--primary)] p-1 shadow-card border bg-white border-gray-400 rounded-full h-10 w-10 grid items-center justify-center"
                  >
                    <FaLinkedin size={22} />
                  </a>
                )}
                {doctorprofile?.instagramAccount && (
                  <a
                    href={doctorprofile.instagramAccount}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--primary)] p-1 shadow-card border bg-white border-gray-400 rounded-full h-10 w-10 grid items-center justify-center"
                  >
                    <FaInstagram size={22} />
                  </a>
                )}
                {doctorprofile?.facebookPage && (
                  <a
                    href={doctorprofile.facebookPage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--primary)] p-1 shadow-card border bg-white border-gray-400 rounded-full h-10 w-10 grid items-center justify-center"
                  >
                    <FaFacebookF size={22} />
                  </a>
                )}
                {doctorprofile?.telegramChannel && (
                  <a
                    href={doctorprofile.telegramChannel}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--primary)] p-1 shadow-card border bg-white border-gray-400 rounded-full h-10 w-10 grid items-center justify-center"
                  >
                    <FaTelegram size={22} />
                  </a>
                )}
                {doctorprofile?.whatsAppCommunity && (
                  <a
                    href={doctorprofile.whatsAppCommunity}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--primary)] p-1 shadow-card border bg-white border-gray-400 rounded-full h-10 w-10 grid items-center justify-center"
                  >
                    <FaWhatsapp size={22} />
                  </a>
                )}
                {doctorprofile?.youTubeChannel && (
                  <a
                    href={doctorprofile.youTubeChannel}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--primary)] p-1 shadow-card border bg-white border-gray-400 rounded-full h-10 w-10 grid items-center justify-center"
                  >
                    <FaYoutube size={22} />
                  </a>
                )}
              </div>
              <div className="flex flex-col gap-4 mt-4 md:flex-row">
                <button className="w-full px-3 bg-[var(--button-back-white-color)] text-[var(--button-back-color)] border border-gray-300 rounded-lg py-3 font-semibold text-center text-base hover:bg-gray-50 transition">
                  Send Treatment Query
                </button>
                <div>
                  <button className="lg:min-w-[200px] bg-[var(--button-back-color)] text-[var(--white)] rounded-lg py-3 font-semibold text-center text-base hover:bg-[var(--button-back-hover)] transition">
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs navigation */}
        <div className="flex flex-wrap gap-3 mt-8">
          {[
            "About Us",
            "Hospital Associations",
            "Awards & Certificates",
            "Upcoming Event",
            "Patient Testimonials",
          ].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-6">{renderTabContent()}</div>
      </div>
      <Footer />
    </>
  );
}
