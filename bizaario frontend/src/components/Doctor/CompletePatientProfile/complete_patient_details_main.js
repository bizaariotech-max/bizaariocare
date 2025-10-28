import React, {  useState } from 'react'
import Doctorheader from '../doctorheader';
import Doctorsidebar from '../doctorsidebar';

import { FaEye, FaEyeSlash } from "react-icons/fa";
import '../../Doctor/CompletePatientProfile/complete_patient_profile.css'
import PatientMaster from './completeProfileMainForm/patient-master';
import PatientReferral from './completeProfileMainForm/patient_referral';
import PatientProfilling from './completeProfileMainForm/patient_profilling';
import CommonHeader from '../../common/CommonHeader';


const CompletePatientDetails = () => {
 


// ==============================clinic details forms===========================================


const[isactive,setisactive]=useState("Patient Master")


const [showPreview, setShowPreview] = React.useState(false);

const [showDetails, setShowDetails] = useState(false);


// const get_full_doctor_details=()=>
// {

// }


  return (
    <>
      {/* <Doctorheader/> */}
      <CommonHeader/>

      <Doctorsidebar />
      <div className=" min-h-screen mt-2 px-2 sm:ml-0 sm:mr-0  md:ml-[5vw] md:mr-[2vw] lg:ml-[18.5vw] lg:mr-[1.5vw]">
        <h2
          className="mb-2 text-2xl font-semibold"
          style={{ fontFamily: "Lora" }}
        >
          Enter Details for Patient Profilling
        </h2>
        <p className="mb-6 text-gray-600" style={{ fontFamily: "Poppins" }}>
          Add or update the required details for the patient complete profilling
          to keep records accurate and complete.
        </p>

        <div className="grid grid-cols-12 gap-4" style={{ display: "block" }}>
          {/* Section 1 */}
          <div className="col-span-4 bg-white">
            <div className="flex items-center justify-between w-full gap-2 flex-nowrap">
              <h2 className="font-semibold text-xl font-[Lora] truncate">
                Patient's Profiling
              </h2>

              {/* <button
         onClick={() => setShowPreview(true)}
        className="
          flex items-center gap-[10px] 
          py-[11px] px-[22px] 
          rounded-[5px] border border-[#52677D]
          text-[#52677D] font-[Lora] text-[14px] font-medium leading-normal
        "
      >
        <FaEye className="text-[#52677D]" />
        <span>Preview</span>
      </button> */}
            </div>

            <div
              className="flex gap-2 mt-10 overflow-x-auto flex-nowrap sm:overflow-visible"
              style={{ cursor: "pointer" }}
            >
              {/*======================================== patient master================================== */}
              <div
                className="patient-tab"
                onClick={() => setisactive("Patient Master")}
                style={{
                  background:
                    isactive === "Patient Master"
                      ? "var(--div-background-active)"
                      : "var(--div-background-inactive)",
                }}
              >
                <span
                  className="patient-tab-details"
                  style={{
                    color:
                      isactive === "Patient Master"
                        ? "var(--white)"
                        : "var(--black)",
                  }}
                >
                  1
                </span>
                <p
                  style={{
                    margin: 0,
                    color:
                      isactive === "Patient Master"
                        ? "var(--white)"
                        : "var(--black)",
                    fontWeight: "600",
                    fontFamily: "Lora",
                    whiteSpace: "nowrap",
                  }}
                >
                  Patient Master
                </p>
              </div>

              {/* ================================= patient profiling ==============================================*/}
              <div
                className="patient-tab"
                onClick={() => setisactive("Patient Profilling")}
                style={{
                  background:
                    isactive === "Patient Profilling"
                      ? "var(--div-background-active)"
                      : "var(--div-background-inactive)",
                }}
              >
                <span
                  className="patient-tab-details"
                  style={{
                    color:
                      isactive === "Patient Profilling"
                        ? "var(--white)"
                        : "var(--black)",
                  }}
                >
                  2
                </span>
                <p
                  style={{
                    margin: 0,
                    color:
                      isactive === "Patient Profilling"
                        ? "var(--white)"
                        : "var(--black)",
                    fontWeight: "600",
                    fontFamily: "Lora",
                    whiteSpace: "nowrap",
                  }}
                >
                  Patient Profilling
                </p>
              </div>

              {/* =================================patient referral=== ======================================*/}
              <div
                className="patient-tab"
                onClick={() => setisactive("Patient Referral")}
                style={{
                  background:
                    isactive === "Patient Referral"
                      ? "var(--div-background-active)"
                      : "var(--div-background-inactive)",
                }}
              >
                <span
                  className="patient-tab-details"
                  style={{
                    color:
                      isactive === "Patient Referral"
                        ? "var(--white)"
                        : "var(--black)",
                  }}
                >
                  3
                </span>
                <p
                  style={{
                    margin: 0,
                    color:
                      isactive === "Patient Referral"
                        ? "var(--white)"
                        : "var(--black)",
                    fontWeight: "600",
                    fontFamily: "Lora",
                    whiteSpace: "nowrap",
                  }}
                >
                  Patient Referral
                </p>
              </div>
            </div>
          </div>
        </div>

        {/*============================= second form section ===========================================*/}

        <div className="flex gap-2 mt-10 overflow-x-auto flex-nowrap sm:overflow-visible">
          <div
            className="patient-sub-div"
            style={{
              display: isactive === "Patient Master" ? "flex" : "none",
            }}
          >
            <PatientMaster />
          </div>

          <div
            className="patient-sub-div"
            style={{
              display: isactive === "Patient Profilling" ? "flex" : "none",
            }}
          >
            <PatientProfilling />
          </div>

          <div
            className="patient-sub-div"
            style={{
              display: isactive === "Patient Referral" ? "flex" : "none",
            }}
          >
            <PatientReferral />
          </div>
        </div>
      </div>

      {/* Overlay (dim background) */}
      {showPreview && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={() => setShowPreview(false)}
        />
      )}

      {/* Off-canvas content */}
      <div
        className={`
    fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-50 shadow-lg
    transform transition-transform duration-300 ease-in-out
    ${showPreview ? "translate-x-0" : "translate-x-full"}
  `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold font-[Lora]">Preview</h2>
          <button onClick={() => setShowPreview(false)} className="text-xl">
            ×
          </button>
        </div>

        {/* Body with dropdowns */}
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-60px)]">
          {/* Example dropdowns */}
          <div className="w-full">
            {/* Clickable label */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex justify-between items-center w-full text-left text-sm  font-[Lora] text-[20px] py-2 px-3 border border-gray-300 rounded-md bg-[rgba(189,196,212,0.30)]"
            >
              Incorporative Details
              <span className="text-gray-500">{showDetails ? "▲" : "▼"}</span>
            </button>

            {/* Collapsible content */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                showDetails ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
              }`}
            >
              <div className="border border-gray-300 rounded-md p-3  bg-[rgba(189,196,212,0.30)]">
                {/* Your clinic details content here */}
                <p className="text-sm font-[Lora]">Clinic Name: XYZ Clinic</p>
                <p className="text-sm font-[Lora]">Address: 123 Main St</p>
                <p className="text-sm font-[Lora]">Timings: 9 AM - 5 PM</p>
                <p className="text-sm font-[Lora]">Contact: 9876543210</p>
              </div>
            </div>
          </div>

          {/* Example dropdowns */}
          <div className="w-full">
            {/* Clickable label */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex justify-between items-center w-full text-left text-sm  font-[Lora] text-[20px] py-2 px-3 border border-gray-300 rounded-md bg-[rgba(189,196,212,0.30)]"
            >
              Hospital Size
              <span className="text-gray-500">{showDetails ? "▲" : "▼"}</span>
            </button>

            {/* Collapsible content */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                showDetails ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
              }`}
            >
              <div className="border border-gray-300 rounded-md p-3  bg-[rgba(189,196,212,0.30)]">
                {/* Your clinic details content here */}
                <p className="text-sm font-[Lora]">Clinic Name: XYZ Clinic</p>
                <p className="text-sm font-[Lora]">Address: 123 Main St</p>
                <p className="text-sm font-[Lora]">Timings: 9 AM - 5 PM</p>
                <p className="text-sm font-[Lora]">Contact: 9876543210</p>
              </div>
            </div>
          </div>

          <div className="w-full">
            {/* Clickable label */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex justify-between items-center w-full text-left text-sm  font-[Lora] text-[20px] py-2 px-3 border border-gray-300 rounded-md bg-[rgba(189,196,212,0.30)]"
            >
              Address
              <span className="text-gray-500">{showDetails ? "▲" : "▼"}</span>
            </button>

            {/* Collapsible content */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                showDetails ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
              }`}
            >
              <div className="border border-gray-300 rounded-md p-3  bg-[rgba(189,196,212,0.30)]">
                {/* Your clinic details content here */}
                <p className="text-sm font-[Lora]">Clinic Name: XYZ Clinic</p>
                <p className="text-sm font-[Lora]">Address: 123 Main St</p>
                <p className="text-sm font-[Lora]">Timings: 9 AM - 5 PM</p>
                <p className="text-sm font-[Lora]">Contact: 9876543210</p>
              </div>
            </div>
          </div>

          <div className="w-full">
            {/* Clickable label */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex justify-between items-center w-full text-left text-sm  font-[Lora] text-[20px] py-2 px-3 border border-gray-300 rounded-md bg-[rgba(189,196,212,0.30)]"
            >
              Assets Profile
              <span className="text-gray-500">{showDetails ? "▲" : "▼"}</span>
            </button>

            {/* Collapsible content */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                showDetails ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
              }`}
            >
              <div className="border border-gray-300 rounded-md p-3  bg-[rgba(189,196,212,0.30)]">
                {/* Your clinic details content here */}
                <p className="text-sm font-[Lora]">Clinic Name: XYZ Clinic</p>
                <p className="text-sm font-[Lora]">Address: 123 Main St</p>
                <p className="text-sm font-[Lora]">Timings: 9 AM - 5 PM</p>
                <p className="text-sm font-[Lora]">Contact: 9876543210</p>
              </div>
            </div>
          </div>

          <div className="w-full">
            {/* Clickable label */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex justify-between items-center w-full text-left text-sm  font-[Lora] text-[20px] py-2 px-3 border border-gray-300 rounded-md bg-[rgba(189,196,212,0.30)]"
            >
              Social Media Assets
              <span className="text-gray-500">{showDetails ? "▲" : "▼"}</span>
            </button>

            {/* Collapsible content */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                showDetails ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
              }`}
            >
              <div className="border border-gray-300 rounded-md p-3  bg-[rgba(189,196,212,0.30)]">
                {/* Your clinic details content here */}
                <p className="text-sm font-[Lora]">Clinic Name: XYZ Clinic</p>
                <p className="text-sm font-[Lora]">Address: 123 Main St</p>
                <p className="text-sm font-[Lora]">Timings: 9 AM - 5 PM</p>
                <p className="text-sm font-[Lora]">Contact: 9876543210</p>
              </div>
            </div>
          </div>

          <div className="w-full">
            {/* Clickable label */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex justify-between items-center w-full text-left text-sm  font-[Lora] text-[20px] py-2 px-3 border border-gray-300 rounded-md bg-[rgba(189,196,212,0.30)]"
            >
              Contact Details
              <span className="text-gray-500">{showDetails ? "▲" : "▼"}</span>
            </button>

            {/* Collapsible content */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                showDetails ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
              }`}
            >
              <div className="border border-gray-300 rounded-md p-3  bg-[rgba(189,196,212,0.30)]">
                {/* Your clinic details content here */}
                <p className="text-sm font-[Lora]">Clinic Name: XYZ Clinic</p>
                <p className="text-sm font-[Lora]">Address: 123 Main St</p>
                <p className="text-sm font-[Lora]">Timings: 9 AM - 5 PM</p>
                <p className="text-sm font-[Lora]">Contact: 9876543210</p>
              </div>
            </div>
          </div>

          <div className="w-full">
            {/* Clickable label */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex justify-between items-center w-full text-left text-sm  font-[Lora] text-[20px] py-2 px-3 border border-gray-300 rounded-md bg-[rgba(189,196,212,0.30)]"
            >
              Medical Specialties
              <span className="text-gray-500">{showDetails ? "▲" : "▼"}</span>
            </button>

            {/* Collapsible content */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                showDetails ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
              }`}
            >
              <div className="border border-gray-300 rounded-md p-3  bg-[rgba(189,196,212,0.30)]">
                {/* Your clinic details content here */}
                <p className="text-sm font-[Lora]">Clinic Name: XYZ Clinic</p>
                <p className="text-sm font-[Lora]">Address: 123 Main St</p>
                <p className="text-sm font-[Lora]">Timings: 9 AM - 5 PM</p>
                <p className="text-sm font-[Lora]">Contact: 9876543210</p>
              </div>
            </div>
          </div>

          <div className="w-full">
            {/* Clickable label */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex justify-between items-center w-full text-left text-sm  font-[Lora] text-[20px] py-2 px-3 border border-gray-300 rounded-md bg-[rgba(189,196,212,0.30)]"
            >
              Treatment Package
              <span className="text-gray-500">{showDetails ? "▲" : "▼"}</span>
            </button>

            {/* Collapsible content */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                showDetails ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
              }`}
            >
              <div className="border border-gray-300 rounded-md p-3  bg-[rgba(189,196,212,0.30)]">
                {/* Your clinic details content here */}
                <p className="text-sm font-[Lora]">Clinic Name: XYZ Clinic</p>
                <p className="text-sm font-[Lora]">Address: 123 Main St</p>
                <p className="text-sm font-[Lora]">Timings: 9 AM - 5 PM</p>
                <p className="text-sm font-[Lora]">Contact: 9876543210</p>
              </div>
            </div>
          </div>

          <div className="w-full">
            {/* Clickable label */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex justify-between items-center w-full text-left text-sm  font-[Lora] text-[20px] py-2 px-3 border border-gray-300 rounded-md bg-[rgba(189,196,212,0.30)]"
            >
              Fee & Charge
              <span className="text-gray-500">{showDetails ? "▲" : "▼"}</span>
            </button>

            {/* Collapsible content */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                showDetails ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
              }`}
            >
              <div className="border border-gray-300 rounded-md p-3  bg-[rgba(189,196,212,0.30)]">
                {/* Your clinic details content here */}
                <p className="text-sm font-[Lora]">Clinic Name: XYZ Clinic</p>
                <p className="text-sm font-[Lora]">Address: 123 Main St</p>
                <p className="text-sm font-[Lora]">Timings: 9 AM - 5 PM</p>
                <p className="text-sm font-[Lora]">Contact: 9876543210</p>
              </div>
            </div>
          </div>

          <div className="w-full">
            {/* Clickable label */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex justify-between items-center w-full text-left text-sm  font-[Lora] text-[20px] py-2 px-3 border border-gray-300 rounded-md bg-[rgba(189,196,212,0.30)]"
            >
              Bank Details
              <span className="text-gray-500">{showDetails ? "▲" : "▼"}</span>
            </button>

            {/* Collapsible content */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                showDetails ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
              }`}
            >
              <div className="border border-gray-300 rounded-md p-3  bg-[rgba(189,196,212,0.30)]">
                {/* Your clinic details content here */}
                <p className="text-sm font-[Lora]">Clinic Name: XYZ Clinic</p>
                <p className="text-sm font-[Lora]">Address: 123 Main St</p>
                <p className="text-sm font-[Lora]">Timings: 9 AM - 5 PM</p>
                <p className="text-sm font-[Lora]">Contact: 9876543210</p>
              </div>
            </div>
          </div>

          <div className="w-full">
            {/* Clickable label */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex justify-between items-center w-full text-left text-sm  font-[Lora] text-[20px] py-2 px-3 border border-gray-300 rounded-md bg-[rgba(189,196,212,0.30)]"
            >
              OPD Schedule
              <span className="text-gray-500">{showDetails ? "▲" : "▼"}</span>
            </button>

            {/* Collapsible content */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                showDetails ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
              }`}
            >
              <div className="border border-gray-300 rounded-md p-3  bg-[rgba(189,196,212,0.30)]">
                {/* Your clinic details content here */}
                <p className="text-sm font-[Lora]">Clinic Name: XYZ Clinic</p>
                <p className="text-sm font-[Lora]">Address: 123 Main St</p>
                <p className="text-sm font-[Lora]">Timings: 9 AM - 5 PM</p>
                <p className="text-sm font-[Lora]">Contact: 9876543210</p>
              </div>
            </div>
          </div>

          <div className="w-full">
            {/* Clickable label */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex justify-between items-center w-full text-left text-sm  font-[Lora] text-[20px] py-2 px-3 border border-gray-300 rounded-md bg-[rgba(189,196,212,0.30)]"
            >
              Online Clinic
              <span className="text-gray-500">{showDetails ? "▲" : "▼"}</span>
            </button>

            {/* Collapsible content */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                showDetails ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
              }`}
            >
              <div className="border border-gray-300 rounded-md p-3  bg-[rgba(189,196,212,0.30)]">
                {/* Your clinic details content here */}
                <p className="text-sm font-[Lora]">Clinic Name: XYZ Clinic</p>
                <p className="text-sm font-[Lora]">Address: 123 Main St</p>
                <p className="text-sm font-[Lora]">Timings: 9 AM - 5 PM</p>
                <p className="text-sm font-[Lora]">Contact: 9876543210</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CompletePatientDetails
