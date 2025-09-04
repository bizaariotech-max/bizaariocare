import React, { useEffect, useState } from 'react'
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Radio, FormControlLabel, RadioGroup, FormLabel } from '@mui/material';
import api from '../../../api'
import Swal from 'sweetalert2';

export default function OnlineClinicLink({ initialData = {}, onPrevious, onNext }) {
  const [OnlineClinicLink, setOnlineClinicLink] = useState('');



const handleChange = (e) => {
  const { value } = e.target;
  setOnlineClinicLink(value); // just store the value directly
};


 const doctor_details=JSON.parse(localStorage.getItem("user"))

 const save_online_clinic_link = async () => {
  try {
    const payload={OnlineClinicLink}
    const resp = await api.put(
      `api/v1/asset-sections/online-clinic/${doctor_details._id}`,
      payload,
      { headers: { "Content-Type": "application/json" } }
    );

    // Check response_code instead of HTTP status
    if (resp.data?.response?.response_code === "200") {
      Swal.fire({
        icon: "success",
        title: "Details Updated",
        text: "Doctor Online Clinic Link Updated Successfully...",
        showConfirmButton: true,
        customClass: { confirmButton: "my-swal-button" },
      }).then(() => {
        window.location.reload();
      });
    } else {
      const errType = resp.data?.response?.response_message?.errorType || "Error";
      const errMsg = resp.data?.response?.response_message?.error || "Something went wrong";

      Swal.fire({
        icon: "error",
        title: errType,
        text: errMsg,
        showConfirmButton: true,
        customClass: { confirmButton: "my-swal-button" },
      });
    }
  } catch (error) {
    console.log(error);

    Swal.fire({
      icon: "error",
      title: "Network/Error",
      text: error.message,
      showConfirmButton: true,
      customClass: { confirmButton: "my-swal-button" },
    });
  }
};


//============================== get online clinic details=======================================

const get_online_clinic=async()=>
  {
    try {
      const resp=await api.get(`api/v1/asset-sections/online-clinic/${doctor_details._id}`)
      console.log(resp);
      
         if (resp.data?.data) {
          const { _id, ...rest } = resp.data.data;
          setOnlineClinicLink(rest);
        }
    } catch (error) {
      console.log(error);
      
    }
  }
  
  useEffect(()=>
  {
    get_online_clinic()
  },[])
 



  return (
    <>

    
      <div className=" grid grid-cols-2 gap-4">
        <div className='bg-white p-3 rounded-lg shadow'>
      
          <div className="grid grid-cols-2 gap-3" style={{marginTop:"25px"}}>
          <h3 className="font-semibold text-[16px] mb-1 col-span-2">Online Clinic Details</h3>
         
            <TextField
            label="Online Clinic Link" 
            name="OnlineClinicLink" 
            size="small" 
            className="col-span-2" 
            value={OnlineClinicLink.OnlineClinicLink} 
            onChange={handleChange} 
            />

       

           

          </div> 
      
         
         
           <div className="flex justify-end gap-3 mt-4">
                     <Button variant="contained" color="warning" onClick={save_online_clinic_link}>Save</Button>
            </div>
        </div> 

           <div className="bg-white rounded-xl shadow p-4">
                  <h3 className="font-semibold mb-4">Preview</h3>
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-semibold">Online Clinic Link</p>
                    {/* <span className="text-gray-500"><TfiAngleUp /></span> */}
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    {/* <img src={userProfile} alt="Patient" className="w-16 h-16 rounded-full object-cover" /> */}
                    <div>
                     
                      <div className="text-sm text-gray-600  flex-wrap gap-x-6 text-[12px]">
                        <p>Online Clinic Link : <span  className="text-[#000000] font-semibold">{OnlineClinicLink.OnlineClinicLink || ""}</span></p><br></br>
                       
                      </div>
             
                    </div>
                  </div>
      
                
                </div>


      </div>

     

    </>
    )
}




