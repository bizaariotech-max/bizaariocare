import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import user1 from '../assets/images/user1.svg';

const ProfileCard1 = (selected_patient_details) => {


  const PatientDetails=selected_patient_details.patient_details
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-start space-x-4">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <img
            src={PatientDetails?.ProfilePic}
            alt="Kapupriya Gupta"
            className="w-40 h-40  rounded-lg object-cover"
          />
        </div>

        {/* Profile Information */}
        <div className="flex-1 min-w-0">
          {/* Name */}
          <h2 className="text-3xl font-semibold text-gray-900 mb-3 lora">
           {PatientDetails?.Name}
          </h2>

          {/* Date and Status */}
          <div className="flex items-center space-x-4 mb-3">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700 font-medium">
              {PatientDetails?.DateOfBirth
                ? new Date(PatientDetails?.DateOfBirth).toLocaleDateString()
                : "-"}
            </span>

            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700 font-medium">{PatientDetails?.AddressLine1}
                {PatientDetails?.AddressLine2?(PatientDetails.AddressLine2):""}</span>
            </div>
          </div>

          {/* Details Grid */}
          <div >
            {/* Nationality */}
            <div className="mb-2">
              <span className="text-sm light-text font-medium flex-shrink-0">Nationality:</span>
              <span className="text-sm text-gray-900 font-semibold"> {PatientDetails?.Nationality?.StationName}</span>
            </div>

            {/* Country of Residence */}
            <div className="mb-2">
              <span className="text-sm light-text font-medium  flex-shrink-0">Country Of Residence: </span>
              <span className="text-sm text-gray-900 font-semibold"> {PatientDetails?.CountryOfResidence?.StationName}</span>
            </div>

            {/* Gender and Blood Group */}
            <div className="flex items-start space-x-12 ">
              <div className="flex items-start mb-2">
                <span className="text-sm light-text font-medium">Gender:</span>
                <span className="text-sm text-gray-900 font-semibold ml-2">{PatientDetails?.Gender}</span>
              </div>
              <div className="flex items-start ">
                <span className="text-sm light-text font-medium">Blood Group:</span>
                <span className="text-sm text-gray-900 font-semibold ml-2"> B+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard1;
