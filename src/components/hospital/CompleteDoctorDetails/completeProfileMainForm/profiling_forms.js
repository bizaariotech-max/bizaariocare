import React, { useEffect, useState } from 'react'
import DoctorIncorporationDetails from "../sub_forms/DoctorIncorporationDetails";
import api from '../../../../api'
import Swal from 'sweetalert2';
import HospitalSizeDetails from '../sub_forms/HospitalSizeDetails';
import AddressDetails from '../sub_forms/AddressDetails';
import AssetProfile from '../sub_forms/assetprofile';
import SocialMediaAssets from '../sub_forms/social_media_assest';
import ContactInformation from '../sub_forms/contact_details';

function Profiling() {


  const[profile_sub_tab,setprofile_sub_tab]=useState("Asset Profile")

  
    



  return (
    <div className="w-full">
      
         <div className="flex  justify-start mb-6 border-gray-200 rounded-lg overflow-auto">
  <button
  onClick={()=>setprofile_sub_tab("Asset Profile")}
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
      textDecorationLine: profile_sub_tab==="Asset Profile"?"Underline":"none",
      whiteSpace: "nowrap"

    }}
  >
    Assets Profile
  </button>

  <button
  onClick={()=>setprofile_sub_tab("Social Media Asset")}
    className="px-2 md:px-4 py-2 hover:text-blue-700"
    style={{
       background:"rgba(189,196,212,0.3)",
      color: "#52677D",
      fontFamily: "Lora",
      fontSize: "18px",
      fontWeight: 600,
      lineHeight: "normal",
      textDecorationLine: profile_sub_tab==="Social Media Asset"?"Underline":"none",
      whiteSpace: "nowrap"
    }}
  >
    Social Media Assets
  </button>

  <button
  onClick={()=>setprofile_sub_tab("Contact Details")}
    className="px-2 md:px-4 py-2 hover:text-blue-700"
    style={{
      borderTopRightRadius:"10px",
      background:"rgba(189,196,212,0.3)",
      color: "#52677D",
      fontFamily: "Lora",
      fontSize: "18px",
      fontWeight: 600,
      lineHeight: "normal",
      textDecorationLine: profile_sub_tab==="Contact Details"?"Underline":"none",
      whiteSpace: "nowrap"
    }}
  >
    Contact Details
  </button>

</div>
<div style={{padding: "10px 20px",display:profile_sub_tab==="Asset Profile"?"block":"none"}}>
    <AssetProfile/>
</div>

<div style={{padding: "10px 20px",display:profile_sub_tab==="Social Media Asset"?"block":"none"}}>
    <SocialMediaAssets/>
</div>

<div style={{padding: "10px 20px",display:profile_sub_tab==="Contact Details"?"block":"none"}}>
    <ContactInformation />
</div>

    </div>
  )
}

export default Profiling
