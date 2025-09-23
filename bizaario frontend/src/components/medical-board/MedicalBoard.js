import React, { useState } from 'react';
import MedicalBoardCard2 from './MedicalBoardCard2';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import responsive from '../../utils/responsive_carousel'
// import CardiologyTabContent from './MedicalBoardCard1';
// import MedicalBoardCard2 from './MedicalBoardCard2';


// import MedicalBoardCard3 from './MedicalBoardCard3';


const MedicalBoard = () => {
const [activeTab, setActiveTab] = useState('tab1');

const renderContent = () => {
switch (activeTab) {
  case 'tab1': return <div>


    <MedicalBoardCard2 />

  </div>;
case 'tab2': return  <div> <MedicalBoardCard2 />  </div>;
case 'tab3': return <div>  <MedicalBoardCard2 /> </div>;
case 'tab4': return <div>  <MedicalBoardCard2 /> </div>;
case 'tab5': return <div>  <MedicalBoardCard2 /> </div>;
case 'tab6': return <div>  <MedicalBoardCard2 /> </div>;
case 'tab7': return <div>  <MedicalBoardCard2 /> </div>;
return null;
}
};


return (
<>
  <div className=''>
    <div className="container ">
      
      <div className="row"> 
       
                <div className="col-lg-8 col-12">
                    <h2 className='fw-semibold'>
                    Trusted Medical Experts
                    </h2>
                    <p className='light-color' >
                    Bringing global experience,compassionate care, and proven results.</p>
                </div>
                <div className="col-lg-4 col-12 d-flex justify-content-lg-end align-items-start p-0">
                  
                              <button className='view-all'>
                                  View All &#8594;
                              </button>
                             
                          
             
                </div>
                </div>

  <div className="row">
         <div className="medical-tab-buttons mb-4 w-full px-0">  
  <Carousel
    arrows={false}
    responsive={responsive}
    containerClass="carousel-container w-full"
    itemClass="px-2"
    infinite
    partialVisible
  >
    <button
      className={`cutom-tab-style ${activeTab === 'tab1' ? 'activeTab' : 'gray-btn-style'}`}
      onClick={() => setActiveTab('tab1')}
    >
      Cardiology
    </button>
    <button
      className={`cutom-tab-style ${activeTab === 'tab2' ? 'activeTab' : 'gray-btn-style'}`}
      onClick={() => setActiveTab('tab2')}
    >
      Orthopedics
    </button>
    <button
      className={`cutom-tab-style ${activeTab === 'tab3' ? 'activeTab' : 'gray-btn-style'}`}
      onClick={() => setActiveTab('tab3')}
    >
      Pediatrics
    </button>
    <button
      className={`cutom-tab-style ${activeTab === 'tab4' ? 'activeTab' : 'gray-btn-style'}`}
      onClick={() => setActiveTab('tab4')}
    >
      Neurology
    </button>
    <button
      className={`cutom-tab-style ${activeTab === 'tab5' ? 'activeTab' : 'gray-btn-style'}`}
      onClick={() => setActiveTab('tab5')}
    >
      Obstetrics & Gynecology
    </button>
    <button
      className={`cutom-tab-style ${activeTab === 'tab6' ? 'activeTab' : 'gray-btn-style'}`}
      onClick={() => setActiveTab('tab6')}
    >
      Otorhinolaryngology
    </button>
    <button
      className={`cutom-tab-style ${activeTab === 'tab7' ? 'activeTab' : 'gray-btn-style'}`}
      onClick={() => setActiveTab('tab7')}
    >
      Plastic & Reconstructive Surgery
    </button>
  </Carousel>
</div>
</div>

        </div>
        <div style={{padding:0}} className='position-relative'>{renderContent()}</div>
      </div>
    

</>
);
};

export default MedicalBoard;