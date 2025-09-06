
import "../assets/css/NewsAndArticles.css"; 

import React, { useState } from "react";
import { cardsData } from "../Data/LocalData";
import { Link } from "react-router";
import { NavLink } from "react-router-dom";
import { doctorArr } from '../Data/LocalData';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../assets/css/Empowering.css'
import clock from '../assets/images/clock.png'
import calender from '../assets/images/calendar.png'
import eye from '../assets/images/eye.png'




const NewsAndArticles = () => {
  const [activeCategory, setActiveCategory] = useState("cardiology");


  const categories = [
    { key: "cardiology", label: "Cardiology" },
    { key: "orthopedics", label: "Orthopedics" },
    { key: "pediatrics", label: "Pediatrics" },
    { key: "neurology", label: "Neurology" },
    { key: "obgyn", label: "Obstetrics & Gynecology" },
    { key: "ent", label: "Otorhinolaryngology" },
    { key: "plastic", label: "Plastic & Reconstructive" }
  ];


  const filteredCards =
    activeCategory === "all" ? cardsData : cardsData.filter((card) => card.category === activeCategory);
  // console.log(filteredCards, 'filtercards');

   
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
    <section className="spacing-top">
      <div className="news-section container">
        {/* Header */}
        <div className="row">
                <div className="col-lg-8 col-12">
                    <h2 className='fw-semibold' style={{color:"#000",
                                                        fontFamily: "Lora",
                                                        fontSize: "36px",
                                                        fontStyle: "normal",
                                                        fontWeight: "700",
                                                        lineHeight: "normal"}}>
                    News And Articles
                    </h2>
                    <p className='light-color' style={{
                        color:"rgba(0, 0, 0, 0.70)",
                        fontFamily: "Poppins",
                        fontSize: "18px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "normal",
                    }}>
                    Learn from leading doctors and specialists through focused, digestible video content.</p>
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

        {/* Tabs */}
        <div className="d-flex flex-wrap gap-md-4 gap-3 mb-4">
          {categories.map((cat) => (
            <button key={cat.key}
              className={`cutom-tab-style  ${activeCategory === cat.key ? "activeTab " : "tab-btn-style gray-btn-style"}`}
              onClick={() => setActiveCategory(cat.key)}
            >
            {cat.label}
          </button>
          ))}
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
                    //  showDots={true}
                     infinite={true}  
                     renderDotsOutside={true} 
                     partialVisible={true}
                 
                     >
                 {filteredCards.map((element) => {
                 return (
     
                 <div className="" key={element.id} style={{
                     borderRadius:"20px",
                     background:"rgba(189, 196, 212, 0.30)",
                     padding:"20px"
                     
                     }}>
                     <img src={element.img} alt="doctor" className=" mx-auto img-fluid" style={{width: '100%',height:"257px",borderRadius:"10px"}} />
                     <div style={{display:"flex",gap:"50px",marginTop:"10px"}}>
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

                            <div style={{display:'flex',gap:"5px"}}>
                               <img src={eye} style={{width: "14px",height: "14px",display:"inline-block"}} alt=''></img> 
                                 <p  style={{
                                     color: "rgba(0, 0, 0, 0.70)",
                                     fontFamily: "Poppins",
                                     fontSize: "12px",
                                     fontStyle: "normal",
                                     fontWeight: 400,
                                     lineHeight: "normal",
                                 }}>{element.views}</p> 
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
                         {element.desc}
                         </p>
     
                    
     
                     </div>
     
                 </div>
                 )
                 })}
     </Carousel>
   
     

      </div>
    </section>
  );
};

export default NewsAndArticles;
