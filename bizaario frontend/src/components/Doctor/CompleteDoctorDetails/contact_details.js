import React, { useEffect, useState } from 'react'
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Radio, FormControlLabel, RadioGroup, FormLabel } from '@mui/material';
import api from '../../../api'
import Swal from 'sweetalert2';

export default function ContactInformation({ initialData = {}, onPrevious, onNext }) {
  const [contact_details, setcontact_details] = useState({
    ContactName: '',
    ContactPhoneNumber: '',
    ContactEmailAddress: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setcontact_details({ ...contact_details, [name]: value });
  };

  const doctor_details=JSON.parse(localStorage.getItem("user"))

 const save_contact_information = async () => {
  try {
    const resp = await api.put(
      `api/v1/asset-sections/contact-info/${doctor_details._id}`,
      contact_details,
      { headers: { "Content-Type": "application/json" } }
    );

    // Check response_code instead of HTTP status
    if (resp.data?.response?.response_code === "200") {
      Swal.fire({
        icon: "success",
        title: "Details Updated",
        text: "Doctor Contact Information Updated Successfully...",
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
 


  return (
    <>

    
      <div className=" grid grid-cols-2 gap-4">
        <div className='bg-white p-3 rounded-lg shadow'>
          <div className="grid grid-cols-2 gap-3" style={{marginTop:"25px"}}>
          <h3 className="font-semibold text-[16px] mb-1 col-span-2">Contact Details</h3>
            <TextField
            label="Contact Name" 
            name="ContactName" 
            size="small" 
            value={contact_details.ContactName} 
            className="col-span-2"
            onChange={handleChange} 
            />
           
            <TextField
            label="Contact Phone Number" 
            name="ContactPhoneNumber" 
            size="small" 
            className="col-span-2" 
            value={contact_details.ContactPhoneNumber} 
            onChange={handleChange} 
            />

         
            <TextField
            label="Contact Email Address" 
            name="ContactEmailAddress" 
            size="small" 
            className="col-span-2" 
            value={contact_details.ContactEmailAddress} 
            onChange={handleChange} 
            />

           

          </div> 
       
         
         
          <div className="flex justify-end gap-3 mt-4">
                    <Button variant="contained" color="warning" onClick={save_contact_information}>Save</Button>
            </div>
        </div> 

           <div className="bg-white rounded-xl shadow p-4">
                  <h3 className="font-semibold mb-4">Preview</h3>
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-semibold">Contact Details</p>
                    {/* <span className="text-gray-500"><TfiAngleUp /></span> */}
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    {/* <img src={userProfile} alt="Patient" className="w-16 h-16 rounded-full object-cover" /> */}
                    <div>
                      {/* <p className="font-semibold text-[20px]">{formData?.name || "Patient Name"}</p> */}
                     
                      <div className="text-sm text-gray-600  flex-wrap gap-x-6 text-[12px]">
                        <p>Contact Name : <span  className="text-[#000000] font-semibold">{contact_details?.ContactName || ""}</span></p><br></br>
                        <p>Contact Phone Number : <span  className="text-[#000000] font-semibold">{contact_details?.AccountNContactPhoneNumberumber || ""}</span></p><br></br>
                        <p>Contact Email Address : <span  className="text-[#000000] font-semibold">{contact_details?.ContactEmailAddress || ""}</span></p><br></br>
                        

                      </div>
             
                    </div>
                  </div>
      
                
                </div>


      </div>

     

    </>
    )
}



