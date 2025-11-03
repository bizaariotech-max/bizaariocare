import React from 'react';
import { Plus, Edit } from 'lucide-react';

const CurrentMedicines = () => {
  // Sample data for the medicines
  const medicinesData = [
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
      {/* Header */}
      <div className="flex items-center justify-between mt-2 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">
          Current Medicines
        </h2>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
            <span className="text-sm font-medium underline">Add</span>
            <Plus className="w-4 h-4" />
          </button>
          <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
            <Edit className="w-4 h-4" />
            <span className="text-sm font-medium underline">Edit</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {/* Table Header */}
        <div className="bg-slate-600 text-white">
          <div className="grid grid-cols-3 gap-4 p-2">
            <h3 className="table-header">Medicine/Salt Name</h3>
            <h3 className="table-header">Dosage</h3>
            <h3 className="table-header">Frequency</h3>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200">
          {medicinesData.map((item, index) => (
            <div
              key={item.id}
              className={`grid grid-cols-3 gap-4 p-4 ${!(index % 2 === 0) ? 'bg-[#f2f3f6]' : 'bg-white'
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
  );
};

export default CurrentMedicines;
