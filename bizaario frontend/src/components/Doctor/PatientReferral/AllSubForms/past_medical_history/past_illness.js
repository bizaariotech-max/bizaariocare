
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

const PastIllness = ({patientId,selected_case_file,case_file_data,onRefresh}) => {

   const doctordetails=JSON.parse(localStorage.getItem("user"))

 


const [caseFiles, setCaseFiles] = useState([])
const getall_case_file = async () => {
  try {
    const resp = await api.get(`api/v1/admin/patientCaseFile/listPatientCaseFile?PatientId=${patientId}`);
   
    setCaseFiles(resp.data.data.list)
  
    
  } catch (error) {
    console.error(error);
  } finally {
    // setLoadingSpeciality(false);
  }
};

useEffect(()=>
{
getall_case_file()
},[])






  return (
    <div className="space mt-4">


      {/* Header */}
      <div className="flex items-center justify-between mt-2  border-b border-gray-200">
        <h3 className="text-xxl font-semibold text-gray-900">
          Past Illness
        </h3>
       
      </div>

      {/* Table */}
      
 {/* Show case_file_data section */}
<div
  className="overflow-x-auto"
  style={{ display: selected_case_file ? "block" : "none" }}
>
  {/* Table Header */}
  <div className="bg-[var(--button-back-color)] text-white">
    <div className="grid grid-cols-4 gap-4 p-2 text-[20px]">
      <h3 className="table-header">Allergies</h3>
    </div>
  </div>

 
</div>


   



      {/* Footer Note */}
      {/* <div className="p-4 bg-gray-50 border-t border-gray-200" style={{display:selected_case_file?"flex":"none"}}>
        <p className="text-xs text-gray-600">
          1. Added By Dr Gaurav Pande (Cardiology) (Regards M1234), (Contact 8373915529, Date/ Time 20 Sep 2025, 11:57 AM IST, Noida
        </p>
      </div> */}



          {/* ===========================loader================================================ */}
                  {/* {isloading && (
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
                     */}

    </div>
  );
}

export default PastIllness

