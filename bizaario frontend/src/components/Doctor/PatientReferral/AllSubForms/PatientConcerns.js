import { Plus, Edit } from 'lucide-react';



export default function PatientConcerns() {

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

  
  return (
    <div className="space ">
      <div className="flex items-center justify-between ">
        <h2 className="lg:text-[24px] font-semibold mb-4">Patient’s Concerns</h2>
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
       
        

      </div>

      <div className="pt-4">
        <p className="">
          Doctor’s Note
        </p>
      </div>
    </div>
  );
}
