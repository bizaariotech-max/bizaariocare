import React, { useEffect, useState } from 'react'
import { TextField,Grid, Select, MenuItem, FormControl, InputLabel, Button, Radio, FormControlLabel, RadioGroup, FormLabel } from '@mui/material';
import api from '../../../api'
import Swal from 'sweetalert2';

export default function MedicalSpecialties({ initialData = {}, onPrevious, onNext }) {


  const [MedicalSpecialties, setMedicalSpecialties] = useState([]);


  //=========================== get all list of medical speciality================================


     const[allmedical_speciality,setallmedical_speciality]=useState([])
      const getallmedical_speciality=async()=>
      {
        try {
          const resp=await api.post('api/v1/admin/LookupList',{lookupcodes:"medical_speciality"})
          setallmedical_speciality(resp.data.data)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        getallmedical_speciality()
    
      },[])
 
const handleMedicalSpecialtiesChange = (event) => {
  const { value } = event.target;

  // Material-UI returns a string if autofill or comma-separated
  setMedicalSpecialties(typeof value === "string" ? value.split(",") : value);
};


  const doctor_details=JSON.parse(localStorage.getItem("user"))

  const save_medical_specialities=async()=>
  {
    try {

      const payload = { MedicalSpecialties };

      const resp=await api.put(`api/v1/asset-sections/medical-specialties/${doctor_details._id}`,payload,
          {
        headers: { "Content-Type": "application/json" },
      }
      )
    if(resp.status===200)
       {
          Swal.fire({
           icon:"success",
           title:"Details Updated",
           text:"Medical Specialities Details Updated Successfully...",
           showConfirmButton:true,
           customClass: {
           confirmButton: 'my-swal-button',
         },
         }).then(()=>
         {
           window.location.reload()
         })
       }
       console.log(resp);
       
      
    } catch (error) {
      console.log(error);
       Swal.fire({
            icon:"error",
            title:"error ",
            text:error.message,
            showConfirmButton:true,
              customClass: {
              confirmButton: 'my-swal-button',
            },
          })
      
    }
  }


  return (
    <>
      <div className=" grid grid-cols-2 gap-4">
        <div className='bg-white p-3 rounded-lg shadow'>
          <h3 className="font-semibold text-[16px] mb-3">Medical Specialties</h3>
          <div className="grid grid-cols-2 gap-3">
         
     
  <FormControl fullWidth size="small"  className="col-span-2">
    <InputLabel>Medical Specialties</InputLabel>
    <Select
    multiple
      name="MedicalSpecialties"
      label="Medical Specialties"
      value={MedicalSpecialties}
      onChange={handleMedicalSpecialtiesChange}
      MenuProps={{
        disablePortal: true,
        disableScrollLock: true,
      }}
    >
  {
    allmedical_speciality.map((item)=>
    (
      <MenuItem value={item._id}>{item.lookup_value}</MenuItem>
    ))
  }
    </Select>
  </FormControl>




          </div> 
         
         
      <div className="flex justify-end gap-3 mt-4">
                <Button variant="contained" color="warning" onClick={save_medical_specialities}>Save</Button>
        </div>
        </div> 

           <div className="bg-white rounded-xl shadow p-4">
                  <h3 className="font-semibold mb-4">Preview</h3>
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-semibold">Medical Specialties Details</p>
                    {/* <span className="text-gray-500"><TfiAngleUp /></span> */}
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    {/* <img src={userProfile} alt="Patient" className="w-16 h-16 rounded-full object-cover" /> */}
                    <div>
                      {/* <p className="font-semibold text-[20px]">{formData?.name || "Patient Name"}</p> */}
                      <div className="text-sm text-gray-600  flex-wrap gap-x-6 text-[12px]">
                        <p>Medical Specialties : <span  className="text-[#000000] font-semibold">{MedicalSpecialties.join(',') || ""}</span></p><br></br>
                       
                      </div>
                    </div>
                  </div>
      
                
                </div>


      </div>

     

    </>
    )
}



