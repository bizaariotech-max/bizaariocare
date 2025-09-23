import React, { useEffect, useState } from 'react'
import DoctorIncorporationDetails from "../sub_forms/DoctorIncorporationDetails";
import api from '../../../../api'
import Swal from 'sweetalert2';
import HospitalSizeDetails from '../sub_forms/HospitalSizeDetails';
import AddressDetails from '../sub_forms/AddressDetails';
import AssetProfile from '../sub_forms/assetprofile';
import SocialMediaAssets from '../sub_forms/social_media_assest';
import ContactInformation from '../sub_forms/contact_details';
import MedicalSpecialties from '../sub_forms/medicalspecialities';
import TreatmentPackages from '../sub_forms/treatment_packages';
import FeeCharges from '../sub_forms/fee_charges';

function Specialties() {


  const[profile_sub_tab,setprofile_sub_tab]=useState("Medical Specialties")

  
  return (
    <div className="w-full">
      
         <div className="flex  justify-start mb-6 border-gray-200 rounded-lg overflow-auto">
  <button
  onClick={()=>setprofile_sub_tab("Medical Specialties")}
    className="px-2 md:px-4 py-3"
    style={{
      borderTopLeftRadius:"10px",
      background:"rgba(189,196,212,0.3)",
      color: "#52677D",
      textAlign: "center",
      fontFamily: "Lora",
      fontSize: "18px",
      fontStyle: "normal",
      fontWeight: 600,
      lineHeight: "normal",
      textDecorationLine: profile_sub_tab==="Medical Specialties"?"Underline":"none",
      whiteSpace: "nowrap"

    }}
  >
    Medical Specialties
  </button>

  <button
  onClick={()=>setprofile_sub_tab("Treatment Package")}
    className="px-2 md:px-4 py-2 hover:text-blue-700"
    style={{
       background:"rgba(189,196,212,0.3)",
      color: "#52677D",
      fontFamily: "Lora",
      fontSize: "18px",
      fontWeight: 600,
      lineHeight: "normal",
      textDecorationLine: profile_sub_tab==="Treatment Package"?"Underline":"none",
      whiteSpace: "nowrap"
    }}
  >
    Treatment Package
  </button>

  <button
  onClick={()=>setprofile_sub_tab("Fees & Charge")}
    className="px-2 md:px-4 py-2 hover:text-blue-700"
    style={{
      borderTopRightRadius:"10px",
      background:"rgba(189,196,212,0.3)",
      color: "#52677D",
      fontFamily: "Lora",
      fontSize: "18px",
      fontWeight: 600,
      lineHeight: "normal",
      textDecorationLine: profile_sub_tab==="Fees & Charge"?"Underline":"none",
      whiteSpace: "nowrap"
    }}
  >
    Fees & Charge
  </button>

</div>
<div style={{padding: "10px 20px",display:profile_sub_tab==="Medical Specialties"?"block":"none"}}>
    <MedicalSpecialties/>
</div>

<div style={{padding: "10px 20px",display:profile_sub_tab==="Treatment Package"?"block":"none"}}>
    <TreatmentPackages/>
</div>

<div style={{padding: "10px 20px",display:profile_sub_tab==="Fees & Charge"?"block":"none"}}>
    <FeeCharges />
</div>

    </div>
  )
}

export default Specialties
