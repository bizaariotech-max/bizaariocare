import React, { useState } from 'react';
import { Plus, Edit, Check } from 'lucide-react';

const ImmunizationProfile = () => {
  // State for immunization data
  const [immunizations, setImmunizations] = useState([
    {
      id: 1,
      vaccineName: 'Vaccine 01',
      status: 'Complete',
      age: 21,
      doctorName: 'Dr. Name 1',
      date: '12/12/2025'
    },
    {
      id: 2,
      vaccineName: 'Vaccine 02',
      status: 'Complete',
      age: 21,
      doctorName: 'Dr. Name 2',
      date: '12/12/2025'
    },
    {
      id: 3,
      vaccineName: 'Vaccine 03',
      status: 'Complete',
      age: 21,
      doctorName: 'Dr. Name 3',
      date: '12/12/2025'
    }
  ]);

  const [newVaccine, setNewVaccine] = useState({
    vaccineName: '',
    status: 'Complete',
    age: '',
    doctorName: '',
    date: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Calculate completion percentage
  const completionPercentage = Math.round(
    (immunizations.filter(vaccine => vaccine.status === 'Complete').length / immunizations.length) * 100
  );

  // Add new vaccine
  const handleAddVaccine = () => {
    if (newVaccine.vaccineName && newVaccine.age && newVaccine.doctorName && newVaccine.date) {
      const vaccine = {
        id: Date.now(),
        ...newVaccine,
        age: parseInt(newVaccine.age)
      };
      setImmunizations([...immunizations, vaccine]);
      setNewVaccine({
        vaccineName: '',
        status: 'Complete',
        age: '',
        doctorName: '',
        date: ''
      });
    }
  };

  // Edit vaccine
  const handleEditVaccine = (id) => {
    const vaccine = immunizations.find(v => v.id === id);
    setNewVaccine(vaccine);
    setEditingId(id);
    setIsEditing(true);
  };

  // Update vaccine
  const handleUpdateVaccine = () => {
    setImmunizations(immunizations.map(vaccine =>
      vaccine.id === editingId
        ? { ...newVaccine, id: editingId, age: parseInt(newVaccine.age) }
        : vaccine
    ));
    setNewVaccine({
      vaccineName: '',
      status: 'Complete',
      age: '',
      doctorName: '',
      date: ''
    });
    setIsEditing(false);
    setEditingId(null);
  };

  // Delete vaccine
  const handleDeleteVaccine = (id) => {
    setImmunizations(immunizations.filter(vaccine => vaccine.id !== id));
  };

  // Toggle vaccine status
  const toggleStatus = (id) => {
    setImmunizations(immunizations.map(vaccine =>
      vaccine.id === id
        ? { ...vaccine, status: vaccine.status === 'Complete' ? 'Pending' : 'Complete' }
        : vaccine
    ));
  };

  return (
    <div className="space">
      {/* Header */}
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Immunization Profile
        </h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 text-[var(--primary-color)] hover:text-blue-700 transition-colors"
          >
            <span className="text-sm font-medium underline">Add</span>
            <Plus className="w-4 h-4" />
          </button>
          <button className="flex items-center space-x-2 text-[var(--primary-color)] hover:text-blue-700 transition-colors">
            <Edit className="w-4 h-4" />
            <span className="text-sm font-medium underline">Edit</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="w-full bg-gray-200 rounded-full h-8 relative overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <span className="ml-4 text-sm font-semibold text-gray-700 min-w-[3rem]">
            {completionPercentage}%
          </span>
        </div>
      </div>

      {/* Add/Edit Form */}
      {isEditing && (
        <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            {editingId ? 'Edit Vaccine' : 'Add New Vaccine'}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <input
              type="text"
              placeholder="Vaccine Name"
              value={newVaccine.vaccineName}
              onChange={(e) => setNewVaccine({ ...newVaccine, vaccineName: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={newVaccine.status}
              onChange={(e) => setNewVaccine({ ...newVaccine, status: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Complete">Complete</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
            </select>
            <input
              type="number"
              placeholder="Age"
              value={newVaccine.age}
              onChange={(e) => setNewVaccine({ ...newVaccine, age: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Doctor Name"
              value={newVaccine.doctorName}
              onChange={(e) => setNewVaccine({ ...newVaccine, doctorName: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              value={newVaccine.date}
              onChange={(e) => setNewVaccine({ ...newVaccine, date: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-2 mt-3">
            <button
              onClick={editingId ? handleUpdateVaccine : handleAddVaccine}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
            >
              {editingId ? 'Update' : 'Add'} Vaccine
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditingId(null);
                setNewVaccine({
                  vaccineName: '',
                  status: 'Complete',
                  age: '',
                  doctorName: '',
                  date: ''
                });
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Immunization Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
        {/* Immunization Table */}
        <table className="w-full border-collapse relative">
          {/* Table Header */}
          <thead className="bg-[var(--primary-color)] text-white">
            <tr>
              <th className="p-4 text-left font-medium">Vaccine Name</th>
              <th className="p-4 text-left font-medium">Status</th>
              <th className="p-4 text-left font-medium">Age</th>
              <th className="p-4 text-left font-medium">Dr. Name</th>
              <th className="p-4 text-left font-medium">Date</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-200">
            {immunizations.map((vaccine, index) => (
              <tr
                key={vaccine.id}
                className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} group hover:bg-blue-50 transition-colors relative`}
              >
                {/* Vaccine Name */}
                <td className="p-4 text-sm text-gray-900 font-medium">
                  {vaccine.vaccineName}
                </td>

                {/* Status Button */}
                <td className="p-4">
                  {/* <button
                    onClick={() => toggleStatus(vaccine.id)}
                    className={`flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-medium transition-colors
                         ${vaccine.status === 'Complete'
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : vaccine.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                          : 'bg-red-100 text-red-800 hover:bg-red-200'
                      }`}
                  >
                    {vaccine.status === 'Complete' && <Check className="w-3 h-3" />}
                  <span>{vaccine.status}</span>
                  </button> */}
                  <div className='flex items-center '>
                    <div className='bg-green-600 flex items-center justify-center  rounded-full w-[24px] h-[24px] me-2'>
                      <Check className=" text-white" size={'20px'} />
                    </div>
                    <span>{vaccine.status}</span>
                  </div>
                </td>

                {/* Age */}
                <td className="p-4 text-sm text-gray-900">
                  {vaccine.age}
                </td>

                {/* Doctor Name */}
                <td className="p-4 text-sm text-gray-900">
                  {vaccine.doctorName}
                </td>

                {/* Date */}
                <td className="p-4 text-sm text-gray-900">
                  {vaccine.date}
                </td>

                {/*  Actions */}

                {/* <td className="p-4 relative right-4 opacity-1 group-hover:opacity-100 transition-opacity ">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditVaccine(vaccine.id)}
                      className="text-blue-600 hover:text-blue-800 text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteVaccine(vaccine.id)}
                      className="text-red-600 hover:text-red-800 text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>

      </div>


    </div>
  );
};

export default ImmunizationProfile;
