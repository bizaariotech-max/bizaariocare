
import Aboutstyles from '../assets/css/about.module.css';
const CommonBanner = ({bannerData}) => {
  return (
      <>
              <section className={Aboutstyles.aboutBanner} style={{backgroundImage: `url(${bannerData.banner})`}}>
                <div className="container">
                  <div className="row">
                    <div className="col-lg-9 col-12 ">
                      <div className={Aboutstyles.bannerContent}>
                <h1 className={`text-white fw-bold `}>{bannerData.title }</h1>
                <p className='text-white'>{bannerData.desc }</p>
                      </div>
                    </div>
                  </div>
                </div>
      </section> 
      </>
  )
}

export default CommonBanner