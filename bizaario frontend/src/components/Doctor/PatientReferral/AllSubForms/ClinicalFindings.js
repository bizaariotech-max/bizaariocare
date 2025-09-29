import { Plus, Edit } from 'lucide-react';
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
import { Modal,  Form, Row, Col } from 'react-bootstrap';
import { __postApiData } from "../../../../utils/api";
import healthicon from '../AllSubForms/assets/images/view health assessment report icon.png';

const ClinicalFindings = () => {
  // Sample data for clinical findings
  const findingsData = [
    {
      id: 1,
      symptom: 'Cough',
      duration: '2 Months',
      severity: 5, // Scale of 1-10
      aggravatingFactor: 'Exposer to Sun'
    },
    {
      id: 2,
      symptom: 'Augmentin/Amoxicillin',
      duration: 'Improved',
      severity: 3,
      aggravatingFactor: 'Exposer to Sun'
    },
    {
      id: 3,
      symptom: 'Augmentin/Amoxicillin',
      duration: 'Improved',
      severity: 2,
      aggravatingFactor: 'Exposer to Sun'
    }
  ];



  // Function to render severity grade as color bars
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

    const [patient_details, setpatient_details] = useState({
        SymptomClass:[],
        Compliant : '',
        Duration : '',
        SeverityGrade : '',
        AggravatingFactors : [],
        CurrentMedications : '',
        Dosage : '',
        Frequency : '',
        CurrentTherapies : '',
        // CreatedBy: doctor_details._id,
      });




     const [show, setShow] = useState(false)
    
      // function to open modal
      const handleShow = () => setShow(true);
      // function to close modal
      const handleClose = () => setShow(false);

          //============================ get symptom master data=======================================
      
      
         const[all_symptom_master,setall_symptom_master]=useState([])
      
         const getall_symptom_master = async (selectedSymptomClass) => {
       
          
        // if (!selectedSymptomClass || selectedSymptomClass.length === 0) return;
      
        try {
          const resp = await api.post('api/v1/admin/LookupList/', {
            lookupcodes: "symptom_master",
            parent_lookup_id: selectedSymptomClass, // send array or first ID
          });
        
          setall_symptom_master(resp.data.data);
        } catch (error) {
          console.error(error);
        }
      };


         useEffect(()=>
            {
              getall_symptom_master()
          
            },[])
          
          
      // ================================get all aggravatingFactor======================================
      
      
            const[allaggravating_master,setallaggravating_master]=useState([])
            const getall_aggravating_master=async()=>
            {
              try {
                const resp=await api.post('api/v1/admin/LookupList/',{lookupcodes:"aggravating_factor_master"})
                
                
                setallaggravating_master(resp.data.data)
                
              } catch (error) {
                console.log(error);
                
              }
            }
          
            useEffect(()=>
            {
              getall_aggravating_master()
          
            },[])





  return (
    <div className="space">
      {/* Header */}
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Clinical Findings
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
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="bg-slate-600 text-white">
          <div className="grid grid-cols-4 gap-4 p-2">
            <div className="font-medium">Symptom</div>
            <div className="font-medium">Duration (Months)</div>
            <div className="font-medium">Severity Grade</div>
            <div className="font-medium">Aggravating Factor (s)</div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200">
          {findingsData.map((item, index) => (
            <div
              key={item.id}
              className={`grid grid-cols-4 gap-4 p-4 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                }`}
            >
              <div className="text-sm text-gray-900 font-medium">
                {item.symptom}
              </div>
              <div className="text-sm text-gray-900">
                {item.duration}
              </div>
              <div className="flex items-center">
                {/* {renderSeverityGrade(item.severity)} */}
              </div>
              <div className="text-sm text-gray-900">
                {item.aggravatingFactor}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Note */}
      <div className="p-4 border-t border-gray-200">
        <p className="text-xs text-gray-600">
          1. Added By Dr Gaurav Pande (Cardiology) (Regards M1234), (Contact 8373915529, Date/ Time 20 Sep 2025, 11:57 AM IST, Noida
        </p>
      </div>



{/* ==========================modal for clinical findings=================================== */}


   <Modal show={show} onHide={handleClose} centered size="lg">
        
              <Modal.Header closeButton>
                <Modal.Title>Add Clinical Findings </Modal.Title>
              </Modal.Header>
              <Modal.Body>
              
      
         <div>
       
      
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4 border border-gray-300 rounded-lg p-4">
                
                 <div className="col-span-2">
                <FormControl fullWidth size="small">
                <label className="form-label">Symptom Class</label>
                <div className="flex flex-wrap gap-2">
                  {all_symptom_master.map((item) => {
                    const selected = (patient_details.SymptomClass.includes(item._id)); 
                    return (
                      <span
                        key={item._id}
                        // onClick={() => handleSymptomSelect(item._id)}
                        className={`px-3 py-1 text-sm rounded-md cursor-pointer flex items-center gap-2 
                           ${selected ? 'bg-blue-500 text-white' : 'bg-[#e2e4f4] text-gray-800'}`}
                      >
                        {item.lookup_value}
                        {selected && (
                          <span
                            className="ml-1 text-xs font-bold cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              // handleSymptomSelect(item._id);
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
                  // onChange={handleChange} 
                  />
                  </FormControl>
      
                  <FormControl fullWidth size="small">
                  <label className="form-label">Severity Grade </label>
                  {renderColorBar()}
                  </FormControl>

                       <div className="col-span-2">
                      <FormControl fullWidth size="small">
                      <label className="form-label">Aggravating Factors</label>
                      <div className="flex flex-wrap gap-2">
                        {allaggravating_master.map((item) => {
                          const selected = (patient_details.AggravatingFactors.includes(item._id)); 
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

export default ClinicalFindings;
