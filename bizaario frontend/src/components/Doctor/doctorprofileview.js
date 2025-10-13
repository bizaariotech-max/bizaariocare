import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../api";
import Header from "../../AppLayout/Header";
import Footer from "../../AppLayout/Footer";
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import { __postApiData } from "../../utils/api";

export default function DoctorProfile() {
  const location = useLocation();
  const id = location.state?.id;

  const[doctorprofile,setdoctorprofile]=useState([])
  const getdoctordata=async()=>
  {
    try {
      const resp=await api.get(`api/v1/admin/GetAsset/${id}`)
      console.log(resp);
      
      setdoctorprofile(resp.data.data)
      
    } catch (error) {
      console.log(error);
      
    }

  }

  useEffect(()=>
  {
    getdoctordata()
  },[id])

    const[doctor_digitalcme,setdoctor_digitalcme]=useState([])

  const getdoctor_digitalcme=async()=>
  {
    try {
      // const resp=await api.get(`api/v1/admin/GetAsset/${id}`)
      const resp = await __postApiData("/api/v1/admin/ContentList",
               {
                  page: 1,
                  limit: 100,
                  ContentTypeId: "68affee3874340d8d79dbf3b",
                  AssetId:id
              });
                
          setdoctor_digitalcme(resp.data.list)
      
    } catch (error) {
      console.log(error);
      
    }

  }

      const[doctor_awards,setdoctor_awards]=useState([])

  const getdoctor_awards=async()=>
  {
    try {
      // const resp=await api.get(`api/v1/admin/GetAsset/${id}`)
      const resp = await __postApiData("/api/v1/admin/ContentList",
               {
                  page: 1,
                  limit: 100,
                  ContentTypeId: "68afff10874340d8d79dbf53",
                  AssetId:id
              });
                
          setdoctor_awards(resp.data.list)
      
    } catch (error) {
      console.log(error);
      
    }

  }

  useEffect(()=>
  {
    getdoctor_digitalcme()
    getdoctor_awards()
  },[id])


console.log(doctor_awards);

  

   const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 4
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4, 
             partialVisibilityGutter: 20
        },
        tablet: {
            breakpoint: { max: 1024, min: 767 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 767, min: 0 },
            items: 1,
           
        }
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
      doctor: "Dr. Stonehart | In Association with Fortis Heart Institute, Delhi",
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
      doctor: "Dr. Stonehart | In Association with Fortis Heart Institute, Delhi",
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
      doctor: "Dr. Stonehart | In Association with Fortis Heart Institute, Delhi",
    }
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
    }
  ];

 
  // const cmeContents = Array(5).fill({
  //   videoSrc: "https://www.youtube.com/embed/bwx2Z69S0YA",
  //   title: "Doctor Mike hosts the AMA Tribute to the Medical School Class of 2023",
  //   date: "20/07/2025, 02:03"
  // });

  const caseStudies = Array(5).fill({
    img: "https://tse2.mm.bing.net/th/id/OIP.WOVyXByfddCawMN5KVQN8AHaFz?pid=Api&P=0&h=180",
    text: "Doctor Mike hosts the AMA Tribute to the Medical School Class of 2003"
  });

 

  const TestimonialCard = ({ name, location, message, video }) => (
  <div
    className="shadow p-4 flex flex-col md:flex-row gap-4"
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
      <div className="w-full md:w-52 flex-shrink-0">
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
            <p className="text-gray-700 leading-relaxed">
              {doctorprofile?.LongDescription}
            </p>
            <p className="text-gray-700">
              Known for a patient-first approach, Dr. Stonehart combines evidence-based medicine with cutting-edge technologies to deliver personalized treatment. Also involved in continuing medical education and several medical publications.
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
              <h6 className="mt-8 text-lg font-semibold">Digital CME Content</h6>
               <Carousel   arrows={false} 
                responsive={responsive}  draggable={true} showDots={true} className="mt-2">
{doctor_digitalcme.map((cme, idx) => (
  <div key={idx} className="px-1">
    <div className="bg-gray-100 rounded-2xl p-2 flex flex-col shadow-sm h-[440px]">
      
      {/* ✅ Fixed Image Container */}
      <div className="w-full h-48 overflow-hidden rounded-lg">
        <img
          src={cme?.ContentImage}
          alt={cme?.ContentTitle}
          className="w-full h-full object-cover"
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
        <div className="text-gray-500 text-sm mt-2">
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
      <h6 className="mt-8 text-lg font-semibold">Innovative Case Studies</h6>

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
          <div key={idx} className="flex flex-col items-center bg-gray-50 rounded-lg p-3 m-2">
            <img
              src={cs.img}
              alt="Case Study"
              className="w-full h-28 object-cover rounded"
            />
            <p className="text-xs mt-2 text-center">{cs.text}</p>
          </div>
        ))}
      </Carousel>
    </div>
          </div>
        );
      case "Hospital Associations":
        return (
          <div className="space-y-6">
            <h4 className="font-semibold text-lg">Work Experience</h4>
            {
            doctorprofile?.work_experience?.map((item, index) => (
           <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/1b856e809c7235f840a5c224f76e47c868c95e60?width=96"
        alt="hospital"
        style={{ width: "70px", height: "70px", marginRight: "12px" }}
      />
      <div>
        <span style={{ fontWeight: "bold", fontSize: "18px" }}>{item.hospital_name}</span>
        <br />
        <span style={{ fontSize: "14px" }}>
          {item.designation} <br></br>({new Date(item.from_year).toLocaleDateString()} - {new Date(item.to_year).toLocaleDateString()})
        </span>
      </div>
    </div>
            ))}
            <h4 className="font-semibold text-lg mt-6">Our Gallery</h4>
         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
  {doctorprofile?.PictureGallery?.map((img, idx) => (
    <div
      key={idx}
      className="w-full rounded-md shadow overflow-hidden"
      style={{ aspectRatio: "7/5", flexShrink: 0 }} // approximate 350x250 ratio
    >
      <img
        src={img}
        alt="Gallery"
        className="w-full h-full object-cover"
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
      className="flex flex-col md:flex-row gap-6 bg-white rounded-lg shadow p-4 items-center md:items-start"
    >
      {/* Award Image */}
      <div className="flex-shrink-0 w-full md:w-40 lg:w-48 aspect-[67/60] rounded-lg overflow-hidden">
    <img
      src={a.ContentImage}
      alt="Award"
      className="w-full h-full object-cover"
    />
  </div>

      {/* Content */}
      <div className="flex-1">
        <h4 className="text-xl font-bold mb-1">{a.ContentTitle}</h4>
        <p className="text-gray-700 mb-2">{a.GrantingBody}</p>
        <p className="text-gray-700 mb-2">{a.ShortDescription}</p>
        <div className="text-xs text-gray-500 mb-1">📅  {new Date(a?.Date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}</div>
        <div className="text-xs text-gray-500 mb-2">{a.venue}</div>
        <a
          href="#"
          className="text-blue-600 underline text-sm"
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
      className="flex flex-col md:flex-row border rounded shadow-lg bg-white overflow-hidden"
    >
      {/* Image on left */}
      <div className="md:w-1/3 w-full">
        <img 
          src={event.event_image || "https://via.placeholder.com/400x300"} 
          alt="Event" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content on right */}
      <div className="md:w-2/3 w-full p-4 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-lg mb-2">{event.event_title || "Event Title"}</h3>
          <p className="text-sm text-gray-500 mb-2">by {`${doctorprofile?.firstName} ${doctorprofile?.lastName}` || "Doctor Name"}</p>
          <p className="font-semibold mb-1">Event Type: {event.event_type}</p>
          <p className="text-sm font-medium mt-1">📍 {event.venue || "Location"}</p>
          <p className="text-sm font-medium mt-1">📅 {event.start_date ? new Date(event.start_date).toLocaleDateString() : "-"} - {event.end_date ? new Date(event.end_date).toLocaleDateString() : "-"}</p>
          <p className="text-sm font-medium mt-1">{event.start_time || ""} - {event.end_time || ""}</p>
          <p className="text-sm font-medium mt-1">{event.instructions_for_attendees || ""}</p>
          <p className="text-sm font-medium mt-1">Fee: {event.fee || "Free"} {event.currency || ""}</p>
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
    <Header/>
   
   
    <div className="max-w-6xl mx-auto px-1 sm:px-2 py-8">
      {/* Profile header */}
  <div className="w-full flex flex-col md:flex-row items-start gap-4 bg-white rounded-xl shadow p-4 border border-gray-200">
  {/* Doctor Photo + Socials */}
  <div className="flex flex-col items-center md:items-start min-w-[7rem]">
    <img
      src={doctorprofile?.ProfilePicture}
      alt={doctorprofile?.AssetName}
      className="w-28 h-32 md:w-36 md:h-40 object-cover rounded-lg border"
    />
    {/* Social Icons below image */}
    <div className="flex gap-3 mt-2">
      <a href="#" className="text-blue-600 text-xl"><i className="bi bi-linkedin"></i></a>
      <a href="#" className="text-pink-500 text-xl"><i className="bi bi-instagram"></i></a>
      <a href="#" className="text-blue-400 text-xl"><i className="bi bi-messenger"></i></a>
    </div>
  </div>

  {/* Info Block */}
  <div className="flex-1 w-full flex flex-col">
    {/* Top Row: Details + Profile PDF */}
    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
      {/* Details Left */}
      <div className="flex-1 min-w-0">
        <h2 className="text-2xl font-bold mb-1">{doctorprofile?.AssetName} </h2>
        <p className="text-gray-700 font-medium mb-1">{doctorprofile?.qualification?.join(',')}</p>
      <p className="text-[18px] text-[rgba(0,0,0,0.75)]  font-medium mb-1">
          Specializes in:{" "}
          <span className=" text-[18px] text-[rgba(0,0,0,0.75)]">
            {doctorprofile?.MedicalSpecialties?.map((item)=>item.lookup_value).join(',')}
          </span>
        </p>
        <p className="text-gray-800 text-sm mt-1 break-words text-[16px] text-[rgba(0,0,0,0.75)]">
           {doctorprofile?.ShortDescription}
        </p>
      </div>
      {/* Profile PDF Link Right (never wraps) */}
      <div className="flex flex-row md:flex-col md:items-end items-center gap-2 md:gap-0 shrink-0 mt-2 md:mt-0">
        <a
          href="/pdfs/Dr_Dominic_Stonehart_Profile.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 underline font-semibold text-sm whitespace-nowrap"
        >
          <span className="inline-block align-middle mr-1">
            <i className="bi bi-file-earmark-pdf"></i>
          </span>
          Doctor Profile PDF
        </a>
      </div>
    </div>
    {/* Action Buttons Row (always right-aligned) */}
    <div className="flex flex-row gap-2 w-full justify-end mt-4">
     <button className="px-6 py-2 rounded-[5px] font-semibold text-orange-700 border border-[#F86F03] bg-white hover:bg-orange-200 transition">
        Send Medical Query
      </button>
      <button className="bg-[#F86F03] text-white px-6 py-2 rounded font-semibold hover:bg-orange-700 transition">
        Book Appointment
      </button>
    </div>
  </div>
</div>



      {/* Tabs navigation */}
      <div className="mt-8 flex flex-wrap gap-3">
        {[
          "About Us",
          "Hospital Associations",
          "Awards & Certificates",
          "Upcoming Event",
          "Patient Testimonials"
        ].map(tab => (
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
     <Footer/>
     </>
  );
}
