import React, { useEffect, useState } from 'react'
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Radio, FormControlLabel, RadioGroup, FormLabel } from '@mui/material';
import api from '../../../api'
import Swal from 'sweetalert2';

export default function OpdSchedule({ initialData = {}, onPrevious, onNext }) {
  const [opd_schedule, setopd_schedule] = useState([{
    OPDDay: '',
    OPDTimeFrom: '',
    OPDTimeTo: '',
    AvailableSlots: '',
  }]);



  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newopd = [...opd_schedule];

    newopd[index][name] = value;

    setopd_schedule(newopd);
  }
  
    // Add new package form
  const addMore = () => {
    setopd_schedule([
      ...opd_schedule,
      {
        OPDDay: '',
        OPDTimeFrom: '',
        OPDTimeTo: '',
        AvailableSlots: '',
      },
    ]);
  };

    //============================== get all service category======================================
  
       const[allservice,setallservice]=useState([])
        const getallservice=async()=>
        {
          try {
            const resp=await api.post('api/v1/admin/LookupList',{ lookupcodes:"service_category"})
            setallservice(resp.data.data)
            
          } catch (error) {
            console.log(error);
            
          }
        }
      
        useEffect(()=>
        {
          getallservice()
      
        },[])

  const doctor_details=JSON.parse(localStorage.getItem("user"))

 const save_opd_details = async () => {
  try {
    const resp = await api.post(
      `api/v1/asset-sections/opd-schedule/${doctor_details._id}`,
      opd_schedule,
      { headers: { "Content-Type": "application/json" } }
    );

    console.log(resp);
    
    // Check response_code instead of HTTP status
    if (resp.data?.response?.response_code === "200") {
      Swal.fire({
        icon: "success",
        title: "Details Updated",
        text: "Doctor OPD Details Updated Successfully...",
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
           {opd_schedule.map((opd, index) => (
          <div className="grid grid-cols-2 gap-3" style={{marginTop:"25px"}}>
          <h3 className="font-semibold text-[16px] mb-1 col-span-2">OPD Schedule Details</h3>
         
          <FormControl fullWidth size="small"  className="col-span-2">
              <InputLabel>OPD Day</InputLabel>
              <Select
                name="OPDDay"
                label="OPDDay"
                value={opd_schedule.OPDDay}
                onChange={(e)=>handleChange(index,e)}
                MenuProps={{
                  disablePortal: true,
                  disableScrollLock: true,
                }}
              >
               
                <MenuItem value="Monday"> Monday</MenuItem>
                <MenuItem value="Monday"> Tuesday</MenuItem>
                <MenuItem value="Monday"> Wednesday</MenuItem>
                <MenuItem value="Monday"> Thursday</MenuItem>
                <MenuItem value="Monday"> Friday</MenuItem>
                <MenuItem value="Monday"> Saturday</MenuItem>
                <MenuItem value="Monday"> Sunday</MenuItem>
               
              </Select>
            </FormControl>

           
           
            <TextField
            label="OPD Time From" 
            name="OPDTimeFrom" 
            size="small" 
            className="col-span-2" 
            value={opd_schedule.OPDTimeFrom} 
            onChange={(e)=>handleChange(index,e)} 
            />

            <TextField
            label="OPD Time To" 
            name="OPDTimeTo" 
            size="small" 
            className="col-span-2" 
            value={opd_schedule.OPDTimeTo} 
            onChange={(e)=>handleChange(index,e)} 
            />

            <TextField
            type='number'
            label="Available Slots" 
            name="AvailableSlots" 
            size="small" 
            className="col-span-2" 
            value={opd_schedule.AvailableSlots} 
            onChange={(e)=>handleChange(index,e)} 
            />

           

          </div> 
             ))}
         
         
          <div className="flex justify-between mt-4">
            <Button variant="outlined" onClick={addMore}>Add More</Button>
          
            <Button variant="contained" color="warning" onClick={save_opd_details}>Save</Button>
 
          </div>
        </div> 

           <div className="bg-white rounded-xl shadow p-4">
                  <h3 className="font-semibold mb-4">Preview</h3>
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-semibold">OPD Schedule</p>
                    {/* <span className="text-gray-500"><TfiAngleUp /></span> */}
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    {/* <img src={userProfile} alt="Patient" className="w-16 h-16 rounded-full object-cover" /> */}
                    <div>
                     
                     
                    {opd_schedule.map((opd, index) => (
                      <div className="text-sm text-gray-600  flex-wrap gap-x-6 text-[12px]">
                        <p>OPD Day : <span  className="text-[#000000] font-semibold">{opd_schedule?.OPDDay || ""}</span></p><br></br>
                        <p>OPD Time From : <span  className="text-[#000000] font-semibold">{opd_schedule?.OPDTimeFrom || ""}</span></p><br></br>
                        <p>OPD Time To : <span  className="text-[#000000] font-semibold">{opd_schedule?.OPDTimeTo || ""}</span></p><br></br>
                        <p>Available Slots : <span  className="text-[#000000] font-semibold">{opd_schedule?.AvailableSlots || ""}</span></p><br></br>
                       
                      </div>
                    ))}
                    </div>
                  </div>
      
                
                </div>


      </div>

     

    </>
    )
}




