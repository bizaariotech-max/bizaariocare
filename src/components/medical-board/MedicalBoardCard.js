import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import locationIcon from "../../assets/images/icons/location-pin-alt-1-svgrepo-com 1.png";
import workIcon from "../../assets/images/icons/work.png";
import api from "../../api";
import responsive from "../../utils/responsive-card_carousel";

const MedicalBoardCard = () => {
 

  const navigate = useNavigate();
  const [doctorArr, setDoctorArr] = useState([]);

  const getDoctorProfile = async () => {
    try {
      const resp = await api.post("api/v1/admin/assetList", {
        AssetCategoryLevel1: "68b0104063729ea39b28d0fb",
      });

      const formattedData = resp.data.data.list.map((doc, index) => ({
        id: doc._id || index + 1,
        name: doc.AssetName,
        // exp: `${
        //   (doc.MedicalSpecialties || []).map((item) => item.lookup_value).join(", ")
        // } | ${doc.experience || 0} Years Experience`,
          exp: `${
          doc.MedicalSpecialties[0].lookup_value} | ${doc.experience || 5} Years Experience`,
        location: `${doc.AddressLine1} ${doc.AddressLine2}${doc.PostalCode}` || "",
        Specializes: `${
          (doc.MedicalSpecialties || []).map((item) => item.lookup_value).join(", ")
        } `,
        image: doc.ProfilePicture || null,
      }));

      setDoctorArr(formattedData);
    } catch (error) {
      console.error("Error fetching doctor profile:", error);
    }
  };

  useEffect(() => {
    getDoctorProfile();
  }, []);

  return (
    <Carousel
      responsive={responsive}
      itemClass="px-2"
      arrows={false}
      infinite={true}
      partialVisible={true}
    >
      {doctorArr.map((item) => (
        <div
          key={item.id}
          className="relative flex flex-col h-full max-w-sm bg-white rounded-lg shadow-md"
        >
          {/* Header Section */}
          <div className="relative flex items-center px-1 py-1 bg-gray-200 rounded-t-lg sm:px-1">
            {/* Doctor Image overlapping bottom-left */}
            <img
              src={item.image}
              alt="doctor"
              className="absolute object-cover w-20 h-20 border-4 border-white rounded-full shadow -bottom-12 left-4 sm:left-6 sm:w-24 sm:h-24"
            />

            {/* Name + Exp aligned next to image */}
            <div className="flex flex-col justify-center flex-1 mt-4 ml-24 sm:ml-32 overflow-wrap">
              <h5 className="text-base font-bold text-black truncate sm:text-lg">
                {item.name}
              </h5>
              <p className="text-base text-gray-700 break-words sm:text-base">
                {item.exp}
              </p>
            </div>
          </div>

          {/* Location & Specialization */}
          <div className="px-4 py-3 mt-16 space-y-2">
            <div className="flex items-start text-base text-black">
              <img
                src={locationIcon}
                alt="location"
                className="flex-shrink-0 w-5 h-5 mr-2"
              />
              <span>{item?.location || "N/A"}</span>
            </div>
            <div className="flex items-start text-base">
              <img
                src={workIcon}
                alt="work"
                className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0"
              />
              <span>
                <strong>Specializes in:</strong>{" "}
                <span className="text-base text-gray-600">
                  {item.Specializes || "N/A"}
                </span>
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 px-4 pb-4 mt-auto ">
            <button className=" bg-[var(--button-back-color)] text-[var(--white)] rounded-lg py-3 font-semibold text-center text-base hover:bg-[var(--button-back-hover)] transition">
              Send Medical Query
            </button>
            <button
              onClick={() =>
                // navigate("/viewdoctorprofile", { state: { id: item.id } })
                navigate(`/doctor/${item.id}`)
              }
              className="bg-[var(--button-back-white-color)] text-[var(--button-back-color)] border border-gray-300 rounded-lg py-3 font-semibold text-center text-base hover:bg-gray-50 transition"
            >
              View Profile
            </button>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default MedicalBoardCard;
