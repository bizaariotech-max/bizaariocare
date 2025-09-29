import React, { useState } from 'react';
import { MapPin, Briefcase, Video, UserCheck, Calendar, Phone, User } from 'lucide-react';
import { MdOutlineNotificationsActive } from "react-icons/md";
// import { Checkbox } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { IoMdArrowForward } from "react-icons/io";

const doctorCardButtons = [
  { id: 1, label: "Video Consultation", value: 1000 },
  { id: 2, label: "Second Opinion", value: 2000 },
  { id: 3, label: "Treatment Booking", value: 3000 },
  { id: 4, label: "Emergency Response", value: 4000 }
];

const DoctorProfileCard = ({ doctor }) => {


  return (
    <div className=" pb-2 rounded-xl  mx-auto shadow-sm relative bg-white " style={{ borderRadius: "10px 10px " }} >
      {/* Header Section */}
      <div className="flex items-start justify-between mb-3 bg-[#eceef3] p-3 relative " style={{ borderRadius: "10px 10px 0px 0px" }}>
        <div className="flex items-start space-x-4  ">
          {/* Doctor Image */}
          <div className="w-20 h-20 rounded-full overflow-hidden  flex-shrink-0 border-2 border-white relative top-[46px]">
            <img
              src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
              alt="Dr. Dominic Stonehart"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Doctor Info */}
          <div className="flex-1">
            <h2 className="lg:text-xl font-bold text-gray-900 mb-1 ">
              Dr. Dominic Stonehart
            </h2>
            <p className=" text-gray-600 mb-1  ">
              MBBS, MD, Ms
            </p>
            <p className="text-md text-gray-600 mb-1">
              Cardiologist | 20+ Years Experience
            </p>
          </div>
        </div>

        {/* Checkbox */}
        <div className=''>
          <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />
        </div>
      </div>

      <div className="pe-3">
        <div className="flex justify-end">
          <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white">
            <div className="text-center">
              <MdOutlineNotificationsActive className="w-4 h-4 mx-auto " />
              <span className="text-xs font-semi">SOS</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-3 pb-3">

        <div className='mb-3'>
          {/* Location */}
          <div className="flex items-center space-x-2 mb-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="text-md text-gray-700">Fortis Hospital, Mumbai</span>
          </div>

          {/* Specializations */}
          <div className="flex items-start space-x-2 mb-2">
            <Briefcase className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-md text-gray-700">
                <span className="font-semibold">Specializes in :</span> Interventional Cardiology, Heart Failure Management , Preventive Cardiology
              </span>
            </div>
          </div>
        </div>

        {/* Consultation Fee Section */}
        <div className="bg-[#eceef3] p-2 rounded-lg mb-3">
          <h2 className="lg:text-xl font-semibold text-black mb-2">
            Consultation Fee
          </h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Video className="w-4 h-4 text-black" />
              <span className="text-md font-semibold text-black">ETB1000</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-black" />
              <span className="text-md font-semibold text-black">ETB2000</span>
            </div>
            <div className="flex items-center  p-1 rounded">
              <div className="w-8 h-8 bg-red-500 rounded-full flex  justify-center text-white me-1">
                <div className="">
                  <MdOutlineNotificationsActive className="w-3 h-3 " />
                  <span className="text-[8px] ">SOS</span>
                </div>
              </div>
              <span className="text-md font-semibold text-black">ETB5000</span>
            </div>
          </div>
        </div>

        {/* Doctor Details */}
        <div className="space-y-2 mb-6">
          <div className="flex gap-4">
            <span className="text-md text-gray-500 w-[200px] ">Registration Number :</span>
            <span className="text-md font-semibold text-black">65465R</span>
          </div>
          <div className="flex gap-4">
            <span className="text-md text-gray-500 w-[200px] ">City :</span>
            <span className="text-md font-semibold text-black">New Delhi</span>
          </div>
          <div className="flex gap-4">
            <span className="text-md text-gray-500 w-[200px] ">Successful Surgeries :</span>
            <span className="text-md font-semibold text-black">500+</span>
          </div>
          <div className="flex gap-4">
            <span className="text-md text-gray-500 w-[200px] ">Published Articles :</span>
            <span className="text-md font-semibold text-black">15+</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 lora">
          {/* First Row */}
          <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mb-3">
            {doctorCardButtons.map((button, index) => {
              // let isSelected = selected.includes(button.id);

              return (
                <button key={index + 1} className="common-btn-3 flex-1 py-2 px-1 border-2 border-[var(--primary-color)] text-[var(--primary-color) rounded-lg text-md font-medium hover:bg-[var(--primary-color)] hover:text-white transition-colors flex items-center justify-center space-x-1" > <div className='flex items-center'> <span className='common-btn-content '> <span>+</span> <span>{button.label}</span> </span> <span > <IoMdArrowForward className=' text-white' /> </span> </div>
                  </button>
              );
            })}
          </div>
          {/* View Profile Button */}
          <button className="w-full py-3 border-2  rounded-lg text-md font-medium  custom-btn2">
            View Profile
          </button>
        </div>


      </div>
    </div>
  );
};

export default DoctorProfileCard;
