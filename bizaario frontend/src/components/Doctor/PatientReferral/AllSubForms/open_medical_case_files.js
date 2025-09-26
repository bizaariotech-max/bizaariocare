
import React, { useEffect, useState ,useRef} from 'react'
import { TextField, Select, MenuItem, FormControl, Box,Avatar,Tooltip,IconButton,CircularProgress, Button, Radio, FormControlLabel, RadioGroup, FormLabel } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import api from '../../../../api'
import Swal from 'sweetalert2';
import UniqueLoader from '../../../loader';
import { customMenuProps } from '../../../../utils/mui_select_scroll_bar';
import { Calendar, MapPin } from 'lucide-react';
import ProfileCard1 from '../AllSubForms/UI/ProfileCard1';
import ProfileCard2 from '../AllSubForms/UI/ProfileCard2';
import { Plus, Edit } from 'lucide-react';
import { Modal,  Form, Row, Col } from 'react-bootstrap';
import { __postApiData } from "../../../../utils/api";
import healthicon from '../AllSubForms/assets/images/view health assessment report icon.png';
import calendericon from '../../../../assets1/Vector (2).png'


const OpenMedicalCaseFiles = (patientId) => {


  const doctor_details=JSON.parse(localStorage.getItem("user"))

  const[isloading_for,setisloading_for]=useState(false)

    const [patient_details, setpatient_details] = useState([{
      SymptomClass:[],
      Compliant : '',
      Duration : '',
      SeverityGrade : '',
      AggravatingFactors : [],
      CurrentMedications : '',
      Dosage : '',
      Frequency : '',
      CurrentTherapies : '',
      CreatedBy: doctor_details._id,
    }]);

const handleChange = (e, index) => {
  const { name, value, type, checked } = e.target;

  setpatient_details((prev) => {
    const updated = [...prev];
    const obj = { ...updated[index] };

    if (type === "checkbox") {
      obj[name] = checked;
    } else if (Array.isArray(value)) {
      // multi-select case
      obj[name] = value;
    } else {
      // single value
      obj[name] = value;
    }

    updated[index] = obj;
    return updated;
  });
};


 const save_chif_complaints = async () => {
  setisloading_for(true);
  try {
    const resp = await api.post(
      `api/v1/admin/patientprofiling/chief-complaints/${patientId.patientId}`,
      patient_details,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(resp);
    

    const { response_code, response_message } = resp.data.response;

    if (response_code === "200") {
      Swal.fire({
        icon: "success",
        title: "Details Added",
        text: "Patient Details Added Successfully...",
        showConfirmButton: true,
        customClass: { confirmButton: "my-swal-button" },
      }).then(() => {
        window.location.reload();
      });
    } else if (response_code === "400") {
      // Show server validation error here
      Swal.fire({
        icon: "error",
        title: response_message.errorType || "Error",
        text: response_message.error,
        showConfirmButton: true,
        customClass: { confirmButton: "my-swal-button" },
      });
    } else {
      // Optional: handle other response codes
      Swal.fire({
        icon: "warning",
        title: "Unexpected response",
        text: "Something went wrong. Please try again.",
        showConfirmButton: true,
        customClass: { confirmButton: "my-swal-button" },
      });
    }
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Request failed",
      text: error.message || "Something went wrong",
      showConfirmButton: true,
      customClass: { confirmButton: "my-swal-button" },
    });
  } finally {
    setisloading_for(false);
  }
};



//=========================== code start for add medical case files=====================================

 const [show_medical_files, setshow_medical_files] = useState(false)
  
    // function to open modal
    const handleShow_medical_files = () => setshow_medical_files(true);
    // function to close modal
    const handleClose_medical_files = () => setshow_medical_files(false);
  
  
  // const[isloading_for,setisloading_for]=useState(false)

  //   const [patient_details, setpatient_details] = useState([{
  //     SymptomClass:[],
  //     Compliant : '',
  //     Duration : '',
  //     SeverityGrade : '',
  //     AggravatingFactors : [],
  //     CurrentMedications : '',
  //     Dosage : '',
  //     Frequency : '',
  //     CurrentTherapies : '',
  //     CreatedBy: doctor_details._id,
  //   }]);


  //====================================== get all medical speciality =====================================
  
  
     const [allmedical_speciality, setallmedical_speciality] = useState([]);
