import React from "react";
import "../Admin/admincss/adminsidebar.css";
import logo from '../Admin/images/image 12 (1).png'
import dashboardicon from '../Admin/images/dashboard-2-svgrepo-com 1.png'
import addhospitalicon from '../Admin/images/user-plus-alt-1-svgrepo-com 1.png'
import continenticon from '../Admin/images/continent-svgrepo-com 1.png'
import countrymasterlogo from '../Admin/images/country-flag-flag02-svgrepo-com 1.png'
import countrygorupmastericon from '../Admin/images/country-flag-flags-svgrepo-com 1.png'
import lookuptableicon from '../Admin/images/table-cells-svgrepo-com 1.png'
import kyctypemastericon from '../Admin/images/square-user-check-svgrepo-com 1.png'
import idverificationicon from '../Admin/images/verification-svgrepo-com 1.png'
import primaryuserloginicon from '../Admin/images/id-card-svgrepo-com 1.png'
import userrequesttypemastericon from '../Admin/images/user-svgrepo-com 1.png'
import relationshipmastericon from '../Admin/images/relationship-svgrepo-com 1.png'
import rolemastericon from '../Admin/images/user-role-svgrepo-com 1.png'
import securityicon from '../Admin/images/security-2-svgrepo-com 1.png'
import socialmediaicon from '../Admin/images/hashtag-svgrepo-com 1.png'
import userdenialicon from '../Admin/images/user-xmark-alt-1-svgrepo-com 1.png'
import userrequestreasonicon from '../Admin/images/user-question-alt-svgrepo-com 1.png'
import { useNavigate } from "react-router-dom";






const menuItems = [
  { icon: dashboardicon, label: "Dashboard",path:"/admindashboard" },
  { icon: addhospitalicon, label: "Add Doctor/Hospitals",path:"/adddoctor" },
  { icon: continenticon, label: "Continent Master" },
  { icon: countrymasterlogo, label: "Country Master" },
  { icon: countrygorupmastericon, label: "Country Group Master" },
  { icon: lookuptableicon, label: "Lookup Table" },
  { icon: kyctypemastericon, label: "KYC Type Master" },
  { icon: idverificationicon, label: "Id Verification Status" },
  { icon: primaryuserloginicon, label: "Primary Login Type Master" },
  { icon: userrequesttypemastericon, label: "User Request Type Master" },
  { icon: relationshipmastericon, label: "Relationship Master" },
  { icon: rolemastericon, label: "Role Master" },
  { icon: securityicon, label: "Security Question Master" },
  { icon: socialmediaicon, label: "Social Media Asset Master" },
  { icon: userdenialicon, label: "User Request Denial Reason" },
  { icon: userrequestreasonicon, label: "User Request Reason Master" },
];


const Adminsidebar = () => {

  const navigate=useNavigate()

    return (
  <aside className="sidebar">
    <div className="sidebar-header">
      <img src={logo} alt="Logo" className="sidebar-logo" />
      {/* <span className="brand">Starapollo</span> */}
    </div>
    <ul className="sidebar-menu">
      {menuItems.map((item, idx) => (
        <li key={idx} onClick={()=>navigate(`${item.path}`)}>
          <img src={item.icon} alt={`${item.label} icon`} className="sidebar-icon" />
          <span>{item.label}</span>
        </li>
      ))}
    </ul>
  </aside>
    )
}

export default Adminsidebar;
