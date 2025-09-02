import React, { useEffect, useState } from 'react'
import { TextField,Grid, Select, MenuItem, FormControl, InputLabel, Button, Radio, FormControlLabel, RadioGroup, FormLabel } from '@mui/material';

export default function MedicalSpecialties({ initialData = {}, onPrevious, onNext }) {
  const [MedicalSpecialties, setMedicalSpecialties] = useState("");

  // useEffect(() => {
  //   setData((prev) => ({ ...prev, ...initialData }));
  // }, [initialData]);

const handleChange = (e) => {
  const { value } = e.target;
  setMedicalSpecialties(value); // just store the value directly
};


  return (
    <>
      <div className=" grid grid-cols-2 gap-4">
        <div className='bg-white p-3 rounded-lg shadow'>
          <h3 className="font-semibold text-[16px] mb-3">Medical Specialties</h3>
          <div className="grid grid-cols-2 gap-3">
         
     
  <FormControl fullWidth size="small"  className="col-span-2">
    <InputLabel>Medical Specialties</InputLabel>
    <Select
      name="MedicalSpecialties"
      label="Medical Specialties"
      value={MedicalSpecialties}
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




          </div> 
         
         
      <div className="flex justify-end gap-3 mt-4">
                <Button variant="contained" color="warning">Save</Button>
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
                        <p>Medical Specialties : <span  className="text-[#000000] font-semibold">{MedicalSpecialties || ""}</span></p><br></br>
                       
                      </div>
                    </div>
                  </div>
      
                
                </div>


      </div>

     

    </>
    )
}



