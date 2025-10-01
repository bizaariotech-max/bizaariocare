
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


const OpenMedicalCaseFiles = ({patientId,patient_details,setselected_case_file}) => {


  
  const doctor_details=JSON.parse(localStorage.getItem("user"))

  const[isloading_for,setisloading_for]=useState(false)

    const [medical_case_file, setmedical_case_file] = useState({
      PatientId:"",
      TreatmentType : '',
      DoctorId : '',
      DoctorName : '',
      HospitalId : '',
      HospitalName : '',
      Date : '',
      MedicalSpeciality:'',
      Status:""
    });

const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  setmedical_case_file((prev) => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value
  }));
};



 const save_chif_complaints = async () => {
  setisloading_for(true);
  try {
    const payload={
      ...medical_case_file,
      PatientId:patientId
    }
    const resp = await api.post(
      `api/v1/admin/patientCaseFile/savepatientCaseFile`,
      payload,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  
    

    const { response_code, response_message } = resp.data.response;

    if (response_code === "200") {
      Swal.fire({
        icon: "success",
        title: "Details Added",
        text: "Medical Case File Added Successfully...",
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

console.log(allmedical_speciality);



// ================================get doctor list========================================

 const[allDoctor,setallDoctor]=useState([])
      const getall_doctorlist=async()=>
      {
        try {
          const resp=await api.post(`api/v1/admin/AssetList`,{AssetCategoryLevel1:"68b0104063729ea39b28d0fb"})
          setallDoctor(resp.data.data.list)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        getall_doctorlist()
    
      },[])



      // ================================get hospital list========================================

 const[allHospital,setallHospital]=useState([])
      const getall_hospitallist=async()=>
      {
        try {
          const resp=await api.post(`api/v1/admin/AssetList`,{AssetCategoryLevel1:"68b00db063729ea39b28d0ef"})
          setallHospital(resp.data.data.list)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        getall_hospitallist()
    
      },[])


//============================ get all case file=========================================


 const [caseFiles, setCaseFiles] = useState([])
const getall_case_file = async () => {
  try {
    const resp = await api.get(`api/v1/admin/patientCaseFile/listPatientCaseFile?PatientId=${patientId}`);
    console.log(resp);
    
    
    setCaseFiles(resp.data.data.list)
  
    
  } catch (error) {
    console.error(error);
  } finally {
    setLoadingSpeciality(false);
  }
};

useEffect(()=>
{
getall_case_file()
},[])

console.log(caseFiles);





  return (
    <div className="space mt-4 " >

     <div className="flex justify-end space-x-2">
     
      <button className='view-all' onClick={handleShow_medical_files}>Open Medical Case Files</button>
    </div>


{/* ====================================modal for add medical case files ==========================*/}
<Modal show={show_medical_files} onHide={handleClose_medical_files} centered size="lg">
        
              <Modal.Header closeButton>
                <div className="flex flex-col">
      {/* Main title */}
      <h2 className="text-lg font-bold text-gray-900 w-full">Create New File</h2>
       <hr className="w-full border-gray-800 my-2" />

      {/* Patient details */}
      <div className="mt-1 text-sm text-gray-600 space-x-2">
        <span className="font-semibold text-blue-700">{patient_details?.Name}</span>
        <span className="text-gray-500">{patient_details?.Gender}</span>
        {patient_details?.DateOfBirth && (
          <span className="text-gray-500">
            {new Date(patient_details.DateOfBirth).toISOString().split("T")[0]}
          </span>
        )}
      </div>
    </div>
              </Modal.Header>
              <Modal.Body>
              
      
         <div>
   
      
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4 border border-gray-300 rounded-lg p-4">
                
                    <FormControl fullWidth size="small">
                  <label className="form-label">Patient Name </label>
                  <TextField
                  type='text'
                  placeholder="Patient Name" 
                  name="Date" 
                  size="small" 
                   inputProps={{ readOnly: true }} 
                  value={patient_details?.Name} 
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
                    value={patient_details?.DateOfBirth?
                    new Date(patient_details.DateOfBirth).toISOString().split("T")[0]
                    : ""
                  }
                  onChange={handleChange} 
                  />
                  </FormControl>

                   <FormControl fullWidth size="small">
                  <label className="form-label">Gender</label>
                 
                      <RadioGroup size="small"
                        row
                        name="Gender"
                        value={patient_details?.Gender}
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
                 value={medical_case_file.MedicalSpeciality}
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
              <label className="form-label">Select Doctor</label>
            <Select
                  labelId="content-type-label"
                  name="DoctorId"
                 value={medical_case_file.DoctorId}
                 onOpen={() => {
                    if (allDoctor.length === 0) { // prevent multiple calls
                    getallmedical_speciality();
                    }
                }}
                 onChange={handleChange}
                  displayEmpty
                  MenuProps={customMenuProps}
                  renderValue={(selected) => {
                    if (!selected) {
                      return <span style={{ color: "#9ca3af" }}>Select Doctor </span>; 
                    }
                    return allDoctor?.find((item) => item._id === selected)?.AssetName;
                  }}
                >
                  <MenuItem value="">
                    <em>Select Doctor </em>
                  </MenuItem>
                 {loadingSpeciality ? (
                    <MenuItem disabled>
                    <CircularProgress size={20} />
                    </MenuItem>
                ) : (
                    allDoctor?.map((type) => (
                    <MenuItem key={type._id} value={type._id}>
                        {type.AssetName}
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
                  value={medical_case_file.DoctorName} 
                  onChange={handleChange} 
                  />
                  </FormControl>

            <FormControl fullWidth size="small">
              <label className="form-label">Select Hospital</label>
            <Select
                  labelId="content-type-label"
                  name="HospitalId"
                 value={medical_case_file.HospitalId}
                 onOpen={() => {
                    if (allHospital.length === 0) { // prevent multiple calls
                    getallmedical_speciality();
                    }
                }}
                 onChange={handleChange}
                  displayEmpty
                  MenuProps={customMenuProps}
                  renderValue={(selected) => {
                    if (!selected) {
                      return <span style={{ color: "#9ca3af" }}>Select Hospital </span>; 
                    }
                    return allHospital?.find((item) => item._id === selected)?.AssetName;
                  }}
                >
                  <MenuItem value="">
                    <em>Select Hospital </em>
                  </MenuItem>
                 {loadingSpeciality ? (
                    <MenuItem disabled>
                    <CircularProgress size={20} />
                    </MenuItem>
                ) : (
                    allHospital?.map((type) => (
                    <MenuItem key={type._id} value={type._id}>
                        {type.AssetName}
                    </MenuItem>
                    ))
                )}
                              
  
              </Select>
              </FormControl>

                  <FormControl fullWidth size="small">
                  <label className="form-label">Hospital/Clinic Name </label>
                  <TextField
                  type='text'
                  placeholder="Hospital Name" 
                  name="HospitalName" 
                  size="small" 
                  value={medical_case_file.HospitalName} 
                  onChange={handleChange} 
                  />
                  </FormControl>

                <FormControl fullWidth size="small">
                  <label className="form-label">Date Of Treatment </label>
                  <TextField
                  type='date'
                  placeholder="Date" 
                  name="Date" 
                  size="small" 
                  value={medical_case_file.Date}
                  onChange={handleChange} 
                  />
                  </FormControl>

                  <FormControl fullWidth size="small">
                  <label className="form-label">Status </label>
                 <Select
                  labelId="content-type-label"
                  name="Status"
                 value={medical_case_file.Status}
                 onChange={handleChange}
                  displayEmpty
                  MenuProps={customMenuProps}
                  renderValue={(selected) => {
                    if (!selected) {
                      return <span style={{ color: "#9ca3af" }}>Select Status </span>; 
                    }
                    return selected;
                  }}
                >
                  <MenuItem value="">
                    <em>Select Status </em>
                  </MenuItem>
                
                    <MenuItem value="Ongoing">Ongoing</MenuItem>
                    <MenuItem value="Resolved">Resolved</MenuItem>
                    <MenuItem value="Past">Past</MenuItem>
              </Select>
                
                  </FormControl>

                <div className='col-span-2'>
                   <FormControl fullWidth size="small">
                  <label className="form-label">Treatment Type </label>
                  
                      <RadioGroup size="small"
                        row
                        name="TreatmentType"
                        value={medical_case_file.TreatmentType}
                        onChange={handleChange}
                        sx={{ flexDirection: 'row', alignItems: 'flex-start', gap: 1 }}
                      >
                      
                        
                      <FormControlLabel value="OPD Visit Record" control={<Radio />} label="OPD Visit Record" />
                      <FormControlLabel value="Day care Visit Record" control={<Radio />} label="Day Care Visit Record" />
                      <FormControlLabel value="Maternity Record" control={<Radio />} label="Maternity Record" />
                      <FormControlLabel value="General (Non-surgical) Hospitalisation Record" control={<Radio />} label="General(Non-Surgical) Hospitalisation Record" />
                      <FormControlLabel value="Surgery/ Procedure Record" control={<Radio />} label="Surgery/Procedure Record" />
                      
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
  {caseFiles?.length === 0 ? (
    <p>No case files yet.</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-3 ">
      {caseFiles?.map((file, index) => (
        <div
          key={index}
          className="border rounded-lg shadow-md p-3 bg-[rgba(82,103,125,0.10)]"
        >
          <h3 className=" text-lg text-gray-800 font-thin">
            Medical Case File ID:<br></br>
             <span className="form-title text-lg font-semibold text-gray-800">{file._id || 'N/A'}</span>
          </h3>
          <p className="flex text-sm text-gray-600 gap-2">
            <img src={calendericon} alt='' className='h-5'></img> {file.Date || 'N/A'}
          </p>
          <p className="text-sm text-gray-600">
            Treatment Type: <strong>{file?.TreatmentType || 'N/A'}</strong>
          </p>
          <p className="form-title  text-gray-600">
            {file?.DoctorName || file?.DoctorId?.AssetName}
          </p>
          <div className='flex justify-between'>
          <p className=" flex text-sm text-gray-600">
            <strong>Medical Speciality:</strong>
            {
              allmedical_speciality?.find((item) => item._id === file.MedicalSpeciality)
                ?.lookup_value || 'N/A'
            }
            {/* {
              file.MedicalSpeciality
            } */}
            
          </p>

              <p className=" flex text-sm text-gray-600">
            <strong>Status:</strong>{' N/A'}
            {
              file.Status
            }
            
          </p>

          <div className='flex justify-between gap-2'>
            <button className='classic-button'>
              Ongoing
            </button>
            <button className='classic-button'>
              Past
            </button>
           <button
            className='classic-button'
            onClick={() => {
              setselected_case_file(file._id);
              handleClose_medical_files();
            }}
          >
            View
          </button>

            </div>

          </div>
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

