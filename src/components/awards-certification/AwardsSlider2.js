
import {  FaCalendarAlt, FaLink } from "react-icons/fa";
import { A11y, Navigation, Scrollbar, Pagination, Autoplay} from 'swiper/modules';
// import { awardsCertfication } from '../../Data/LocalData';
import award from  '../../assets/images/award.png'
import crt2 from '../../assets/images/icons/crt2.png'
import { Card } from 'react-bootstrap';
import '../../assets/css/awards-certification.css'


import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { awardSliderData } from "../../Data/LocalData";

const AwardsSlider2 = () => {
    const singleItemForAllDevice = {
        all: {
            breakpoint: { max: 3000, min: 0 }, items: 1, 
        }
    }
  return (
      <>
         <Carousel
            // removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
            autoPlay={false}
            // autoPlaySpeed={3000}
            // transitionDuration={2000} 
            //additionalTransfrom={-50 * 3}
            //  pauseOnHover={false} 
            containerClass="container p-0 " 
            itemClass="px-2"   
            arrows={true}
            responsive={singleItemForAllDevice}
            showDots={false}
            infinite={true}  
            renderDotsOutside={false} 
            partialVisible={false}
            centerMode={false}
          >
              {awardSliderData.map((item) => {
                  return (
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
            </div>)
              })}
            
        </Carousel>
      </>
  )
}

export default AwardsSlider2