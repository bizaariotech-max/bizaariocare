import React, { useState } from 'react'
import '../assets/css/medical-board-partner-hospital.css'
import MedicalBoard from './medical-board/MedicalBoard';

const MedicalBoardPartnerHospitals = () => {
    const [activeTab, setActiveTab] = useState('tab1');

     const renderContent = () => {
    switch (activeTab) {
        case 'tab1':  return <div className='content-spacing'><MedicalBoard/></div>
        case 'tab2': return <div className='content-spacing'><MedicalBoard/></div>
        return null;
    }
  };
  return (
      <>
          <section className='spacing-top medical-board-partner-hospitals'>
              <div className="container">
                    <div className="row">
                  
                      {/* <div className="col-lg-12 d-flex  align-items-center"> 
                          <div className="button-container tab-group-large">
                              <button className={`btn btn-custom   ${activeTab==='tab1' ? 'active-custom-tab' : '' }`}
                                  onClick={()=> setActiveTab('tab1')}>
                            Medical Board
                              </button>
                              <button className={`btn btn-custom  ${activeTab==='tab2' ? 'active-custom-tab' : '' }`}
                                  onClick={()=> setActiveTab('tab2')}>
                                 Partners Hospitals
                              </button>
                          </div>
                      </div> */}
                  </div> 
                   {/* <div >{renderContent()}</div> */}
                   <MedicalBoard/>
              </div>
        </section>
      </>
  )
}

export default MedicalBoardPartnerHospitals