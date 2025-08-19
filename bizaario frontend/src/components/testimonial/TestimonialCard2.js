import "../../assets/css/testimonial.css";
import testmonial1 from '../../assets/images/testmonial1.png'
import quote from '../../assets/images/icons/quot.png'
// import OwlCarousel from "react-owl-carousel";
// import { Pagination } from 'react-bootstrap'; 
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { testmonialData } from "../../Data/LocalData"; 

const TestimonialCard2 = () => { 

//      const responsive = {
//   superLargeDesktop: {
//     breakpoint: { max: 4000, min: 3000 },
//     items: 1
//   },
//   desktop: {
//     breakpoint: { max: 3000, min: 1024 },
//       items: 1,

//   },
//   tablet: {
//     breakpoint: { max: 1024, min: 464 },
//     items: 1
//   },
//   mobile: {
//     breakpoint: { max: 464, min: 0 },
//     items: 1
//   }
// };
    const singleItemForAllDevice = {
        all: {
            breakpoint: { max: 3000, min: 0 }, items: 1, 
        }
    }
    
    return (
      <>        
        <Carousel
            // removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
            autoPlay={true}
            autoPlaySpeed={3000}
            transitionDuration={2000} 
            //additionalTransfrom={-50 * 3}
            //  pauseOnHover={false} 
            containerClass=" p-0" 
            itemClass="px-2 py-5"   
            arrows={false}
            responsive={singleItemForAllDevice}
            showDots={true}
            infinite={true}  
            renderDotsOutside={true} 
          partialVisible={false}
          centerMode={false}
            >
            {testmonialData.map((item) => {
                return ( 
                  <div className="inner-testmonial " key={item.id}>
                    <div className="row g-4">
                      <div className="col-xl-8 col-12   ">
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
                      <div className="col-xl-4 col-12">
                        <div className="fix-user-img">
                          <img src={testmonial1} alt="Testimonial" className="img-fluid testimonial-img" />
                        </div>
                      </div>
                    </div>
                  </div>
              )
            }
            )} 
        </Carousel> 
      </>
  );
};

export default TestimonialCard2;
