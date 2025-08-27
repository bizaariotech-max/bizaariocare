import React, { useState } from "react";
import "../Admin/admincss/adminsidebar.css";
import logo from '../Admin/images/image 12 (1).png'
import dashboardicon from '../Admin/images/dashboard-2-svgrepo-com 1.png'
import addhospitalicon from '../Admin/images/user-plus-alt-1-svgrepo-com 1.png'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const menuItems = [
  { icon: dashboardicon, label: "Dashboard", path: "/admindashboard" },
  {
    icon: addhospitalicon,
    label: "Configuration",
    children: [
      {icon: addhospitalicon, label: "Country Group Master", path: "/addcountry_group_master" },
      {icon: addhospitalicon, label: "Org Unit Master", path: "/add-org-master" },
      {icon: addhospitalicon, label: "Medical Speciality", path: "/add-medical-specility" },
      {icon: addhospitalicon, label: "Service Category", path: "/add-service-category" },
      {icon: addhospitalicon, label: "Content Type", path: "/add-content-type" },
      {icon: addhospitalicon, label: "Event Type", path: "/add_event_type_master" },
      {icon: addhospitalicon, label: "Asset Category", path: "/addassest_category_master" },
      {icon: addhospitalicon, label: "Subscription Type Master", path: "/add-subscription" }
    ]

  },
  { icon: addhospitalicon, label: "Station Master", path: "/adddoctor" },
  { icon: addhospitalicon, label: "Add Doctor/Hospitals", path: "/adddoctor" },
  { icon: addhospitalicon, label: "Create Patient Profile", path: "/addpatientdetails" },
  { icon: addhospitalicon, label: "Logout" },
];

const Adminsidebar = () => {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);

  const logout = () => {
    Swal.fire({
      icon: "success",
      title: "Logout",
      text: "Your Are Successfully Logout...",
      showConfirmButton: true,
      customClass: {
        confirmButton: 'my-swal-button',
      },
    }).then(() => {
      navigate('/')
    })
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img src={logo} alt="Logo" className="sidebar-logo" />
      </div>
      <ul className="sidebar-menu">
        {menuItems.map((item, idx) => (
          <React.Fragment key={idx}>
            <li
              onClick={() => {
                if (item.label.toLowerCase() === "logout") {
                  logout();
                } else if (item.children) {
                  setOpenDropdown(openDropdown === idx ? null : idx);
                } else {
                  navigate(item.path);
                }
              }}
              className="sidebar-item"
            >
              <img src={item.icon} alt={`${item.label} icon`} className="sidebar-icon" />
              <span>{item.label}</span>
            </li>

            {/* Render dropdown BELOW, not right side */}
            {item.children && openDropdown === idx && (
              <ul className="sidebar-submenu">
                {item.children.map((child, cIdx) => (
                  <li
                    key={cIdx}
                    className="sidebar-subitem"
                    onClick={() => navigate(child.path)}
                    style={{marginLeft:"10%"}}
                  >
                      <img src={item.icon} alt={`${item.label} icon`} className="sidebar-icon" />
                    <span>{child.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </React.Fragment>
        ))}
      </ul>
    </aside>
  )
}

export default Adminsidebar;
