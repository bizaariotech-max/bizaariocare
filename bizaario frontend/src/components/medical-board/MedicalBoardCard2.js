import React from 'react'
import {dominicArr } from '../../Data/LocalData';
import locationIcon from "../../assets/images/icons/location-pin-alt-1-svgrepo-com 1.png"
import workIcon from "../../assets/images/icons/work.png"

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../../assets/css/medical-board-partner-hospital.css'
const MedicalBoardCard2 = () => {
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
            // showDots:true
        }
    };

return (
<>
        <Carousel
            // removeArrowOnDeviceType={["tablet", "mobile"]}
            showDots={false}
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
                    <div className="d-flex pt-3 common-btns-group1" style={{gap:'20px'}}>
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
            </Carousel>
</>
)
}

export default MedicalBoardCard2