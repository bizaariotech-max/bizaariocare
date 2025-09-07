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



function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// SVG Icon components
const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const PlayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="5,3 19,12 5,21" fill="currentColor"/>
  </svg>
);

const UploadIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="7,10 12,5 17,10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="12" y1="5" x2="12" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);



export default function Doctordashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  return (
    <div className="min-h-screen bg-[#F6F7FF] font-sans">
  <Doctorsidebar/>
    <Doctorheader/> 
      {/* Main Content */}
      <div className={cn("transition-all duration-300", "lg:ml-64")}>
     

        {/* Main Dashboard Content */}
        <main className="p-4 lg:p-8 space-y-12 lg:space-y-20">
          <KnowledgeBankSection />
          <MedaidBanner />
          <OverviewSection />
          <PatientDetailsSection />
          <MedicalBoard/>
          <Partnerhospital/>
          <LiveSessions />
        </main>
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
    const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = x - startX;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

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
                <div
                  className="doctor-slider mt-4 position-relative"
                  style={{
                    // display: "flex",
                    // height: "509px",
                    padding: "24px 0px 24px 24px",
                    // flexDirection: "column",
                    // alignItems: "flex-start",
                    // gap: "10px",
                    // alignSelf: "stretch",
                    borderRadius: "10px",
                    background: "rgba(189, 196, 212, 0.20)",
                  }}
                >

                  <div className="row">
                <div className="col-lg-8 col-12">
                    <h2 className='fw-semibold' style={{color:"#000",
                                                        fontFamily: "Lora",
                                                        fontSize: "24px",
                                                        fontStyle: "normal",
                                                        fontWeight: "400",
                                                        lineHeight: "normal"}}>
                    Knowledge Bank Data Filter
                    </h2>
                  
                </div>
                <div className="col-lg-4 col-12 d-flex justify-content-lg-end align-items-start" style={{padding:"0px 36px 10px 0px"}}>
                  
                              <button style={{
                                display: "flex",
                                padding: "16px 32px",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "10px",
                                borderRadius: "10px",
                                background:" rgba(189, 196, 212, 0.50)",
                                color:" black",
                                fontFamily: "Lora",
                                fontSize: "16px",
                                fontStyle: "normal",
                                fontWeight: 400,
                                lineHeight: "normal"
                            


                              }}>
                                  Use Filter:
                              </button>
                             
                          
                </div>

                </div>

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
               {doctorArr.map((element) => {
               return (
   
               <div className="" key={element.id} style={{
                   borderRadius:"20px",
                   background:"rgba(189, 196, 212, 0.30)",
                   padding:"20px"
                   
                   }}>
                   <img src={element.image} alt="doctor" className=" mx-auto img-fluid" style={{width: '100%',height:"203px"}} />
                   <div style={{display:"flex",gap:"24px",marginTop:"10px"}}>
                       <div style={{display:'flex',gap:"5px"}}>
                             <img src={clock} style={{width: "14px",height: "14px",display:"inline-block"}} alt=''></img> 
                              <p
                               style={{
                                   color: "rgba(0, 0, 0, 0.70)",
                                   fontFamily: "Poppins",
                                   fontSize: "12px",
                                   fontStyle: "normal",
                                   fontWeight: 400,
                                   lineHeight: "normal",
                               }}
                               >
                                   {element.time}</p> 
                       </div>
                    
                      <div style={{display:'flex',gap:"5px"}}>
                             <img src={calender} style={{width: "14px",height: "14px",display:"inline-block"}} alt=''></img> 
                               <p  style={{
                                   color: "rgba(0, 0, 0, 0.70)",
                                   fontFamily: "Poppins",
                                   fontSize: "12px",
                                   fontStyle: "normal",
                                   fontWeight: 400,
                                   lineHeight: "normal",
                               }}>{element.date}</p> 
                       </div>
                   </div>
                   <div className="content mt-4">
                    <p
                       className="text-gray-700 text-start mb-1"
                       style={{
                           color: "#000",
                           fontFamily: "Lora",
                           fontSize: "20px",
                           fontStyle: "normal",
                           fontWeight: 700,
                           lineHeight: "normal",
                       }}
                       >
                       {element.title}
                       </p>
   
                      <p
                       style={{
                           color: "rgba(0, 0, 0, 0.70)",
                           fontFamily: "Poppins",
                           fontSize: "14px",
                           fontStyle: "normal",
                           fontWeight: 400,
                           lineHeight: "normal",
                           marginBottom: "4px", // to replace mb-1 from Tailwind
                           textAlign: "start",
                       }}
                       >
                       {element.dsc}
                       </p>
   
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                       {/* Profile Image */}
                       <img
                           src={element.image}
                           alt={element.name}
                           style={{
                           borderRadius: "270.5px",
                           border: "2px solid #FFF",
                           width: "38px",
                           height: "38px",
                           flexShrink: 0,
                           objectFit: "cover", // ensures image fits nicely
                           }}
                       />
   
                       {/* Text Content */}
                       <div>
                           <p
                           style={{
                               color: "#000",
                               fontFamily: "Lora",
                               fontSize: "16px",
                               fontStyle: "normal",
                               fontWeight: 700,
                               lineHeight: "normal",
                               margin: 0,
                           }}
                           >
                           <strong>{element.name}</strong>
                           </p>
   
                           <p
                           style={{
                               color: "rgba(0, 0, 0, 0.70)",
                               fontFamily: "Poppins",
                               fontSize: "12px",
                               fontStyle: "normal",
                               fontWeight: 400,
                               lineHeight: "normal",
                               margin: 0,
                           }}
                           >
                           <strong>{element.Specializes}</strong>
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

function FilterDropdown({ text }) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-lg px-4 lg:px-6 py-3 text-black/50 text-sm cursor-pointer hover:shadow-md transition-shadow min-w-0">
      {/* <span className="flex-1 truncate">{text}</span> 
      <ChevronDownIcon /> */}

        <select name="myOptions" id="mySelect">
          <option value="option1">{text}</option>
          <option value="option2"> Medical Specialty 1</option>
          <option value="option3">Medical Specialty 2</option>
          <option value="option4">Medical Specialty 3</option>
        </select>
    </div>
  );
}
function FilterDropdown2({ text }) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-lg px-4 lg:px-6 py-3 text-black/50 text-sm cursor-pointer hover:shadow-md transition-shadow min-w-0">
        <select name="myOptions" id="mySelect">
          <option value="option1">{text}</option>
          <option value="option2">Doctor 1</option>
          <option value="option3">Doctor 2 </option>
          <option value="option4">Doctor 3 </option>
        </select>
    </div>
  );
}
function FilterDropdown3({ text }) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-lg px-4 lg:px-6 py-3 text-black/50 text-sm cursor-pointer hover:shadow-md transition-shadow min-w-0">
        <select name="myOptions" id="mySelect">
          <option value="option1">{text}</option>
          <option value="option2">Archive 1</option>
          <option value="option3">Archive 2</option>
          <option value="option4">Archive 3</option>
        </select>
    </div>
  );
}

