import React from 'react'
import videoFile from '../../assets/videos/video2.mp4'
import poster from '../../assets/images/poster.png'
const LiveSessionContent = () => {
  return (
    <>
      <div className="row">
        <div className='live-session'>
          <video controls="controls" width={'100%'} poster={poster}>
            <source src={videoFile} type="video/mp4" />
          </video>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 col-12">
          <h4 className='fw-semibold pt-2'>Doctor Mike hosts the AMA Tribute to the Medical School Class of 2023</h4>
          <p className='mb-3 mb-lg-0'>By Doctor Malik</p>
        </div>
        <div className="col-lg-4 col-12 d-flex justify-content-lg-end align-items-center">
          <button className={`btn common-btn-dark `}>
            Join Now
          </button>
        </div>
      </div>
      </>
  )
}

export default LiveSessionContent