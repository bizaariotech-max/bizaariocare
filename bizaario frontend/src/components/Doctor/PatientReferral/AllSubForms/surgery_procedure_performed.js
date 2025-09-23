
import React from 'react';
import { Plus, Edit } from 'lucide-react';
import healthicon from '../AllSubForms/assets/images/view health assessment report icon.png';
const SurgeryProcedurePerformed = () => {

  // Sample data for the complaints
  const complaintsData = [
    {
      id: 1,
      complaint: 'Cough',
      duration: '2 Months',
      severity: 5, // Scale of 1-10
      aggravatingFactor: 'Exposer to Sun'
    },
    {
      id: 2,
      complaint: 'Augmentin/Amoxicillin',
      duration: 'Improved',
      severity: 3,
      aggravatingFactor: 'Exposer to Sun'
    },
    {
      id: 3,
      complaint: 'Augmentin/Amoxicillin',
      duration: 'Improved',
      severity: 2,
      aggravatingFactor: 'Exposer to Sun'
    }
  ];

  // Function to render severity grade as color bars
  const renderSeverityGrade = (severity) => {
    const segments = [
      { color: 'bg-red-600', active: severity >= 1 },

      { color: 'bg-[#ffc001]', active: severity >= 2 },
      { color: 'bg-[#feff99]', active: severity >= 3 },
      { color: 'bg-[#92d14f]', active: severity >= 4 },
      { color: 'bg-[#107c42]', active: severity >= 5 },


    ];
    return (
      <div className="flex items-center space-x-1">
        {segments.map((segment, index) => (
          <div
            key={index}
            className={`h-6 ${index === 4 ? 'w-8' : 'w-8'} ${segment.active ? segment.color : 'bg-gray-200'
              } ${index === 4 ? 'rounded-none' : 'rounded-sm'}`}
          />
        ))}
      </div>
    );
  };
  return (
    <div className="space mt-4">

  


      {/* Header */}
      <div className="flex items-center justify-between mt-2  border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">
          Surgery/Procedure Performed
        </h2>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 text-[var(--primary-color)] hover:text-blue-700 transition-colors">
            <span className="text-sm font-medium underline">Add</span>
            <Plus className="w-4 h-4" />
          </button>
          <button className="flex items-center space-x-2 text-[var(--primary-color)] hover:text-blue-700 transition-colors">
            <Edit className="w-4 h-4" />
            <span className="text-sm font-medium underline">Edit</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {/* Table Header */}
        <div className="bg-[var(--button-back-color)] text-white  " >
          <div className="grid grid-cols-2 gap-4 p-2 text-[20px]">
            <h3 className="table-header">Surgery/Procedure Name</h3>
            <h3 className="table-header">Clinical Outcome/Patient's Response</h3>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200">
          {complaintsData.map((item, index) => (
            <div
              key={item.id}
              className={`grid grid-cols-2 gap-4 p-4 ${index % 2 === 0 ? 'bg-[#f2f3f6]' : 'bg-white'
                }`}
            >
              <div className="text-sm text-gray-900 font-medium">
                {item.complaint}
              </div>
              <div className="text-sm text-gray-900">
                {item.duration}
              </div>
             
              
            </div>
          ))}
        </div>
      </div>

      {/* Footer Note */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <p className="text-xs text-gray-600">
          1. Added By Dr Gaurav Pande (Cardiology) (Regards M1234), (Contact 8373915529, Date/ Time 20 Sep 2025, 11:57 AM IST, Noida
        </p>
        <h4>By Doctor malik</h4>
        <p>Seniour Cardiologist,Apollo Hospitals</p>
        <h3 className='text-[24px]'>Reason/Purposed</h3>
        <p className='bg-[rgba(189,196,212,0.2)] p-3 rounded'>
            Following your recent consultation, I have prescribed [specific medications(s),dosage,and
            duration,e.g,Amoxicillin 500 mg,twice daily]
        </p>
        <div className='bg-[rgba(189,196,212,0.2)] p-3 rounded text-[24px]'>
        <p>
            Anesthesia - <span style={{fontWeight:"bold"}}>General</span>
        </p>
         <p>
            Blood Transfusion Required - <span style={{fontWeight:"bold"}}>Yes</span>
        </p>
         <p>
            Complications - <span style={{fontWeight:"bold"}}>If any</span>
        </p>
        </div>

      </div>
    </div>
  );
}

export default SurgeryProcedurePerformed

