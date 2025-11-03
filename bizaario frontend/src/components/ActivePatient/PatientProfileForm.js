import React, { useEffect, useMemo, useState } from "react";
import PreviewFormData from "./PreviewFormData";
import PatientDetailsForm from "./PatientDetailsForm";

export default function PatientProfileForm({ initialData = {}, onNext, showPreview = true }) {

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    contactNumber: "",
    uhid: "",
    abha: "",
    insurer: "",
    policyNumber: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    referredByName: "",
    referredByNumber: "",
    nationality: "",
    patientPanel: "",
    state: "",
    city: "",
    zipCode: "",
    address: "",
    referralLetter: null,
  });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, ...initialData }));
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };
      

  return (
    <div className=" grid grid-cols-2 gap-4">
      <PatientDetailsForm handleChange={handleChange} formData={formData} onNext={onNext}/>
      <PreviewFormData formData={formData}/> 
    </div>
  );
}