function VideoCard() {
  return (
    <div className="flex flex-col gap-3">
      <div
        className="relative h-32 lg:h-36 bg-gradient-to-b from-black/15 to-black/15 rounded-lg overflow-hidden group cursor-pointer"
        style={{
          backgroundImage:
            "url('https://api.builder.io/api/v1/image/assets/TEMP/1cc1771cf7f3f680edd3d1eb43aca50bb12a8fe2?width=454')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center group-hover:bg-black/20 transition-colors">
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white rounded-full flex items-center justify-center">
            <PlayIcon />
          </div>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-white text-xs font-normal line-clamp-2">Doctor Mike hosts the AMA Tribute to the Medical School Class of 2023</p>
        <p className="text-white text-[10px] font-semibold">By Doctor Malik</p>
      </div>
    </div>
  );
}

function MedaidBanner() {
  return (
    <div
      className="relative bg-gradient-to-r from-black/40 to-black/40 rounded-lg overflow-hidden min-h-[200px] lg:h-72"
      style={{
        backgroundImage:
          "url('https://api.builder.io/api/v1/image/assets/TEMP/6dcfd183ca212769ccedd471b5dff2144e0df26f?width=1964')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16 p-4 lg:p-6 h-full">
        <div className="flex-1 space-y-4 lg:space-y-6 text-center lg:text-left">
          <div className="bg-[#F8EADF] rounded-lg p-4 lg:p-6">
            <h3 className="text-black text-xl lg:text-3xl font-medium leading-tight lg:leading-[43px]">
              MEDAID - Seeking collaboration? Leverage our cutting-edge, AI-powered Collaborative Model for Diagnosis and Treatment Protocols.
            </h3>
          </div>
          <button className="bg-[#F86F03] text-white px-6 py-3 rounded-lg text-lg lg:text-2xl font-semibold hover:bg-[#e5630a] transition-colors">
            Get Support Now
          </button>
        </div>
        <div className="flex-shrink-0">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/14616d343c4333887b9bd572828e5db432baa4d7?width=464"
            alt="MEDAID Logo"
            className="w-32 h-32 lg:w-58 lg:h-60 object-contain"
          />
        </div>
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
    <div className="bg-black/10 rounded-lg p-4 lg:p-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6 lg:mb-8">
        <h2 className="text-black text-2xl lg:text-3xl font-medium">Overview</h2>
        <div className="bg-[#525FE1] rounded-lg p-3 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full lg:w-auto">
          <div className="bg-white text-[#525FE1] px-3 py-2 rounded-lg text-base lg:text-lg font-normal">
            Patients referred to me
          </div>
          <div className="text-white border border-white/70 px-3 py-2 rounded-lg text-base lg:text-lg font-normal">
            Patients Referred by me
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
      const resp = await api.get("doctor/getalldoctor");
      // Transform the data if needed to match your previous structure
      const formattedData = resp.data.doctor.map((doc, index) => ({
        id: doc._id || index + 1, // use _id from DB or fallback index
        name: `${doc.firstName} ${doc.lastName}`,
        exp: `${doc.medical_specialty} | ${doc.experience} Years Experience`,
        location: `${doc.address1} ${doc.address2} ${doc.state} ${doc.city} ${doc.postal_code}` || "",
        Specializes: `${doc.medical_specialty || ""}`,
        image: doc.profile_pic || null, // image URL from DB
      }));

      setDoctorArr(formattedData); // update state
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
    <div className="container ">
      <div className="row"> 
       
                <div className="col-lg-8 col-12">
                    <h2 className='fw-semibold' style={{color:"#000",
                                                        fontFamily: "Lora",
                                                        fontSize: "36px",
                                                        fontStyle: "normal",
                                                        fontWeight: "700",
                                                        lineHeight: "normal"}}>
                    Trusted Medical Experts
                    </h2>
                    <p className='light-color' style={{
                        color:"rgba(0, 0, 0, 0.70)",
                        fontFamily: "Poppins",
                        fontSize: "18px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "normal",
                    }}>
                    Bringing global experience,compassionate care, and proven results.</p>
                </div>
                <div className="col-lg-4 col-12 d-flex justify-content-lg-end align-items-start">
                  
                              <button style={{
                                display: "flex",
                                padding: "16px 32px",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "10px",
                                borderRadius: "10px",
                                background: "#52677D",
                                color:" #FFF",
                                fontFamily: "Lora",
                                fontSize: "16px",
                                fontStyle: "normal",
                                fontWeight: 700,
                                lineHeight: "normal"

                              }}>
                                  View All &#8594;
                              </button>
                             
                          
                </div>

               
          <div className=" medical-tab-buttons mb-4">  
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
        {dominicArr.map((item) => {
        return ( 
 <div
  key={item.id}
  style={{
    margin:0,
    border: "1px solid #ddd",
    borderRadius: "10px",
    background: "#fff",
    // padding: "16px",
    maxWidth: "380px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
  }}
>
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
  {item.name}
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
      {item.exp}
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
      marginTop:"-30%"
    }}
  >
    <img
      src={item.image}
      alt="doctor"
      style={{
        width: "100px",
        height: "100px",
        borderRadius: "50%",
        border: "2px solid #fff",
        objectFit: "cover",
        boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
      }}
    />
  </div>


  {/* Header */}
  {/* <div style={{ textAlign: "center", marginTop: "12px" }}>
    <h5 style={{ fontSize: "18px", fontWeight: 700, margin: 0 }}>
      {item.name}
    </h5>
    <p style={{ fontSize: "14px", color: "#73747e", margin: "4px 0 0" }}>
      {item.exp}
    </p>
  </div> */}

  {/* Location */}
  <div style={{ margin: "16px 0", width: "100%",marginTop:"15%" ,padding:"20px 12px"}}>
    <div style={{ display: "flex", alignItems: "flex-start", marginBottom: "8px", fontSize: "14px" }}>
      <img src={locationIcon} alt="location" style={{ width: "20px", marginRight: "8px" }} />
      <span style={{ color: "#000" }}>{item.location}</span>
    </div>
    <div style={{ display: "flex", alignItems: "flex-start", fontSize: "14px" }}>
      <img src={workIcon} alt="work" style={{ width: "20px", marginRight: "8px", marginTop: "-2px" }} />
      <span>
        <strong>Specializes in:</strong>{" "}
        <span style={{ color: "#73747e" }}>{item.Specializes}</span>
      </span>
    </div>
  </div>

  {/* Buttons */}
  <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%",padding:"20px 12px",marginTop:"-10%" }}>
    <button
      style={{
        background: "#52677D",
        color: "#fff",
        border: "none",
        borderRadius: "10px",
        padding: "14px",
        fontSize: "18px",
        fontFamily: "Lora",
        fontWeight: 600,
        cursor: "pointer",
        textAlign: "center",
      }}
    >
      Send Medical Query
    </button>

    <button
      onClick={() => navigate("/viewdoctorprofile", { state: { id: item.id } })}
      style={{
        background: "#fff",
        color: "#52677D",
        border: "1px solid #cbd5e1",
        borderRadius: "10px",
        padding: "14px",
        fontSize: "18px",
        fontFamily: "Lora",
        fontWeight: 600,
        cursor: "pointer",
        textAlign: "center",
      }}
    >
      View Profile
    </button>
  </div>
</div>



         
            )
        })}
            </Carousel>
</div>

</>
);
};




// function PatientDetailsSection() {
  
//   return (
//     <div className="space-y-4 lg:space-y-6">
//       <h2 className="text-black text-2xl lg:text-3xl font-medium">Patient Details</h2>

//       <div className="flex flex-wrap gap-3 lg:gap-5">
//         <FilterButton text="Hospitals" />
//         <FilterButton text="Select Doctor (s)" />
//         <FilterButton text="Country" />
//       </div>

//       <div className="bg-white rounded-lg overflow-x-auto shadow-sm">
//           <div className="min-w-max" >
//         <div className="bg-[#525FE1] px-4 lg:px-5 py-3 flex gap-3 lg:gap-5 text-white text-sm lg:text-lg font-medium ">
//           <div className="min-w-12 lg:min-w-16 text-center">S.No.</div>
//           <div className="min-w-24 lg:min-w-32">Patient Name</div>
//           <div className="min-w-24 lg:min-w-32">Patient ID</div>
//           <div className="min-w-24 lg:min-w-32">Nationality</div>
//           <div className="min-w-24 lg:min-w-32">Referred Doctor</div>
//           <div className="min-w-20 lg:min-w-24">VIL Issued</div>
//           <div className="min-w-20 lg:min-w-24">Medical Via</div>
//           <div className="min-w-20 lg:min-w-24">Travel Start</div>
//           <div className="min-w-20 lg:min-w-24">Hospital</div>
//           <div className="min-w-20 lg:min-w-24">Treatment</div>
//           <div className="min-w-20 lg:min-w-24">Discharge</div>
//           <div className="min-w-20 lg:min-w-24">Return Home</div>
//           <div className="min-w-20 lg:min-w-24">Follow ups</div>
//           <div className="min-w-20 lg:min-w-24">Case Closure</div>
//         </div>
//         </div>

//         {Array.from({ length: 3 }, (_, i) => (
//           <PatientRow key={i} />
//         ))}
//       </div>
//     </div>
//   );
// }


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

  return (
    <div style={{ width: "100%",  boxSizing: "border-box" }}>
          <div className="row">
                <div className="col-lg-8 col-12">
                    <h2 className='fw-semibold' style={{color:"#000",
                                                        fontFamily: "Lora",
                                                        fontSize: "24px",
                                                        fontStyle: "normal",
                                                        fontWeight: "400",
                                                        lineHeight: "normal"}}>
                    Patient Details
                    </h2>
                  
                </div>
                <div className="col-lg-4 col-12 d-flex justify-content-lg-end align-items-start" style={{padding:"0px 36px 10px 0px"}}>
                  
                              <button style={{
                                display: "flex",
                                padding: "16px 32px",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "10px",
                                borderRadius: "10px",
                                background:" rgba(189, 196, 212, 0.50)",
                                color:" black",
                                fontFamily: "Lora",
                                fontSize: "16px",
                                fontStyle: "normal",
                                fontWeight: 400,
                                lineHeight: "normal"
                            


                              }}>
                                  Use Filter:
                              </button>
                             
                          
                </div>

                </div>

      <Swiper
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          900: { slidesPerView: 2 }
        }}
        style={{ paddingLeft: "10px", paddingRight: "10px" }}
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
      </Swiper>
    </div>
  );
}




