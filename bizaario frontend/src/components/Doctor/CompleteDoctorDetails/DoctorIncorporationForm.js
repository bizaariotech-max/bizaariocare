import React, { useEffect, useMemo, useState } from "react";
import PreviewIncorporationDetails from "./PreviewIncorporationDetails";
import DoctorIncorporationDetails from "./DoctorIncorporationDetails";

export default function DoctorIncorporationForm({ initialData = {}, onNext, showPreview = true }) {

  const [incorporationdetails, setincorporationdetails] = useState({
    RegistrationBody: "",
    RegistrationCertificate: "",
    RegistrationYear: "",
    RegistrationNumber: "",
    ValidityExpiry: "",
    
  });

  // useEffect(() => {
  //   setFormData((prev) => ({ ...prev, ...initialData }));
  // }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setincorporationdetails({
      ...incorporationdetails,
      [name]: files ? files[0] : value,
    });
  };
      

  return (
    <div className=" grid grid-cols-2 gap-4">
      <DoctorIncorporationDetails handleChange={handleChange} formData={incorporationdetails} onNext={onNext}/>
      <PreviewIncorporationDetails incorporationdetails={incorporationdetails}/> 
    </div>
  );
}
