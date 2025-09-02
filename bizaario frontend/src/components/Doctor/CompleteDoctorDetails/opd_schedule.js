import React, { useEffect, useState } from 'react'
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Radio, FormControlLabel, RadioGroup, FormLabel } from '@mui/material';

export default function OpdSchedule({ initialData = {}, onPrevious, onNext }) {
  const [opd_schedule, setopd_schedule] = useState([{
    OPDDay: '',
    OPDTimeFrom: '',
    OPDTimeTo: '',
    AvailableSlots: '',
  }]);



  const handleChange = (index, e) => {
    const { name, value, files } = e.target;
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


  return (
    <>

    
      <div className=" grid grid-cols-2 gap-4">
        <div className='bg-white p-3 rounded-lg shadow'>
           {opd_schedule.map((opd, index) => (
          <div className="grid grid-cols-2 gap-3" style={{marginTop:"25px"}}>
          <h3 className="font-semibold text-[16px] mb-1 col-span-2">OPD Schedule Details</h3>
         
          <FormControl fullWidth size="small"  className="col-span-2">
              <InputLabel>Service Category</InputLabel>
              <Select
                name="OPDDay"
                label="OPDDay"
                value={opd_schedule.OPDDay}
                onChange={handleChange}
                MenuProps={{
                  disablePortal: true,
                  disableScrollLock: true,
                }}
              >
                <MenuItem value="India">India</MenuItem>
                <MenuItem value="Usa">USA</MenuItem>
                <MenuItem value="United Kingdom">UK</MenuItem>
              </Select>
            </FormControl>

           
           
            <TextField
            label="OPD Time From" 
            name="OPDTimeFrom" 
            size="small" 
            className="col-span-2" 
            value={opd_schedule.OPDTimeFrom} 
            onChange={handleChange} 
            />

            <TextField
            label="OPD Time To" 
            name="OPDTimeTo" 
            size="small" 
            className="col-span-2" 
            value={opd_schedule.OPDTimeTo} 
            onChange={handleChange} 
            />

            <TextField
            type='number'
            label="Available Slots" 
            name="AvailableSlots" 
            size="small" 
            className="col-span-2" 
            value={opd_schedule.AvailableSlots} 
            onChange={handleChange} 
            />

           

          </div> 
             ))}
         
         
          <div className="flex justify-between mt-4">
            <Button variant="outlined" onClick={addMore}>Add More</Button>
          
            <Button variant="contained" color="warning">Save</Button>
 
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




