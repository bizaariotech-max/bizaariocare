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
import PastSurgeries from './AllSubForms/past_surgeries';

import { Modal,  Form, Row, Col } from 'react-bootstrap';
import api from '../../../api'
import { TextField, Select, MenuItem, FormControl, Avatar,Tooltip,IconButton,CircularProgress, Button, Radio, FormControlLabel, RadioGroup, FormLabel } from '@mui/material';
import { customMenuProps } from '../../../utils/mui_select_scroll_bar';
import PresentIllness from './AllSubForms/present_illness';


const PatientReferralHome = () => {

    const [show, setShow] = useState(false)
  
    // function to open modal
    const handleShow = () => setShow(true);
    // function to close modal
    const handleClose = () => setShow(false);

    useEffect(()=>
    {
      handleShow()
    },[])

      //=========================== get all patient details=========================================
    
      const[all_patient,setall_patient]=useState([])

      const get_patient_details=async()=>
      {
        try {
          const resp=await api.get(`api/v1/admin/patientList`)
          console.log(resp);
        setall_patient(resp.data.data.list)
          
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        get_patient_details()
      },[])

      const[patientId,setpatientId]=useState("")

  return (
    <>
    <Doctorheader />

      <div className="layout">
        <Doctorsidebar />
        <div className="content-wrapper">
        <div className="main-content">

      <PatientTabs />
      <PatientDetails patientId={patientId}/>
      <ChiefComplaints  patientId={patientId}/>
      <CurrentMedicines />
      <ClinicalOutcome />
      <CurrentTherapy />
      {/* <MedicalSummary /> */}
      <PresentIllness/>
      <PastIllness patientId={patientId}/>
      <PastSurgeries/>
      <PastMedications />
      <PastTherapy />
      <OccupationalProfile />
      <ClinicalFindings />
      <VitalsPhysicalExaminations />
      <DiagnosticsInvestigations />
      <Diagnosis />
      <TreatmentToDate />
      <PatientResponse /> 
         </div>
        </div>
      </div>


      <Modal show={show} onHide={handleClose} centered size="lg">
        
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
            {/* <Button type="submit" variant="primary">
              Next
            </Button> */}
          </Modal.Footer>
          
         
          </Modal>

    </>
  )
}

export default PatientReferralHome
