import React, { useEffect, useState } from 'react'
import DoctorIncorporationDetails from "../sub_forms/DoctorIncorporationDetails";
import api from '../../../../api'
import Swal from 'sweetalert2';
import HospitalSizeDetails from '../sub_forms/patient_basic_details';
import AddressDetails from '../sub_forms/AddressDetails';
import AssetProfile from '../sub_forms/assetprofile';
import SocialMediaAssets from '../sub_forms/social_media_assest';
import ContactInformation from '../sub_forms/contact_details';

function PatientProfilling() {


  const[profile_sub_tab,setprofile_sub_tab]=useState("Chief Complaints")

  
    



  return (
    <div className="w-full">
      
         <div className="flex  justify-start mb-6 border-gray-200 rounded-lg overflow-auto">
  <button
  onClick={()=>setprofile_sub_tab("Chief Complaints")}
    className="px-2 md:px-4 py-3 patient-sub-tab-details"
    style={{
      textDecorationLine: profile_sub_tab==="Chief Complaints"?"Underline":"none",

    }}
  >
    Chief Complaints 
  </button>

  <button
  onClick={()=>setprofile_sub_tab("Medical Summary")}
    className="px-2 md:px-4 py-2  patient-sub-tab-details"
    style={{
      textDecorationLine: profile_sub_tab==="Medical Summary"?"Underline":"none",
    }}
  >
    Medical Summary
  </button>

  <button
  onClick={()=>setprofile_sub_tab("Clinical Findings")}
    className="px-2 md:px-4 py-2 patient-sub-tab-details"
    style={{
      textDecorationLine: profile_sub_tab==="Clinical Findings"?"Underline":"none",
    }}
  >
    Clinical Findings
  </button>

    <button
  onClick={()=>setprofile_sub_tab("Clinical Findings")}
    className="px-2 md:px-4 py-2 patient-sub-tab-details"
    style={{
      textDecorationLine: profile_sub_tab==="Clinical Findings"?"Underline":"none",
    }}
  >
    Vitals/ Physical Examinations 
  </button>

    <button
  onClick={()=>setprofile_sub_tab("Clinical Findings")}
    className="px-2 md:px-4 py-2 patient-sub-tab-details"
    style={{
      textDecorationLine: profile_sub_tab==="Clinical Findings"?"Underline":"none",
    }}
  >
    Diagnostics/ Investigations  
  </button>

      <button
  onClick={()=>setprofile_sub_tab("Clinical Findings")}
    className="px-2 md:px-4 py-2 patient-sub-tab-details"
    style={{
      textDecorationLine: profile_sub_tab==="Clinical Findings"?"Underline":"none",
    }}
  >
    Diagnosis   
  </button>

       <button
  onClick={()=>setprofile_sub_tab("Clinical Findings")}
    className="px-2 md:px-4 py-2 patient-sub-tab-details"
    style={{
      textDecorationLine: profile_sub_tab==="Clinical Findings"?"Underline":"none",
    }}
  >
    Treatment To Date   
  </button>
  

</div>
<div style={{padding: "10px 20px",display:profile_sub_tab==="Chief Complaints"?"block":"none"}}>
    <AssetProfile/>
</div>

<div style={{padding: "10px 20px",display:profile_sub_tab==="Medical Summary"?"block":"none"}}>
    <SocialMediaAssets/>
</div>

<div style={{padding: "10px 20px",display:profile_sub_tab==="Clinical Findings"?"block":"none"}}>
    <ContactInformation />
</div>

    </div>
  )
}

export default PatientProfilling
