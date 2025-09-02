import React, { useEffect, useState } from 'react'
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Radio, FormControlLabel, RadioGroup, FormLabel } from '@mui/material';

export default function FeeCharges({ initialData = {}, onPrevious, onNext }) {
  const [feecharges, setfeecharges] = useState([{
    ServiceCategory: null,
    FeeCurrency: null,
    FeeAmount: '',
  }]);



  const handleChange = (index, e) => {
    const { name, value, files } = e.target;
    const newcharges = [...feecharges];

    newcharges[index][name] = value;

    setfeecharges(newcharges);
  }
  
    // Add new package form
  const addMore = () => {
    setfeecharges([
      ...feecharges,
      {
        ServiceCategory: '',
        FeeCurrency: '',
        FeeAmount: '',
      },
    ]);
  };


  return (
    <>

    
      <div className=" grid grid-cols-2 gap-4">
        <div className='bg-white p-3 rounded-lg shadow'>
           {feecharges.map((fee, index) => (
          <div className="grid grid-cols-2 gap-3" style={{marginTop:"25px"}}>
          <h3 className="font-semibold text-[16px] mb-1 col-span-2">Fee And Charges Details</h3>
         
          <FormControl fullWidth size="small"  className="col-span-2">
              <InputLabel>Service Category</InputLabel>
              <Select
                name="ServiceCategory"
                label="Service Category"
                value={feecharges.ServiceCategory}
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

            <FormControl fullWidth size="small"  className="col-span-2">
              <InputLabel>Fee Currency</InputLabel>
              <Select
                name="FeeCurrency"
                label="Fee Currency"
                value={feecharges.FeeCurrency}
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
            label="Fee Amount" 
            name="FeeAmount" 
            size="small" 
            className="col-span-2" 
            value={feecharges.FeeAmount} 
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
                    <p className="font-semibold">Charges And Fee Details</p>
                    {/* <span className="text-gray-500"><TfiAngleUp /></span> */}
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    {/* <img src={userProfile} alt="Patient" className="w-16 h-16 rounded-full object-cover" /> */}
                    <div>
                     
                     
                    {feecharges.map((fee, index) => (
                      <div className="text-sm text-gray-600  flex-wrap gap-x-6 text-[12px]">
                        <p>Service Category : <span  className="text-[#000000] font-semibold">{feecharges?.ServiceCategory || ""}</span></p><br></br>
                        <p>Fee Currency : <span  className="text-[#000000] font-semibold">{feecharges?.FeeCurrency || ""}</span></p><br></br>
                        <p>Fee Amount : <span  className="text-[#000000] font-semibold">{feecharges?.FeeAmount || ""}</span></p><br></br>
                       
                      </div>
                    ))}
                    </div>
                  </div>
      
                
                </div>


      </div>

     

    </>
    )
}




