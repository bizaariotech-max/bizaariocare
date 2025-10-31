import React, { useState, useEffect } from "react";
import "../Admin/admincss/adminsidebar.css";
import logo from "../../assets/images/bizaariowhite.png";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import dashboardicon from "../Doctor/Icon/Dashboard.svg";
import digitalcme from "../Doctor/Icon/CME.svg";
import newsarticle from "../Doctor/Icon/News.svg";
import awards_and_recognitions from "../Doctor/Icon/Award.svg";
import testimonials from "../Doctor/Icon/Testimonals.svg";
import opd_surgical_camps from "../Doctor/Icon/surgery.svg";
import workshop from "../Doctor/Icon/Workshop.svg";
import completdoctorprofile from "../Doctor/Icon/Dr. Profile.svg";
import patientreferral from "../Doctor/Icon/Patient Reffral.svg";
import logout from "../Doctor/Icon/Logout.svg";


// Not in use but kept for reference
const menuItems = [
  { icon: dashboardicon, label: "Dashboard", path: "/hospitaldashboard" },
  { icon: digitalcme, label: "Digital CME", path: "/createdigitalcme" },
  { icon: newsarticle, label: "News Articles", path: "/news_and_articles" },
  {
    icon: awards_and_recognitions,
    label: "Awards & Recognitions",
    path: "/awards-and-recognitions",
  },
  {
    icon: testimonials,
    label: "Patient Testimonials",
    path: "/patient-testimonials",
  },
  {
    icon: opd_surgical_camps,
    label: "OPD/ Surgical Camps",
    path: "/opd-srugicla-camps",
  },
  { icon: workshop, label: "Workshop", path: "/workshop" },
  // { icon: addhospitalicon, label: "Create Sub-Admin", path: "/createsubadmin" },
  {
    icon: completdoctorprofile,
    label: "Complete Hospital Profile",
    path: "/complete-doctor-details",
  },

  { icon: logout, label: "Logout" },
];

const HospitalSidebar = () => {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState();
  // Number(localStorage.getItem("openDropdown")) || null
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
    // Clear all items from localStorage
    localStorage.clear();
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
        className="fixed z-50 p-2 bg-gray-200 rounded-lg menu-toggle lg:hidden top-4 left-4"
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
          <button className="collapse-btn" onClick={() => toggleSidebar()}>
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

export default HospitalSidebar;
