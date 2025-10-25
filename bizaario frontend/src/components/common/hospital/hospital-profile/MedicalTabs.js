import { useState } from 'react';
import AboutContent from './tab-content/AboutTabContent';
import SpecialtiesTabContent from './tab-content/SpecialtiesTabContent';
import DoctorsTabContent from './tab-content/DoctorsTabContent';
import AwardCrtConent from './tab-content/AwardCrtConent';
import UpcommingEventContent from './tab-content/UpcommingEventContent';
import PatientTestimonial from './tab-content/PatientTestimonial';

const tabs = [
  { id: 'about', label: 'About Us' },
  { id: 'specialties', label: 'Medical Specialties' },
  { id: 'doctors', label: 'Star Doctors' },
  { id: 'awards', label: 'Awards & Certificates' },
  { id: 'events', label: 'Upcoming Event' },
  { id: 'testimonials', label: 'Patient Testimonials' }
];



export default function MedicalTabs({ hospitalData }) {
  const [activeTab, setActiveTab] = useState('about');
console.log(hospitalData, "hospitalData ");
  const renderedConent = () => {
    switch (activeTab) {
      case 'about':
        return <AboutContent hospitalData={hospitalData} />;
      case 'specialties':
        return <><SpecialtiesTabContent hospitalData={hospitalData} /></>;
      case 'doctors':
        return <><DoctorsTabContent hospitalData={hospitalData} /></>;
      case 'awards':
        return <><AwardCrtConent hospitalData={hospitalData} /></>;
      case 'events':
        return <UpcommingEventContent hospitalData={hospitalData} />;
      case 'testimonials':
        return <PatientTestimonial hospitalData={hospitalData} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-top">
      <div className="">
        {/* Tabs Navigation */}
        <div className="flex flex-wrap gap-3 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${activeTab === tab.id
                ? 'bg-[var(--primary)] text-white shadow-lg scale-105'
                : 'bg-slate-300 text-slate-700 hover:bg-slate-400 hover:shadow-md'
                }`}
            >
              {tab.label}

            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="">
          {renderedConent()}
        </div>
      </div>
    </div>
  );
}


