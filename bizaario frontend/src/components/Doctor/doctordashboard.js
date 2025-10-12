import React, { useState,useRef,useEffect } from 'react';
import Doctorsidebar from './doctorsidebar';
import Doctorheader from './doctorheader';
import { doctorArr } from '../../Data/LocalData';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../../assets/css/Empowering.css'
import clock from '../../assets/images/clock.png'
import calender from '../../assets/images/calendar.png'
import {dominicArr } from '../../Data/LocalData';
import locationIcon from "../../assets/images/icons/location-pin-alt-1-svgrepo-com 1.png"
import workIcon from "../../assets/images/icons/work.png"
import 'react-multi-carousel/lib/styles.css';
import '../../assets/css/medical-board-partner-hospital.css'
import api from '../../api'
import { useNavigate } from 'react-router-dom';
import novacare1 from '../../assets/images/novacare.png'
import location1 from '../../assets/images/icons/location-light.svg'
import clockIcon from "../../assets/images/icons/clock.svg"
import webIcon from "../../assets/images/icons/web.svg"
// import "../../assets/css/hero.css";
import livesessionlogo from '../../assets/images/LiveSessions.png';
import doctorlogo from '../../assets/images/doctor1.png';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import profileicon from "../../assets/images/iCON.png"
import idicon from "../../assets/images/iCON (1).png"
import medaidbanner from "../../assets/images/medaidbanner.png"
import calendar from '../../assets/images/calendar.png';
import responsivetab from '../../utils/responsive_carousel'



function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}



  const doctordetails = JSON.parse(localStorage.getItem("user"));




export default function Doctordashboard() {

  

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  return (
    <div className="min-h-screen bg-[#F6F7FF] font-sans">
   <Doctorheader />

      <div className="layout">
        <Doctorsidebar />
        <div className="content-wrapper">
          <div className="main-content">

          <KnowledgeBankSection />
          <MedaidBanner />
          <OverviewSection />
          <PatientDetailsSection />
          <MedicalBoard/>
          <Partnerhospital/>
          <LiveSessions />
          <OnlineClinic/>
        </div>
      </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        ></div>
      )}
    </div>
  );
}

// All other subcomponents below (exact code from your previous usage):

function KnowledgeBankSection() {


    const[digital_cme,setdigital_cme]=useState([])
    const get_digital_cme_content=async()=>
    {
      try {
        const resp=await api.post(`api/v1/admin/ContentList`,{ContentTypeId:"68affee3874340d8d79dbf3b",ContentPriority:"Medium"})
 
        setdigital_cme(resp.data.data.list)
        
      } catch (error) {
        console.log(error);
        
      }
    }
    useEffect(()=>
    {
      get_digital_cme_content()
    },[])

    console.log(digital_cme);
    



   const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 3
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3, 
            partialVisibilityGutter: 20,
             
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

  return (
    <>
                <div
                  className="doctor-slider mt-4 position-relative"
                  style={{
                    padding: "24px 0px 24px 24px",
                    alignItems:"stretch",
                    borderRadius: "10px",
                    background: "rgba(189, 196, 212, 0.20)",
                  }}
                >

                  <div className="row">
                <div className="col-lg-8 col-12">
                    <h2 className='fw-semibold'>
                    Knowledge Bank Data Filter
                    </h2>
                  
                </div>
                <div className="col-lg-4 col-12 d-flex justify-content-lg-end align-items-start" style={{padding:"0px 36px 10px 0px"}}>
                  
                              <button className='view-all'>
                                  Use Filter:
                              </button>
                             
                          
                </div>

                </div>

                  <Carousel
                   //   removeArrowOnDeviceType={["tablet", "mobile"]}
                     arrows={false} 
                   responsive={responsive}
                   containerClass=" carousel-container" 
                   itemClass="pe-md-1 px-1"  
                   infinite={true}  
                   renderDotsOutside={true} 
                   partialVisible={true}
               
                   >
               {digital_cme?.map((element) => {
               return (
   
              <div
            key={element.id}
            className="bg-gray-200 rounded-2xl p-2 flex flex-col h-full"
          >
            <img
              src={element.ContentImage}
              alt="doctor"
              className="w-full h-64 object-cover rounded-xl"
            />

            <div className="flex items-center gap-4 mt-3 text-gray-600 text-sm">
              <img src={calender} className="w-3.5 h-3.5" alt="" />
              <p>{new Date(element.Date).toLocaleDateString()}</p>
            </div>

            <div className="mt-4 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-black font-bold text-lg">{element.ContentTitle}</p>
                <p className="text-gray-700 text-sm mt-1 line-clamp-3">{element.ShortDescription}</p>
              </div>

              <div className="flex items-center gap-3 mt-2">
                <img
                  src={element.AssetId.ProfilePicture}
                  alt={element.name}
                  className="w-9 h-9 rounded-full border-2 border-white object-cover"
                />
                <div>
                  <p className="text-black text-sm font-medium">{element.AssetId.AssetName}</p>
                  <p className="text-gray-500 text-xs">
                    {(element.AssetId.MedicalSpecialties || []).map((item) => item.lookup_value).join(', ')}
                  </p>
                </div>
              </div>
            </div>
          </div>
               )
               })}
   </Carousel>
           </div>
         </>
  );
}



