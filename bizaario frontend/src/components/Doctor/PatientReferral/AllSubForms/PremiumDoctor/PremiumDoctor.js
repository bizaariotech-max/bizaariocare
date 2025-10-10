import React, { useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Stethoscope, Globe, ChevronDown } from 'lucide-react';
import DoctorProfileCard from '../../AllSubForms/UI/DoctorProfileCard';

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
    'Urology',
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
    'Mexico',
  ];

  const VisionHealthData = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

  // Dropdown styling
  const selectStyle = { position: 'relative', minWidth: '250px' };
  const selectButtonStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    backgroundColor: 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '15px',
    color: '#666',
    justifyContent: 'space-between',
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
    overflowY: 'auto',
  };

  const optionStyle = {
    padding: '10px 14px',
    cursor: 'pointer',
    borderBottom: '1px solid #f5f5f5',
  };

  // Carousel settings
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 1, partialVisibilityGutter: 40 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1, partialVisibilityGutter: 30 },
    tablet: { breakpoint: { max: 1024, min: 768 }, items: 1 },
    mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-sm">
      {/* Dropdown Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Medical Specialty */}
        <div style={selectStyle}>
          <div
            style={selectButtonStyle}
            onClick={() => {
              setMedicalOpen(!medicalOpen);
              setCountryOpen(false);
            }}
          >
            <div className="flex items-center gap-2">
              <Stethoscope size={18} />
              <span style={{ color: medicalSpecialty ? '#333' : '#666' }}>
                {medicalSpecialty || 'Select Medical Specialty'}
              </span>
            </div>
            <ChevronDown
              size={18}
              style={{
                transform: medicalOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
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
                  onMouseEnter={(e) => (e.target.style.backgroundColor = '#f5f5f5')}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = 'white')}
                >
                  {specialty}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Country */}
        <div style={selectStyle}>
          <div
            style={selectButtonStyle}
            onClick={() => {
              setCountryOpen(!countryOpen);
              setMedicalOpen(false);
            }}
          >
            <div className="flex items-center gap-2">
              <Globe size={18} />
              <span style={{ color: country ? '#333' : '#666' }}>
                {country || 'Select Country'}
              </span>
            </div>
            <ChevronDown
              size={18}
              style={{
                transform: countryOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
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
                  onMouseEnter={(e) => (e.target.style.backgroundColor = '#f5f5f5')}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = 'white')}
                >
                  {countryName}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Premium Doctor Section */}
      <div className="bg-[#dce1e5] p-4 rounded-xl mb-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-3">Premium Doctor</h2>
        <Carousel
          arrows={false}
          responsive={responsive}
          containerClass="carousel-container"
          itemClass="px-2 pt-2"
          infinite
          partialVisible
        >
          {VisionHealthData.map((element) => (
            <div key={element.id}>
              <DoctorProfileCard />
            </div>
          ))}
        </Carousel>
      </div>

      {/* Other Doctors List */}
      {/* <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Other Recommended Doctors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {VisionHealthData.map((element) => (
            <div key={element.id}>
              <DoctorProfileCard />
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default PremiumDoctor;
