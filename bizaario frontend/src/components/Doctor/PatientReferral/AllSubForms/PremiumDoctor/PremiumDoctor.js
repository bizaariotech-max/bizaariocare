import React, { useState } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from '@mui/material';
import DoctorProfileCard from '../../AllSubForms/UI/DoctorProfileCard';
// import PremiumDoctorIcon from "../../../../../assets/images/icons/PremiumDoctor.png";
import { ChevronDown, Stethoscope, Globe, MapPin, Briefcase, Video, Calendar } from 'lucide-react';
import { FormControl, InputLabel, Select, MenuItem, OutlinedInput, } from '@mui/material';
import PremiumDoctorCarousel from './PremiumDoctorCarousel';
import { customMenuProps } from '../../../../../utils/mui_select_scroll_bar';
import Doctorsidebar from '../../../doctorsidebar';
import Doctorheader from '../../../doctorheader';
import { IoMdArrowForward } from "react-icons/io";
import Checkbox from '@mui/material/Checkbox';
import { MdOutlineNotificationsActive } from "react-icons/md";

const PremiumDoctor = () => {

  const [medicalSpecialty, setMedicalSpecialty] = useState('');
  const [country, setCountry] = useState('');
  const [medicalOpen, setMedicalOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const medicalSpecialties = [
    'Cardiology',
    'Dermatology',
    'Emergency Medicine',
    'Family Medicine',
    'Gastroenterology',
    'General Surgery',
    'Internal Medicine',
    'Neurology',
    'Obstetrics & Gynecology',
    'Oncology',
    'Ophthalmology',
    'Orthopedics',
    'Pediatrics',
    'Psychiatry',
    'Radiology',
    'Urology'
  ];

  const countries = [
    'United States',
    'Canada',
    'United Kingdom',
    'Germany',
    'France',
    'Australia',
    'Japan',
    'South Korea',
    'Singapore',
    'Netherlands',
    'Sweden',
    'Switzerland',
    'India',
    'Brazil',
    'Mexico'
  ];

  const VisionHealthData = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
  ]

  const selectStyle = {
    position: 'relative',
    minWidth: '280px'
  };

  const selectButtonStyle = {
    width: '100%',
    padding: '16px',
    paddingRight: '48px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    backgroundColor: 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '16px',
    color: '#666',
    outline: 'none',
    transition: 'all 0.2s ease',
    textAlign: 'left'
  };

  const selectButtonHoverStyle = {
    ...selectButtonStyle,
    borderColor: '#1976d2'
  };

  const dropdownStyle = {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    maxHeight: '200px',
    overflowY: 'auto'
  };

  const optionStyle = {
    padding: '12px 16px',
    cursor: 'pointer',
    borderBottom: '1px solid #f5f5f5',
    transition: 'background-color 0.2s ease'
  };

  const chevronStyle = {
    position: 'absolute',
    right: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    transition: 'transform 0.2s ease',
    pointerEvents: 'none'
  };

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 2, partialVisibilityGutter: 60 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 2, partialVisibilityGutter: 60 },
    tablet: { breakpoint: { max: 1024, min: 767 }, items: 2 },
    mobile: { breakpoint: { max: 767, min: 0 }, items: 1 },
  };
  // ============updted=fields==============
  const doctorCardButtons = [
    { id: 1, label: "Video Consultation", value: 1000 },
    { id: 2, label: "Second Opinion", value: 2000 },
    { id: 3, label: "Treatment Booking", value: 3000 },
    { id: 4, label: "Emergency Response", value: 4000 }
  ];


  return (
    <>
      <Doctorheader />
      <div className="layout">
        <Doctorsidebar />
        <div className="content-wrapper px-4">
          <div className="space">
            <div className="w-full ">
              {/* Amount Payable */}
              <div className='flex justify-between mb-4 items-center'>
                <div className="">
                  <p className="bg-gray-200 px-4 py-2 rounded-md font-semibold inline-block mb-0">
                    Amount Payables : <span className="font-bold">ETB20,000</span>
                  </p>
                </div>
                <div>
                  <div className="flex flex-col sm:flex-row justify-end gap-4">
                    <button className="text-[20px] border border-[var(--primary-color)] text-[var(--primary-color)] rounded-md px-6 py-3 min-w-[150px] hover:bg-gray-100 transition">
                      Back
                    </button>
                    <button className="text-[20px] bg-[var(--primary-color)] text-white rounded-md px-6 py-3 min-w-[150px] hover:bg-gray-800 transition">
                      Submit
                    </button>
                  </div>
                </div>
              </div>

              {/* Dropdowns */}
              <div className="flex  gap-4 mb-4">
                <div style={selectStyle}>
                  <div
                    style={medicalOpen ? selectButtonHoverStyle : selectButtonStyle}
                    onClick={() => setMedicalOpen(!medicalOpen)}
                    onMouseEnter={(e) => e.target.style.borderColor = '#1976d2'}
                    onMouseLeave={(e) => !medicalOpen && (e.target.style.borderColor = '#e0e0e0')}
                  >
                    <Stethoscope size={18} />
                    <span style={{ color: medicalSpecialty ? '#333' : '#666' }}>
                      {medicalSpecialty || 'Select Medical Specialty (req)'}
                    </span>
                    <ChevronDown
                      size={20}
                      style={{
                        ...chevronStyle,
                        transform: medicalOpen ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%)'
                      }}
                    />
                  </div>

                  {medicalOpen && (
                    <div style={dropdownStyle}>
                      {medicalSpecialties.map((specialty) => (
                        <div
                          key={specialty}
                          style={optionStyle}
                          onClick={() => {
                            setMedicalSpecialty(specialty);
                            setMedicalOpen(false);
                          }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        >
                          {specialty}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Country Select */}
                <div style={{ ...selectStyle, minWidth: '200px' }}>
                  <div
                    style={countryOpen ? selectButtonHoverStyle : selectButtonStyle}
                    onClick={() => setCountryOpen(!countryOpen)}
                    onMouseEnter={(e) => e.target.style.borderColor = '#1976d2'}
                    onMouseLeave={(e) => !countryOpen && (e.target.style.borderColor = '#e0e0e0')}
                  >
                    <Globe size={18} />
                    <span style={{ color: country ? '#333' : '#666' }}>
                      {country || 'Select Country'}
                    </span>
                    <ChevronDown
                      size={20}
                      style={{
                        ...chevronStyle,
                        transform: countryOpen ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%)'
                      }}
                    />
                  </div>

                  {countryOpen && (
                    <div style={dropdownStyle}>
                      {countries.map((countryName) => (
                        <div
                          key={countryName}
                          style={optionStyle}
                          onClick={() => {
                            setCountry(countryName);
                            setCountryOpen(false);
                          }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        >
                          {countryName}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Buttons */}

            </div>

            <div className="p-4 bg-[#dce1e5] rounded-xl">
              <div className=' flex gap-3 items-center mb-3'>
                {/* <img src={PremiumDoctorIcon} alt={PremiumDoctorIcon} /> */}
                <h2 className="text-4xl font-bold text-[var(--primary-color)] ">
                  Premium Doctor
                </h2>
              </div>
              <Carousel
                arrows={false}
                responsive={responsive}
                containerClass="carousel-container"
                itemClass="px-2 pt-4"
                infinite
                partialVisible
              >
                {VisionHealthData.map((element) => (
                  <div key={element.id}>
                    <DoctorProfileCard  />
                  </div>
                ))}
              </Carousel>
            </div>

            {/* ===============others-doctors-listing=========== */}
            <div className='space' >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {VisionHealthData.map((element) => (
                  <div key={element.id}>
                    <DoctorProfileCard />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default PremiumDoctor;