function MedaidBanner() {
  return (
    <div
      className="
        relative 
        rounded-lg 
        overflow-hidden 
        w-full 
        min-h-[200px] 
        aspect-[16/6] 
        bg-no-repeat 
        bg-center
        bg-cover
        sm:bg-contain
        sm:aspect-[16/6] 
        sm:min-h-[200px]
        xs:min-h-[120px] xs:aspect-[16/10]
        mt-2
      "
      style={{
        backgroundImage: `url(${medaidbanner})`,margin:0
      }}
    >
      <div className="
        absolute 
        inset-0 
        flex 
        items-end 
        justify-center 
        p-4

        lg:items-center 
        lg:justify-start 
        lg:p-10
      ">
        <button
          style={{ fontFamily: "'Lora', serif" }}
          className="
            bg-[#52677D]
            text-white
            px-6 py-2.5
            rounded-lg
            text-lg
            font-semibold
            hover:bg-[#e5630a]
            transition-colors

            lg:text-2xl
            mt-[15%] ml-[4%]

            sm:mt-[10%] sm:ml-[2%]
            xs:mt-4 xs:ml-0 xs:text-base xs:px-4 xs:py-2
          "
        >
          Get Support Now
        </button>
      </div>
    </div>
  );
}




function OverviewSection() {
  const stats = [
    { title: 'Appointments', value: '150', change: '+11%', color: '#525FE1', chart: 'bar' },
    { title: 'Consultations', value: '22', change: '+6.5%', color: '#6A75EA', chart: 'donut' },
    { title: 'Cancelled', value: '03', change: '+0.6%', color: '#E85C43', chart: 'bar' },
    { title: 'Urgent Resolve', value: '05', change: '+51%', color: '#3EAD4B', chart: 'donut' },
  ];

  return (
    <div className="bg-black/10 rounded-lg p-4 lg:p-6 mt-2" >
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6 lg:mb-8">
        <h2 className="fw-semibold">Overview</h2>
        <div className=" rounded-lg p-3 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full lg:w-auto">
          <div  style={{ fontFamily: "'Lora', serif" }} className=" text-[black] px-3 py-2 rounded-lg text-base lg:text-lg font-normal">
           <input name='filter' type="radio" style={{transform: "scale(1.5)",accentColor: "#52677D",cursor: "pointer"}}></input> Patients referred to me
          </div>
          <div  style={{ fontFamily: "'Lora', serif" }} className="text-black border border-white/70 px-3 py-2 rounded-lg text-base lg:text-lg font-normal">
           <input name='filter' type="radio" style={{transform: "scale(1.5)",accentColor: "#52677D",cursor: "pointer"}}></input> Patients Referred by me
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>
    </div>
  );
}


function StatCard({ title, value, change, color, chart }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm">
      <div className="px-4 lg:px-6 py-3 lg:py-4" style={{ backgroundColor: color }}>
        <h3 className="text-white text-lg lg:text-2xl font-semibold">{title}</h3>
      </div>
      <div className="p-4 lg:p-6 flex items-center gap-4 lg:gap-6">
        {chart === 'bar' ? (
          <div className="flex items-end gap-1 lg:gap-2">
            <div className="w-2 h-12 lg:h-14 bg-black/20 rounded"></div>
            <div className="w-2 h-16 lg:h-18 rounded" style={{ backgroundColor: color }}></div>
            <div className="w-2 h-8 lg:h-10 bg-black/20 rounded"></div>
            <div className="w-2 h-12 lg:h-14 bg-black/20 rounded"></div>
            <div className="w-2 h-14 lg:h-16 bg-black/20 rounded"></div>
          </div>
        ) : (
          <div className="relative w-16 h-16 lg:w-18 lg:h-18">
            <svg width="100%" height="100%" viewBox="0 0 74 74" className="transform -rotate-90">
              <circle cx="37" cy="37" r="30" stroke={color} strokeOpacity="0.2" strokeWidth="7" fill="none" />
              <circle
                cx="37"
                cy="37"
                r="30"
                stroke={color}
                strokeWidth="7"
                fill="none"
                // strokeDasharray={${2 * Math.PI * 30 * 0.3} ${2 * Math.PI * 30}}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-black text-lg lg:text-2xl font-medium">{value}</span>
              <span className="text-black text-sm lg:text-xl font-medium">%</span>
            </div>
          </div>
        )}
        <div className="space-y-2 lg:space-y-3">
          <div className="space-y-1 lg:space-y-3">
            <div className="text-black text-lg lg:text-2xl font-medium">{value}</div>
            <div className="text-black/50 text-base lg:text-xl font-medium">Todays</div>
          </div>
          <div className="text-black/50 text-xs font-medium">{change}</div>
        </div>
      </div>
    </div>
  );
}

//============================== Trusted Medical Experts ====================================



const MedicalBoard = () => {
const [activeTab, setActiveTab] = useState('tab1');

     const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 3,
            // showDots:true
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3, 
             partialVisibilityGutter: 20,
            //  showDots:true
        },
        tablet: {
            breakpoint: { max: 1024, min: 767 },
            items: 2,
            // showDots:true
        },
        mobile: {
            breakpoint: { max: 767, min: 0 },
            items: 1,
            // showDots:true
        }
    };

    const navigate=useNavigate()

     const [doctorArr, setDoctorArr] = useState([]); // store fetched doctors

 const getDoctorProfile = async () => {
    try {
      const resp = await api.post("api/v1/admin/assetList", {
        AssetCategoryLevel1: "68b0104063729ea39b28d0fb",
      });

      const formattedData = resp.data.data.list.map((doc, index) => ({
        id: doc._id || index + 1,
        name: doc.AssetName,
        // exp: `${
        //   (doc.MedicalSpecialties || []).map((item) => item.lookup_value).join(", ")
        // } | ${doc.experience || 0} Years Experience`,
          exp: `${
          doc.MedicalSpecialties[0].lookup_value} | ${doc.experience || 5} Years Experience`,
        location: `${doc.AddressLine1} ${doc.AddressLine2}${doc.PostalCode}` || "",
        Specializes: `${
          (doc.MedicalSpecialties || []).map((item) => item.lookup_value).join(", ")
        } `,
        image: doc.ProfilePicture || null,
      }));

      setDoctorArr(formattedData);
    } catch (error) {
      console.error("Error fetching doctor profile:", error);
    }
  };

  
  useEffect(() => {
    getDoctorProfile();
  }, []);





