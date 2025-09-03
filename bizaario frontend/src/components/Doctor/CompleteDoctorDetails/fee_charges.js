import React, { useEffect, useState } from 'react'
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Radio, FormControlLabel, RadioGroup, FormLabel } from '@mui/material';
import api from '../../../api'
import Swal from 'sweetalert2';

export default function FeeCharges({ initialData = {}, onPrevious, onNext }) {
  const [feecharges, setfeecharges] = useState([{
    ServiceCategory: null,
    FeeCurrency: null,
    FeeAmount: '',
  }]);



const handleChange = (index, field, value) => {
  const updated = [...feecharges];
  updated[index][field] = value;
  setfeecharges(updated);
};


  
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

//====================================== get all currency type=======================================

   const[all_currency,setall_currency]=useState([])
      const get_all_currency=async()=>
      {
        try {
          const resp=await api.post('api/v1/admin/LookupList',{ lookupcodes:"currency_type"})
          setall_currency(resp.data.data)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        get_all_currency()
    
      },[])



  const doctor_details=JSON.parse(localStorage.getItem("user"))

 const save_fee_details = async () => {
  try {
    const resp = await api.post(
      `api/v1/asset-sections/fees-charges/${doctor_details._id}`,
      feecharges,
      { headers: { "Content-Type": "application/json" } }
    );

    console.log(resp);
    
    // Check response_code instead of HTTP status
    if (resp.data?.response?.response_code === "200") {
      Swal.fire({
        icon: "success",
        title: "Details Updated",
        text: "Doctor Social Media Details Updated Successfully...",
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
           {feecharges.map((fee, index) => (
          <div className="grid grid-cols-2 gap-3" style={{marginTop:"25px"}}>
          <h3 className="font-semibold text-[16px] mb-1 col-span-2">Fee And Charges Details</h3>
         
          <FormControl fullWidth size="small"  className="col-span-2">
              <InputLabel>Service Category</InputLabel>
              <Select
                name="ServiceCategory"
                label="Service Category"
                value={fee.ServiceCategory}
                onChange={(e) => handleChange(index, e.target.name, e.target.value)}
                MenuProps={{
                  disablePortal: true,
                  disableScrollLock: true,
                }}
              >

                {
                  allservice.map((item)=>
                  (
                     <MenuItem value={item._id}>{item.lookup_value}</MenuItem>
                  ))
                }
               
              </Select>
            </FormControl>

            <FormControl fullWidth size="small"  className="col-span-2">
              <InputLabel>Fee Currency</InputLabel>
              <Select
                name="FeeCurrency"
                label="Fee Currency"
                value={fee.FeeCurrency}
                onChange={(e) => handleChange(index, e.target.name, e.target.value)}
                MenuProps={{
                  disablePortal: true,
                  disableScrollLock: true,
                }}
              >
                {
                  all_currency.map((item)=>
                  (
                     <MenuItem value={item._id}>{item.lookup_value}</MenuItem>
                  ))
                }
          
              </Select>
            </FormControl>
           
            <TextField
            label="Fee Amount" 
            name="FeeAmount" 
            size="small" 
            className="col-span-2" 
            value={fee.FeeAmount} 
            onChange={(e) => handleChange(index, e.target.name, e.target.value)} 
            />

           

          </div> 
             ))}
         
         
          <div className="flex justify-between mt-4">
            <Button variant="outlined" onClick={addMore}>Add More</Button>
          
            <Button variant="contained" color="warning" onClick={save_fee_details}>Save</Button>
                
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




