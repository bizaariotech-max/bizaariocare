import { useState, useEffect } from 'react';
import api from '../../api';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import clock from '../../assets/images/clock.png';
import calender from '../../assets/images/calendar.png';

const EmpoweringContent2 = () => {
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 3 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3, partialVisibilityGutter: 10 },
    tablet: { breakpoint: { max: 1024, min: 767 }, items: 2 },
    mobile: { breakpoint: { max: 767, min: 0 }, items: 1 },
  };

  const [digital_cme, setdigital_cme] = useState([]);

  const get_digital_cme_content = async () => {
    try {
      const resp = await api.post('api/v1/admin/ContentList', {
        ContentTypeId: '68affee3874340d8d79dbf3b',
        ContentPriority: 'Medium',
      });
      setdigital_cme(resp.data.data.list);
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    get_digital_cme_content();
  }, []);

  return (
    <div className="doctor-slider mt-4 relative">
      <Carousel
        arrows={false}
        responsive={responsive}
        containerClass="carousel-container"
        itemClass="px-2"
        infinite
        partialVisible
      >
        {digital_cme?.map((element) => (
          <div
            key={element.id}
            className="bg-gray-200 rounded-2xl p-2 flex flex-col h-full"
          >
            <img
              src={element.ContentImage}
              alt="doctor"
              className="w-full h-64 object-cover rounded-xl"
            />

            <div className="flex items-center gap-4 mt-3 text-gray-600 text-sm">
              <img src={calender} className="w-3.5 h-3.5" alt="" />
              <p>{new Date(element.Date).toLocaleDateString()}</p>
            </div>

            <div className="mt-4 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-black font-bold text-lg">{element.ContentTitle}</p>
                <p className="text-gray-700 text-sm mt-1 line-clamp-3">{element.ShortDescription}</p>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <img
                  src={element.AssetId.ProfilePicture}
                  alt={element.name}
                  className="w-9 h-9 rounded-full border-2 border-white object-cover"
                />
                <div>
                  <p className="text-black text-sm font-medium">{element.AssetId.AssetName}</p>
                  <p className="text-gray-500 text-xs">
                    {(element.AssetId.MedicalSpecialties || []).map((item) => item.lookup_value).join(', ')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default EmpoweringContent2;
