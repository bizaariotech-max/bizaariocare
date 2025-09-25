import React from 'react';
import { Plus, Edit } from 'lucide-react';
import generalphysician from '../AllSubForms/assets/images/general physician.png'
import ChiefComplaintsForMedicalSummary from './chief_complaints_for_medical_summary';
import DiagnosticsInvestigationsForMedicalSummary from './Diagnostics_investigations';
import CurrentMedicinesForMedicalSummary from './current_medicines_for_medical_summary';
import CurrentTherapyForMedicalSummary from './current_therapy_for_medical_summary';
import { useEffect, useState } from 'react'
import { TextField, Select, MenuItem, FormControl, Button,  } from '@mui/material';
import api from '../../../../api'
import Swal from 'sweetalert2';
import UniqueLoader from '../../../loader';
import { customMenuProps } from '../../../../utils/mui_select_scroll_bar';
import { Modal, } from 'react-bootstrap';
import { __postApiData } from "../../../../utils/api";


const PastIllness = (patientId) => {



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

//============================= main form state start ============================================

  const [medical_history, setmedical_history] = useState({
    PatientId:"68ce3b785c9caf7ccffeede8",
    DoctorHospitalInfo:{
          Date :"",
          DoctorName:"",
          DoctorNumber :"",
          HospitalName :"",
          HospitalLocation :"",
          MedicalSpeciality :"",
    },
      ChiefComplaints:[{
            Symptoms:[],
            Duration : {Value:"",Unit:""},
            SeverityGrade : '',
            AggravatingFactors : []
      }],
      ClinicalDiagnoses :[{
            Date:"",
            InvestigationCategory : '',
            Investigation : '',
            Abnormalities  : [],
            ReportUrl : "",
            InterpretationUrl:""
    }],
    MedicinesPrescribed:{
            Medicines:[{MedicineName:"",Dosage:"",DurationInDays:"" }],
            RecoveryCycle  : {Value:"",Unit:""},
            PrescriptionUrls  : [],
    },
    Therapies :[{
            TherapyName:"",
            PatientResponse:""
        }]

    });

//=================================== main form state end=========================================


//========================== modal open or close start==========================================

  const [show, setShow] = useState(false)
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

//=========================== modal open or close end===============================================
 

// ===============================get all therapy data(change for medical speciality)====================================

     const[all_therapy_master,setall_therapy_master]=useState([])
          const getall_therapy_master=async()=>
          {
            try {
              const resp=await api.post('api/v1/admin/LookupList/',{lookupcodes:"therapy_type"})
              console.log(resp);
              
              setall_therapy_master(resp.data.data)
              
            } catch (error) {
              console.log(error);
              
            }
          }
        
          useEffect(()=>
          {
            getall_therapy_master()
        
          },[])


//============================ get symptom class data=======================================
          
          
             const[all_symptom_class_master,setall_symptom_class_master]=useState([])
                const getall_symptom_class_master=async()=>
                {
                  try {
                    const resp=await api.post('api/v1/admin/LookupList/',{lookupcodes:"symptom_class_type"})
                    console.log(resp);
                    
                    setall_symptom_class_master(resp.data.data)
                    
                  } catch (error) {
                    console.log(error);
                    
                  }
                }
              
                useEffect(()=>
                {
                  getall_symptom_class_master()
              
                },[])
          
          

              
//= ================================get all aggravatingFactor======================================
          
          
                const[allaggravating_master,setallaggravating_master]=useState([])
                const getall_aggravating_master=async()=>
                {
                  try {
                    const resp=await api.post('api/v1/admin/LookupList/',{lookupcodes:"aggravating_factor_master"})
                    console.log(resp);
                    
                    setallaggravating_master(resp.data.data)
                    
                  } catch (error) {
                    console.log(error);
                    
                  }
                }
              
                useEffect(()=>
                {
                  getall_aggravating_master()
              
                },[])


//====================================== get all medical speciality =====================================


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



      //====================================== get all investigation category =====================================


       const[all_investigation_category,setall_investigation_category]=useState([])
      const getall_investigation_category=async()=>
      {
        try {
          const resp=await api.post('api/v1/admin/LookupList/',{lookupcodes:"investigation_category_type"})
          console.log(resp);
          
          setall_investigation_category(resp.data.data)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        getall_investigation_category()
    
      },[])

//=============================== get investigation list======================================

     const[all_investigation_master,setall_investigation_master]=useState([])
        const getall_investigation_master=async()=>
        {
          try {
              const resp=await api.post(`api/v1/admin/investigationList`)
            console.log(resp);
            
            setall_investigation_master(resp.data.data.list)
            
          } catch (error) {
            console.log(error);
            
          }
        }
  
    
        useEffect(()=>
        {
          getall_investigation_master()
      
        },[])


// ====================================get all medicine list ===================================

    const[all_salt_master,setall_salt_master]=useState([])
      const getall_salt_master=async()=>
      {
        try {
            const resp=await api.post('api/v1/admin/LookupList/',{lookupcodes:"pharmaceutical_salt_master"})
          console.log(resp);
          
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
          console.log(resp);
          
          setall_dosage_type(resp.data.data)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        getall_dosage_type()
    
      },[])


  
  
//============================ Handle single image upload========================================

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
      setmedical_history((prev) => {
        const updatedClinicalDiagnoses = [...prev.ClinicalDiagnoses];
        updatedClinicalDiagnoses[index] = {
          ...updatedClinicalDiagnoses[index],
          [fieldName]: imageUrl, // <-- dynamic field update
        };
        return {
          ...prev,
          ClinicalDiagnoses: updatedClinicalDiagnoses,
        };
      });
    }
  } catch (error) {
    console.error("Image upload error:", error);
  }
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
      setmedical_history((prev) => ({
        ...prev,
        MedicinesPrescribed: {
          ...prev.MedicinesPrescribed,
          PrescriptionUrls: [
            ...prev.MedicinesPrescribed.PrescriptionUrls,
            ...uploadedUrls,
          ],
        },
      }));
    }
  } catch (error) {
    console.error("Prescription images upload error:", error);
  }
};


