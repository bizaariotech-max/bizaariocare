import React from 'react'
import AwardCrt from '../cards/AwardCrt'

const awardCrtArr = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },


]
const AwardCrtConent = ({ hospitalData }) => {
  // Use dynamic awards from hospitalData or fallback to static data
  const awards = hospitalData?.awardsRecognitions || awardCrtArr;
  
  console.log('AwardCrtConent - hospitalData:', hospitalData);
  console.log('AwardCrtConent - awards:', awards);
  
  return (
    <div className='grid gap-4 lg:grid-cols-3 md:grid-cols-2 lg:gap-6'>
      {awards.map((item, index) => (
        <AwardCrt key={item._id || item.id || index} award={item} />
      ))}

    </div>
  )
}

export default AwardCrtConent

