import locationIcon from "../../assets/images/icons/location2.svg";
import clockIcon from "../../assets/images/icons/clock.svg";
import webIcon from "../../assets/images/icons/web.svg";
import { hospitalPartnerData } from "../../Data/LocalData";
const HospitalsPartnersList = () => {
  return (
    <>
      {hospitalPartnerData.map((item) => (
        <div className="mb-4 col-lg-4 col-md-6 col-12 " key={item.id}>
          <div className="relative overflow-hidden bg-white border border-gray-300 rounded-lg shadow">
            {/* ✅ Top Banner Image */}
            <div className="relative w-full h-32 sm:h-52">
              <img
                src={item.image} // your hospital banner image here
                alt="hospital"
                className="object-cover w-full h-full"
              />

              {/* ✅ Doctor Image overlapping bottom-left */}
              <img
                src={item.image} // separate doctor profile image
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
                <p className="text-xs text-gray-700 break-words sm:text-sm">
                  {item.exp}
                </p>
              </div>
            </div>

            {/* ✅ Content */}
            <div className="px-4 py-4 space-y-3 sm:px-6">
              <div className="flex items-start space-x-2">
                <img src={locationIcon} alt="location" className="w-5 sm:w-6" />
                <span className="text-sm text-black break-words sm:text-base">
                  {item.location}
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <img src={clockIcon} alt="clock" className="w-5 sm:w-6" />
                <span className="text-sm text-black sm:text-base">
                  Hours: {item.hours}
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <img src={webIcon} alt="web" className="w-5 sm:w-6" />
                <span className="text-sm text-black break-words sm:text-base">
                  Website: <span className="text-blue-600">{item.URL}</span>
                </span>
              </div>
            </div>

            {/* ✅ Buttons */}
            <div className="flex flex-col gap-3 px-4 py-4 sm:px-6">
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
  );
};

export default HospitalsPartnersList;
