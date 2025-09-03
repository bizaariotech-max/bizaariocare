

import locationIcon from "../../assets/images/icons/location2.svg"
import clockIcon from "../../assets/images/icons/clock.svg"
import webIcon from "../../assets/images/icons/web.svg"
import { hospitalPartnerData } from "../../Data/LocalData"
const HospitalsPartnersList = () => {
  return (
      <>
        {hospitalPartnerData.map((item) => {
            return ( 
                        
                        <div className="col-lg-4 col-md-6 col-12 mb-4" key={item.id}>
                            <div className="cardiology-card" >
                                <img src={item.image} alt="doctor" className="img-fluid" />
                                <div className='d-flex justify-content-between pt-4'>
                                    <div>
                                        <h5 className="doc-name">{item.name}</h5>
                                        <div className="exp"
                                            style={{fontSize:'12px', color:'#3a3a3f'}}>{item.exp}
                                        </div>
                                    </div>
                                    <div className="profile-link">
                                        <a href="#" style={{fontSize:'12px'}}
                                            className='theme-color decoration-none weight-600'>View
                                            Profile</a>
                                    </div>
                                </div>

                                <div className="content mt-4">
                                    <div className='d-flex pb-2 align-items-center'>
                                        <div className='me-2'>
                                            <img src={locationIcon} alt="icon"
                                                style={{width:'24px'}} />
                                        </div>

                                        <div style={{color:"#000000"}}>{item.location}</div>
                                    </div>
                                    <div className='d-flex pb-2 align-items-center'>
                                        <div className='me-2'>
                                            <img src={clockIcon} alt="icon"
                                                style={{width:'24px'}} />
                                        </div>
                                        <div style={{color:'#000000'}}>Hours:
                                            <span>{item.hours}</span></div>
                                    </div>
                                    <div className='d-flex pb-2 align-items-center'>
                                        <div className='me-2'>
                                            <img src={webIcon} alt="icon" style={{width:'24px'}} />
                                        </div>
                                        <div style={{color:'#000000'}}>Hours: <span
                                                className='theme-color'>{item.URL}</span></div>
                                    </div>
                                </div>
                                <div className="d-flex pt-3 " style={{gap:'20px'}}>
                                    <div>
                                        <a href="/" className="btn common-btn-dark  ">Book an
                                            Appointments</a>
                                    </div>
                                    <div>
                                        <a href="/" className="btn  common-btn-outline ">Send
                                            Treatment Query</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                })} 
      </>
  )
}

export default HospitalsPartnersList