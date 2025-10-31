import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { awardSliderData } from "../../Data/LocalData";
import { useEffect, useState } from "react";
import { __postApiData } from "../../utils/api";
import Carousel from 'react-multi-carousel';

const AwardsSlider2 = () => {

  const[awards,setawards]=useState([])

    const getawards_list = async () => {
    try {
      const resp = await __postApiData("/api/v1/admin/ContentList", 
  {
            page: 1,
            limit: 100,
            ContentTypeId: "68afff10874340d8d79dbf53"
            // "ContentPriority":"Medium"
        }
);


      if (resp.response.response_code === "200") {
        setawards(resp.data.list || []);
      }
    } catch (error) {
      console.error("Error fetching content list:", error);
    }
  };

  useEffect(()=>
  {
    getawards_list()
  },[])


  const NextArrow = ({ onClick }) => (
    <div className="slick-next-btn" onClick={onClick}>
      <MdOutlineNavigateNext size={20} />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div className="slick-prev-btn" onClick={onClick}>
      <MdOutlineNavigateBefore size={20} />
    </div>
  );

          const responsive_tab = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 3 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3, partialVisibilityGutter: 20 },
    tablet: { breakpoint: { max: 1024, min: 767 }, items: 2 },
    mobile: { breakpoint: { max: 767, min: 0 }, items: 1 },
  };
  return (
                 <Carousel
                     //   removeArrowOnDeviceType={["tablet", "mobile"]}
                       arrows={false} 
                     responsive={responsive_tab}
                     // autoPlay={false}
                     // autoPlaySpeed={3000}
                     // transitionDuration={2000} 
                     //additionalTransfrom={-20}
                     //  pauseOnHover={false} 
                     //  centerMode={false}
                     containerClass=" carousel-container" 
                     itemClass="pe-md-4 px-1"  
                    //  showDots={true}
                     infinite={true}  
                     renderDotsOutside={true} 
                     partialVisible={true}
                 
                     >
                 {awards.map((element) => {
                 return (
     
          <div
  key={element.id}
  className="flex flex-col justify-between rounded-2xl bg-[#BDC4D44D] p-3 h-full"
>
  {/* Image */}
  <img
    src={element.ContentImage}
    alt="doctor"
    className="w-full h-[257px] rounded-lg object-cover mx-auto"
  />

  {/* Content */}
  <div className="mt-4 text-start">
    <p className="text-black text-[20px] font-bold leading-normal mb-1">
      {element.ContentTitle}
    </p>
    <p className="text-[#52677D] text-[16px] font-normal leading-normal mb-1">
      {element.LongDescription}
    </p>
  </div>

  {/* View Certificate Link */}
  <a
    href={element.link || "#"}
    target="_blank"
    rel="noopener noreferrer"
    className="text-[#1667ED] font-bold text-[18px] leading-8 underline mt-auto"
  >
    View Certificate
  </a>
</div>


                 )
                 })}
     </Carousel>
  );
};

export default AwardsSlider2;
