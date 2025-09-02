import React, { useEffect, useState } from 'react'
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Radio, FormControlLabel, RadioGroup, FormLabel } from '@mui/material';

export default function OnlineClinicLink({ initialData = {}, onPrevious, onNext }) {
  const [OnlineClinicLink, setOnlineClinicLink] = useState('');



const handleChange = (e) => {
  const { value } = e.target;
  setOnlineClinicLink(value); // just store the value directly
};

 


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
            value={OnlineClinicLink} 
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
                    <p className="font-semibold">Online Clinic Link</p>
                    {/* <span className="text-gray-500"><TfiAngleUp /></span> */}
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    {/* <img src={userProfile} alt="Patient" className="w-16 h-16 rounded-full object-cover" /> */}
                    <div>
                     
                      <div className="text-sm text-gray-600  flex-wrap gap-x-6 text-[12px]">
                        <p>Online Clinic Link : <span  className="text-[#000000] font-semibold">{OnlineClinicLink || ""}</span></p><br></br>
                       
                      </div>
             
                    </div>
                  </div>
      
                
                </div>


      </div>

     

    </>
    )
}