const renderContent = () => {
switch (activeTab) {
  case 'tab1': return <div>

    {/* <MedicalBoardCard2 /> */}

  </div>;
// case 'tab2': return  <div> <MedicalBoardCard2 />  </div>;
// case 'tab3': return <div>  <MedicalBoardCard2 /> </div>;
// case 'tab4': return <div>  <MedicalBoardCard2 /> </div>;
// case 'tab5': return <div>  <MedicalBoardCard2 /> </div>;
// case 'tab6': return <div>  <MedicalBoardCard2 /> </div>;
// case 'tab7': return <div>  <MedicalBoardCard2 /> </div>;
// return null;
}
};

return (
<>
  <div className=''>
    <div>
      <div className="row mt-2"> 
       
                <div className="col-lg-8 col-12">
                    <h2 className='fw-semibold' >
                    Trusted Medical Experts
                    </h2>
                    <p className='light-color' >
                       
                          Bringing global experience,compassionate care, and proven results.</p>
                </div>
                  <div className="col-lg-4 col-12 d-flex justify-content-lg-end align-items-start p-2 m-0">
                  
                              <button className='view-all'>
                                  View All &#8594;
                              </button>
                             
                </div>

               
          <div className=" medical-tab-buttons mb-4">  

              <Carousel
                arrows={false}
                responsive={responsivetab}
                containerClass="carousel-container w-full"
                itemClass="px-2"
                infinite
                partialVisible
              >

              
            <button className={`cutom-tab-style ${activeTab==='tab1' ? 'activeTab' : 'gray-btn-style' }`} onClick={()=>
            setActiveTab('tab1')}>
            Cardiology
          </button> 
          <button className={`cutom-tab-style ${activeTab==='tab2' ? ' activeTab' : 'gray-btn-style' }`} onClick={()=>
            setActiveTab('tab2')}
            >
            Orthopedics
          </button> 
          <button className={`cutom-tab-style ${activeTab==='tab3' ? 'activeTab' : 'gray-btn-style' }`} onClick={()=>
            setActiveTab('tab3')}
            >
            Pediatrics
          </button> 
          <button className={`cutom-tab-style ${activeTab==='tab4' ? 'activeTab' : 'gray-btn-style' }`} onClick={()=>
            setActiveTab('tab4')}
            >
            Neurology
            </button>
             <button className={` cutom-tab-style ${activeTab==='tab5' ? 'activeTab' : 'gray-btn-style' }`} onClick={()=>
            setActiveTab('tab5')}
            >
            Obstetrics & Gynecology
          </button>
          <button className={` cutom-tab-style ${activeTab==='tab7' ? 'activeTab' : 'gray-btn-style' }`} onClick={()=>
            setActiveTab('tab7')}
            >
            Plastic & Reconstructive Surgery
          </button> 
          <button className={` cutom-tab-style ${activeTab==='tab6' ? 'activeTab' : 'gray-btn-style' }`} onClick={()=>
            setActiveTab('tab6')}
            >
            Otorhinolaryngology
          </button> 

          </Carousel>

        </div>  
        <div style={{padding:0}} className='position-relative'>{renderContent()}</div>
      </div>
    </div>
  </div>

  <div style={{marginTop:"0%"}}>
        <Carousel
            // removeArrowOnDeviceType={["tablet", "mobile"]}
            // showDots={true}
            responsive={responsive}
            // autoPlay={false}
            // autoPlaySpeed={3000}
            // transitionDuration={2000} 
            // additionalTransfrom={-20}
            // pauseOnHover={false} 
            // centerMode={false}
            
            containerClass="" 
            itemClass="pe-md-1 px-1"   
            arrows={false}  
            infinite={true}  
            // renderDotsOutside={true} 
            partialVisible={true} 
        >
      {doctorArr.map((item) => (
        <div
          key={item.id}
          className="relative max-w-sm bg-white rounded-lg shadow-md flex flex-col h-full"
        >
          {/* Header Section */}
    <div className="bg-gray-200 rounded-t-lg relative flex items-center px-1 sm:px-1 py-1">
  {/* Doctor Image overlapping bottom-left */}
  <img
    src={item.image}
    alt="doctor"
    className="absolute -bottom-12 left-4 sm:left-6 w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white object-cover shadow"
  />

  {/* Name + Exp aligned next to image */}
  <div className="ml-24 mt-4 sm:ml-32 flex flex-col justify-center flex-1 overflow-wrap">
    <h5 className="text-base sm:text-lg font-bold text-black truncate">{item.name}</h5>
    <p className="text-xs sm:text-sm text-gray-700 break-words">
      {item.exp}
    </p>
  </div>
</div>


          {/* Location & Specialization */}
          <div className="mt-16 px-4 py-3 space-y-2">
            <div className="flex items-start text-sm text-black">
              <img
                src={locationIcon}
                alt="location"
                className="w-5 h-5 mr-2 flex-shrink-0"
              />
              <span>{item.location}</span>
            </div>
            <div className="flex items-start text-sm">
              <img
                src={workIcon}
                alt="work"
                className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0"
              />
              <span>
                <strong>Specializes in:</strong>{" "}
                <span className="text-gray-600">{item.Specializes}</span>
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="px-4 pb-4 flex flex-col gap-3 mt-auto">
            <button className=" bg-[var(--button-back-color)] text-[var(--white)] rounded-lg py-3 font-semibold text-center text-base hover:bg-[var(--button-back-hover)] transition">
              Send Medical Query
            </button>
            <button
              onClick={() => navigate("/viewdoctorprofile", { state: { id: item.id } })}
              className="bg-[var(--button-back-white-color)] text-[var(--button-back-color)] border border-gray-300 rounded-lg py-3 font-semibold text-center text-base hover:bg-gray-50 transition"
            >
              View Profile
            </button>
          </div>
        </div>
      ))}
            </Carousel>
</div>

</>
);
};







