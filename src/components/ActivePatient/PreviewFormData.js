import React from 'react'
import userProfile from '../../assets/images/profile-image.png'
import { MdOutlinePhone } from "react-icons/md";
import { TfiAngleUp } from "react-icons/tfi";

const PreviewFormData = ({formData}) => {
  return (
    <>
      <div className="bg-white rounded-xl shadow p-4">
            <h3 className="font-semibold mb-4">Preview</h3>
            <div className="flex items-center justify-between mb-3">
              <p className="font-semibold">Patients Details</p>
              <span className="text-gray-500"><TfiAngleUp /></span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <img src={userProfile} alt="Patient" className="w-16 h-16 rounded-full object-cover" />
              <div>
                <p className="font-semibold text-[20px]">{formData.name || "Patient Name"}</p>
                <div className="text-sm text-gray-600 flex flex-wrap gap-x-6 text-[12px]">
                  <span>Date Of Birth : <span  className="text-[#000000] font-semibold">{formData.dob || "DD/MM/YYYY"}</span></span>
                  <div className="flex justify-between"> 
                  <span className="me-2 text-[12px]">Gender: <span className="text-[#000000] font-semibold">{formData.gender || " Female "}</span></span>
                  <span className="text-[12px]">Blood Group: <span className="text-[#000000] font-semibold">{formData.bloodGroup || "  B+"}</span></span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="rounded-lg border border-gray-200 bg-indigo-50">
                <div className="px-3 pt-2 bg-indigo-50 rounded-t-lg font-medium text-sm">Contact Details</div>
                <div className="px-3 py-2 text-sm">
                  <div className="flex items-center gap-2"><MdOutlinePhone /> <span className="text-[#000000] font-semibold">{formData.contactNumber || " 5652656256"}</span></div>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 bg-indigo-50">
                <div className="px-3 pt-2 bg-indigo-50 rounded-t-lg font-medium text-sm">ID Details</div>
                <div className="px-3 py-2 text-sm space-y-1">
                  <p>UHID No. : 
                    <span className="text-[#000000] font-semibold"> 
                    {formData.uhid || "EMJ1785030"}
                  </span>
                  </p>
                  <p>ABHA No. :  <span className="text-[#000000] font-semibold"> {formData.abha || "AB5494984894HA5987"}</span></p>
                  <p>Insurer :  <span className="text-[#000000] font-semibold"> {formData.insurer || "+91 6269265965"}</span></p>
                  <p>Policy no. :  <span className="text-[#000000] font-semibold"> {formData.policyNumber || "PO654848784IHIH65895JHHG"}</span></p>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 bg-indigo-50">
                <div className="px-3 pt-2 bg-indigo-50 rounded-t-lg font-medium text-sm">Emergency Details</div>
                <div className="px-3 py-2 text-sm space-y-1">
                  <p>Contact No. :  <span className="text-[#000000] font-semibold"> {formData.emergencyContactNumber || "5652656256"}</span></p>
                  <p>Contact Name :  <span className="text-[#000000] font-semibold"> {formData.emergencyContactName || "Prince Kumar"}</span></p>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 bg-indigo-50">
                <div className="px-3 pt-2 bg-indigo-50 rounded-t-lg font-medium text-sm">Referred By</div>
                <div className="px-3 py-2 text-sm space-y-1">
                  <p>Dr. Name :  <span className="text-[#000000] font-semibold"> {formData.referredByName || "Prince Kumar"}</span></p>
                  <p>Dr. Contact no. :  <span className="text-[#000000] font-semibold"> {formData.referredByNumber || "+91 5652656256"}</span></p>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 bg-indigo-50">
                <div className="px-3 pt-2 bg-indigo-50 rounded-t-lg font-medium text-sm">Other Details</div>
                <div className="px-3 py-2 text-sm space-y-1">
                  <p>Nationality :  <span className="text-[#000000] font-semibold"> {formData.nationality || "India"}</span></p>
                  <p>Patient Panel :  <span className="text-[#000000] font-semibold"> {formData.patientPanel || "TPA"}</span></p>
                  <p>
                    Referral Letter : {formData.referralLetter instanceof File ? (
                      <a
                        className="text-blue-600 underline font-semibold"
                        href={URL.createObjectURL(formData.referralLetter)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View Letter
                      </a>
                    ) : (
                      <span className="text-gray-500">--</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
    </>
  )
}

export default PreviewFormData
