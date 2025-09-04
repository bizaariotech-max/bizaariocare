import React, { useEffect, useState } from 'react'
import DoctorIncorporationForm from './DoctorIncorporationForm';
import HospitalSizeDetails from './HospitalSizeDetails';
import Doctorheader from '../doctorheader';
import Doctorsidebar from '../doctorsidebar';
import AddressDetails from './AddressDetails';
import AssetProfile from './assetprofile';
import MedicalSpecialties from './medicalspecialities';
import SocialMediaAssets from './social_media_assest';
import TreatmentPackages from './treatment_packages';
import BankDetails from './bankdetails';
import FeeCharges from './fee_charges';
import OpdSchedule from './opd_schedule';
import OnlineClinicLink from './online_clinic';
import ContactInformation from './contact_details';

const CompleteDoctorDetails = () => {
  const [activeTab, setActiveTab] = useState('Incorporation Details');
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
      tab: "Incorporation Details",
    },
    {
      id: 2,
      tab: "Hospital Size",
    },
    {
      id: 3,
      tab: "Address",
    },
    {
      id: 4,
     
      tab: "Asset Profile",
    },
    {
      id: 5,
      tab: "Medical Specialties",
    },
    {
      id: 6,
      tab: "Social Media Assets",
    },
    {
      id: 7,
       tab: "Treatment Packages",
    },
    {
      id: 8,
      tab: "Bank Details",
    },
    {
      id: 9,
      tab: "Fee & Charges",
    },
    {
      id: 10,
      tab: "OPD Schedule",
    },
     {
      id: 11,
      tab: "Online Clinic",
    },
      {
      id: 12,
      tab: "Contact Information",
    },
  ]


  const renderContent = () => {
    if (activeTab === 'Incorporation Details') {
      return (
        <DoctorIncorporationForm
        />
      );
    }
    if (activeTab === 'Hospital Size') {
      return (
        <HospitalSizeDetails
          initialData={personalProfile}
        />
      );
    }

     if (activeTab === 'Address') {
      return (
        <AddressDetails
          onPrevious={() => { setActiveTab('Address');
            }}
          onNext={(data) => {
            setActiveTab('Hospital Size');
          }}
        />
      );
    }

     if (activeTab === 'Asset Profile') {
      return (
        <AssetProfile/>
      );
    }

       if (activeTab === 'Medical Specialties') {
      return (
        <MedicalSpecialties/>
      );
    }

        if (activeTab === 'Social Media Assets') {
      return (
        <SocialMediaAssets/>
      );
    }

    if (activeTab === 'Treatment Packages') {
      return (
        <TreatmentPackages/>
      );
    }

      if (activeTab === 'Bank Details') {
      return (
        <BankDetails/>
      );
    }

         if (activeTab === 'Fee & Charges') {
      return (
        <FeeCharges/>
      );
    }

           if (activeTab === 'OPD Schedule') {
      return (
        <OpdSchedule/>
      );
    }

              if (activeTab === 'Online Clinic') {
      return (
        <OnlineClinicLink/>
      );
    }

               if (activeTab === 'Contact Information') {
      return (
        <ContactInformation/>
      );
    }


    return null;
  };
  return (
    <>
    <Doctorheader/>
    <Doctorsidebar/>
      <div className=" bg-gray-50 min-h-screen" style={{marginLeft: "19.5vw",marginTop: "10px"}}>
        <h2 className="text-2xl font-semibold mb-2">
          Enter Details for Active Doctor Profile
        </h2>
        <p className="text-gray-600 mb-6">
          Add or update the required details for the active doctor profile to
          keep records accurate and complete.
        </p>

        <div className="grid grid-cols-12 gap-4">
          {/* Section 1 */}
          <div className="bg-white rounded-xl shadow p-4 col-span-4">
            <h2 className="font-medium mb-3">Doctor's Profiling</h2>
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

export default CompleteDoctorDetails
