import React, { useEffect, useState } from 'react'
import DoctorIncorporationDetails from "../sub_forms/DoctorIncorporationDetails";
import api from '../../../../api'
import Swal from 'sweetalert2';
import HospitalSizeDetails from '../sub_forms/HospitalSizeDetails';
import AddressDetails from '../sub_forms/AddressDetails';
import AssetProfile from '../sub_forms/assetprofile';
import SocialMediaAssets from '../sub_forms/social_media_assest';
import ContactInformation from '../sub_forms/contact_details';
import BankDetails from '../sub_forms/bankdetails';
import OpdSchedule from '../sub_forms/opd_schedule';
import OnlineClinicLink from '../sub_forms/online_clinic';


function ClinicSchedule() {


const[profile_sub_tab,setprofile_sub_tab]=useState("OPD Schedule")

  return (
    <div className="w-full">
      
         <div className="flex  justify-start mb-6 border-gray-200 rounded-lg overflow-auto">
  <button
  onClick={()=>setprofile_sub_tab("OPD Schedule")}
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
      textDecorationLine: profile_sub_tab==="OPD Schedule"?"Underline":"none",
      whiteSpace: "nowrap"

    }}
  >
    OPD Schedule
  </button>

   <button
  onClick={()=>setprofile_sub_tab("Online Clinic")}
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
      textDecorationLine: profile_sub_tab==="Online Clinic"?"Underline":"none",
      whiteSpace: "nowrap"

    }}
  >
    Online Clinic
  </button>


  </div>
  
<div style={{padding: "10px 20px",display:profile_sub_tab==="OPD Schedule"?"block":"none"}}>
    <OpdSchedule/>
</div>

<div style={{padding: "10px 20px",display:profile_sub_tab==="Online Clinic"?"block":"none"}}>
    <OnlineClinicLink/>
</div>

    </div>
  )
}

export default ClinicSchedule
