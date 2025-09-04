import React, { useEffect, useState } from 'react'
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Radio, FormControlLabel, RadioGroup, FormLabel } from '@mui/material';
import api from '../../../api'
import Swal from 'sweetalert2';
import { CloudUpload } from "lucide-react"; 

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


  const handleChange = (e) => {
    const { name, value } = e.target;
    setassetprofile({ ...assetprofile, [name]: value });
  };


 const handleChangeprofile_pic = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  try {
    const formData = new FormData();
    formData.append("file", file); // must match req.files.file in backend

    const resp = await api.post("api/v1/common/AddImage", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // check if API returned success
    if (resp.data?.response?.response_code === "200") {
      const uploadedFile = resp.data.data[0]; // first file
      const imageUrl = uploadedFile.full_URL;

      setassetprofile((prev) => ({
        ...prev,
        ProfilePicture: imageUrl,
      }));
    }
  } catch (error) {
    console.error("Upload error:", error);
  }
};

const handlechange_logo = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  try {
    const formData = new FormData();
    formData.append("file", file); // must match req.files.file in backend

    const resp = await api.post("api/v1/common/AddImage", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // check if API returned success
    if (resp.data?.response?.response_code === "200") {
      const uploadedFile = resp.data.data[0]; // first file
      const imageUrl = uploadedFile.full_URL;

      setassetprofile((prev) => ({
        ...prev,
        Logo: imageUrl,
      }));
    }
  } catch (error) {
    console.error("Upload error:", error);
  }
};

const handlechange_picture_gallary = async (e) => {
  const files = e.target.files;
  if (!files || files.length === 0) return;

  try {
    const formData = new FormData();

    // loop through selected files
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]); // must match backend multer config
    }

    const resp = await api.post("api/v1/common/AddImage", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log(resp);
    
    if (resp.data?.response?.response_code === "200") {
      const uploadedFiles = resp.data.data; // array of files
      const urls = uploadedFiles.map((file) => file.full_URL);

      // if storing in PictureGallery
      setassetprofile((prev) => ({
        ...prev,
        PictureGallery: [...prev.PictureGallery, ...urls],
      }));

      // if it's for single ProfilePicture (just take first file)
      // setassetprofile((prev) => ({ ...prev, ProfilePicture: urls[0] }));
    }
  } catch (error) {
    console.error("Upload error:", error);
  }
};

const handlechange_video_gallary = async (e) => {
  const files = e.target.files;
  if (!files || files.length === 0) return;

  try {
    const formData = new FormData();

    // loop through selected files
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]); // must match backend multer config
    }

    const resp = await api.post("api/v1/common/AddImage", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log(resp);
    
    if (resp.data?.response?.response_code === "200") {
      const uploadedFiles = resp.data.data; // array of files
      const urls = uploadedFiles.map((file) => file.full_URL);

      // if storing in PictureGallery
      setassetprofile((prev) => ({
        ...prev,
        VideoGallery: [...prev.VideoGallery, ...urls],
      }));

      // if it's for single ProfilePicture (just take first file)
      // setassetprofile((prev) => ({ ...prev, ProfilePicture: urls[0] }));
    }
  } catch (error) {
    console.error("Upload error:", error);
  }
};

const handlechange_profile_pdf = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  try {
    const formData = new FormData();
    formData.append("file", file); // must match req.files.file in backend

    const resp = await api.post("api/v1/common/AddImage", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // check if API returned success
    if (resp.data?.response?.response_code === "200") {
      const uploadedFile = resp.data.data[0]; // first file
      const imageUrl = uploadedFile.full_URL;

      setassetprofile((prev) => ({
        ...prev,
        ProfilePDF: imageUrl,
      }));
    }
  } catch (error) {
    console.error("Upload error:", error);
  }
};