// Example patient array
const patients = [
  {
    name: "Prince Kumar",
    id: "BZ0108545564113C",
    nationality: "India",
    doctor: "Dr. Prince Kumar",
    steps: [
      { title: "VIL Issued", status: "Done", color: "#4B7F28", date: "20/12/2025" },
      { title: "Medical Via Issued", status: "In Processing", color: "#D6C90F", date: "20/12/2025" },
      { title: "Hospital Admission", status: "Not Complete", color: "#C23C3C", date: "20/12/2025" },
    ]
  },
  {
    name: "John Doe",
    id: "P002",
    nationality: "USA",
    doctor: "Dr. Smith",
    steps: [
      { title: "VIL Issued", status: "Done", color: "#4B7F28", date: "18/12/2025" },
      { title: "Medical Via Issued", status: "Done", color: "#4B7F28", date: "19/12/2025" },
      { title: "Hospital Admission", status: "In Processing", color: "#D6C90F", date: "20/12/2025" }
    ]
  },
    {
    name: "Prince Kumar",
    id: "BZ0108545564113C",
    nationality: "India",
    doctor: "Dr. Prince Kumar",
    steps: [
      { title: "VIL Issued", status: "Done", color: "#4B7F28", date: "20/12/2025" },
      { title: "Medical Via Issued", status: "In Processing", color: "#D6C90F", date: "20/12/2025" },
      { title: "Hospital Admission", status: "Not Complete", color: "#C23C3C", date: "20/12/2025" }
    ]
  },
  // Add more patients here
];

