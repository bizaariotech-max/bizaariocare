// import React from 'react'
import { doctorArr } from '../../Data/LocalData';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../../assets/css/Empowering.css'
import clock from '../../assets/images/clock.png'
import calender from '../../assets/images/calendar.png'
const EmpoweringContent2 = () => {
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
            {doctorArr.map((element) => {
            return (

            <div className="" key={element.id} style={{
                borderRadius:"20px",
                background:"rgba(189, 196, 212, 0.30)",
                padding:"20px"
                
                }}>
                <img src={element.image} alt="doctor" className=" mx-auto img-fluid" style={{width: '100%',height:"257px"}} />
                <div style={{display:"flex",gap:"24px",marginTop:"10px"}}>
                    <div style={{display:'flex',gap:"5px"}}>
                          <img src={clock} style={{width: "14px",height: "14px",display:"inline-block"}} alt=''></img> 
                           <p
                            style={{
                                color: "rgba(0, 0, 0, 0.70)",
                                fontFamily: "Poppins",
                                fontSize: "12px",
                                fontStyle: "normal",
                                fontWeight: 400,
                                lineHeight: "normal",
                            }}
                            >
                                {element.time}</p> 
                    </div>
                 
                   <div style={{display:'flex',gap:"5px"}}>
                          <img src={calender} style={{width: "14px",height: "14px",display:"inline-block"}} alt=''></img> 
                            <p  style={{
                                color: "rgba(0, 0, 0, 0.70)",
                                fontFamily: "Poppins",
                                fontSize: "12px",
                                fontStyle: "normal",
                                fontWeight: 400,
                                lineHeight: "normal",
                            }}>{element.date}</p> 
                    </div>
                </div>
                <div className="content mt-4">
                 <p
                    className="text-gray-700 text-start mb-1"
                    style={{
                        color: "#000",
                        fontFamily: "Lora",
                        fontSize: "20px",
                        fontStyle: "normal",
                        fontWeight: 700,
                        lineHeight: "normal",
                    }}
                    >
                    {element.title}
                    </p>

                   <p
                    style={{
                        color: "rgba(0, 0, 0, 0.70)",
                        fontFamily: "Poppins",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "normal",
                        marginBottom: "4px", // to replace mb-1 from Tailwind
                        textAlign: "start",
                    }}
                    >
                    {element.dsc}
                    </p>

                   <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    {/* Profile Image */}
                    <img
                        src={element.image}
                        alt={element.name}
                        style={{
                        borderRadius: "270.5px",
                        border: "2px solid #FFF",
                        width: "38px",
                        height: "38px",
                        flexShrink: 0,
                        objectFit: "cover", // ensures image fits nicely
                        }}
                    />

                    {/* Text Content */}
                    <div>
                        <p
                        style={{
                            color: "#000",
                            fontFamily: "Lora",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 700,
                            lineHeight: "normal",
                            margin: 0,
                        }}
                        >
                        <strong>{element.name}</strong>
                        </p>

                        <p
                        style={{
                            color: "rgba(0, 0, 0, 0.70)",
                            fontFamily: "Poppins",
                            fontSize: "12px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "normal",
                            margin: 0,
                        }}
                        >
                        <strong>{element.Specializes}</strong>
                        </p>
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

export default EmpoweringContent2