const handlechange_bio_video = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  try {
    const formData = new FormData();
    formData.append("file", file); // must match req.files.file in backend

    const resp = await api.post("api/v1/common/AddImage", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // check if API returned success
    if (resp.data?.response?.response_code === "200") {
      const uploadedFile = resp.data.data[0]; // first file
      const imageUrl = uploadedFile.full_URL;

      setassetprofile((prev) => ({
        ...prev,
        VideoBio: imageUrl,
      }));
    }
  } catch (error) {
    console.error("Upload error:", error);
  }
};



const doctor_details=JSON.parse(localStorage.getItem("user"))

 const save_profile_details = async () => {
  try {
    const resp = await api.put(
      `api/v1/asset-sections/profile/${doctor_details._id}`,
      assetprofile,
      { headers: { "Content-Type": "application/json" } }
    );

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

  

<div className="col-span-2 flex items-center gap-3">
  {/* Hidden file input */}
  <input
    type="file"
    id="profile-picture-upload"
    style={{ display: "none" }}
    onChange={handleChangeprofile_pic}

  />

  {/* Cloud upload icon */}
  <label htmlFor="profile-picture-upload" className="cursor-pointer flex items-center gap-2 text-blue-600">
    <CloudUpload size={24} />
    <span>Upload Profile Pic</span>
  </label>

  {/* Show file count */}
  {assetprofile.ProfilePicture && (
    <span className="text-gray-700 font-medium">
      {Array.isArray(assetprofile.ProfilePicture)
        ? `${assetprofile.ProfilePicture.length} file(s) selected`
        : "1 file selected"}
    </span>
  )}
</div>

           
            {/* <TextField
            type='file'
            label="Logo" 
            name="Logo" 
            size="small" 
            className="col-span-2" 
            // value={assetprofile.Logo} 
            InputLabelProps={{ shrink: true }}
            onChange={handlechange_logo} 
            /> */}

            <div className="col-span-2 flex items-center gap-3">
  {/* Hidden file input */}
  <input
    type="file"
    id="logo-upload"
    style={{ display: "none" }}
    onChange={handlechange_logo}

  />

  {/* Cloud upload icon */}
  <label htmlFor="logo-upload" className="cursor-pointer flex items-center gap-2 text-blue-600">
    <CloudUpload size={24} />
    <span>Upload Logo</span>
  </label>

  {/* Show file count */}
  {assetprofile.Logo && (
    <span className="text-gray-700 font-medium">
      {Array.isArray(assetprofile.Logo)
        ? `${assetprofile.Logo.length} file(s) selected`
        : "1 file selected"}
    </span>
  )}
        </div>

            {/* <TextField
            type='file'
            label="Picture Gallery" 
            name="PictureGallery" 
            size="small" 
            className="col-span-2" 
            // value={assetprofile.PictureGallery} 
            inputProps={{ multiple: true }}
            InputLabelProps={{ shrink: true }}
            onChange={handlechange_picture_gallary} 
            /> */}

<div className="col-span-2 flex items-center gap-3">
  {/* Hidden file input */}
  <input
    type="file"
    id="picture-gallary-upload"
    style={{ display: "none" }}
    onChange={handlechange_picture_gallary}
    multiple

  />

  {/* Cloud upload icon */}
  <label htmlFor="picture-gallary-upload" className="cursor-pointer flex items-center gap-2 text-blue-600">
    <CloudUpload size={24} />
    <span>Upload Picture Gallary</span>
  </label>

  {/* Show file count */}
  {assetprofile.PictureGallery && (
    <span className="text-gray-700 font-medium">
      {Array.isArray(assetprofile.PictureGallery)
        ? `${assetprofile.PictureGallery.length} file(s) selected`
        : "1 file selected"}
    </span>
  )}
</div>

            {/* <TextField
            type='file'
            label="Video Gallery" 
            name="VideoGallery" 
            size="small" 
            className="col-span-2" 
            // value={assetprofile.VideoGallery} 
            inputProps={{ multiple: true }}
            InputLabelProps={{ shrink: true }}
            onChange={handlechange_video_gallary} 
            /> */}

  <div className="col-span-2 flex items-center gap-3">
  {/* Hidden file input */}
  <input
    type="file"
    id="video-gallary-upload"
    style={{ display: "none" }}
    onChange={handlechange_video_gallary}
    multiple

  />

  {/* Cloud upload icon */}
  <label htmlFor="video-gallary-upload" className="cursor-pointer flex items-center gap-2 text-blue-600">
    <CloudUpload size={24} />
    <span>Upload Video Gallary</span>
  </label>

  {/* Show file count */}
  {assetprofile.VideoGallery && (
    <span className="text-gray-700 font-medium">
      {Array.isArray(assetprofile.VideoGallery)
        ? `${assetprofile.VideoGallery.length} file(s) selected`
        : "1 file selected"}
    </span>
  )}
</div>

            {/* <TextField
            type='file'
            label="Profile PDF" 
            name="ProfilePDF" 
            size="small" 
            className="col-span-2" 
            // value={assetprofile.ProfilePDF}
            InputLabelProps={{ shrink: true }} 
            onChange={handlechange_profile_pdf} 
            /> */}

  <div className="col-span-2 flex items-center gap-3">
  {/* Hidden file input */}
  <input
    type="file"
    id="pdf-upload"
    style={{ display: "none" }}
    onChange={handlechange_profile_pdf}
    multiple

  />

  {/* Cloud upload icon */}
  <label htmlFor="pdf-upload" className="cursor-pointer flex items-center gap-2 text-blue-600">
    <CloudUpload size={24} />
    <span>Upload Profile Pdf</span>
  </label>

  {/* Show file count */}
  {assetprofile.ProfilePDF && (
    <span className="text-gray-700 font-medium">
      {Array.isArray(assetprofile.ProfilePDF)
        ? `${assetprofile.ProfilePDF.length} file(s) selected`
        : "1 file selected"}
    </span>
  )}
</div>

           {/* <TextField
            type='file'
            label="Video Bio" 
            name="VideoBio" 
            size="small" 
            className="col-span-2" 
            // value={assetprofile.VideoBio}
            InputLabelProps={{ shrink: true }} 
            onChange={handlechange_bio_video} 
            /> */}
<div className="col-span-2 flex items-center gap-3">
  {/* Hidden file input */}
  <input
    type="file"
    id="bio-video-upload"
    style={{ display: "none" }}
    onChange={handlechange_bio_video}
    

  />

  {/* Cloud upload icon */}
  <label htmlFor="bio-video-upload" className="cursor-pointer flex items-center gap-2 text-blue-600">
    <CloudUpload size={24} />
    <span>Upload Bio Video</span>
  </label>

  {/* Show file count */}
  {assetprofile.VideoBio && (
    <span className="text-gray-700 font-medium">
      {Array.isArray(assetprofile.VideoBio)
        ? `${assetprofile.VideoBio.length} file(s) selected`
        : "1 file selected"}
    </span>
  )}
</div>
            

          </div> 
         
         
        <div className="flex justify-end gap-3 mt-4">
                  <Button variant="contained" color="warning" onClick={save_profile_details}>Save</Button>
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
                      <p>
                        Picture Gallery: 
                        <span className="text-[#000000] font-semibold">
                          {assetprofile?.PictureGallery.length > 0
                            ? assetprofile.PictureGallery.map((item, idx) => (
                                <span key={idx} style={{ display: "inline-block", marginRight: "8px" }}>
                                  {item}<br></br>
                                </span>
                              ))
                            : ""}
                        </span>
                      </p>
                              <br></br>
                          <p>
                        Video Gallery: 
                        <span className="text-[#000000] font-semibold">
                          {assetprofile?.VideoGallery.length > 0
                            ? assetprofile.VideoGallery.map((item, idx) => (
                                <span key={idx} style={{ display: "inline-block", marginRight: "8px" }}>
                                  {item}<br></br>
                                </span>
                              ))
                            : ""}
                        </span>
                      </p>
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



