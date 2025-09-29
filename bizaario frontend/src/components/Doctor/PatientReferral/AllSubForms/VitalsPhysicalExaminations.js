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

const VitalsPhysicalExaminations = () => {
  // Sample data for vitals and physical examinations
  const vitalsData = [
    {
      id: 1,
      parameterName: 'Fever',
      valueReadings: '96° F',
      abnormalitiesFound: 'Abnormalities Found'
    },
    {
      id: 2,
      parameterName: 'Cough',
      valueReadings: '96° F',
      abnormalitiesFound: 'Abnormalities Found'
    },
    {
      id: 3,
      parameterName: 'Fever',
      valueReadings: '96° F',
      abnormalitiesFound: 'Abnormalities Found'
    }
  ];


   const [patient_details, setpatient_details] = useState({
          Parameter :"",
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


    //============================ get investigatin master data=======================================
      
      
        const[all_investigation_master,setall_investigation_master]=useState([])
      const getall_investigation_master=async()=>
      {
        try {
            const resp=await api.post(`api/v1/admin/investigationList`)
         
          
          setall_investigation_master(resp.data.data.list)
          
        } catch (error) {
          console.log(error);
          
        }
      }

         useEffect(()=>
            {
              getall_investigation_master()
          
            },[])
     
        



  return (
    <div className="space">
      {/* Header */}
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Vitals/ Physical Examinations
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
          <div className="grid grid-cols-3 gap-4 p-2">
            <div className="font-medium">Parameter Name</div>
            <div className="font-medium">Value/ Readings</div>
            <div className="font-medium">Abnormalities Found</div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200">
          {vitalsData.map((item, index) => (
            <div
              key={item.id}
              className={`grid grid-cols-3 gap-4 p-4 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                }`}
            >
              <div className="text-sm text-gray-900 font-medium">
                {item.parameterName}
              </div>
              <div className="text-sm text-gray-900">
                {item.valueReadings}
              </div>
              <div className="text-sm text-gray-900">
                {item.abnormalitiesFound}
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


{/*============================== modal for vitals/physical examinations=========================== */}


<Modal show={show} onHide={handleClose} centered size="lg">
        
              <Modal.Header closeButton>
                <Modal.Title>Add Vitals/Physical Examinations </Modal.Title>
              </Modal.Header>
              <Modal.Body>
              
      
         <div>
       
      
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4 border border-gray-300 rounded-lg p-4">
                
                 <div className="col-span-2">
                <FormControl fullWidth size="small">
                <label className="form-label">Parameter </label>
                <div className="flex flex-wrap gap-2">
                  {all_investigation_master.map((item) => {
                    const selected = (patient_details.Parameter.includes(item._id)); 
                    return (
                      <span
                        key={item._id}
                        // onClick={() => handleSymptomSelect(item._id)}
                        className={`px-3 py-1 text-sm rounded-md cursor-pointer flex items-center gap-2 
                           ${selected ? 'bg-blue-500 text-white' : 'bg-[#e2e4f4] text-gray-800'}`}
                      >
                        {item.InvestigationName}
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


     <div className="col-span-2">
                      <FormControl fullWidth size="small">
                      <label className="form-label">Abnormalities</label>
                      <div className="flex flex-wrap gap-2">
                        {all_investigation_master.map((item) => {
                          const selected = (patient_details.AggravatingFactors.includes(item._id)); 
                          return (
                            <span
                              key={item._id}
                              // onClick={() => handleaggravatingSelect(item._id,index)}
                              className={`px-3 py-1 text-sm rounded-md cursor-pointer flex items-center gap-2 
                                ${selected ? 'bg-blue-500 text-white' : 'bg-[#e2e4f4] text-gray-800'}`}
                            >
                              {item.Abnormalities.map((ab)=>(ab))}
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
                  <label className="form-label">Value </label>
                  <TextField
                  type='number'
                  placeholder="Value" 
                  name="Value" 
                  size="small" 
                  value={patient_details.DateOfBirth} 
                  // onChange={handleChange} 
                  />
                  </FormControl>
      
                 

                  

      
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

export default VitalsPhysicalExaminations;
