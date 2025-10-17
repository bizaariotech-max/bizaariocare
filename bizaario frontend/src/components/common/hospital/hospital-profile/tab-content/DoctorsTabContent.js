import React from 'react'
// import DoctorCard from '../cards/DoctorCard';
import doctorImg from "../../../../../assets/images/hospital-profile/doctor1.png";
import { MapPin, Briefcase } from "lucide-react";
export const doctorsArr = [
  {
    id: 1,
    name: "Dr. Dominic Stonehart",
    img: doctorImg,
    title: "Cardiologist | 15+ Years Experience",
    location: "Fortis Hospital, Mumbai",
    specialization:
      "Interventional Cardiology, Heart Failure Management, Preventive Cardiology",

  },
  {
    id: 2,
    name: "Dr. Dominic Stonehart",
    img: doctorImg,
    title: "Cardiologist | 15+ Years Experience",
    hospital: "Fortis Hospital, Mumbai",
    specialization:
      "Interventional Cardiology, Heart Failure Management, Preventive Cardiology",
    location: "Fortis Hospital, Mumbai",
  },
  {
    id: 3,
    name: "Dr. Dominic Stonehart",
    img: doctorImg,
    title: "Cardiologist | 15+ Years Experience",
    hospital: "Fortis Hospital, Mumbai",
    specialization:
      "Interventional Cardiology, Heart Failure Management, Preventive Cardiology",
    location: "Fortis Hospital, Mumbai",
  },
  {
    id: 4,
    name: "Dr. Dominic Stonehart",
    img: doctorImg,
    title: "Cardiologist | 15+ Years Experience",
    hospital: "Fortis Hospital, Mumbai",
    specialization:
      "Interventional Cardiology, Heart Failure Management, Preventive Cardiology",
    location: "Fortis Hospital, Mumbai",
  },
  {
    id: 5,
    name: "Dr. Dominic Stonehart",
    img: doctorImg,
    title: "Cardiologist | 15+ Years Experience",
    hospital: "Fortis Hospital, Mumbai",
    specialization:
      "Interventional Cardiology, Heart Failure Management, Preventive Cardiology",
    location: "Fortis Hospital, Mumbai",
  },
  {
    id: 6,
    name: "Dr. Dominic Stonehart",
    img: doctorImg,
    title: "Cardiologist | 15+ Years Experience",
    hospital: "Fortis Hospital, Mumbai",
    specialization:
      "Interventional Cardiology, Heart Failure Management, Preventive Cardiology",
    location: "Fortis Hospital, Mumbai",
  },

];

const DoctorsTabContent = ({ hospitalData }) => {
  // Use dynamic doctors from hospitalData or fallback to static data
  const doctors = hospitalData?.doctors || doctorsArr;
  
  return (
    <div className='space-top'>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5'>
        {doctors.map((doctor, index) => (
          <div key={index}>
            <div className="flex items-center justify-center ">
              <div className="w-full border border-gray-200 rounded-lg">
                {/* ====header-section=== */}
                <div className="w-full mb-3 ">
                  <div className=" mb-4 flex  justify-between py-1 gap-5  w-full bg-[#eceef3] px-4">
                    <div className='lg:relative lg:top-[30px]'>

                      <div className="w-20 h-20 rounded-full bg-white p-[3px] shadow-lg ">
                        <img
                          src={doctor.img || doctor.profilePicture || doctorImg}
                          alt={doctor.name || doctor.doctorName || "Doctor"}
                          className="object-cover w-full h-full rounded-full"
                        />
                      </div>
                    </div>
                    <div className='flex flex-col item-end ps-5 justify-center'>
                      <h3 className='text-xl font-semibold'>{doctor.name || doctor.doctorName || "Dr. Dominic Stonehart"}</h3>
                      <p className='text-gray-600 text-sm'>{doctor.title || doctor.role || doctor.designation || "Senior Cardiologist, Apollo Hospitals"}</p>
                    </div>
                  </div>
                </div>
                <div className='px-4 pb-4 mt-10'>
                  <div className="flex items-start gap-3 mb-4">
                    <MapPin className="w-5 h-5 text-slate-500 mt-0.5 flex-shrink-0" />
                    <p className="text-base font-medium text-slate-700">
                      {doctor.location || doctor.hospital || "Fortis Hospital, Mumbai"}
                    </p>
                  </div>

                  {/* Specializations */}
                  <div className="flex items-start gap-3 mb-6">
                    <Briefcase className="w-5 h-5 text-slate-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-black">Specializes in: </span>
                      <span className="text-slate-600">{doctor.specialization || doctor.specialty || "Interventional Cardiology, Heart Failure Management, Preventive Cardiology"}</span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col space-y-3">
                    <button className="btn-fill">
                      Send Medical Query
                    </button>

                    <button className="btn-outline">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorsTabContent

