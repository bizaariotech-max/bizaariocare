import React, { useEffect } from 'react';
import { useState } from 'react';
import api from '../../../../../api'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import DoctorProfileCard from '../../AllSubForms/UI/DoctorProfileCard';
import { Stethoscope, Globe, ChevronDown } from 'lucide-react';

const PremiumDoctor = ({ patientReferral, setPatientReferral }) => {
  const [medicalSpecialty, setMedicalSpecialty] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [medicalOpen, setMedicalOpen] = React.useState(false);
  const [countryOpen, setCountryOpen] = React.useState(false);

  const medicalSpecialties = ['Cardiology', 'Dermatology', 'Neurology', 'Oncology'];
  const countries = ['United States', 'India', 'Germany', 'France'];

   const [doctorArr, setDoctorArr] = useState([]);
  
    const getDoctorProfile = async () => {
      try {
        const resp = await api.post("api/v1/admin/assetList", {
          AssetCategoryLevel1: "68b0104063729ea39b28d0fb",
        });
  
        const formattedData = resp.data.data.list.map((doc, index) => ({
          id: doc._id || index + 1,
          name: doc.AssetName,
          // exp: `${
          //   (doc.MedicalSpecialties || []).map((item) => item.lookup_value).join(", ")
          // } | ${doc.experience || 0} Years Experience`,
            exp: `${
            doc.MedicalSpecialties[0].lookup_value} | ${doc.experience || 5} Years Experience`,
          location: `${doc.AddressLine1} ${doc.AddressLine2}${doc.PostalCode}` || "",
          Specializes: `${
            (doc.MedicalSpecialties || []).map((item) => item.lookup_value).join(", ")
          } `,
          image: doc.ProfilePicture || null,
        }));
  
        setDoctorArr(formattedData);
      } catch (error) {
        console.error("Error fetching doctor profile:", error);
      }
    };

    useEffect(()=>
    {
      getDoctorProfile()

    },[])



  const VisionHealthData = [
    { _id: 'doc1', AssetName: 'Dr. Dominic Stonehart', ProfilePicture: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54', Qualification: 'MBBS, MD, Ms', Specialization: 'Cardiologist', Experience: 20 },
    { _id: 'doc2', AssetName: 'Dr. Jane Doe', ProfilePicture: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e', Qualification: 'MBBS, MD', Specialization: 'Neurologist', Experience: 15 },
    { _id: 'doc3', AssetName: 'Dr. John Smith', ProfilePicture: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e', Qualification: 'MBBS', Specialization: 'Dermatologist', Experience: 10 },
  ];

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 1 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 768 }, items: 1 },
    mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
  };

  const selectedDoctors = patientReferral.ReferredDoctors || [];
  const setSelectedDoctors = (ids) => {
    setPatientReferral((prev) => ({ ...prev, ReferredDoctors: ids }));
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-sm">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative">
          <div className="border p-2 rounded-md flex justify-between items-center cursor-pointer" onClick={() => { setMedicalOpen(!medicalOpen); setCountryOpen(false); }}>
            <Stethoscope size={18} /> <span>{medicalSpecialty || 'Select Medical Specialty'}</span>
            <ChevronDown size={18} style={{ transform: medicalOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
          </div>
          {medicalOpen && (
            <div className="absolute z-10 bg-white border w-full mt-1 rounded-md">
              {medicalSpecialties.map((s) => (
                <div key={s} className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => { setMedicalSpecialty(s); setMedicalOpen(false); }}>{s}</div>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <div className="border p-2 rounded-md flex justify-between items-center cursor-pointer" onClick={() => { setCountryOpen(!countryOpen); setMedicalOpen(false); }}>
            <Globe size={18} /> <span>{country || 'Select Country'}</span>
            <ChevronDown size={18} style={{ transform: countryOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
          </div>
          {countryOpen && (
            <div className="absolute z-10 bg-white border w-full mt-1 rounded-md">
              {countries.map((c) => (
                <div key={c} className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => { setCountry(c); setCountryOpen(false); }}>{c}</div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Premium Doctor Carousel */}
      <div className="bg-[#dce1e5] p-4 rounded-xl">
        <h2 className="text-2xl font-bold text-blue-600 mb-3">Premium Doctor</h2>
        <Carousel
          arrows={false}
          responsive={responsive}
          containerClass="carousel-container"
          itemClass="px-2 pt-2"
          infinite
          partialVisible
        >
          {doctorArr.map((doctor) => (
            <DoctorProfileCard
              key={doctor._id}
              doctor={doctor}
              selectedDoctors={selectedDoctors}
              setSelectedDoctors={setSelectedDoctors}
            />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default PremiumDoctor;
