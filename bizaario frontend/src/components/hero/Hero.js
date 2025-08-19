import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { A11y, Navigation, Scrollbar, Pagination, Autoplay} from 'swiper/modules';

import "../../assets/css/hero.css";

import { sliderArray } from '../../Data/LocalData';

const Hero = () => {

return (
<>
    <section className="hero-section"> 
       <Swiper
        //         autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        // }}
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            spaceBetween={0}
            // slidesPerView={3}
            // navigation
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
      

                 {sliderArray.map((element)=> {
                     return (
                                  <SwiperSlide>
                                  <div key={element.id}> 
                                  <div className="item banner-bg "  style={element.sliderImage}>
                                  <div className="container">
                                      <div className="row">
                                          <div className="col-md-8">
                                              <img src={element.sliderImage} alt="" />
                                              <div className="hero-content">
                                                  <h1 className="hero-title">{element.bannerTitle}</h1>
                                                  <p className="hero-text">{element.dsc}</p>
                                                  <div className="hero-btns ">
                                                      <div>
                                                          <a href="/" className="btn  nav-btn-style2  text-white">See How It  Works</a>
                                                      </div>
                                                      <div>
                                                          <a href="/" className="btn  nav-btn-style">Join Our Network</a>
                                                      </div> 
                                                  </div>
                                                  <div className="rounded-buttons mt-4 ">
                                                      <div className="pill-button ">
                                                          <strong>10,000+</strong> Hospitals connected
                                                      </div>
                                                      <div className="pill-button">
                                                          <strong>10K+ </strong> doctors connected
                                                      </div> 
                                                  </div>
              
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                  </div>
                             </div>
                             </SwiperSlide>
                          )
                          }
                          )}
            </Swiper>
    </section>
</>
)
}

export default Hero