import locationIcon from "../../assets/images/icons/location2.svg"
import clockIcon from "../../assets/images/icons/clock.svg"
import webIcon from "../../assets/images/icons/web.svg"
import { hospitalPartnerData } from "../../Data/LocalData"
import api from '../../api'
import { useState,useEffect } from "react"


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

  const get_hospital_profile = async () => {
    try {
      const resp = await api.post("api/v1/admin/assetList", {
        AssetCategoryLevel1: "68b00db063729ea39b28d0ef",
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
        <div className="doctor-slider mt-4 relative">
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
     <div className="relative max-w-sm bg-white rounded-lg shadow-md flex flex-col h-full" key={item.id}>
  <div className="bg-white border border-gray-300 rounded-lg shadow relative flex flex-col h-full">
    {/* ✅ Top Banner Image */}
    <div className="relative w-full h-32 sm:h-52">
      <img
        src={item.image}
        alt="hospital"
        className="w-full h-full object-cover"
      />

      {/* ✅ Doctor Image overlapping bottom-left */}
      <img
        src={item.Logo}
        alt="doctor"
        className="absolute -bottom-10 left-4 sm:left-6 w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white object-cover shadow z-50"
      />
    </div>

    {/* ✅ Name + Exp (next to the doctor image) */}
    <div className="pt-2 sm:pt-2 px-4 sm:px-6">
      <div className="ml-24 sm:ml-32">
        <h5 className="text-base sm:text-lg font-bold text-black break-words">
          {item.name}
        </h5>
        <p className="text-xs sm:text-sm text-gray-700 break-words">
          {item.exp}
        </p>
      </div>
    </div>

    {/* ✅ Content */}
    <div className="px-4 sm:px-6 py-4 space-y-3 flex-1 mt-auto">
      <div className="flex items-start space-x-2">
        <img src={locationIcon} alt="location" className="w-5 sm:w-6" />
        <span className="text-black text-sm sm:text-base break-words">
          {item.location}
        </span>
      </div>
      <div className="flex items-start space-x-2">
        <img src={clockIcon} alt="clock" className="w-5 sm:w-6" />
        <span className="text-black text-sm sm:text-base">
          Hours: {item?.hours ? item.hours : "24/7"}
        </span>
      </div>
      <div className="flex items-start space-x-2">
        <img src={webIcon} alt="web" className="w-5 sm:w-6" />
        <span className="text-black text-sm sm:text-base break-words">
          Website: {item.Website}
        </span>
      </div>
    </div>

    {/* ✅ Buttons */}
    <div className="px-4 pb-4 flex flex-col gap-3 mt-auto">
      <button className="bg-[#52677D] text-white rounded-lg py-3 text-sm sm:text-base font-semibold">
        Book An Appointment
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
  )
}

export default PartnersListHome