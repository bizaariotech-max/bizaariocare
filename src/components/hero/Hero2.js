
import "../../assets/css/hero.css";
import { sliderArray } from '../../Data/LocalData';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import "../../assets/css/hero.css";
const Hero2 = () => {
        const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
      items: 1,

  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};
return (
<>
        <section className="hero-section position-relative"> 
             <div id='hero-slider' >
               <Carousel
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    responsive={responsive}
                                    autoPlay={true}
                                    autoPlaySpeed={3000}
                                    transitionDuration={2000} 
                                    //additionalTransfrom={-50 * 3}
                                    //  pauseOnHover={false} 
                                    containerClass=" p-0 " 
                                    itemClass=""   
                                    arrows={false}
                                    
                                    showDots={true}
                                    infinite={true}  
                                    renderDotsOutside={true} 
                                  partialVisible={false}
                                   centerMode={false}
                                    >
       
            {sliderArray.map((element)=> {
                return(
                    <div key={element.id}> 
                    <div className="item banner-bg "  style={element.sliderImage}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                                <img className="img-fluid" src={element.sliderImage} alt="" />
                                <div className="hero-content">
                                    <h1 className="hero-title">{element.bannerTitle}</h1>
                                    <p className="hero-text">{element.dsc}</p>
                                    <div className="hero-btns ">
                                        <div>
                                            <a href="/" className="btn  nav-btn-style2  text-white">See How It  Works</a>
                                        </div>
                                        <div>
                                            <a href="/" className="btn  nav-btn-style">Join Our Network</a>
                                        </div> 
                                    </div>
                                    <div className="rounded-buttons ">
                                        <div className="pill-button ">
                                            <strong>10,000+</strong> Hospitals connected
                                        </div>
                                        <div className="pill-button">
                                            <strong>10K+ </strong> doctors connected
                                        </div> 
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    </div>
            )
            }
            )}
               
            </Carousel>
             </div>
    </section>
</>
)
}

export default Hero2