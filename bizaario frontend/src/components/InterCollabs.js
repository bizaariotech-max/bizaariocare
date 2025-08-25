
import React, { useState } from 'react';

import InternationalTab1 from './International-collbs/InternationalTab1';
// import '../assets/css/home.css'
const InterCollabs = () => {
    const [activeTab, setActiveTab] = useState('tab1');
    const renderContent = () => {
    switch (activeTab) {
        case 'tab1':  return <InternationalTab1/> 
        case 'tab2': return <InternationalTab1/> 
        return null;
    }
  };
  return (
      <>
          <section className='international-collaborations spacing-top' >
              <div className="container ">
                  <div className="title">
                      <h2 className='fw-semibold'>International Collaborations</h2>
                      <p className='light-color mb-0'>Learn from leading doctors and specialists through focused, digestible video content.</p>
                  </div>

                  <div className="my-4 medical-tab-buttons" style={{width:"200px"}}> 
                    <button className={`flex-1 py-2 cutom-tab-style2 ${activeTab==='tab1' ? 'activeTab' : 'lightBg' }`}
                        onClick={()=> setActiveTab('tab1')}>
                        India
                    </button>
                    <button className={`flex-1 py-2 cutom-tab-style2 ${activeTab==='tab2' ? ' activeTab' : 'lightBg' }`}
                        onClick={()=> setActiveTab('tab2')}
                        >
                        Ethiopia
                    </button>
                  </div>
                <div >{renderContent()}</div>
            </div>
        </section>
      </>
  )
}

export default InterCollabs