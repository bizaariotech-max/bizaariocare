import { useState } from 'react';
import AboutContent from './tab-content/AboutTabContent';
import SpecialtiesTabContent from './tab-content/SpecialtiesTabContent';
import DoctorsTabContent from './tab-content/DoctorsTabContent';
import AwardCrtConent from './tab-content/AwardCrtConent';
import UpcommingEventContent from './tab-content/UpcommingEventContent';
import PatientTestimonial from './tab-content/PatientTestimonial';

const tabs = [
  { id: "about", label: "About Us" },
  // { id: "specialties", label: "Medical Specialties" },
  // { id: 'doctors', label: 'Star Doctors' },
  { id: "hospital_associations", label: "Hospital Associations" },
  { id: "awards", label: "Awards & Certificates" },
  { id: "events", label: "Upcoming Event" },
  { id: "testimonials", label: "Patient Testimonials" },
];



export default function MedicalTabs({doctorData} ) {
  const [activeTab, setActiveTab] = useState('about');
console.log(doctorData, "doctorData on medical tabs");
  const renderedConent = () => {
    switch (activeTab) {
      case "about":
        return <AboutContent doctorData={doctorData} />;
      case "specialties":
        return (
          <>
            <SpecialtiesTabContent doctorData={doctorData} />
          </>
        );
      // case 'doctors':
      //   return <><DoctorsTabContent doctorData={doctorData} /></>;
      case "hospital_associations":
        return (
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Work Experience</h4>
            {doctorData?.work_experience?.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "15px",
                }}
              >
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/1b856e809c7235f840a5c224f76e47c868c95e60?width=96"
                  alt="hospital"
                  style={{ width: "70px", height: "70px", marginRight: "12px" }}
                />
                <div>
                  <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                    {item.hospital_name}
                  </span>
                  <br />
                  <span style={{ fontSize: "14px" }}>
                    {item.designation} <br></br>(
                    {new Date(item.from_year).toLocaleDateString()} -{" "}
                    {new Date(item.to_year).toLocaleDateString()})
                  </span>
                </div>
              </div>
            ))}
            {/* <h4 className="mt-6 text-lg font-semibold">Our Gallery</h4>
            <div className="grid grid-cols-2 gap-4 mt-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {doctorData?.PictureGallery?.map((img, idx) => (
                <div
                  key={idx}
                  className="w-full overflow-hidden rounded-md shadow"
                  style={{ aspectRatio: "7/5", flexShrink: 0 }} // approximate 350x250 ratio
                >
                  <img
                    src={img}
                    alt="Gallery"
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div> */}
          </div>
        );
      case "awards":
        return (
          <>
            <AwardCrtConent doctorData={doctorData} />
          </>
        );
      case "events":
        return <UpcommingEventContent doctorData={doctorData} />;
      case "testimonials":
        return <PatientTestimonial doctorData={doctorData} />;
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


