

import locationIcon from "../../assets/images/icons/location2.svg"
import clockIcon from "../../assets/images/icons/clock.svg"
import webIcon from "../../assets/images/icons/web.svg"
import { hospitalPartnerData } from "../../Data/LocalData"
const HospitalsPartnersList = () => {
  return (
      <>
       

      {hospitalPartnerData.map((item) => (
      <div className="col-lg-4 col-md-6 col-12 mb-4 " key={item.id}>
        <div className="bg-white border border-gray-300 rounded-lg shadow relative overflow-hidden">
          {/* ✅ Top Banner Image */}
          <div className="relative w-full h-32 sm:h-52">
            <img
              src={item.image} // your hospital banner image here
              alt="hospital"
              className="w-full h-full object-cover"
            />

            {/* ✅ Doctor Image overlapping bottom-left */}
            <img
              src={item.image} // separate doctor profile image
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
          <div className="px-4 sm:px-6 py-4 space-y-3">
            <div className="flex items-start space-x-2">
              <img src={locationIcon} alt="location" className="w-5 sm:w-6" />
              <span className="text-black text-sm sm:text-base break-words">
                {item.location}
              </span>
            </div>
            <div className="flex items-start space-x-2">
              <img src={clockIcon} alt="clock" className="w-5 sm:w-6" />
              <span className="text-black text-sm sm:text-base">
                Hours: {item.hours}
              </span>
            </div>
            <div className="flex items-start space-x-2">
              <img src={webIcon} alt="web" className="w-5 sm:w-6" />
              <span className="text-black text-sm sm:text-base break-words">
                Website:{" "}
                <span className="text-blue-600">{item.URL}</span>
              </span>
            </div>
          </div>

          {/* ✅ Buttons */}
          <div className="px-4 sm:px-6 py-4 flex flex-col gap-3">
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
      </>
  )
}

export default HospitalsPartnersList