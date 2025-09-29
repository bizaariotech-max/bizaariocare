import React from 'react';
import { Plus, Edit } from 'lucide-react';
import generalphysician from '../AllSubForms/assets/images/general physician.png'
import ChiefComplaintsForMedicalSummary from './chief_complaints_for_medical_summary';
import DiagnosticsInvestigationsForMedicalSummary from './Diagnostics_investigations_for_medical_summary';
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
import PastSurgeries from './past_surgeries';


const PastIllness = ({patientId,selected_case_file}) => {

 const doctordetails=JSON.parse(localStorage.getItem("user"))

const [isCollapsed, setIsCollapsed] = useState(false);

const[isloading,setisloading]=useState(false)






//================================== get selected case file data============================================

  const[case_file_data,setcase_file_data]=useState([])
      const getcase_filedetails=async()=>
      {
        try {
          
          const resp=await api.get(`api/v1/admin/medical-history/list?CaseFileId=${selected_case_file}`)
          setcase_file_data(resp?.data?.data?.list || [])
         
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        getcase_filedetails()
    
      },[selected_case_file])

  return (
    <div className="space">
    
    <div className="bg-[rgba(189,196,212,0.2)] p-4 rounded-lg border border-gray-200 ">

        <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Past Illness
              </h2>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
                  <span className="text-sm font-medium underline" >Add</span>
                  <Plus className="w-4 h-4" />
                </button>
                <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
                  <Edit className="w-4 h-4" />
                  <span className="text-sm font-medium underline">Edit</span>
                </button>

                        {/* Collapse / Expand Button */}
       <button
  onClick={() => setIsCollapsed(!isCollapsed)}
  className="text-blue-600 hover:text-blue-700 transition-colors"
>
  {isCollapsed ? (
    // Double Down Arrow (expand)
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 5l-7 7-7-7M19 13l-7 7-7-7"
      />
    </svg>
  ) : (
    // Double Up Arrow (collapse)
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 19l7-7 7 7M5 11l7-7 7 7"
      />
    </svg>
  )}
</button>


              </div>
            </div>
            
          <div
  className={`transition-all duration-500 ease-in-out overflow-hidden ${
    isCollapsed ? "max-h-0 opacity-0" : "max-h-[2000px] opacity-100"
  }`}
>


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


  

  
    {/* Vertical line */}
    <div className="absolute left-4 top-0 h-full w-[2px] bg-gray-300"></div>

    

    {/* Your existing cards */}
    <div className='card-details'>
   
      <ChiefComplaintsForMedicalSummary patientId={patientId} selected_case_file={selected_case_file} case_file_data={case_file_data}/>
    </div>

    <div className='card-details'>
      <DiagnosticsInvestigationsForMedicalSummary patientId={patientId} selected_case_file={selected_case_file} case_file_data={case_file_data}/>
    </div>

    <div className='card-details'>
      <CurrentMedicinesForMedicalSummary patientId={patientId} selected_case_file={selected_case_file} case_file_data={case_file_data}/>
    </div>

    <div className='card-details'>
      <CurrentTherapyForMedicalSummary patientId={patientId} selected_case_file={selected_case_file} case_file_data={case_file_data}/>
    </div>

      {/* <div className='card-details'>
      <PastSurgeries patientId={patientId} selected_case_file={selected_case_file} case_file_data={case_file_data}/>
    </div> */}


   

        
    </div>
    </div>



       



     

      {/* Footer Note */}
       <div className="p-4  border-t border-gray-200">
        <p className="text-xs text-gray-600">
          1. Added By Dr Gaurav Pande (Cardiology) (Regards M1234), (Contact 8373915529, Date/ Time 20 Sep 2025, 11:57 AM IST, Noida
        </p>
      </div> 






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