const [loadingSpeciality, setLoadingSpeciality] = useState(false);

const getallmedical_speciality = async () => {
  try {
    setLoadingSpeciality(true);
    const resp = await api.post('api/v1/admin/LookupList', { lookupcodes: "medical_speciality" });
    setallmedical_speciality(resp.data.data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoadingSpeciality(false);
  }
};

  const [caseFiles, setCaseFiles] = useState([
  {
    CaseFileId: 'CF001',
    Date: '2025-09-26',
    TreatmentType: 'OPD Visit Record',
    DoctorName: 'Dr. John Doe',
    MedicalSpeciality: '64abf4dc2', // some _id from allmedical_speciality array
  },
  {
    CaseFileId: 'CF002',
    Date: '2025-09-20',
    TreatmentType: 'Surgery/Procedure Record',
    DoctorName: 'Dr. Jane Smith',
    MedicalSpeciality: '64abf4dc3', // another _id from allmedical_speciality array
  },
  {
    CaseFileId: 'CF003',
    Date: '2025-08-15',
    TreatmentType: 'Maternity Record',
    DoctorName: 'Dr. Rajesh Kumar',
    MedicalSpeciality: '64abf4dc4',
  },
]);



  return (
    <div className="space mt-4">

     <div className="flex justify-between space-x-2">
      <div className='flex '>
      <img src={healthicon} alt="" className="w-[36px] h-[36px]" />
      <h2 className="text-[36px] font-semibold text-[var(--button-back-color)]">
        <span>View Health Assessment Report</span>
      </h2>
      </div>
      <button className='view-all' onClick={handleShow_medical_files}>Open Medical Case Files</button>
    </div>


{/* ====================================modal for add medical case files ==========================*/}
<Modal show={show_medical_files} onHide={handleClose_medical_files} centered size="lg">
        
              <Modal.Header closeButton>
                <Modal.Title className='form-title'>Create New File </Modal.Title>
              </Modal.Header>
              <Modal.Body>
              
      
         <div>
   
      
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4 border border-gray-300 rounded-lg p-4">
                

                  <FormControl fullWidth size="small">
                  <label className="form-label">Medical Case File Id </label>
                  <TextField
                  type='text'
                  placeholder="Date" 
                  name="Date" 
                  size="small" 
                  // value={medical_history.DoctorHospitalInfo.Date} 
                  onChange={handleChange} 
                  />
                  </FormControl>

                    <FormControl fullWidth size="small">
                  <label className="form-label">Patient Name </label>
                  <TextField
                  type='text'
                  placeholder="Date" 
                  name="Date" 
                  size="small" 
                  // value={medical_history.DoctorHospitalInfo.Date} 
                  onChange={handleChange} 
                  />
                  </FormControl>
               
                <FormControl fullWidth size="small">
                  <label className="form-label">Date Of Birth</label>
                  <TextField
                  type='date'
                  placeholder="Date" 
                  name="Date" 
                  size="small" 
                  // value={medical_history.DoctorHospitalInfo.Date} 
                  onChange={handleChange} 
                  />
                  </FormControl>

                   <FormControl fullWidth size="small">
                  <label className="form-label">Gender</label>
                 
                      <RadioGroup size="small"
                        row
                        name="EntityTypeId"
                        // value={loginmaster.EntityTypeId}
                        // onChange={handlechange}
                        sx={{ flexDirection: 'row', alignItems: 'flex-start', gap: 1 }}
                      >
                      
                        
                      <FormControlLabel value="Male" control={<Radio />} label="Male" />
                      <FormControlLabel value="Female" control={<Radio />} label="Female" />
                      
                      
                      </RadioGroup>
                  </FormControl>

                   <FormControl fullWidth size="small">
              <label className="form-label">Medical Speciality </label>
            <Select
                  labelId="content-type-label"
                  name="MedicalSpeciality"
                //  value={medical_history.DoctorHospitalInfo.MedicalSpeciality}
                 onOpen={() => {
                    if (allmedical_speciality.length === 0) { // prevent multiple calls
                    getallmedical_speciality();
                    }
                }}
                 onChange={handleChange}
                  displayEmpty
                  MenuProps={customMenuProps}
                  renderValue={(selected) => {
                    if (!selected) {
                      return <span style={{ color: "#9ca3af" }}>Medical Speciality </span>; 
                    }
                    return allmedical_speciality?.find((item) => item._id === selected)?.lookup_value;
                  }}
                >
                  <MenuItem value="">
                    <em>Medical Speciality </em>
                  </MenuItem>
                 {loadingSpeciality ? (
                    <MenuItem disabled>
                    <CircularProgress size={20} />
                    </MenuItem>
                ) : (
                    allmedical_speciality?.map((type) => (
                    <MenuItem key={type._id} value={type._id}>
                        {type.lookup_value}
                    </MenuItem>
                    ))
                )}
                              
  
              </Select>
              </FormControl>

                  <FormControl fullWidth size="small">
                  <label className="form-label">Doctor Name </label>
                  <TextField
                  type='text'
                  placeholder="Doctor Name" 
                  name="DoctorName" 
                  size="small" 
                  // value={medical_history.DoctorHospitalInfo.DoctorName} 
                  onChange={handleChange} 
                  />
                  </FormControl>

                  <FormControl fullWidth size="small">
                  <label className="form-label">Hospital/Clinic Name </label>
                  <TextField
                  type='number'
                  placeholder="Doctor Number" 
                  name="DoctorNumber" 
                  size="small" 
                  // value={medical_history.DoctorHospitalInfo.DoctorNumber} 
                  onChange={handleChange} 
                  />
                  </FormControl>

                <FormControl fullWidth size="small">
                  <label className="form-label">Date Of Treatment </label>
                  <TextField
                  type='date'
                  placeholder="Hospital Name" 
                  name="HospitalName" 
                  size="small" 
                  // value={medical_history.DoctorHospitalInfo.HospitalName}
                  onChange={handleChange} 
                  />
                  </FormControl>

                <div className='col-span-2'>
                   <FormControl fullWidth size="small">
                  <label className="form-label">Treatment Type </label>
                  
                      <RadioGroup size="small"
                        row
                        name="EntityTypeId"
                        // value={loginmaster.EntityTypeId}
                        // onChange={handlechange}
                        sx={{ flexDirection: 'row', alignItems: 'flex-start', gap: 1 }}
                      >
                      
                        
                      <FormControlLabel value="OPD Visit Record" control={<Radio />} label="OPD Visit Record" />
                      <FormControlLabel value="Day Care Visit Record" control={<Radio />} label="Day Care Visit Record" />
                      <FormControlLabel value="Maternity Record" control={<Radio />} label="Maternity Record" />
                      <FormControlLabel value="OPD Visit Record" control={<Radio />} label="General(Non-Surgical) Hospitalisation Record" />
                      <FormControlLabel value="OPD Visit Record" control={<Radio />} label="Surgery/Procedure Record" />
                      
                      </RadioGroup>
                  </FormControl>
                </div>
      
                
                </div> 

     
               
               <div className="flex justify-end mt-4">
             

              <Button
                style={{ backgroundColor: "#52677D", fontFamily: "Lora", color: "white" }}
                onClick={save_chif_complaints}
              >
                Save
              </Button>
            </div>

          <div className="col-span-1 mt-6 bg-[rgba(82, 103, 125, 0.10)]">
  {caseFiles.length === 0 ? (
    <p>No case files yet.</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-3 ">
      {caseFiles.map((file, index) => (
        <div
          key={index}
          className="border rounded-lg shadow-md p-3 bg-[rgba(82,103,125,0.10)]"
        >
          <h3 className=" text-lg text-gray-800 font-thin">
            Medical Case File ID:<br></br>
             <span className="form-title text-lg font-semibold text-gray-800">{file.CaseFileId || 'N/A'}</span>
          </h3>
          <p className="flex text-sm text-gray-600 gap-2">
            <img src={calendericon} alt='' className='h-5'></img> {file.Date || 'N/A'}
          </p>
          <p className="text-sm text-gray-600">
            Treatment Type: <strong>{file.TreatmentType || 'N/A'}</strong>
          </p>
          <p className="form-title  text-gray-600">
            {file.DoctorName || 'N/A'}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Medical Speciality:</strong>{' '}
            {
              allmedical_speciality.find((item) => item._id === file.MedicalSpeciality)
                ?.lookup_value || 'N/A'
            }
          </p>
        </div>
      ))}
    </div>
  )}
</div>


      
              </div> 
      
              </Modal.Body>
          
         
          </Modal>



    </div>
  );
}

export default OpenMedicalCaseFiles

