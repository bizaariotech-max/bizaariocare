import React from 'react'

const PatientTabs = () => {
  return (
    <>
      <div className='flex gap-4 flex-wrap pt-4'>
        <button className='view-all'>Medical Consultation</button>
        <button className='view-all'>Video Consultation</button>
        <button className='view-all'>SOS Response</button>
        <button className='view-all'>Treatment Plan</button>
        <button className='view-all'>Action</button>
      </div>
 
    </>
  )
}

export default PatientTabs
