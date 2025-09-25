import React from 'react';
import { Plus, Edit } from 'lucide-react';
import generalphysician from '../AllSubForms/assets/images/general physician.png'
import ChiefComplaints from './ChiefComplaints';
import ChiefComplaintsForMedicalSummary from './chief_complaints_for_medical_summary';
import DiagnosticsInvestigations from './DiagnosticsInvestigations';
import DiagnosticsInvestigationsForMedicalSummary from './Diagnostics_investigations';
import CurrentMedicinesForMedicalSummary from './current_medicines_for_medical_summary';
import CurrentTherapyForMedicalSummary from './current_therapy_for_medical_summary';
import { useEffect, useState ,useRef} from 'react'
import { TextField, Select, MenuItem, FormControl,Typography, Box,Avatar,Tooltip,IconButton,CircularProgress, Button, Radio, FormControlLabel, RadioGroup, FormLabel } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import api from '../../../../api'
import Swal from 'sweetalert2';
import UniqueLoader from '../../../loader';
import { customMenuProps } from '../../../../utils/mui_select_scroll_bar';
import { Calendar, MapPin } from 'lucide-react';
import ProfileCard1 from '../AllSubForms/UI/ProfileCard1';
import ProfileCard2 from '../AllSubForms/UI/ProfileCard2';
import { Modal,  Form, Row, Col } from 'react-bootstrap';
import { __postApiData } from "../../../../utils/api";
import healthicon from '../AllSubForms/assets/images/view health assessment report icon.png';
import SurgeryProcedurePerformed from './surgery_procedure_performed';
import CurrentMedicineForPastSurgeries from './current_medicine_for_past_surgries';

