// import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {  FaCalendarAlt, FaLink } from "react-icons/fa";
// import { Pagination } from 'react-bootstrap';
import { A11y, Navigation, Scrollbar, Pagination, Autoplay} from 'swiper/modules';
// import { awardsCertfication } from '../../Data/LocalData';
import award from  '../../assets/images/award.png'
import crt2 from '../../assets/images/icons/crt2.png'
import { Card } from 'react-bootstrap';
import '../../assets/css/awards-certification.css'
import { awardSliderData } from '../../Data/LocalData';

const AwardsSlider = () => {
  return (
      <>
    <Swiper
        //         autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        // }}
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, Autoplay, A11y]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ clickable: false }}
            // scrollbar={{ draggable: false }}
            onSwiper={(swiper) => console.log(swiper)}
            //   onSlideChange={() =>{ }
        //        breakpoints={{
        //   769: {
        //     slidesPerView: 2,
        //     slidesPerGroup: 3,
        //   },
        // }}
            > 
        
                 {awardSliderData.map((item) => {
                     return (
                          <SwiperSlide>
                      <div className="award-certfication" key={item.id}>
                <Card className="award-card ">
                    <div className="row "> 
                        <div className="col-md-4 mb-md-0 mb-3">
                            <img src={award} alt="Award Ceremony"
                                className="img-fluid h-100 object-fit-cover" />
                        </div>
                        <div className="col-md-8  d-flex align-items-center">
                            <div className="right-content p-3 p-lg-4 ">
                                <div className='d-flex mb-3 align-items-center'>
                                    <img src={crt2} alt="" style={{maxWidth:'25px', height:'auto'}}
                                        className='me-2' />
                                    <h2 className="fw-bold mb-1 ">
                                        Best Cardiologist 2022
                                    </h2>
                                </div> 
                                <h4 className="text-muted mb-3 fw-semibold">Indian Medical Association</h4>
                                <p className="mb-3">
                                    I has received multiple awards for excellence in cardiology and
                                    patient care, including recognition for clinical innovation and
                                    compassionate service. His work continues to be honored by leading
                                    medical associations.
                                </p> 
                                <div className="crt-view-link d-flex align-items-center mb-2 text-muted">
                                    <FaCalendarAlt className="me-2" style={{color:'#7f7f83'}} />
                                    15/05/2022
                                </div>
                                <FaLink className="me-2" size={20} style={{color:'#7f7f83'}} />
                                <a href="#" className="  crt-view-link " style={{color:"#525FE1"}}>
                                    View Certificate
                                </a>
                            </div>
                        </div>
                    </div>
                </Card>
                      </div>
                      </SwiperSlide>
                  )
              })}    
          </Swiper>
      </>
  )
}

export default AwardsSlider