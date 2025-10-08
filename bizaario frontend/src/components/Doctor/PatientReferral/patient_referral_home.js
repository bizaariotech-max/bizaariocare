import React, { useEffect, useState } from 'react'
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import PatientTabs from '../../Doctor/PatientReferral/AllSubForms/PatientTabs';
import PatientDetails from '../../Doctor/PatientReferral/AllSubForms/PatientDetails';
import ChiefComplaints from '../../Doctor/PatientReferral/AllSubForms/ChiefComplaints';
import CurrentMedicines from '../../Doctor/PatientReferral/AllSubForms/CurrentMedicines';
import ClinicalOutcome from '../../Doctor/PatientReferral/AllSubForms/ClinicalOutcome';
import CurrentTherapy from '../../Doctor/PatientReferral/AllSubForms/CurrentTherapy';
import MedicalSummary from '../../Doctor/PatientReferral/AllSubForms/MedicalSummary';
import PastMedications from '../../Doctor/PatientReferral/AllSubForms/PastMedications';
import PastTherapy from '../../Doctor/PatientReferral/AllSubForms/PastTherapy';
import OccupationalProfile from '../../Doctor/PatientReferral/AllSubForms/OccupationalProfile';
import ClinicalFindings from '../../Doctor/PatientReferral/AllSubForms/ClinicalFindings';
import VitalsPhysicalExaminations from '../../Doctor/PatientReferral/AllSubForms/VitalsPhysicalExaminations';
import DiagnosticsInvestigations from '../../Doctor/PatientReferral/AllSubForms/DiagnosticsInvestigations';
import Diagnosis from '../../Doctor/PatientReferral/AllSubForms/Diagnosis';
import TreatmentToDate from '../../Doctor/PatientReferral/AllSubForms/TreatmentToDate';
import PatientResponse from '../../Doctor/PatientReferral/AllSubForms/PatientResponse';
import Doctorheader from '../doctorheader';
import Doctorsidebar from '../doctorsidebar';
import '../../Doctor/PatientReferral/patient_referral.css'
import PastIllness from './AllSubForms/past_illness';
import PastSurgeries from './AllSubForms/past_medical_history/past_surgeries';
import { Link } from 'react-router-dom';

import { Modal,  Form, Row, Col } from 'react-bootstrap';
import api from '../../../api'
import { TextField, Select, MenuItem, FormControl, Avatar,Tooltip,IconButton,CircularProgress, Button, Radio, FormControlLabel, RadioGroup, FormLabel } from '@mui/material';
import { customMenuProps } from '../../../utils/mui_select_scroll_bar';
import ExistingDisease from './AllSubForms/existing_disease/existing_diseases';
import OpenMedicalCaseFiles from './AllSubForms/open_medical_case_files';
import PatientReferralVerify from './AllSubForms/PatientReferralVerify';
import { useLocation } from 'react-router-dom';
import PremiumDoctorCarousel from './AllSubForms/PremiumDoctor/PremiumDoctorCarousel';
import PremiumDoctor from './AllSubForms/PremiumDoctor/PremiumDoctor';
import SurgeryProcedurePerformed from './AllSubForms/surgery_procedure_performed';
import TherapyGiven from './AllSubForms/TherapyGiven';
import LifestyleInterventionsPrescribed from './AllSubForms/LifestyleInterventionsPrescribed';
import ProposedSurgery from './AllSubForms/ProposedSurgery';
import PreSurgicalConsiderations from './AllSubForms/PreSurgicalConsiderations';
import RiskFactor from './AllSubForms/RiskFactor';
import PatientConcerns from './AllSubForms/PatientConcerns';
import ImmunizationProfile from './AllSubForms/ImmunizationProfile';
import PastMedicalHistoryMain from './AllSubForms/past_medical_history/past_medical_history_main';
import CurrentProblemMain from './AllSubForms/current_problem/current_problem_main';
import PatientProfilingMain from './AllSubForms/patient_profiling/patient_profiling_main';



