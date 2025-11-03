import React from 'react'
import DoctorProfileCard from '../../AllSubForms/UI/DoctorProfileCard'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const PremiumDoctorCarousel = ({ PremiumDoctorData }) => {
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 2, partialVisibilityGutter: 60 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 2, partialVisibilityGutter: 60 },
    tablet: { breakpoint: { max: 1024, min: 767 }, items: 2 },
    mobile: { breakpoint: { max: 767, min: 0 }, items: 1 },
  };
  return (
    <>
      <Carousel
        arrows={false}
        responsive={responsive}
        containerClass="carousel-container"
        itemClass="px-2 pt-4"
        infinite
        partialVisible
      >
        {PremiumDoctorData?.map((element) => (
          <div key={element.id}>
            <DoctorProfileCard />
          </div>
        ))}
      </Carousel>
    </>
  )
}

export default PremiumDoctorCarousel;



