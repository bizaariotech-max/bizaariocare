import React, { useEffect, useState } from 'react'
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Radio, FormControlLabel, RadioGroup, FormLabel } from '@mui/material';

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

  const handleChange = (index, e) => {
    const { name, value, files } = e.target;
    const newPackages = [...TreatmentPackages];
    
    // handle file input
    if (files) {
      newPackages[index][name] = Array.from(files);
    } else {
      newPackages[index][name] = value;
    }

    setTreatmentPackages(newPackages);
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


  return (
    <>

    
      <div className=" grid grid-cols-2 gap-4">
        <div className='bg-white p-3 rounded-lg shadow'>
           {TreatmentPackages.map((pkg, index) => (
          <div className="grid grid-cols-2 gap-3" style={{marginTop:"25px"}}>
          <h3 className="font-semibold text-[16px] mb-1 col-span-2">Treatment Packages Details</h3>
            <TextField
            type='date'
            label="Package Announcement Date" 
            name="PackageAnnouncementDate" 
            size="small" 
            value={TreatmentPackages.PackageAnnouncementDate} 
            InputLabelProps={{ shrink: true }}
            className="col-span-2"
            onChange={handleChange} 
            />
           
            <TextField
            label="Packag eName" 
            name="PackageName" 
            size="small" 
            className="col-span-2" 
            value={TreatmentPackages.PackageName} 
            onChange={handleChange} 
            />

          <FormControl fullWidth size="small"  className="col-span-2">
              <InputLabel>Medical Specialties</InputLabel>
              <Select
                name="PackageCurrency"
                label="Package Currency"
                value={TreatmentPackages.PackageCurrency}
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
            label="Package Price" 
            name="PackagePrice" 
            size="small" 
            className="col-span-2" 
            value={TreatmentPackages.PackagePrice} 
            onChange={handleChange} 
            />

            <TextField
            label="Discount" 
            name="Discount" 
            size="small" 
            className="col-span-2" 
            value={TreatmentPackages.Discount} 
            onChange={handleChange} 
            />

            <TextField
            type='date'
            label="Discount Validity" 
            name="DiscountValidity" 
            size="small" 
            className="col-span-2" 
            value={TreatmentPackages.DiscountValidity}
            InputLabelProps={{ shrink: true }} 
            onChange={handleChange} 
            />

        
            <TextField
            type='file'
            label="Package Image" 
            name="PackageImage" 
            size="small" 
            className="col-span-2" 
            value={TreatmentPackages.PackageImage} 
            inputProps={{ multiple: true }}
            InputLabelProps={{ shrink: true }}
            onChange={handleChange} 
            />

            <TextField
            label="Short Description" 
            name="ShortDescription" 
            size="small" 
            className="col-span-2" 
            value={TreatmentPackages.ShortDescription} 
            onChange={handleChange} 
            />

            <TextField
            label="Long Description" 
            name="LongDescription" 
            size="small" 
            className="col-span-2" 
            value={TreatmentPackages.LongDescription} 
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
                    <p className="font-semibold">Treatment Packages Details</p>
                    {/* <span className="text-gray-500"><TfiAngleUp /></span> */}
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    {/* <img src={userProfile} alt="Patient" className="w-16 h-16 rounded-full object-cover" /> */}
                    <div>
                      {/* <p className="font-semibold text-[20px]">{formData?.name || "Patient Name"}</p> */}
                     
                    {TreatmentPackages.map((pkg, index) => (
                      <div className="text-sm text-gray-600  flex-wrap gap-x-6 text-[12px]">
                        <p>Package Announcement Date : <span  className="text-[#000000] font-semibold">{TreatmentPackages?.PackageAnnouncementDate || ""}</span></p><br></br>
                        <p>Package Name : <span  className="text-[#000000] font-semibold">{TreatmentPackages?.PackageName || ""}</span></p><br></br>
                        <p>Package Currency : <span  className="text-[#000000] font-semibold">{TreatmentPackages?.PackageCurrency || ""}</span></p><br></br>
                        <p>Package Price : <span  className="text-[#000000] font-semibold">{TreatmentPackages?.PackagePrice || ""}</span></p><br></br>
                        <p>Discount : <span  className="text-[#000000] font-semibold">{TreatmentPackages?.Discount || ""}</span></p><br></br>
                        <p>Discount Validity : <span  className="text-[#000000] font-semibold">{TreatmentPackages?.DiscountValidity || ""}</span></p><br></br>
                        <p>PackageImage : <span  className="text-[#000000] font-semibold">{TreatmentPackages?.PackageImage || ""}</span></p><br></br>
                        <p>Short Description : <span  className="text-[#000000] font-semibold">{TreatmentPackages?.ShortDescription || ""}</span></p><br></br>
                        <p>Long Description : <span  className="text-[#000000] font-semibold">{TreatmentPackages?.LongDescription || ""}</span></p><br></br>
                      </div>
                    ))}
                    </div>
                  </div>
      
                
                </div>


      </div>

     

    </>
    )
}



