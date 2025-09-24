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
import { TextField, Select, MenuItem, FormControl, Box,Avatar,Tooltip,IconButton,CircularProgress, Button, Radio, FormControlLabel, RadioGroup, FormLabel } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import api from '../../../../api'
import Swal from 'sweetalert2';
import UniqueLoader from '../../../loader';
import { customMenuProps } from '../../../../utils/mui_select_scroll_bar';
import { Calendar, MapPin } from 'lucide-react';
import ProfileCard1 from './UI/ProfileCard1';
import ProfileCard2 from './UI/ProfileCard2';
import { Modal,  Form, Row, Col } from 'react-bootstrap';
import { __postApiData } from "../../../../utils/api";
import healthicon from '../AllSubForms/assets/images/view health assessment report icon.png';

const PresentIllness = () => {


    const doctor_details=JSON.parse(localStorage.getItem("user"))
console.log(doctor_details);


  

  


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


  const [medical_history, setmedical_history] = useState({
      Date :"",
      DoctorName:"",
      DoctorNumber :"",
      HospitalName :"",
      HospitalLocation :"",
      MedicalSpeciality :[],
      ChiefComplaints:[{
            SymptomClass:[],
            Compliant : '',
            Duration : '',
            SeverityGrade : '',
            AggravatingFactors : []
      }],
      ClinicalDiagnosis :[{
            Date:"",
            Investigation_Category : '',
            Investigation : '',
            Abnormalities  : [],
            UploadReport : [],
            UploadInterpretation:[]
    }],
    MedicinesPrescribed:{
            MedicinesPrescribed:[{MedicineName:"",Dosage:"",Duration:"" }],
            RecoveryCycle  : '',
            UploadPrescriptions  : [],
    },
    Therapy :[{
            TherapyName:"",
            PatientsResponse:""
        }]

    });

  const get_assest_profile_details = async () => {
  try {
    const [resp, resp1] = await Promise.all([
      api.get(`api/v1/asset-sections/medical-specialties/${doctor_details._id}`),
      api.get(`api/v1/asset-sections/contact-info/${doctor_details._id}`)
    ]);

    setmedical_history(prev => ({
      ...prev,
      MedicalSpeciality: resp.data?.data || prev.MedicalSpeciality,
      Date: new Date().toISOString().split("T")[0],
      DoctorName: doctor_details.AssetName,
      DoctorNumber: resp1.data?.data?.ContactPhoneNumber || prev.DoctorNumber
    }));

  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  get_assest_profile_details();
}, []);





  const [show, setShow] = useState(false)
  
    // function to open modal
    const handleShow = () => setShow(true);
    // function to close modal
    const handleClose = () => setShow(false);
 

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
          
          
//============================ get symptom master data===========================================
          
          
             const[all_symptom_master,setall_symptom_master]=useState([])
          
             const getall_symptom_master = async (selectedSymptomClass) => {
              console.log(selectedSymptomClass);
              
            if (!selectedSymptomClass || selectedSymptomClass.length === 0) return;
          
            try {
              const resp = await api.post('api/v1/admin/LookupList/', {
                lookupcodes: "symptom_master",
                parent_lookup_id: selectedSymptomClass, // send array or first ID
              });
              console.log('Symptom master response:', resp);
              setall_symptom_master(resp.data.data);
            } catch (error) {
              console.error(error);
            }
          };
              
              
          // ================================get all aggravatingFactor======================================
          
          
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
          

            //============================ color bar================================

  const renderColorBar = (index) => {
  const segments = [
    { color: 'bg-green-600', title: "H1", desc: "Mild", value: 1 },
    { color: 'bg-green-500', title: "H2", desc: "Mild", value: 2 },
    { color: 'bg-yellow-300', title: "H3", desc: "Mild", value: 3 },
    { color: 'bg-yellow-500', title: "H4", desc: "Mild", value: 4 },
    { color: 'bg-orange-400', title: "H5", desc: "Mild", value: 5 },
    { color: 'bg-red-600', title: "H6", desc: "Mild", value: 6 },
  ];

  // const handleClick = (value) => {
  //   setpatient_details((prev) => {
  //     const updated = [...prev];
  //     updated[index] = {
  //       ...updated[index],
  //       SeverityGrade: value,
  //     };
  //     return updated;
  //   });
  // };

  return (
    <div className="flex w-full h-10">
      {segments.map((segment, idx) => (
        <div
          key={idx}
          // onClick={() => handleClick(segment.value)}
          className={`flex-1 flex flex-col items-center justify-center cursor-pointer ${segment.color} text-white hover:opacity-80 transition`}
        >
          <span className="text-sm font-bold">{segment.title}</span>
          <span className="text-xs">{segment.desc}</span>
        </div>
      ))}
    </div>
  );
};


const handleAddMore = () => {
  setmedical_history(prev => ({
    ...prev,                          // keep previous properties
    ChiefComplaints: [                // overwrite or add to ChiefComplaints
      ...(prev.ChiefComplaints || []),
      { SymptomClass: [], Compliant: "", Duration: "", SeverityGrade: "", AggravatingFactors: [] } // new item
    ],
  }));
};


const handleAddMoreClinicalDiagnosis = () => {
  setmedical_history(prev => ({
    ...prev,                          // keep previous properties
    ClinicalDiagnosis: [                // overwrite or add to ChiefComplaints
      ...(prev.ClinicalDiagnosis || []),
      { Date: "", Investigation_Category: "", Investigation: "", Abnormalities:[], UploadReport: [],UploadInterpretation:[] } // new item
    ],
  }));
};

const handleAddMoreClinicalMedicines = () => {
  setmedical_history(prev => ({
    ...prev, 
    MedicinesPrescribed: {
      ...prev.MedicinesPrescribed, // keep RecoveryCycle & UploadPrescriptions
      MedicinesPrescribed: [
        ...(prev.MedicinesPrescribed?.MedicinesPrescribed || []),
        { MedicineName: "", Dosage: "", Duration: "" } // add new medicine
      ]
    }
  }));
};

const handleAddMoreClinicalTherapy = () => {
  setmedical_history(prev => ({
    ...prev,                          // keep previous properties
    Therapy: [                // overwrite or add to ChiefComplaints
      ...(prev.Therapy || []),
      { TherapyName: "", PatientsResponse: "" } // new item
    ],
  }));
};


console.log(medical_history);



  return (
    <div className="space">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 ">
        <h2 className="text-4xl font-bold text-gray-900">
          Medical History
        </h2>
    
      </div>

       

    <div className="bg-[rgba(189,196,212,0.2)] p-4 rounded-lg border border-gray-200 ">

        <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Present Illness
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


    {/* <div className='card-details' style={{marginTop:"20px"}}>
        <h3 className='table-header'>20/12/2025</h3>
         <div style={{display:"flex"}} >
            <img src={generalphysician} alt='' style={{height:"26px"}}></img>
            <p style={{ margin: 0,  fontWeight: "600",fontFamily:"Lora",whiteSpace: "nowrap" }}>Cardiologist</p>
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
                <Modal.Title className='form-title'>Add Medical History(Present Illness) </Modal.Title>
              </Modal.Header>
              <Modal.Body>
              
      
         <div>
      
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4 border border-gray-300 rounded-lg p-4">
                

              <FormControl fullWidth size="small">
            <label className="form-label">Date</label>
            <TextField
              type="date"
              name="Date"
              size="small"
              value={medical_history.Date} // YYYY-MM-DD format
              InputProps={{ readOnly: true }} 
              // onChange={handleChange}
            />
          </FormControl>


                   <FormControl fullWidth size="small">
              <label className="form-label">Medical Speciality </label>
           <div style={{ marginBottom: "8px" }}>
            <input
              type="text"
              value={
                medical_history?.MedicalSpeciality?.MedicalSpecialties
                  ?.map(item => item.lookup_value) // extract lookup_value from each object
                  .join(', ')                      // join them with commas
              }
              readOnly // makes it read-only
              style={{
                width: "100%",
                padding: "6px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor: "#f9f9f9"
              }}
            />
          </div>



              </FormControl>

                  <FormControl fullWidth size="small">
                  <label className="form-label">Doctor Name </label>
                  <TextField
                  type='text'
                  placeholder="Doctor Name" 
                  name="DoctorName" 
                  size="small" 
                  value={medical_history.DoctorName} 
                  InputProps={{ readOnly: true }}
                  />
                  </FormControl>

                  <FormControl fullWidth size="small">
                  <label className="form-label">Doctor Number </label>
                  <TextField
                  type='number'
                  placeholder="Doctor Number" 
                  name="DateOfBirth" 
                  size="small" 
                  value={medical_history.DoctorNumber} 
                  InputProps={{ readOnly: true }}
                  />
                  </FormControl>

                <FormControl fullWidth size="small">
                  <label className="form-label">Hospital Name </label>
                  <TextField
                  type='text'
                  placeholder="Hospital Name" 
                  name="DateOfBirth" 
                  size="small" 
                  // value={patient_details.DateOfBirth} 
                  // onChange={handleChange} 
                  />
                  </FormControl>

                   <FormControl fullWidth size="small">
                  <label className="form-label">Hospital Location </label>
                  <TextField
                  type='text'
                  placeholder="Hospital Location" 
                  name="DateOfBirth" 
                  size="small" 
                  // value={patient_details.DateOfBirth} 
                  // onChange={handleChange} 
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
                    const selected = (details?.SymptomClass || []).includes(item._id); 
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

      
                
                <div className="col-span-2">
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
              </div>

           
      
                 <FormControl fullWidth size="small">
                  <label className="form-label">Duration </label>
                  <TextField
                  type='number'
                  placeholder="Duration In Months" 
                  name="DateOfBirth" 
                  size="small" 
                  // value={patient_details.DateOfBirth} 
                  // onChange={handleChange} 
                  />
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
            {medical_history.ClinicalDiagnosis.map((details, index) => (
      
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4 border border-gray-300 rounded-lg p-4">
                
                 <FormControl fullWidth size="small">
                  <label className="form-label">Date </label>
                  <TextField
                  type='date'
                  placeholder="Date" 
                  name="DateOfBirth" 
                  size="small" 
                  // value={patient_details.DateOfBirth} 
                  // onChange={handleChange} 
                  />
                  </FormControl>

                    <FormControl fullWidth size="small">
              <label className="form-label">Investigation Category </label>
            <Select
                  labelId="content-type-label"
                  name="Nationality"
                //  value={patient_details.Nationality}
                //  onChange={handleChange}
                  displayEmpty
                  MenuProps={customMenuProps}
                  renderValue={(selected) => {
                    if (!selected) {
                      return <span style={{ color: "#9ca3af" }}>Investigation Category </span>; 
                    }
                    return all_therapy_master?.find((item) => item._id === selected)?.lookup_value;
                  }}
                >
                  <MenuItem value="">
                    <em>Investigation Category </em>
                  </MenuItem>
                  {all_therapy_master?.map((type) => (
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
                //  value={patient_details.Nationality}
                //  onChange={handleChange}
                  displayEmpty
                  MenuProps={customMenuProps}
                  renderValue={(selected) => {
                    if (!selected) {
                      return <span style={{ color: "#9ca3af" }}>Investigation </span>; 
                    }
                    return all_therapy_master?.find((item) => item._id === selected)?.lookup_value;
                  }}
                >
                  <MenuItem value="">
                    <em>Investigation </em>
                  </MenuItem>
                  {all_therapy_master?.map((type) => (
                    <MenuItem key={type._id} value={type._id}>
                      {type.lookup_value}
                    </MenuItem>
                  ))}
                              
  
              </Select>
              </FormControl>

                 <div className="col-span-2">
                <FormControl fullWidth size="small">
                <label className="form-label">Abnormalities </label>
                <div className="flex flex-wrap gap-2">
                  {all_symptom_class_master.map((item) => {
                    const selected = (details?.SymptomClass || []).includes(item._id); 
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

                <FormControl fullWidth size="small">
                  <label className="form-label">Upload Report </label>
                  <TextField
                  type='file'
                  placeholder="Date" 
                  name="DateOfBirth" 
                  size="small" 
                  // value={patient_details.DateOfBirth} 
                  // onChange={handleChange} 
                  />
                  </FormControl>
      
                <FormControl fullWidth size="small">
                  <label className="form-label">Upload Interpretation </label>
                  <TextField
                  type='file'
                  placeholder="Date" 
                  name="DateOfBirth" 
                  size="small" 
                  // value={patient_details.DateOfBirth} 
                  // onChange={handleChange} 
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
                {medical_history.MedicinesPrescribed.MedicinesPrescribed.map((details, index) => (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 col-span-2 border border-gray-300 rounded-lg p-2">
                 <FormControl fullWidth size="small">
                  <label className="form-label">Medicine Name </label>
                  <TextField
                  type='text'
                  placeholder="Date" 
                  name="DateOfBirth" 
                  size="small" 
                  // value={patient_details.DateOfBirth} 
                  // onChange={handleChange} 
                  />
                  </FormControl>

             <FormControl fullWidth size="small">
                  <label className="form-label">Dosage </label>
                  <TextField
                  type='text'
                  placeholder="Date" 
                  name="DateOfBirth" 
                  size="small" 
                  // value={patient_details.DateOfBirth} 
                  // onChange={handleChange} 
                  />
                  </FormControl>

                    <FormControl fullWidth size="small">
                  <label className="form-label">Duration (Days) </label>
                  <TextField
                  type='text'
                  placeholder="Date" 
                  name="DateOfBirth" 
                  size="small" 
                  // value={patient_details.DateOfBirth} 
                  // onChange={handleChange} 
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
                  <label className="form-label">Recovery Cycle  </label>
                  <TextField
                  type='number'
                  placeholder="Date" 
                  name="DateOfBirth" 
                  size="small" 
                  // value={patient_details.DateOfBirth} 
                  // onChange={handleChange} 
                  />
                  </FormControl>
          
      
                <FormControl fullWidth size="small">
                  <label className="form-label">Upload Prescriptions  </label>
                  <TextField
                  type='file'
                  placeholder="Date" 
                  name="DateOfBirth" 
                  size="small" 
                  // value={patient_details.DateOfBirth} 
                  // onChange={handleChange} 
                  />
                  </FormControl>
      
                
    
            
        </div> 

       
               
      </div> 


{/*==================================== add therapy============================================ */}

 <div className='col-span-2'>
          <h5 className='form-title'>Therapy (ies) </h5>
            
         {medical_history.Therapy.map((details, index) => (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4 border border-gray-300 rounded-lg p-4">
             

                 <FormControl fullWidth size="small">
                  <label className="form-label">Therapy Name </label>
                  <TextField
                  type='text'
                  placeholder="Date" 
                  name="DateOfBirth" 
                  size="small" 
                  // value={patient_details.DateOfBirth} 
                  // onChange={handleChange} 
                  />
                  </FormControl>

             <FormControl fullWidth size="small">
                  <label className="form-label">Patient’s Response  </label>
                  <TextField
                  type='text'
                  placeholder="Date" 
                  name="DateOfBirth" 
                  size="small" 
                  // value={patient_details.DateOfBirth} 
                  // onChange={handleChange} 
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
                // onClick={save_chif_complaints}
              >
                Save
              </Button>
            </div>

      
              </div> 
      
              </Modal.Body>
          
         
          </Modal>


    </div>
  );
};

export default PresentIllness;
