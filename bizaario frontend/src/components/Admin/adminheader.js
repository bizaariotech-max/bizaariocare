import React from "react";
import '../Admin/admincss/adminheader.css';
import bellicon from '../Admin/images/bell-line-icon 1.png'
import messageicon from '../Admin/images/envelope-line-icon 1.png'
import adminlogo from '../Admin/images/Ellipse 1.png'
import divider from '../Admin/images/Line 3.png'

const languages = [
  { code: "en", label: "English", icon: "🇬🇧" },
  { code: "fr", label: "French", icon: "🇫🇷" },
  { code: "es", label: "Spanish", icon: "🇪🇸" },
];
const Adminheader = () => (

  
  <header className="header">
    {/* Left: Logo and Search */}
    <div className="header-left">
      {/* <img src="/logo.png" alt="Logo" className="header-logo" /> */}
      <div className="search-bar">
        <input type="text" placeholder="Search here..." />
        <button>
          <i className="fa fa-search"></i>
        </button>
      </div>
    </div>
    {/* Right: User Info */}
    <div className="header-right">
      <select>
        {
          languages.map((lang)=>
          (
            <option>{lang.label}</option>
          ))
        }
      </select>
      <img className="bellicon" src={bellicon} alt=""></img>
      <img src={messageicon} style={{width:"37px"}} alt=""></img>
      <div className="divider"></div>
      <div className="profile">
        <img src={adminlogo} alt="User" />
        <span>Admin User</span>
      </div>
    </div>
  </header>
);

export default Adminheader;
