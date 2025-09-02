import React, { useEffect, useState } from 'react'
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Radio, FormControlLabel, RadioGroup, FormLabel } from '@mui/material';

export default function AssetProfile({ initialData = {}, onPrevious, onNext }) {
  const [assetprofile, setassetprofile] = useState({
    ShortDescription: '',
    LongDescription: '',
    ProfilePicture: '',
    Logo: '',
    PictureGallery: [],
    VideoGallery: [],
    ProfilePDF: '',
    VideoBio: '',
   
  });

  // useEffect(() => {
  //   setData((prev) => ({ ...prev, ...initialData }));
  // }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setassetprofile({ ...assetprofile, [name]: value });
  };

  return (
    <>
      <div className=" grid grid-cols-2 gap-4">
        <div className='bg-white p-3 rounded-lg shadow'>
          <h3 className="font-semibold text-[16px] mb-3">Asset Profile Details </h3>
          <div className="grid grid-cols-2 gap-3">
            <TextField
            label="Short Description" 
            name="ShortDescription" 
            size="small" 
            value={assetprofile.ShortDescription} 
            className="col-span-2"
            onChange={handleChange} 
            />
           
            <TextField
            label="Long Description" 
            name="LongDescription" 
            size="small" 
            className="col-span-2" 
            value={assetprofile.LongDescription} 
            onChange={handleChange} 
            />

            <TextField
            type='file'
            label="ProfilePicture" 
            name="Profile Picture" 
            size="small" 
            className="col-span-2" 
            value={assetprofile.ProfilePicture}
            InputLabelProps={{ shrink: true }} 
            onChange={handleChange} 
            />
           
            <TextField
            type='file'
            label="Logo" 
            name="Logo" 
            size="small" 
            className="col-span-2" 
            value={assetprofile.Logo} 
            InputLabelProps={{ shrink: true }}
            onChange={handleChange} 
            />

            <TextField
            type='file'
            label="Picture Gallery" 
            name="PictureGallery" 
            size="small" 
            className="col-span-2" 
            value={assetprofile.PictureGallery} 
            inputProps={{ multiple: true }}
            InputLabelProps={{ shrink: true }}
            onChange={handleChange} 
            />

            <TextField
            type='file'
            label="Video Gallery" 
            name="VideoGallery" 
            size="small" 
            className="col-span-2" 
            value={assetprofile.VideoGallery} 
            InputLabelProps={{ shrink: true }}
            onChange={handleChange} 
            />

            <TextField
            type='file'
            label="Profile PDF" 
            name="ProfilePDF" 
            size="small" 
            className="col-span-2" 
            value={assetprofile.ProfilePDF}
            InputLabelProps={{ shrink: true }} 
            onChange={handleChange} 
            />

           <TextField
            type='file'
            label="Video Bio" 
            name="VideoBio" 
            size="small" 
            className="col-span-2" 
            value={assetprofile.VideoBio}
            InputLabelProps={{ shrink: true }} 
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
                    <p className="font-semibold">Asset Profile Details</p>
                    {/* <span className="text-gray-500"><TfiAngleUp /></span> */}
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    {/* <img src={userProfile} alt="Patient" className="w-16 h-16 rounded-full object-cover" /> */}
                    <div>
                      <div className="text-sm text-gray-600  flex-wrap gap-x-6 text-[12px]">
                        <p>ShortDescription : <span  className="text-[#000000] font-semibold">{assetprofile?.ShortDescription || ""}</span></p><br></br>
                        <p>LongDescription : <span  className="text-[#000000] font-semibold">{assetprofile?.LongDescription || ""}</span></p><br></br>
                        <p>ProfilePicture : <span  className="text-[#000000] font-semibold">{assetprofile?.ProfilePicture || ""}</span></p><br></br>
                        <p>Logo : <span  className="text-[#000000] font-semibold">{assetprofile?.Logo || ""}</span></p><br></br>
                        <p>Picture Gallery : <span  className="text-[#000000] font-semibold">{assetprofile?.PictureGallery || ""}</span></p><br></br>
                        <p>Video Gallery : <span  className="text-[#000000] font-semibold">{assetprofile?.VideoGallery || ""}</span></p><br></br>
                        <p>Profile PDF : <span  className="text-[#000000] font-semibold">{assetprofile?.ProfilePDF || ""}</span></p><br></br>
                        <p>Video Bio : <span  className="text-[#000000] font-semibold">{assetprofile?.VideoBio || ""}</span></p>
                      </div>
                    </div>
                  </div>
      
                
                </div>


      </div>

     

    </>
    )
}



