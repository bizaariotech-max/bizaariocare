import React from 'react';
import { Plus, Edit } from 'lucide-react';

const TreatmentToDate = () => {
  // Sample data for medications
  const medicationsData = [
    {
      id: 1,
      medicineName: 'Augmentin/Amoxicillin',
      dosage: '500 mg',
      frequency: 'Thrice daily'
    },
    {
      id: 2,
      medicineName: 'Augmentin/Amoxicillin',
      dosage: '500 mg',
      frequency: 'Thrice daily'
    },
    {
      id: 3,
      medicineName: 'Augmentin/Amoxicillin',
      dosage: '500 mg',
      frequency: 'Thrice daily'
    }
  ];

  return (
    <div className="space">
      {/* Main Header */}
      <div className="pb-6">
        <h2 className="text-4xl font-bold">
          Treatment To Date
        </h2>
      </div>

      {/* Medications Section */}
      <div className="space-y-4">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Medications
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

        {/* Medications Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="bg-slate-600 text-white">
            <div className="grid grid-cols-3 gap-4 p-4">
              <div className="font-medium">Medicine/Salt Name</div>
              <div className="font-medium">Dosage</div>
              <div className="font-medium">Frequency</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {medicationsData.map((item, index) => (
              <div
                key={item.id}
                className={`grid grid-cols-3 gap-4 p-4 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  }`}
              >
                <div className="text-sm text-gray-900 font-medium">
                  {item.medicineName}
                </div>
                <div className="text-sm text-gray-900">
                  {item.dosage}
                </div>
                <div className="text-sm text-gray-900">
                  {item.frequency}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentToDate;
