import React from 'react';
import { Plus, Edit } from 'lucide-react';
import generalphysician from '../AllSubForms/assets/images/general physician.png'
import ChiefComplaints from './ChiefComplaints';
import ChiefComplaintsForMedicalSummary from './chief_complaints_for_medical_summary';
import DiagnosticsInvestigations from './DiagnosticsInvestigations';
import DiagnosticsInvestigationsForMedicalSummary from './Diagnostics_investigations_for_medical_summary';
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

const PastSurgeries = ({patientId,selected_case_file,case_file_data}) => {

     const doctordetails=JSON.parse(localStorage.getItem("user"))
   
     
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
      SurgeriesProcedures:[{
            Date:"",
            HospitalClinicName:"",
            SurgeonName:"",
            SurgeonNumber:"",
            MedicalSpeciality:"",
            SurgeryProcedureName:"",
            AnaesthesiaType :"",
            BloodTransfusionNeeded:"",
            RecoveryCycle:{Value:"",Unit:""},
            PostSurgeryComplications: [],
            DischargeSummaryUrlNote: '',
      }],
    });



  const [show, setShow] = useState(false)
  
    // function to open modal
    const handleShow = () => setShow(true);
    // function to close modal
    const handleClose = () => setShow(false);


//================================== image upload==============================================

    const handlesingleImageChange = async (index, e, fieldName) => {
      const file = e.target.files[0]; // single file
      if (!file) return;
    
      try {
        const formData = new FormData();
        formData.append("file", file);
    
        const resp = await api.post("api/v1/common/AddImage", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
    
        // ✅ Extract URL from response
        if (
          resp.data?.response?.response_code === "200" &&
          resp.data.data?.length > 0
        ) {
          const imageUrl = resp.data.data[0].full_URL; // full_URL from API
    
          // ✅ Update state dynamically based on `fieldName`
          setsurgeries((prev) => {
            const updatedSurgery = [...prev.SurgeriesProcedures];
            updatedSurgery[index] = {
              ...updatedSurgery[index],
              [fieldName]: imageUrl, // <-- dynamic field update
            };
            return {
              ...prev,
              SurgeriesProcedures: updatedSurgery,
            };
          });
        }
      } catch (error) {
        console.error("Image upload error:", error);
      }
    };


    // ===============================onchange event for surgeries===============================

    const handlesurgery_change = (index, field, value,subField = null) => {
  setsurgeries(prev => {
    const updatedSurgery = [...prev.SurgeriesProcedures];
    const newsurgery = { ...updatedSurgery[index] };


    if (subField) {
      // For nested objects like Duration {Value, Unit}
      newsurgery[field] = {
        ...newsurgery[field],
        [subField]: value
      };
    }
    else
    {
        newsurgery[field] = value;
    }
   
    
    
    updatedSurgery[index] = newsurgery;

    return {
      ...prev,
      SurgeriesProcedures: updatedSurgery
    };
  });
};


    const toggleArrayField = (index, field, itemId) => {
  setsurgeries(prev => {
    const updatedsurgery = [...prev.SurgeriesProcedures];
    const surgeryprocedure = { ...updatedsurgery[index] };
    const currentArray = surgeryprocedure[field] || [];

    if (currentArray.includes(itemId)) {
      surgeryprocedure[field] = currentArray.filter(id => id !== itemId);
    } else {
      surgeryprocedure[field] = [...currentArray, itemId];
    }

    updatedsurgery[index] = surgeryprocedure;

    return {
      ...prev,
      SurgeriesProcedures: updatedsurgery
    };
  });
};




// ===================================add more function========================================

 const handleAddMore = () => {
   setsurgeries(prev => ({
     ...prev,                          // keep previous properties
     SurgeryProcedure: [                // overwrite or add to ChiefComplaints
       ...(prev.SurgeryProcedure || []),
       { Date: "", HospitalClinicName: "", SurgeonName: "", SurgeonNumber: "", MedicalSpeciality:"",
        SurgeryProcedureName:"",BloodTransfusionNeeded:"",AnaesthesiaType:"",RecoveryCycle:"",PostSurgeryComplications:"",
        DischargeSummaryUrlNote:""
        }
     ],
   }));
 };


//========================= medical speciality list==========================================
    
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


//================================== get unit list============================================

  const[all_unit_list,setall_unit_list]=useState([])
      const getall_unitlist=async()=>
      {
        try {
          const resp=await api.post('api/v1/admin/LookupList/',{lookupcodes:"duration_unit_type"})
          setall_unit_list(resp.data.data)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        getall_unitlist()
    
      },[])



  const save_surgery = async () => {
        // setisloading(true);
        try {
          const payload=
          {...surgeries,
            CaseFileId:selected_case_file,
            CreatedBy:doctordetails._id
            
          }
         
          
         
          
          const resp = await api.post(
            `api/v1/admin/medical-history/surgeries-procedures/add-multiple`,
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
              text: "Chief Complaints Added Successfully...",
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
          // setisloading(false);
        }
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


      <div  className="relative pl-10">
     

        {/* Your existing cards */}
        <div className='card-details' style={{marginTop:"20px"}}>
          {/* <h3 className='table-header'>{item.date}</h3> */}
          <div style={{display:"flex"}}>
            <img src={generalphysician} alt='' style={{height:"26px"}} />
            {/* <p style={{ margin: 0, fontWeight: "600", fontFamily: "Lora", whiteSpace: "nowrap" }}>{item.doctor}</p> */}
          </div>
             {/* Table */}
      <div className="overflow-x-auto">
        {/* Table Header */}
        <div className="bg-[var(--button-back-color)] text-white  " >
          <div className="grid grid-cols-2 gap-4 p-2 text-[20px]">
            <h3 className="table-header">Surgery/Procedure Name</h3>
            <h3 className="table-header">Clinical Outcome/Patient's Response</h3>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200">
          {case_file_data?.[0]?.SurgeriesProcedures?.map((item, index) => (
            <div
              key={item.id}
              className={`grid grid-cols-2 gap-4 p-4 ${index % 2 === 0 ? 'bg-[#f2f3f6]' : 'bg-white'
                }`}
            >
              <div className="text-sm text-gray-900 font-medium">
                {item.SurgeryProcedureName}
              </div>
              <div className="text-sm text-gray-900">
                {item.HospitalClinicName}
              </div>
             
              
            </div>
          ))}
        </div>
      </div>

        </div>
    
        <div className='card-details'>
          <CurrentMedicineForPastSurgeries/>
        </div>
    
      
    
       
      </div>


  

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
            {surgeries?.SurgeriesProcedures?.map((details, index) => (
      
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4  border border-gray-300 rounded-lg p-4 mt-2">
                
                 <FormControl fullWidth size="small">
                    <label className="form-label">Date </label>
                    <TextField
                    type='date'
                    placeholder="Date" 
                    name="Date" 
                    size="small" 
                    value={details.Date} 
                    onChange={(e)=>handlesurgery_change(index,"Date",e.target.value)} 
                    />
                    </FormControl>

                   <FormControl fullWidth size="small">
                    <label className="form-label">Hospital/ Clinic Name </label>
                    <TextField
                    type='text'
                    placeholder="Hospital/ Clinic Name" 
                    name="HospitalClinicName" 
                    size="small" 
                    value={details.HospitalClinicName} 
                    onChange={(e)=>handlesurgery_change(index,"HospitalClinicName",e.target.value)} 
                    />
                    </FormControl>

                <FormControl fullWidth size="small">
                    <label className="form-label">Surgeon Name </label>
                    <TextField
                    type='text'
                    placeholder="Surgeon Name" 
                    name="SurgeonName" 
                    size="small" 
                    value={details.SurgeonName} 
                    onChange={(e)=>handlesurgery_change(index,"SurgeonName",e.target.value)} 
                    />
                    </FormControl>

                 <FormControl fullWidth size="small">
                    <label className="form-label">Surgeon Number </label>
                    <TextField
                    type='text'
                    placeholder="Surgeon Number" 
                    name="SurgeonNumber" 
                    size="small" 
                    value={details.SurgeonNumber} 
                    onChange={(e)=>handlesurgery_change(index,"SurgeonNumber",e.target.value)} 
                    />
                    </FormControl>

                     <FormControl fullWidth size="small">
                    <label className="form-label">Medical Speciality </label>
                  <Select
                        labelId="content-type-label"
                        name="MedicalSpeciality"
                       value={details.MedicalSpeciality}
                        onChange={(e)=>handlesurgery_change(index,"MedicalSpeciality",e.target.value)}
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
                    placeholder="Surgery/ Procedure Name" 
                    name="SurgeryProcedureName" 
                    size="small" 
                    value={details.SurgeryProcedureName} 
                    onChange={(e)=>handlesurgery_change(index,"SurgeryProcedureName",e.target.value)} 
                    />
                    </FormControl>

               <FormControl component="fieldset" sx={{ mt: 0 }}>
              <Typography sx={{ fontWeight: 500 }} className='form-label'>Was a Blood Transfusion Needed? </Typography>
              <RadioGroup size="small"
                row
                name="EntityTypeId"
                value={details.BloodTransfusionNeeded}
                onChange={(e)=>handlesurgery_change(index,"BloodTransfusionNeeded",e.target.value)}
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
                value={details.AnaesthesiaType}
                onChange={(e)=>handlesurgery_change(index,"AnaesthesiaType",e.target.value)}
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
                  name="Value"
                  placeholder="Enter Number"
                  size="small"
                  defaultValue={details.RecoveryCycle.Value} 
                  onChange={(e) => handlesurgery_change(index, "RecoveryCycle", e.target.value, "Value")} 
                  style={{ flex: 1 }}
                />
            
              
              <Select
              labelId="content-type-label"
              name="InvestigationCategory"
              value={details.RecoveryCycle.Unit} 
              onChange={(e) => handlesurgery_change(index, "RecoveryCycle", e.target.value, "Unit")}
              displayEmpty
              MenuProps={customMenuProps}
              renderValue={(selected) => {
                if (!selected) {
                  return <span style={{ color: "#9ca3af" }}>Unit </span>; 
                }
                return all_unit_list?.find((item) => item._id === selected)?.lookup_value;
              }}
            >
              <MenuItem value="">
                <em>Unit </em>
              </MenuItem>
              {all_unit_list?.map((type) => (
                <MenuItem key={type._id} value={type._id}>
                  {type.lookup_value}
                </MenuItem>
              ))}
                          

          </Select>
              
              </div>
            </FormControl>


              
               <FormControl fullWidth size="small">
                <label className="form-label">Upload Discharge Summary/ Note </label>
                <TextField
                nam
                type='file'
                placeholder="DischargeSummaryUrlNote" 
                name="DischargeSummaryUrlNote" 
                size="small" 
                // value={patient_details.DateOfBirth} 
                onChange={(e)=>handlesingleImageChange(index,e,"DischargeSummaryUrlNote")} 
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
                        onClick={() => toggleArrayField(index, "PostSurgeryComplications", item._id)}
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
                onClick={save_surgery}
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