//================================== get dosage list============================================

  const[all_unit_list,setall_unit_list]=useState([])
      const getall_unitlist=async()=>
      {
        try {
          const resp=await api.post('api/v1/admin/LookupList/',{lookupcodes:"duration_unit_type"})
          console.log(resp);
          
          setall_unit_list(resp.data.data)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        getall_unitlist()
    
      },[])

          
//========================================= color bar=============================================

 const renderColorBar = (index) => {
  const segments = [
    { color: 'bg-green-600', title: "H1", desc: "Mild", value: 1 },
    { color: 'bg-green-500', title: "H2", desc: "Mild", value: 2 },
    { color: 'bg-yellow-300', title: "H3", desc: "Mild", value: 3 },
    { color: 'bg-yellow-500', title: "H4", desc: "Mild", value: 4 },
    { color: 'bg-orange-400', title: "H5", desc: "Mild", value: 5 },
    { color: 'bg-red-600', title: "H6", desc: "Mild", value: 6 },
  ];

  // Map bg classes to corresponding text color classes
  const textColorMap = {
    'bg-green-600': 'text-green-600',
    'bg-green-500': 'text-green-500',
    'bg-yellow-300': 'text-yellow-300',
    'bg-yellow-500': 'text-yellow-500',
    'bg-orange-400': 'text-orange-400',
    'bg-red-600': 'text-red-600',
  };

  const handleClick = (value) => {
    setmedical_history(prev => {
      const updatedChiefComplaints = [...prev.ChiefComplaints];
      updatedChiefComplaints[index] = {
        ...updatedChiefComplaints[index],
        SeverityGrade: value,
      };
      return { ...prev, ChiefComplaints: updatedChiefComplaints };
    });
  };

  const selectedValue = medical_history.ChiefComplaints[index].SeverityGrade;
  const selectedSegment = segments.find(seg => seg.value === selectedValue);

  return (
    <div>
      {/* Color Bar */}
      <div className="flex w-full h-10 mb-2">
        {segments.map((segment, idx) => (
          <div
            key={idx}
            onClick={() => handleClick(segment.value)}
            className={`flex-1 flex flex-col items-center justify-center cursor-pointer ${segment.color} text-white hover:opacity-80 transition`}
          >
            <span className="text-sm font-bold">{segment.title}</span>
            <span className="text-xs">{segment.desc}</span>
          </div>
        ))}
      </div>

      {/* Selected Value with matching text color */}
      <div style={{display:selectedSegment?"block":"none",position:"absolute"}} className={`text-center font-semibold py-1 ${textColorMap[selectedSegment?.color] || 'text-black'}`}>
        Value: {selectedValue || "-"}
      </div>
    </div>
  );
};



