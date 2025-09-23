import React from 'react';
import { Plus, Edit } from 'lucide-react';
import generalphysician from '../AllSubForms/assets/images/general physician.png'
import ChiefComplaints from './ChiefComplaints';
import ChiefComplaintsForMedicalSummary from './chief_complaints_for_medical_summary';
import DiagnosticsInvestigations from './DiagnosticsInvestigations';
import DiagnosticsInvestigationsForMedicalSummary from './Diagnostics_investigations';
import CurrentMedicinesForMedicalSummary from './current_medicines_for_medical_summary';
import CurrentTherapyForMedicalSummary from './current_therapy_for_medical_summary';
import SurgeryProcedurePerformed from './surgery_procedure_performed';
import CurrentMedicineForPastSurgeries from './current_medicine_for_past_surgries';

const PastSurgeries = () => {
  // Sample data for medical summary
  const medicalData = {
    pastIllness: ['Tuberculosis (TB)', 'Pneumonia'],
  };

    const medicalData1 = [
  {
    date: "20/12/2025",
    doctor: "Cardiologist",
    // other fields here
  },
  {
    date: "21/12/2025",
    doctor: "Orthopedic",
  },
  // ...
];
 

  return (
    <div className="space bg-[rgba(189,196,212,0.2)] p-4 rounded-lg border border-gray-200 mt-4">
      {/* Header */}
   

       <div className="flex items-center justify-between mt-2 ">
              <h2 className="text-xl font-semibold text-gray-900">
                Past Surgeries
              </h2>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
                  <span className="text-sm font-medium underline">Add</span>
                  <Plus className="w-4 h-4" />
                </button>
                <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
                  <Edit className="w-4 h-4" />
                  <span className="text-sm font-medium underline">Edit</span>
                </button>
              </div>
            </div>

  
     
      <div className="">
        <div className="flex flex-wrap gap-2">
            <span
              className="px-3 py-1 bg-[#e2e4f4]  text-sm rounded-md"
            >
              Kidney Stone Surgery
            </span>

               <span
              className="px-3 py-1 bg-[#e2e4f4]  text-sm rounded-md"
            >
              Tansilectomy
            </span>

        </div>
      </div>


        <div className="flex gap-2 flex-nowrap overflow-x-auto sm:overflow-visible mt-10" style={{cursor:"pointer"}}>

        <div className='medical-card' >
        <img src={generalphysician} alt=''></img>
        <p style={{ margin: 0,  fontWeight: "600",fontFamily:"Lora",whiteSpace: "nowrap" }}>General Surgeries</p>
        </div>

        
        <div className='medical-card' >
            <img src={generalphysician} alt=''></img>
            <p style={{ margin: 0,  fontWeight: "600",fontFamily:"Lora",whiteSpace: "nowrap" }}>Cardiologist Surgeries</p>
        </div>

        <div className='medical-card' >

            <img src={generalphysician} alt=''></img>
                <p style={{ margin: 0,  fontWeight: "600",fontFamily:"Lora",whiteSpace: "nowrap" }}>Orthopedic Surgeries</p>
        </div>


       
        <div className='medical-card' >

            <img src={generalphysician} alt=''></img>
            <p style={{ margin: 0,  fontWeight: "600",fontFamily:"Lora",whiteSpace: "nowrap" }}>Neurology Surgeries</p>

        </div>
    </div>


    {/* <div className='card-details' style={{marginTop:"20px"}}>
        <h3 className='table-header'>20/12/2025</h3>
         <div style={{display:"flex"}} >
            <img src={generalphysician} alt='' style={{height:"26px"}}></img>
            <p style={{ margin: 0,  fontWeight: "600",fontFamily:"Lora",whiteSpace: "nowrap" }}>General Physician</p>
        </div>
        <SurgeryProcedurePerformed/>
    </div>

    <div className='card-details'>
        <CurrentMedicineForPastSurgeries/>
    </div> */}

        {medicalData1.map((item, index) => (
      <div key={index} className="relative pl-10">
        {/* Vertical line */}
        <div className="absolute left-4 top-0 h-full w-[2px] bg-gray-300"></div>
    
        {/* Circle number */}
        <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-gray-500 text-white flex items-center justify-center text-xs font-bold">
          {index + 1}
        </div>
    
        {/* Your existing cards */}
        <div className='card-details' style={{marginTop:"20px"}}>
          <h3 className='table-header'>{item.date}</h3>
          <div style={{display:"flex"}}>
            <img src={generalphysician} alt='' style={{height:"26px"}} />
            <p style={{ margin: 0, fontWeight: "600", fontFamily: "Lora", whiteSpace: "nowrap" }}>{item.doctor}</p>
          </div>
          <SurgeryProcedurePerformed/>
        </div>
    
        <div className='card-details'>
          <CurrentMedicineForPastSurgeries/>
        </div>
    
      
    
       
      </div>
    ))}

     
   

        




       



     

      {/* Footer Note */}
      {/* <div className="p-4  border-t border-gray-200">
        <p className="text-xs text-gray-600">
          1. Added By Dr Gaurav Pande (Cardiology) (Regards M1234), (Contact 8373915529, Date/ Time 20 Sep 2025, 11:57 AM IST, Noida
        </p>
      </div> */}
    </div>
  );
};

export default PastSurgeries;
