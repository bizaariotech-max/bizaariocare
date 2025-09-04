import React, { useEffect, useState } from 'react'
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Radio, FormControlLabel, RadioGroup, FormLabel } from '@mui/material';
import api from '../../../api'
import Swal from 'sweetalert2';
import { CloudUpload } from "lucide-react"; 

export default function TreatmentPackages({ initialData = {}, onPrevious, onNext }) {
  const [TreatmentPackages, setTreatmentPackages] = useState([{
    PackageAnnouncementDate: '',
    PackageName: '',
    PackageCurrency: '',
    PackagePrice: '',
    Discount: '',
    DiscountValidity: '',
    PackageImage: '',
    ShortDescription:'',
    LongDescription:''
   
  }]);

  // useEffect(() => {
  //   setData((prev) => ({ ...prev, ...initialData }));
  // }, [initialData]);

  const handleChange = async (index, e) => {
  const { name, value, files } = e.target;
  const newPackages = [...TreatmentPackages];

  if (files) {
    try {
      const formData = new FormData();
      formData.append("file", files[0]); // single file per PackageImage

      const resp = await api.post("api/v1/common/AddImage", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(resp);
      

      if (resp.data?.response?.response_code === "200") {
        const uploadedFile = resp.data.data[0];
        const imageUrl = uploadedFile.full_URL;

        newPackages[index][name] = imageUrl; // save URL instead of File object
        setTreatmentPackages(newPackages);
      }
    } catch (error) {
      console.error("Image upload error:", error);
    }
  } else {
    // regular text input
    newPackages[index][name] = value;
    setTreatmentPackages(newPackages);
  }
};


    // Add new package form
  const addMore = () => {
    setTreatmentPackages([
      ...TreatmentPackages,
      {
        PackageAnnouncementDate: '',
        PackageName: '',
        PackageCurrency: '',
        PackagePrice: '',
        Discount: '',
        DiscountValidity: '',
        PackageImage: '',
        ShortDescription: '',
        LongDescription: '',
      },
    ]);
  };

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

 const save_treatement_packages = async () => {
  try {
    const resp = await api.post(
      `api/v1/asset-sections/treatment-packages/${doctor_details._id}`,
      TreatmentPackages,
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

console.log(TreatmentPackages);


  return (
    <>

    
      <div className=" grid grid-cols-2 gap-4">
        <div className='bg-white p-3 rounded-lg shadow'>
           {TreatmentPackages?.map((pkg, index) => (
          <div className="grid grid-cols-2 gap-3" style={{marginTop:"25px"}}>
          <h3 className="font-semibold text-[16px] mb-1 col-span-2">Treatment Packages Details</h3>
            <TextField
            type='date'
            label="Package Announcement Date" 
            name="PackageAnnouncementDate" 
            size="small" 
            value={pkg.PackageAnnouncementDate} 
            InputLabelProps={{ shrink: true }}
            className="col-span-2"
            onChange={(e)=>handleChange(index,e)} 
            />
           
            <TextField
            label="Packag Name" 
            name="PackageName" 
            size="small" 
            className="col-span-2" 
            value={pkg.PackageName} 
            onChange={(e)=>handleChange(index,e)}  
            />

          <FormControl fullWidth size="small"  className="col-span-2">
              <InputLabel>Package Currency</InputLabel>
              <Select
                name="PackageCurrency"
                label="Package Currency"
                value={pkg.PackageCurrency}
                onChange={(e)=>handleChange(index,e)} 
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
            label="Package Price" 
            name="PackagePrice" 
            size="small" 
            className="col-span-2" 
            value={pkg.PackagePrice} 
            onChange={(e)=>handleChange(index,e)}  
            />

            <TextField
            label="Discount" 
            name="Discount" 
            size="small" 
            className="col-span-2" 
            value={pkg.Discount} 
            onChange={(e)=>handleChange(index,e)}  
            />

            <TextField
            type='date'
            label="Discount Validity" 
            name="DiscountValidity" 
            size="small" 
            className="col-span-2" 
            value={pkg.DiscountValidity}
            InputLabelProps={{ shrink: true }} 
            onChange={(e)=>handleChange(index,e)}  
            />

        
            {/* <TextField
            type='file'
            label="Package Image" 
            name="PackageImage" 
            size="small" 
            className="col-span-2" 
            // value={TreatmentPackages.PackageImage} 
            // inputProps={{ multiple: true }}
            InputLabelProps={{ shrink: true }}
            onChange={(e)=>handleChange(index,e)}  
            /> */}

  <div className="col-span-2 flex items-center gap-3">
  {/* Hidden file input */}
  <input
    name="PackageImage" 
    type="file"
    id={`package-image-upload-${index}`}
    style={{ display: "none" }}
    onChange={(e) => handleChange(index, e)}
    // multiple // uncomment if multiple files needed
  />

  {/* Cloud upload icon */}
  <label
    htmlFor={`package-image-upload-${index}`}
    className="cursor-pointer flex items-center gap-2 text-blue-600"
  >
    <CloudUpload size={24} />
    <span>Upload Package Image</span>
  </label>

  {/* Show selected file name */}
  {pkg.PackageImage && (
    <span className="text-gray-700 font-medium">
      1 file selected
    </span>
  )}
</div>


            <TextField
            label="Short Description" 
            name="ShortDescription" 
            size="small" 
            className="col-span-2" 
            value={pkg.ShortDescription} 
            onChange={(e)=>handleChange(index,e)}  
            />

            <TextField
            label="Long Description" 
            name="LongDescription" 
            size="small" 
            className="col-span-2" 
            value={pkg.LongDescription} 
            onChange={(e)=>handleChange(index,e)}  
            />


          </div> 
             ))}
         
         
          <div className="flex justify-between mt-4">
            <Button variant="outlined" onClick={addMore}>Add More</Button>
           
              <Button variant="contained" color="warning" onClick={save_treatement_packages}>Save</Button>
                
          </div>
        </div> 

           <div className="bg-white rounded-xl shadow p-4">
                  <h3 className="font-semibold mb-4">Preview</h3>
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-semibold">Treatment Packages Details</p>
                    {/* <span className="text-gray-500"><TfiAngleUp /></span> */}
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    {/* <img src={userProfile} alt="Patient" className="w-16 h-16 rounded-full object-cover" /> */}
                    <div>
                      {/* <p className="font-semibold text-[20px]">{formData?.name || "Patient Name"}</p> */}
                     
                    {TreatmentPackages.map((pkg, index) => (
                      <div className="text-sm text-gray-600  flex-wrap gap-x-6 text-[12px]">
                        <p>Package Announcement Date : <span  className="text-[#000000] font-semibold">{pkg?.PackageAnnouncementDate || ""}</span></p><br></br>
                        <p>Package Name : <span  className="text-[#000000] font-semibold">{pkg?.PackageName || ""}</span></p><br></br>
                        <p>Package Currency : <span  className="text-[#000000] font-semibold">{pkg?.PackageCurrency || ""}</span></p><br></br>
                        <p>Package Price : <span  className="text-[#000000] font-semibold">{pkg?.PackagePrice || ""}</span></p><br></br>
                        <p>Discount : <span  className="text-[#000000] font-semibold">{pkg?.Discount || ""}</span></p><br></br>
                        <p>Discount Validity : <span  className="text-[#000000] font-semibold">{pkg?.DiscountValidity || ""}</span></p><br></br>
                        <p>PackageImage : <span  className="text-[#000000] font-semibold">{pkg?.PackageImage || ""}</span></p><br></br>
                        <p>Short Description : <span  className="text-[#000000] font-semibold">{pkg?.ShortDescription || ""}</span></p><br></br>
                        <p>Long Description : <span  className="text-[#000000] font-semibold">{pkg?.LongDescription || ""}</span></p><br></br>
                      </div>
                    ))}
                    </div>
                  </div>
      
                
                </div>


      </div>

     

    </>
    )
}