// ==============================all add more function start=====================================

const handleAddMore = () => {
  setmedical_history(prev => ({
    ...prev,                         
    ChiefComplaints: [              
      ...(prev.ChiefComplaints || []),
      { Symptoms: [],Duration: "", SeverityGrade: "", AggravatingFactors: [] } // new item
    ],
  }));
};


const handleAddMoreClinicalDiagnosis = () => {
  setmedical_history(prev => ({
    ...prev,                        
    ClinicalDiagnoses: [              
      ...(prev.ClinicalDiagnoses || []),
      { Date: "", Investigation_Category: "", Investigation: "", Abnormalities:[], UploadReport: [],UploadInterpretation:[] } // new item
    ],
  }));
};

const handleAddMoreClinicalMedicines = () => {
  setmedical_history(prev => ({
    ...prev,
    MedicinesPrescribed: {
      ...prev.MedicinesPrescribed,
      Medicines: [
        ...prev.MedicinesPrescribed.Medicines,
        { MedicineName: "", Dosage: "", DurationInDays: "" }
      ]
    }
  }));
};


const handleAddMoreClinicalTherapy = () => {
  setmedical_history(prev => ({
    ...prev,                      
    Therapies: [                
      ...(prev.Therapies || []),
      { TherapyName: "", PatientsResponse: "" } 
    ],
  }));
};


//=============================== all add more function end===================================


//========================= all onchange event for DoctorHospitalInfo ===========================================

const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  setmedical_history(prev => ({
    ...prev, // keep the rest of the state untouched
    DoctorHospitalInfo: {
      ...prev.DoctorHospitalInfo,
      [name]: type === "checkbox" ? checked : value
    }
  }));
};

//====================== onchage event for ChiefComplaints start=================================


const handleChiefComplaintsChange = (index, field, value, subField = null) => {
  setmedical_history(prev => {
    const updatedChiefComplaints = [...prev.ChiefComplaints];
    const complaint = { ...updatedChiefComplaints[index] };

    if (subField) {
      // For nested objects like Duration {Value, Unit}
      complaint[field] = {
        ...complaint[field],
        [subField]: value
      };
    } else {
      // For direct fields like SeverityGrade, Symptoms, AggravatingFactors
      complaint[field] = value;
    }

    updatedChiefComplaints[index] = complaint;

    return {
      ...prev,
      ChiefComplaints: updatedChiefComplaints
    };
  });
};


const toggleArrayField = (index, field, itemId) => {
  setmedical_history(prev => {
    const updatedChiefComplaints = [...prev.ChiefComplaints];
    const complaint = { ...updatedChiefComplaints[index] };
    const currentArray = complaint[field] || [];

    if (currentArray.includes(itemId)) {
      complaint[field] = currentArray.filter(id => id !== itemId);
    } else {
      complaint[field] = [...currentArray, itemId];
    }

    updatedChiefComplaints[index] = complaint;

    return {
      ...prev,
      ChiefComplaints: updatedChiefComplaints
    };
  });
};

//====================== onchage event for ChiefComplaints end=================================

// ===============================onchange events for ClinicalDiagnoses start============================


const handleClinicalDiagnosisChange = (index, field, value) => {
  setmedical_history(prev => {
    const updatedClinicalDiagnosis = [...prev.ClinicalDiagnoses];
    const diagnosis = { ...updatedClinicalDiagnosis[index] };

   
    diagnosis[field] = value;
    
    updatedClinicalDiagnosis[index] = diagnosis;

    return {
      ...prev,
      ClinicalDiagnoses: updatedClinicalDiagnosis
    };
  });
};


const toggleArrayFieldClinicalDiagnosis = (index, field, itemId) => {
  setmedical_history(prev => {
    const updatedClinicalDiagnosis = [...prev.ClinicalDiagnoses];
    const diagnosis = { ...updatedClinicalDiagnosis[index] };
    const currentArray = diagnosis[field] || [];

    if (currentArray.includes(itemId)) {
      diagnosis[field] = currentArray.filter(id => id !== itemId);
    } else {
      diagnosis[field] = [...currentArray, itemId];
    }

    updatedClinicalDiagnosis[index] = diagnosis;

    return {
      ...prev,
      ClinicalDiagnoses: updatedClinicalDiagnosis
    };
  });
};


