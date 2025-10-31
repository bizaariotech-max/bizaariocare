import React, { useEffect, useState } from 'react'
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Radio, FormControlLabel, RadioGroup, FormLabel } from '@mui/material';

export default function PersonalProfile({ initialData = {}, onPrevious, onNext }) {
  const [data, setData] = useState({
    height: '',
    weight: '',
    bmi: '',
    maritalStatus: '',
    pregnancies: '',
    miscarriages: '',
    stillbirths: '',
    children: '',
    walkingImpairment: 'No',
    bodySensationAbnormality: 'No',
    speechImpairment: 'No',
    bodyShaking: 'No',
    abnormalHairGrowthLoss: 'No',
    facialDeformity: 'No',
    otherDisability: '',
  });

  useEffect(() => {
    setData((prev) => ({ ...prev, ...initialData }));
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <>
      <div className=" grid grid-cols-2 gap-4">
        <div className='bg-white p-3 rounded-lg shadow'>
          <h3 className="font-semibold text-[16px] mb-3">Personal Profile</h3>
          <div className="grid grid-cols-2 gap-3">
            <TextField label="Height" name="height" size="small" value={data.height} onChange={handleChange} />
            <TextField label="Weight" name="weight" size="small" value={data.weight} onChange={handleChange} />
            <TextField label="Body mass Index (BMI)" name="bmi" size="small" className="col-span-2" value={data.bmi} onChange={handleChange} />
            <TextField label="Marital Status" name="maritalStatus" size="small" className="col-span-2" value={data.maritalStatus} onChange={handleChange} />
            <TextField label="No. of Pregnancies" name="pregnancies" size="small" value={data.pregnancies} onChange={handleChange} />
            <TextField label="No. of Miscarriages" name="miscarriages" size="small" value={data.miscarriages} onChange={handleChange} />
            <TextField label="No. of Stillbirths" name="stillbirths" size="small" value={data.stillbirths} onChange={handleChange} />
            <TextField label="Number of Children" name="children" size="small" value={data.children} onChange={handleChange} />
          </div> 
          <div className=" mt-3 mb-2 text-sm">
            <div className='flex justify-between'>
              <div className='flex items-center'>
                <FormLabel id="walk-label" sx={{ fontSize: '14px' }}>Walking Impairment?</FormLabel>
              </div>
              <FormControl size="small">
                <RadioGroup
                  row
                  aria-labelledby="walk-label"

                  name="radio-buttons-group"
                  className='inline'
                >
                  <FormControlLabel value="yes" control={<Radio sx={{ color: "#525fe1", '& .MuiSvgIcon-root': { fontSize: 20, }, }} />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio sx={{ color: "#525fe1", '& .MuiSvgIcon-root': { fontSize: 20, }, }} />} label="No" />

                </RadioGroup>
              </FormControl>
            </div>

            <div className='flex justify-between'>
              <div className='flex items-center'>
                <FormLabel id="bsa" sx={{ fontSize: '14px' }}>Body Sensation Abnormality?</FormLabel>
              </div>
              <FormControl size="small">
                <RadioGroup
                  row
                  aria-labelledby="bsa"
                  name="radio-buttons-group"
                  className='inline'
                >
                  <FormControlLabel value="yes" control={<Radio sx={{ color: "#525fe1", '& .MuiSvgIcon-root': { fontSize: 20, }, }} />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio sx={{ color: "#525fe1", '& .MuiSvgIcon-root': { fontSize: 20, }, }} />} label="No" />
                </RadioGroup>
              </FormControl>
            </div>
            <div className='flex justify-between'>
              <div className='flex items-center'>
                <FormLabel id="Speech-Impairment" sx={{ fontSize: '14px' }}>Speech Impairment?</FormLabel>
              </div>
              <FormControl size="small">
                <RadioGroup
                  row
                  aria-labelledby="Speech-Impairment"
                  name="radio-buttons-group"
                  className='inline'
                >
                  <FormControlLabel value="yes" control={<Radio sx={{ color: "#525fe1", '& .MuiSvgIcon-root': { fontSize: 20, }, }} />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio sx={{ color: "#525fe1", '& .MuiSvgIcon-root': { fontSize: 20, }, }} />} label="No" />
                </RadioGroup>
              </FormControl>
            </div>
            <div className='flex justify-between'>
              <div className='flex items-center'>
                <FormLabel id="HairGrowth" sx={{ fontSize: '14px' }}>Abnormal Hair Growth/ Loss?</FormLabel>
              </div>
              <FormControl size="small">
                <RadioGroup
                  row
                  aria-labelledby="HairGrowth"
                  name="radio-buttons-group"
                  className='inline'
                >
                  <FormControlLabel value="yes" control={<Radio sx={{ color: "#525fe1", '& .MuiSvgIcon-root': { fontSize: 20, }, }} />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio sx={{ color: "#525fe1", '& .MuiSvgIcon-root': { fontSize: 20, }, }} />} label="No" />
                </RadioGroup>
              </FormControl>
            </div>
            <div className='flex justify-between'>
              <div className='flex items-center'>
                <FormLabel id="FacialDeformity" sx={{ fontSize: '14px' }}>Facial Deformity?</FormLabel>
              </div>
              <FormControl size="small">
                <RadioGroup
                  row
                  aria-labelledby="FacialDeformity"
                  name="radio-buttons-group"
                  className='inline'
                >
                  <FormControlLabel value="yes" control={<Radio sx={{ color: "#525fe1", '& .MuiSvgIcon-root': { fontSize: 20, }, }} />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio sx={{ color: "#525fe1", '& .MuiSvgIcon-root': { fontSize: 20, }, }} />} label="No" />
                </RadioGroup>
              </FormControl>
            </div> 
          </div> 
          <TextField name="otherDisability" label="Any other disability" value={data.otherDisability} onChange={handleChange} multiline minRows={2} className="w-full mt-3" /> 
          <div className="flex justify-between mt-4">
            <Button variant="outlined" onClick={onPrevious}>Previous</Button>
            <Button variant="contained" color="warning" onClick={() => onNext && onNext(data)}>Next</Button>
          </div>
        </div> 
      </div>
    </>
    )
}



