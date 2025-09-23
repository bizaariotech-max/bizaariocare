import React from 'react'
import {dominicArr } from '../../Data/LocalData';
import locationIcon from "../../assets/images/icons/location-pin-alt-1-svgrepo-com 1.png"
import workIcon from "../../assets/images/icons/work.png"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import '../../assets/css/medical-board-partner-hospital.css'
const MedicalBoardCard3 = () => {
     const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3.1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2500,
    arrows: false,
    // centerMode: true,
         //  centerPadding: "70px",  
    leftPadding:'40px',
    responsive: [
      {
        breakpoint: 1024, // tablet
        settings: {
         slidesToShow: 3.3,
        //   centerPadding: "20px",
        }
      },
      {
        breakpoint: 768, // mobile
        settings: {
          slidesToShow: 1,
        //   centerPadding: "20px",
        }
      }
    ]
  };

return (
<>
        <Slider {...settings}>
        {dominicArr.map((item) => {
        return ( 
                <div className="cardiology-card" key={item.id}>
                    <img src={item.image} alt="doctor" className="img-fluid" />
                    <div className='d-flex justify-content-between pt-4'>
                        <div>
                            <h5 className="doc-name">{item.name}</h5>
                            <div className="exp" style={{fontSize:'12px'}}>{item.exp}</div>
                        </div>
                        <div className="profile-link">
                            <a href="#" style={{fontSize:'12px'}} className='profile-link theme-color'>View Profile</a>
                        </div>
                    </div>

                    <div className="content mt-4">
                        <div className='d-flex pb-2 align-items-center'>
                            <div className='me-2'>
                                <img src={locationIcon} alt="icon" style={{width:'24px'}} className='img-fluid' />
                            </div>

                            <div style={{color:"#000000", fontWeight:''}}>{item.location}</div>
                        </div>
                        <div className='d-flex'>
                            <div className='me-2'>
                                <img src={workIcon} alt="icon" style={{width:'24px'}} />
                            </div>

                            <div><span style={{color:"#000000"}}>Specializes in: </span><span
                                    style={{color:'#73747e'}}>{item.Specializes}</span></div>
                        </div>
                    </div>
                    <div className="d-flex pt-3 " style={{gap:'20px'}}>
                        <div>
                            <a href="/" className="btn common-btn-dark  ">Book an Appointments</a>
                        </div>
                        <div>
                            <a href="/" className="btn  common-btn-outline ">Send Medical Query</a>
                        </div>
                    </div>
                </div>
         
            )
        })}
            </Slider>
</>
)
}

export default MedicalBoardCard3