// ===============================onchange events for ClinicalDiagnoses end============================


// ===============================onchange events for ClinicalDiagnoses start============================


const handleMedicineChange = (index, field, value) => {
  setmedical_history(prev => {
    const updatedMedicines = [...prev.MedicinesPrescribed.Medicines];
    updatedMedicines[index] = {
      ...updatedMedicines[index],
      [field]: value
    };

    return {
      ...prev,
      MedicinesPrescribed: {
        ...prev.MedicinesPrescribed,
        Medicines: updatedMedicines
      }
    };
  });
};

const handleMedicinePrescribedChange = (field, value, subField = null) => {
  setmedical_history(prev => {
    const updated = { ...prev.MedicinesPrescribed };

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
      MedicinesPrescribed: updated
    };
  });
};



// ===============================onchange events for ClinicalDiagnoses end============================


// ===============================onchange events for therapy start============================


const handleTherapyChange = (index, field, value) => {
  setmedical_history(prev => {
    const updatedTherapy = [...prev.Therapies];
    const newtherapy = { ...updatedTherapy[index] };

   
    newtherapy[field] = value;
    
    updatedTherapy[index] = newtherapy;

    return {
      ...prev,
      Therapies: updatedTherapy
    };
  });
};


// ===============================onchange events for therapy end============================


console.log(medical_history);

const[isloading,setisloading]=useState(false)

