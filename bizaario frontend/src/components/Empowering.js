import React, { useState } from 'react'
import EmpoweringContent1 from './empowering-doctors/EmpoweringContent1';
import EmpoweringContent2 from './empowering-doctors/EmpoweringContent2';
// import '../assets/css/empowring.css'


const Empowering = () => {
    //  const [activeTab, setActiveTab] = useState('tab1'); 
    //     const renderContent = () => {
    //     switch (activeTab) {
    //         case 'tab1': return <div>
    //             {/* <EmpoweringContent1 /> */}
    //             <EmpoweringContent2 />
    //         </div>
                    
    //         case 'tab2':return <div><EmpoweringContent2 /></div>
    //         return null;
    //     }
    //   };



return (
<>
    <section className='empoering-section spacing-top'>
        
        <div className="container">
            <div className="row">
                <div className="col-lg-8 col-12">
                    <h2 className='fw-semibold' style={{color:"#000",
                                                        fontFamily: "Lora",
                                                        fontSize: "36px",
                                                        fontStyle: "normal",
                                                        fontWeight: "700",
                                                        lineHeight: "normal"}}>
                    Empowering Doctors with Evidence-Based Knowledge
                    </h2>
                    <p className='light-color' style={{
                        color:"rgba(0, 0, 0, 0.70)",
                        fontFamily: "Poppins",
                        fontSize: "18px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "normal",
                    }}>
                    Learn from leading doctors and specialists through focused, digestible video content.</p>
                </div>
                <div className="col-lg-4 col-12 d-flex justify-content-lg-end align-items-start">
                  
                              <button style={{
                                display: "flex",
                                padding: "16px 32px",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "10px",
                                borderRadius: "10px",
                                background: "#52677D",
                                color:" #FFF",
                                fontFamily: "Lora",
                                fontSize: "16px",
                                fontStyle: "normal",
                                fontWeight: 700,
                                lineHeight: "normal"

                              }}>
                                  View All &#8594;
                              </button>
                             
                          
                </div>

                </div>

                {/* <div className="row">
                      <div >{renderContent()}</div> 
                </div> */}
                
            <div className="row">
               <EmpoweringContent2 />
            </div>
        </div>
    </section>
</>
)
}

export default Empowering