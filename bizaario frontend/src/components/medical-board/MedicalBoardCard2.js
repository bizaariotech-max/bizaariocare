import React, { useEffect,useState } from 'react'
import {dominicArr } from '../../Data/LocalData';
import locationIcon from "../../assets/images/icons/location-pin-alt-1-svgrepo-com 1.png"
import workIcon from "../../assets/images/icons/work.png"

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../../assets/css/medical-board-partner-hospital.css'
import api from '../../api'
import { useNavigate } from 'react-router-dom';
const MedicalBoardCard2 = () => {
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


return (
<>
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
    border: "1px solid #ddd",
    borderRadius: "10px",
    background: "#fff",
    // padding: "16px",
    maxWidth: "380px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
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
</>
)
}

export default MedicalBoardCard2