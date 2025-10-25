import { useState, useEffect } from 'react';
import api from '../../api';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import clock from '../../assets/images/clock.png';
import calender from '../../assets/images/calendar.png';
import { NavLink } from 'react-router-dom';

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
      const resp = await api.post("api/v1/admin/ContentList", {
        ContentTypeId: "68affee3874340d8d79dbf3b",
        // ContentPriority: 'Medium',
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
    <div className="relative mt-4 doctor-slider">
      <Carousel
        arrows={false}
        responsive={responsive}
        containerClass="carousel-container"
        itemClass="px-2"
        infinite
        partialVisible
      >
        {digital_cme?.map((element) => (
          <NavLink
            key={element._id || element.id}
            to={`/news-articles/${element._id || element.id}`}
            state={{ article: element }}
            className="block h-full text-decoration-none"
          >
            <div className="flex flex-col h-full p-2 transition-shadow duration-300 bg-gray-200 cursor-pointer rounded-2xl hover:shadow-lg">
              <img
                src={element.ContentImage}
                alt="doctor"
                className="object-cover w-full h-64 rounded-xl"
              />

              <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                <img src={calender} className="w-3.5 h-3.5" alt="" />
                <p>{new Date(element.Date).toLocaleDateString()}</p>
              </div>

              <div className="flex flex-col justify-between flex-1 mt-4">
                <div>
                  <p className="text-lg font-bold text-black">
                    {element.ContentTitle}
                  </p>
                  <p className="mt-1 text-sm text-gray-700 line-clamp-3">
                    {element.ShortDescription}
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-4">
                  <img
                    src={element.AssetId.ProfilePicture}
                    alt={element.name}
                    className="object-cover border-2 border-white rounded-full w-9 h-9"
                  />
                  <div>
                    <p className="text-sm font-medium text-black">
                      {element.AssetId.AssetName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(element.AssetId.MedicalSpecialties || [])
                        .map((item) => item.lookup_value)
                        .join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </NavLink>
        ))}
      </Carousel>
    </div>
  );
};

export default EmpoweringContent2;
