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
                        // showDots={true}
                        infinite={true}  
                        renderDotsOutside={true} 
                        partialVisible={true}
                    
                        >
                {hospitalPartnerData.map((item) => {
                    return ( 
                                
                                <div className=" mb-4" key={item.id} >
                                    <div className="cardiology-card" style={{background: "#FFF",border:"1px solid #c9cacbff"}}>
                                        <div >
                                        <img src={item.image} alt="doctor" className="img-fluid" />
                                        </div>
                                      
                                        {/* <div className='d-flex justify-content-between pt-4'>
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
                                        </div> */}

                                    <div style={{ position: "relative", width: "100%" }}>
                                    {/* Header Section */}
                                    <div
                                        style={{
                                        paddingLeft:"5%",
                                        display: "flex",
                                        height: "88px",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center", // ✅ center horizontally
                                        gap: "10px",
                                        alignSelf: "stretch",
                                        textAlign: "center", // ✅ ensure text stays centered
                                        }}
                                    >
                                    <h5
                                    style={{
                                        color: "#000",
                                        fontFamily: "Lora",
                                        fontSize: "20px",
                                        fontStyle: "normal",
                                        fontWeight: 700,
                                        lineHeight: "normal",
                                        margin: 0,
                                    }}
                                    >
                                    {item.name}
                                    </h5>

                                        <p
                                        style={{
                                            color: "rgba(0, 0, 0, 0.70)",
                                            fontFamily: "Poppins",
                                            fontSize: "12px",
                                            fontStyle: "normal",
                                            fontWeight: 400,
                                            lineHeight: "normal",
                                            margin: "4px 0 0",
                                        }}
                                        >
                                        {item.exp}
                                        </p>
                                    </div>
                                    </div>


                                         <div
                                        style={{
                                        position: "absolute",
                                        left: "20px", // adjust overlap distance from left
                                        top: "50%", // vertical center
                                        transform: "translateY(-50%)", // adjust to half inside header
                                        marginTop:"-15%"
                                        }}
                                    >
                                        <img
                                        src={item.image}
                                        alt="doctor"
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                            borderRadius: "50%",
                                            border: "2px solid #fff",
                                            objectFit: "cover",
                                            boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
                                        }}
                                        />
                                    </div>

        
                                        <div className="content" style={{padding:"20px 12px",marginTop:"-5%"}}>
                                            <div className='d-flex pb-2 align-items-center'>
                                                <div className='me-2'>
                                                    <img src={locationIcon} alt="icon"
                                                        style={{width:'24px'}} />
                                                </div>
        
                                                <div style={{color:"#000000",fontFamily:"Poppins"}}>{item.location}</div>
                                            </div>
                                            <div className='d-flex pb-2 align-items-center'>
                                                <div className='me-2'>
                                                    <img src={clockIcon} alt="icon"
                                                        style={{width:'24px'}} />
                                                </div>
                                                <div style={{color:'#000000',fontFamily:"Poppins"}}>Hours:
                                                    <span>{item.hours}</span></div>
                                            </div>
                                            <div className='d-flex pb-2 align-items-center'>
                                                <div className='me-2'>
                                                    <img src={webIcon} alt="icon" style={{width:'24px'}} />
                                                </div>
                                                <div style={{color:'#000000',fontFamily:"Poppins"}}>Hours: <span
                                                        className='theme-color'>{item.URL}</span></div>
                                            </div>
                                        </div>
                                      <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%",padding:"20px 12px" }}>
                                            <button
                                            style={{
                                                background: "#52677D",
                                                color: "#fff",
                                                border: "none",
                                                borderRadius: "10px",
                                                padding: "14px",
                                                fontSize: "18px",
                                                fontFamily: "Lora",
                                                fontWeight: 600,
                                                cursor: "pointer",
                                                textAlign: "center",
                                            }}
                                            >
                                            Book An Appointment
                                            </button>

                                            <button
                                            //   onClick={() => navigate("/viewdoctorprofile", { state: { id: item.id } })}
                                            style={{
                                                background: "#fff",
                                                color: "#52677D",
                                                border: "1px solid #cbd5e1",
                                                borderRadius: "10px",
                                                padding: "14px",
                                                fontSize: "18px",
                                                fontFamily: "Lora",
                                                fontWeight: 600,
                                                cursor: "pointer",
                                                textAlign: "center",
                                            }}
                                            >
                                            Send Treatment Query
                                            </button>
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