import React from 'react';
import { Plus, Edit } from 'lucide-react';
import generalphysician from '../AllSubForms/assets/images/general physician.png'
import { useEffect, useState,useRef } from 'react'
import { Modal, } from 'react-bootstrap'; 
import { TextField, Select, MenuItem, FormControl, Button,  } from '@mui/material';

import api from '../../../../api'
import Swal from 'sweetalert2';
import UniqueLoader from '../../../loader';

import ChiefComplaintsForMedicalSummaryPresent from './present_Illness_Sub_Components/chief_complaints_for_medical_summary_present';
import DiagnosticsInvestigationsForMedicalSummaryPresent from './present_Illness_Sub_Components/Diagnosis_investigations_for_medical_summary_present';
import CurrentMedicinesForMedicalSummaryPresent from './present_Illness_Sub_Components/current_medicines_for_medical_summary_present';
import CurrentTherapyForMedicalSummaryPresent from './present_Illness_Sub_Components/current_therapy_for_medical_summary_present';
import PremiumDoctorCarousel from './PremiumDoctor/PremiumDoctorCarousel';
import PreExistingDisease from './present_Illness_Sub_Components/pre_existing_disease';
import FamilyHistory from './present_Illness_Sub_Components/family_history';
import HabitLifestyle from './present_Illness_Sub_Components/habit_lifestyle';
import Allergies from './present_Illness_Sub_Components/allergies';
import Pastaccidenttrauma from './present_Illness_Sub_Components/past_accident_trauma';
import CurrentMedications from './present_Illness_Sub_Components/current_medications';
import CurrentTherapies from './present_Illness_Sub_Components/current_therapis';



const PresentIllness = ({patientId,selected_case_file}) => {

  const[loading_for,setloading_for]=useState("")

 const doctordetails=JSON.parse(localStorage.getItem("user"))

const [isCollapsed, setIsCollapsed] = useState(false);



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


 
  

//========================== modal open or close start==========================================
      
        const [show, setShow] = useState(false)
          const handleShow = () => setShow(true);
          const handleClose = () => setShow(false);



    
   //======================= get all data of truma-master=========================================

    const[alltruma,setalltruma]=useState([])
      const gettruma=async()=>
      {
        try {
          
          const resp=await api.post('api/v1/common/LookupList',{lookup_type: "trauma_master"})
          setalltruma(resp?.data?.data || []);
         
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        gettruma()
    
      },[])


  
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

  

 
   
     <div
  className={`transition-all duration-500 ease-in-out overflow-auto ${
    isCollapsed ? "max-h-0 opacity-0" : "max-h-[2000px] opacity-100"
  }`}
>
        <div className="">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-[#e2e4f4] text-sm rounded-md">
              Tuberculosis(TB)
            </span>

            <span className="px-3 py-1 bg-[#e2e4f4] text-sm rounded-md">
              Pneumonia
            </span>
          </div>
        </div>

       

        {/* Cards */}

          <div className="card-details">
          <PreExistingDisease
          key={refreshKeys.preExisting}
            onRefresh={() => handleComponentRefresh("preExisting")}
            patientId={patientId}
            selected_case_file={selected_case_file}
            case_file_data={case_file_data}
          />
        </div>

        <div className="card-details">
          <CurrentMedications
           key={refreshKeys.familyHistory}
            onRefresh={() => handleComponentRefresh("familyHistory")}
            patientId={patientId}
            selected_case_file={selected_case_file}
            case_file_data={case_file_data}
          />
        </div>

         <div className="card-details">
          <CurrentTherapies
           key={refreshKeys.familyHistory}
            onRefresh={() => handleComponentRefresh("familyHistory")}
            patientId={patientId}
            selected_case_file={selected_case_file}
            case_file_data={case_file_data}
          />
        </div>

         <div className="card-details">
          <FamilyHistory
            key={refreshKeys.familyHistory}
            onRefresh={() => handleComponentRefresh("familyHistory")}
            patientId={patientId}
            selected_case_file={selected_case_file}
            case_file_data={case_file_data}
          />
        </div>

          <div className="card-details">
          <HabitLifestyle
            key={refreshKeys.habits}
            onRefresh={() => handleComponentRefresh("habits")}
            patientId={patientId}
            selected_case_file={selected_case_file}
            case_file_data={case_file_data}
          />
        </div>

        <div className="card-details">
          <Allergies
            key={refreshKeys.allergies}
            onRefresh={() => handleComponentRefresh("allergies")}
            patientId={patientId}
            selected_case_file={selected_case_file}
            case_file_data={case_file_data}
          />
        </div>

            <div className="card-details">
          <Pastaccidenttrauma
            key={refreshKeys.trauma}
            onRefresh={() => handleComponentRefresh("trauma")}
            patientId={patientId}
            selected_case_file={selected_case_file}
            case_file_data={case_file_data}
          />
        </div>
       


        <div className="card-details">
          <ChiefComplaintsForMedicalSummaryPresent
            patientId={patientId}
            selected_case_file={selected_case_file}
            case_file_data={case_file_data}
          />
        </div>

        <div className="card-details">
          <DiagnosticsInvestigationsForMedicalSummaryPresent
            patientId={patientId}
            selected_case_file={selected_case_file}
            case_file_data={case_file_data}
          />
        </div>

        <div className="card-details">
          <CurrentMedicinesForMedicalSummaryPresent
            patientId={patientId}
            selected_case_file={selected_case_file}
            case_file_data={case_file_data}
          />
        </div>

        <div className="card-details">
          <CurrentTherapyForMedicalSummaryPresent
            patientId={patientId}
            selected_case_file={selected_case_file}
            case_file_data={case_file_data}
          />
        </div>
      </div>
   
  </div>

  {/* Footer Note */}
  <div className="p-4 border-t border-gray-200">
    <p className="text-xs text-gray-600">
      1. Added By Dr Gaurav Pande (Cardiology) (Regards M1234), (Contact
      8373915529, Date/ Time 20 Sep 2025, 11:57 AM IST, Noida
    </p>
  </div>


  {/*======================== modal for add pre existing disease ================================*/}


   <Modal show={show} onHide={handleClose} centered size="lg">
          
                <Modal.Header closeButton>
                  <Modal.Title className='form-title'>Add Pre-Existing Disease (s)</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                
        
           <div>
        
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4 border border-gray-300 rounded-lg p-4">
                
  {/*======================== chief complaints============================================ */}
  
          <div className='col-span-2'>
          
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4 border border-gray-300 rounded-lg p-4">
                          
                           <div className="col-span-2">
                          <FormControl fullWidth size="small">
                          <label className="form-label">Disease Name</label>
                          <div className="flex flex-wrap gap-2">
                            {alltruma.map((item) => {
                              const selected = (item?.Symptoms || []).includes(item._id); 
                              return (
                                <span
                                  key={item._id}
                                  // onClick={() => toggleArrayField(index, "Symptoms", item._id)}
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

export default PresentIllness;
