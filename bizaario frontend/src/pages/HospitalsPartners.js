import React, { useState, useEffect } from "react";
import CommonBanner from "../UI/CommonBanner";
import aboutBanner from "../assets/images/about/banner.png";
import locationIcon from "../assets/images/icons/location2.svg";
import clockIcon from "../assets/images/icons/clock.svg";
import webIcon from "../assets/images/icons/web.svg";
import location1 from "../assets/images/icons/location-light.svg";
import Header from "../AppLayout/Header";
import Footer from "../AppLayout/Footer";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import api from "../api";

const HospitalsPartners = () => {
  const hospitalData = {
    banner: aboutBanner,
    title: "Hospitals Partners",
    desc: "Empowering hospitals, physicians, and patients with real-time communication and clinical collaboration—because better care starts with better connection.",
  };

  // State management
  const [activeTab, setActiveTab] = useState("all");
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState("");
  const [medicalSpecialties, setMedicalSpecialties] = useState([]);

  // Fetch medical specialties for tabs
  useEffect(() => {
    const fetchMedicalSpecialties = async () => {
      try {
        const response = await api.post("api/v1/admin/lookupList", {
          LookupType: "MedicalSpecialties",
        });

        if (response.data && response.data.data) {
          setMedicalSpecialties(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching medical specialties:", error);
      }
    };

    fetchMedicalSpecialties();
  }, []);

  // Fetch hospitals with filters
  const fetchHospitals = async (specialty = "", city = "") => {
    setLoading(true);
    try {
      const payload = {
        AssetCategoryLevel1: "68b00db063729ea39b28d0ef", // Hospital category ID
        page: 1,
        limit: 50,
      };

      // Add specialty filter if selected
      if (specialty && specialty !== "all") {
        payload.MedicalSpecialties = specialty;
      }

      const response = await api.post("api/v1/admin/assetList", payload);

      if (response.data && response.data.data) {
        let hospitalList = response.data.data.list || [];

        // Client-side filtering for city
        if (city) {
          hospitalList = hospitalList.filter(
            (hospital) =>
              hospital.AddressLine1?.toLowerCase().includes(
                city.toLowerCase()
              ) ||
              hospital.AddressLine2?.toLowerCase().includes(city.toLowerCase())
          );
        }

        const formattedHospitals = hospitalList.map((hospital, index) => ({
          id: hospital._id || index + 1,
          name: hospital.AssetName,
          specialties:
            hospital.MedicalSpecialties?.map((spec) => spec.lookup_value).join(
              ", "
            ) || "",
          location: `${hospital.AddressLine1 || ""} ${
            hospital.AddressLine2 || ""
          } ${hospital.PostalCode || ""}`.trim(),
          hours: hospital.WorkingHours || "24/7",
          website: hospital.Website || "",
          image: hospital.ProfilePicture || "/api/placeholder/400/300",
          logo: hospital.Logo || "/api/placeholder/100/100",
          phone: hospital.PhoneNumber || "",
          email: hospital.Email || "",
          exp: hospital.YearsOfExperience
            ? `${hospital.YearsOfExperience} years experience`
            : "Established Healthcare Provider",
          URL: hospital.Website || "#",
        }));

        setHospitals(formattedHospitals);
      }
    } catch (error) {
      console.error("Error fetching hospitals:", error);
      setHospitals([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch hospitals on component mount and when filters change
  useEffect(() => {
    fetchHospitals(activeTab, selectedCity);
  }, [activeTab, selectedCity]);

  // Dynamic hospital cards component
  const HospitalCard = ({ hospital }) => (
    <div className="mb-4 col-lg-4 col-md-6 col-12" key={hospital.id}>
      <div
        className="relative overflow-hidden bg-white border border-gray-300 rounded-lg shadow h-100 d-flex flex-column"
        style={{ minHeight: "600px", maxHeight: "650px" }}
      >
        {/* Top Banner Image */}
        <div className="relative flex-shrink-0 w-full h-32 sm:h-52">
          <img
            src={hospital.image}
            alt="hospital"
            className="object-cover w-full h-full"
            onError={(e) => {
              e.target.src = "/api/placeholder/400/300";
            }}
          />

          {/* Hospital Logo overlapping bottom-left */}
          <img
            src={hospital.logo}
            alt="hospital logo"
            className="absolute z-50 object-cover w-20 h-20 border-4 border-white rounded-full shadow -bottom-10 left-4 sm:left-6 sm:w-24 sm:h-24"
            onError={(e) => {
              e.target.src = "/api/placeholder/100/100";
            }}
          />
        </div>

        {/* Name + Experience */}
        <div className="flex-shrink-0 px-4 pt-2 sm:pt-2 sm:px-6">
          <div className="ml-24 sm:ml-32">
            <h5 className="text-base font-bold text-black break-words sm:text-lg">
              {hospital.name}
            </h5>
            <p className="text-xs text-gray-700 break-words sm:text-sm">
              {hospital.exp}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-4 space-y-3 sm:px-6 flex-grow-1">
          <div className="flex items-start space-x-2">
            <img
              src={locationIcon}
              alt="location"
              className="flex-shrink-0 w-5 sm:w-6"
            />
            <span className="text-sm text-black break-words sm:text-base">
              {hospital.location}
            </span>
          </div>
          <div className="flex items-start space-x-2">
            <img
              src={clockIcon}
              alt="clock"
              className="flex-shrink-0 w-5 sm:w-6"
            />
            <span className="text-sm text-black sm:text-base">
              Hours: {hospital.hours}
            </span>
          </div>
          <div className="flex items-start space-x-2">
            <img src={webIcon} alt="web" className="flex-shrink-0 w-5 sm:w-6" />
            <span className="text-sm text-black break-words sm:text-base">
              Website: <span className="text-blue-600">{hospital.URL}</span>
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col flex-shrink-0 gap-3 px-4 py-4 mt-auto sm:px-6">
          <button className="bg-[#52677D] text-white rounded-lg py-3 text-sm sm:text-base font-semibold">
            Book An Appointment
          </button>
          <button className="bg-white text-[#52677D] border border-gray-300 rounded-lg py-3 text-sm sm:text-base font-semibold">
            Send Treatment Query
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <div className="py-5 text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading hospitals...</p>
        </div>
      );
    }

    if (hospitals.length === 0) {
      return (
        <div className="py-5 text-center">
          <p className="text-gray-600">
            No hospitals found for the selected criteria.
          </p>
        </div>
      );
    }

    return (
      <div className="row">
        {hospitals.map((hospital) => (
          <HospitalCard key={hospital.id} hospital={hospital} />
        ))}
      </div>
    );
  };

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      partialVisibilityGutter: 20,
    },
    tablet: { breakpoint: { max: 1024, min: 767 }, items: 2 },
    mobile: { breakpoint: { max: 767, min: 0 }, items: 2 },
  };

  return (
    <>
      <Header />
      <section>
        <CommonBanner bannerData={hospitalData} />
      </section>
      <section className="spacing-top">
        <div className="container ">
          <div className="row">
            <div className="col-lg-8 col-12">
              <h2 className="fw-semibold ">Meet Our Hospitals Partners</h2>
              <p className="light-color">
                Empowering hospitals, physicians, and patients with real-time
                communication and clinical collaboration—because better care
                starts with better connection.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="mb-4 medical-tab-buttons">
              <Carousel
                arrows={false}
                responsive={responsive}
                containerClass="carousel-container w-full"
                itemClass="px-2"
                infinite
                partialVisible
              >
                <button
                  className={`cutom-tab-style ${
                    activeTab === "all" ? "activeTab" : "gray-btn-style"
                  }`}
                  onClick={() => setActiveTab("all")}
                >
                  All Hospitals
                </button>
                {medicalSpecialties.map((specialty) => (
                  <button
                    key={specialty._id}
                    className={`cutom-tab-style ${
                      activeTab === specialty._id
                        ? "activeTab"
                        : "gray-btn-style"
                    }`}
                    onClick={() => setActiveTab(specialty._id)}
                  >
                    {specialty.lookup_value}
                  </button>
                ))}
              </Carousel>
            </div>
            <div className="col-lg-2 col-12d-flex justify-content-end">
              <div className="mb-4">
                <div className="input-group" style={{ maxWidth: "216px" }}>
                  <span className="bg-white input-group-text border-end-0">
                    <img src={location1} alt="" />
                  </span>
                  <select
                    className="form-select border-start-0"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                  >
                    <option value="">Select City</option>
                    <option value="noida">Noida</option>
                    <option value="delhi">Delhi</option>
                    <option value="gurgaon">Gurgaon</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="bangalore">Bangalore</option>
                    <option value="pune">Pune</option>
                    <option value="hyderabad">Hyderabad</option>
                    <option value="chennai">Chennai</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div style={{ padding: 0 }}>{renderContent()}</div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default HospitalsPartners;