// Usage:
// <PatientDetailsCard />


function FilterButton({ text }) {
  return (
    <div className="flex items-center gap-3 bg-white shadow-md rounded-lg px-4 lg:px-5 py-3 cursor-pointer hover:shadow-lg transition-shadow">
      <span className="text-black/50 text-sm">{text}</span>
      <ChevronDownIcon />
    </div>
  );
}

function PatientRow() {
  return (
    <div className="bg-[rgba(82,95,225,0.03)] px-4 lg:px-5 py-3 flex gap-3 lg:gap-5 text-sm lg:text-lg ">
      <div className="min-w-12 lg:min-w-16 text-black text-center">1</div>
      <div className="min-w-24 lg:min-w-32 text-[#525FE1] underline cursor-pointer">John Doe</div>
      <div className="min-w-24 lg:min-w-32 text-[#525FE1] underline cursor-pointer">P001</div>
      <div className="min-w-24 lg:min-w-32 text-black">USA</div>
      <div className="min-w-24 lg:min-w-32 text-black">Dr. Smith</div>
      {Array.from({ length: 9 }, (_, i) => (
        <div key={i} className="min-w-20 lg:min-w-24">
          <TimelineStep completed={i < 4} />
        </div>
      ))}
    </div>
  );
}

function TimelineStep({ completed }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={cn(
          "w-4 h-4 lg:w-5 lg:h-5 rounded-full border",
          completed ? "border-[#19D351] bg-[#19D351]" : "border-[#19D351]"
        )}
      ></div>
      <div className="text-center">
        <div className="text-[rgba(18,18,18,0.85)] text-xs lg:text-sm">DD/MM/YYYY</div>
      </div>
      {completed && <div className="w-20 lg:w-24 h-px bg-[#19D351]"></div>}
    </div>
  );
}


