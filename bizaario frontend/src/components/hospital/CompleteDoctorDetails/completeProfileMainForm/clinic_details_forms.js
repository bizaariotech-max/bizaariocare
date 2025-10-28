import React, { useEffect, useState } from 'react'
import DoctorIncorporationDetails from "../sub_forms/DoctorIncorporationDetails";
import api from '../../../../api'
import Swal from 'sweetalert2';
import HospitalSizeDetails from '../sub_forms/HospitalSizeDetails';
import AddressDetails from '../sub_forms/AddressDetails';

function Clinic_details_forms() {


  const[clinic_details_sub_tab,setclinic_details_sub_tab]=useState("Incorporative Details")

  const doctor_details=JSON.parse(localStorage.getItem("user"))
    
  const [incorporationdetails, setincorporationdetails] = useState({
    RegistrationBody: "",
    RegistrationCertificate: "",
    RegistrationYear: "",
    RegistrationNumber: "",
    ValidityExpiry: "",
  });


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setincorporationdetails({
      ...incorporationdetails,
      [name]: files ? files[0] : value,
    });
  };
      

  //========================== update incorporationdetails=======================================

  const get_incorporation_details=async()=>
  {
    try {
      const resp=await api.get(`api/v1/asset-sections/incorporation-details/${doctor_details._id}`)
         if (resp.data?.data) {
          const { _id, ...rest } = resp.data.data;
          setincorporationdetails(rest);
        }
    } catch (error) {
      console.log(error);
      
    }
  }
  
  useEffect(()=>
  {
    get_incorporation_details()
  },[])


  return (
    <div className="w-full">
      
         <div className="flex  justify-start mb-6 border-gray-200 rounded-lg overflow-auto">
  <button
  onClick={()=>setclinic_details_sub_tab("Incorporative Details")}
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
      textDecorationLine: clinic_details_sub_tab==="Incorporative Details"?"Underline":"none",
      whiteSpace: "nowrap"

    }}
  >
    Incorporative Details
  </button>

  <button
  onClick={()=>setclinic_details_sub_tab("Hospital Size")}
    className="px-2 md:px-4 py-2 hover:text-blue-700"
    style={{
       background:"rgba(189,196,212,0.3)",
      color: "#52677D",
      fontFamily: "Lora",
      fontSize: "18px",
      fontWeight: 600,
      lineHeight: "normal",
      textDecorationLine: clinic_details_sub_tab==="Hospital Size"?"Underline":"none",
      whiteSpace: "nowrap"
    }}
  >
    Hospital Size
  </button>

  <button
  onClick={()=>setclinic_details_sub_tab("Address")}
    className="px-2 md:px-4 py-2 hover:text-blue-700"
    style={{
      borderTopRightRadius:"10px",
      background:"rgba(189,196,212,0.3)",
      color: "#52677D",
      fontFamily: "Lora",
      fontSize: "18px",
      fontWeight: 600,
      lineHeight: "normal",
      textDecorationLine: clinic_details_sub_tab==="Address"?"Underline":"none",
      whiteSpace: "nowrap"
    }}
  >
    Address
  </button>

</div>
<div style={{padding: "10px 20px",display:clinic_details_sub_tab==="Incorporative Details"?"block":"none"}}>
    <DoctorIncorporationDetails handleChange={handleChange} incorporationdetails={incorporationdetails}/>
</div>

<div style={{padding: "10px 20px",display:clinic_details_sub_tab==="Hospital Size"?"block":"none"}}>
    <HospitalSizeDetails/>
</div>

<div style={{padding: "10px 20px",display:clinic_details_sub_tab==="Address"?"block":"none"}}>
    <AddressDetails />
</div>

    </div>
  )
}

export default Clinic_details_forms
