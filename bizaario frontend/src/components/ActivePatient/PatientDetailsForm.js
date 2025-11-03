import React from 'react'
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Box } from '@mui/material';
import userProfile from '../../assets/images/profile-image.png'
import { LuCloudUpload } from "react-icons/lu";
const PatientDetailsForm = ({handleChange, formData, onNext}) => {
  return (
    <>
            <div className=" bg-white p-3 rounded-lg shadow">
        <h3 className="font-semibold text-[16px] mb-3">Patient Details</h3>
        <div className="flex justify-center items-center mb-4">
          <img src={userProfile} alt="" className="img-fluid" />
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <TextField
            label="Name"
            name="name"
            size="small"
            value={formData.name}
            onChange={handleChange}
          />
          <div className="grid grid-cols-2 gap-3 ">
            <TextField
              type="date"
              name="dob"
              label="Date of Birth"
              size="small"
              InputLabelProps={{ shrink: true }}
              value={formData.dob}
              onChange={handleChange}
            />
            <FormControl size="small">
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select labelId="gender-label" label="Gender" name="gender" value={formData.gender} onChange={handleChange}

                MenuProps={{
                  disablePortal: true,
                  disableScrollLock: true,
                }}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
          </div>
          <FormControl size="small">
            <InputLabel id="bg-label">Blood Group</InputLabel>
            <Select labelId="bg-label" label="Blood Group" name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              MenuProps={{
                disablePortal: true,
                disableScrollLock: true,
              }}
            >
              {['', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((bg) => (
                <MenuItem key={bg || 'none'} value={bg}>{bg || 'None'}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField label="Contact Number" name="contactNumber" size="small" value={formData.contactNumber} onChange={handleChange} />
          <TextField label="UHID Number" name="uhid" size="small" value={formData.uhid} onChange={handleChange} />
          <TextField label="ABHA Number" name="abha" size="small" value={formData.abha} onChange={handleChange} />
          <TextField label="Insurer" name="insurer" size="small" value={formData.insurer} onChange={handleChange} />
          <TextField label="Policy Number" name="policyNumber" size="small" value={formData.policyNumber} onChange={handleChange} />
          <TextField label="Emergency Contact Name" name="emergencyContactName" size="small" value={formData.emergencyContactName} onChange={handleChange} />
          <TextField label="Emergency Contact Number" name="emergencyContactNumber" size="small" value={formData.emergencyContactNumber} onChange={handleChange} />
          <FormControl size="small">
            <InputLabel id="nationality-label">Nationality</InputLabel>
            <Select labelId="nationality-label" label="Nationality" name="nationality" value={formData.nationality} onChange={handleChange}
              MenuProps={{
                disablePortal: true,
                disableScrollLock: true,
              }}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="INDIA">INDIA</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small">
            <InputLabel id="panel-label">Patient Panel</InputLabel>
            <Select labelId="panel-label" label="Patient Panel" name="patientPanel" value={formData.patientPanel} onChange={handleChange}
              MenuProps={{
                disablePortal: true,
                disableScrollLock: true,
              }}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="TPA">TPA</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField label="State" name="state" size="small" value={formData.state} onChange={handleChange} />
          <TextField label="City" name="city" size="small" value={formData.city} onChange={handleChange} />
          <TextField label="Zip Code" name="zipCode" size="small" value={formData.zipCode} onChange={handleChange} />
        </div>
        <TextField
          name="address"
          label="Street Address"
          multiline
          minRows={3}
          className="w-full mt-3"
          value={formData.address}
          onChange={handleChange}
        />
        <div className="">
          <div className="py-3">Referral Letter (upload)</div>

          <div className="  border-dashed border-2 p-4 text-center rounded-lg">
            <div className="text-center flex justify-center" >
              <LuCloudUpload />
            </div>
            <Button component="label" size="large">
              <p className="text-sm text-gray-500 mt-2">
                Drag & Drop Or Browse File
              </p>
              <input hidden type="file" name="referralLetter" onChange={handleChange} />
            </Button>

          </div>
        </div>
        <div className="flex justify-end gap-3 mt-4">
          <Button variant="contained" color="warning" onClick={() => onNext && onNext(formData)}>Next</Button>
        </div>
      </div> 
    </>
  )
}

export default PatientDetailsForm
