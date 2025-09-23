import React from 'react';
import { Plus, Edit } from 'lucide-react';

const ClinicalFindings = () => {
  // Sample data for clinical findings
  const findingsData = [
    {
      id: 1,
      symptom: 'Cough',
      duration: '2 Months',
      severity: 5, // Scale of 1-10
      aggravatingFactor: 'Exposer to Sun'
    },
    {
      id: 2,
      symptom: 'Augmentin/Amoxicillin',
      duration: 'Improved',
      severity: 3,
      aggravatingFactor: 'Exposer to Sun'
    },
    {
      id: 3,
      symptom: 'Augmentin/Amoxicillin',
      duration: 'Improved',
      severity: 2,
      aggravatingFactor: 'Exposer to Sun'
    }
  ];

  // Function to render severity grade as color bars
  const renderSeverityGrade = (severity) => {
    const segments = [
      { color: 'bg-red-600', active: severity >= 1 },
      { color: 'bg-red-500', active: severity >= 2 },
      { color: 'bg-yellow-500', active: severity >= 3 },
      { color: 'bg-yellow-300', active: severity >= 4 },
      { color: 'bg-black', active: severity >= 5 }, // Black line indicator
      { color: 'bg-green-300', active: severity >= 6 },
      { color: 'bg-green-500', active: severity >= 7 },
      { color: 'bg-green-600', active: severity >= 8 },
    ];

    return (
      <div className="flex items-center space-x-1">
        {segments.map((segment, index) => (
          <div
            key={index}
            className={`h-6 ${index === 4 ? 'w-1' : 'w-8'} ${segment.active ? segment.color : 'bg-gray-200'
              } ${index === 4 ? 'rounded-none' : 'rounded-sm'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space">
      {/* Header */}
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Clinical Findings
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
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="bg-slate-600 text-white">
          <div className="grid grid-cols-4 gap-4 p-4">
            <div className="font-medium">Symptom</div>
            <div className="font-medium">Duration (Months)</div>
            <div className="font-medium">Severity Grade</div>
            <div className="font-medium">Aggravating Factor (s)</div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200">
          {findingsData.map((item, index) => (
            <div
              key={item.id}
              className={`grid grid-cols-4 gap-4 p-4 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                }`}
            >
              <div className="text-sm text-gray-900 font-medium">
                {item.symptom}
              </div>
              <div className="text-sm text-gray-900">
                {item.duration}
              </div>
              <div className="flex items-center">
                {renderSeverityGrade(item.severity)}
              </div>
              <div className="text-sm text-gray-900">
                {item.aggravatingFactor}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Note */}
      <div className="p-4 border-t border-gray-200">
        <p className="text-xs text-gray-600">
          1. Added By Dr Gaurav Pande (Cardiology) (Regards M1234), (Contact 8373915529, Date/ Time 20 Sep 2025, 11:57 AM IST, Noida
        </p>
      </div>
    </div>
  );
};

export default ClinicalFindings;
