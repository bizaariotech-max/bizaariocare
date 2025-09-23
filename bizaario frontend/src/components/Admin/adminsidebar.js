import React, { useState, useEffect } from "react";
import "../Admin/admincss/adminsidebar.css";
import logo from "../../assets/images/bizaariowhite.png";
import dashboardicon from "../../assets/images/dashboardicon.png";
import addhospitalicon from "../Admin/images/user-plus-alt-1-svgrepo-com 1.png";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const menuItems = [
  { icon: dashboardicon, label: "Dashboard", path: "/admindashboard" },
  {
    icon: addhospitalicon,
    label: "Configuration",
    children: [
      { icon: addhospitalicon, label: "Country Group Master", path: "/addcountry_group_master" },
      { icon: addhospitalicon, label: "Org Unit Master", path: "/add-org-master" },
      { icon: addhospitalicon, label: "Medical Speciality", path: "/add-medical-specility" },
      { icon: addhospitalicon, label: "Service Category", path: "/add-service-category" },
      { icon: addhospitalicon, label: "Content Type", path: "/add-content-type" },
      { icon: addhospitalicon, label: "Event Type", path: "/add_event_type_master" },
      { icon: addhospitalicon, label: "Asset Category Level 1", path: "/addassest_category_master" },
      { icon: addhospitalicon, label: "Asset Category Level 2", path: "/addassest_category_master_level2" },
      { icon: addhospitalicon, label: "Asset Category Level 3", path: "/addassest_category_master_level3" },
      { icon: addhospitalicon, label: "Subscription Type Master", path: "/add-subscription" },
      { icon: addhospitalicon, label: "Relationship Master", path: "/add-relationship-master" },
      { icon: addhospitalicon, label: "Insurance Provider Master", path: "/add-insuranceprovider-master" },
    ],
  },
  { icon: addhospitalicon, label: "Station Master", path: "/add-stationmaster" },
  { icon: addhospitalicon, label: "Asset Master", path: "/add-assestmaster" },
  { icon: addhospitalicon, label: "Login Master", path: "/login-master" },
  // { icon: addhospitalicon, label: "Add Doctor/Hospitals", path: "/adddoctor" },
  // { icon: addhospitalicon, label: "Create Patient Profile", path: "/addpatientdetails" },
  { icon: addhospitalicon, label: "Content Master", path: "/content-master" },
  { icon: addhospitalicon, label: "Event Master", path: "/event-master" },

   {
    icon: addhospitalicon,
    label: "Bizaario Master Section",
    children: [
      { icon: addhospitalicon, label: "Patient Referral Type", path: "/patient-referral-type" },
  { icon: addhospitalicon, label: "Symptom Class Master", path: "/symptom-class-master" },
  { icon: addhospitalicon, label: "Symptom Master", path: "/symptom-master" },
  { icon: addhospitalicon, label: "Aggravating Factor Master", path: "/aggravating-factor-master" },
  { icon: addhospitalicon, label: "Pharmeceutical Salt Type Master", path: "/pharmaceutical-salt-type-master" },
  { icon: addhospitalicon, label: "Pharmaceutical Salt Master", path: "/pharmaceutical-salt-master" },
  { icon: addhospitalicon, label: "Dosage Master", path: "/dosage-type-master" },
  { icon: addhospitalicon, label: "Medicine Frequency Master", path: "/medicine-frequency-master" },
  { icon: addhospitalicon, label: "Therapy Master", path: "/therapy-master" },
  { icon: addhospitalicon, label: "Procedure Master", path: "/procedure-master" },
  { icon: addhospitalicon, label: "Disease Master", path: "/disease-master" },
  { icon: addhospitalicon, label: "Allergy Category Master", path: "/allergy-category-master" },
  { icon: addhospitalicon, label: "Allergy Master", path: "/allergy-master" },
  { icon: addhospitalicon, label: "Truma Category Master", path: "/truma-category-master" },
  { icon: addhospitalicon, label: "Trauma Master", path: "/trauma-master" },
  { icon: addhospitalicon, label: "Occupation Category Master", path: "/occupation-category-master" },
  { icon: addhospitalicon, label: "Occupation Master", path: "/occupation-master" },
  { icon: addhospitalicon, label: "Habit Category Master", path: "/habit-category-master" },
  { icon: addhospitalicon, label: "Habit Master", path: "/habit-master" },
  { icon: addhospitalicon, label: "Reason For Referral Master", path: "/reason-for-referral-master" },
  { icon: addhospitalicon, label: "Investigation Category Master", path: "/investigation-category-master" },
  { icon: addhospitalicon, label: "Investigation Master", path: "/investigation-master" },
  { icon: addhospitalicon, label: "Diagnosis Master", path: "/diagnosis-master" },
  { icon: addhospitalicon, label: "Diagnosis Type Master", path: "/diagnosis-type-master" },
  { icon: addhospitalicon, label: "Lifestyle Intervention Master", path: "/lifestyle-intervention-master" },
  { icon: addhospitalicon, label: "Second Opinion Query Master", path: "/second-opinion-query-master" },
  { icon: addhospitalicon, label: "Comorbidity Master", path: "/comorbidity-master" },
  { icon: addhospitalicon, label: "Risk Factor Master", path: "/risk-factor-master" },
  { icon: addhospitalicon, label: "Patient Concern Master", path: "/patient-concern-master" },
  { icon: addhospitalicon, label: "Logistical Consideration Master", path: "/logistical-consideration-master" },
    ],
  },
   { icon: addhospitalicon, label: "Health Profilling Questions", path: "/health-profilling-questions" },

  { icon: addhospitalicon, label: "Logout" },
];

