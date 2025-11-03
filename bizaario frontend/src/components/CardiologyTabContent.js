import React from 'react'
import {dominicArr } from '../Data/LocalData';
// import OwlCarousel from "react-owl-carousel";
import locationIcon from "../assets/images/icons/location-pin-alt-1-svgrepo-com 1.png"
import workIcon from "../assets/images/icons/work.png"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar'; 
import { A11y, Navigation, Scrollbar, Pagination, Autoplay, } from 'swiper/modules';

const CardiologyTabContent = () => {

    // const options = {
    //     dots: false,
    //     nav: false,
    //     autoplay: false,
    //     mouseDrag: true,
    //     smartSpeed: 2000,
    //     lazyLoad: true,
    //     loop: true, 
    //     responsive: {
    //         0: {
    //             items: 1,
    //             margin: 10,
    //             dots: true,
    //         },
    //         600: {
    //             items: 1,
    //             stagePadding: 0,
    //             margin: 15,
    //             dots: true,
    //         },
    //         1000: {
    //             items: 2,
    //             stagePadding: 0,
    //             margin: 20,
    //             dots: true,
    //         },
    //         1200: {
    //             items: 3,
    //             stagePadding: 30,
    //             margin: 30,
    //         }
    //     }
    // };

return (
<>
        {/* <OwlCarousel className="owl-theme cardiology-owl" {...options}> */}
         <Swiper
           //  autoplay={{ delay: 2500,  disableOnInteraction: false,}} 
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay,]}
            // onSwiper={(swiper) => console.log(swiper)}
            //  pagination={{}}
            breakpoints={{
                0: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                    pagination: true
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                1024: {
                    slidesPerView: 3.1,
                    spaceBetween: 20

                }
            }} 
         >
        {dominicArr.map((item) => {
        return (
            <SwiperSlide style={{overflow: "hidden"}} id='medical-board-listing'>
                <div className="cardiology-card" key={item.id}>
                    <img src={item.image} alt="doctor" className=" mx-auto" />
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
                                <img src={locationIcon} alt="icon" style={{width:'24px'}} />
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
            </SwiperSlide>
            )
        })}
            </Swiper>
    {/* </OwlCarousel> */}
</>
)
}

export default CardiologyTabContent