const PastSurgeries = () => {
  // Sample data for medical summary
  const medicalData = {
    pastIllness: ['Tuberculosis (TB)', 'Pneumonia'],
  };

    const medicalData1 = [
  {
    date: "20/12/2025",
    doctor: "Cardiologist",
    // other fields here
  },
  {
    date: "21/12/2025",
    doctor: "Orthopedic",
  },
  // ...
];


 const [surgeries, setsurgeries] = useState({
      PatientId:"",
      SurgeryProcedure:[{
            Date:"",
            HospitalClinic_Name:"",
            SurgeonName:"",
            SurgeonNumber:"",
            MedicalSpeciality:"",
            SurgeryProcedure_Name:"",
            BloodTransfusion :"",
            AnaesthesiaType:"",
            RecoveryCycle:"",
            PostSurgeryComplications: '',
            UploadDischargeSummary: '',
      }],
    });



  const [show, setShow] = useState(false)
  
    // function to open modal
    const handleShow = () => setShow(true);
    // function to close modal
    const handleClose = () => setShow(false);


    
      const[allmedical_speciality,setallmedical_speciality]=useState([])
      const getallmedical_speciality=async()=>
      {
        try {
          const resp=await api.post('api/v1/admin/LookupList',{lookupcodes:"medical_speciality"})
          setallmedical_speciality(resp.data.data)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        getallmedical_speciality()
    
      },[])

 const handleAddMore = () => {
   setsurgeries(prev => ({
     ...prev,                          // keep previous properties
     SurgeryProcedure: [                // overwrite or add to ChiefComplaints
       ...(prev.SurgeryProcedure || []),
       { Date: "", HospitalClinic_Name: "", SurgeonName: "", SurgeonNumber: "", MedicalSpeciality:"",
        SurgeryProcedure_Name:"",BloodTransfusion:"",AnaesthesiaType:"",RecoveryCycle:"",PostSurgeryComplications:"",
        UploadDischargeSummary:""
        }
     ],
   }));
 };

  return (
    <div className="space bg-[rgba(189,196,212,0.2)] p-4 rounded-lg border border-gray-200 mt-4">
      {/* Header */}
   

       <div className="flex items-center justify-between mt-2 ">
              <h2 className="text-xl font-semibold text-gray-900">
                Past Surgeries
              </h2>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
                  <span className="text-sm font-medium underline" onClick={handleShow}>Add</span>
                  <Plus className="w-4 h-4" />
                </button>
                <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
                  <Edit className="w-4 h-4" />
                  <span className="text-sm font-medium underline">Edit</span>
                </button>
              </div>
            </div>

  
     
      <div className="">
        <div className="flex flex-wrap gap-2">
            <span
              className="px-3 py-1 bg-[#e2e4f4]  text-sm rounded-md"
            >
              Kidney Stone Surgery
            </span>

               <span
              className="px-3 py-1 bg-[#e2e4f4]  text-sm rounded-md"
            >
              Tansilectomy
            </span>

        </div>
      </div>


        <div className="flex gap-2 flex-nowrap overflow-x-auto sm:overflow-visible mt-10" style={{cursor:"pointer"}}>

        <div className='medical-card' >
        <img src={generalphysician} alt=''></img>
        <p style={{ margin: 0,  fontWeight: "600",fontFamily:"Lora",whiteSpace: "nowrap" }}>General Surgeries</p>
        </div>

        
        <div className='medical-card' >
            <img src={generalphysician} alt=''></img>
            <p style={{ margin: 0,  fontWeight: "600",fontFamily:"Lora",whiteSpace: "nowrap" }}>Cardiologist Surgeries</p>
        </div>

        <div className='medical-card' >

            <img src={generalphysician} alt=''></img>
                <p style={{ margin: 0,  fontWeight: "600",fontFamily:"Lora",whiteSpace: "nowrap" }}>Orthopedic Surgeries</p>
        </div>


       
        <div className='medical-card' >

            <img src={generalphysician} alt=''></img>
            <p style={{ margin: 0,  fontWeight: "600",fontFamily:"Lora",whiteSpace: "nowrap" }}>Neurology Surgeries</p>

        </div>
    </div>


    {/* <div className='card-details' style={{marginTop:"20px"}}>
        <h3 className='table-header'>20/12/2025</h3>
         <div style={{display:"flex"}} >
            <img src={generalphysician} alt='' style={{height:"26px"}}></img>
            <p style={{ margin: 0,  fontWeight: "600",fontFamily:"Lora",whiteSpace: "nowrap" }}>General Physician</p>
        </div>
        <SurgeryProcedurePerformed/>
    </div>

    <div className='card-details'>
        <CurrentMedicineForPastSurgeries/>
    </div> */}

        {medicalData1.map((item, index) => (
      <div key={index} className="relative pl-10">
        {/* Vertical line */}
        <div className="absolute left-4 top-0 h-full w-[2px] bg-gray-300"></div>
    
        {/* Circle number */}
        <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-gray-500 text-white flex items-center justify-center text-xs font-bold">
          {index + 1}
        </div>
    
        {/* Your existing cards */}
        <div className='card-details' style={{marginTop:"20px"}}>
          <h3 className='table-header'>{item.date}</h3>
          <div style={{display:"flex"}}>
            <img src={generalphysician} alt='' style={{height:"26px"}} />
            <p style={{ margin: 0, fontWeight: "600", fontFamily: "Lora", whiteSpace: "nowrap" }}>{item.doctor}</p>
          </div>
          <SurgeryProcedurePerformed/>
        </div>
    
        <div className='card-details'>
          <CurrentMedicineForPastSurgeries/>
        </div>
    
      
    
       
      </div>
    ))}

     
   

        




       



     

      {/* Footer Note */}
      {/* <div className="p-4  border-t border-gray-200">
        <p className="text-xs text-gray-600">
          1. Added By Dr Gaurav Pande (Cardiology) (Regards M1234), (Contact 8373915529, Date/ Time 20 Sep 2025, 11:57 AM IST, Noida
        </p>
      </div> */}



{/*========================= modal for adding surgeries record ====================================*/}

  <Modal show={show} onHide={handleClose} centered size="lg">
        
              <Modal.Header closeButton>
                <Modal.Title className='form-title'>Surgery/ Procedure</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              
      
         <div>
      
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4 border border-gray-300 rounded-lg p-4"> */}
                



        <div className='col-span-2'>
          {/* <h5 className='form-title'>Chief Complaints</h5> */}
            {surgeries.SurgeryProcedure.map((details, index) => (
      
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4  border border-gray-300 rounded-lg p-4 mt-2">
                
                 <FormControl fullWidth size="small">
                    <label className="form-label">Date </label>
                    <TextField
                    type='date'
                    placeholder="Duration In Months" 
                    name="DateOfBirth" 
                    size="small" 
                    // value={patient_details.DateOfBirth} 
                    // onChange={handleChange} 
                    />
                    </FormControl>

                   <FormControl fullWidth size="small">
                    <label className="form-label">Hospital/ Clinic Name </label>
                    <TextField
                    type='text'
                    placeholder="Duration In Months" 
                    name="DateOfBirth" 
                    size="small" 
                    // value={patient_details.DateOfBirth} 
                    // onChange={handleChange} 
                    />
                    </FormControl>

                <FormControl fullWidth size="small">
                    <label className="form-label">Surgeon Name </label>
                    <TextField
                    type='text'
                    placeholder="Duration In Months" 
                    name="DateOfBirth" 
                    size="small" 
                    // value={patient_details.DateOfBirth} 
                    // onChange={handleChange} 
                    />
                    </FormControl>

                 <FormControl fullWidth size="small">
                    <label className="form-label">Surgeon Number </label>
                    <TextField
                    type='text'
                    placeholder="Duration In Months" 
                    name="DateOfBirth" 
                    size="small" 
                    // value={patient_details.DateOfBirth} 
                    // onChange={handleChange} 
                    />
                    </FormControl>

                     <FormControl fullWidth size="small">
                    <label className="form-label">Medical Speciality </label>
                  <Select
                        labelId="content-type-label"
                        name="Nationality"
                      //  value={patient_details.Nationality}
                      //  onChange={handleChange}
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
                        {allmedical_speciality?.map((type) => (
                          <MenuItem key={type._id} value={type._id}>
                            {type.lookup_value}
                          </MenuItem>
                        ))}
                                    
        
                    </Select>
                    </FormControl>

                   <FormControl fullWidth size="small">
                    <label className="form-label">Surgery/ Procedure Name </label>
                    <TextField
                    type='text'
                    placeholder="Duration In Months" 
                    name="DateOfBirth" 
                    size="small" 
                    // value={patient_details.DateOfBirth} 
                    // onChange={handleChange} 
                    />
                    </FormControl>

               <FormControl component="fieldset" sx={{ mt: 0 }}>
              <Typography sx={{ fontWeight: 500 }} className='form-label'>Was a Blood Transfusion Needed? </Typography>
              <RadioGroup size="small"
                row
                name="EntityTypeId"
                // value={loginmaster.EntityTypeId}
                // onChange={handlechange}
                sx={{ flexDirection: 'row', alignItems: 'flex-start', gap: 1 }}
              >
               
                
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
                
                
               
              </RadioGroup>
            </FormControl>

                  <FormControl component="fieldset" sx={{ mt: 0 }}>
              <Typography sx={{ fontWeight: 500 }} className='form-label'>Anaesthesia Type  </Typography>
              <RadioGroup size="small"
                row
                name="EntityTypeId"
                // value={loginmaster.EntityTypeId}
                // onChange={handlechange}
                sx={{ flexDirection: 'row', alignItems: 'flex-start', gap: 1 }}
              >
               
                
              <FormControlLabel value="General" control={<Radio />} label="General" />
              <FormControlLabel value="Local" control={<Radio />} label="Local" />
                
              </RadioGroup>
            </FormControl>
<FormControl fullWidth size="small">
  <label className="form-label">Recovery Cycle</label>
  <div style={{ display: 'flex', gap: '8px' }}>
    {/* Number input */}
    <TextField
      type="number"
      name="recoveryNumber"
      placeholder="Enter Number"
      size="small"
      // value={patient_details.recoveryNumber} 
      // onChange={handleChange} 
      style={{ flex: 1 }}
    />

    {/* Dropdown for Days/Weeks/Months */}
    <Select
      name="recoveryUnit"
      defaultValue="Days"
      size="small"
      // value={patient_details.recoveryUnit}
      // onChange={handleChange}
      style={{ width: '150px' }}
    >
      <MenuItem value="Days">Days</MenuItem>
      <MenuItem value="Weeks">Weeks</MenuItem>
      <MenuItem value="Months">Months</MenuItem>
    </Select>
  </div>
</FormControl>


              
               <FormControl fullWidth size="small">
                <label className="form-label">Upload Discharge Summary/ Note </label>
                <TextField
                type='file'
                placeholder="Duration In Months" 
                name="DateOfBirth" 
                size="small" 
                // value={patient_details.DateOfBirth} 
                // onChange={handleChange} 
                />
                </FormControl>

            <div className="col-span-2">
                <FormControl fullWidth size="small">
                <label className="form-label">Post Surgery Complications </label>
                <div className="flex flex-wrap gap-2">
                  {allmedical_speciality.map((item) => {
                    const selected = (details?.PostSurgeryComplications || []).includes(item._id); 
                    return (
                      <span
                        key={item._id}
                        // onClick={() => handleSymptomSelect(item._id,index)}
                        className={`px-3 py-1 text-sm rounded-md cursor-pointer flex items-center gap-2 
                          ${selected ? 'bg-blue-500 text-white' : 'bg-[#e2e4f4] text-gray-800'}`}
                      >
                        {item.lookup_value}
                        {selected && (
                          <span
                            className="ml-1 text-xs font-bold cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              // handleSymptomSelect(item._id,index);
                            }}
                          >
                            ✕
                          </span>
                        )}
                      </span>
                    );
                  })}
                </div>
              </FormControl>
              </div> 

      
                
                {/* <div className="col-span-2">
                <FormControl fullWidth size="small">
                <label className="form-label">Compliant </label>
                <div className="flex flex-wrap gap-2">
                  {all_symptom_master.map((item) => {
                    const selected = (details?.Compliant || []).includes(item._id); 
                    return (
                      <span
                        key={item._id}
                        // onClick={() => handlecomplaintSelect(item._id,index)}
                        className={`px-3 py-1 text-sm rounded-md cursor-pointer flex items-center gap-2 
                          ${selected ? 'bg-blue-500 text-white' : 'bg-[#e2e4f4] text-gray-800'}`}
                      >
                        {item.lookup_value}
                        {selected && (
                          <span
                            className="ml-1 text-xs font-bold cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              // handleSymptomSelect(item._id,index);
                            }}
                          >
                            ✕
                          </span>
                        )}
                      </span>
                    );
                  })}
                </div>
              </FormControl>
              </div> */}

                 {/* <div className="col-span-2">
                <FormControl fullWidth size="small">
                <label className="form-label">Aggravating Factors</label>
                <div className="flex flex-wrap gap-2">
                  {allaggravating_master.map((item) => {
                    const selected = (details?.AggravatingFactors || []).includes(item._id); 
                    return (
                      <span
                        key={item._id}
                        // onClick={() => handleaggravatingSelect(item._id,index)}
                        className={`px-3 py-1 text-sm rounded-md cursor-pointer flex items-center gap-2 
                          ${selected ? 'bg-blue-500 text-white' : 'bg-[#e2e4f4] text-gray-800'}`}
                      >
                        {item.lookup_value}
                        {selected && (
                          <span
                            className="ml-1 text-xs font-bold cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              // handleSymptomSelect(item._id,index);
                            }}
                          >
                            ✕
                          </span>
                        )}
                      </span>
                    );
                  })}
                </div>
              </FormControl>
              </div> */}

           
      
                 {/* <FormControl fullWidth size="small">
                  <label className="form-label">Duration </label>
                  <TextField
                  type='number'
                  placeholder="Duration In Months" 
                  name="DateOfBirth" 
                  size="small" 
                  // value={patient_details.DateOfBirth} 
                  // onChange={handleChange} 
                  />
                  </FormControl> */}
{/*       
                  <FormControl fullWidth size="small">
                  <label className="form-label">Severity Grade </label>
                  {renderColorBar(index)}
                  </FormControl> */}
      
       

                </div> 

          ))}
               
           

      
          </div> 

    </div> 

   
               
               <div className="flex justify-between mt-4">
           
 
              <Button
                style={{ backgroundColor: "#52677D", fontFamily: "Lora", color: "white" }}
                onClick={handleAddMore}
              >
                Add More
              </Button>

              <Button
                style={{ backgroundColor: "#52677D", fontFamily: "Lora", color: "white" }}
                // onClick={save_chif_complaints}
              >
                Save
              </Button>
            </div>

      
              {/* </div>  */}
      
              </Modal.Body>
          
         
          </Modal>




    </div>
  );
};

export default PastSurgeries;
