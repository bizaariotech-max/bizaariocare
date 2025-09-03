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
            showDots:true
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3, 
             partialVisibilityGutter: 20,
             showDots:true
        },
        tablet: {
            breakpoint: { max: 1024, min: 767 },
            items: 2,
            showDots:true
        },
        mobile: {
            breakpoint: { max: 767, min: 0 },
            items: 1,
            showDots:true
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
            showDots={true}
            responsive={responsive}
            // autoPlay={false}
            // autoPlaySpeed={3000}
            // transitionDuration={2000} 
            // additionalTransfrom={-20}
            // pauseOnHover={false} 
            // centerMode={false}
            
            containerClass="" 
            itemClass="pe-md-4 px-1"   
            arrows={false}  
            infinite={true}  
            renderDotsOutside={true} 
            partialVisible={true} 
        >
        {doctorArr.map((item) => {
        return ( 
  <div className="cardiology-card d-flex flex-column" key={item.id} style={{height:"650px", padding:"16px", border:"1px solid #ddd", borderRadius:"8px"}}>
  
  {/* Image */}
  <img 
    src={item.image} 
    alt="doctor" 
    className="img-fluid" 
    style={{height:"300px", width:"100%", objectFit:"cover", borderRadius:"8px"}} 
  />

  {/* Header */}
  <div className='d-flex justify-content-between pt-4'>
      <div>
          <h5 className="doc-name">{item.name}</h5>
          <div className="exp" style={{fontSize:'12px'}}>{item.exp}</div>
      </div>
     <div className="profile-link flex-shrink-0">
        <a onClick={() => navigate('/viewdoctorprofile', { state: { id: item.id } })}
       style={{fontSize:'12px'}} className='profile-link theme-color'>View Profile</a>
    </div>
  </div>

  {/* Content */}
  <div className="content mt-4 flex-grow-1">
      <div className='d-flex pb-2 align-items-center'>
          <div className='me-2'>
              <img src={locationIcon} alt="icon" style={{width:'24px'}} className='img-fluid' />
          </div>
          <div style={{color:"#000000"}}>{item.location}</div>
      </div>
      <div className='d-flex'>
          <div className='me-2 '>
              <img src={workIcon} alt="icon" style={{width:'24px',marginTop:"-4px"}} />
          </div>
          <div>
              <span style={{color:"#000000"}}>Specializes in: </span>
              <span style={{color:'#73747e'}}>{item.Specializes}</span>
          </div>
      </div>
  </div>

  {/* Buttons at the bottom - responsive */}
  <div className="d-flex flex-column flex-sm-row pt-3 common-btns-group1" style={{gap:'12px', marginTop:'auto'}}>
      <a href="/" className="btn common-btn-dark flex-1 text-center">Book an Appointment</a>
      <a href="/" className="btn common-btn-outline flex-1 text-center">Send Medical Query</a>
  </div>
</div>


         
            )
        })}
            </Carousel>
</>
)
}

export default MedicalBoardCard2