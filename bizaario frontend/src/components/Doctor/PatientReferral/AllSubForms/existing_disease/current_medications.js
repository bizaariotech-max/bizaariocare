
import React from 'react';
import { Plus, Edit } from 'lucide-react';

import { useEffect, useState } from 'react'
import { TextField, Select, MenuItem, FormControl, Button,  } from '@mui/material';
import api from '../../../../../api'
import Swal from 'sweetalert2';
import UniqueLoader from '../../../../loader';
import { customMenuProps } from '../../../../../utils/mui_select_scroll_bar';
import { Modal, } from 'react-bootstrap';


const CurrentMedication = ({patientId,selected_case_file,case_file_data}) => {

   const doctordetails=JSON.parse(localStorage.getItem("user"))
   
 
 const [current_medications, setcurrent_medications] = useState({
    CurrentMedications:{
            Medicines:[{MedicineName:"",Dosage:"",Duration:"" }],
            RecoveryCycle  : {Value:"",Unit:""},
            PrescriptionUrls  : [],
         }
    });


    //========================== modal open or close start==========================================
    
      const [show, setShow] = useState(false)
        const handleShow = () => setShow(true);
        const handleClose = () => setShow(false);
    
    //=========================== modal open or close end===============================================
// ===============================onchange events for ClinicalDiagnoses start============================


const handleMedicineChange = (index, field, value) => {
  setcurrent_medications(prev => {
    const updatedMedicines = [...prev.CurrentMedications.Medicines];
    updatedMedicines[index] = {
      ...updatedMedicines[index],
      [field]: value
    };

    return {
      ...prev,
      CurrentMedications: {
        ...prev.CurrentMedications,
        Medicines: updatedMedicines
      }
    };
  });
};

const handleMedicinePrescribedChange = (field, value, subField = null) => {
  setcurrent_medications(prev => {
    const updated = { ...prev.CurrentMedications };

    if (subField) {
      updated[field] = {
        ...updated[field],
        [subField]: value
      };
    } else {
      updated[field] = value;
    }

    return {
      ...prev,
      CurrentMedications: updated
    };
  });
};

//============================== handle multiple image upload==================================

const handlePrescriptionImagesChange = async (e) => {
  const files = e.target.files; // multiple files selected
  if (!files || files.length === 0) return;

  try {
    // Create FormData for all files
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
    }

    const resp = await api.post("api/v1/common/AddImage", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // ✅ Extract URLs from response
    if (
      resp.data?.response?.response_code === "200" &&
      resp.data.data?.length > 0
    ) {
      // Map each uploaded file to its URL
      const uploadedUrls = resp.data.data.map((item) => item.full_URL);

      // ✅ Append these URLs to state
      setcurrent_medications((prev) => ({
        ...prev,
        CurrentMedications: {
          ...prev.CurrentMedications,
          PrescriptionUrls: [
            ...prev.CurrentMedications.PrescriptionUrls,
            ...uploadedUrls,
          ],
        },
      }));
    }
  } catch (error) {
    console.error("Prescription images upload error:", error);
  }
};



// ====================================get all medicine list ===================================

    const[all_salt_master,setall_salt_master]=useState([])
      const getall_salt_master=async()=>
      {
        try {
            const resp=await api.post('api/v1/admin/LookupList/',{lookupcodes:"pharmaceutical_salt_master"})
         
          
          setall_salt_master(resp.data.data)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        getall_salt_master()
    
      },[])

//================================== get dosage list============================================

  const[all_dosage_type,setall_dosage_type]=useState([])
      const getall_dosage_type=async()=>
      {
        try {
          const resp=await api.post('api/v1/admin/LookupList/',{lookupcodes:"dosage_type"})
        
          
          setall_dosage_type(resp.data.data)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        getall_dosage_type()
    
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


// =================================add more function============================================


const handleAddMoreClinicalMedicines = () => {
  setcurrent_medications(prev => ({
    ...prev,
    CurrentMedications: {
      ...prev.CurrentMedications,
      Medicines: [
        ...prev.CurrentMedications.Medicines,
        { MedicineName: "", Dosage: "", Duration: "" }
      ]
    }
  }));
};

   const[isloading,setisloading]=useState(false)

const save_medication = async () => {
  setisloading(true);
  try {
    const payload=
          {...current_medications,
            PatientId:patientId,
            UpdatedBy:doctordetails._id
          }
    const resp = await api.post(`api/v1/admin/patient/current-medications/add`,
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
    setisloading(false);
  }
};


// =======================get all data of current medicines====================================
const[allcurrent_medicine_data,setallcurrent_medicine_data]=useState([])
  const[allcurrent_medications,setallcurrent_medications]=useState([])
 const getall_patient_current_medications = async () => {
   try {
    //  setLoadingSpeciality(true);
     const resp = await api.get(`api/v1/admin/patient/current-medications/list?PatientId=${patientId}`);
      setallcurrent_medications(resp.data.data.data.Medicines);
      setallcurrent_medicine_data(resp.data.data.data)
   } catch (error) {
     console.error(error);
   } finally {
    //  setLoadingSpeciality(false);
   }
 };
 
 useEffect(()=>
 {
 getall_patient_current_medications()
 },[])


// ========================================= edit modal ==========================================

      const [showEdit, setShowEdit] = useState(false)
        const handleShowEdit = () =>
          {
            setShowEdit(true);
            setcurrent_medications({...current_medications,CurrentMedications:allcurrent_medicine_data})

          } 
        const handleCloseEdit = () => setShowEdit(false);


          const handleRemoveMedicine = (index) => {
          Swal.fire({
            title: "Are you sure?",
            text: "This medication will be removed from the list.",
            icon: "warning",
            // showCancelButton: true,
            confirmButtonColor: "#52677D",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove it!",
            customClass: { confirmButton: "my-swal-button" },
          }).then((result) => {
            if (result.isConfirmed) {
            const updatemedication = [...current_medications.CurrentMedications.Medicines];
              updatemedication.splice(index, 1);
              setcurrent_medications(prev => ({
                ...prev,
                CurrentMedications: {
                  ...prev.CurrentMedications,
                  Medicines: updatemedication,
                },
              }));

        
              Swal.fire({
                title: "Removed!",
                text: "Medication has been removed.",
                icon: "success",
                customClass: {
                  confirmButton: "my-swal-button", // your custom CSS class
                },
              });

            }
          });
        };



  const update_medication = async () => {
  setisloading(true);
  try {
    const payload=
          {...current_medications,
            PatientId:patientId,
            UpdatedBy:doctordetails._id
          }
    const resp = await api.post(`api/v1/admin/patient/current-medications/edit`,
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
        text: "Patient Current Medication Details Updated Successfully...",
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
        <h2 className="text-xxl font-semibold text-gray-900">
          Current Medications
        </h2>
        <div className="flex items-center space-x-4">
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

      {/* Table */}
  {/* Table */}
<div className="overflow-x-auto">
  {/* Table Header */}
  <div className="bg-[var(--button-back-color)] text-white">
    <div className="grid grid-cols-4 gap-4 p-2 text-[16px] font-semibold">
      <h3 className="table-header">Medicine/Salt Name</h3>
      <h3 className="table-header">Dosage</h3>
      <h3 className="table-header">Frequency / Duration</h3>
      <h3 className="table-header">Action</h3>
    </div>
  </div>

  {/* Table Body */}
  {allcurrent_medications.map((item, index) => (
    <div
      key={index}
      className={`grid grid-cols-4 gap-4 p-4 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                }`}
    >
      {/* Medicine Name */}
      <div className="text-sm text-gray-900 font-medium">
        {item?.MedicineName?.lookup_value || "—"}
      </div>

      {/* Dosage */}
      <div className="text-sm text-gray-900">
        {item?.Dosage?.lookup_value || "—"}
      </div>

      {/* Duration */}
      <div className="text-sm text-gray-900">
        {item?.DurationInDays ? `${item.DurationInDays} Days` : "—"}
      </div>

      {/* Action (Remove Button) */}
      {/* <div>
        <button
          onClick={() => handleRemoveMedicine(index)}
          className="text-red-500 hover:text-red-700 font-bold"
        >
          ✕
        </button>
      </div> */}
    </div>
  ))}
</div>

 

      {/* Footer Note */}
      <div className="p-4 bg-gray-50 border-t border-gray-200" style={{display:selected_case_file?"block":"none"}}>
        <p className="text-xs text-gray-600">
          1. Added By Dr Gaurav Pande (Cardiology) (Regards M1234), (Contact 8373915529, Date/ Time 20 Sep 2025, 11:57 AM IST, Noida
        </p>
      </div>



 <Modal show={show} onHide={handleClose} centered size="lg">
        
              <Modal.Header closeButton>
                <Modal.Title className='form-title'>Add Current Medications</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              
      
         <div>
      
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4 border border-gray-300 rounded-lg p-4">
                

{/* ============================Medicines Prescribed ============================================ */}

 <div className='col-span-2'>
          <h5 className='form-title'>Medicines Prescribed </h5>
            
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4 ">
                {current_medications?.CurrentMedications?.Medicines?.map((details, index) => (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 col-span-2 border border-gray-300 rounded-lg p-2">
                 <FormControl fullWidth size="small">
                  <label className="form-label">Medicine Name </label>
                  <Select
                  labelId="content-type-label"
                  name="Nationality"
                  value={details.MedicineName} 
                  onChange={(e) => handleMedicineChange(index, "MedicineName", e.target.value)}
                  displayEmpty
                  MenuProps={customMenuProps}
                  renderValue={(selected) => {
                    if (!selected) {
                      return <span style={{ color: "#9ca3af" }}>Medicine Name </span>; 
                    }
                    return all_salt_master?.find((item) => item._id === selected)?.lookup_value;
                  }}
                >
                  <MenuItem value="">
                    <em>Medicine Name </em>
                  </MenuItem>
                  {all_salt_master?.map((type) => (
                    <MenuItem key={type._id} value={type._id}>
                      {type.lookup_value}
                    </MenuItem>
                  ))}
                              
  
              </Select>
            </FormControl>

             <FormControl fullWidth size="small">
                  <label className="form-label">Dosage </label>
                       <Select
                  labelId="content-type-label"
                  name="Nationality"
                   value={details.Dosage} 
                  onChange={(e) => handleMedicineChange(index, "Dosage", e.target.value)} 
                  displayEmpty
                  MenuProps={customMenuProps}
                  renderValue={(selected) => {
                    if (!selected) {
                      return <span style={{ color: "#9ca3af" }}>Dosage </span>; 
                    }
                    return all_dosage_type?.find((item) => item._id === selected)?.lookup_value;
                  }}
                >
                  <MenuItem value="">
                    <em>Dosage </em>
                  </MenuItem>
                  {all_dosage_type?.map((type) => (
                    <MenuItem key={type._id} value={type._id}>
                      {type.lookup_value}
                    </MenuItem>
                  ))}
              </Select>
              
                  </FormControl>

                    <FormControl fullWidth size="small">
                  <label className="form-label">Duration (Days) </label>
                  <TextField
                  type='text'
                  placeholder="Duration In Days" 
                  name="Duration" 
                  size="small" 
                  value={details.Duration} 
                  onChange={(e) => handleMedicineChange(index, "Duration", e.target.value)} 
                  />
                  </FormControl>

                <div className="flex justify-between mt-8 h-8">
               <Button
                variant="outlined"
                color="error"
                // onClick={() => handleRemoveMedicine(index)}
              >
                Remove
              </Button>

              
            </div>

                  </div>
                ))}
             

             


             

                   <FormControl fullWidth size="small">
                  <label className="form-label">Recovery Cycle</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {/* Number input */}
                    <TextField
                      type="number"
                      name="Value"
                      placeholder="Enter Number"
                      size="small"
                      defaultValue={current_medications.CurrentMedications.RecoveryCycle.Value} 
                       onChange={(e) => handleMedicinePrescribedChange( "RecoveryCycle", e.target.value, "Value")} 
                      style={{ flex: 1 }}
                    />
                
                  
                 <Select
                  labelId="content-type-label"
                  name="Unit"
                  value={current_medications.CurrentMedications.RecoveryCycle.Unit} 
                  onChange={(e) => handleMedicinePrescribedChange("RecoveryCycle",e.target.value, "Unit")}
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
                  <label className="form-label">Upload Prescriptions  </label>
                  <TextField
                  inputProps={{ multiple: true }}
                  type='file'
                  placeholder="Prescription Urls" 
                  name="PrescriptionUrls" 
                  size="small" 
                  // value={medical_history.MedicinesPrescribed.PrescriptionUrls} 
                  onChange={(e)=>handlePrescriptionImagesChange(e)} 
                  />
                  </FormControl>
      
                
    
            
        </div> 

       
               
      </div> 





    </div> 

   
               
               <div className="flex justify-between mt-4">
               <Button
                style={{ backgroundColor: "#52677D", fontFamily: "Lora", color: "white" }}
                onClick={handleAddMoreClinicalMedicines}
              >
                Add More
              </Button>

              <Button
                style={{ backgroundColor: "#52677D", fontFamily: "Lora", color: "white" }}
                onClick={save_medication}
              >
                Save
              </Button>
             
            </div>

      
              </div> 
      
              </Modal.Body>
          
         
          </Modal>


  {/*==================================== edit modal======================================== */}

  <Modal show={showEdit} onHide={handleCloseEdit} centered size="lg">
        
              <Modal.Header closeButton>
                <Modal.Title className='form-title'>Add Current Medications</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              
      
         <div>
      
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4 border border-gray-300 rounded-lg p-4">
                

{/* ============================Medicines Prescribed ============================================ */}

 <div className='col-span-2'>
          <h5 className='form-title'>Medicines Prescribed </h5>
            
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4 ">
                {current_medications?.CurrentMedications?.Medicines?.map((details, index) => (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 col-span-2 border border-gray-300 rounded-lg p-2">
                 <FormControl fullWidth size="small">
                  <label className="form-label">Medicine Name </label>
                  <Select
                  labelId="content-type-label"
                  name="Nationality"
                  value={details.MedicineName._id || details.MedicineName} 
                  onChange={(e) => handleMedicineChange(index, "MedicineName", e.target.value)}
                  displayEmpty
                  MenuProps={customMenuProps}
                  renderValue={(selected) => {
                    if (!selected) {
                      return <span style={{ color: "#9ca3af" }}>Medicine Name </span>; 
                    }
                    return all_salt_master?.find((item) => item._id === selected)?.lookup_value;
                  }}
                >
                  <MenuItem value="">
                    <em>Medicine Name </em>
                  </MenuItem>
                  {all_salt_master?.map((type) => (
                    <MenuItem key={type._id} value={type._id}>
                      {type.lookup_value}
                    </MenuItem>
                  ))}
                              
  
              </Select>
            </FormControl>

             <FormControl fullWidth size="small">
                  <label className="form-label">Dosage </label>
                       <Select
                  labelId="content-type-label"
                  name="Nationality"
                   value={details.Dosage._id || details.Dosage} 
                  onChange={(e) => handleMedicineChange(index, "Dosage", e.target.value)} 
                  displayEmpty
                  MenuProps={customMenuProps}
                  renderValue={(selected) => {
                    if (!selected) {
                      return <span style={{ color: "#9ca3af" }}>Dosage </span>; 
                    }
                    return all_dosage_type?.find((item) => item._id === selected)?.lookup_value;
                  }}
                >
                  <MenuItem value="">
                    <em>Dosage </em>
                  </MenuItem>
                  {all_dosage_type?.map((type) => (
                    <MenuItem key={type._id} value={type._id}>
                      {type.lookup_value}
                    </MenuItem>
                  ))}
              </Select>
              
                  </FormControl>

                    <FormControl fullWidth size="small">
                  <label className="form-label">Duration (Days) </label>
                  <TextField
                  type='text'
                  placeholder="Duration In Days" 
                  name="Duration" 
                  size="small" 
                  value={details.Duration} 
                  onChange={(e) => handleMedicineChange(index, "Duration", e.target.value)} 
                  />
                  </FormControl>

                <div className="flex justify-between mt-8 h-8">
               <Button
                variant="outlined"
                color="error"
                onClick={() => handleRemoveMedicine(index)}
              >
                Remove
              </Button>

              
            </div>

                  </div>
                ))}
             

                   <FormControl fullWidth size="small">
                  <label className="form-label">Recovery Cycle</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {/* Number input */}
                    <TextField
                      type="number"
                      name="Value"
                      placeholder="Enter Number"
                      size="small"
                      defaultValue={current_medications.CurrentMedications.RecoveryCycle.Value} 
                       onChange={(e) => handleMedicinePrescribedChange( "RecoveryCycle", e.target.value, "Value")} 
                      style={{ flex: 1 }}
                    />
                
                  
                 <Select
                  labelId="content-type-label"
                  name="Unit"
                  value={current_medications?.CurrentMedications?.RecoveryCycle?.Unit._id || current_medications?.CurrentMedications?.RecoveryCycle?.Unit} 
                  onChange={(e) => handleMedicinePrescribedChange("RecoveryCycle",e.target.value, "Unit")}
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
                  <label className="form-label">Upload Prescriptions  </label>
                  <TextField
                  inputProps={{ multiple: true }}
                  type='file'
                  placeholder="Prescription Urls" 
                  name="PrescriptionUrls" 
                  size="small" 
                  // value={medical_history.MedicinesPrescribed.PrescriptionUrls} 
                  onChange={(e)=>handlePrescriptionImagesChange(e)} 
                  />
                  </FormControl>
      
                
    
            
        </div> 

       
               
      </div> 





    </div> 

   
               
               <div className="flex justify-between mt-4">
               <Button
                style={{ backgroundColor: "#52677D", fontFamily: "Lora", color: "white" }}
                onClick={handleAddMoreClinicalMedicines}
              >
                Add More
              </Button>

              <Button
                style={{ backgroundColor: "#52677D", fontFamily: "Lora", color: "white" }}
                onClick={update_medication}
              >
                Update
              </Button>
             
            </div>

      
              </div> 
      
              </Modal.Body>
          
         
          </Modal>


  {/*=========================== loader======================================= */}

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
}

export default CurrentMedication

