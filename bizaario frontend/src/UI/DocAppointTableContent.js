import React, { useState } from 'react'
import BookingAppointment from './BookingAppointment';


const DocAppointTableContent = () => {
      const [selectedSpecialty, setSelectedSpecialty] = useState('');
  
      const appointments = [
    {id: 1, name: 'Gaurav Pandey', specialty: 'Cardiology', location: 'India/Noida', status: 'green', date: '20-12-2025/ 02:30 AM', totalSlots: 20, availableSlots: 12, waitingTime: '00:30:30' },
    {id: 2, name: 'Gaurav Pandey', specialty: 'Cardiology', location: 'India/Noida', status: 'yellow', date: '20-12-2025/ 02:30 AM', totalSlots: 20, availableSlots: 12, waitingTime: '00:30:30' },
    {id: 3, name: 'Gaurav Pandey', specialty: 'Cardiology', location: 'India/Noida', status: 'red', date: '20-12-2025/ 02:30 AM', totalSlots: 20, availableSlots: 12, waitingTime: '00:30:30' }
  ];

  const statusColors = {
    green: '#00A652',
    yellow: '#FFD700',
    red: '#FF0000'
  };

  return (
    <>
      <div className="table-responsive appoint-table-style">
        <table className="table align-middle">
          <thead className="table-heading">
            <tr className="">
              <th
                style={{
                  backgroundColor: "#4F56E3",
                  textAlign: "center",
                  paddingBlock: "18px",
                  borderRadius: "15px 0 0 0",
                  color: "#ffffff",
                  fontSize: "14px",
                  fontWeight: "200",
                  paddingLeft: "20px",
                }}
              >
                S.No.
              </th>
              <th
                style={{
                  backgroundColor: "#4F56E3",
                  textAlign: "center",
                  paddingBlock: "18px",
                  color: "#ffffff",
                  fontSize: "14px",
                  fontWeight: "200",
                }}
              >
                Doctor Name
              </th>
              <th
                style={{
                  backgroundColor: "#4F56E3",
                  textAlign: "center",
                  paddingBlock: "18px",
                  color: "#ffffff",
                  fontSize: "14px",
                  fontWeight: "200",
                }}
              >
                Speciality
              </th>
              <th
                style={{
                  backgroundColor: "#4F56E3",
                  textAlign: "center",
                  paddingBlock: "18px",
                  color: "#ffffff",
                  fontSize: "14px",
                  fontWeight: "200",
                }}
              >
                Country/City
              </th>
              <th
                style={{
                  backgroundColor: "#4F56E3",
                  textAlign: "center",
                  paddingBlock: "18px",
                  color: "#ffffff",
                  fontSize: "14px",
                  fontWeight: "200",
                }}
              >
                Status
              </th>
              <th
                style={{
                  backgroundColor: "#4F56E3",
                  textAlign: "center",
                  paddingBlock: "18px",
                  color: "#ffffff",
                  fontSize: "14px",
                  fontWeight: "200",
                }}
              >
                Schedule (Date/Time)
              </th>
              <th
                style={{
                  backgroundColor: "#4F56E3",
                  textAlign: "center",
                  paddingBlock: "18px",
                  color: "#ffffff",
                  fontSize: "14px",
                  fontWeight: "200",
                }}
              >
                Total Slots
              </th>
              <th
                style={{
                  backgroundColor: "#4F56E3",
                  textAlign: "center",
                  paddingBlock: "18px",
                  color: "#ffffff",
                  fontSize: "14px",
                  fontWeight: "200",
                }}
              >
                Available Slots
              </th>
              <th
                style={{
                  backgroundColor: "#4F56E3",
                  textAlign: "center",
                  paddingBlock: "18px",
                  color: "#ffffff",
                  fontSize: "14px",
                  fontWeight: "200",
                }}
              >
                Waiting Time
              </th>
              <th
                style={{
                  backgroundColor: "#4F56E3",
                  textAlign: "center",
                  paddingBlock: "18px",
                  color: "#ffffff",
                  fontSize: "14px",
                  fontWeight: "200",
                  borderRadius: " 0 15px  0 0",
                }}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt, index) => (
              <tr key={index}>
                <td
                  style={{ backgroundColor: "#fefefe", paddingLeft: "20px" }}
                  className="doctor-cell-data"
                >
                  S.No.
                </td>
                <td
                  style={{
                    backgroundColor: "#fefefe",
                    textAlign: "center",
                    paddingBlock: "18px",
                  }}
                >
                  <a href="#" style={{ color: "#525fe1" }}>
                    {appt.name}
                  </a>
                </td>
                <td
                  style={{
                    backgroundColor: "#fefefe",
                    textAlign: "center",
                    paddingBlock: "18px",
                  }}
                >
                  {appt.specialty}
                </td>
                <td
                  style={{
                    backgroundColor: "#fefefe",
                    textAlign: "center",
                    paddingBlock: "18px",
                  }}
                >
                  {appt.location}
                </td>
                <td
                  style={{
                    backgroundColor: "#fefefe",
                    textAlign: "center",
                    paddingBlock: "18px",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      background: statusColors[appt.status],
                    }}
                  ></span>
                </td>
                <td
                  style={{
                    backgroundColor: "#fefefe",
                    textAlign: "center",
                    paddingBlock: "18px",
                  }}
                >
                  {appt.date}
                </td>
                <td
                  style={{
                    backgroundColor: "#fefefe",
                    textAlign: "center",
                    paddingBlock: "18px",
                  }}
                >
                  {appt.totalSlots}
                </td>
                <td
                  style={{
                    backgroundColor: "#fefefe",
                    textAlign: "center",
                    paddingBlock: "18px",
                  }}
                >
                  {appt.availableSlots}
                </td>
                <td
                  style={{
                    backgroundColor: "#fefefe",
                    textAlign: "center",
                    paddingBlock: "18px",
                  }}
                >
                  {appt.waitingTime}
                </td>
                <td
                  style={{
                    backgroundColor: "#fefefe",
                    textAlign: "right",
                    paddingBlock: "18px",
                  }}
                  className="d-flex gap-2 justify-content-end"
                >
                  <button
                    className="btn appoin-action-btns px-3"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    style={{ background: "#f86f03", color: "#fff" }}
                  >
                    Book Appointment
                  </button>
                  <button
                    className="btn appoin-action-btns  px-3"
                    style={{ background: "#f86f03", color: "#fff" }}
                  >
                    Join
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <div
            className="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-fullscreen pt-3">
              <div className="modal-content spacing-top">
                <div className="modal-header py-4"  >
                  <button
                    type="button"
                    className="btn-close "
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body ">
                  <h2
                    className="modal-title  pb-3 fs-5 text-center"
                    id="exampleModalLabel"
                  >
                    Choose Date and Time
                  </h2>
                  <BookingAppointment />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DocAppointTableContent