const save_chif_complaints = async () => {
  setisloading(true);
  try {
    const payload={...medical_history,patientId:patientId.patientId}
    const resp = await api.post(
      `api/v1/admin/medicalHistory/saveMedicalHistory`,
      payload,
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
    setisloading(false);
  }
};

  return (
    <div className="space">
    
    <div className="bg-[rgba(189,196,212,0.2)] p-4 rounded-lg border border-gray-200 ">

        <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Past Illness
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
              Tuberculosis(TB)
            </span>

               <span
              className="px-3 py-1 bg-[#e2e4f4]  text-sm rounded-md"
            >
              Pneumonia
            </span>

        </div>
      </div>


        <div className="flex gap-2 flex-nowrap overflow-x-auto sm:overflow-visible mt-10" style={{cursor:"pointer"}}>

        <div className='medical-card' >
        <img src={generalphysician} alt=''></img>
        <p style={{ margin: 0,  fontWeight: "600",fontFamily:"Lora",whiteSpace: "nowrap" }}>General Physician</p>
        </div>

        
        <div className='medical-card' >
            <img src={generalphysician} alt=''></img>
            <p style={{ margin: 0,  fontWeight: "600",fontFamily:"Lora",whiteSpace: "nowrap" }}>Cardiologist</p>
        </div>

        <div className='medical-card' >

            <img src={generalphysician} alt=''></img>
                <p style={{ margin: 0,  fontWeight: "600",fontFamily:"Lora",whiteSpace: "nowrap" }}>Orthopedic</p>
        </div>


       
        <div className='medical-card' >

            <img src={generalphysician} alt=''></img>
            <p style={{ margin: 0,  fontWeight: "600",fontFamily:"Lora",whiteSpace: "nowrap" }}>Neurology</p>

        </div>
    </div>


  

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
      <ChiefComplaintsForMedicalSummary/>
    </div>

    <div className='card-details'>
      <DiagnosticsInvestigationsForMedicalSummary/>
    </div>

    <div className='card-details'>
      <CurrentMedicinesForMedicalSummary/>
    </div>

    <div className='card-details'>
      <CurrentTherapyForMedicalSummary/>
    </div>
  </div>
))}

   

        
    </div>



       



     

      {/* Footer Note */}
       <div className="p-4  border-t border-gray-200">
        <p className="text-xs text-gray-600">
          1. Added By Dr Gaurav Pande (Cardiology) (Regards M1234), (Contact 8373915529, Date/ Time 20 Sep 2025, 11:57 AM IST, Noida
        </p>
      </div> 



{/*================================== modal for adding medical History========================= */}


   <Modal show={show} onHide={handleClose} centered size="lg">
        
              <Modal.Header closeButton>
                <Modal.Title className='form-title'>Add Medical History(Past Illness) </Modal.Title>
              </Modal.Header>
              <Modal.Body>
              
      
         <div>
      
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4 border border-gray-300 rounded-lg p-4">
                

                  <FormControl fullWidth size="small">
                  <label className="form-label">Date </label>
                  <TextField
                  type='date'
                  placeholder="Date" 
                  name="Date" 
                  size="small" 
                  value={medical_history.DoctorHospitalInfo.Date} 
                  onChange={handleChange} 
                  />
                  </FormControl>

                   <FormControl fullWidth size="small">
              <label className="form-label">Medical Speciality </label>
            <Select
                  labelId="content-type-label"
                  name="MedicalSpeciality"
                 value={medical_history.DoctorHospitalInfo.MedicalSpeciality}
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
                  {allmedical_speciality?.map((type) => (
                    <MenuItem key={type._id} value={type._id}>
                      {type.lookup_value}
                    </MenuItem>
                  ))}
                              
  
              </Select>
              </FormControl>

                  <FormControl fullWidth size="small">
                  <label className="form-label">Doctor Name </label>
                  <TextField
                  type='text'
                  placeholder="Doctor Name" 
                  name="DoctorName" 
                  size="small" 
                  value={medical_history.DoctorHospitalInfo.DoctorName} 
                  onChange={handleChange} 
                  />
                  </FormControl>

                  <FormControl fullWidth size="small">
                  <label className="form-label">Doctor Number </label>
                  <TextField
                  type='number'
                  placeholder="Doctor Number" 
                  name="DoctorNumber" 
                  size="small" 
                  value={medical_history.DoctorHospitalInfo.DoctorNumber} 
                  onChange={handleChange} 
                  />
                  </FormControl>

                <FormControl fullWidth size="small">
                  <label className="form-label">Hospital Name </label>
                  <TextField
                  type='text'
                  placeholder="Hospital Name" 
                  name="HospitalName" 
                  size="small" 
                  value={medical_history.DoctorHospitalInfo.HospitalName}
                  onChange={handleChange} 
                  />
                  </FormControl>

                   <FormControl fullWidth size="small">
                  <label className="form-label">Hospital Location </label>
                  <TextField
                  type='text'
                  placeholder="Hospital Location" 
                  name="HospitalLocation" 
                  size="small" 
                  value={medical_history.DoctorHospitalInfo.HospitalLocation} 
                  onChange={handleChange} 
                  />
                  </FormControl>

           


{/*======================== chief complaints============================================ */}

        <div className='col-span-2'>
          <h5 className='form-title'>Chief Complaints</h5>
            {medical_history.ChiefComplaints.map((details, index) => (
      
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4 border border-gray-300 rounded-lg p-4">
                
                 <div className="col-span-2">
                <FormControl fullWidth size="small">
                <label className="form-label">Symptom Class</label>
                <div className="flex flex-wrap gap-2">
                  {all_symptom_class_master.map((item) => {
                    const selected = (details?.Symptoms || []).includes(item._id); 
                    return (
                      <span
                        key={item._id}
                        onClick={() => toggleArrayField(index, "Symptoms", item._id)}
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

      
             

                 <div className="col-span-2">
                <FormControl fullWidth size="small">
                <label className="form-label">Aggravating Factors</label>
                <div className="flex flex-wrap gap-2">
                  {allaggravating_master.map((item) => {
                    const selected = (details?.AggravatingFactors || []).includes(item._id); 
                    return (
                      <span
                        key={item._id}
                       onClick={() => toggleArrayField(index, "AggravatingFactors", item._id)}
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

           
      
                <FormControl fullWidth size="small">
                  <label className="form-label">Duration</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {/* Number input */}
                    <TextField
                      type="number"
                      name="Value"
                      placeholder="Enter Number"
                      size="small"
                      value={details.Duration.Value} 
                       onChange={(e) => handleChiefComplaintsChange(index, "Duration", e.target.value, "Value")} 
                      style={{ flex: 1 }}
                    />
                
                 <Select
                  labelId="content-type-label"
                  name="InvestigationCategory"
                 value={details.Duration.Unit}
                  onChange={(e) => handleChiefComplaintsChange(index, "Duration", e.target.value, "Unit")}
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
                    {/* Dropdown for Days/Weeks/Months */}
                    {/* <Select
                      name="Unit"
                      defaultValue="Days"
                      size="small"
                      value={details.Duration.Unit}
                      onChange={(e) => handleChiefComplaintsChange(index, "Duration", e.target.value, "Unit")}
                      style={{ width: '150px' }}
                    >
                      <MenuItem value="Days">Days</MenuItem>
                      <MenuItem value="Weeks">Weeks</MenuItem>
                      <MenuItem value="Months">Months</MenuItem>
                    </Select> */}
                  </div>
                </FormControl>
      
                  <FormControl fullWidth size="small">
                  <label className="form-label">Severity Grade </label>
                  {renderColorBar(index)}
                  </FormControl>
      
          <div className="flex justify-between mt-2">
              <Button
                style={{ backgroundColor: "#52677D", fontFamily: "Lora", color: "white" }}
                onClick={handleAddMore}
              >
                Add More
              </Button>

              
            </div>

                </div> 

                

          ))}
               
           

      
              </div> 



{/*======================== clinical Diagnosis ================================================*/}



        <div className='col-span-2'>
          <h5 className='form-title'>Clinical Diagnosis </h5>
            {medical_history.ClinicalDiagnoses.map((details, index) => (
      
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4 border border-gray-300 rounded-lg p-4">
                
                 <FormControl fullWidth size="small">
                  <label className="form-label">Date </label>
                  <TextField
                  type='date'
                  placeholder="Date" 
                  name="Date" 
                  size="small" 
                  value={details.Date} 
                  onChange={(e)=>handleClinicalDiagnosisChange(index,"Date",e.target.value)} 
                  />
                  </FormControl>

                    <FormControl fullWidth size="small">
              <label className="form-label">Investigation Category </label>
            <Select
                  labelId="content-type-label"
                  name="InvestigationCategory"
                 value={details.InvestigationCategory}
                  onChange={(e)=>handleClinicalDiagnosisChange(index,"InvestigationCategory",e.target.value)}
                  displayEmpty
                  MenuProps={customMenuProps}
                  renderValue={(selected) => {
                    if (!selected) {
                      return <span style={{ color: "#9ca3af" }}>Investigation Category </span>; 
                    }
                    return all_investigation_category?.find((item) => item._id === selected)?.lookup_value;
                  }}
                >
                  <MenuItem value="">
                    <em>Investigation Category </em>
                  </MenuItem>
                  {all_investigation_category?.map((type) => (
                    <MenuItem key={type._id} value={type._id}>
                      {type.lookup_value}
                    </MenuItem>
                  ))}
                              
  
              </Select>
              </FormControl>

                      <FormControl fullWidth size="small">
              <label className="form-label">Investigation </label>
            <Select
                  labelId="content-type-label"
                  name="Nationality"
                 value={details.Investigation}
                 onChange={(e)=>handleClinicalDiagnosisChange(index,"Investigation",e.target.value)}
                  displayEmpty
                  MenuProps={customMenuProps}
                  renderValue={(selected) => {
                    if (!selected) {
                      return <span style={{ color: "#9ca3af" }}>Investigation </span>; 
                    }
                    return all_investigation_master?.find((item) => item._id === selected)?.InvestigationName;
                  }}
                >
                  <MenuItem value="">
                    <em>Investigation </em>
                  </MenuItem>
                  {all_investigation_master?.map((type) => (
                    <MenuItem key={type._id} value={type._id}>
                      {type.InvestigationName}
                    </MenuItem>
                  ))}
                              
  
              </Select>
              </FormControl>

                 <div className="col-span-2">
                <FormControl fullWidth size="small">
                <label className="form-label">Abnormalities </label>
                <div className="flex flex-wrap gap-2">
                  {all_symptom_class_master.map((item) => {
                    const selected = (details?.Abnormalities || []).includes(item._id); 
                    return (
                      <span
                        key={item._id}
                        onClick={() => toggleArrayFieldClinicalDiagnosis(index,"Abnormalities",item._id,)}
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

                <FormControl fullWidth size="small">
                  <label className="form-label">Upload Report </label>
                  <TextField
                  type='file'
                  placeholder="Date" 
                  name="ReportUrl" 
                  size="small" 
                  // value={details.ReportUrl}
                  onChange={(e)=>handlesingleImageChange(index,e,"ReportUrl")} 
                  />
                  </FormControl>
      
                <FormControl fullWidth size="small">
                  <label className="form-label">Upload Interpretation </label>
                  <TextField
                  type='file'
                  placeholder="Date" 
                  name="DateOfBirth" 
                  size="small" 
                  // value={details.InterpretationUrl} 
                  onChange={(e)=>handlesingleImageChange(index,e,"InterpretationUrl")} 
                  />
                  </FormControl>
      
                
          <div className="flex justify-between mt-2">
              <Button
                style={{ backgroundColor: "#52677D", fontFamily: "Lora", color: "white" }}
                onClick={handleAddMoreClinicalDiagnosis}
              >
                Add More
              </Button>

              
            </div>
            
        </div> 

          ))}
               
      </div> 


{/* ============================Medicines Prescribed ======================================= */}

 <div className='col-span-2'>
          <h5 className='form-title'>Medicines Prescribed </h5>
            
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4 border border-gray-300 rounded-lg p-4">
                {medical_history.MedicinesPrescribed.Medicines.map((details, index) => (
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
                  name="DurationInDays" 
                  size="small" 
                  value={details.DurationInDays} 
                  onChange={(e) => handleMedicineChange(index, "DurationInDays", e.target.value)} 
                  />
                  </FormControl>

                        <div className="flex justify-between mt-8 h-8">
              <Button
                style={{ backgroundColor: "#52677D", fontFamily: "Lora", color: "white" }}
                onClick={handleAddMoreClinicalMedicines}
              >
                Add More
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
                      defaultValue={medical_history.MedicinesPrescribed.RecoveryCycle.Value} 
                       onChange={(e) => handleMedicinePrescribedChange( "RecoveryCycle", e.target.value, "Value")} 
                      style={{ flex: 1 }}
                    />
                
                  
                 <Select
                  labelId="content-type-label"
                  name="InvestigationCategory"
                  value={medical_history.MedicinesPrescribed.RecoveryCycle.Unit} 
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
                    {/* Dropdown for Days/Weeks/Months */}
                    {/* <Select
                      name="Unit"
                      defaultValue="Days"
                      size="small"
                      value={medical_history.MedicinesPrescribed.RecoveryCycle.Unit} 
                      onChange={(e) => handleMedicinePrescribedChange("RecoveryCycle",e.target.value, "Unit")}
                      style={{ width: '150px' }}
                    >
                      <MenuItem value="Days">Days</MenuItem>
                      <MenuItem value="Weeks">Weeks</MenuItem>
                      <MenuItem value="Months">Months</MenuItem>
                    </Select> */}
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


{/*==================================== add therapy============================================ */}

 <div className='col-span-2'>
          <h5 className='form-title'>Therapy (ies) </h5>
            
         {medical_history.Therapies.map((details, index) => (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4 border border-gray-300 rounded-lg p-4">
             

                 <FormControl fullWidth size="small">
                  <label className="form-label">Therapy Name </label>
                   <Select
                  labelId="content-type-label"
                  name="TherapyName"
                 value={details.TherapyName}
                 onChange={(e) => handleTherapyChange(index, "TherapyName",e.target.value,)} 
                  displayEmpty
                  MenuProps={customMenuProps}
                  renderValue={(selected) => {
                    if (!selected) {
                      return <span style={{ color: "#9ca3af" }}>Therapy Name </span>; 
                    }
                    return all_therapy_master?.find((item) => item._id === selected)?.lookup_value;
                  }}
                >
                  <MenuItem value="">
                    <em>Therapy Name</em>
                  </MenuItem>
                  {all_therapy_master?.map((type) => (
                    <MenuItem key={type._id} value={type._id}>
                      {type.lookup_value}
                    </MenuItem>
                  ))}
              </Select>

                  </FormControl>

             <FormControl fullWidth size="small">
                  <label className="form-label">Patient’s Response  </label>
                  <TextField
                  type='text'
                  placeholder="Patient Response" 
                  name="PatientResponse" 
                  size="small" 
                  value={details.PatientResponse} 
                  onChange={(e) => handleTherapyChange(index, "PatientResponse",e.target.value,)} 
                  />
                  </FormControl>

             
           
             

               <div className="flex justify-between mt-2">
              <Button
                style={{ backgroundColor: "#52677D", fontFamily: "Lora", color: "white" }}
                onClick={handleAddMoreClinicalTherapy}
              >
                Add More
              </Button>

              
            </div>
            
        </div> 

        

            ))}
               
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

      
              </div> 
      
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

export default PastIllness;
