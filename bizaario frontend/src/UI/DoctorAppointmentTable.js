import React, { useState } from "react";

import location1 from '../assets/images/icons/location-1.svg'
// import lang1 from '../assets/images/icons/medical-caduceus-1.svg'
import '../assets/css/live-session-and-online-clinic.css'
import DocAppointTableContent from "./DocAppointTableContent";
export default function DoctorAppointmentTable() {

const [selectedCity, setSelectedCity] = useState('');

const [activeTab, setActiveTab] = useState('tab1');

  const renderContent = () => {
    switch (activeTab) {
      case 'tab1': return <div>
        <DocAppointTableContent />
      </div>;
      case 'tab2': return <div>
        <DocAppointTableContent />
      </div>;
      case 'tab3': return <div>
        <DocAppointTableContent />
      </div>;
      case 'tab4': return <div>
        <DocAppointTableContent />
      </div>;
      case 'tab5': return <div>
        <DocAppointTableContent />
      </div>;
      case 'tab6': return <div>
        <DocAppointTableContent />
      </div>;
      case 'tab7': return <div>
        <DocAppointTableContent />
      </div>;
        return null;
    }
  };

// const specialties = ['Cardiology', 'Dermatology', 'Neurology'];
const cities = ['Noida', 'Delhi', 'Mumbai'];

return (
<div className="container">
  {/* Tabs */}
  <div className="row">
    <div className="col-lg-10 col-12 d-flex ">
      <div className="appoint-doc-tabs">
        <button className={`cutom-tab-style mb-3 ${activeTab==='tab1' ? 'activeTab' : 'gray-btn-style' }`} onClick={()=>
          setActiveTab('tab1')}>
          Cardiology
        </button>
        <button className={`cutom-tab-style mb-3 ${activeTab==='tab2' ? ' activeTab' : 'gray-btn-style' }`}
          onClick={()=>
          setActiveTab('tab2')}
          >
          Orthopedics
        </button>
        <button className={`cutom-tab-style mb-3 ${activeTab==='tab3' ? 'activeTab' : 'gray-btn-style' }`} onClick={()=>
          setActiveTab('tab3')}
          >
          Pediatrics
        </button>
        <button className={`cutom-tab-style mb-3 ${activeTab==='tab4' ? 'activeTab' : 'gray-btn-style' }`} onClick={()=>
          setActiveTab('tab4')}
          >
          Neurology
        </button>
        <button className={` cutom-tab-style mb-3 ${activeTab==='tab5' ? 'activeTab' : 'gray-btn-style' }`}
          onClick={()=>
          setActiveTab('tab5')}
          >
          Obstetrics & Gynecology
        </button>
        <button className={` cutom-tab-style mb-3 ${activeTab==='tab7' ? 'activeTab' : 'gray-btn-style' }`}
          onClick={()=>
          setActiveTab('tab7')}
          >
          Plastic & Reconstructive Surgery
        </button>
        <button className={` cutom-tab-style mb-3 ${activeTab==='tab6' ? 'activeTab' : 'gray-btn-style' }`}
          onClick={()=>
          setActiveTab('tab6')}
          >
          Otorhinolaryngology
        </button>
      </div>
    </div>
    <div className="col-lg-2  col-12d-flex justify-content-end">
      <div className="mb-4">
        <div className="input-group" style={{maxWidth:'216px'}}>
          <span className="input-group-text bg-white border-end-0"><img src={location1} alt="" /></span>
          <select className="form-select border-start-0" value={selectedCity} onChange={(e)=>
            setSelectedCity(e.target.value)}
            >
            <option value="">Select City</option>
            {cities.map(city => (
            <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

      </div>
    </div>
  </div>
  {/* Table */}
  <div style={{ padding: 0 }}>{renderContent()}</div>

</div>
);
}