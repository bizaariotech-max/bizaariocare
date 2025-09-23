import React, { useState, useEffect } from "react";
import "../Admin/admincss/adminsidebar.css";
import logo from "../../assets/images/bizaariowhite.png";
import dashboardicon from "../../assets/images/dashboardicon.png";
import addhospitalicon from "../Admin/images/user-plus-alt-1-svgrepo-com 1.png";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { patch } from "@mui/material";

const menuItems = [
  { icon: dashboardicon, label: "Dashboard", path: "/doctordashboard" },
  {icon: addhospitalicon,label: "Digital CME",path:"/createdigitalcme"},
  { icon: addhospitalicon, label: "News Articles", path: "/news_and_articles" },
  { icon: addhospitalicon, label: "Awards & Recognitions", path: "/awards-and-recognitions" },
  { icon: addhospitalicon, label: "Patient Testimonials", path: "/patient-testimonials" },
  { icon: addhospitalicon, label: "OPD/ Surgical Camps", path: "/opd-srugicla-camps" },
  { icon: addhospitalicon, label: "Workshop", path: "/workshop" },
  // { icon: addhospitalicon, label: "Create Sub-Admin", path: "/createsubadmin" },
  { icon: addhospitalicon, label: "Complete Doctor Profile", path: "/complete-doctor-details" },
   { icon: addhospitalicon, label: "Patient Referral", path: "/patient-referral" },

  { icon: addhospitalicon, label: "Logout" },
];

const Doctorsidebar = () => {
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


export default Doctorsidebar;
