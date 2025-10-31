import React from 'react'
import ProfileCard1 from '../AllSubForms/UI/ProfileCard1'
import ProfileCard2 from '../AllSubForms/UI/ProfileCard2'

const PatientReferralPreview = () => {
  return (
  <div className="space-y-4">
  {/* Cards */}
  <div className="flex gap-4">
    <ProfileCard1 className="w-1/2" />
    <ProfileCard2 className="w-1/2" />
  </div>

  {/* Buttons */}
  <div className="flex justify-end">
    <div className="flex gap-4">
      <button
        className="px-6 py-3 rounded-lg font-medium text-[var(--primary-color)] transition-colors border-2 hover:bg-slate-700 cursor-pointer"
      >
        Edit
      </button>
      <button
        className="px-6 py-3 rounded-lg font-medium text-white transition-colors bg-[var(--primary-color)] hover:bg-slate-700 cursor-pointer"
      >
        Preview
      </button>
    </div>
  </div>
</div>

  )
}

export default PatientReferralPreview

