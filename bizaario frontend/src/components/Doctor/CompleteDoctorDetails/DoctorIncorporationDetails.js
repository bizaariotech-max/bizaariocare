import React from 'react'
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Box } from '@mui/material';
import userProfile from '../../../assets/images/profile-image.png'
import { LuCloudUpload } from "react-icons/lu";



const DoctorIncorporationDetails = ({handleChange, incorporationdetails, onNext}) => {


  return (
    <>
            <div className=" bg-white p-3 rounded-lg shadow">
        <h3 className="font-semibold text-[16px] mb-3">Incorporation Details</h3>
        <div className="flex justify-center items-center mb-4">
          {/* <img src={userProfile} alt="" className="img-fluid" /> */}
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <TextField
            label="Registration Body"
            name="RegistrationBody"
            size="small"
            value={incorporationdetails?.RegistrationBody}
            onChange={handleChange}
          />
         
          <TextField
           label="Registration Certificate"
            name="RegistrationCertificate"
            size="small"
            value={incorporationdetails?.RegistrationCertificate}
            onChange={handleChange}
             />
            
          <TextField
           label="Registration Year"
           type='number'
          name="RegistrationYear"
          size="small" 
          value={incorporationdetails?.RegistrationYear} 
          onChange={handleChange} 
          />
          <TextField
          label="Registration Number" 
          name="RegistrationNumber" 
          size="small" 
          value={incorporationdetails?.RegistrationNumber} 
          onChange={handleChange} 
          />
          <TextField
          label="Validity Expiry" 
          type='date'
          InputLabelProps={{ shrink: true }}
          name="ValidityExpiry" 
          size="small" 
          value={incorporationdetails?.ValidityExpiry} 
          onChange={handleChange} 
          />
         
        </div>
     
     
        <div className="flex justify-end gap-3 mt-4">
          <Button variant="contained" color="warning">Save</Button>
        </div>
      </div> 
    </>
  )
}

export default DoctorIncorporationDetails
