import React, { useState } from 'react'
import '../assets/css/medical-board-partner-hospital.css'
import MedicalBoard from './medical-board/MedicalBoard';

const MedicalBoardPartnerHospitals = () => {
  return (
    <>
      <section className=" spacing-top medical-board-partner-hospitals">
        <div className="container">
          <div className="row">
          <MedicalBoard />
          </div>
        </div>
      </section>
    </>
  );
}

export default MedicalBoardPartnerHospitals
