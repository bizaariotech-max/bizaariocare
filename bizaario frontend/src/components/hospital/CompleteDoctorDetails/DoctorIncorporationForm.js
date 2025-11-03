import React, { useEffect, useMemo, useState } from "react";
import PreviewIncorporationDetails from "./PreviewIncorporationDetails";
import DoctorIncorporationDetails from "./sub_forms/DoctorIncorporationDetails";
import api from '../../../api'
import Swal from 'sweetalert2';

export default function DoctorIncorporationForm({ initialData = {}, onNext, showPreview = true }) {

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
    <div className=" grid grid-cols-2 gap-4">
      <DoctorIncorporationDetails handleChange={handleChange} incorporationdetails={incorporationdetails} onNext={onNext}/>
      {/* <PreviewIncorporationDetails incorporationdetails={incorporationdetails}/>  */}
    </div>
  );
}
