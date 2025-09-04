import React, { useEffect, useState } from 'react'
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Radio, FormControlLabel, RadioGroup, FormLabel } from '@mui/material';
import api from '../../../api'
import Swal from 'sweetalert2';

export default function BankDetails({ initialData = {}, onPrevious, onNext }) {
  const [bankdetails, setbankdetails] = useState({
    AccountName: '',
    AccountNumber: '',
    BankName: '',
    SwiftIFSCCode: '',
    PaymentQRCode: '',
    OnlinePaymentURL: '',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setbankdetails({ ...bankdetails, [name]: value });
  };

  
const doctor_details=JSON.parse(localStorage.getItem("user"))

 const save_bank_details = async () => {
  try {
    const resp = await api.put(
      `api/v1/asset-sections/bank-details/${doctor_details._id}`,
      bankdetails,
      { headers: { "Content-Type": "application/json" } }
    );

    // Check response_code instead of HTTP status
    if (resp.data?.response?.response_code === "200") {
      Swal.fire({
        icon: "success",
        title: "Details Updated",
        text: "Doctor Bank Details Updated Successfully...",
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
 

//=================================== get bank details=========================================

const get_bank_details=async()=>
  {
    try {
      const resp=await api.get(`api/v1/asset-sections/bank-details/${doctor_details._id}`)
         if (resp.data?.data) {
          const { _id, ...rest } = resp.data.data;
          setbankdetails(rest);
        }
    } catch (error) {
      console.log(error);
      
    }
  }
  
  useEffect(()=>
  {
    get_bank_details()
  },[])


  return (
    <>

    
      <div className=" grid grid-cols-2 gap-4">
        <div className='bg-white p-3 rounded-lg shadow'>
          <div className="grid grid-cols-2 gap-3" style={{marginTop:"25px"}}>
          <h3 className="font-semibold text-[16px] mb-1 col-span-2">Bank Details</h3>
            <TextField
            label="Account Name" 
            name="AccountName" 
            size="small" 
            value={bankdetails.AccountName} 
            className="col-span-2"
            onChange={handleChange} 
            />
           
            <TextField
            label="Account Number" 
            name="AccountNumber" 
            size="small" 
            className="col-span-2" 
            value={bankdetails.AccountNumber} 
            onChange={handleChange} 
            />

         
            <TextField
            label="Bank Name" 
            name="BankName" 
            size="small" 
            className="col-span-2" 
            value={bankdetails.BankName} 
            onChange={handleChange} 
            />

            <TextField
            label="Swift IFSCCode" 
            name="SwiftIFSCCode" 
            size="small" 
            className="col-span-2" 
            value={bankdetails.SwiftIFSCCode} 
            onChange={handleChange} 
            />

            <TextField
            label="Payment QR Code" 
            name="PaymentQRCode" 
            size="small" 
            className="col-span-2" 
            value={bankdetails.PaymentQRCode}
            onChange={handleChange} 
            />

        
            <TextField
            label="Online Payment URL" 
            name="OnlinePaymentURL" 
            size="small" 
            className="col-span-2" 
            value={bankdetails.OnlinePaymentURL} 
            onChange={handleChange} 
            />

          </div> 
       
         
         
         <div className="flex justify-end gap-3 mt-4">
                   <Button variant="contained" color="warning" onClick={save_bank_details}>Save</Button>
          </div>
        </div> 

           <div className="bg-white rounded-xl shadow p-4">
                  <h3 className="font-semibold mb-4">Preview</h3>
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-semibold">Bank Details</p>
                    {/* <span className="text-gray-500"><TfiAngleUp /></span> */}
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    {/* <img src={userProfile} alt="Patient" className="w-16 h-16 rounded-full object-cover" /> */}
                    <div>
                      {/* <p className="font-semibold text-[20px]">{formData?.name || "Patient Name"}</p> */}
                     
                      <div className="text-sm text-gray-600  flex-wrap gap-x-6 text-[12px]">
                        <p>Account Name : <span  className="text-[#000000] font-semibold">{bankdetails?.AccountName || ""}</span></p><br></br>
                        <p>Account Number : <span  className="text-[#000000] font-semibold">{bankdetails?.AccountNumber || ""}</span></p><br></br>
                        <p>Bank Name : <span  className="text-[#000000] font-semibold">{bankdetails?.BankName || ""}</span></p><br></br>
                        <p>Swift IFSCCode : <span  className="text-[#000000] font-semibold">{bankdetails?.SwiftIFSCCode || ""}</span></p><br></br>
                        <p>Payment QR Code : <span  className="text-[#000000] font-semibold">{bankdetails?.PaymentQRCode || ""}</span></p><br></br>
                        <p>Online Payment URL : <span  className="text-[#000000] font-semibold">{bankdetails?.OnlinePaymentURL || ""}</span></p><br></br>

                      </div>
             
                    </div>
                  </div>
      
                
                </div>


      </div>

     

    </>
    )
}



