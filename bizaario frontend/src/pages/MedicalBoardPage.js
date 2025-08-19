import { useState } from 'react';
import CommonBanner from '../UI/CommonBanner'
import aboutBanner from '../assets/images/about/banner.png'
import MedicalBoardContent from '../components/medical-boardPage/MedicalBoardContent';
import Header from '../AppLayout/Header';
import Footer from '../AppLayout/Footer';

const MedicalBoardPage = () => {
        const hospitalData = 
            {
            banner: aboutBanner,
            title: 'Medical Board',
            desc:'Empowering hospitals, physicians, and patients with real-time communication and clinical collaboration—because better care starts with better connection.'
        }
        const [activeTab, setActiveTab] = useState('tab1');
    
    const renderContent = () => {
    switch (activeTab) {
    case 'tab1': return <div className="row"><MedicalBoardContent/></div>;
    case 'tab2': return  <div className="row"><MedicalBoardContent/></div>;
    case 'tab3': return <div className="row"><MedicalBoardContent/></div>;
    case 'tab4': return <div className="row"><MedicalBoardContent/></div>;
    case 'tab5': return <div className="row"><MedicalBoardContent/></div>;
    case 'tab6': return <div className="row"><MedicalBoardContent/></div>;
    case 'tab7': return <div className="row"><MedicalBoardContent/></div>;
    return null;
    }
    };

  return (
      <>
      <Header/>
          <section>
              <CommonBanner bannerData={hospitalData} />
          </section>
          <section className='spacing-top'>
              <div className="container ">
                  <div className="row">
                       <div className="col-lg-8 col-12">
                    <h2 className='fw-semibold '>Meet Our Doctor Team</h2>
                    <p className='light-color'>Empowering hospitals, physicians, and patients with real-time communication and clinical collaboration—because better care starts with better connection.</p>
                </div>
                  </div>
                  <div className="row"> 
                      <div className="col-12">
                    <div className=" medical-tab-buttons mb-4">  
                        <button className={`cutom-tab-style ${activeTab==='tab1' ? 'activeTab' : 'gray-btn-style' }`} onClick={()=>
                        setActiveTab('tab1')}>
                        Cardiology
                    </button> 
                    <button className={`cutom-tab-style ${activeTab==='tab2' ? ' activeTab' : 'gray-btn-style' }`} onClick={()=>
                        setActiveTab('tab2')}
                        >
                        Orthopedics
                    </button> 
                    <button className={`cutom-tab-style ${activeTab==='tab3' ? 'activeTab' : 'gray-btn-style' }`} onClick={()=>
                        setActiveTab('tab3')}
                        >
                        Pediatrics
                    </button> 
                    <button className={`cutom-tab-style ${activeTab==='tab4' ? 'activeTab' : 'gray-btn-style' }`} onClick={()=>
                        setActiveTab('tab4')}
                        >
                        Neurology
                        </button>
                        <button className={` cutom-tab-style ${activeTab==='tab5' ? 'activeTab' : 'gray-btn-style' }`} onClick={()=>
                        setActiveTab('tab5')}
                        >
                        Obstetrics & Gynecology
                    </button>
                    <button className={` cutom-tab-style ${activeTab==='tab7' ? 'activeTab' : 'gray-btn-style' }`} onClick={()=>
                        setActiveTab('tab7')}
                        >
                        Plastic & Reconstructive Surgery
                    </button> 
                    <button className={` cutom-tab-style ${activeTab==='tab6' ? 'activeTab' : 'gray-btn-style' }`} onClick={()=>
                        setActiveTab('tab6')}
                        >
                        Otorhinolaryngology
                    </button> 
                    </div>  
                    </div>
                </div>
                <div className=''> 
                  {renderContent()}
                </div>
            </div>
          </section>
          <Footer/>
      </>
  )
}

export default MedicalBoardPage