const  PatientDetailsSection=()=> {
  // This demo uses your CSS from the query!
  const cardCss = {
    display: "flex",
    flexDirection: "column",
    width: "594px",
    height: "613px",
    padding: "20px",
    alignItems: "center",
    gap: "10px",
    borderRadius: "10px",
    border: "1px solid rgba(0, 0, 0, 0.70)",
    background: "rgba(189, 196, 212, 0.30)",
    boxSizing: "border-box"
  };

  // Responsive tweaks: use 100% width below 900px
  const cardWrapCss = {
    display: "flex",
    justifyContent: "center",
    width: "100%"
  };

  
       const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 2
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 2, 
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


  return (
    <div style={{ width: "100%",  boxSizing: "border-box" }}>
          <div className="row mt-2">
                <div className="col-lg-8 col-12">
                    <h2 className='fw-semibold'>
                    Patient Details
                    </h2>
                  
                </div>
                <div className="col-lg-4 col-12 d-flex justify-content-lg-end align-items-start" >
                  
                              <button className='view-all'>
                                  Use Filter:
                              </button>
                             
                          
                </div>

                </div>

      <div style={{marginTop:"20px"}}>
      <Carousel
                        //   removeArrowOnDeviceType={["tablet", "mobile"]}
                        arrows={false} 
                        responsive={responsive}
                        // autoPlay={false}
                        // autoPlaySpeed={3000}
                        // transitionDuration={2000} 
                        //additionalTransfrom={-20}
                        //  pauseOnHover={false} 
                        //  centerMode={false}
                        containerClass=" carousel-container" 
                        itemClass="pe-md-4 px-1"  
                        // showDots={true}
                        infinite={true}  
                        renderDotsOutside={true} 
                        partialVisible={true}
                        
                    
                        >
        {patients.map((data, idx) => (
          <SwiperSlide key={idx} style={cardWrapCss}>
            <div style={cardCss}>
              <div style={{
                  display: "flex", width: "100%",
                  justifyContent: "space-between", marginBottom: 12
                }}>
                <div style={{
                  width:"60%",
                  background: "#fff",
                  borderRadius: 8,
                  marginBottom: 10,
                  padding: "12px 14px",
                  boxShadow: "0 2px 4px rgba(82,95,225,0.04)"}}>
                  <div style={{ fontWeight: "bold", fontSize: 16,fontFamily: "Poppins" }}>Patient Details</div>
                  <div style={{display:"flex",gap:"10px"}}>
                  <img src={profileicon} alt='' style={{height:"19px",width:"19px"}}></img>
                  <a href="#" style={{ color: "#525FE1", textDecoration: "underline", fontWeight: 500, fontSize: 15,fontFamily: "Poppins" }}>
                    {data.name}
                  </a>
                  </div>
                   <div style={{display:"flex",gap:"10px"}}>
                  <img src={idicon} alt='' style={{height:"19px",width:"19px"}}></img>
                  <div style={{ color: "#525FE1", fontSize: 13,fontFamily: "Poppins" }}>{data.id}</div>
                  </div>
                </div>
                <div style={{ 
                  width:"35%",
                  background: "#fff",
                  borderRadius: 8,
                  marginBottom: 10,
                  padding: "12px 14px",
                  boxShadow: "0 2px 4px rgba(82,95,225,0.04)"}}>
                  <div style={{ fontWeight: "bold", fontSize: 16,fontFamily: "Poppins" }}>Nationality</div>
                  <div style={{ color: "#222", fontSize: 13,fontFamily: "Poppins" }}>{data.nationality}</div>
                </div>
              </div>
              <div style={{
                  width: "100%",
                  background: "#fff",
                  borderRadius: 8,
                  marginBottom: 10,
                  padding: "12px 14px",
                  boxShadow: "0 2px 4px rgba(82,95,225,0.04)"
                }}>
                <div style={{ fontWeight: 500, color: "#444", marginBottom: 4 ,fontFamily: "Poppins"}}>Referred Doctor Name :</div>
                <div style={{ color: "#525FE1", fontWeight: 500,fontFamily: "Poppins" }}>{data.doctor}</div>
              </div>
              <div style={{ display: "flex", width: "100%", alignItems: "flex-start", gap: 18, flex: 1 }}>
                {/* Timeline Circles & Lines */}
                <div style={{ position: "relative", marginTop: 5 }}>
                  {data.steps.map((step, i) => (
                    <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div style={{
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          background: "#fff",
                          border: "3px solid #CED6F3",
                          position: "relative",
                          zIndex: 1
                        }}>
                        <div style={{
                          position: "absolute",
                          left: 1,
                          top: 1,
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          background:step.status==="Done"?"gray":""
                        }}></div>
                      </div>
                      {i < data.steps.length - 1 && (
                        <div style={{
                          width: 4,
                          height: 100,
                          background: "#CED6F3"
                        }}></div>
                      )}
                    </div>
                  ))}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  {data.steps.map((step, i) => (
                    <div
                      key={i}
                      style={{
                        background: "#fff",
                        borderRadius: 8,
                        boxShadow: "0 1px 4px rgba(82,95,225,0.08)",
                        marginBottom: 18,
                        padding: "13px 18px",
                        minHeight: 60,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center"
                      }}>
                      <div style={{ fontWeight: "bold", color: "#222", fontSize: 15,fontFamily: "Poppins" }}>{step.title}</div>
                      <div style={{ display: "flex", alignItems: "center", margin: "7px 0" }}>
                        <span
                          style={{
                            width: 14,
                            height: 14,
                            borderRadius: "50%",
                            background: step.color,
                            display: "inline-block",
                            marginRight: 9
                          }}
                        ></span>
                        <span style={{ fontWeight: 500, color: "#333", fontSize: 14,fontFamily: "Poppins" }}>{step.status}</span>
                      </div>
                      <div style={{
                        fontSize: 13,
                        fontFamily: "Poppins",
                        color: "#555",
                        display: "flex",
                        alignItems: "center",
                        gap: 7
                      }}>
                        <span role="img" aria-label="calendar">📅</span>
                        {step.date}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Carousel>
      </div>

    </div>
  );
}



// ===============================partner hospital section=========================================


const Partnerhospital = () => {

    const [hospital_details, sethospital_details] = useState([]);

  const get_hospital_profile = async () => {
    try {
      const resp = await api.post("api/v1/admin/assetList", {
        AssetCategoryLevel1: "68b00db063729ea39b28d0ef",
      });



      const formattedData = resp.data.data.list.map((doc, index) => ({
        id: doc._id || index + 1,
        name: doc.AssetName,
        // exp: `${
        //   (doc.MedicalSpecialties || []).map((item) => item.lookup_value).join(", ")
        // } | ${doc.experience || 0} Years Experience`,
          exp: `${
          doc.MedicalSpecialties.map((item)=>item.lookup_value)} | ${doc.experience || 5} Years Experience`,
        location: `${doc.AddressLine1} ${doc.AddressLine2} ${doc.PostalCode}` || "",
        Specializes: `${
          (doc.MedicalSpecialties || []).map((item) => item.lookup_value).join(", ")
        } `,
        image: doc.ProfilePicture || null,
        Website:doc.Website || "",
        Logo:doc.Logo || ""
      }));

      sethospital_details(formattedData);
    } catch (error) {
      console.error("Error fetching doctor profile:", error);
    }
  };

  useEffect(() => {
    get_hospital_profile();
  }, []);



                const [activeTab, setActiveTab] = useState('tab1');



  
       const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 3
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3, 
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



  return (
    <>

    <div className='mt-4'>
         <div className="row"> 
                <div className="col-lg-8 col-12">
                    <h2 className='fw-semibold'>
                    Partner Hospitals
                    </h2>
                    <p className='light-color'>
                    World-class healthcare instituatins with advanced facilities and trusted care.</p>
                </div>
                <div className="col-lg-4 col-12 d-flex justify-content-lg-end align-items-start">
                  
                              <button className='view-all'>
                                  View All &#8594;
                              </button>
                             
                          
                </div>

                </div>

                          <div className="col-lg-12 col-12 d-flex ">
                   
                     <Carousel
                arrows={false}
                responsive={responsivetab}
                containerClass="carousel-container w-full"
                itemClass="px-2"
                infinite
                partialVisible
              >
                        <button className={`cutom-tab-style ${activeTab==='tab1' ? 'activeTab' : 'gray-btn-style' }`} onClick={()=>
                        setActiveTab('tab1')}>
                        Delhi NCR
                    </button> 
                    <button className={`cutom-tab-style ${activeTab==='tab2' ? ' activeTab' : 'gray-btn-style' }`} onClick={()=>
                        setActiveTab('tab2')}
                        >
                       Mumbai
                    </button> 
                    <button className={`cutom-tab-style ${activeTab==='tab3' ? 'activeTab' : 'gray-btn-style' }`} onClick={()=>
                        setActiveTab('tab3')}
                        >
                        Bengaluru
                    </button> 
                    <button className={`cutom-tab-style ${activeTab==='tab4' ? 'activeTab' : 'gray-btn-style' }`} onClick={()=>
                        setActiveTab('tab4')}
                        >
                        Noida   
                        </button>
                        <button className={` cutom-tab-style ${activeTab==='tab5' ? 'activeTab' : 'gray-btn-style' }`} onClick={()=>
                        setActiveTab('tab5')}
                        >
                       Delhi NCR
                    </button>
                    <button className={` cutom-tab-style ${activeTab==='tab7' ? 'activeTab' : 'gray-btn-style' }`} onClick={()=>
                        setActiveTab('tab7')}
                        >
                        Mumbai
                    </button> 
                    <button className={` cutom-tab-style ${activeTab==='tab6' ? 'activeTab' : 'gray-btn-style' }`} onClick={()=>
                        setActiveTab('tab6')}
                        >
                       Bengaluru
                    </button> 
                    </Carousel>
                   
                      </div>
                        <div className="col-lg-2  col-12d-flex justify-content-end mt-2">
                          <div className="mb-4">
                            <div className="input-group" style={{maxWidth:'216px'}}>
                              <span className="input-group-text bg-white border-end-0"><img src={location1} alt="" /></span>
                              <select className="form-select border-start-0" 
                                >
                                <option value="">Select City</option>
                                <option value="">Bengaluru</option>
                                <option value="">Mumbai</option>
                                <option value="">Delhi NCR</option> 
                              </select>
                            </div>
                    
                          </div>
                        </div> 
                </div>
                <div > 
                  {/* <div style={{padding:0}}>{renderContent()}</div> */}
                </div> 


    <>
         <div className="doctor-slider mt-4 position-relative">
                       <Carousel
                        //   removeArrowOnDeviceType={["tablet", "mobile"]}
                          arrows={false} 
                        responsive={responsive}
                        // autoPlay={false}
                        // autoPlaySpeed={3000}
                        // transitionDuration={2000} 
                        //additionalTransfrom={-20}
                        //  pauseOnHover={false} 
                        //  centerMode={false}
                        containerClass=" carousel-container" 
                        itemClass="pe-md-1 px-1"  
                        // showDots={true}
                        infinite={true}  
                        renderDotsOutside={true} 
                        partialVisible={true}
                    
                        >
                {hospital_details.map((item) => {
                    return ( 
                                
     <div className="relative max-w-sm bg-white rounded-lg shadow-md flex flex-col h-full" key={item.id}>
  <div className="bg-white border border-gray-300 rounded-lg shadow relative flex flex-col h-full">
    {/* ✅ Top Banner Image */}
    <div className="relative w-full h-32 sm:h-52">
      <img
        src={item.image}
        alt="hospital"
        className="w-full h-full object-cover"
      />

      {/* ✅ Doctor Image overlapping bottom-left */}
      <img
        src={item.Logo}
        alt="doctor"
        className="absolute -bottom-10 left-4 sm:left-6 w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white object-cover shadow z-50"
      />
    </div>

    {/* ✅ Name + Exp (next to the doctor image) */}
    <div className="pt-2 sm:pt-2 px-4 sm:px-6">
      <div className="ml-24 sm:ml-32">
        <h5 className="text-base sm:text-lg font-bold text-black break-words">
          {item.name}
        </h5>
        <p className="text-xs sm:text-sm text-gray-700 break-words">
          {item.exp}
        </p>
      </div>
    </div>

    {/* ✅ Content */}
    <div className="px-4 sm:px-6 py-4 space-y-3 flex-1 mt-auto">
      <div className="flex items-start space-x-2">
        <img src={locationIcon} alt="location" className="w-5 sm:w-6" />
        <span className="text-black text-sm sm:text-base break-words">
          {item.location}
        </span>
      </div>
      <div className="flex items-start space-x-2">
        <img src={clockIcon} alt="clock" className="w-5 sm:w-6" />
        <span className="text-black text-sm sm:text-base">
          Hours: {item?.hours ? item.hours : "24/7"}
        </span>
      </div>
      <div className="flex items-start space-x-2">
        <img src={webIcon} alt="web" className="w-5 sm:w-6" />
        <span className="text-black text-sm sm:text-base break-words">
          Website: {item.Website}
        </span>
      </div>
    </div>

    {/* ✅ Buttons */}
    <div className="px-4 pb-4 flex flex-col gap-3 mt-auto">
      <button className="bg-[#52677D] text-white rounded-lg py-3 text-sm sm:text-base font-semibold">
        Book An Appointment
      </button>
      <button className="bg-white text-[#52677D] border border-gray-300 rounded-lg py-3 text-sm sm:text-base font-semibold">
        Send Treatment Query
      </button>
    </div>
  </div>
</div>

                                )
                        })} 
                        </Carousel>
                        </div>
    </>
  




    </>
  )

}






//===================================== live session================================================

const LiveSessions = () => (
  <div
    style={{
      marginTop:20 ,
      position: "relative",
      width: "100%",
      minHeight: "60vh",
      backgroundImage: `url(${livesessionlogo})`,
      backgroundSize: "cover", // Change to 'cover' for better scaling
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "clamp(16px, 4vw, 50px)",
      boxSizing: "border-box", // Ensure padding is respected
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        // background: "rgba(0,0,0,0.32)", 
        zIndex: 1,
      }}
    />
    <div
      
      style={{
        position: "relative",
        zIndex: 2,
        color: "#fff",
        width: "100%",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      <div
        className="row"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(18px, 3vw, 36px)",
        }}
      >
        <div
          className="col-12 col-md-8"
          style={{
            width: "100%",
            maxWidth: "700px",
          }}
        >
          <div
            className="hero-content"
            style={{
              textAlign: "left",
              padding: "clamp(12px, 2vw, 0px)",
            }}
          >
            <h1
              style={{
                fontFamily: "Lora, serif",
                fontSize: "clamp(22px, 4vw, 36px)",
                fontWeight: 700,
                lineHeight: 1.3,
                marginBottom: "clamp(12px, 2vw, 20px)",
                color: "white",
              }}
            >
              Live Session - Coming Soon
            </h1>
            <p
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "clamp(14px, 2vw, 18px)",
                fontWeight: 400,
                lineHeight: 1.6,
                color: "white",
                marginBottom: "clamp(8px, 1.5vw, 16px)",
              }}
            >
              Our expert doctors will be going live soon...
            </p>
            <p
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "clamp(14px, 2vw, 18px)",
                fontWeight: 400,
                lineHeight: 1.6,
                color: "white",
                marginBottom: "clamp(16px, 2vw, 24px)",
              }}
            >
              Sessions are conducted by certified doctors
            </p>
            {/* Doctor Card */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                maxWidth: "500px",
                padding: "clamp(12px, 3vw, 24px)",
                borderRadius: "10px",
                background: "rgba(189, 196, 212, 0.30)",
                boxSizing: "border-box",
                gap: "clamp(8px, 2vw, 18px)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "clamp(8px, 2vw, 16px)",
                  flexWrap: "wrap",
                }}
              >
                {/* Profile Image */}
                <img
                  src={doctorlogo}
                  alt="doctor"
                  style={{
                    borderRadius: "50%",
                    border: "2px solid #FFF",
                    width: "clamp(60px, 15vw, 88px)",
                    height: "clamp(60px, 15vw, 88px)",
                    objectFit: "cover",
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1, minWidth: "180px" }}>
                  <p
                    style={{
                      color: "white",
                      fontFamily: "Lora, serif",
                      fontSize: "clamp(14px, 2vw, 16px)",
                      fontWeight: 700,
                      margin: 0,
                    }}
                  >
                    By Doctor Malik
                  </p>
                  <p
                    style={{
                      color: "white",
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "clamp(12px, 1.8vw, 14px)",
                      fontWeight: 400,
                      margin: 0,
                    }}
                  >
                    Senior Cardiologist Apollo Hospitals
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "clamp(12px, 4vw, 24px)",
                      marginTop: "10px",
                    }}
                  >
                    {/* Time */}
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <img src={clock} style={{ width: "14px", height: "14px" }} alt="" />
                      <p
                        style={{
                          color: "white",
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "clamp(12px, 1.5vw, 14px)",
                          margin: 0,
                        }}
                      >
                        02.30 AM
                      </p>
                    </div>
                    {/* Date */}
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <img src={calender} style={{ width: "14px", height: "14px" }} alt="" />
                      <p
                        style={{
                          color: "white",
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "clamp(12px, 1.5vw, 14px)",
                          margin: 0,
                        }}
                      >
                        01/01/2025
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
            {/* Doctor card ends */}

             {/* Wrapper for input + button */}
  <div style={{ position: "relative", width: "100%", maxWidth: "500px",marginTop:"36px" }}>
    <input
      type="text"
      placeholder="Write Your Email Id"
      style={{
        display: "block",
        width: "100%",
        height: "60px",
        padding: "12px 100px 12px 24px", // extra right padding for button space
        borderRadius: "10px",
        border: "1px solid #ccc",
        boxSizing: "border-box",
        background:"white"
      }}
    >
      </input>
      
    <button
      className="notify-me"
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







