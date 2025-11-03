
import React, { useState } from "react";
import "../../styles/signin.css";
import image from "../../assets/images/Optimize Your Mental Health with 24-7 Shalom Psychiatry 1.png";
import { useNavigate } from "react-router-dom";
import api from '../../api'
import Swal from 'sweetalert2';
import ChangePasswordModal from "../changepassworddoctor";
import logo from "../../assets/images/image 13.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";  // 👁️ eye icons


function ChangePassword() {


    const doctordetails=JSON.parse(localStorage.getItem("main_user"))


    


  const navigate=useNavigate()


  const [current_password,setcurrent_password]=useState("")
  const[new_password,setnew_password]=useState("")
  const[confirm_password,setconfirm_password]=useState("")

    const [showPassword, setShowPassword] = useState(false);
 

const change_password = async (e) => {
 e.preventDefault();

  if(new_password!==confirm_password)
  {
    return     Swal.fire({
        icon: 'error',
        title: 'Password Not Match',
        text: "New Pssword And Confirm Password Not Matched",
        showConfirmButton: true,
         customClass: {
          confirmButton: 'my-swal-button',
        },
      });
  }

    try {
      const resp = await api.post('api/v1/admin/ChangePassword',
        {
                userId: doctordetails._id,
                currentPassword: current_password,
                newPassword: new_password
          
        }
      );
    console.log(resp);
    
      if(resp.data.response.response_code==="401")
      Swal.fire({
        icon: 'error',
        title: 'Password Error',
        text: resp.data.response.response_message,
        showConfirmButton: true,
         customClass: {
          confirmButton: 'my-swal-button',
        },
      }).then(()=>
        {
            window.location.reload()
        });;

      
      if(resp.data.response.response_code==="400")
      Swal.fire({
        icon: 'warning',
        title: 'Password Error',
        text: resp.data.response.response_message.error,
        showConfirmButton: true,
         customClass: {
          confirmButton: 'my-swal-button',
        },
      }).then(()=>
        {
             window.location.reload()
        });;

     if(resp.data.response.response_code==="200")
      Swal.fire({
        icon: 'success',
        title: 'Password Changed',
        text: resp.data.response.response_message,
        showConfirmButton: true,
         customClass: {
          confirmButton: 'my-swal-button',
        },
      }).then(()=>
        {
           
            navigate('/doctordashboard')
        });;
      


    //   navigate('/doctordashboard');

    } catch (error) {
      const status = error.response?.status;
      const message = error.response?.data?.message || 'Something went wrong!';

      if (status === 403) {
        Swal.fire({
          icon: 'warning',
          title: 'Change Password Required',
          text: message,
          showConfirmButton: true,
             customClass: {
          confirmButton: 'my-swal-button',
        },
        }).then(()=>
        {
            window.location.reload()
    
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: message,
          showConfirmButton: true,
             customClass: {
          confirmButton: 'my-swal-button',
        },
        });
      }
    }

};



  return (
    <div className="signin-container">
    
  
      <div className="visual-side" >
        <img
          src={image}
          alt=""
        />
      </div>

      <div className="form-side" >
        <form className="signin-form">
            <div className="logo-container">
            <img src={logo} alt="logo" />
          </div>
          <h2>Change Password</h2>
        
          
          {/* Step 3: The form updates (even just the heading here) */}
           {/* <h2>Sign In</h2> */}
          <div className="input-group">
           
            <label>Current Password</label>
            <input type="text" placeholder="Current Password" required  onChange={(e)=>setcurrent_password(e.target.value)}/>
            <label> New Password</label>
            <input type="password" placeholder="New Password" required onChange={(e)=>setnew_password(e.target.value)}/>
              <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
              <label> Confirm Password</label>
            <input type={showPassword ? "text" : "password"} placeholder="Password" required onChange={(e)=>setconfirm_password(e.target.value)}/>
              <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
         
          <button className="login-btn" onClick={change_password}>
            Change Password
          </button>

        

        
        </form>

      </div>
    </div>
  );
}

export default ChangePassword;
