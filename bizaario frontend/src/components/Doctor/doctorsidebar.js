import React from 'react'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Doctorsidebar() {

    const navigate=useNavigate()

    const ServicesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 11H15L13 13.5L11 16L9 13.5L9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 5C2 4.44772 2.44772 4 3 4H21C21.5523 4 22 4.44772 22 5V19C22 19.5523 21.5523 20 21 20H3C2.44772 20 2 19.5523 2 19V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LogoutIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="16,17 21,12 16,7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="21" y1="12" x2="9" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const DashboardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CreateCourseIcon = () => (
  <svg width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  xmlns="http://www.w3.org/2000/svg" >
    <path  d="M3 4H10V20H3V4Z" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    {/* Book Right */}
    <path 
      d="M14 4H21V20H14V4Z" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    {/* Center Divider */}
    <line 
      x1="12" 
      y1="4" 
      x2="12" 
      y2="20" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
    />
    {/* Plus Sign */}
    <line 
      x1="8" 
      y1="10" 
      x2="8" 
      y2="14" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
    />
    <line 
      x1="6" 
      y1="12" 
      x2="10" 
      y2="12" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
    />
  </svg>
);

const CreateDigitalCMEIcon = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Screen/Device Shape */}
    <rect 
      x="3" y="5" width="14" height="14" 
      rx="2" ry="2" 
      stroke="currentColor" 
      strokeWidth="2" 
      fill="none" 
    />
    {/* Play Button (triangle) to represent digital media */}
    <polygon 
      points="9,9 15,12 9,15" 
      fill="currentColor" 
    />
    {/* Plus Sign Circle */}
    <circle 
      cx="19" 
      cy="7" 
      r="3" 
      fill="white" 
      stroke="currentColor" 
      strokeWidth="2" 
    />
    <line 
      x1="19" y1="5" x2="19" y2="9" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
    />
    <line 
      x1="17" y1="7" x2="21" y2="7" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
    />
  </svg>
);


const logout=()=>
{

  localStorage.removeItem("token")
  localStorage.removeItem("user")
            Swal.fire({
                icon:"success",
                title:"Logout",
                text:"Logout Successfully...",
                showConfirmButton:true,
                 customClass: {
                confirmButton: 'my-swal-button',
              },
              }).then(()=>
              {
                window.location.reload()
              })
  navigate('/')
}



function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <div>

         <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#525FE1] text-white rounded-lg"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>
         {/* Sidebar */}
     <div
  className={cn(
    "fixed left-0 top-0 h-full w-54 bg-[#525FE1] transform transition-transform duration-300 z-40",
    isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
  )}
>

        {/* Logo */}
        <div className="h-36 flex items-center justify-center bg-[#525FE1] px-4">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/3e4c9ee49639e779e7878a3e4f41fdc1250f9c9d?width=240"
            alt="MedAid Logo"
            className="w-30 h-auto max-w-full"
          />
        </div>

        {/* Navigation */}
        <nav className="px-2 py-0 space-y-6">
          <div>
            {/* <h3 className="text-white text-base font-semibold mb-4">Dashboard</h3> */}
            <div className="space-y-0">
              {/* Dashboard Active */}
              <div onClick={()=>navigate('/doctordashboard')} className="flex items-center gap-3 px-3 py-3  rounded-lg hover:bg-white hover:text-[blue] cursor-pointer">
                <DashboardIcon />
                <span className="text-[white] text-sm font-semibold hover:text-[blue]">Dashboard</span>
              </div>

               <div onClick={()=>navigate('/createnewcourse')} className="flex items-center gap-3 px-3 py-3  rounded-lg hover:bg-white hover:text-[blue] cursor-pointer">
                <CreateCourseIcon />
                <span className="text-[white] text-sm font-semibold hover:text-[blue]">Create New Course</span>
              </div>

                <div onClick={()=>navigate('/createdigitalcme')} className="flex items-center gap-3 px-3 py-3  rounded-lg hover:bg-white hover:text-[blue] cursor-pointer">
                <CreateDigitalCMEIcon />
                <span className="text-[white] text-sm font-semibold hover:text-[blue]">Create Digital CME</span>
              </div>

               <div onClick={()=>navigate('/createdigitalcmequestionbank')} className="flex items-center gap-3 px-3 py-3  rounded-lg hover:bg-white hover:text-[blue] cursor-pointer">
                <CreateCourseIcon />
                <span className="text-[white] text-sm font-semibold hover:text-[blue]">Create Question Bank</span>
              </div>

                <div onClick={()=>navigate('/createsubadmin')} className="flex items-center gap-3 px-3 py-3  rounded-lg hover:bg-white hover:text-[blue] cursor-pointer">
                <CreateCourseIcon />
                <span className="text-[white] text-sm font-semibold hover:text-[blue]">Create Sub-Admin</span>
              </div>

               {/* <div className="flex items-center gap-3 px-3 py-3  rounded-lg hover:bg-white cursor-pointer">
                <DashboardIcon />
                <span className="text-[black] text-sm font-semibold">Dashboard</span>
              </div> */}

              {/* Referral Services */}
              <div className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-white hover:text-[blue] cursor-pointer">
                <div className="flex items-center gap-3">
                  <ServicesIcon />
                  <span className="text-white text-sm font-semibold hover:text-[blue]">Referral Services</span>
                </div>
                <ChevronDownIcon />
              </div>
            </div>
          </div>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-2 left-6 right-6">
          <button onClick={logout} className="w-full flex items-center justify-center gap-3 py-3 px-6 bg-[#F86F03] rounded-lg hover:bg-[#e5630a] transition-colors">
            <LogoutIcon />
            <span className="text-white text-base font-bold">Logout</span>
          </button>
        </div>
      </div>
      
    </div>
  )
}

export default Doctorsidebar