const Adminsidebar = () => {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(
    Number(localStorage.getItem("openDropdown")) || null
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 🔹 NEW STATE
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    document.body.classList.toggle("sidebar-collapsed");
  };


  const handleDropdownClick = (idx) => {
    const newDropdown = openDropdown === idx ? null : idx;
    setOpenDropdown(newDropdown);
    localStorage.setItem("openDropdown", newDropdown ?? "");
  };

  const logout = () => {
    Swal.fire({
      icon: "success",
      title: "Logout",
      text: "You are successfully logged out.",
      showConfirmButton: true,
      customClass: { confirmButton: "my-swal-button" },
    }).then(() => navigate("/"));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isMobileMenuOpen &&
        !e.target.closest(".sidebar") &&
        !e.target.closest(".menu-toggle")
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Toggle button for mobile */}
      <button
        className="menu-toggle lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-200 rounded-lg"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`sidebar ${isMobileMenuOpen ? "sidebar-open" : ""} ${
          isCollapsed ? "sidebar-collapsed" : ""
        }`}
      >
        <div className="sidebar-header">
          <img src={logo} alt="Logo" className="sidebar-logo" />
          {/* 🔹 Collapse button */}
          <button
            className="collapse-btn"
            onClick={()=>toggleSidebar()}
          >
            {isCollapsed ? "»" : "«"}
          </button>
        </div>

        <ul className="sidebar-menu">
          {menuItems.map((item, idx) => (
            <React.Fragment key={idx}>
              <li
                onClick={() => {
                  if (item.label.toLowerCase() === "logout") {
                    logout();
                  } else if (item.children) {
                    handleDropdownClick(idx);
                  } else {
                    navigate(item.path);
                    setIsMobileMenuOpen(false);
                  }
                }}
                 className={`sidebar-item ${
                item.label.toLowerCase() === "logout" ? "logout-item" : ""
              } ${openDropdown === idx ? "active" : ""}`}
              >
                <img
                  src={item.icon}
                  alt={`${item.label} icon`}
                  className="sidebar-icon"
                  style={{ height: "18px", width: "18px" }}
                />
                {!isCollapsed && (
                  <span className="sidebar-label">{item.label}</span>
                )}
              </li>

              {item.children && openDropdown === idx && !isCollapsed && (
                <ul className="sidebar-submenu">
                  {item.children.map((child, cIdx) => (
                    <li
                      key={cIdx}
                      className="sidebar-subitem"
                      onClick={() => navigate(child.path)}
                    >
                      <img
                        src={child.icon}
                        alt={`${child.label} icon`}
                        className="sidebar-icon"
                        style={{ height: "16px", width: "16px" }}
                      />
                      <span>{child.label}</span>
                    </li>
                  ))}
                </ul>
              )}
            </React.Fragment>
          ))}
        </ul>
      </aside>
    </>
  );
};


export default Adminsidebar;
