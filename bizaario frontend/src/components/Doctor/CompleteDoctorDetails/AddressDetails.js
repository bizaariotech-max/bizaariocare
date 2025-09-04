import React, { useEffect, useState } from 'react'
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Radio, FormControlLabel, RadioGroup, FormLabel } from '@mui/material';
import api from '../../../api'
import Swal from 'sweetalert2';

export default function AddressDetails({ initialData = {}, onPrevious, onNext }) {
  const [address, setaddress] = useState({
    AddressLine1: '',
    AddressLine2: '',
    PostalCode: '',
    GeoLocation: { type: "Point", coordinates: [0, 0] },
   
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setaddress({ ...address, [name]: value });
  };


  const doctor_details=JSON.parse(localStorage.getItem("user"))

  const save_address=async()=>
  {
    try {
      const resp=await api.put(`api/v1/asset-sections/address/${doctor_details._id}`,address,
          {
        headers: { "Content-Type": "application/json" },
      }
      )


      
    if(resp.status===200)
       {
          Swal.fire({
           icon:"success",
           title:"Details Updated",
           text:"Address Details Updated Successfully...",
           showConfirmButton:true,
           customClass: {
           confirmButton: 'my-swal-button',
         },
         }).then(()=>
         {
           window.location.reload()
         })
       }
      
    } catch (error) {
      console.log(error);
       Swal.fire({
            icon:"error",
            title:"error ",
            text:error.response.data.message,
            showConfirmButton:true,
              customClass: {
              confirmButton: 'my-swal-button',
            },
          })
      
    }
  }

  //================================ get address details=========================================

  
  const get_address_details=async()=>
  {
    try {
      const resp=await api.get(`api/v1/asset-sections/address/${doctor_details._id}`)
         if (resp.data?.data) {
          const { _id, ...rest } = resp.data.data;
          setaddress(rest);
        }
    } catch (error) {
      console.log(error);
      
    }
  }
  
  useEffect(()=>
  {
    get_address_details()
  },[])



  return (
    <>
      <div className=" grid grid-cols-2 gap-4">
        <div className='bg-white p-3 rounded-lg shadow'>
          <h3 className="font-semibold text-[16px] mb-3">Address Details</h3>
          <div className="grid grid-cols-2 gap-3">
            <TextField
            label="Address Line 1" 
            name="AddressLine1" 
            size="small" 
            value={address.AddressLine1} 
            className="col-span-2"
            onChange={handleChange} 
            />
           
            <TextField
            label="Address Line 2" 
            name="AddressLine2" 
            size="small" 
            className="col-span-2" 
            value={address.AddressLine2} 
            onChange={handleChange} 
            />

              <TextField
            label="Postal Code" 
            name="PostalCode" 
            size="small" 
            className="col-span-2" 
            value={address.PostalCode} 
            onChange={handleChange} 
            />
           
            {/* <TextField
            label="GeoLocation" 
            name="GeoLocation" 
            size="small" 
            className="col-span-2" 
            value={address.GeoLocation} 
            onChange={handleChange} 
            /> */}

          <TextField
          size="small"
          className="col-span-2"
          label="GeoLocation (lat,lng)"
          defaultValue={
            address.GeoLocation.coordinates
              ? `${address.GeoLocation.coordinates[1]},${address.GeoLocation.coordinates[0]}`
              : ""
          }
          onChange={(e) => {
            const [latStr, lngStr] = e.target.value.split(",");
            const lat = parseFloat(latStr);
            const lng = parseFloat(lngStr);

            if (!isNaN(lat) && !isNaN(lng)) {
              setaddress((prev) => ({
                ...prev,
                GeoLocation: { type: "Point", coordinates: [lng, lat] }, // GeoJSON format
              }));
            }
          }}
        />


          </div> 
         
         
           <div className="flex justify-end gap-3 mt-4">
                     <Button variant="contained" color="warning" onClick={save_address}>Save</Button>
            </div>
        </div> 

           <div className="bg-white rounded-xl shadow p-4">
                  <h3 className="font-semibold mb-4">Preview</h3>
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-semibold">Address Details</p>
                    {/* <span className="text-gray-500"><TfiAngleUp /></span> */}
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    {/* <img src={userProfile} alt="Patient" className="w-16 h-16 rounded-full object-cover" /> */}
                    <div>
                      {/* <p className="font-semibold text-[20px]">{formData?.name || "Patient Name"}</p> */}
                      <div className="text-sm text-gray-600  flex-wrap gap-x-6 text-[12px]">
                        <p>Address Line 1 : <span  className="text-[#000000] font-semibold">{address?.AddressLine1 || ""}</span></p><br></br>
                        <p>Address Line 2 : <span  className="text-[#000000] font-semibold">{address?.AddressLine2 || ""}</span></p><br></br>
                        <p>Postal Code : <span  className="text-[#000000] font-semibold">{address?.PostalCode || ""}</span></p><br></br>
                        <p>Geo Location : <span  className="text-[#000000] font-semibold">{address?.GeoLocation.coordinates.join(',') || ""}</span></p>
                       
                      </div>
                    </div>
                  </div>
      
                
                </div>


      </div>

     

    </>
    )
}



