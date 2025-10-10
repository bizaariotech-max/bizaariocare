import React from 'react';
import { Plus, Edit } from 'lucide-react';
import { useEffect, useState,useRef } from 'react'
import { Modal, } from 'react-bootstrap'; 
import { TextField, Select, MenuItem, FormControl, Button,  } from '@mui/material';

import api from '../../../../../api'
import Swal from 'sweetalert2';
import UniqueLoader from '../../../../loader';
import PatientReferral from './patient_referral';
import PatientReferralForSecondOpenioun from './patient_referral_for_second_opinioun';
import PatientReferralForMedicalTourism from './medical_tourism';
import DoctorHospitalSelection from './doctor_hospital_selection';






const DoctorQueryForPatientReferralMain = ({patientId,selected_case_file}) => {

  const[loading_for,setloading_for]=useState("")

 const doctordetails=JSON.parse(localStorage.getItem("user"))

const [isCollapsed, setIsCollapsed] = useState(true);



//======================== get medical history data by patien id==============================

const[medical_history_id,setmedical_history_id]=useState("")

 const getall_patient_medical_history = async () => {
   try {
    //  setLoadingSpeciality(true);
     const resp = await api.get(`api/v1/admin/medical-history/list?PatientId=${patientId}&Status=Ongoing`);
      const historyList = resp?.data?.data?.list || [];

    // ✅ find matching case file
    const matchedHistory = historyList.find(
      (item) => item?.CaseFileId?._id === selected_case_file
    );

    if (matchedHistory) {
      setmedical_history_id(matchedHistory._id);
    } else {
      setmedical_history_id(""); // no match found
    }
      
      
     
   } catch (error) {
     console.error(error);
   } finally {
   }
 };

 useEffect(()=>
{
  getall_patient_medical_history()
},[selected_case_file])

 
//================================== get selected case file data============================================

  const[case_file_data,setcase_file_data]=useState([])
      const getcase_filedetails=async()=>
      {
        try {
          
          const resp=await api.get(`api/v1/admin/medical-history/list?CaseFileId=${selected_case_file}`)
          setcase_file_data(resp?.data?.data?.list || []);
         
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        getcase_filedetails()
    
      },[selected_case_file])

   
  //=========================== drop down for update status====================================

  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("Update Status");
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  
  const [refreshKeys, setRefreshKeys] = useState({
  preExisting: 0,
  familyHistory: 0,
  habits: 0,
  allergies: 0,
  trauma: 0,
  complaints: 0,
  diagnostics: 0,
  medicines: 0,
  therapy: 0,
});

// Function to trigger refresh for a single component
const handleComponentRefresh = (name) => {
  setRefreshKeys((prev) => ({
    ...prev,
    [name]: prev[name] + 1, // increment to re-render that specific component
  }));
};


      

  return (
   <div className="space">
  <div className="bg-[rgba(189,196,212,0.2)] p-4 rounded-lg border border-gray-200">

      <div className="flex items-center justify-between mt-2 ">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Doctor Query for Patient Referral
                  </h2>
              
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
    
        
     <div
  className={`transition-all duration-300 ease-in-out overflow-auto ${
    isCollapsed ? "max-h-0 opacity-0" : "max-h-[100%] opacity-100"
  }`}
>
         
         

       

        {/* Cards */}

      
    <div className="card-details">
          <PatientReferral
           key={refreshKeys.pastsurgery}
            onRefresh={() => handleComponentRefresh("pastsurgery")}
            patientId={patientId}
            selected_case_file={selected_case_file}
            case_file_data={case_file_data}
          />
        </div>
         
 <div className="card-details">
          <PatientReferralForSecondOpenioun
           key={refreshKeys.pastsurgery}
            onRefresh={() => handleComponentRefresh("pastsurgery")}
            patientId={patientId}
            selected_case_file={selected_case_file}
            case_file_data={case_file_data}
          />
        </div>

         <div className="card-details">
          <PatientReferralForMedicalTourism
           key={refreshKeys.pastsurgery}
            onRefresh={() => handleComponentRefresh("pastsurgery")}
            patientId={patientId}
            selected_case_file={selected_case_file}
            case_file_data={case_file_data}
          />
        </div>

         <div className="card-details">
          <DoctorHospitalSelection
           key={refreshKeys.pastsurgery}
            onRefresh={() => handleComponentRefresh("pastsurgery")}
            patientId={patientId}
            selected_case_file={selected_case_file}
            case_file_data={case_file_data}
          />
        </div>
        

           

      

        
         

     
   </div>
  </div>



   {loading_for==="update status" && (
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

export default DoctorQueryForPatientReferralMain;
