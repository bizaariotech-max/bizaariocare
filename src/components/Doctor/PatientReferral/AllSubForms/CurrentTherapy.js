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

const CurrentTherapy = () => {
  // Sample data for the therapies
  const therapyData = [
    {
      id: 1,
      therapyName: 'Physiotherapy',
      clinicalOutcome: 'Patient feels better, fever gone'
    },
    {
      id: 2,
      therapyName: 'Chemotherapy',
      clinicalOutcome: 'Patient feels better, fever gone'
    },
    {
      id: 3,
      therapyName: 'Chemotherapy',
      clinicalOutcome: 'Patient feels better, fever gone'
    }
  ];

    const [show, setShow] = useState(false)
      
        // function to open modal
        const handleShow = () => setShow(true);
        // function to close modal
        const handleClose = () => setShow(false);

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


      

  return (
    <div className="space ">
      {/* Header */}
      <div className="flex items-center justify-between mt-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">
          Current Therapy (ies)
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
        <div className="bg-slate-600 text-white">
          <div className="grid grid-cols-2 gap-4 p-2">
            <div className="table-header">Therapy Name</div>
            <div className="table-header">Clinical Outcome/Patient's Response</div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200">
          {therapyData.map((item, index) => (
            <div
              key={item.id}
              className={`grid grid-cols-2 gap-4 p-4 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                }`}
            >
              <div className="text-sm text-gray-900 font-medium">
                {item.therapyName}
              </div>
              <div className="text-sm text-gray-900">
                {item.clinicalOutcome}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Note */}
      <div className="p-4  border-t border-gray-200">
        <p className="text-xs text-gray-600">
          1. Added By Dr Gaurav Pande (Cardiology) (Regards M1234), (Contact 8373915529, Date/ Time 20 Sep 2025, 11:57 AM IST, Noida
        </p>
      </div>


{/*========================== modal for current therapy=================================== */}

       <Modal show={show} onHide={handleClose} centered size="lg">
        
              <Modal.Header closeButton>
                <Modal.Title>Add Therapy (ies) </Modal.Title>
              </Modal.Header>
              <Modal.Body>
              
      
         <div>
       
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4 border border-gray-300 rounded-lg p-4">
                
              <FormControl fullWidth size="small">
                         <label className="form-label">Therapy Name</label>
                        <Select
                             labelId="content-type-label"
                             name="Nationality"
                            //  value={patient_details.Nationality}
                            //  onChange={handleChange}
                             displayEmpty
                             MenuProps={customMenuProps}
                             renderValue={(selected) => {
                               if (!selected) {
                                 return <span style={{ color: "#9ca3af" }}>Therapy Name</span>; 
                               }
                               return all_therapy_master?.find((item) => item._id === selected)?.lookup_value;
                             }}
                           >
                             <MenuItem value="">
                               <em>Select Therapy</em>
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
                  type='number'
                  placeholder="Patient's Response" 
                  name="DateOfBirth" 
                  size="small" 
                  // value={patient_details.DateOfBirth} 
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

export default CurrentTherapy;
