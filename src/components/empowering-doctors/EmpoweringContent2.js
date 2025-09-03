// import React from 'react'
import { doctorArr } from '../../Data/LocalData';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../../assets/css/Empowering.css'
const EmpoweringContent2 = () => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 3
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3, 
             partialVisibilityGutter: 20
        },
        tablet: {
            breakpoint: { max: 1024, min: 767 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 767, min: 0 },
            items: 1,
           
        }
    };
   
  return (
      <>
          <div className="doctor-slider mt-4 position-relative">
               <Carousel
                //   removeArrowOnDeviceType={["tablet", "mobile"]}
                  arrows={false} 
                responsive={responsive}
                // autoPlay={false}
                // autoPlaySpeed={3000}
                // transitionDuration={2000} 
                //additionalTransfrom={-20}
                //  pauseOnHover={false} 
                //  centerMode={false}
                containerClass=" carousel-container" 
                itemClass="pe-md-4 px-1"  
                showDots={true}
                infinite={true}  
                renderDotsOutside={true} 
                partialVisible={true}
            
                >
            {doctorArr.map((element) => {
            return (

            <div className="" key={element.id}>
                <img src={element.image} alt="doctor" className=" mx-auto img-fluid" style={{width: '100%'}} />
                <div className="content mt-4">
                    <p className="text-gray-700 text-start mb-1">
                        {element.dsc}
                    </p>
                    <p className=''><strong>{element.name }</strong></p>
                </div>

            </div>
            )
            })}
</Carousel>
        </div>
      </>
  )
}

export default EmpoweringContent2