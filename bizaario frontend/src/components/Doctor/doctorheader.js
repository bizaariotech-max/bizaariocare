import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState,useRef,useEffect } from 'react';
import bellicon from '../../assets/images/bellicon.png'
import messageicon from '../../assets/images/mail.png'
import api from '../../api'

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

    const[user,setuser]=useState({})
    const getdoctorby_id=async()=>
    {
      try {
        const resp=await api.get(`api/v1/admin/GetAsset/${doctordetails._id}`)
        setuser(resp.data.data)
        
      } catch (error) {
        console.log(error);
        
      }
    }
    useEffect(()=>
    {
      getdoctorby_id()
    },[])
  
  
    

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
         <header className="bg-[#F6F7FF] shadow-sm px-4 sm:px-6 lg:px-9 py-3 flex flex-col lg:flex-row items-stretch lg:items-center gap-3 sm:gap-4 justify-between relative">
  {/* Search Bar */}
 <div className="w-full lg:w-auto flex flex-row items-center order-2 lg:order-1 pl-12 sm:pl-8  lg:pl-80">
  <input
    type="text"
    placeholder="Search by keyword..."
    className="w-52 sm:w-72 md:w-80 px-3 py-2 sm:px-5 sm:py-4 h-10 sm:h-14 bg-[#E9EBFF] rounded-l-lg text-sm placeholder:text-black/50 outline-none"
  />
  <button className="px-3 sm:px-5 h-10 sm:h-14 bg-[#52677D] rounded-r-lg hover:bg-[#e5630a] transition-colors flex items-center justify-center">
    <SearchIcon className="w-4 h-4 sm:w-5 sm:h-5" />
  </button>
</div>


  {/* Right Controls */}
  <div className="flex flex-row flex-wrap items-center gap-3 sm:gap-4 lg:gap-8 order-3 lg:order-2 w-full lg:w-auto justify-between lg:justify-end mt-2 lg:mt-0">
    {/* Language Selector */}
    <div className="flex items-center gap-2 px-2 sm:px-3 py-2 border border-[#F86F03] rounded-lg cursor-pointer hover:bg-[#F86F03]/10 transition-colors">
      <div className="w-4 h-4 bg-[#525FE1] rounded-sm flex items-center justify-center"><span className="text-white text-xs">अ</span></div>
      <span className="text-black/50 text-xs sm:text-sm">English</span>
      <ChevronDownIcon />
    </div>
    {/* Notifications */}
    <div className="flex items-center gap-3 sm:gap-4">
      <div className="relative cursor-pointer" aria-label="Notifications">
        {/* <img src={bellicon} alt=''></img> */}
        <BellIcon/>
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#BDC4D4] rounded-full flex items-center justify-center">
          <span className="text-black text-[10px] font-normal">1</span>
        </div>
      </div>
      <div className="relative cursor-pointer" aria-label="Messages">
        <MailIcon />
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#BDC4D4] rounded-full flex items-center justify-center">
          <span className="text-black text-[10px] font-normal">5</span>
        </div>
      </div>
    </div>
    {/* Divider: only desktop */}
    <div className="hidden sm:block w-px h-8 sm:h-12 bg-black/20"></div>
    {/* Profile */}
    <div className="flex items-center gap-2 sm:gap-3 cursor-pointer relative"
         onClick={() => setIsOpen(!isOpen)} aria-label="User profile picture">
      <div
        className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-300 rounded-full bg-cover bg-center"
        style={{ backgroundImage: `url(${user?.ProfilePicture})` }}
      ></div>
      {/* Hide text on xs screens to avoid overflow */}
      <div className=" xs:block">
        <div className="text-black text-xs sm:text-sm truncate max-w-[auto]">{`Hello ${doctordetails?.AssetName}`}</div>
        <div className="text-black/50 text-xs sm:text-sm truncate max-w-[auto]">Doctor</div>
      </div>
      {isOpen && (
       <div
  ref={dropdownRef}
  className="absolute right-0 sm:right-2 top-14 mt-2 w-44 sm:w-48 bg-white shadow-lg rounded-2xl border border-gray-200 z-50 overflow-hidden"
>
  <ul className="py-2">
    {/* Profile */}
    <li
      onClick={() => navigate('/change-password')}
      className="flex items-center gap-3 px-4 py-3  cursor-pointer transition duration-200 ease-in-out"
    >
    
      <span className="text-gray-700 font-medium">Change Password</span>
    </li> 

    {/* Divider */}
 <li className="border-t border-gray-200 mx-4"></li>

    {/* Logout */}
    <li
      className="flex items-center gap-3 px-4 py-3  cursor-pointer transition duration-200 ease-in-out"
    >
     
      <span className="text-red-600 font-medium">Logout</span>
    </li>
  </ul>
</div>

      )}
    </div>
  </div>
</header>

<div class="modal fade" id="changePasswordModal" tabindex="-1" aria-labelledby="changePasswordModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      
    
      <div class="modal-header">
        <h5 class="modal-title" id="changePasswordModalLabel">Change Password</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      
    
      <div class="modal-body">
        <form id="changePasswordForm">
          <div class="mb-3">
            <label for="currentPassword" class="form-label">Current Password</label>
            <input type="password" class="form-control" id="currentPassword" placeholder="Enter current password" required/>
          </div>
          <div class="mb-3">
            <label for="newPassword" class="form-label">New Password</label>
            <input type="password" class="form-control" id="newPassword" placeholder="Enter new password" required/>
          </div>
          <div class="mb-3">
            <label for="confirmPassword" class="form-label">Confirm New Password</label>
            <input type="password" class="form-control" id="confirmPassword" placeholder="Confirm new password" required/>
          </div>
        </form>
      </div>
      
   
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="submit" class="btn btn-primary" form="changePasswordForm">Update Password</button>
      </div>
      
    </div>
  </div>
</div>


    </div>
  )
}

export default Doctorheader
