import React, { useEffect, useState } from "react";
import MedicalBoardCard from "./MedicalBoardCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import responsive from "../../utils/responsive_carousel";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { __getCommenApiDataList } from "../../utils/api/commonApi";

const MedicalBoard = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const navigate = useNavigate();
  const [doctorArr, setDoctorArr] = useState([]); // store fetched doctors

  // ...........

  const [state, setState] = useState({
    MedicalSpecialties: [],
    MedicalSpecialty: null,
    loading: false,
    specialtiesLoading: false,
  });

  const { MedicalSpecialties, MedicalSpecialty, loading, specialtiesLoading } =
    state;

  const updateState = (data) =>
    setState((prevState) => ({ ...prevState, ...data }));

  const getDoctorProfile = async () => {
    try {
      updateState({ loading: true });
      const resp = await api.post("api/v1/admin/assetList", {
        AssetCategoryLevel1: "68b0104063729ea39b28d0fb",
        MedicalSpecialties: MedicalSpecialty?._id || null,
      });

      const formattedData = resp.data.data.list.map((doc, index) => ({
        id: doc._id || index + 1,
        name: doc.AssetName,
        // exp: `${
        //   (doc.MedicalSpecialties || []).map((item) => item.lookup_value).join(", ")
        // } | ${doc.experience || 0} Years Experience`,
        exp: `${doc.MedicalSpecialties[0].lookup_value} | ${doc.experience || 5
          } Years Experience`,
        location:
          `${doc.AddressLine1} ${doc.AddressLine2}${doc.PostalCode}` || "",
        Specializes: `${(doc.MedicalSpecialties || [])
          .map((item) => item.lookup_value)
          .join(", ")} `,
        image: doc.ProfilePicture || null,
      }));

      setDoctorArr(formattedData);
    } catch (error) {
      console.error("Error fetching doctor profile:", error);
    } finally {
      updateState({ loading: false });
    }
  };

  // Fetch dropdown data using common API
  const fetchDropdownData = async (lookupTypes, stateKey, parent_lookup_id) => {
    try {
      updateState({ specialtiesLoading: true });
      const data = await __getCommenApiDataList({
        lookup_type: lookupTypes,
        parent_lookup_id: parent_lookup_id || null,
      });
      updateState({ [stateKey]: data });
    } catch (error) {
      console.error(error);
    } finally {
      updateState({ specialtiesLoading: false });
    }
  };

  useEffect(() => {
    // Fetch lookup data for dropdowns
    fetchDropdownData(["medical_speciality"], "MedicalSpecialties");
  }, []);

  useEffect(() => {
    getDoctorProfile();
  }, [MedicalSpecialty]); // Add MedicalSpecialty dependency to refetch when specialty changes

  const renderContent = () => {
    switch (activeTab) {
      case "tab1":
        return (
          <div>
            <MedicalBoardCard />
          </div>
        );
      case "tab2":
        return (
          <div>
            {" "}
            <MedicalBoardCard />{" "}
          </div>
        );
      case "tab3":
        return (
          <div>
            {" "}
            <MedicalBoardCard />{" "}
          </div>
        );
      case "tab4":
        return (
          <div>
            {" "}
            <MedicalBoardCard />{" "}
          </div>
        );
      case "tab5":
        return (
          <div>
            {" "}
            <MedicalBoardCard />{" "}
          </div>
        );
      case "tab6":
        return (
          <div>
            {" "}
            <MedicalBoardCard />{" "}
          </div>
        );
      case "tab7":
        return (
          <div>
            {" "}
            <MedicalBoardCard />{" "}
          </div>
        );
        return null;
    }
  };

  return (
    <>
      <div className="">
        <div className="container ">
          <div className="row">
            <div className="col-lg-8 col-12">
              <h2 className="fw-semibold">Trusted Medical Experts</h2>
              <p className="light-color">
                Bringing global experience,compassionate care, and proven
                results.
              </p>
            </div>
            <div className="p-0 col-lg-4 col-12 d-flex justify-content-lg-end align-items-start">
              <button
                className="view-all mb-4 md:mb-0"
                onClick={() => navigate("/view-all-doctors")}
              >
                View All &#8594;
              </button>{" "}
            </div>
          </div>
          {/* =================Trusted Medical Experts tabs================= */}
          <div className="row">
            <div className="w-full px-0 mb-4 medical-tab-buttons">
              <Carousel
                arrows={false}
                responsive={responsive}
                containerClass="carousel-container w-full"
                itemClass="px-2"
                infinite
                partialVisible
              >

                <button
                  className={`cutom-tab-style mb-3 ${activeTab === "tab2" ? "activeTab" : "gray-btn-style"
                    }`}
                  onClick={() => setActiveTab("tab2")}
                >
                  Orthopedics
                </button>
                <button
                  className={`cutom-tab-style  ${activeTab === "tab3" ? "activeTab" : "gray-btn-style"
                    }`}
                  onClick={() => setActiveTab("tab3")}
                >
                  Pediatrics
                </button>
                <button
                  className={`cutom-tab-style  ${activeTab === "tab4" ? "activeTab" : "gray-btn-style"
                    }`}
                  onClick={() => setActiveTab("tab4")}
                >
                  Neurology
                </button>
                <button
                  className={`cutom-tab-style  ${activeTab === "tab5" ? "activeTab" : "gray-btn-style"
                    }`}
                  onClick={() => setActiveTab("tab5")}
                >
                  Obstetrics & Gynecology
                </button>
                <button
                  className={`cutom-tab-style  ${activeTab === "tab6" ? "activeTab" : "gray-btn-style"
                    }`}
                  onClick={() => setActiveTab("tab6")}
                >
                  Otorhinolaryngology
                </button>
                <button
                  className={`cutom-tab-style ${activeTab === "tab7" ? "activeTab" : "gray-btn-style"
                    }`}
                  onClick={() => setActiveTab("tab7")}
                >
                  Plastic & Reconstructive Surgery
                </button>
              </Carousel>
            </div>
          </div>
        </div>
        {/* =================Trusted Medical Experts Contant================= */}
        <div style={{ padding: 0 }} className="position-relative">
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default MedicalBoard;
