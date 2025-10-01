import React from 'react'
import generalphysician from '../../AllSubForms/assets/images/general physician.png'

const AccordionTitle = ({ srNo, date, doctor, icon }) => {
  return (
    <>
      <div className='flex  '>
        <div className="w-12 h-12 rounded-full bg-[var(--primary-color)] text-white flex items-center justify-center text-2xl         font-semibold lora">
          {srNo}
        </div>
        <div className="ms-3">
          <h3 className='table-header '>{date}</h3>
          <div className='flex items-center'>
            <img src={icon} alt='' style={{ height: "26px", marginRight: "8px" }} />
            <div style={{ margin: 0, fontWeight: "600", fontFamily: "Lora", whiteSpace: "nowrap", alignSelf: 'end' }}>
              {doctor}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AccordionTitle

