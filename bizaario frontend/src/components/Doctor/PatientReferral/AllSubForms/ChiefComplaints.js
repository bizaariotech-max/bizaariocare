
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
const ChiefComplaints = (patientId) => {


  const doctor_details=JSON.parse(localStorage.getItem("user"))


  const complaintsData = [
    {
      id: 1,
      complaint: 'Cough',
      duration: '2 Months',
      severity: 5, // Scale of 1-10
      aggravatingFactor: 'Exposer to Sun'
    },
    {
      id: 2,
      complaint: 'Augmentin/Amoxicillin',
      duration: 'Improved',
      severity: 3,
      aggravatingFactor: 'Exposer to Sun'
    },
    {
      id: 3,
      complaint: 'Augmentin/Amoxicillin',
      duration: 'Improved',
      severity: 2,
      aggravatingFactor: 'Exposer to Sun'
    }
  ];

  // Function to render severity grade as color bars
  const renderSeverityGrade = (severity) => {
    const segments = [
      { color: 'bg-red-600', active: severity >= 1 },

      { color: 'bg-[#ffc001]', active: severity >= 2 },
      { color: 'bg-[#feff99]', active: severity >= 3 },
      { color: 'bg-[#92d14f]', active: severity >= 4 },
      { color: 'bg-[#107c42]', active: severity >= 5 },


    ];
    return (
      <div className="flex items-center space-x-1">
        {segments.map((segment, index) => (
          <div
            key={index}
            className={`h-6 ${index === 4 ? 'w-8' : 'w-8'} ${segment.active ? segment.color : 'bg-gray-200'
              } ${index === 4 ? 'rounded-none' : 'rounded-sm'}`}
          />
        ))}
      </div>
    );
  };



    const [show, setShow] = useState(false)
  
    // function to open modal
    const handleShow = () => setShow(true);
    // function to close modal
    const handleClose = () => setShow(false);
  
  
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



const handleAddMore = () => {
  setpatient_details(prev => [
    ...prev,
    {
      SymptomClass: [],
      Compliant: '',
      Duration: '',
      SeverityGrade: '',
      AggravatingFactors: '',
      CurrentMedications: '',
      Dosage: '',
      Frequency: '',
      CurrentTherapies: '',
      CreatedBy: "",
    }
  ]);
};




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


      //============================ get symptom master data=======================================


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


//=================================== get all medications=====================================

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


  //============================= get all Dosage============================================

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

// ===========================get all Frequency data=========================================

  const[all_medical_frequency_type,setall_medical_frequency_type]=useState([])
      const getall_medical_frequency_type=async()=>
      {
        try {
          const resp=await api.post('api/v1/admin/LookupList/',{lookupcodes:"medicine_frequency_type"})
          console.log(resp);
          
          setall_medical_frequency_type(resp.data.data)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        getall_medical_frequency_type()
    
      },[])

//================================ get all therapy=======================================

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


const handleSymptomSelect = (id, index) => {
  setpatient_details(prev => {
    const updated = [...prev];
    const obj = { ...updated[index] };
    const currentSymptomClass = Array.isArray(obj.SymptomClass) ? [...obj.SymptomClass] : [];

    let newSymptomClass;
    if (currentSymptomClass.includes(id)) {
      // remove id
      newSymptomClass = currentSymptomClass.filter(item => item !== id);
    } else {
      // add id
      newSymptomClass = [...currentSymptomClass, id];
    }

    obj.SymptomClass = newSymptomClass;
    updated[index] = obj;

    // call API with new selection
    getall_symptom_master(newSymptomClass);

    return updated;
  });
};



const handlecomplaintSelect = (id, index) => {
  setpatient_details(prev => {
    const updated = [...prev];
    const obj = { ...updated[index] };

    // For single selection, just assign the new id
    obj.Compliant = id;

    updated[index] = obj;
    return updated;
  });
};



const handleaggravatingSelect = (id, index) => {
  setpatient_details(prev => {
    const updated = [...prev];
    const obj = { ...updated[index] };
    const currentaggravating = Array.isArray(obj.AggravatingFactors) ? [...obj.AggravatingFactors] : [];

    let newaggravating;
    if (currentaggravating.includes(id)) {
      // remove id
      newaggravating = currentaggravating.filter(item => item !== id);
    } else {
      // add id
      newaggravating = [...currentaggravating, id];
    }

    obj.AggravatingFactors = newaggravating;
    updated[index] = obj;



    return updated;
  });
};

const handlefrequencySelect = (id, index) => {
  setpatient_details(prev => {
    const updated = [...prev];
    const obj = { ...updated[index] };

    // For single selection, just assign the new id
    obj.Frequency = id;

    updated[index] = obj;
    return updated;
  });
};



const renderColorBar = (index) => {
  const segments = [
    { color: 'bg-green-600', title: "H1", desc: "Mild", value: 1 },
    { color: 'bg-green-500', title: "H2", desc: "Mild", value: 2 },
    { color: 'bg-yellow-300', title: "H3", desc: "Mild", value: 3 },
    { color: 'bg-yellow-500', title: "H4", desc: "Mild", value: 4 },
    { color: 'bg-orange-400', title: "H5", desc: "Mild", value: 5 },
    { color: 'bg-red-600', title: "H6", desc: "Mild", value: 6 },
  ];

  const handleClick = (value) => {
    setpatient_details((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        SeverityGrade: value,
      };
      return updated;
    });
  };

  return (
    <div className="flex w-full h-10">
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
  );
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



  return (
    <div className="space mt-4">

     <div className="flex items-center space-x-2">
      <img src={healthicon} alt="" className="w-[36px] h-[36px]" />
      <h2 className="text-[36px] font-semibold text-[var(--button-back-color)]">
        <span>View Health Assessment Report</span>
      </h2>
    </div>


      {/* Header */}
      <div className="flex items-center justify-between mt-2  border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">
          Chief Complaints
        </h2>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 text-[var(--primary-color)] hover:text-blue-700 transition-colors">
            <span className="text-sm font-medium underline" onClick={handleShow}>Add</span>
            <Plus className="w-4 h-4" />
          </button>
          <button className="flex items-center space-x-2 text-[var(--primary-color)] hover:text-blue-700 transition-colors">
            <Edit className="w-4 h-4" />
            <span className="text-sm font-medium underline">Edit</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {/* Table Header */}
        <div className="bg-[var(--button-back-color)] text-white  " >
          <div className="grid grid-cols-4 gap-4 p-2 text-[20px]">
            <h3 className="table-header">Chief Complaints</h3>
            <h3 className="table-header">Duration (Months)</h3>
            <h3 className="table-header">Severity Grade</h3>
            <h3 className="table-header">Aggravating Factor (s)</h3>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200">
          {complaintsData.map((item, index) => (
            <div
              key={item.id}
              className={`grid grid-cols-4 gap-4 p-4 ${index % 2 === 0 ? 'bg-[#f2f3f6]' : 'bg-white'
                }`}
            >
              <div className="text-sm text-gray-900 font-medium">
                {item.complaint}
              </div>
              <div className="text-sm text-gray-900">
                {item.duration}
              </div>
              <div className="flex items-center">
                {renderSeverityGrade(item.severity)}
              </div>
              <div className="text-sm text-gray-900">
                {item.aggravatingFactor}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Note */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <p className="text-xs text-gray-600">
          1. Added By Dr Gaurav Pande (Cardiology) (Regards M1234), (Contact 8373915529, Date/ Time 20 Sep 2025, 11:57 AM IST, Noida
        </p>
      </div>



        <Modal show={show} onHide={handleClose} centered size="lg">
        
              <Modal.Header closeButton>
                <Modal.Title>Add Chief Complaints </Modal.Title>
              </Modal.Header>
              <Modal.Body>
              
      
         <div>
            {patient_details.map((details, index) => (
      
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
                        onClick={() => handleSymptomSelect(item._id,index)}
                        className={`px-3 py-1 text-sm rounded-md cursor-pointer flex items-center gap-2 
                          ${selected ? 'bg-blue-500 text-white' : 'bg-[#e2e4f4] text-gray-800'}`}
                      >
                        {item.lookup_value}
                        {selected && (
                          <span
                            className="ml-1 text-xs font-bold cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSymptomSelect(item._id,index);
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
                        onClick={() => handlecomplaintSelect(item._id,index)}
                        className={`px-3 py-1 text-sm rounded-md cursor-pointer flex items-center gap-2 
                          ${selected ? 'bg-blue-500 text-white' : 'bg-[#e2e4f4] text-gray-800'}`}
                      >
                        {item.lookup_value}
                        {selected && (
                          <span
                            className="ml-1 text-xs font-bold cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSymptomSelect(item._id,index);
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
                        onClick={() => handleaggravatingSelect(item._id,index)}
                        className={`px-3 py-1 text-sm rounded-md cursor-pointer flex items-center gap-2 
                          ${selected ? 'bg-blue-500 text-white' : 'bg-[#e2e4f4] text-gray-800'}`}
                      >
                        {item.lookup_value}
                        {selected && (
                          <span
                            className="ml-1 text-xs font-bold cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSymptomSelect(item._id,index);
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
                <label className="form-label">Frequency </label>
                <div className="flex flex-wrap gap-2">
                  {all_medical_frequency_type.map((item) => {
                    const selected = (details?.Frequency || []).includes(item._id); 
                    return (
                      <span
                        key={item._id}
                        onClick={() => handlefrequencySelect(item._id,index)}
                        className={`px-3 py-1 text-sm rounded-md cursor-pointer flex items-center gap-2 
                          ${selected ? 'bg-blue-500 text-white' : 'bg-[#e2e4f4] text-gray-800'}`}
                      >
                        {item.lookup_value}
                        {selected && (
                          <span
                            className="ml-1 text-xs font-bold cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSymptomSelect(item._id,index);
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
                  value={patient_details.DateOfBirth} 
                  onChange={handleChange} 
                  />
                  </FormControl>
      
                  <FormControl fullWidth size="small">
                  <label className="form-label">Severity Grade </label>
                  {renderColorBar(index)}
                  </FormControl>
      
              

              
      
                  <FormControl fullWidth size="small">
                  <label className="form-label">Current Medications  </label>
                 <Select 
                    name="CurrentMedications"
                    value={details.CurrentMedications}
                   onChange={(e)=>handleChange(e,index)}
                  MenuProps={{
                          disablePortal: true,
                          disableScrollLock: true,
                          }}
                      displayEmpty
                      renderValue={(selected) => {
                        if (!selected) {
                          return <span style={{ color: "#9ca3af" }}>Current Medications</span>; // grey placeholder
                        }
                        return all_salt_master.find((item) => item._id === selected)?.lookup_value;
                      }}
                  >
      
                    <MenuItem disabled value="">
                        <em>Current Medications</em>
                      </MenuItem>
                  {
                      all_salt_master?.map((item)=>
                      (
                          <MenuItem key={item._id} value={item._id}>{item.lookup_value}</MenuItem>
                      ))
                  }
                  </Select>
                  </FormControl>
      
            
                

                    <FormControl fullWidth size="small">
                  <label className="form-label">Dosage  </label>
                 <Select 
                    name="Dosage"
                    value={details.Dosage}
                   onChange={(e)=>handleChange(e,index)}
                  MenuProps={{
                          disablePortal: true,
                          disableScrollLock: true,
                          }}
                      displayEmpty
                      renderValue={(selected) => {
                        if (!selected) {
                          return <span style={{ color: "#9ca3af" }}>Dosage</span>; // grey placeholder
                        }
                        return all_dosage_type.find((item) => item._id === selected)?.lookup_value;
                      }}
                  >
      
                    <MenuItem disabled value="">
                        <em>Dosage</em>
                      </MenuItem>
                  {
                      all_dosage_type?.map((item)=>
                      (
                          <MenuItem key={item._id} value={item._id}>{item.lookup_value}</MenuItem>
                      ))
                  }
                  </Select>
                  </FormControl>
      


           
           
      
               
      
             
      
                  <FormControl fullWidth size="small">
                  <label className="form-label">Current Therapies </label>
                  <Select 
                    name="CurrentTherapies"
                    value={details.CurrentTherapies}
                   onChange={(e)=>handleChange(e,index)}
                  MenuProps={{
                          disablePortal: true,
                          disableScrollLock: true,
                          }}
                      displayEmpty
                      renderValue={(selected) => {
                        if (!selected) {
                          return <span style={{ color: "#9ca3af" }}>Dosage</span>; // grey placeholder
                        }
                        return all_therapy_master.find((item) => item._id === selected)?.lookup_value;
                      }}
                  >
      
                    <MenuItem disabled value="">
                        <em>Dosage</em>
                      </MenuItem>
                  {
                      all_therapy_master?.map((item)=>
                      (
                          <MenuItem key={item._id} value={item._id}>{item.lookup_value}</MenuItem>
                      ))
                  }
                  </Select>
                  </FormControl>
      
                </div> 

          ))}
               
               <div className="flex justify-between mt-4">
              <Button
                style={{ backgroundColor: "#52677D", fontFamily: "Lora", color: "white" }}
                onClick={handleAddMore}
              >
                Add More
              </Button>

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




    </div>
  );
}

export default ChiefComplaints