//===================================== online clinic section=========================================

function OnlineClinic() {

  const [selectedCity, setSelectedCity] = useState('');
  
  const [activeTab, setActiveTab] = useState('tab1');
  
    const renderContent = () => {
      switch (activeTab) {
        case 'tab1': return <div>
          <DocAppointTableContent />
        </div>;
        case 'tab2': return <div>
          <DocAppointTableContent />
        </div>;
        case 'tab3': return <div>
          <DocAppointTableContent />
        </div>;
        case 'tab4': return <div>
          <DocAppointTableContent />
        </div>;
        case 'tab5': return <div>
          <DocAppointTableContent />
        </div>;
        case 'tab6': return <div>
          <DocAppointTableContent />
        </div>;
        case 'tab7': return <div>
          <DocAppointTableContent />
        </div>;
          return null;
      }
    };
  
  // const specialties = ['Cardiology', 'Dermatology', 'Neurology'];
  const cities = ['Noida', 'Delhi', 'Mumbai'];




  return (
     <section >
           <div>
             <div className="row">
               <div className="col-lg-8 col-12">
                 <h2 className="fw-semibold ">Online Clinics</h2>
                 <p className="light-color">
                   Learn from leading doctors and specialists through focused,
                   digestible video content.
                 </p>
               </div>
             </div>
           </div>
          

          <div className="row">
               <div className=" medical-tab-buttons mb-4 col-lg-12">  
                      <Carousel
                arrows={false}
                responsive={responsivetab}
                containerClass="carousel-container w-full"
                itemClass="px-2"
                infinite
                partialVisible
              >

            
                      <button className={`cutom-tab-style ${activeTab==='tab1' ? 'activeTab' : 'gray-btn-style' }`} onClick={()=>
                      setActiveTab('tab1')}>
                      Cardiology
                    </button> 
                    <button className={`cutom-tab-style ${activeTab==='tab2' ? ' activeTab' : 'gray-btn-style' }`} onClick={()=>
                      setActiveTab('tab2')}
                      >
                      Orthopedics
                    </button> 
                    <button className={`cutom-tab-style ${activeTab==='tab3' ? 'activeTab' : 'gray-btn-style' }`} onClick={()=>
                      setActiveTab('tab3')}
                      >
                      Pediatrics
                    </button> 
                    <button className={`cutom-tab-style ${activeTab==='tab4' ? 'activeTab' : 'gray-btn-style' }`} onClick={()=>
                      setActiveTab('tab4')}
                      >
                      Neurology
                      </button>
                       <button className={` cutom-tab-style ${activeTab==='tab5' ? 'activeTab' : 'gray-btn-style' }`} onClick={()=>
                      setActiveTab('tab5')}
                      >
                      Obstetrics & Gynecology
                    </button>
                    <button className={` cutom-tab-style ${activeTab==='tab7' ? 'activeTab' : 'gray-btn-style' }`} onClick={()=>
                      setActiveTab('tab7')}
                      >
                      Plastic & Reconstructive Surgery
                    </button> 
                    <button className={` cutom-tab-style ${activeTab==='tab6' ? 'activeTab' : 'gray-btn-style' }`} onClick={()=>
                      setActiveTab('tab6')}
                      >
                      Otorhinolaryngology
                    </button> 
                      </Carousel>
                  </div>  
            </div>

             <div className="col-lg-2  col-12d-flex justify-content-end">
                <div className="mb-4">
                  <div className="input-group" style={{maxWidth:'216px'}}>
                    <span className="input-group-text bg-white border-end-0"><img src={location1} alt="" /></span>
                    <select className="form-select border-start-0" value={selectedCity} onChange={(e)=>
                      setSelectedCity(e.target.value)}
                      >
                      <option value="">Select City</option>
                      {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
          
                </div>
              </div>


              <div>{renderContent()}</div>


         </section>
  );
}

const DocAppointTableContent = () => {
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 3 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3, partialVisibilityGutter: 20 },
    tablet: { breakpoint: { max: 1024, min: 767 }, items: 2 },
    mobile: { breakpoint: { max: 767, min: 0 }, items: 1 }
  };
  
  return (
 <div className="doctor-slider mt-4 relative">
  <Carousel
    arrows={false}
    responsive={responsive}
    containerClass="carousel-container"
    itemClass="pe-md-4 px-1"
    infinite={true}
    renderDotsOutside={true}
    partialVisible={true}
  >
    {doctorArr.map((element) => (
      <div
        key={element.id}
        style={{
          borderRadius: "20px",
          background: "#fff",
          boxShadow: "0px 2px 10px rgba(150,156,173,0.10)",
          maxWidth: "100%", // ✅ full width on small screens
          margin: "auto",
          overflow: "hidden",
        }}
      >
{/* Header Section */}
<div
  style={{
    position: "relative",
    background: "rgba(189, 196, 212, 0.30)",
    borderRadius: "10px",
    padding: "20px 16px 40px", // bottom space for overlap
    textAlign: "center",
    height: "120px", // ✅ fixed header height
    display: "flex",
    alignItems: "center",
  }}>
  {/* Doctor Image (overlap on bottom-left) */}
  <img
    src={element.image}
    alt="doctor"
    style={{
      position: "absolute",
      bottom: "-40px",   // overlap effect
      left: "16px",      // push inside left corner
      width: "115px",
      height: "115px",
      borderRadius: "12px",
      border: "2px solid #fff",
      objectFit: "cover",
      boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
    }}
  />

  {/* Text Section */}
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start", // ✅ aligns text away from image
      textAlign: "left",
      paddingLeft: "120px",   // ensures text doesn’t overlap image
    }}
  >
    <h5
      style={{
        color: "#000",
        fontFamily: "Lora, serif",
        fontSize: "clamp(16px, 2vw, 20px)",
        fontWeight: 700,
        margin: "0 0 4px 0",
      }}
    >
      {element.name}
    </h5>
    <p
      style={{
        position:"absolute",
        color: "rgba(0, 0, 0, 0.70)",
        fontFamily: "Poppins, sans-serif",
        fontSize: "clamp(12px, 1.5vw, 14px)",
        marginTop: "7%",
      }}
    >
      {element.exp}
    </p>
  </div>
</div>



        {/* Content Section */}
        <div style={{ padding: "60px 15px 15px" }}>
          {/* View Profile */}
          <div style={{ textAlign: "right", marginBottom: "10px" }}>
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

          {/* Country/City */}
          <p>Country/City</p>
          <div
            style={{
              background: "#eef2fb",
              borderRadius: "7px",
              padding: "10px",
              marginBottom: "14px",
              textAlign: "center",
              fontWeight: 600,
              fontSize: "15px",
              color: "#495057",
            }}
          >
            {element.country}/{element.city}
          </div>

          {/* Schedule */}
          <p>Schedule (Date/Time)</p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap", // ✅ wrap on small screens
              gap: "12px",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                flex: "1 1 120px",
                display: "flex",
                alignItems: "center",
                gap: "7px",
                background: "#eef2fb",
                borderRadius: "8px",
                padding: "8px 12px",
              }}
            >
              <img src={calendar} alt="calendar" style={{ width: "17px", height: "17px" }} />
              <span style={{ fontSize: "14px" }}>{element.date}</span>
            </div>
            <div
              style={{
                flex: "1 1 120px",
                display: "flex",
                alignItems: "center",
                gap: "7px",
                background: "#eef2fb",
                borderRadius: "8px",
                padding: "8px 12px",
              }}
            >
              <img src={clock} alt="clock" style={{ width: "17px", height: "17px" }} />
              <span style={{ fontSize: "14px" }}>{element.time}</span>
            </div>
          </div>

          {/* Slots */}
          <p>No. Of Slots</p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                flex: "1 1 120px",
                background: "#eef2fb",
                borderRadius: "7px",
                padding: "10px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "16px", fontWeight: 700 }}>{element.totalSlots}</div>
              <div style={{ fontSize: "13px", color: "#6e7689" }}>Total Seats</div>
            </div>
            <div
              style={{
                flex: "1 1 120px",
                background: "#eef2fb",
                borderRadius: "7px",
                padding: "10px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "16px", fontWeight: 700 }}>{element.availableSlots}</div>
              <div style={{ fontSize: "13px", color: "#6e7689" }}>Available</div>
            </div>
          </div>

          {/* Waiting Time */}
          <p>Waiting Time</p>
          <div
            style={{
              background: "#eef2fb",
              borderRadius: "7px",
              padding: "10px",
              textAlign: "center",
              fontWeight: 600,
              fontSize: "15px",
              color: "#495057",
              marginBottom: "14px",
            }}
          >
            00:20:33
          </div>

          {/* Action Buttons */}
           <div style={{ display: "flex", flexDirection: "column",  padding: "0px" }}>
            <button className='view-all'>
              Book Appointment
            </button>
          
          </div>
        </div>
      </div>
    ))}
  </Carousel>
</div>

  );
};