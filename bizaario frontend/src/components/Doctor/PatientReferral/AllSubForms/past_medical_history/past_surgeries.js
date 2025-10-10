import React from 'react';
import { Plus, Edit } from 'lucide-react';
import { useEffect, useState } from 'react'
import { TextField, Select, MenuItem, FormControl,Typography,  Button, Radio, FormControlLabel, RadioGroup } from '@mui/material';
import api from '../../../../../api'
import Swal from 'sweetalert2';
import UniqueLoader from '../../../../loader';
import { customMenuProps } from '../../../../../utils/mui_select_scroll_bar';
import { Modal,} from 'react-bootstrap';


const PastSurgeries = ({patientId,selected_case_file,case_file_data}) => {

  const[isloading,setisloading]=useState(false)

  const doctordetails=JSON.parse(localStorage.getItem("user"))

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
     SurgeriesProcedures: [                // overwrite or add to ChiefComplaints
       ...(prev.SurgeriesProcedures || []),
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


      //================================== get surgery procedure list============================================

  const[all_surgery_procedure,setall_surgery_procedure]=useState([])

      const getall_surgery_procedure=async()=>
      {
        try {
          const resp=await api.post('api/v1/admin/LookupList/',{lookupcodes:"procedure_master"})
          setall_surgery_procedure(resp.data.data)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        getall_surgery_procedure()
    
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
        setisloading(true);
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
              text: "Past Surgery Details Added Successfully...",
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
          setisloading(false);
        }
      };


//=============================== get patient all medical history===================================

const[patient_past_surgeries,setpatient_past_surgeries]=useState([])

 const getall_patient_medical_history = async () => {
   try {
    //  setLoadingSpeciality(true);
     const resp = await api.get(`api/v1/admin/medical-history/list?PatientId=${patientId}&Status=Past`);
 
     
        const formatted = resp.data.data.list.map(item => ({
          caseFileId: item.CaseFileId._id,
          treatmentType: item.CaseFileId.TreatmentType,
          surgeries: item.SurgeriesProcedures
        }));
        setpatient_past_surgeries(formatted);

 
     
   } catch (error) {
     console.error(error);
   } finally {
    //  setLoadingSpeciality(false);
   }
 };
 
 useEffect(()=>
 {
 getall_patient_medical_history()
 },[])

 

//======================================== edit================================================


  const [showEdit, setShowEdit] = useState(false)
  
  const handleCloseEdit = () => setShowEdit(false);


  

  const handleShowEdit = () => {
  if (patient_past_surgeries && patient_past_surgeries.length > 0) {
    const normalizedComplaints = patient_past_surgeries[0].surgeries.map(
      ({ createdAt, updatedAt, _id, ...cc }) => ({
        ...cc,
        MedicalSpeciality: cc.MedicalSpeciality ?typeof cc.MedicalSpeciality==="string" ?
          cc.MedicalSpeciality : cc.MedicalSpeciality._id :"",
        SurgeryProcedureName: cc.SurgeryProcedureName ? typeof cc.SurgeryProcedureName==="string" ?
          cc.SurgeryProcedureName : cc.SurgeryProcedureName._id :"",
        PostSurgeryComplications: cc.PostSurgeryComplications.map(a => (typeof a === "string" ? a : a._id)),
        RecoveryCycle: {
          Value: cc.RecoveryCycle.Value,
          Unit: typeof cc.RecoveryCycle.Unit === "string" ? cc.RecoveryCycle.Unit : cc.RecoveryCycle.Unit._id
        }
      })
    );

    setsurgeries(prev => ({
      ...prev,
      SurgeriesProcedures: normalizedComplaints
    }));
  }

  setShowEdit(true);
};


  const update_surgery = async () => {
        setisloading(true);
        try {
          const payload=
          {...surgeries,
            CaseFileId:selected_case_file,
            UpdatedBy:doctordetails._id
            
          }
         
          const resp = await api.put(
            `api/v1/admin/medical-history/surgeries-procedures/edit-multiple`,
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
              text: "Past Surgery Details Added Successfully...",
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
          setisloading(false);
        }
      };



  return (
    <div className="space mt-4">
      {/* Header */}
   
            <div className="flex items-center justify-between mt-2  border-b border-gray-200">
              <h3 className="text-xxl font-semibold text-gray-900">
                Past Surgeries
              </h3>
              <div className="flex items-center space-x-4" style={{display:selected_case_file?"flex":"none"}}>
                <button className="flex items-center space-x-2 text-[var(--primary-color)] hover:text-blue-700 transition-colors">
                  <span className="text-sm font-medium underline" onClick={handleShow}>Add</span>
                  <Plus className="w-4 h-4" />
                </button>
                <button className="flex items-center space-x-2 text-[var(--primary-color)] hover:text-blue-700 transition-colors">
                  <Edit className="w-4 h-4" />
                  <span className="text-sm font-medium underline" onClick={handleShowEdit}>Edit</span>
                </button>
              </div>
            </div>


        {/* <div className="flex gap-2 flex-nowrap overflow-x-auto sm:overflow-visible mt-10" style={{cursor:"pointer"}}>

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
    </div> */}


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


      <div  className="relative">
     

        {/* Your existing cards */}
        <div className='card-details' style={{marginTop:"20px"}}>
          {/* <h3 className='table-header'>{item.date}</h3> */}
       
             {/* Table */}
      <div className="overflow-x-auto" style={{ display: selected_case_file ? "block" : "none" }}>
        {/* Table Header */}
        <div className="bg-[var(--button-back-color)] text-white  " >
          <div className="grid grid-cols-2 gap-4 p-2 text-[20px]">
            <h3 className="table-header">Surgery/Procedure Name</h3>
            <h3 className="table-header">Surgon Name</h3>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200">
          {case_file_data?.[0]?.Status === "Past" &&
          case_file_data?.[0]?.SurgeriesProcedures?.map((item, index) => (
            <div
              key={item.id}
              className={`grid grid-cols-2 gap-4 p-4 ${index % 2 === 0 ? 'bg-[#f2f3f6]' : 'bg-white'
                }`}
            >
             <div className="text-sm text-gray-900 font-medium table-body">
              {item?.SurgeryProcedureName?item.SurgeryProcedureName.lookup_value :"—"}
            </div>

            {/* Duration */}
            <div className="text-sm text-gray-900 table-body">
             {item?.SurgeonName?item.SurgeonName :"—"}
            </div>
             
              
            </div>
          ))}
        </div>
      </div>

      {/* Show patient_all_cheif_complaints section only if case_file_data is empty */}
{(!case_file_data || case_file_data.length === 0) &&
  patient_past_surgeries?.map((caseFile, caseIndex) => (
    <div key={caseFile.caseFileId} className="mb-6">
      {/* Case File Header */}
      <h3 className="text-xl font-bold mb-2">
        {caseFile.treatmentType} (Case File ID: {caseFile.caseFileId})
      </h3>

      {/* Table Header */}
      <div className="bg-[var(--button-back-color)] text-white">
        <div className="bg-[var(--button-back-color)] text-white  " >
          <div className="grid grid-cols-2 gap-4 p-2 text-[20px]">
            <h3 className="table-header">Surgery/Procedure Name</h3>
            <h3 className="table-header">Surgon Name</h3>
          </div>
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-200">
        {caseFile?.surgeries?.map((item, index) => (
          <div
            key={index}
            className={`grid grid-cols-2 gap-4 p-4 ${
              index % 2 === 0 ? "bg-[#f2f3f6]" : "bg-white"
            }`}
          >
       
          

           <div className="text-sm text-gray-900 font-medium table-body">
              {item?.SurgeryProcedureName?item.SurgeryProcedureName.lookup_value :"—"}
            </div>

            {/* Duration */}
            <div className="text-sm text-gray-900 table-body">
             {item?.SurgeonName?item.SurgeonName :"—"}
            </div>

          </div>
        ))}
      </div>
    </div>
  ))}

        </div>
    
        {/* <div className='card-details'>
          <CurrentMedicineForPastSurgeries/>
        </div> */}
    
      
    
       
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
                  <Select
                        labelId="content-type-label"
                        name="MedicalSpeciality"
                        value={details.SurgeryProcedureName}
                        onChange={(e)=>handlesurgery_change(index,"SurgeryProcedureName",e.target.value)}
                        displayEmpty
                        MenuProps={customMenuProps}
                        renderValue={(selected) => {
                          if (!selected) {
                            return <span style={{ color: "#9ca3af" }}>Surgery Procedure </span>; 
                          }
                          return all_surgery_procedure?.find((item) => item._id === selected)?.lookup_value;
                        }}
                      >
                        <MenuItem value="">
                          <em>Surgery Procedure </em>
                        </MenuItem>
                        {all_surgery_procedure?.map((type) => (
                          <MenuItem key={type._id} value={type._id}>
                            {type.lookup_value}
                          </MenuItem>
                        ))}
                                    
        
                    </Select>
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



{/*======================================== edit modal =========================================*/}

 <Modal show={showEdit} onHide={handleCloseEdit} centered size="lg">
        
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
                  
                    value={
                      details.Date
                        ? new Date(details.Date).toISOString().split("T")[0]
                        : ""
                    } 
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
                  <Select
                        labelId="content-type-label"
                        name="MedicalSpeciality"
                        value={details.SurgeryProcedureName}
                        onChange={(e)=>handlesurgery_change(index,"SurgeryProcedureName",e.target.value)}
                        displayEmpty
                        MenuProps={customMenuProps}
                        renderValue={(selected) => {
                          if (!selected) {
                            return <span style={{ color: "#9ca3af" }}>Surgery Procedure </span>; 
                          }
                          return all_surgery_procedure?.find((item) => item._id === selected)?.lookup_value;
                        }}
                      >
                        <MenuItem value="">
                          <em>Surgery Procedure </em>
                        </MenuItem>
                        {all_surgery_procedure?.map((type) => (
                          <MenuItem key={type._id} value={type._id}>
                            {type.lookup_value}
                          </MenuItem>
                        ))}
                                    
        
                    </Select>
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
                onClick={update_surgery}
              >
                Update
              </Button>
            </div>

      
              {/* </div>  */}
      
              </Modal.Body>
          
         
          </Modal>

                {isloading && (
                      <div
                        style={{
                          position: 'fixed',
                          inset: 0,
                          background: 'rgba(255, 255, 255, 0.6)',
                          zIndex: 9999,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <UniqueLoader />
                      </div>
                    )}
                    

    </div>
  );
};

export default PastSurgeries;
