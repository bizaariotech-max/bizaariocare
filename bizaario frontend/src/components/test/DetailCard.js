import React from 'react'
import { useLocation, useParams } from 'react-router';

const DetailCard = () => {
    // const dataSingle = useParams();
    const LocalDataState = useLocation();
    //   console.log(LocalDataState, 'LocalDataState in DetailsCard')

//   console.log(dataSingle,'useparams')
  return (
      <div className='container p-4'>
         
          <h2>{LocalDataState.state.author}</h2>
          <p>{ LocalDataState.state.content}</p>
    </div>
  )
}

export default DetailCard
