import React from 'react'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../Doctor/stylingcss/sidebar.css'
import bizlogo from '../../assets/images/image 13.png'
import completedoctorprfile from '../../assets/images/iCON (3).png'
import dashnoardicon from '../../assets/images/dashboardicon.png'
import createnewcourse from '../../assets/images/createnewcourse.png'
import createdigitalcme from '../../assets/images/createdigitalcme.png'
import createquestionbank from '../../assets/images/createquestionbank.png'
import createsubadmin from '../../assets/images/createsubadmin.png'



function Doctorsidebar() {

const navigate=useNavigate()

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
    <div >

         <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2  bg-[rgba(189,196,212,0.5)] text-white rounded-lg"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>
         {/* Sidebar */}
     <div
  className={cn(
    "fixed left-0 top-0 h-full w-54  bg-[rgba(189,196,212,0.5)] transform transition-transform duration-300 z-40",
    isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
  )}
>

        {/* Logo */}
        <div className="h-36 flex items-center justify-center  px-4">
          <img
            src={bizlogo}
            alt="Biz Logo"
            // className="w-30 h-auto max-w-full"
            style={{height:"89px"}}
          />
        </div>

        {/* Navigation */}
        <nav className="px-2 py-0 space-y-6">
          <div>
            {/* <h3 className="text-white text-base font-semibold mb-4">Dashboard</h3> */}
            <div className="space-y-0">
              {/* Dashboard Active */}
              <div onClick={()=>navigate('/doctordashboard')} className="flex items-center gap-3 px-3 py-3  rounded-lg   cursor-pointer">
         
                <img src={dashnoardicon} alt='' style={{height:"18px",width:"18px"}}></img>
                <span className="text-[black] text-sm font-Lora ">Dashboard</span>
              </div>

               <div onClick={()=>navigate('/createnewcourse')} className="flex items-center gap-3 px-3 py-3  rounded-lg   cursor-pointer">
           
                  <img src={createnewcourse} alt='' style={{height:"18px",width:"18px"}}></img>
                <span className="text-[black] text-sm font-Lora ">Create New Course</span>
              </div>

                <div onClick={()=>navigate('/createdigitalcme')} className="flex items-center gap-3 px-3 py-3  rounded-lg   cursor-pointer">
                 <img src={createdigitalcme} alt='' style={{height:"18px",width:"18px"}}></img>
                <span className="text-[black] text-sm font-Lora ">Create Digital CME</span>
              </div>

               <div onClick={()=>navigate('/createdigitalcmequestionbank')} className="flex items-center gap-3 px-3 py-3  rounded-lg   cursor-pointer">
                <img src={createquestionbank} alt='' style={{height:"18px",width:"18px"}}></img>
                <span className="text-[black] text-sm font-Lora ">Create Question Bank</span>
              </div>

                <div onClick={()=>navigate('/createsubadmin')} className="flex items-center gap-3 px-3 py-3  rounded-lg   cursor-pointer">
                <img src={createsubadmin} alt='' style={{height:"18px",width:"18px"}}></img>
                <span className="text-[black] text-sm font-Lora ">Create Sub-Admin</span>
              </div>

               {/* <div className="flex items-center gap-3 px-3 py-3  rounded-lg  cursor-pointer">
                <DashboardIcon />
                <span className="text-[black] text-sm font-semibold">Dashboard</span>
              </div> */}

              {/* Referral Services */}
                {/* <div className="flex items-center gap-3 px-3 py-3  rounded-lg   cursor-pointer">
              
                
              </div> */}

               <div onClick={()=>navigate('/complete-doctor-details')} className="flex items-center gap-3 px-3 py-3  rounded-lg   cursor-pointer">
             
                <img src={completedoctorprfile} alt='' style={{height:"18px",width:"18px"}}></img>
                <span className="text-[black] text-sm font-Lora ">Complete Doctor Profile</span>
              </div>

              {/* <div className="flex items-center justify-between px-3 py-3 rounded-lg   cursor-pointer"> 
                    <ServicesIcon />  
                <div className="flex items-center gap-3"> 
                  <span className=" text-sm font-semibold Referral-Services-btn">Referral Services</span>
                  <ChevronDownIcon />
                </div>
                
              </div> */}
            </div>
          </div>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-2 left-6 right-6">
          <button onClick={logout} className="w-full flex items-center justify-center gap-3 py-3 px-6 bg-[#52677D] rounded-lg hover:bg-[#e5630a] transition-colors">
            {/* <LogoutIcon /> */}
            <span className="text-white text-base" style={{fontFamily:"Lora"}}>Logout</span>
          </button>
        </div>
      </div>
      
    </div>
  )
}

export default Doctorsidebar