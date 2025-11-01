import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import locationIcon from "../../assets/images/icons/location-pin-alt-1-svgrepo-com 1.png";
import workIcon from "../../assets/images/icons/work.png";
import api from "../../api";
import responsive from "../../utils/responsive-card_carousel";
import { FaMapMarkerAlt, FaBriefcaseMedical } from "react-icons/fa";

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
        exp: `${doc.MedicalSpecialties[0].lookup_value} | ${doc.experience || 5} Years Experience`,
        location: `${doc.AddressLine1} ${doc.AddressLine2}${doc.PostalCode}` || "",
        Specializes: `${(doc.MedicalSpecialties || []).map((item) => item.lookup_value).join(", ")
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
      itemClass="px-2 pb-3"
      arrows={false}
      infinite={true}
      partialVisible={true}
    >
      {doctorArr.map((item) => (
        <div
          key={item.id}
          className="relative bg-white border rounded-lg hover:shadow-md transition-all h-full flex flex-col"
        >
          <div className="p-3 rounded-t-lg flex flex-col h-full">
            <div className="w-full max-h-[240px] rounded-lg overflow-hidden">
              <img
                src={item?.image}
                alt="image"
                className="object-cover w-full h-full"
              />
            </div>

            <div className="p-4 pb-4 flex-1">
              <h2 className="font-semibold text-xl mb-1">
                {item.name}
              </h2>
              <div className="text-gray-700 text-sm mb-3">
                {item.exp}
              </div>
              <div className="flex items-center text-gray-700 text-base mb-3 gap-2">
                <FaMapMarkerAlt className="mr-1 text-lg text-gray-600" />
                <span>{item?.location || "N/A"}</span>
              </div>
              <div className="flex items-start mb-2">
                <FaBriefcaseMedical className="mt-1 mr-2 text-lg text-gray-600" />
                <div>
                  <span className="font-semibold">Specializes in:</span>
                  <span className="ml-1 text-gray-700">
                    {item.Specializes || "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex flex-col gap-3 px-4 pb-4 mt-auto">
              <button className="bg-[var(--button-back-color)] text-[var(--white)] rounded-lg py-3 font-semibold text-center text-base hover:bg-[var(--button-back-hover)] transition">
                Send Medical Query
              </button>
              <button
                onClick={() => navigate(`/doctor/${item.id}`)}
                className="bg-[var(--button-back-white-color)] text-[var(--button-back-color)] border border-gray-300 rounded-lg py-3 font-semibold text-center text-base hover:bg-gray-50 transition"
              >
                View Profile
              </button>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default MedicalBoardCard;
