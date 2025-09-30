import React from 'react'

const MedicalSpecialitiesCard = ({ icon, cardData }) => {
  console.log(cardData, "cardData")
  return (
    <>
      <div className='medical-card px-4 py-3' >
        <div className='mb-2 flex items-center '>
          <div className='me-2'>
            {icon ?
              <img src={icon ? icon : cardData.icon} alt='' width="24px" />
              : cardData.icon
            }

          </div>
          <p className='lg:text-[20px]' style={{ margin: 0, fontWeight: "600", fontFamily: "Lora", whiteSpace: "nowrap" }}>{cardData.label}</p>
        </div>
        <h2 className='lg:text-4xl' style={{ margin: 0, fontWeight: "600", fontFamily: "Lora", whiteSpace: "nowrap" }}>{cardData.code}</h2>
      </div>
    </>
  )
}

export default MedicalSpecialitiesCard

