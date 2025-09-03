import HospitalsPartnersList from '../components/hospitals-partners/HospitalsPartnersList'
import location1 from '../assets/images/icons/location-light.svg'
import { useState } from 'react';
import PartnersListHome from './hospitals-partners/PartnersListHome';
import '../assets/css/Empowering.css'

// import Header from '../AppLayout/Header'
// import Footer from '../AppLayout/Footer'

const HospitalPartenerHome = () => {
                const [activeTab, setActiveTab] = useState('tab1');

const renderContent = () => {
switch (activeTab) {
case 'tab1': return <div className="row"><PartnersListHome/></div>;
case 'tab2': return  <div className="row"><PartnersListHome/></div>;
case 'tab3': return <div className="row"><PartnersListHome/></div>;
case 'tab4': return <div className="row"><PartnersListHome/></div>;
case 'tab5': return <div className="row"><PartnersListHome/></div>;
case 'tab6': return <div className="row"><PartnersListHome/></div>;
case 'tab7': return <div className="row"><PartnersListHome/></div>;
return null;
}
};
  return (
    <>

<section className='spacing-top empoering-section partner-list-home'>

    <div className="container">
         <div className="row"> 
                          <div className="col-lg-10 col-12 d-flex ">
                    <div className=" medical-tab-buttons mb-4">  
                        <button className={`cutom-tab-style ${activeTab==='tab1' ? 'activeTab' : 'gray-btn-style' }`} onClick={()=>
                        setActiveTab('tab1')}>
                        Delhi NCR
                    </button> 
                    <button className={`cutom-tab-style ${activeTab==='tab2' ? ' activeTab' : 'gray-btn-style' }`} onClick={()=>
                        setActiveTab('tab2')}
                        >
                       Mumbai
                    </button> 
                    <button className={`cutom-tab-style ${activeTab==='tab3' ? 'activeTab' : 'gray-btn-style' }`} onClick={()=>
                        setActiveTab('tab3')}
                        >
                        Bengaluru
                    </button> 
                    <button className={`cutom-tab-style ${activeTab==='tab4' ? 'activeTab' : 'gray-btn-style' }`} onClick={()=>
                        setActiveTab('tab4')}
                        >
                        Noida   
                        </button>
                        <button className={` cutom-tab-style ${activeTab==='tab5' ? 'activeTab' : 'gray-btn-style' }`} onClick={()=>
                        setActiveTab('tab5')}
                        >
                       Delhi NCR
                    </button>
                    <button className={` cutom-tab-style ${activeTab==='tab7' ? 'activeTab' : 'gray-btn-style' }`} onClick={()=>
                        setActiveTab('tab7')}
                        >
                        Mumbai
                    </button> 
                    <button className={` cutom-tab-style ${activeTab==='tab6' ? 'activeTab' : 'gray-btn-style' }`} onClick={()=>
                        setActiveTab('tab6')}
                        >
                       Bengaluru
                    </button> 
                      </div>  
                      </div>
                        <div className="col-lg-2  col-12d-flex justify-content-end">
                          <div className="mb-4">
                            <div className="input-group" style={{maxWidth:'216px'}}>
                              <span className="input-group-text bg-white border-end-0"><img src={location1} alt="" /></span>
                              <select className="form-select border-start-0" 
                                >
                                <option value="">Select City</option>
                                <option value="">Bengaluru</option>
                                <option value="">Mumbai</option>
                                <option value="">Delhi NCR</option> 
                              </select>
                            </div>
                    
                          </div>
                        </div> 
                </div>
                <div > 
                  <div style={{padding:0}}>{renderContent()}</div>
                </div> 

    </div>
</section>
    </>
  )
}

export default HospitalPartenerHome