import "../assets/css/testimonial.css";
import testmonial1 from '../assets/images/testmonial1.png'
import quote from '../assets/images/icons/quot.png'
// import OwlCarousel from "react-owl-carousel";
// import { Pagination } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar'; 
import { A11y, Navigation, Scrollbar, Pagination, Autoplay} from 'swiper/modules';
import { testmonialData } from "../Data/LocalData";


const TestimonialCard = () => {
 
    const options = {
        dots: true,
        smartSpeed: 1000,
        loop: true,
        items: 1,
        margin: 10,
    };

    return (
      <>
          <section>
              <div className="container ">
                  <div className="row">
                      <div className=" col-12 mb-5">
                          <h2 className='fw-semibold '>Patients Testimonials</h2>
                          <p className='light-color mb-0'>Learn from leading doctors and specialists through focused,
                              digestible video content.</p>
                      </div>

     <Swiper
           //         autoplay={{
           //   delay: 2500,
           //   disableOnInteraction: false,
           // }}
               // install Swiper modules
               modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
               spaceBetween={0}
               slidesPerView={1}
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
                              
                          {testmonialData.map((item) => {
                          return ( <SwiperSlide style={{overflow: "hidden"}}>
                              <div className="inner-testmonial " key={item.id}>
                                  <div className="row"> 
                                  <div className="col-lg-8 col-12 pb-3   ">
                                      <div className="test-card">
                                          <p className="testimonial-text">
                                              {item.review}
                                          </p>
                                          <div className="testmonial-inner position-relative d-flex">
                                              <div>
                                                  <h4 className="fw-bold mb-0"> {item.testmonialUser}</h4>
                                                  <small className="text-muted">{item.location }</small>
                                              </div>
                                              <div className="quote">
                                                  <img src={quote} alt="" className="img-fluid" />
                                              </div>
                                          </div>

                                      </div>
                                  </div>
                                  <div className="col-lg-4 col-12">
                                     
                                      {/* <div className="fix-user-img">

                                        
                                      </div>  */}
   <img src={testmonial1} alt="Testimonial "
                                              className="img-fluid testimonial-img" />
                                  </div>

                              </div>
                              </div>

                       
                              </SwiperSlide>
                          )
                          })}
                                
                      </Swiper>

                  </div>
              </div>
          </section>
      </>
  );
};

export default TestimonialCard;