const PatientReferralHome = () => {

  const location =useLocation()
 
  const patient_details=location.state.patient_details
  const patientId=patient_details._id

  const[selected_case_file,setselected_case_file]=useState("")


 
  
  
  return (
    <>
    <Doctorheader />

      <div className="layout">
        <Doctorsidebar />
        <div className="content-wrapper">
        <div className="main-content">
      <PatientTabs />
      <PatientDetails patientId={patientId}/>
      
      {/* <ChiefComplaints  patientId={patientId}/> */}
      {/* <CurrentMedicines /> */}
      {/* <ClinicalOutcome /> */}
      {/* <CurrentTherapy /> */}
      {/* <MedicalSummary /> */}
      
      <OpenMedicalCaseFiles patientId={patientId} patient_details={patient_details} setselected_case_file={setselected_case_file}/>
      
      <CurrentProblemMain patientId={patientId} selected_case_file={selected_case_file}/>

      <PatientProfilingMain patientId={patientId} selected_case_file={selected_case_file}/>

       {/* <PastMedicalHistoryMain patientId={patientId} selected_case_file={selected_case_file}/> */}

      {/* <ExistingDisease patientId={patientId} selected_case_file={selected_case_file}/> */}
      {/* <PastIllness patientId={patientId} selected_case_file={selected_case_file}/> */}

      {/* <OpenMedicalCaseFiles patientId={patientId} patient_details={patient_details} setselected_case_file={setselected_case_file}/> */}
     
       
      {/* <PastMedications /> */}
      {/* <PastTherapy /> */}
      {/* <OccupationalProfile /> */}
      {/* <ClinicalFindings /> */}
      {/* <VitalsPhysicalExaminations /> */}
      {/* <DiagnosticsInvestigations /> */}
      {/* <Diagnosis /> */}
      {/* <TreatmentToDate /> */}
      {/* <PatientResponse />  */}
      {/* <SurgeryProcedurePerformed/> */}
      {/* <TherapyGiven/> */}
      {/* <LifestyleInterventionsPrescribed/> */}
      {/* <ProposedSurgery/> */}
      {/* <PreSurgicalConsiderations/> */}
      {/* <RiskFactor/> */}
      {/* <PatientConcerns/> */}
      {/* <ImmunizationProfile/> */}

        <div className="mt-6">
              <div className="flex gap-4">
                {/* Outline Button */}
                <button className="px-4 py-2  border-2 border-[var(--primary-color)] text-[var(--primary-color)] rounded-md  hover:bg-[var(--primary-color)] hover:text-white transition lora">
                  Edit Details
                </button>

                {/* Filled Button */}
                <button className="lora px-4 py-2 bg-[var(--primary-color)] text-white rounded-md  hover:bg-[var(--primary-color)] transition">
                  <Link to="/patient-referral/appoint-doctors" className="no-underline text-white">
                    Patient Referral
                  </Link>
                </button>
              </div>
            </div>


         </div>
        </div>
      </div>


      {/* <Modal show={show} onHide={handleClose} centered size="lg">
        
              <Modal.Header closeButton>
                <Modal.Title>Select Patient </Modal.Title>
              </Modal.Header>
              <Modal.Body>
              
      
            <FormControl fullWidth size="small">
            <label className="form-label">Select Patient</label>
           <Select
                labelId="content-type-label"
                name="State"
                value={patientId}
                onChange={(e) => {
                setpatientId(e.target.value);
                handleClose();
              }}

                displayEmpty
                MenuProps={customMenuProps}
                renderValue={(selected) => {
                  if (!selected) {
                    return <span style={{ color: "#9ca3af" }}>Select Patient</span>; 
                  }
                  return all_patient?.find((item) => item._id === selected)?.Name;
                }}
              >
                <MenuItem value="">
                  <em>Select Patient</em>
                </MenuItem>
                {all_patient?.map((type) => (
                  <MenuItem key={type._id} value={type._id}>
                    {type.Name}
                  </MenuItem>
                ))}
                            

            </Select>
            </FormControl>
      
              </Modal.Body>

                <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
         
          </Modal.Footer>
          
         
          </Modal> */}

    </>
  )
}

export default PatientReferralHome
