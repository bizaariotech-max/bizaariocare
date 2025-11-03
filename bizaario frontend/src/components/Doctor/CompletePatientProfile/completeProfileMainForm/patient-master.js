import React, { useEffect, useState } from 'react'
import api from '../../../../api'
import Swal from 'sweetalert2';
import PatientBasicDetails from '../sub_forms/patient_basic_details';



function PatientMaster() {

  const doctor_details=JSON.parse(localStorage.getItem("user"))

  const[clinic_details_sub_tab,setclinic_details_sub_tab]=useState("Patient Basic Details")



  return (
    <div className="w-full">
      
         <div className="flex  justify-start mb-6 border-gray-200 rounded-lg overflow-auto">
  <button
  onClick={()=>setclinic_details_sub_tab("Patient Basic Details")}
    className="px-2 md:px-4 py-3 patient-sub-tab-details"
    style={{
   
      textDecorationLine: clinic_details_sub_tab==="Patient Basic Details"?"Underline":"none",
      whiteSpace: "nowrap"

    }}
  >
    Patient Details
  </button>

 

 

</div>


<div style={{padding: "10px 20px",display:clinic_details_sub_tab==="Patient Basic Details"?"block":"none"}}>
    <PatientBasicDetails/>
</div>



    </div>
  )
}

export default PatientMaster
