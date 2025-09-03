import React from 'react'

import DoctorAppointmentTable from '../../UI/DoctorAppointmentTable'

const OnlineClinic = () => {
  return (
    <>
      <section className="spacing-top">
        <div className="container ">
          <div className="row">
            <div className="col-lg-8 col-12">
              <h2 className="fw-semibold ">Online Clinics</h2>
              <p className="light-color">
                Learn from leading doctors and specialists through focused,
                digestible video content.
              </p>
            </div>
          </div>
        </div>
        <DoctorAppointmentTable />
      </section>
    </>
  );
}

export default OnlineClinic