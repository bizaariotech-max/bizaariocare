import HospitalsPartnersList from '../components/hospitals-partners/HospitalsPartnersList'
import location1 from '../assets/images/icons/location-light.svg'
import { useState } from 'react';
import PartnersListHome from './hospitals-partners/PartnersListHome';
import '../assets/css/Empowering.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useNavigate } from "react-router-dom";

// import Header from '../AppLayout/Header'
// import Footer from '../AppLayout/Footer'

const HospitalPartenerHome = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeTab) {
      case "tab1":
        return (
          <div className="row">
            <PartnersListHome />
          </div>
        );
      case "tab2":
        return (
          <div className="row">
            <PartnersListHome />
          </div>
        );
      case "tab3":
        return (
          <div className="row">
            <PartnersListHome />
          </div>
        );
      case "tab4":
        return (
          <div className="row">
            <PartnersListHome />
          </div>
        );
      case "tab5":
        return (
          <div className="row">
            <PartnersListHome />
          </div>
        );
      case "tab6":
        return (
          <div className="row">
            <PartnersListHome />
          </div>
        );
      case "tab7":
        return (
          <div className="row">
            <PartnersListHome />
          </div>
        );
        return null;
    }
  };

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 6 },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
      partialVisibilityGutter: 20,
    },
    tablet: { breakpoint: { max: 1024, min: 767 }, items: 2 },
    mobile: { breakpoint: { max: 767, min: 0 }, items: 2 },
  };

  return (
    <div className="mt-2">
      <section className="spacing-top empoering-section partner-list-home">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-12">
              <h2 className="fw-semibold">Partner Hospitals</h2>
              <p className="light-color">
                World-class healthcare instituatins with advanced facilities and
                trusted care.
              </p>
            </div>
            <div className="p-0 col-lg-4 col-12 d-flex justify-content-lg-end align-items-start">
              <button
                className="view-all"
                onClick={() => navigate("/view-all-hospitals")}
              >
                View All &#8594;
              </button>
            </div>

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
                  className={`cutom-tab-style ${
                    activeTab === "tab1" ? "activeTab" : "gray-btn-style"
                  }`}
                  onClick={() => setActiveTab("tab1")}
                >
                  Delhi NCR
                </button>
                <button
                  className={`cutom-tab-style ${
                    activeTab === "tab2" ? " activeTab" : "gray-btn-style"
                  }`}
                  onClick={() => setActiveTab("tab2")}
                >
                  Mumbai
                </button>
                <button
                  className={`cutom-tab-style ${
                    activeTab === "tab3" ? "activeTab" : "gray-btn-style"
                  }`}
                  onClick={() => setActiveTab("tab3")}
                >
                  Bengaluru
                </button>
                <button
                  className={`cutom-tab-style ${
                    activeTab === "tab4" ? "activeTab" : "gray-btn-style"
                  }`}
                  onClick={() => setActiveTab("tab4")}
                >
                  Noida
                </button>
                <button
                  className={` cutom-tab-style ${
                    activeTab === "tab5" ? "activeTab" : "gray-btn-style"
                  }`}
                  onClick={() => setActiveTab("tab5")}
                >
                  Delhi NCR
                </button>
                <button
                  className={` cutom-tab-style ${
                    activeTab === "tab7" ? "activeTab" : "gray-btn-style"
                  }`}
                  onClick={() => setActiveTab("tab7")}
                >
                  Mumbai
                </button>
                <button
                  className={` cutom-tab-style ${
                    activeTab === "tab6" ? "activeTab" : "gray-btn-style"
                  }`}
                  onClick={() => setActiveTab("tab6")}
                >
                  Bengaluru
                </button>
              </Carousel>
            </div>
            <div className="col-lg-2 col-12d-flex justify-content-end">
              <div className="mb-4">
                <div className="input-group" style={{ maxWidth: "216px" }}>
                  <span className="bg-white input-group-text border-end-0">
                    <img src={location1} alt="" />
                  </span>
                  <select className="form-select border-start-0">
                    <option value="">Select Country</option>
                    <option value="">India</option>
                    <option value="">USA</option>
                    <option value="">Sri Lanka</option>
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
    </div>
  );
};

export default HospitalPartenerHome