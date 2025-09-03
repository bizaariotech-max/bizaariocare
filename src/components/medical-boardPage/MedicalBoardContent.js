import locationIcon from "../../assets/images/icons/location2.svg"
import workIcon from "../../assets/images/icons/work.png"
import { dominicArr } from "../../Data/LocalData"
import '../../assets/css/medical-board-partner-hospital.css'

const MedicalBoardContent = () => {
  return (
    <>
       {dominicArr.map((item) => {
            return ( 
                <div className="col-lg-4 col-md-6 col-12 mb-4" key={item.id}    >
                    <div className="cardiology-card" >
                                <img src={item.image} alt="doctor" className="img-fluid" />
                                <div className='d-flex justify-content-between pt-4'>
                                    <div>
                                        <h5 className="doc-name">{item.name}</h5>
                                        <div className="exp" style={{fontSize:'12px'}}>{item.exp}</div>
                                    </div>
                                    <div className="profile-link">
                                        <a href="#" style={{fontSize:'12px'}} className="theme-color decoration-none profile-link">View Profile</a>
                                    </div>
                                </div>
                
                                <div className="content mt-4">
                                    <div className='d-flex pb-2 align-items-center'>
                                        <div className='me-2'>
                                            <img src={locationIcon} alt="icon" style={{width:'24px'}} />
                                        </div>
                
                                        <div style={{color:"#000000"}}>{item.location}</div>
                                    </div>
                                    <div className='d-flex'>
                                        <div className='me-2'>
                                            <img src={workIcon} alt="icon" style={{width:'24px'}} />
                                        </div>
                
                                        <div><strong style={{color:"#000000"}}>Specializes in: </strong><span
                                                style={{color:'#73747e'}}>{item.Specializes}</span></div>
                                    </div>
                                </div>
                                <div className="d-flex pt-3  " style={{gap:'20px'}}>
                                    <div>
                                        <a href="/" className="btn common-btn-dark  ">Book an Appointments</a>
                                    </div>
                                    <div>
                                        <a href="/" className="btn  common-btn-outline ">Send Medical Query</a>
                                    </div>
                                </div>
                            </div>
                </div>
                )
        })} 
    </>
  )
}

export default MedicalBoardContent
