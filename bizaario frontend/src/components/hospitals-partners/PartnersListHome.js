import locationIcon from "../../assets/images/icons/location2.svg"
import clockIcon from "../../assets/images/icons/clock.svg"
import webIcon from "../../assets/images/icons/web.svg"
import { hospitalPartnerData } from "../../Data/LocalData"


import Carousel from 'react-multi-carousel';

const PartnersListHome = () => {
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
           
        }
    };
  return (
    <>
         <div className="doctor-slider mt-4 position-relative">
                       <Carousel
                        //   removeArrowOnDeviceType={["tablet", "mobile"]}
                          arrows={false} 
                        responsive={responsive}
                        // autoPlay={false}
                        // autoPlaySpeed={3000}
                        // transitionDuration={2000} 
                        //additionalTransfrom={-20}
                        //  pauseOnHover={false} 
                        //  centerMode={false}
                        containerClass=" carousel-container" 
                        itemClass="pe-md-4 px-1"  
                        showDots={true}
                        infinite={true}  
                        renderDotsOutside={true} 
                        partialVisible={true}
                    
                        >
                {hospitalPartnerData.map((item) => {
                    return ( 
                                
                                <div className=" mb-4" key={item.id}>
                                    <div className="cardiology-card" >
                                        <img src={item.image} alt="doctor" className="img-fluid" />
                                        <div className='d-flex justify-content-between pt-4'>
                                            <div>
                                                <h5 className="doc-name">{item.name}</h5>
                                                <div className="exp"
                                                    style={{fontSize:'12px', color:'#3a3a3f'}}>{item.exp}
                                                </div>
                                            </div>
                                            <div className="profile-link">
                                                <a href="#" style={{fontSize:'12px'}}
                                                    className='theme-color decoration-none weight-600'>View
                                                    Profile</a>
                                            </div>
                                        </div>
        
                                        <div className="content mt-4">
                                            <div className='d-flex pb-2 align-items-center'>
                                                <div className='me-2'>
                                                    <img src={locationIcon} alt="icon"
                                                        style={{width:'24px'}} />
                                                </div>
        
                                                <div style={{color:"#000000"}}>{item.location}</div>
                                            </div>
                                            <div className='d-flex pb-2 align-items-center'>
                                                <div className='me-2'>
                                                    <img src={clockIcon} alt="icon"
                                                        style={{width:'24px'}} />
                                                </div>
                                                <div style={{color:'#000000'}}>Hours:
                                                    <span>{item.hours}</span></div>
                                            </div>
                                            <div className='d-flex pb-2 align-items-center'>
                                                <div className='me-2'>
                                                    <img src={webIcon} alt="icon" style={{width:'24px'}} />
                                                </div>
                                                <div style={{color:'#000000'}}>Hours: <span
                                                        className='theme-color'>{item.URL}</span></div>
                                            </div>
                                        </div>
                                        <div className="d-flex pt-3 " style={{gap:'20px'}}>
                                            <div>
                                                <a href="/" className="btn common-btn-dark  ">Book an
                                                    Appointments</a>
                                            </div>
                                            <div>
                                                <a href="/" className="btn  common-btn-outline ">Send
                                                    Treatment Query</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                )
                        })} 
                        </Carousel>
                        </div>
    </>
  )
}

export default PartnersListHome