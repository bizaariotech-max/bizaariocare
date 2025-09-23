import doctorIcon1 from '../../assets/images/icons/doc-icon.png'
import doctorIcon2 from '../../assets/images/icons/doct-icon2.png'
import doctorIcon3 from '../../assets/images/icons/doct-icon3.png'
import style from '../../assets/css/collaboration.module.css'

const InternationalTab1 = () => {
  return (
      <>
      <div className='indian-tab-content'>
                {/* <div className="row">
                    <div className="col-md-4 col-12 mb-3 mb-md-0">
                        <div className="stats-card1 stats-card  text-white  ">
                            <div>
                                <div className="mb-1 stats-title">Doctors </div>
                                <div className='d-flex  justify-content-between'>
                                    <div> 
                                        <h3 className="fw-bold stats-value">20k</h3>
                                    </div>
                                    <div className='stats-img'>
                                        <img src={doctorIcon1} alt="doctorIcon1" />
                                    </div>
                                </div> 
                            </div> 
                        </div>
                    </div>
                    <div className="col-md-4 col-12 mb-3 mb-md-0">
                      <div className="stats-card2 stats-card  text-white  ">
                            <div>
                                <div className="mb-1 stats-title">Medical Associations</div>
                                <div className='d-flex  justify-content-between'>
                                    <div> 
                                        <h3 className="fw-bold stats-value">20k</h3>
                                    </div>
                                    <div className='stats-img'>
                                        <img src={doctorIcon2} alt="doctorIcon1" />
                                    </div>
                                </div> 
                            </div> 
                        </div>
                      

                    </div>
                    <div className="col-md-4 col-12 mb-3 mb-md-0">
          
                       <div className="stats-card3 stats-card  text-white  ">
                            <div>
                                <div className="mb-1 stats-title">Partner Hospitals</div>
                                <div className='d-flex  justify-content-between'>
                                    <div> 
                                        <h3 className="fw-bold stats-value">20k</h3>
                                    </div>
                                    <div className='stats-img'>
                                        <img src={doctorIcon3} alt="doctorIcon1" />
                                    </div>
                                </div> 
                            </div> 
                        </div>
                    </div>
              </div> */}
              <div className={style["grid-card-container"]}>
                    <div className="stats-card1 stats-card  text-white  ">
                            <div>
                                <div className="mb-1 stats-title">Doctors </div>
                                <div className='d-flex  justify-content-between'>
                                    <div> 
                                        <h3 className="fw-bold stats-value">20k</h3>
                                    </div>
                                    <div className='stats-img'>
                                        <img src={doctorIcon1} alt="doctorIcon1" />
                                    </div>
                                </div> 
                            </div> 
                        </div>
                 
             
                    <div className="stats-card2 stats-card  text-white  ">
                            <div>
                                <div className="mb-1 stats-title">Medical Associations</div>
                                <div className='d-flex  justify-content-between'>
                                    <div> 
                                        <h3 className="fw-bold stats-value">20k</h3>
                                    </div>
                                    <div className='stats-img'>
                                        <img src={doctorIcon2} alt="doctorIcon1" />
                                    </div>
                                </div> 
                            </div> 
                        </div>
                  
                
                      <div className="stats-card3 stats-card  text-white  ">
                            <div>
                                <div className="mb-1 stats-title">Partner Hospitals</div>
                                <div className='d-flex  justify-content-between'>
                                    <div> 
                                        <h3 className="fw-bold stats-value">20k</h3>
                                    </div>
                                    <div className='stats-img'>
                                        <img src={doctorIcon3} alt="doctorIcon1" />
                                    </div>
                                </div> 
                            </div> 
                        </div>
                
              </div>
            </div>
      </>
  )
}

export default InternationalTab1