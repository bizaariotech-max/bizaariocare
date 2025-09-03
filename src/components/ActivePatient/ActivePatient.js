import React, { useEffect, useState } from 'react'
import PatientProfileForm from './PatientProfileForm';
import PersonalProfile from './PersonalProfile';
import Adminsidebar from '../Admin/adminsidebar';
import Adminheader from '../Admin/adminheader';

const ActivePatient = () => {
  const [activeTab, setActiveTab] = useState('Patient Details');
  const [patientDetails, setPatientDetails] = useState({});
  const [personalProfile, setPersonalProfile] = useState({});

  const [showPreview, setShowPreview] = useState(true);

  // useEffect(() => {
  //   try {
  //     const pd = localStorage.getItem('patientDetails');
  //     if (pd) setPatientDetails(JSON.parse(pd));
  //     const pp = localStorage.getItem('personalProfile');
  //     if (pp) setPersonalProfile(JSON.parse(pp));
  //   } catch (_) { }
  // }, []);

  const tabItem = [
    {
      id: 1,
      tab: "Patient Details",
    },
    {
      id: 2,
      tab: "Personal Profile",
    },
    {
      id: 3,
      tab: "Allergies & Deficiencies",
    },
    {
      id: 4,
     
      tab: "Family History",
    },
    {
      id: 5,
      tab: "Pre-existing Diseases",
    },
    {
      id: 6,
      tab: "Past Illness / Surgeries",
    },
    {
      id: 7,
       tab: "Current Medications",
    },
    {
      id: 8,
      tab: "Vaccination History",
    },
    {
      id: 9,
      tab: "Habits & Lifestyle",
    },
    {
      id: 10,
      tab: "Occupational Profile",
    },
  ]


  const renderContent = () => {
    if (activeTab === 'Patient Details') {
      return (
        <PatientProfileForm
          initialData={patientDetails}
          // showPreview={showPreview}
          onNext={(data) => {
            setPatientDetails(data);
            // localStorage.setItem('patientDetails', JSON.stringify(data));
            // setShowPreview(false);
            setActiveTab('Personal Profile');
          }}
        />
      );
    }
    if (activeTab === 'Personal Profile') {
      return (
        <PersonalProfile
          initialData={personalProfile}
          onPrevious={() => { setActiveTab('Patient Details');
            //  setShowPreview(true); 
            }}
          onNext={(data) => {
            setPersonalProfile(data);
            // localStorage.setItem('personalProfile', JSON.stringify(data));
          }}
        />
      );
    }
    return null;
  };
  return (
    <>
    <Adminheader/>
    <Adminsidebar/>
      <div className=" bg-gray-50 min-h-screen" style={{marginLeft: "19.5vw",marginTop: "10px"}}>
        <h2 className="text-2xl font-semibold mb-2">
          Enter Details for Active Patients Profile
        </h2>
        <p className="text-gray-600 mb-6">
          Add or update the required details for the active patient’s profile to
          keep records accurate and complete.
        </p>

        <div className="grid grid-cols-12 gap-4">
          {/* Section 1 */}
          <div className="bg-white rounded-xl shadow p-4 col-span-4">
            <h2 className="font-medium mb-3">Section 1 Patient’s Profiling</h2>
            <div className="flex flex-wrap gap-4">
              {tabItem.map((item) => (
                <button key={item.id}
                  className={`px-[10px] py-[7px] text-[14px] font-semibold border rounded-[4px] hover:text-white hover:bg-[#525fe1] border-[#525fe1]  ${activeTab === item.tab ? 'bg-[#525fe1] text-white active-custom-tab' : 'text-[#525fe1]'}`}
                  onClick={() => { setActiveTab(item.tab);  }}>
                  {item.tab}
                </button>
              ))}
            </div>
          </div>

          <div className="col-span-8">
            {renderContent()}
          </div> 
        </div>
      </div>
    </>
  )
}

export default ActivePatient
