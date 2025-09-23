import React from 'react';
import { Plus, Edit } from 'lucide-react';

const VitalsPhysicalExaminations = () => {
  // Sample data for vitals and physical examinations
  const vitalsData = [
    {
      id: 1,
      parameterName: 'Fever',
      valueReadings: '96° F',
      abnormalitiesFound: 'Abnormalities Found'
    },
    {
      id: 2,
      parameterName: 'Cough',
      valueReadings: '96° F',
      abnormalitiesFound: 'Abnormalities Found'
    },
    {
      id: 3,
      parameterName: 'Fever',
      valueReadings: '96° F',
      abnormalitiesFound: 'Abnormalities Found'
    }
  ];

  return (
    <div className="space">
      {/* Header */}
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Vitals/ Physical Examinations
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
          <div className="grid grid-cols-3 gap-4 p-4">
            <div className="font-medium">Parameter Name</div>
            <div className="font-medium">Value/ Readings</div>
            <div className="font-medium">Abnormalities Found</div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200">
          {vitalsData.map((item, index) => (
            <div
              key={item.id}
              className={`grid grid-cols-3 gap-4 p-4 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                }`}
            >
              <div className="text-sm text-gray-900 font-medium">
                {item.parameterName}
              </div>
              <div className="text-sm text-gray-900">
                {item.valueReadings}
              </div>
              <div className="text-sm text-gray-900">
                {item.abnormalitiesFound}
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

export default VitalsPhysicalExaminations;
