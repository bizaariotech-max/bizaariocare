import React, { useEffect, useState } from 'react'
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Radio, FormControlLabel, RadioGroup, FormLabel } from '@mui/material';

export default function HospitalSizeDetails({ initialData = {}, onPrevious, onNext }) {
  const [hospital_size, sethospital_size] = useState({
    NumberOfDepartments: '',
    NumberOfDoctors: '',
    NumberOfConsultingPhysicians: '',
    NumberOfNursingStaff: '',
    NumberOfBeds: '',
    NumberOfICUBeds: '',
    NumberOfOTs: '',
   
  });

  // useEffect(() => {
  //   setData((prev) => ({ ...prev, ...initialData }));
  // }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    sethospital_size({ ...hospital_size, [name]: value });
  };

  return (
    <>
      <div className=" grid grid-cols-2 gap-4">
        <div className='bg-white p-3 rounded-lg shadow'>
          <h3 className="font-semibold text-[16px] mb-3">Hospital Size</h3>
          <div className="grid grid-cols-2 gap-3">
            <TextField
            type='number'
            label="Number Of Departments" 
            name="NumberOfDepartments" 
            size="small" 
            value={hospital_size.height} 
            className="col-span-2"
            onChange={handleChange} 
            />
           
            <TextField
            type='number'
            label="Number Of Doctors" 
            name="NumberOfDoctors" 
            size="small" 
            className="col-span-2" 
            value={hospital_size.bmi} 
            onChange={handleChange} 
            />

              <TextField
            type='number'
            label="Number Of Consulting Physicians" 
            name="NumberOfConsultingPhysicians" 
            size="small" 
            className="col-span-2" 
            value={hospital_size.bmi} 
            onChange={handleChange} 
            />
           
                 <TextField
            type='number'
            label="Number Of Nursing Staff" 
            name="NumberOfNursingStaff" 
            size="small" 
            className="col-span-2" 
            value={hospital_size.bmi} 
            onChange={handleChange} 
            />

            <TextField
            type='number'
            label="Number Of Beds" 
            name="NumberOfBeds" 
            size="small" 
            className="col-span-2" 
            value={hospital_size.bmi} 
            onChange={handleChange} 
            />

            <TextField
            type='number'
            label="Number Of ICU Beds" 
            name="NumberOfICUBeds" 
            size="small" 
            className="col-span-2" 
            value={hospital_size.bmi} 
            onChange={handleChange} 
            />

            <TextField
            type='number'
            label="Number Of OTs" 
            name="NumberOfOTs" 
            size="small" 
            className="col-span-2" 
            value={hospital_size.bmi} 
            onChange={handleChange} 
            />


          </div> 
         
         
          <div className="flex justify-end gap-3 mt-4">
           <Button variant="contained" color="warning">Save</Button>
         </div>
        </div> 

           <div className="bg-white rounded-xl shadow p-4">
                  <h3 className="font-semibold mb-4">Preview</h3>
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-semibold">Hospital Size Details</p>
                    {/* <span className="text-gray-500"><TfiAngleUp /></span> */}
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    {/* <img src={userProfile} alt="Patient" className="w-16 h-16 rounded-full object-cover" /> */}
                    <div>
                      {/* <p className="font-semibold text-[20px]">{formData?.name || "Patient Name"}</p> */}
                      <div className="text-sm text-gray-600  flex-wrap gap-x-6 text-[12px]">
                        <p>Number Of Departments : <span  className="text-[#000000] font-semibold">{hospital_size?.NumberOfDepartments || ""}</span></p><br></br>
                        <p>Number Of Doctors : <span  className="text-[#000000] font-semibold">{hospital_size?.NumberOfDoctors || ""}</span></p><br></br>
                        <p>Number Of Consulting Physicians : <span  className="text-[#000000] font-semibold">{hospital_size?.NumberOfConsultingPhysicians || ""}</span></p><br></br>
                        <p>Number Of Nursing Staff : <span  className="text-[#000000] font-semibold">{hospital_size?.NumberOfNursingStaff || ""}</span></p><br></br>
                        <p>Number Of Beds : <span  className="text-[#000000] font-semibold">{hospital_size?.NumberOfBeds || ""}</span></p><br></br>
                        <p>Number Of ICU Beds : <span  className="text-[#000000] font-semibold">{hospital_size?.NumberOfICUBeds || ""}</span></p><br></br>
                        <p>Number Of OTs : <span  className="text-[#000000] font-semibold">{hospital_size?.NumberOfOTs || ""}</span></p>
                      </div>
                    </div>
                  </div>
      
                
                </div>


      </div>

     

    </>
    )
}



