import React, { useEffect, useState } from 'react';

const ClinicalOutcome = ({ currentLevel = 40 }) => {

  // const [box1Width, setBox1Width] = useState(null);

  // const getWidth = () => {
  //   const box1 = document.querySelector('.box1');
  //   const width = box1.offsetWidth;
  //   setBox1Width(width);
  // }
  // useEffect(() => {
  //   getWidth()
  // }, [])

  // Function to render the color bar indicator
  const renderColorBar = () => {


    const segments = [
      { color: 'bg-red-600', width: 'w-[40px] h-[40px]', level: 0 },
      { color: 'bg-red-500', width: 'w-[40px] h-[40px]', level: 1 },
      { color: 'bg-yellow-500', width: 'w-[40px] h-[40px]', level: 2 },
      { color: 'bg-yellow-300', width: 'w-[40px] h-[40px]', level: 3 },
      { color: 'bg-green-300', width: 'w-[40px] h-[40px]', level: 4 },
      { color: 'bg-green-500', width: 'w-[40px] h-[40px]', level: 5 },
      { color: 'bg-green-600', width: 'w-[40px] h-[40px]', level: 6 },
      // { color: 'bg-black', width: 'w-1', level: 7, isIndicator: true },
    ];

    return (
      <div className={`flex items-center  p-2  `}>
        {segments.map((segment, index) => {
          return (
            <div
              key={index}
              className={`h-6 ${segment.width} ${segment.color}
             `}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="space">
      {/* Header with Color Bar */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Clinical Outcome/ Patient's Response
        </h2>

        <div className='box1 flex  flex-wrap relative' >
          <div className='indicator bg-black w-1.5  ' style={{
            position: 'absolute', left: `${(currentLevel)}%`,
            height: "100%", top: '0px'
          }}>

          </div>

          {renderColorBar()}
        </div>

      </div>

      {/* Content */}
      <div className="space-y-4 border bg-white rounded-sm shadow-sm border-gray-200 p-6">
        <div className="text-sm text-gray-800 leading-relaxed">
          <p>
            Following your recent consultation, I have prescribed{' '}
            <span className="font-medium">[specific medication(s), dosage, and duration, e.g., Amoxicillin 500 mg, twice daily for 7 days]</span>{' '}
            to address your{' '}
            <span className="font-medium">[specific condition, e.g., bacterial sinus infection]</span>.
          </p>

          <p className="mt-3">
            This treatment is expected to{' '}
            <span className="font-medium">[intended outcome, e.g., resolve the infection and alleviate symptoms such as nasal congestion and facial pain]</span>{' '}
            within{' '}
            <span className="font-medium">[expected timeframe, e.g., 5-7 days]</span>.
            Please take the medication as directed and complete the full course to ensure optimal recovery.
          </p>
        </div>

        {/* Footer Note */}
        <div className="pt-4 border-t border-gray-200 mt-6">
          <p className="text-xs text-gray-600">
            1. Added By Dr Gaurav Pande (Cardiology) (Regards M1234), (Contact 8373915529, Date/ Time 20 Sep 2025, 11:57 AM IST, Noida
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClinicalOutcome;
