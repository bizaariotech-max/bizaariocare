import locationIcon from "../../assets/images/icons/location2.svg"
import clockIcon from "../../assets/images/icons/clock.svg"
import webIcon from "../../assets/images/icons/web.svg"
import { hospitalPartnerData } from "../../Data/LocalData"
import api from '../../api'
import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"


import Carousel from 'react-multi-carousel';

const PartnersListHome = () => {
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

    const [hospital_details, sethospital_details] = useState([]);
    const navigate = useNavigate();

    const handleViewProfile = (hospitalId) => {
        navigate(`/hospital/${hospitalId}`);
    };

  const get_hospital_profile = async () => {
    try {
      const resp = await api.post("api/v1/admin/assetList", {
        AssetCategoryLevel1: "68b00db063729ea39b28d0ef",// asset category hospital id
      });



      const formattedData = resp.data.data.list.map((doc, index) => ({
        id: doc._id || index + 1,
        name: doc.AssetName,
        // exp: `${
        //   (doc.MedicalSpecialties || []).map((item) => item.lookup_value).join(", ")
        // } | ${doc.experience || 0} Years Experience`,
          exp: `${
          doc.MedicalSpecialties.map((item)=>item.lookup_value)} | ${doc.experience || 5} Years Experience`,
        location: `${doc.AddressLine1} ${doc.AddressLine2} ${doc.PostalCode}` || "",
        Specializes: `${
          (doc.MedicalSpecialties || []).map((item) => item.lookup_value).join(", ")
        } `,
        image: doc.ProfilePicture || null,
        Website:doc.Website || "",
        Logo:doc.Logo || ""
      }));

      sethospital_details(formattedData);
    } catch (error) {
      console.error("Error fetching doctor profile:", error);
    }
  };

  useEffect(() => {
    get_hospital_profile();
  }, []);


  return (
    <>
      <div className="relative mt-4 doctor-slider">
        <Carousel
          arrows={false}
          responsive={responsive}
          containerClass="carousel-container"
          itemClass="px-1 sm:px-2"
          infinite={true}
          renderDotsOutside={true}
          partialVisible={true}
        >
          {hospital_details.map((item) => (
            <div
              className="relative flex flex-col h-full max-w-sm bg-white rounded-lg shadow-md"
              key={item.id}
            >
              <div className="relative flex flex-col h-full bg-white border border-gray-300 rounded-lg shadow">
                {/* ✅ Top Banner Image */}
                <div className="relative w-full h-32 sm:h-52">
                  <img
                    src={item.image}
                    alt="hospital"
                    className="object-cover w-full h-full"
                  />

                  {/* ✅ Doctor Image overlapping bottom-left */}
                  <img
                    src={item.Logo}
                    alt="doctor"
                    className="absolute z-50 object-cover w-20 h-20 border-4 border-white rounded-full shadow -bottom-10 left-4 sm:left-6 sm:w-24 sm:h-24"
                  />
                </div>

                {/* ✅ Name + Exp (next to the doctor image) */}
                <div className="px-4 pt-2 sm:pt-2 sm:px-6">
                  <div className="ml-24 sm:ml-32">
                    <h5 className="text-base font-bold text-black break-words sm:text-lg">
                      {item.name}
                    </h5>
                    <p className="text-base text-gray-700 break-words sm:text-base">
                      {item.exp}
                    </p>
                  </div>
                </div>

                {/* ✅ Content */}
                <div className="flex-1 px-4 py-4 mt-auto space-y-3 sm:px-6">
                  <div className="flex items-start space-x-2">
                    <img
                      src={locationIcon}
                      alt="location"
                      className="w-5 sm:w-6"
                    />
                    <span className="text-base text-black break-words sm:text-base">
                      {item.location}
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <img src={clockIcon} alt="clock" className="w-5 sm:w-6" />
                    <span className="text-base text-black sm:text-base">
                      Hours: {item?.hours ? item.hours : "24/7"}
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <img src={webIcon} alt="web" className="w-5 sm:w-6" />
                    <span className="text-base text-black break-words sm:text-base">
                      Website: {item.Website}
                    </span>
                  </div>
                </div>

                {/* ✅ Buttons */}
                <div className="flex flex-col gap-3 px-4 pb-4 mt-auto">
                  <button
                    className="bg-[#52677D] text-white rounded-lg py-3 text-sm sm:text-base font-semibold"
                    onClick={() => handleViewProfile(item.id)}
                  >
                    {/* Book An Appointment */}
                    View Profile{" "}
                  </button>
                  <button className="bg-white text-[#52677D] border border-gray-300 rounded-lg py-3 text-sm sm:text-base font-semibold">
                    Send Treatment Query
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default PartnersListHome