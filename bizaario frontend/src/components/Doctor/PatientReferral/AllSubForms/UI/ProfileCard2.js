import React from 'react';
import { Phone, Mail, Printer } from 'lucide-react';
import qr from '../assets/images/qr.png';
import { Plus, Edit } from 'lucide-react';
import PatientDetails from '../PatientDetails';


const ProfileCard2 = (selected_patient_details) => {

  const PatientDetails=selected_patient_details.patient_details

  return (
    <div>
      
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <h2 className="text-xl font-semibold text-gray-900 mb-6 lora">
        Contact Details
      </h2>

      <div className="flex justify-between items-start">
        {/* Left Side - Contact Information */}
        <div className="flex-1 space-y-4">
          {/* Primary Phone and Email Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-900 font-medium">{PatientDetails?.PhoneNumber}</span>
            </div>

          </div>

          {/* Other Contact Details Section */}
          <div>
            <h3 className="text-sm text-gray-900 font-medium mb-3">
              Other Kind Of Contact Details
            </h3>

            <div className="space-y-3">
              {/* Secondary Phone */}
               <div className="flex items-center space-x-3">
              <span className="text-gray-700 font-medium">Name:</span>
              <span className="text-sm text-gray-900 font-medium font-bold">
                {PatientDetails.SecondaryContactName || "-"}
              </span>
            </div>

             {/* <div className="flex items-center space-x-3">
              <span className="text-gray-700 font-medium">Relation:</span>
              <span className="text-sm text-gray-900 font-medium font-bold">
                {PatientDetails?.Relationship._id || "-"}
              </span>
            </div> */}

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-900 font-medium">{PatientDetails.SecondaryContactNumber}</span>
              </div>

              {/* Printer/Fax */}
              {/* <div className="flex items-center space-x-3">
                <Printer className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-900 font-medium">+91 2345-6789</span>
              </div> */}
            </div>
          </div>
        </div>

        {/* Right Side - QR Code */}
        <div className=" ml-8">
          <div className="flex items-center  pb-4">
            <Mail className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-900 font-medium">rairavi209@gmail.com</span>
          </div>
          <div className="w-20 h-20 border-2 border-gray-800 rounded-lg p-1 bg-white">

            {/* QR Code Pattern */}
            <div className="w-full h-full bg-white relative">
              <img src={qr} alt="QR Code" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>

     </div>
  );
};

export default ProfileCard2;
