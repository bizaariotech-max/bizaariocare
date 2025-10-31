import React from 'react';
import { Plus, Edit } from 'lucide-react';

const OccupationalProfile = () => {
  // Sample data for occupational and lifestyle information
  const profileData = {
    occupationalProfile: ['Government Employee'],
    familyHistory: ['Heart Disease / Heart Attack', 'Hypertension (High Blood Pressure)', 'Thyroid Disorder'],
    habitsLifestyles: ['Road accident - leg fracture', 'Head injury (mild)']
  };

  const renderTagSection = (title, items) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        {title}
      </h3>
      <div className="">
        <div className="flex flex-wrap gap-2">
          {items.map((item, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-[#e2e4f4] text-sm rounded-md"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space">
      {/* Header */}
      <div className="flex items-center justify-end pb-4">
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

      {/* Content */}
      <div className="space-y-6">
        {/* Occupational Profile */}
        {renderTagSection('Occupational Profile', profileData.occupationalProfile)}

        {/* Family History */}
        {renderTagSection('Family History', profileData.familyHistory)}

        {/* Habits & Lifestyles */}
        {renderTagSection('Habits & Lifestyles', profileData.habitsLifestyles)}
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

export default OccupationalProfile;
