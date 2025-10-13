
import React from 'react';
import { Plus, Edit } from 'lucide-react';
import { useEffect, useState,useRef } from 'react'
import { TextField, Select, MenuItem, FormControl, Button,CircularProgress  } from '@mui/material';
import api from '../../../../../api'
import Swal from 'sweetalert2';
import UniqueLoader from '../../../../loader';
import { customMenuProps } from '../../../../../utils/mui_select_scroll_bar';
import { Modal, } from 'react-bootstrap'; 
import PremiumDoctor from '../PremiumDoctor/PremiumDoctor';


const PatientReferral = ({patientId,selected_case_file,case_file_data,onRefresh}) => {


   const doctordetails=JSON.parse(localStorage.getItem("user"))
  
  


const [patient_referral, setpatient_referral] = useState({

        MedicalSpecialty:"",
        ReferredCity:"",
        ReferredDoctors:[],
        ReferralDateTime:"",
        ReferralType:"",
        PriorityLevel:"",
        AdditionalInformation:""

    });


   

const handlepatient_referralchange = (field, value) => {
  setpatient_referral(prev => ({
    ...prev,
    [field]: Array.isArray(prev[field]) ? [...value] : value
  }));
};


const toggleArrayField = (field, item) => {
  setpatient_referral(prev => {
    const currentArray = prev[field] || [];

    const itemId = typeof item === "string" ? item : item?._id;

    // Check if item exists
    const exists = currentArray.some(s =>
      typeof s === "string" ? s === itemId : s?._id === itemId
    );

    const updatedArray = exists
      ? currentArray.filter(s =>
          typeof s === "string" ? s !== itemId : s._id !== itemId
        )
      : [...currentArray, item];

    return {
      ...prev,
      [field]: updatedArray
    };
  });
};



//============================ get reason for referral data========================================
              
              const[form_loading,setform_loading]=useState("")

                 const[all_reason_for_referral,setall_reason_for_referral]=useState([])
                    const getall_reason_for_referral=async()=>
                    {
                      try {
                        setform_loading("reason")
                        const resp=await api.post('api/v1/admin/LookupList/',{lookupcodes:"reason_for_referral_type"})
                        setall_reason_for_referral(resp.data.data)
                        
                      } catch (error) {
                        console.log(error);
                        
                      }finally
                      {
                        setform_loading("")
                      }
                    }
                  
                  


//============================ get medical speciality=======================================


const[all_medical_speciality,setall_medical_speciality]=useState([])


const getall_medical_speciality = async () => {

  try {
    setform_loading("medical")
    const resp = await api.post('api/v1/admin/LookupList/', {
      lookupcodes: "medical_speciality",
    });

   
    
    setall_medical_speciality(resp.data.data);
  } catch (error) {
    console.error(error);
  }
  finally{
    setform_loading("")
  }
};


    

//= ================================get all station master list ======================================
                  
    const[allstationmaster,setallstationmaster]=useState([])
                 
  const getallstation_list = async () => {
    try {
        setform_loading("station")
      const resp = await api.post('api/v1/admin/StationList', 
        {  search: "",CountryGroupId:{}, });
      setallstationmaster(resp.data.data.list);
    } catch (error) {
      console.log(error);
    }
    finally
    {
        setform_loading("")
    }
  };



        





      const[isloading,setisloading]=useState(false)
      
     const save_patient_referral = async () => {
  setisloading(true);
  try {
    const payload=
          {...patient_referral,
            CaseFileId:selected_case_file,
            CreatedBy:doctordetails._id,
            PatientId:patientId,
            ReferringDoctor:doctordetails._id
          }
    const resp = await api.post(
      `api/v1/admin/patientreferral/createPatientReferral`,
      payload,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
console.log(resp);

    

    const { response_code, response_message } = resp.data.response;

    if (response_code === "201") {
      Swal.fire({
        icon: "success",
        title: "Details Added",
        text: "Patient Referral Created Successfully...",
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


    const[patient_all_cheif_complaints,setpatient_all_cheif_complaints]=useState([])

 const getall_patient_medical_history = async () => {
   try {
    //  setLoadingSpeciality(true);
     const resp = await api.get(`api/v1/admin/medical-history/list?PatientId=${patientId}&Status=Ongoing`);
 
        const formatted = resp.data.data.list.map(item => ({
          caseFileId: item.CaseFileId,
          complaints: item.ChiefComplaints
        }));
        setpatient_all_cheif_complaints(formatted);

 
     
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


  //========================== modal open or close start==========================================
    
    const [show, setShow] = useState(false)

    const handleShow =  () => {
        setShow(true)
        getall_medical_speciality()
    };

    const handleClose = () => setShow(false);


//====================== onchage event for ChiefComplaints start=================================



// ==============================edit chief complaints============================================

 const [showEdit, setShowEdit] = useState(false)

const handleShowEdit = () => {
  if (patient_all_cheif_complaints && patient_all_cheif_complaints.length > 0 && patient_all_cheif_complaints[0].complaints ) 

    {
      const normalizedComplaints = patient_all_cheif_complaints[0].complaints.map(
        ({ createdAt, updatedAt, _id, ...cc }) => ({
          ...cc,
          Symptoms: cc.Symptoms?.map((s) => (typeof s === "string" ? s : s?._id)),
          AggravatingFactors: cc.AggravatingFactors?.map((a) =>
            typeof a === "string" ? a : a._id
          ),
          Duration: {
            Value: cc.Duration?.Value || "",
            Unit:
              typeof cc.Duration?.Unit === "string"
                ? cc.Duration.Unit
                : cc.Duration?.Unit?._id || "",
          },
        })
      );

      setpatient_referral((prev) => ({
        ...prev,
        ChiefComplaints: normalizedComplaints,
      }));
 
  }

  setShowEdit(true);
};


const handleCloseEdit = () => {
  setShowEdit(false);
  setpatient_referral({
    ChiefComplaints: [
      {
        Symptoms: [],
        Duration: { Value: "", Unit: "" },
        SeverityGrade: "",
        AggravatingFactors: [],
      },
    ],
  });
};




      const update_chif_complaints = async () => {
        setisloading(true);
        try {
          const payload=
          {...patient_referral,
            CaseFileId:patient_all_cheif_complaints[0].caseFileId._id,
            UpdatedBy :doctordetails._id
          }
         
          
          const resp = await api.put(
            `api/v1/admin/medical-history/chief-complaints/edit-multiple`,
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
              text: "Chief Complaints Updated Successfully...",
              showConfirmButton: true,
              customClass: { confirmButton: "my-swal-button" },
            }).then(() => {
              // window.location.reload();
              onRefresh()
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
          Patient Referral
        </h3>
        {/* <div className="flex items-center space-x-4" style={{display:selected_case_file?"flex":"none"}}> */}
         <div className="flex items-center space-x-4" >
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
      
 {/* Show case_file_data section */}
{/* <div
  className="overflow-x-auto"
  style={{ display: selected_case_file ? "block" : "none" }}
>

  <div className="bg-[var(--button-back-color)] text-white">
    <div className="grid grid-cols-4 gap-4 p-2 text-[20px]">
      <h3 className="table-header">Chief Complaints</h3>
      <h3 className="table-header">Duration (Months)</h3>
      <h3 className="table-header">Severity Grade</h3>
      <h3 className="table-header">Aggravating Factor (s)</h3>
    </div>
  </div>


  <div className="divide-y divide-gray-200">
    {case_file_data?.length > 0 && case_file_data[0]?.Status === "Ongoing" &&
    case_file_data[0]?.ChiefComplaints?.map((item, index) => (
      <div
        key={item.id}
        className={`grid grid-cols-4 gap-4 p-4 ${
          index % 2 === 0 ? "bg-[#f2f3f6]" : "bg-white"
        }`}
      >
        <div className="text-sm text-gray-900 font-medium table-body">
            {item?.Symptoms?.map(sym => sym?.lookup_value).join(", ")}
        </div>
        <div className="text-sm text-gray-900">
          {item?.Duration?.Value} {item.Duration?.Unit?.lookup_value}
        </div>
        <div className="flex items-center">
          {renderSeverityGrade(item?.SeverityGrade)}
        </div>
        <div className="text-sm text-gray-900">
          {item?.AggravatingFactors?.map(ag => ag?.lookup_value).join(", ")}
        </div>
      </div>
    ))}
  </div>
</div> */}





      {/* Footer Note */}
      {/* <div className="p-4 bg-gray-50 border-t border-gray-200" style={{display:selected_case_file?"flex":"none"}}>
        <p className="text-xs text-gray-600">
          1. Added By Dr Gaurav Pande (Cardiology) (Regards M1234), (Contact 8373915529, Date/ Time 20 Sep 2025, 11:57 AM IST, Noida
        </p>
      </div> */}


  <Modal show={show} onHide={handleClose} centered size="lg">
        
              <Modal.Header closeButton>
                <Modal.Title className='form-title'>Add Patient Referral Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              
      
         <div>
      
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4 border border-gray-300 rounded-lg p-4">
              
{/*======================== patient referral==================================================== */}

        <div className='col-span-2'>
          <h5 className='form-title'>Patient Referral</h5>
      
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4 border border-gray-300 rounded-lg p-4">
                
                   <FormControl fullWidth size="small">
                        <label className="form-label">Reason for Referral </label>
                            <Select
                        labelId="content-type-label"
                        name="TherapyName"
                        // value={details.TherapyName}
                        // onChange={(e) => handleTherapyChange(index, "TherapyName",e.target.value,)} 
                        displayEmpty
                        MenuProps={customMenuProps}
                         onOpen={() => {
                            if (all_reason_for_referral.length === 0) { // prevent multiple calls
                            getall_reason_for_referral();
                            }
                        }}
                            renderValue={(selected) => {
                            if (!selected) {
                            return <span style={{ color: "#9ca3af" }}>Reason For Referral </span>; 
                            }
                            return all_reason_for_referral?.find((item) => item._id === selected)?.lookup_value;
                        }}
                        >
                        <MenuItem value="">
                            <em>Reason For Referral</em>
                        </MenuItem>
                         {form_loading==="reason" ? (
                        <MenuItem disabled>
                        <CircularProgress size={20} />
                        </MenuItem>
                    ) : (
                        all_reason_for_referral?.map((type) => (
                        <MenuItem key={type._id} value={type._id}>
                            {type.lookup_value}
                        </MenuItem>
                        ))
                    )}
                    </Select>
        
                        </FormControl>

                    <div className="col-span-2">
                  <FormControl fullWidth size="small">
                    <label className="form-label">Medical Specialty </label>
                    <div className="flex flex-wrap gap-2">
                      {form_loading === "medical" ? (
                        <CircularProgress />
                      ) : (
                        all_medical_speciality?.map((item) => {
                          const selected = patient_referral.MedicalSpecialty === item._id;
                          return (
                            <span
                              key={item._id}
                              onClick={() =>
                                setpatient_referral((prev) => ({
                                  ...prev,
                                  MedicalSpecialty: item._id,
                                }))
                              }
                              className={`px-3 py-1 text-sm rounded-md cursor-pointer flex items-center gap-2 
                                ${selected ? "bg-blue-500 text-white" : "bg-[#e2e4f4] text-gray-800"}`}
                            >
                              {item.lookup_value}
                              {selected && (
                                <span
                                  className="ml-1 text-xs font-bold cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setpatient_referral((prev) => ({
                                      ...prev,
                                      MedicalSpecialty: "",
                                    }));
                                  }}
                                >
                                  ✕
                                </span>
                              )}
                            </span>
                          );
                        })
                      )}
                    </div>
                  </FormControl>
                </div>

  
                    <FormControl fullWidth size="small">
                        <label className="form-label">Referred City </label>
                        <Select
                        labelId="content-type-label"
                        name="ReferredCity"
                        value={patient_referral.ReferredCity}
                        onChange={(e) => handlepatient_referralchange("ReferredCity",e.target.value,)} 
                        displayEmpty
                        MenuProps={customMenuProps}
                         onOpen={() => {
                            if (allstationmaster.length === 0) { // prevent multiple calls
                            getallstation_list();
                            }
                        }}
                            renderValue={(selected) => {
                            if (!selected) {
                            return <span style={{ color: "#9ca3af" }}>Referred City </span>; 
                            }
                            return allstationmaster?.find((item) => item._id === selected)?.StationName;
                        }}
                        >
                        <MenuItem value="">
                            <em>Referred City</em>
                        </MenuItem>
                         {form_loading==="station" ? (
                        <MenuItem disabled>
                        <CircularProgress size={20} />
                        </MenuItem>
                    ) : (
                        allstationmaster?.map((type) => (
                        <MenuItem key={type._id} value={type._id}>
                            {type.StationName}
                        </MenuItem>
                        ))
                    )}
                    </Select>
        
                    </FormControl>

                    <FormControl fullWidth size="small">
                    <label className="form-label">Date & Time </label>
                    <TextField
                    type='date'
                    value={patient_referral.ReferralDateTime}
                    onChange={(e) => handlepatient_referralchange("ReferralDateTime",e.target.value,)} 
                    />
        
                    </FormControl>

                     <FormControl fullWidth size="small">
                    <label className="form-label">Additional Information </label>
                    <TextField
                    type='text'
                    placeholder='Additional Information'
                    value={patient_referral.AdditionalInformation}
                    onChange={(e) => handlepatient_referralchange("AdditionalInformation",e.target.value,)}
                    />
        
                    </FormControl>

                     <FormControl fullWidth size="small">
                        <label className="form-label">Priority Level </label>
                        <Select
                        labelId="content-type-label"
                        name="ReferredCity"
                        value={patient_referral.PriorityLevel}
                        onChange={(e) => handlepatient_referralchange("PriorityLevel",e.target.value,)} 
                        displayEmpty
                        MenuProps={customMenuProps}
                            renderValue={(selected) => {
                            if (!selected) {
                            return <span style={{ color: "#9ca3af" }}>Priority Level </span>; 
                            }
                            return selected;
                        }}
                        >
                        <MenuItem value="">
                            <em>Priority Level</em>
                        </MenuItem>
                      
                        <MenuItem value="HIGH">HIGH</MenuItem>
                        <MenuItem value="MEDIUM">MEDIUM</MenuItem>
                        <MenuItem value="LOW">LOW</MenuItem>
                        <MenuItem value="URGENT">URGENT</MenuItem>
                    
                    </Select>
        
                    </FormControl>

                 <FormControl fullWidth size="small">
  <label className="form-label">Referral Type</label>
  <Select
    labelId="referral-type-label"
    name="ReferralType"
    value={patient_referral.ReferralType}
    onChange={(e) => handlepatient_referralchange("ReferralType", e.target.value)}
    displayEmpty
    MenuProps={customMenuProps}
    renderValue={(selected) => {
      if (!selected) {
        return <span className="text-gray-400">Referral Type</span>;
      }
      return selected; // simply return selected value
    }}
  >
    <MenuItem value="">
      <em>Referral Type</em>
    </MenuItem>
    <MenuItem value="GENERAL">GENERAL</MenuItem>
    <MenuItem value="SECOND_OPINION">MEDICAL_TOURISM</MenuItem>
    <MenuItem value="SECOND_OPINION">SECOND_OPINION</MenuItem>

  </Select>
</FormControl>



                  <div className='col-span-2'>
                        <label className="form-label">Referred Doctor </label>
                           <PremiumDoctor patientReferral={patient_referral} setPatientReferral={setpatient_referral} />
              </div>

        </div> 
       
    </div> 

    </div> 

   
               
               <div className="flex justify-end mt-4">
           

              <Button
                style={{ backgroundColor: "#52677D", fontFamily: "Lora", color: "white" }}
                onClick={save_patient_referral}
              >
                Save
              </Button>
            </div>

      
              </div> 
      
              </Modal.Body>
          
         
          </Modal>



{/* ====================================edit modal ============================================*/}




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

export default PatientReferral