// ===============================partner hospital section=========================================


const Partnerhospital = () => {
                const [activeTab, setActiveTab] = useState('tab1');

      const hospitalPartnerData = [
  
      {
        id: 1, 
        name: "NovaCare Hospital",
        exp: "Multi-specialty / Tertiary Care",
        location: "123 Health Blvd, Los Angeles, CA",
        hours:'Open 24/7  ',
        Specializes: "Specializes in :  Interventional Cardiology, Heart Failure Management , Preventive Cardiology",
        URL:  'www.novacarehealth.com ', 
        image: novacare1
    },
      {
        id: 2, 
        name: "NovaCare Hospital",
        exp: "Multi-specialty / Tertiary Care",
        location: "123 Health Blvd, Los Angeles, CA",
        hours:'Open 24/7  ',
        Specializes: "Specializes in :  Interventional Cardiology, Heart Failure Management , Preventive Cardiology",
        URL:  'www.novacarehealth.com ', 
        image: novacare1
    },
      {
        id: 3, 
        name: "NovaCare Hospital",
        exp: "Multi-specialty / Tertiary Care",
        location: "123 Health Blvd, Los Angeles, CA",
        hours:'Open 24/7  ',
        Specializes: "Specializes in :  Interventional Cardiology, Heart Failure Management , Preventive Cardiology",
        URL:  'www.novacarehealth.com ', 
        image: novacare1
    },
      {
        id: 4, 
        name: "NovaCare Hospital",
        exp: "Multi-specialty / Tertiary Care",
        location: "123 Health Blvd, Los Angeles, CA",
        hours:' Open 24/7  ',
        Specializes: "Specializes in :  Interventional Cardiology, Heart Failure Management , Preventive Cardiology",
        URL:  'www.novacarehealth.com ', 
        image: novacare1
    },
      {
        id: 5, 
        name: "NovaCare Hospital",
        exp: "Multi-specialty / Tertiary Care",
        location: "123 Health Blvd, Los Angeles, CA",
        hours:' Open 24/7  ',
        Specializes: "Specializes in :  Interventional Cardiology, Heart Failure Management , Preventive Cardiology",
        URL:  'www.novacarehealth.com ', 
        image: novacare1
    },
      {
        id: 6, 
        name: "NovaCare Hospital",
        exp: "Multi-specialty / Tertiary Care",
        location: "123 Health Blvd, Los Angeles, CA",
        hours:' Open 24/7  ',
        Specializes: "Specializes in :  Interventional Cardiology, Heart Failure Management , Preventive Cardiology",
        URL:  'www.novacarehealth.com ', 
        image: novacare1
    },
  

]

  
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


// const renderContent = () => {
// switch (activeTab) {
// case 'tab1': return <div className="row"><PartnersListHome/></div>;
// case 'tab2': return  <div className="row"><PartnersListHome/></div>;
// case 'tab3': return <div className="row"><PartnersListHome/></div>;
// case 'tab4': return <div className="row"><PartnersListHome/></div>;
// case 'tab5': return <div className="row"><PartnersListHome/></div>;
// case 'tab6': return <div className="row"><PartnersListHome/></div>;
// case 'tab7': return <div className="row"><PartnersListHome/></div>;
// return null;
// }
// };
  return (
    <>

    <div className="container">
         <div className="row"> 
                <div className="col-lg-8 col-12">
                    <h2 className='fw-semibold' style={{color:"#000",
                                                        fontFamily: "Lora",
                                                        fontSize: "36px",
                                                        fontStyle: "normal",
                                                        fontWeight: "700",
                                                        lineHeight: "normal"}}>
                    Partner Hospitals
                    </h2>
                    <p className='light-color' style={{
                        color:"rgba(0, 0, 0, 0.70)",
                        fontFamily: "Poppins",
                        fontSize: "18px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "normal",
                    }}>
                    World-class healthcare instituatins with advanced facilities and trusted care.</p>
                </div>
                <div className="col-lg-4 col-12 d-flex justify-content-lg-end align-items-start">
                  
                              <button style={{
                                display: "flex",
                                padding: "16px 32px",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "10px",
                                borderRadius: "10px",
                                background: "#52677D",
                                color:" #FFF",
                                fontFamily: "Lora",
                                fontSize: "16px",
                                fontStyle: "normal",
                                fontWeight: 700,
                                lineHeight: "normal"

                              }}>
                                  View All &#8594;
                              </button>
                             
                          
                </div>

                </div>

                          <div className="col-lg-12 col-12 d-flex ">
                    <div className=" medical-tab-buttons mb-4">  
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
                      </div>  
                      </div>
                        <div className="col-lg-2  col-12d-flex justify-content-end">
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
                        itemClass="pe-md-4 px-1"  
                        // showDots={true}
                        infinite={true}  
                        renderDotsOutside={true} 
                        partialVisible={true}
                    
                        >
                {hospitalPartnerData.map((item) => {
                    return ( 
                                
                                <div className=" mb-4" key={item.id} >
                                    <div className="cardiology-card" style={{background: "#FFF",border:"1px solid #c9cacbff"}}>
                                        <div >
                                        <img src={item.image} alt="doctor" className="img-fluid" />
                                        </div>
                                      
                                        {/* <div className='d-flex justify-content-between pt-4'>
                                            <div>
                                                <h5 className="doc-name">{item.name}</h5>
                                                <div className="exp"
                                                    style={{fontSize:'12px', color:'#3a3a3f'}}>{item.exp}
                                                </div>
                                            </div>
                                            <div className="profile-link">
                                                <a href="#" style={{fontSize:'12px'}}
                                                    className='theme-color decoration-none weight-600'>View
                                                    Profile</a>
                                            </div>
                                        </div> */}

                                    <div style={{ position: "relative", width: "100%" }}>
                                    {/* Header Section */}
                                    <div
                                        style={{
                                        paddingLeft:"5%",
                                        display: "flex",
                                        height: "88px",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center", // ✅ center horizontally
                                        gap: "10px",
                                        alignSelf: "stretch",
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
                                    {item.name}
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
                                        {item.exp}
                                        </p>
                                    </div>
                                    </div>


                                         <div
                                        style={{
                                        position: "absolute",
                                        left: "20px", // adjust overlap distance from left
                                        top: "50%", // vertical center
                                        transform: "translateY(-50%)", // adjust to half inside header
                                        marginTop:"-15%"
                                        }}
                                    >
                                        <img
                                        src={item.image}
                                        alt="doctor"
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                            borderRadius: "50%",
                                            border: "2px solid #fff",
                                            objectFit: "cover",
                                            boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
                                        }}
                                        />
                                    </div>

        
                                        <div className="content" style={{padding:"20px 12px",marginTop:"-5%"}}>
                                            <div className='d-flex pb-2 align-items-center'>
                                                <div className='me-2'>
                                                    <img src={locationIcon} alt="icon"
                                                        style={{width:'24px'}} />
                                                </div>
        
                                                <div style={{color:"#000000",fontFamily:"Poppins"}}>{item.location}</div>
                                            </div>
                                            <div className='d-flex pb-2 align-items-center'>
                                                <div className='me-2'>
                                                    <img src={clockIcon} alt="icon"
                                                        style={{width:'24px'}} />
                                                </div>
                                                <div style={{color:'#000000',fontFamily:"Poppins"}}>Hours:
                                                    <span>{item.hours}</span></div>
                                            </div>
                                            <div className='d-flex pb-2 align-items-center'>
                                                <div className='me-2'>
                                                    <img src={webIcon} alt="icon" style={{width:'24px'}} />
                                                </div>
                                                <div style={{color:'#000000',fontFamily:"Poppins"}}>Hours: <span
                                                        className='theme-color'>{item.URL}</span></div>
                                            </div>
                                        </div>
                                      <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%",padding:"20px 12px" }}>
                                            <button
                                            style={{
                                                background: "#52677D",
                                                color: "#fff",
                                                border: "none",
                                                borderRadius: "10px",
                                                padding: "14px",
                                                fontSize: "18px",
                                                fontFamily: "Lora",
                                                fontWeight: 600,
                                                cursor: "pointer",
                                                textAlign: "center",
                                            }}
                                            >
                                            Book An Appointment
                                            </button>

                                            <button
                                            //   onClick={() => navigate("/viewdoctorprofile", { state: { id: item.id } })}
                                            style={{
                                                background: "#fff",
                                                color: "#52677D",
                                                border: "1px solid #cbd5e1",
                                                borderRadius: "10px",
                                                padding: "14px",
                                                fontSize: "18px",
                                                fontFamily: "Lora",
                                                fontWeight: 600,
                                                cursor: "pointer",
                                                textAlign: "center",
                                            }}
                                            >
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



function SpecialtyTag({ children, active = false }) {
  return (
    <div
      className={cn(
        "px-4 lg:px-6 py-2 lg:py-3 rounded-full text-sm lg:text-lg cursor-pointer transition-colors",
        active ? "bg-[rgba(82,95,225,0.78)] text-white" : "bg-[#E8E8E8] text-black opacity-60 hover:opacity-80"
      )}
    >
      {children}
    </div>
  );
}


//===================================== live session================================================

const LiveSessions = () => {
  return (
    <div
      style={{
        margin:"0%",
        position: "relative",
        width: "100%",
        height: "561px",
        backgroundImage: `url(${livesessionlogo})`,
        backgroundSize: "contain",
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
          <div className="col-md-8" style={{padding:"70px 91px"}}>
            <div className="hero-content">
              <h1
                className="hero-title"
                style={{
                  fontFamily: "Lora",
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
                className="hero-text"
                style={{
                  fontFamily: "Poppins",
                  fontSize: "18px",
                  fontWeight: 400,
                  lineHeight: "32px",
                  color:"white"
                }}
              >
                Our expert doctors will be going live soon to answer your questions
                and share valuable health insights. Stay tuned for the next session.
              </p>
              <p
                className="hero-text"
                style={{
                  fontFamily: "Poppins",
                  fontSize: "18px",
                  fontWeight: 400,
                  lineHeight: "32px",
                  color:"white"
                }}
              >
               Sessions are conducted by certified doctors
              </p>
<div
  style={{
    display: "flex",
    width: "474px",
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

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


function LiveSessionsSection() {
  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="bg-[#525FE1] rounded-lg p-4 lg:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        <div className="bg-white text-[#525FE1] px-4 py-2 rounded-lg text-base lg:text-lg">Live Sessions</div>
        <div className="text-white border border-white/70 px-4 py-2 rounded-lg text-base lg:text-lg">Online Clinic</div>
      </div>

      <div className="space-y-4 lg:space-y-6">
        <div className="relative">
          <div className="h-64 lg:h-[400px] xl:h-[500px] rounded-2xl overflow-hidden relative group cursor-pointer">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/53a9a00f30c9ef8d766a4548fa7080ef24d62731?width=2312"
              alt="Live Session"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 flex items-center justify-center group-hover:bg-black/20 transition-colors">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white rounded-full flex items-center justify-center">
                <PlayIcon />
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 space-y-3 lg:space-y-4">
              <div className="space-y-2">
                <div className="w-full h-1 bg-white/50 rounded-full">
                  <div className="w-2/5 h-1 bg-white rounded-full"></div>
                </div>
                <div className="text-white text-sm lg:text-base">00:28:03 / 00:48:00</div>
              </div>

              <div className="flex items-center gap-4 lg:gap-6">
                <div className="flex items-center gap-4 lg:gap-6">
                  <div className="flex gap-1">
                    <div className="w-1 h-4 lg:h-5 bg-white"></div>
                    <div className="w-1 h-4 lg:h-5 bg-white"></div>
                  </div>
                  <div className="w-6 h-6 bg-white/20 rounded"></div>
                </div>

                <div className="ml-auto">
                  <div className="w-6 h-6 bg-white/20 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-black text-xl lg:text-2xl font-semibold">Doctor Mike hosts the AMA Tribute to the Medical School Class of 2023</h3>
          <p className="text-black text-sm lg:text-base font-medium">By Doctor Malik</p>
        </div>

        <div className="flex justify-end">
          <button className="bg-[#F86F03] text-white px-6 py-3 rounded-lg text-base font-semibold hover:bg-[#e5630a] transition-colors">Join Now</button>
        </div>
      </div>
    </div>
  );
}