
import React from 'react';
import { Plus, Edit } from 'lucide-react';
import { useEffect, useState } from 'react'
import { TextField, Select, MenuItem, FormControl, Button,  } from '@mui/material';
import api from '../../../../../api'
import Swal from 'sweetalert2';
import UniqueLoader from '../../../../loader';
import { customMenuProps } from '../../../../../utils/mui_select_scroll_bar';
import { Modal, } from 'react-bootstrap'; 
import { __postApiData } from "../../../../../utils/api";

const FamilyHistory = ({patientId,selected_case_file,case_file_data}) => {

   const doctordetails=JSON.parse(localStorage.getItem("user"))

 

const [family_history, setfamily_history] = useState({
    FamilyHistoryItem:[]
    });


    //========================== modal open or close start==========================================
    
      const [show, setShow] = useState(false)
        const handleShow = () => setShow(true);
        const handleClose = () => setShow(false);




   const toggleArrayField = (field, itemId) => {
  setfamily_history(prev => {
    const currentArray = prev[field] || [];
    let updatedArray = [];

    if (currentArray.includes(itemId)) {
      // remove item
      updatedArray = currentArray.filter(id => id !== itemId);
    } else {
      // add item
      updatedArray = [...currentArray, itemId];
    }

    return {
      ...prev,
      [field]: updatedArray
    };
  });
};








//================================== get disease list============================================

   const[all_disease_master,setall_disease_master]=useState([])
      const getall_disease_master=async()=>
      {
        try {
            const resp=await api.post('api/v1/common/LookupList/',{lookup_type:"disease_master"})
          console.log(resp);
          
          setall_disease_master(resp.data.data)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        getall_disease_master()
    
      },[])




      const[isloading,setisloading]=useState(false)
      
      const save_family_history = async () => {
        setisloading(true);
        try {
          const payload=
          {...family_history,
            PatientId:patientId,
          }
         
          
          const resp = await api.post(
            `api/v1/admin/patient/family-history/add`,
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
              text: "Family History Added Successfully...",
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


    const[patient_family_history,setpatient_family_history]=useState([])

 const getall_patient_family_history = async () => {
   try {
    //  setLoadingSpeciality(true);
     const resp = await api.get(`api/v1/admin/patient/family-history/list?PatientId=${patientId}`);
    setpatient_family_history(resp.data.data);

   } catch (error) {
     console.error(error);
   } finally {
    //  setLoadingSpeciality(false);
   }
 };
 
 useEffect(()=>
 {
 getall_patient_family_history()
 },[])







  return (
    <div className="space mt-4">


      {/* Header */}
      <div className="flex items-center justify-between mt-2  border-b border-gray-200">
        <h2 className="text-xxl font-semibold text-gray-900">
          Family History
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
      
 

{
        <div className="flex flex-wrap gap-2 mt-2">
        {patient_family_history.map((item, index) => (
         
            <span className="px-3 py-1 bg-[#e2e4f4] text-sm rounded-md">
            {item.lookup_value}
            </span>
        ))}
      </div>

  }




      {/* Footer Note */}
      <div className="p-4 bg-gray-50 border-t border-gray-200" style={{display:selected_case_file?"flex":"none"}}>
        <p className="text-xs text-gray-600">
          1. Added By Dr Gaurav Pande (Cardiology) (Regards M1234), (Contact 8373915529, Date/ Time 20 Sep 2025, 11:57 AM IST, Noida
        </p>
      </div>


  <Modal show={show} onHide={handleClose} centered size="lg">
        
              <Modal.Header closeButton>
                <Modal.Title className='form-title'>Add Family History</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              
      
         <div>
      
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4 border border-gray-300 rounded-lg p-4">
              
{/*======================== family history============================================ */}

       
               <div className='col-span-2'>
                 <h5 className='form-title'>Family History</h5>
               
             
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4 border border-gray-300 rounded-lg p-4">
                         <div className="col-span-2">
                           <FormControl fullWidth size="small">
                             <label className="form-label">Disease Name</label>
                             <div className="flex flex-wrap gap-2">
                               {all_disease_master.map((item) => {
                                 const selected = family_history.FamilyHistoryItem.includes(item._id); 
                                 return (
                                   <span
                                     key={item._id}
                                     onClick={() => toggleArrayField("FamilyHistoryItem", item._id)}
                                     className={`px-3 py-1 text-sm rounded-md cursor-pointer flex items-center gap-2 
                                       ${selected ? 'bg-blue-500 text-white' : 'bg-[#e2e4f4] text-gray-800'}`}
                                   >
                                     {item.lookup_value}
                                     {selected && (
                                       <span
                                         className="ml-1 text-xs font-bold cursor-pointer"
                                         onClick={(e) => e.stopPropagation()}
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
       
       
                     </div> 


    </div> 

   <div className="flex justify-end mt-4">
              
   
                 <Button
                   style={{ backgroundColor: "#52677D", fontFamily: "Lora", color: "white" }}
                   onClick={save_family_history}
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

export default FamilyHistory

