import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState,useRef,useEffect } from 'react';

function Doctorheader() {

    const navigate=useNavigate()

    const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

   // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


    const doctortokens= localStorage.getItem('token');
    const doctordetails = JSON.parse(localStorage.getItem("user"));

 
    
    

    const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 21L16.514 16.506M19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BellIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);



  return (
    <div>
         {/* Header */}
              <header className="bg-white shadow-sm px-6 lg:px-9 py-3 flex h-18 flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-0 justify-between">
                {/* Search Bar */}
                <div className="flex items-center w-full lg:w-auto">
                  <div className="flex w-full lg:w-auto" style={{paddingLeft:"60%"}}>
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-80 max-w-full px-5 py-4 h-14 bg-[#E9EBFF] rounded-l-lg text-sm placeholder:text-black/50 outline-none"
                    />
                    <button className="px-5 py-0 h-14 bg-[#F86F03] rounded-r-lg hover:bg-[#e5630a] transition-colors">
                      <SearchIcon />
                    </button>
                  </div>
                </div>
      
                {/* Right Side Controls */}
                <div className="flex items-center gap-4 lg:gap-8">
                  {/* Language Selector */}
                  <div className="flex items-center gap-3 px-3 py-2 border border-[#F86F03] rounded-lg cursor-pointer hover:bg-[#F86F03]/10 transition-colors">
                    <div className="w-4 h-4 bg-[#525FE1] rounded-sm flex items-center justify-center">
                      <span className="text-white text-xs">अ</span>
                    </div>
                    <span className="text-black/50 text-sm">English</span>
                    <ChevronDownIcon />
                  </div>
      
                  {/* Notifications */}
                  <div className="flex items-center gap-4">
                    <div className="relative cursor-pointer" aria-label="Notifications">
                      <BellIcon />
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#FFA41B] rounded-full flex items-center justify-center">
                        <span className="text-white text-[10px] font-normal">1</span>
                      </div>
                    </div>
                    <div className="relative cursor-pointer" aria-label="Messages">
                      <MailIcon />
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#FFA41B] rounded-full flex items-center justify-center">
                        <span className="text-white text-[10px] font-normal">5</span>
                      </div>
                    </div>
                  </div>
      
                  {/* Divider */}
                  <div className="w-px h-12 bg-black/20"></div>
      
                  {/* User Profile */}
                  <div className="flex items-center gap-3 cursor-pointer">
                    <div
                      className="w-12 h-12 bg-gray-300 rounded-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${doctordetails.user.profile_pic})`,
                      }}
                       onClick={() => setIsOpen(!isOpen)}
                      aria-label="User profile picture"
                    ></div>
                    <div>
                      <div className="text-black text-sm">Hello {doctordetails.user.firstName}</div>
                      <div className="text-black/50 text-sm">Doctor</div>
                    </div>

                     {/* Dropdown Menu */}
      {isOpen && (
       <div
  ref={dropdownRef}
  className="absolute right-6 mt-60 w-48 bg-white shadow-xl rounded-xl border border-gray-200 z-50 transform origin-top-right transition-all duration-200 ease-out scale-95 hover:scale-100"
>
  <ul className="py-2">
    <li onClick={()=>navigate('/editdoctorprofile')} className="px-0 py-2 flex items-center gap-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150">
      <svg
        className="w-5 h-5 text-blue-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M5.121 17.804A9.937 9.937 0 0112 15c2.21 0 4.21.721 5.879 1.927M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      Profile
    </li>

    <li className="px-0 py-3 flex items-center gap-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150">
      <svg
        className="w-5 h-5 text-green-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M10.325 4.317a1 1 0 011.35-.936l.123.048 1.56.624a8.018 8.018 0 014.69 7.58 8.018 8.018 0 01-4.69 7.58l-1.56.624a1 1 0 01-1.348-.915V4.31z" />
      </svg>
      Settings
    </li>

    <li className="px-0 py-3 flex items-center gap-3 hover:bg-red-50 cursor-pointer transition-colors duration-150 text-red-600">
      <svg
        className="w-5 h-5 text-red-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M17 16l4-4m0 0l-4-4m4 4H7" />
      </svg>
      Logout
    </li>
  </ul>
</div>

      )}

                  </div>
                </div>
              </header>
    </div>
  )
}

export default Doctorheader
