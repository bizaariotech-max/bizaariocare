import React, { useState,useRef, useEffect } from "react";
import image from "../../assets1/Vector (2).png"
import image1 from "../../assets1/gender-female-svgrepo-com 1.png"
import image2 from "../../assets1/subscriptions-svgrepo-com 1.png"
import image3 from "../../assets1/schedule-icon 1.png"
import "../Doctor/stylingcss/editprofile.css"
import Doctorheader from "./doctorheader";
import Doctorsidebar from "./doctorsidebar";
import { Modal, Button, Form } from "react-bootstrap";
import {
  Box, Grid,  Typography, Card, Avatar,
  TextField, FormControl, InputLabel, Select, MenuItem, RadioGroup,
  FormControlLabel, Radio, Fade,Chip,Menu,InputAdornment ,ListItemText 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import {  IconButton,  Tooltip } from '@mui/material';
import { Checkbox, FormGroup } from '@mui/material';
import api from '../../api'
import Swal from 'sweetalert2';
import { State, City } from "country-state-city";
import { event } from "jquery";
import UniqueLoader from '../loader';
import { useNavigate } from "react-router-dom";



export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Editdoctorprofile() {

  const navigate=useNavigate()


  const[loading,setloading]=useState(false)

const doctordetails=JSON.parse(localStorage.getItem("user"))

const[user,setuser]=useState({})

const getdoctorby_id=async()=>
{
  try {
    const resp=await api.get(`doctor/getdoctorbyid/${doctordetails.user._id}`)
    setuser(resp.data.doctor)
    
  } catch (error) {
    console.log(error);
    
  }
}

useEffect(()=>
{
  getdoctorby_id()
},[])

console.log(user);




// ================================edit doctor start==================================================

const[doctorprofile,setdoctorprofile] =useState({profile_pic:[],profile_pic_preview:[],firstName: '',
                                  lastName: '',dateOfBirth: '',gender: '',qualification:[],medical_specialty :'',
                                             subscription:[]});

  useEffect(()=>
  {
    setdoctorprofile(user)

  },[user])


  

    const fileInputRef = useRef(null);

 const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);



  const handleChange = (e) => {
  const { name, value, checked, type } = e.target;

  setdoctorprofile((prev) => {
    // If dropdown/multiple select returns an array directly
    if (Array.isArray(value)) {
      return { ...prev, [name]: value };
    }

    // If the state field is already an array (checkbox group)
    if (Array.isArray(prev[name])) {
      const updated = checked
        ? [...prev[name], value] // Add
        : prev[name].filter((item) => item !== value); // Remove
      return { ...prev, [name]: updated };
    }

     // If this is a checkbox group for an array field
    if (type === "checkbox" && Array.isArray(prev[name])) {
      const updated = checked
        ? [...prev[name], value] // Add to array
        : prev[name].filter((item) => item !== value); // Remove from array
      return { ...prev, [name]: updated };
    }

    // If this is a single checkbox (boolean)
    if (type === "checkbox") {
      return { ...prev, [name]: checked };
    }

    // Normal single-value field
    return { ...prev, [name]: type === "checkbox" ? checked : value };
  });
};

 const handleImageChange = (e) => {
  const files = Array.from(e.target.files);
  if (files.length > 0) {
    const file = files[0];
    const previewUrl = URL.createObjectURL(file);
    setdoctorprofile({
      ...doctorprofile,
      profile_pic: file,
      profile_pic_preview: previewUrl,
    });
  }
};


const updateprofile=async()=>
{
  try {
    setloading(true)
    const resp = await api.put(`doctor/updatedoctor/${doctordetails.user._id}`,
  doctorprofile,
  {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
);

    if(resp.status===200)
    {
       Swal.fire({
        icon:"success",
        title:"Profile Updated",
        text:"Doctor Profile Updated Successfully...",
        showConfirmButton:true,
        customClass: {
        confirmButton: 'my-swal-button',
      },
      }).then(()=>
      {
        window.location.reload()
      })
    }
    handleClose()
  } catch (error) {
     Swal.fire({
      icon:"error",
      title:"error ",
      text:error.response.data.message,
      showConfirmButton:true,
        customClass: {
        confirmButton: 'my-swal-button',
      },
    })
    console.log(error);
    
  }finally
  {
    setloading(false)
  }
}

// ===========================edit doctor personal information=======================================


const[doctorprofilepersonal,setdoctorprofilepersonal] =useState({phone_number:"",email:"",website: '',
                                  country: '',address1: '',address2: '',city:"",state :'',
                                             postal_code:""});

 useEffect(() => {
  if (user && Object.keys(user).length > 0) {
    setdoctorprofilepersonal(user);
  }
}, [user]);


  



 const [showpersonal, setShowpersonal] = useState(false);

  const handleShowpersonal = () => setShowpersonal(true);
  const handleClosepersonal = () => setShowpersonal(false);



  const handleChangepersonal = (e) => {
  const { name, value, checked, type } = e.target;

  setdoctorprofilepersonal((prev) => {
    // If dropdown/multiple select returns an array directly
    if (Array.isArray(value)) {
      return { ...prev, [name]: value };
    }

    // If the state field is already an array (checkbox group)
    if (Array.isArray(prev[name])) {
      const updated = checked
        ? [...prev[name], value] // Add
        : prev[name].filter((item) => item !== value); // Remove
      return { ...prev, [name]: updated };
    }

     // If this is a checkbox group for an array field
    if (type === "checkbox" && Array.isArray(prev[name])) {
      const updated = checked
        ? [...prev[name], value] // Add to array
        : prev[name].filter((item) => item !== value); // Remove from array
      return { ...prev, [name]: updated };
    }

    // If this is a single checkbox (boolean)
    if (type === "checkbox") {
      return { ...prev, [name]: checked };
    }

    // Normal single-value field
    return { ...prev, [name]: type === "checkbox" ? checked : value };
  });
};

 const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // Load all Indian states on mount
  useEffect(() => {
    setStates(State.getStatesOfCountry("IN"));
  }, []);

  // Load cities when state changes
  useEffect(() => {
    if (doctorprofilepersonal.state) {
      const stateData = states.find((st) => st.name === doctorprofilepersonal.state);
      if (stateData) {
        setCities(City.getCitiesOfState("IN", stateData.isoCode));
      }
    } else {
      setCities([]);
    }
  }, [doctorprofilepersonal.state, states]);




const updateprofilepresonal=async()=>
{
  try {
    setloading(true)
    const resp = await api.put(`doctor/updatedoctor/${doctordetails.user._id}`,doctorprofilepersonal);

    if(resp.status===200)
    {
       Swal.fire({
        icon:"success",
        title:"Profile Updated",
        text:"Doctor Personal Details Updated Successfully...",
        showConfirmButton:true,
        customClass: {
        confirmButton: 'my-swal-button',
      },
      }).then(()=>
      {
        window.location.reload()
      })
    }
    handleClosepersonal()
    
  } catch (error) {
     Swal.fire({
      icon:"error",
      title:"error ",
      text:error.response.data.message,
      showConfirmButton:true,
        customClass: {
        confirmButton: 'my-swal-button',
      },
    })
    console.log(error);
    
  }finally
  {
    setloading(false)
  }
}



//==================================== edit doctor bio============================================



  const [doctorprofilebio, setdoctorprofilebio] = useState({ bio: "" });
  const maxChars = 1200;

  const handleChangebio = (e) => {
    const input = e.target.value;
    if (input.length <= maxChars) {
      setdoctorprofilebio({ ...doctorprofilebio, bio: input });
    }
  };


 useEffect(() => {
  if (user && Object.keys(user).length > 0) {
    setdoctorprofilebio(user);
  }
}, [user]);


 const [showbio, setShowbio] = useState(false);

  const handleShowbio = () => setShowbio(true);
  const handleClosebio = () => setShowbio(false);


const updateprofilebio=async()=>
{
  try {
    setloading(true)
    const resp = await api.put(`doctor/updatedoctor/${doctordetails.user._id}`,doctorprofilebio);

    if(resp.status===200)
    {
       Swal.fire({
        icon:"success",
        title:"Profile Updated",
        text:"Doctor Bio Updated Successfully...",
        showConfirmButton:true,
        customClass: {
        confirmButton: 'my-swal-button',
      },
      }).then(()=>
      {
        window.location.reload()
      })
    }
    handleClosebio()
    
  } catch (error) {
     Swal.fire({
      icon:"error",
      title:"error ",
      text:error.response.data.message,
      showConfirmButton:true,
        customClass: {
        confirmButton: 'my-swal-button',
      },
    })
    console.log(error);
    
  }finally
  {
    setloading(false)
  }
}


//======================================= bio video update===========================================

  const [doctorprofilebiovideo, setdoctorprofilebiovideo] = useState({ bio_video: "" });
 
  
  const handleChangebiovideo = (e) => {
    const input = e.target.value;
 
      setdoctorprofilebiovideo({ ...doctorprofilebiovideo, bio_video: input });
    
  };


 useEffect(() => {
  if (user && Object.keys(user).length > 0) {
    setdoctorprofilebiovideo(user);
  }
}, [user]);


 const [showbiovideo, setShowbiovideo] = useState(false);

  const handleShowbiovideo = () => setShowbiovideo(true);
  const handleClosebiovideo = () => setShowbiovideo(false);


const updateprofilebiovideo=async()=>
{
  try {
    setloading(true)
    const resp = await api.put(`doctor/updatedoctor/${doctordetails.user._id}`,doctorprofilebiovideo);

    if(resp.status===200)
    {
       Swal.fire({
        icon:"success",
        title:"Profile Updated",
        text:"Doctor Bio Video Updated Successfully...",
        showConfirmButton:true,
        customClass: {
        confirmButton: 'my-swal-button',
      },
      }).then(()=>
      {
        window.location.reload()
      })
    }
    handleClosebiovideo()
    
  } catch (error) {
     Swal.fire({
      icon:"error",
      title:"error ",
      text:error.response.data.message,
      showConfirmButton:true,
        customClass: {
        confirmButton: 'my-swal-button',
      },
    })
    console.log(error);
    
  }finally
  {
    setloading(false)
  }
}


//======================================= add image update===========================================

  const [doctorprofileaddgallary, setdoctorprofileaddgallary] = useState({ image_gallary: [],image_gallary_preview:[]});
 
  
   const handleaddimagegallary = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 0) {
        const previewUrls = files.map((file) => URL.createObjectURL(file));

        setdoctorprofileaddgallary((prev) => ({
        ...prev,
        image_gallary: [...(prev.image_gallary || []), ...files],
        image_gallary_preview: [...(prev.image_gallary_preview || []), ...previewUrls],
        }));
    }
    };


 useEffect(() => {
  if (user && Object.keys(user).length > 0) {
    setdoctorprofileaddgallary(user);
  }
}, [user]);




 const [showimagegalarry, setShowimagegallary] = useState(false);

  const handleShowimagegalarry = () => setShowimagegallary(true);
  const handleCloseimagegalarry = () => setShowimagegallary(false);


const addimagegallary=async()=>
{
  try {
    setloading(true)
    const resp = await api.put(`doctor/addimagegallary/${doctordetails.user._id}`,doctorprofileaddgallary,
      {headers: {
                "Content-Type": "multipart/form-data",
              }
            }
    );

    if(resp.status===200)
    {
       Swal.fire({
        icon:"success",
        title:"Profile Updated",
        text:"Doctor Bio Video Updated Successfully...",
        showConfirmButton:true,
        customClass: {
        confirmButton: 'my-swal-button',
      },
      }).then(()=>
      {
        window.location.reload()
      })
    }
    handleClosebiovideo()
    
  } catch (error) {
     Swal.fire({
      icon:"error",
      title:"error ",
      text:error.response.data.message,
      showConfirmButton:true,
        customClass: {
        confirmButton: 'my-swal-button',
      },
    })
    console.log(error);
    
  }finally
  {
    setloading(false)
  }
}


//================================ update image gallary===========================================


 const [showimagegalarryupdate, setShowimagegallaryupdate] = useState(false);

  const handleShowimagegalarryupdate = () => setShowimagegallaryupdate(true);
  const handleCloseimagegalarryupdate = () => setShowimagegallaryupdate(false);

  const handleDelete=async(index)=>
  {
    try {
      setloading(true)
      const resp=await api.put(`doctor/deleteimagefromgallary/${doctordetails.user._id}/${index}`)
       Swal.fire({
        icon:"success",
        title:"Profile Updated",
        text:"Doctor Image Gallary Updated Successfully...",
        showConfirmButton:true,
        customClass: {
        confirmButton: 'my-swal-button',
      },
      }).then(()=>
      {
        window.location.reload()
      })
      
    } catch (error) {
      Swal.fire({
      icon:"error",
      title:"error ",
      text:error.response.data.message,
      showConfirmButton:true,
        customClass: {
        confirmButton: 'my-swal-button',
      },
    })
      console.log(error);
      
    }
    finally
    {
      setloading(false)
    }
   
  }


  //======================================= add upcoming events===========================================

  const [doctorprofileaddupcomingevents, setdoctorprofileaddupcomingevents] = useState({ upcoming_events: [],upcoming_events_preview:[]});
 
  
   const handleaddupcomingevents = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 0) {
        const previewUrls = files.map((file) => URL.createObjectURL(file));

        setdoctorprofileaddupcomingevents((prev) => ({
        ...prev,
        upcoming_events: [...(prev.upcoming_events || []), ...files],
        upcoming_events_preview: [...(prev.upcoming_events_preview || []), ...previewUrls],
        }));
    }
    };


 useEffect(() => {
  if (user && Object.keys(user).length > 0) {
    setdoctorprofileaddupcomingevents(user);
  }
}, [user]);




  const [showupcomingevents, setshowupcomingevents] = useState(false);

  const handleShowupcomingevents = () => setshowupcomingevents(true);
  const handleCloseupcomingevents = () => setshowupcomingevents(false);


const addupcomingevents=async()=>
{
  try {
    setloading(true)
    const resp = await api.put(`doctor/addupcomingevents/${doctordetails.user._id}`,doctorprofileaddupcomingevents,
      {headers: {
                "Content-Type": "multipart/form-data",
              }
            }
    );

    if(resp.status===200)
    {
       Swal.fire({
        icon:"success",
        title:"Upcoming Events Updated",
        text:"Upcoming Events Added Successfully...",
        showConfirmButton:true,
        customClass: {
        confirmButton: 'my-swal-button',
      },
      }).then(()=>
      {
        window.location.reload()
      })
    }
    handleClosebiovideo()
    
  } catch (error) {
     Swal.fire({
      icon:"error",
      title:"error ",
      text:error.response.data.message,
      showConfirmButton:true,
        customClass: {
        confirmButton: 'my-swal-button',
      },
    })
    console.log(error);
    
  }
  finally
  {
    setloading(false)
  }
}




  //================================= update upcoming events ========================================


  const [showupcomingeventsupdate, setshowupcomingeventsupdate] = useState(false);

  const handleShowupcomingeventsupdate = () => setshowupcomingeventsupdate(true);
  const handleCloseupcomingeventsupdate = () => setshowupcomingeventsupdate(false);
 

  const handleDeleteupcomingevents=async(index)=>
  {
    try {
      setloading(true)
      const resp=await api.put(`doctor/deleteupcomingevents/${doctordetails.user._id}/${index}`)
       Swal.fire({
        icon:"success",
        title:"Upcoming Event Deleted",
        text:"Upcoming Events Deleted Successfully...",
        showConfirmButton:true,
        customClass: {
        confirmButton: 'my-swal-button',
      },
      }).then(()=>
      {
        window.location.reload()
      })
      
    } catch (error) {
      Swal.fire({
      icon:"error",
      title:"error ",
      text:error.response.data.message,
      showConfirmButton:true,
        customClass: {
        confirmButton: 'my-swal-button',
      },
    })
      console.log(error);
      
    }finally
    {
      setloading(false)
    }
   
  }


  // ===========================edit doctor work experience information=======================================


const[doctorprofileworkexperience,setdoctorprofileworkexperience] =useState({doctor_id:"",hospital_name:"",from_year:"",
                                      to_year: '',designation: '',major_achievements: ''});

 useEffect(() => {
  if (user && Object.keys(user).length > 0) {
    setdoctorprofileworkexperience(user);
    setdoctorprofileworkexperience({...doctorprofileworkexperience,doctor_id:user._id})
  }
}, [user]);



 const [showworkexperience, setshowworkexperience] = useState(false);

  const handleshowworkexperience = () => setshowworkexperience(true);
  const handlecloseworkexperience = () => setshowworkexperience(false);



  const handlechangeworkexperience = (e) => {
  const { name, value, checked, type } = e.target;

  setdoctorprofileworkexperience((prev) => {
    // If dropdown/multiple select returns an array directly
    if (Array.isArray(value)) {
      return { ...prev, [name]: value };
    }

    // If the state field is already an array (checkbox group)
    if (Array.isArray(prev[name])) {
      const updated = checked
        ? [...prev[name], value] // Add
        : prev[name].filter((item) => item !== value); // Remove
      return { ...prev, [name]: updated };
    }

     // If this is a checkbox group for an array field
    if (type === "checkbox" && Array.isArray(prev[name])) {
      const updated = checked
        ? [...prev[name], value] // Add to array
        : prev[name].filter((item) => item !== value); // Remove from array
      return { ...prev, [name]: updated };
    }

    // If this is a single checkbox (boolean)
    if (type === "checkbox") {
      return { ...prev, [name]: checked };
    }

    // Normal single-value field
    return { ...prev, [name]: type === "checkbox" ? checked : value };
  });
};



const updateworkexperience=async()=>
{
  try {
    setloading(true)
    const resp = await api.put(`doctor/addworkexperience/${doctordetails.user._id}`,doctorprofileworkexperience);

    if(resp.status===200)
    {
       Swal.fire({
        icon:"success",
        title:"Profile Updated",
        text:"Doctor Work Experience Added Successfully...",
        showConfirmButton:true,
        customClass: {
        confirmButton: 'my-swal-button',
      },
      }).then(()=>
      {
        window.location.reload()
      })
    }
    handleClosepersonal()
    
  } catch (error) {
     Swal.fire({
      icon:"error",
      title:"error ",
      text:error.response.data.message,
      showConfirmButton:true,
        customClass: {
        confirmButton: 'my-swal-button',
      },
    })
    console.log(error);
    
  }finally
  {
    setloading(false)
  }
}



  // ===========================edit doctor award and rewards information=======================================


const[doctorprofileaward,setdoctorprofileaward] =useState({doctor_id:"",award_title:"",awarding_body:"",
                                      date: '',venue: '',award_mage: [],picture_gallary:[],video_url:""});

 useEffect(() => {
  if (user && Object.keys(user).length > 0) {
    setdoctorprofileaward(user);
    setdoctorprofileaward({...setdoctorprofileaward,doctor_id:user._id})
  }
}, [user]);



 const [showaward, setshowaward] = useState(false);

  const handleshowaward = () => setshowaward(true);
  const handlecloseaward = () => setshowaward(false);



  const handlechangeaward = (e) => {
  const { name, value, checked, type } = e.target;

  setdoctorprofileworkexperience((prev) => {
    // If dropdown/multiple select returns an array directly
    if (Array.isArray(value)) {
      return { ...prev, [name]: value };
    }

    // If the state field is already an array (checkbox group)
    if (Array.isArray(prev[name])) {
      const updated = checked
        ? [...prev[name], value] // Add
        : prev[name].filter((item) => item !== value); // Remove
      return { ...prev, [name]: updated };
    }

     // If this is a checkbox group for an array field
    if (type === "checkbox" && Array.isArray(prev[name])) {
      const updated = checked
        ? [...prev[name], value] // Add to array
        : prev[name].filter((item) => item !== value); // Remove from array
      return { ...prev, [name]: updated };
    }

    // If this is a single checkbox (boolean)
    if (type === "checkbox") {
      return { ...prev, [name]: checked };
    }

    // Normal single-value field
    return { ...prev, [name]: type === "checkbox" ? checked : value };
  });
};



const updateaward=async()=>
{
  try {
    setloading(true)
    const resp = await api.put(`doctor/addworkexperience/${doctordetails.user._id}`,doctorprofileworkexperience);

    if(resp.status===200)
    {
       Swal.fire({
        icon:"success",
        title:"Profile Updated",
        text:"Doctor Work Experience Added Successfully...",
        showConfirmButton:true,
        customClass: {
        confirmButton: 'my-swal-button',
      },
      }).then(()=>
      {
        window.location.reload()
      })
    }
    handleClosepersonal()
    
  } catch (error) {
     Swal.fire({
      icon:"error",
      title:"error ",
      text:error.response.data.message,
      showConfirmButton:true,
        customClass: {
        confirmButton: 'my-swal-button',
      },
    })
    console.log(error);
    
  }finally
  {
    setloading(false)
  }
}





  return (
    <>
    <Doctorheader/>
    <Doctorsidebar/>
    <div className="min-h-screen bg-background">
      <div className="ml-0 lg:ml-64 pt-24">
        <div className=" mx-auto p-4 lg:p-8 space-y-6 lg:space-y-8">
          {/* Profile Header */}
          <h1 className="text-3xl font-semibold text-black">Profile</h1>

          {/* Main Profile Card */}
<div className="rounded-lg bg-[#EFEFEF]  p-4 sm:p-6 lg:p-8" id="profile-main">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
    
    {/* Profile Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-start sm:gap-6 text-start sm:text-left" id="profile-info">
      <img
        src={user?.profile_pic?.[0]}
        alt="Dr. Dominic Stonehart"
        className="h-20 w-20 sm:h-28 sm:w-28 rounded-full object-cover flex-shrink-0"
        />

        <div className="flex-1 space-y-3 mt-0 sm:mt-0 text-left" id="profile-card">
        <div className=" profil-info space-y-2">
          <h2 className="mt-0 mr-10 ml-0 sm:mt-0 mb-1 sm:mb-3 text-lg sm:text-2xl font-semibold text-black" >
           Dr. {user?.firstName} {user?.lastName}
          </h2>
          <p className="text-black/75 text-sm sm:text-base">
           {user?.qualification?user.qualification.join(','):"MBBS [Consultant Cardiologist]"}   
          </p>
          <p className="text-black/75 text-sm">
           Specializes in:{user?.medical_specialty?user.medical_specialty:"Interventional Cardiology, Heart Failure Management, Preventive Cardiology"}  
          </p>
        </div>

        {/* Details */}
        <div  className="flex flex-wrap mr-10 ml-0 justify-start gap-2 w-full text-sm text-black/75">
          <div id="detail-date" className="flex items-start gap-2 ">
            <img src={image} className="h-5 w-5" fill="currentColor" viewBox="0 0 20 21">
            
            </img>
          <span>{user?.dateOfBirth? new Date(user.dateOfBirth).toLocaleDateString()
            : "01/01/1990"}
        </span>


          </div>

          <div id="detail-gen"  className="flex items-start gap-2">
            <img src={image1} className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 20 21">
             
            </img>
            <span>{user.gender}</span>
          </div>

          <div id="detail-digital"  className="flex items-start sm:items-center sm:text-base sm:flex  gap-2">
            <img  src={image2} className="h-5 w-5" fill="currentColor" viewBox="0 0 20 21">
            
            </img>
            <span>{user?.subscription?.join(',')}</span>
          </div>
        </div>
      </div>
    </div>

    {/* Buttons */}
  <div id="profile-button" className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
  <button onClick={handleShow} id="profile-edit" className="group w-full sm:w-auto rounded-md bg-[#F86F03] text-white border border-[#F86F03] px-4 py-2 font-semibold text-sm lg:text-base transition-colors duration-300 hover:bg-white hover:border-[#F86F03]">
    <span className="group-hover:text-[#F86F03]">Edit Profile</span>
  </button>

  <button id="profile-share" className="group w-full sm:w-auto rounded-md bg-[#F86F03] text-white border border-[#F86F03] px-4 py-2 font-semibold text-sm lg:text-base transition-colors duration-300 hover:bg-white hover:border-[#F86F03]">
    <span className="group-hover:text-[#F86F03]">Share Profile</span>
  </button>
    </div>
  </div>
</div>


{/*================================= personal information ============================================*/}


          {/* Personal Information */}
          <div id="personal-detail" className="space-y-8">
            <h2 id="pernonal-information" className="text-3xl font-semibold text-black" >Personal Information's</h2>

            {/* Contact Details */}
            <div id="contact-detail" className="rounded-lg bg-[#EFEFEF] p-8" >
              <div id="contact" className="contact-head flex items-start justify-between mb-6">
                <h3 className="text-2xl ml-0 font-medium text-black">Contact Details</h3>
                <button className="p-2" onClick={handleShowpersonal}>
                  <svg className=" edit-button h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 32 32">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.67} d="M26.8664 10.5865L11.0397 26.4133C9.62637 27.8399 5.39969 28.4931 4.43969 27.5465C3.47969 26.5998 4.1597 22.3733 5.57304 20.9466L21.3997 5.11992C22.1305 4.42394 23.1044 4.04122 24.1135 4.05351C25.1227 4.06582 26.0869 4.47216 26.8005 5.18576C27.5141 5.89935 27.9204 6.86367 27.9328 7.87276C27.9451 8.88187 27.5624 9.85578 26.8664 10.5865Z" />
                  </svg>
                </button>
              </div>
             <div className="w-full space-y-6">
  {/* First line: No, Mail, Website */}
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-black/75">
    <div id="contact-no" className="flex items-center gap-2  sm:justify-start">
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 20 21">
        <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M17.5012 9.66663C17.5012 5.98477 14.5164 3 10.8345 3M11.6677 6.43832C12.8392 6.73978 13.7613 7.66198 14.0628 8.83338M13.3861 12.3756C13.8387 11.772 14.6582 11.5786 15.333 11.916L16.3625 12.4307C17.0347 12.7669 17.3988 13.5113 17.2514 14.2483L16.9357 15.8269C16.7799 16.606 16.0935 17.1789 15.3041 17.0896C9.25149 16.405 4.09619 11.2496 3.41152 5.19708C3.32222 4.40765 3.89518 3.72123 4.67422 3.56543L6.2528 3.24971C6.9898 3.10231 7.73426 3.46641 8.07038 4.13865L8.58508 5.16812C8.9225 5.8429 8.72908 6.66241 8.1255 7.11507C7.73242 7.40988 7.49276 7.88342 7.68271 8.33656C8.33558 9.89405 10.6071 12.1655 12.1646 12.8184C12.6177 13.0084 13.0912 12.7687 13.3861 12.3756Z" />
      </svg>
      <span className="text-lg text-black/70">{user?.phone_number}</span>
    </div>

    <div id="contact-mail" className="flex items-center gap-2  sm:justify-start">
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 20 21">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.33203 6.33329L8.4987 10.2083C9.38761 10.8749 10.6098 10.8749 11.4987 10.2083L16.6654 6.33325" />
        <path strokeLinecap="round" strokeWidth={2} d="M15.8333 4.66675H4.16667C3.24619 4.66675 2.5 5.41294 2.5 6.33341V14.6667C2.5 15.5872 3.24619 16.3334 4.16667 16.3334H15.8333C16.7538 16.3334 17.5 15.5872 17.5 14.6667V6.33341C17.5 5.41294 16.7538 4.66675 15.8333 4.66675Z" />
      </svg>
      <span className="text-lg text-black/70">{user?.email}</span>
    </div>

    <div id="contact-site" className="flex items-center gap-2  sm:justify-start">
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 20 21">
        <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M17.5 10.5C17.5 14.6422 14.1422 18 10 18M17.5 10.5C17.5 6.35787 14.1422 3 10 3M17.5 10.5C17.5 11.8807 14.1422 13 10 13C5.85787 13 2.5 11.8807 2.5 10.5M17.5 10.5C17.5 9.11925 14.1422 8 10 8C5.85787 8 2.5 9.11925 2.5 10.5M10 18C5.85787 18 2.5 14.6422 2.5 10.5M10 18C8.61925 18 7.5 14.6422 7.5 10.5C7.5 6.35787 8.61925 3 10 3M10 18C11.3807 18 12.5 14.6422 12.5 10.5C12.5 6.35787 11.3807 3 10 3M10 3C5.85787 3 2.5 6.35787 2.5 10.5" />
      </svg>
      <span className="text-lg text-black/70">{user?.website}</span>
    </div>
  </div>

  {/* Second line: Address */}
  <div id="contact-address" className="flex items-start gap-2 text-sm text-black/75  sm:justify-start">
    <svg className="h-5 w-5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 20 21">
      <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M10.0013 18C12.918 15 15.8346 12.3137 15.8346 9C15.8346 5.68629 13.223 3 10.0013 3C6.77964 3 4.16797 5.68629 4.16797 9C4.16797 12.3137 7.08464 15 10.0013 18Z" />
      <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M9.9987 10.5001C10.9192 10.5001 11.6654 9.75391 11.6654 8.83341C11.6654 7.91294 10.9192 7.16675 9.9987 7.16675C9.0782 7.16675 8.33203 7.91294 8.33203 8.83341C8.33203 9.75391 9.0782 10.5001 9.9987 10.5001Z" />
    </svg>
    <span className="text-lg text-black/70">
      {user?.address1},{user?.address2}, {user?.city}, {user?.state}, {user.postal_code} {user?.country}
    </span>
  </div>
            </div>

            </div>


{/*=================================== bio section =============================================== */}


            {/* Bio */}
            <div className="rounded-lg bg-[#EFEFEF] p-8">
              <div id="bio-page" className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-medium text-black">Bio</h3>
                <button className="p-2" onClick={handleShowbio}>
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 32 32">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.67} d="M26.8664 10.5865L11.0397 26.4133C9.62637 27.8399 5.39969 28.4931 4.43969 27.5465C3.47969 26.5998 4.1597 22.3733 5.57304 20.9466L21.3997 5.11992C22.1305 4.42394 23.1044 4.04122 24.1135 4.05351C25.1227 4.06582 26.0869 4.47216 26.8005 5.18576C27.5141 5.89935 27.9204 6.86367 27.9328 7.87276C27.9451 8.88187 27.5624 9.85578 26.8664 10.5865Z" />
                  </svg>
                </button>
              </div>
              <p className="text-lg text-black/70 leading-relaxed">
               {user?.bio}
              </p>
            </div>

  {/*======================================== bio video ===========================================*/}


            {/* Bio Video */}
            <div className="rounded-lg bg-[#EFEFEF] p-8">
              <div id="bio-video"  className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-medium text-black">Bio Video</h3>
                <button className="p-2" onClick={handleShowbiovideo}>
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 32 32">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.67} d="M26.8664 10.5865L11.0397 26.4133C9.62637 27.8399 5.39969 28.4931 4.43969 27.5465C3.47969 26.5998 4.1597 22.3733 5.57304 20.9466L21.3997 5.11992C22.1305 4.42394 23.1044 4.04122 24.1135 4.05351C25.1227 4.06582 26.0869 4.47216 26.8005 5.18576C27.5141 5.89935 27.9204 6.86367 27.9328 7.87276C27.9451 8.88187 27.5624 9.85578 26.8664 10.5865Z" />
                  </svg>
                </button>
              </div>
           <div className="relative w-full h-screen">
              <iframe
              title="bio video"
                src={doctorprofilebiovideo.bio_video}
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>

            </div>


{/* ===============================galarry section ============================================== */}


            {/* Gallery */}
            {/* <SectionWithImages title="Gallery" /> */}

 <div className="rounded-lg bg-[#EFEFEF] p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-medium text-black">Gallery</h3>
        <div id="gallary" className="flex items-center gap-4">
          <button className="p-2" onClick={handleShowimagegalarry}>
            <svg id="plus-button" className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 32 32">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.67} d="M8 16H16M16 16H24M16 16V24M16 16V8" />
            </svg>
          </button>
          <button className="p-2" onClick={handleShowimagegalarryupdate}>
            <svg id="edit-button" className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 32 32">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.67} d="M26.8664 10.5865L11.0397 26.4133C9.62637 27.8399 5.39969 28.4931 4.43969 27.5465C3.47969 26.5998 4.1597 22.3733 5.57304 20.9466L21.3997 5.11992C22.1305 4.42394 23.1044 4.04122 24.1135 4.05351C25.1227 4.06582 26.0869 4.47216 26.8005 5.18576C27.5141 5.89935 27.9204 6.86367 27.9328 7.87276C27.9451 8.88187 27.5624 9.85578 26.8664 10.5865Z" />
            </svg>
          </button>
        </div>
      </div>
  <div className="gallery-image grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 mb-6">
  {user?.image_gallary?.length > 0 ? (
    user.image_gallary.map((imgUrl, index) => (
      <div key={index} className="aspect-[4/3] rounded-lg overflow-hidden">
        <img
          src={imgUrl}
          alt={`Gallery ${index + 1}`}
          className="w-full h-full object-cover"
        />
      </div>
    ))
  ) : (
    <p className="col-span-full text-center text-gray-500">
      No images available
    </p>
  )}
</div>

    </div>




{/*=============================== Work Experience ===============================================*/}


    <div  className=" bg-[#EFEFEF] rounded-lg p-6">
      {/* Header */}
      <div className="work-experience flex items-center justify-between mb-8">
        <div className="work-experience-heading ">
        <h3 className=" text-2xl font-semibold text-black">Work Experience</h3>
        </div>
        <div className="work-experincemain flex items-center gap-3">
          <button  className=" hover:bg-gray-200 p-2 rounded-full" onClick={handleshowworkexperience}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              fill="none"
              stroke="currentColor"
              className="w-8 h-8 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.67}
                d="M8 16H16M16 16H24M16 16V24M16 16V8"
              />
            </svg>
          </button>
          <button className="hover:bg-gray-200 p-2 rounded-full" onClick={()=>navigate('/editdoctorworkexperience')}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              fill="none"
              stroke="currentColor"
              className="w-8 h-8 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.67}
                d="M26.866 10.587L11.04 26.413c-1.414 1.427-5.64 2.08-6.6 1.133s.72-5.173 2.133-6.6L21.4 5.12A4 4 0 0 1 26.8 5.186a4 4 0 0 1 .133 5.401z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Items */}
      {/* <div id="award-item" className=" space-y-6">
        <WorkExperienceItem
          logo="https://api.builder.io/api/v1/image/assets/TEMP/1b856e809c7235f840a5c224f76e47c868c95e60?width=96"
          title="AIIMS, New Delhi"
          role="Resident Cardiologist (2012–2015)"
        />
        <WorkExperienceItem
          logo="https://api.builder.io/api/v1/image/assets/TEMP/37d612ef2d04bd57f62d9badeba6f3eabec40bbd?width=96"
          title="Fortis Heart Institute, Delhi"
          role="Visiting Consultant (2015–2017)"
        />
        <WorkExperienceItem
          logo="https://api.builder.io/api/v1/image/assets/TEMP/ab51d5d6f6aed86b4b2f0be8e8f967b08496c725?width=96"
          title="Apollo Hospitals, Chennai"
          role="Senior Cardiologist (2017–Present)"
        />
      </div> */}

    {
  user?.work_experience?.map((item, index) => (
    <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/1b856e809c7235f840a5c224f76e47c868c95e60?width=96"
        alt="hospital"
        style={{ width: "50px", height: "50px", marginRight: "12px" }}
      />
      <div>
        <span style={{ fontWeight: "bold", fontSize: "18px" }}>{item.hospital_name}</span>
        <br />
        <span style={{ fontSize: "14px" }}>
          {item.designation} ({new Date(item.from_year).toLocaleDateString()} - {new Date(item.to_year).toLocaleDateString()})
        </span>
      </div>
    </div>
  ))
}

    </div>

{/*============================= Awards & Certificates=========================================== */}


            <div className="rounded-lg bg-[#EFEFEF] p-8">
              <div  id="award" className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-medium text-black">Awards & Certificates</h3>
                <div className="flex items-center gap-4">
                  <button className="p-2" onClick={handleshowaward}>
                    <svg id="plus-button" className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 32 32">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.67} d="M8 16H16M16 16H24M16 16V24M16 16V8" />
                    </svg>
                  </button>
                  <button className="p-2">
                    <svg id="edit-button" className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 32 32">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.67} d="M26.8664 10.5865L11.0397 26.4133C9.62637 27.8399 5.39969 28.4931 4.43969 27.5465C3.47969 26.5998 4.1597 22.3733 5.57304 20.9466L21.3997 5.11992C22.1305 4.42394 23.1044 4.04122 24.1135 4.05351C25.1227 4.06582 26.0869 4.47216 26.8005 5.18576C27.5141 5.89935 27.9204 6.86367 27.9328 7.87276C27.9451 8.88187 27.5624 9.85578 26.8664 10.5865Z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="space-y-6">
                <AwardItem />
                <AwardItem />
              </div>
            </div>

{/* ================================Upcoming Events============================================== */}


            <div className="rounded-lg bg-[#EFEFEF] p-8">
              <div id="event-heading"  className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-medium text-black">Upcoming Events</h3>
                <div id="event" className="flex items-center gap-4">
                  <button className="p-2" onClick={handleShowupcomingevents}>
                    <svg id="plus-button" className="h-8 w-8 " fill="none" stroke="currentColor" viewBox="0 0 32 32">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.67} d="M8 16H16M16 16H24M16 16V24M16 16V8" />
                    </svg>
                  </button>
                  <button className="p-2" onClick={handleShowupcomingeventsupdate}>
                    <svg id="edit-button" className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 32 32">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.67} d="M26.8664 10.5865L11.0397 26.4133C9.62637 27.8399 5.39969 28.4931 4.43969 27.5465C3.47969 26.5998 4.1597 22.3733 5.57304 20.9466L21.3997 5.11992C22.1305 4.42394 23.1044 4.04122 24.1135 4.05351C25.1227 4.06582 26.0869 4.47216 26.8005 5.18576C27.5141 5.89935 27.9204 6.86367 27.9328 7.87276C27.9451 8.88187 27.5624 9.85578 26.8664 10.5865Z" />
                    </svg>
                  </button>
                </div>
              </div>
              {/* <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/78cd663e8fbd2f1e31e98694bf3785684e685deb?width=1494"
                alt="Upcoming Events"
                className="w-full max-w-4xl h-90 object-cover rounded-lg sm:w-full sm:h-full"
                id="event-img"
              /> */}
              {
                user?.upcoming_events?.map((item,index)=>
                (
                   <img
                src={item}
                alt="Upcoming Events"
                className="w-full max-w-xl h-90 object-cover rounded-lg sm:w-full sm:h-full"
                id="event-img"
              /> 
                ))
              }
            </div>

            {/* Digital CME Contents */}
            <SectionWithVideoGrid title="Digital CME Contents" />

            {/* Innovative Case Studies */}
            <SectionWithCaseStudies title="Innovative Case Studies" />
          </div>
        </div>
      </div>
    </div>

{/*============================== proile update modal ===============================================*/}

    

      <Modal show={show} onHide={handleClose} centered size="lg"  dialogClassName="custom-modal">
        <Modal.Body style={{padding:"20px 50px "}}>
            <button
      type="button"
      onClick={handleClose}
     style={{
      position: "absolute",
      top: 10,
      right: 10,
      border: "2px solid black",
      borderRadius: "50%",  // fully round
      background: "transparent",
      fontSize: "2rem",
      cursor: "pointer",
      fontWeight: "bold",
      width: "35px",
      height: "35px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}

    >
      &times; {/* or use a bootstrap icon */}
    </button>
          <Modal.Title style={{fontWeight:"bold"}}>Update Profile</Modal.Title>
        
 <div className="d-flex flex-column align-items-center mb-4">
          <div className="position-relative">
            <img 
              src={doctorprofile.profile_pic_preview || doctorprofile.profile_pic}
              alt="Profile"
              className="rounded-circle border"
              style={{width: "90px", height: "90px", objectFit: "cover"}}
            />
            {/* Hidden File Input */}
        <input
        name="profile_pic"
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageChange}
        />

        <Tooltip title="Edit profile picture">
        <IconButton
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            bgcolor: '#fff',
            border: '1px solid #ccc',
            width: 30,
            height: 30,
            '&:hover': {
              bgcolor: '#f0f0f0',
            },
          }}
          onClick={() => fileInputRef.current.click()}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>
          </div>
        </div>
          <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label fw-bold">First Name</label>
            <input name="firstName" type="text" className="form-control" defaultValue={doctorprofile.firstName} onChange={handleChange} />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label fw-bold">Last Name</label>
            <input name="lastName" type="text" className="form-control" defaultValue={doctorprofile.lastName} />
          </div>
 <div className="col-md-6 mb-3">
  <label className="form-label fw-bold">Degree</label>
  <FormControl fullWidth size="small"> {/* make small to match other fields */}
    <Select
    name="qualification"
      multiple
      value={doctorprofile.qualification || []} 
    onChange={handleChange}
      renderValue={(selected) => selected.join(", ")} // show comma separated
      sx={{
        ".MuiSelect-select": { padding: "6px 10px" }, // reduce height
      }}
    >
      <MenuItem value="MBBS">
        <Checkbox checked={doctorprofile.qualification?.includes("MBBS")} />
        <ListItemText primary="MBBS" />
      </MenuItem>
      <MenuItem value="BDS">
        <Checkbox checked={doctorprofile.qualification?.includes("BDS")} />
        <ListItemText primary="BDS" />
      </MenuItem>
      <MenuItem value="BAMS">
        <Checkbox checked={doctorprofile.qualification?.includes("BAMS")} />
        <ListItemText primary="BAMS" />
      </MenuItem>
      <MenuItem value="BHMS">
        <Checkbox checked={doctorprofile.qualification?.includes("BHMS")} />
        <ListItemText primary="BHMS" />
      </MenuItem>
    </Select>
  </FormControl>
</div>


          <div className="col-md-6 mb-3">
            <label className="form-label fw-bold">Specialty</label>
            <input name="medical_specialty" type="text" className="form-control"  defaultValue={doctorprofile.medical_specialty}  onChange={handleChange}/>
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label fw-bold">Date Of Birth</label>
            <input name="dateOfBirth" type="date" className="form-control"  defaultValue={doctorprofile.dateOfBirth}  onChange={handleChange}/>
          </div>
         <div className="col-md-6 mb-3">
  <label className="form-label d-block mb-2 fw-bold">Gender</label>
  <div className="form-check form-check-inline">
    <input
      type="radio"
      name="gender"
      id="male"
      className="form-check-input"
      value="male"
      defaultChecked={doctorprofile.gender === "Male"}
       onChange={handleChange}
    />
    <label htmlFor="male" className="form-check-label">Male</label>
  </div>
  <div className="form-check form-check-inline">
    <input
      type="radio"
      name="gender"
      id="female"
      className="form-check-input"
      value="female"
      defaultChecked={doctorprofile.gender === "Female"}
    />
    <label htmlFor="female" className="form-check-label">Female</label>
  </div>
  <div className="form-check form-check-inline">
    <input
      type="radio"
      name="gender"
      id="transgender"
      className="form-check-input"
      value="transgender"
      defaultChecked={doctorprofile.gender === "transgender"}
    />
    <label htmlFor="transgender" className="form-check-label">Transgender</label>
  </div>
</div>

<div className="col-md-6 mb-3">
  <label className="form-label d-block mb-2 fw-bold">Subscription</label>
  <div className="form-check form-check-inline">
    <input
    name="subscription"
      type="checkbox"
      id="digitalCME"
      className="form-check-input"
      value="Digital CME"
      defaultChecked={doctorprofile.subscription?.includes("Digital CME")}
       onChange={handleChange}
    />
    <label htmlFor="digitalCME" className="form-check-label">Digital CME</label>
  </div>
  <div className="form-check form-check-inline">
    <input
    name="subscription"
      type="checkbox"
      id="innovativeCases"
      className="form-check-input"
      value="Innovative Cases"
      defaultChecked={doctorprofile.subscription?.includes("Innovative Cases")}
       onChange={handleChange}
    />
    <label htmlFor="innovativeCases" className="form-check-label">Innovative Cases</label>
  </div>
</div>

        <div className="text-center mt-3">
  <button 
    onClick={updateprofile} 
    className="btn btn-sm" 
    style={{ backgroundColor: "#F86F03", color: "white", borderRadius: "5px", width: "80px",padding:"8px" }}
  >
    Update
  </button>
</div>

          </div>
    
  

        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>




{/*==================== personal information update modal =========================================*/}

 <Modal show={showpersonal} onHide={handleClosepersonal} centered size="lg"  dialogClassName="custom-modal">
        <Modal.Body style={{padding:"20px 50px "}}>
            <button
      type="button"
      onClick={handleClosepersonal}
     style={{
      position: "absolute",
      top: 10,
      right: 10,
      border: "2px solid black",
      borderRadius: "50%",  // fully round
      background: "transparent",
      fontSize: "2rem",
      cursor: "pointer",
      fontWeight: "bold",
      width: "35px",
      height: "35px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}

    >
      &times; {/* or use a bootstrap icon */}
    </button>
          <Modal.Title style={{fontWeight:"bold"}}>Update Personal Details</Modal.Title>
        

    <div className="row mt-4">
        <div className="col-md-6 mb-3 position-relative">
        <label className="form-label fw-bold">Phone Number</label>

        <input name="phone_number" type="text" className="form-control ps-5"
         defaultValue={doctorprofilepersonal.phone_number} onChange={handleChangepersonal}/>

        <svg
          className="position-absolute"
          style={{ left: "25px", top: "75%", transform: "translateY(-50%)", width: "20px", height: "20px", color: "#555" }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 20 21"
        >
          <path
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.5012 9.66663C17.5012 5.98477 14.5164 3 10.8345 3M11.6677 6.43832C12.8392 6.73978 13.7613 7.66198 14.0628 8.83338M13.3861 12.3756C13.8387 11.772 14.6582 11.5786 15.333 11.916L16.3625 12.4307C17.0347 12.7669 17.3988 13.5113 17.2514 14.2483L16.9357 15.8269C16.7799 16.606 16.0935 17.1789 15.3041 17.0896C9.25149 16.405 4.09619 11.2496 3.41152 5.19708C3.32222 4.40765 3.89518 3.72123 4.67422 3.56543L6.2528 3.24971C6.9898 3.10231 7.73426 3.46641 8.07038 4.13865L8.58508 5.16812C8.9225 5.8429 8.72908 6.66241 8.1255 7.11507C7.73242 7.40988 7.49276 7.88342 7.68271 8.33656C8.33558 9.89405 10.6071 12.1655 12.1646 12.8184C12.6177 13.0084 13.0912 12.7687 13.3861 12.3756Z"
          />
        </svg>
      </div>

           <div className="col-md-6 mb-3 position-relative">
        <label className="form-label fw-bold">Email Id</label>

        <input name="email" type="text" className="form-control ps-5"
         defaultValue={doctorprofilepersonal.email} onChange={handleChangepersonal}/>

        <svg
          className="position-absolute"
          style={{ left: "25px", top: "75%", transform: "translateY(-50%)", width: "20px", height: "20px", color: "#555" }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 20 21"
        >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.33203 6.33329L8.4987 10.2083C9.38761 10.8749 10.6098 10.8749 11.4987 10.2083L16.6654 6.33325" />
        <path strokeLinecap="round" strokeWidth={2} d="M15.8333 4.66675H4.16667C3.24619 4.66675 2.5 5.41294 2.5 6.33341V14.6667C2.5 15.5872 3.24619 16.3334 4.16667 16.3334H15.8333C16.7538 16.3334 17.5 15.5872 17.5 14.6667V6.33341C17.5 5.41294 16.7538 4.66675 15.8333 4.66675Z" />
        </svg>
      </div>
 
           <div className="col-md-6 mb-3 position-relative">
            <label className="form-label fw-bold">Website</label>
            <input name="website" type="text" className="form-control ps-5"
             defaultValue={doctorprofilepersonal.website} onChange={handleChangepersonal}/>
             <svg
          className="position-absolute"
          style={{ left: "25px", top: "75%", transform: "translateY(-50%)", width: "20px", height: "20px", color: "#555" }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 20 21"
        >
              <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M17.5 10.5C17.5 14.6422 14.1422 18 10 18M17.5 10.5C17.5 6.35787 14.1422 3 10 3M17.5 10.5C17.5 11.8807 14.1422 13 10 13C5.85787 13 2.5 11.8807 2.5 10.5M17.5 10.5C17.5 9.11925 14.1422 8 10 8C5.85787 8 2.5 9.11925 2.5 10.5M10 18C5.85787 18 2.5 14.6422 2.5 10.5M10 18C8.61925 18 7.5 14.6422 7.5 10.5C7.5 6.35787 8.61925 3 10 3M10 18C11.3807 18 12.5 14.6422 12.5 10.5C12.5 6.35787 11.3807 3 10 3M10 3C5.85787 3 2.5 6.35787 2.5 10.5" />
          </svg>
          </div>
         <div className="col-md-6 mb-3">
  <label className="form-label fw-bold">Select Country</label>
  <select
    name="country"
    className="form-control"
    defaultValue={doctorprofilepersonal.country}
    onChange={handleChangepersonal}
  >
    <option value="">-- Select Country --</option>
    <option value="India">India</option>
    <option value="United States">United States</option>
    <option value="United Kingdom">United Kingdom</option>
    <option value="Canada">Canada</option>
    <option value="Australia">Australia</option>
    <option value="Germany">Germany</option>
    <option value="France">France</option>
    <option value="Japan">Japan</option>
    <option value="China">China</option>
    <option value="Brazil">Brazil</option>
    <option value="South Africa">South Africa</option>
    {/* add more countries as needed */}
  </select>
</div>

        <div className="col-md-6 mb-3">
            <label className="form-label fw-bold">Address 1</label>
            <input name="address1" type="text" className="form-control" 
             defaultValue={doctorprofilepersonal.address1} onChange={handleChangepersonal}/>
          </div>
           <div className="col-md-6 mb-3">
            <label className="form-label fw-bold">Address 2</label>
            <input name="address2" type="text" className="form-control" 
             defaultValue={doctorprofilepersonal.address2} onChange={handleChangepersonal}/>
          </div>

          
         <div className="col-md-6 mb-3">
        <label className="form-label fw-bold">State</label>
        <select
          name="state"
          className="form-control"
          value={doctorprofilepersonal.state}
          onChange={handleChangepersonal}
        >
          <option value="">{doctorprofilepersonal.state}</option>
          <option value="">-- Select State --</option>
          {states.map((state) => (
            <option key={state.isoCode} value={state.name}>
              {state.name}
            </option>
          ))}
        </select>
      </div>

      {/* City Dropdown */}
      <div className="col-md-6 mb-3">
        <label className="form-label fw-bold">City</label>
        <select
          name="city"
          className="form-control"
          value={doctorprofilepersonal.city}
          onChange={handleChangepersonal}
          disabled={!doctorprofilepersonal.state}
        >
              <option value="">{doctorprofilepersonal.city}</option>
          <option value="">-- Select City --</option>
          {cities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </div>

         
          
            <div className="col-md-6 mb-3">
            <label className="form-label fw-bold">Postal Code</label>
            <input name="postal_code" type="text" className="form-control" 
             defaultValue={doctorprofilepersonal.postal_code} onChange={handleChangepersonal}/>
          </div>



        <div className="text-center mt-3">
  <button 
    onClick={updateprofilepresonal} 
    className="btn btn-sm" 
    style={{ backgroundColor: "#F86F03", color: "white", borderRadius: "5px", width: "80px",padding:"8px" }}
  >
    Update
  </button>
</div>

          </div>
    
  

        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
 

{/*========================= bio update modal ==================================================*/}

<Modal show={showbio} onHide={handleClosebio} centered size="lg"  dialogClassName="custom-modal">
        <Modal.Body style={{padding:"20px 50px "}}>
            <button
      type="button"
      onClick={handleClosebio}
     style={{
      position: "absolute",
      top: 10,
      right: 10,
      border: "2px solid black",
      borderRadius: "50%",  // fully round
      background: "transparent",
      fontSize: "2rem",
      cursor: "pointer",
      fontWeight: "bold",
      width: "35px",
      height: "35px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}

    >
      &times; {/* or use a bootstrap icon */}
    </button>
      <Modal.Title style={{fontWeight:"bold"}}>Update Bio</Modal.Title>
          <div className="row mt-3">
  <div className="col-md-12 mb-3 position-relative">
    <label className="form-label fw-bold">Bio</label>
    <textarea
      name="bio"
      className="form-control"
      rows="8"
      value={doctorprofilebio.bio || ""}  // ✅ fallback to empty string
      onChange={handleChangebio}
    />

   <p style={{ textAlign: "right",fontWeight:"bold",color:doctorprofilebio?.bio?.length>1100 ? "red":"black" }}>
        {doctorprofilebio?.bio?.length}/{maxChars}
      </p>
  </div>


  
    <div className="text-center mt-3">
  <button 
    onClick={updateprofilebio} 
    className="btn btn-sm" 
    style={{ backgroundColor: "#F86F03", color: "white", borderRadius: "5px", width: "80px",padding:"8px" }}
  >
    Update
  </button>
</div>

          </div>
    
  

        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>



{/*========================= bio video modal=================================================== */}

<Modal show={showbiovideo} onHide={handleClosebiovideo} centered size="lg"  dialogClassName="custom-modal">
        <Modal.Body style={{padding:"20px 50px "}}>
            <button
      type="button"
      onClick={handleClosebiovideo}
     style={{
      position: "absolute",
      top: 10,
      right: 10,
      border: "2px solid black",
      borderRadius: "50%",  // fully round
      background: "transparent",
      fontSize: "2rem",
      cursor: "pointer",
      fontWeight: "bold",
      width: "35px",
      height: "35px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}

    >
      &times; {/* or use a bootstrap icon */}
    </button>
      <Modal.Title style={{fontWeight:"bold"}}>Update Bio Video</Modal.Title>
      <div className="row mt-3">
      <div className="col-md-12 mb-3 position-relative">
            <label className="form-label fw-bold">Bio Video Link</label>
            <input name="website" type="text" className="form-control"
             defaultValue={doctorprofilebiovideo.bio_video} onChange={handleChangebiovideo}/>
            
          </div>


  
    <div className="text-center mt-3">
  <button 
    onClick={updateprofilebiovideo} 
    className="btn btn-sm" 
    style={{ backgroundColor: "#F86F03", color: "white", borderRadius: "5px", width: "80px",padding:"8px" }}
  >
    Update
  </button>
</div>

          </div>
    
  

        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>


{/*================================= upload image modal =========================================*/}

<Modal show={showimagegalarry} onHide={handleCloseimagegalarry} centered size="lg"  dialogClassName="custom-modal">
        <Modal.Body style={{padding:"20px 50px "}}>
            <button
      type="button"
      onClick={handleCloseimagegalarry}
     style={{
      position: "absolute",
      top: 10,
      right: 10,
      border: "2px solid black",
      borderRadius: "50%",  // fully round
      background: "transparent",
      fontSize: "2rem",
      cursor: "pointer",
      fontWeight: "bold",
      width: "35px",
      height: "35px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}

    >
      &times; {/* or use a bootstrap icon */}
    </button>
      <Modal.Title style={{fontWeight:"bold"}}>Update More</Modal.Title>
      <div className="row mt-3">
     <div class="upload-drop-zone">
    <div class="upload-drop-icon">&#8682;</div>
    <div class="upload-instructions">
      <strong>Drag or Drop Your Photo &amp; Video</strong>
      <div class="upload-or">Or</div>
      <label class="upload-browse">
        <input multiple type="file" hidden onChange={handleaddimagegallary} />
        <span>Browse the File</span>
      </label>
      <div class="upload-info">
        Upload in PDF, JPEG, PNG, .jpg, .gif format<br/>
        (Not more than 20MB)
      </div>
    </div>
  </div>


  
    <div className="text-center mt-3">
  <button 
    onClick={addimagegallary} 
    className="btn btn-sm" 
    style={{ backgroundColor: "#F86F03", color: "white", borderRadius: "5px", width: "80px",padding:"8px" }}
  >
    Add
  </button>
</div>

          </div>
    
  

        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>


{/*======================= update image gallary =================================================*/}

<Modal show={showimagegalarryupdate} onHide={handleCloseimagegalarryupdate} centered size="xl"  dialogClassName="custom-modal">
        <Modal.Body style={{padding:"20px 50px "}}>
            <button
      type="button"
      onClick={handleCloseimagegalarryupdate}
     style={{
      position: "absolute",
      top: 10,
      right: 10,
      border: "2px solid black",
      borderRadius: "50%",  // fully round
      background: "transparent",
      fontSize: "2rem",
      cursor: "pointer",
      fontWeight: "bold",
      width: "35px",
      height: "35px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}

    >
      &times; {/* or use a bootstrap icon */}
    </button>
      <Modal.Title style={{fontWeight:"bold"}}>Update Gallery</Modal.Title>
      <div className="row mt-3">
   

    <div className="text-center mt-3">

<div className="gallery-image grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 mb-6">
  {user?.image_gallary?.length > 0 ? (
    user.image_gallary.map((imgUrl, index) => (
      <div
        key={index}
        className="relative  aspect-[4/3] rounded-md overflow-hidden border shadow-sm"
      >
        {/* Image */}
        <img
          src={imgUrl}
          alt={`Gallery ${index + 1}`}
          className="w-full h-full object-cover"
        />

        {/* Delete button */}
        <button
          onClick={() => handleDelete(index)}
          className="absolute top-0 right-0 p-1 flex items-center justify-center bg-white rounded-bl-md hover:bg-red-100 transition"
        >
          <span
            className="material-icons"
            style={{ color: "red", fontSize: "22px" }}
          >
            delete
          </span>
        </button>
      </div>
    ))
  ) : (
    <p className="col-span-full text-center text-gray-500">
      No images available
    </p>
  )}
</div>




  </div>

          </div>
    
  

        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>

{/*========================= add upcoming events modal============================================= */}

<Modal show={showupcomingevents} onHide={handleCloseupcomingevents} centered size="lg"  dialogClassName="custom-modal">
        <Modal.Body style={{padding:"20px 50px "}}>
            <button
      type="button"
      onClick={handleCloseupcomingevents}
     style={{
      position: "absolute",
      top: 10,
      right: 10,
      border: "2px solid black",
      borderRadius: "50%",  // fully round
      background: "transparent",
      fontSize: "2rem",
      cursor: "pointer",
      fontWeight: "bold",
      width: "35px",
      height: "35px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}

    >
      &times; {/* or use a bootstrap icon */}
    </button>
      <Modal.Title style={{fontWeight:"bold"}}>Update More</Modal.Title>
      <div className="row mt-3">
     <div class="upload-drop-zone">
    <div class="upload-drop-icon">&#8682;</div>
    <div class="upload-instructions">
      <strong>Drag or Drop Your Photo &amp; Video</strong>
      <div class="upload-or">Or</div>
      <label class="upload-browse">
        <input name="upcoming_events" multiple type="file" hidden onChange={handleaddupcomingevents} />
        <span>Browse the File</span>
      </label>
      <div class="upload-info">
        Upload in PDF, JPEG, PNG, .jpg, .gif format<br/>
        (Not more than 20MB)
      </div>
    </div>
  </div>


  
    <div className="text-center mt-3">
  <button 
    onClick={addupcomingevents} 
    className="btn btn-sm" 
    style={{ backgroundColor: "#F86F03", color: "white", borderRadius: "5px", width: "80px",padding:"8px" }}
  >
    Add
  </button>
</div>

          </div>
    
  

        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>


  {/*========================== update upcoming events =========================================*/}

  <Modal show={showupcomingeventsupdate} onHide={handleCloseupcomingeventsupdate} centered size="xl"  dialogClassName="custom-modal">
        <Modal.Body style={{padding:"20px 50px "}}>
            <button
      type="button"
      onClick={handleCloseupcomingeventsupdate}
     style={{
      position: "absolute",
      top: 10,
      right: 10,
      border: "2px solid black",
      borderRadius: "50%",  // fully round
      background: "transparent",
      fontSize: "2rem",
      cursor: "pointer",
      fontWeight: "bold",
      width: "35px",
      height: "35px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}

    >
      &times; {/* or use a bootstrap icon */}
    </button>
      <Modal.Title style={{fontWeight:"bold"}}>Update Events</Modal.Title>
      <div className="row mt-3">
   

    <div className="text-center mt-3">

<div className="gallery-image grid grid-cols-1 gap-6 mb-6"> 
  {user?.upcoming_events?.length > 0 ? (
    user.upcoming_events.map((imgUrl, index) => (
      <div
        key={index}
        className="relative w-full h-72 rounded-md overflow-hidden border shadow-sm"
      >
        {/* Image */}
        <img
          src={imgUrl}
          alt={`Gallery ${index + 1}`}
          className="w-full h-full object-cover"
        />

        {/* Delete button */}
        <button
          onClick={() => handleDeleteupcomingevents(index)}
          className="absolute top-0 right-0 p-2 flex items-center justify-center bg-white rounded-bl-md hover:bg-red-100 transition"
        >
          <span
            className="material-icons"
            style={{ color: "red", fontSize: "26px" }}
          >
            delete
          </span>
        </button>
      </div>
    ))
  ) : (
    <p className="col-span-full text-center text-gray-500">
      No images available
    </p>
  )}
</div>





  </div>

          </div>
    
  

        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>


{/*============================= add work experience============================================ */}

<Modal show={showworkexperience} onHide={handlecloseworkexperience} centered size="lg"  dialogClassName="custom-modal">
        <Modal.Body style={{padding:"20px 50px "}}>
            <button
      type="button"
      onClick={handlecloseworkexperience}
     style={{
      position: "absolute",
      top: 10,
      right: 10,
      border: "2px solid black",
      borderRadius: "50%",  // fully round
      background: "transparent",
      fontSize: "2rem",
      cursor: "pointer",
      fontWeight: "bold",
      width: "35px",
      height: "35px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}

    >
      &times; {/* or use a bootstrap icon */}
    </button>
          <Modal.Title style={{fontWeight:"bold"}}>Add Work Experience</Modal.Title>
        
 
          <div className="row mt-4">
          <div className="col-md-6 mb-3">
            <label className="form-label fw-bold">Hospital Name</label>
            <input name="hospital_name" type="text" className="form-control" defaultValue={doctorprofileworkexperience.hospital_name} onChange={handlechangeworkexperience} />
          </div>
         
          <div className="col-md-6 mb-3">
            <label className="form-label fw-bold">From Year</label>
            <input name="from_year" type="date" className="form-control"  defaultValue={doctorprofileworkexperience.from_year}  onChange={handlechangeworkexperience}/>
          </div>

           <div className="col-md-6 mb-3">
            <label className="form-label fw-bold">To Year</label>
            <input name="to_year" type="date" className="form-control"  defaultValue={doctorprofileworkexperience.to_year}  onChange={handlechangeworkexperience}/>
          </div>

           <div className="col-md-6 mb-3">
            <label className="form-label fw-bold">Designation</label>
            <input name="designation" type="text" className="form-control" defaultValue={doctorprofileworkexperience.designation} onChange={handlechangeworkexperience} />
          </div>

           <div className="col-md-6 mb-3">
            <label className="form-label fw-bold">Major Achievements</label>
            <input name="major_achievements" type="text" className="form-control" defaultValue={doctorprofileworkexperience.major_achievements} onChange={handlechangeworkexperience}/>
          </div>
  



        <div className="text-center mt-3">
  <button 
    onClick={updateworkexperience} 
    className="btn btn-sm" 
    style={{ backgroundColor: "#F86F03", color: "white", borderRadius: "5px", width: "80px",padding:"8px" }}
  >
    Update
  </button>
</div>

          </div>
    
  

        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>

{/*===================================== add award ==================================================*/}

<Modal show={showaward} onHide={handlecloseaward} centered size="lg"  dialogClassName="custom-modal">
        <Modal.Body style={{padding:"20px 50px "}}>
            <button
      type="button"
      onClick={handlecloseaward}
     style={{
      position: "absolute",
      top: 10,
      right: 10,
      border: "2px solid black",
      borderRadius: "50%",  // fully round
      background: "transparent",
      fontSize: "2rem",
      cursor: "pointer",
      fontWeight: "bold",
      width: "35px",
      height: "35px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}

    >
      &times; {/* or use a bootstrap icon */}
    </button>
          <Modal.Title style={{fontWeight:"bold"}}>Add Our Reward </Modal.Title>
        
 
          <div className="row mt-4">
          <div className="col-md-6 mb-3">
            <label className="form-label fw-bold">Award Title</label>
            <input name="hospital_name" type="text" className="form-control" defaultValue={doctorprofileworkexperience.hospital_name} onChange={handlechangeworkexperience} />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label fw-bold">Awarding Body</label>
            <input name="hospital_name" type="text" className="form-control" defaultValue={doctorprofileworkexperience.hospital_name} onChange={handlechangeworkexperience} />
          </div>
          
         
          <div className="col-md-6 mb-3">
            <label className="form-label fw-bold">Date</label>
            <input name="from_year" type="date" className="form-control"  defaultValue={doctorprofileworkexperience.from_year}  onChange={handlechangeworkexperience}/>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label fw-bold">Venue</label>
            <input name="hospital_name" type="text" className="form-control" defaultValue={doctorprofileworkexperience.hospital_name} onChange={handlechangeworkexperience} />
          </div>

          

           <div className="col-md-6 mb-3">
            <label className="form-label fw-bold">Video Url</label>
            <input name="designation" type="text" className="form-control" defaultValue={doctorprofileworkexperience.designation} onChange={handlechangeworkexperience} />
          </div>

         
  



        <div className="text-center mt-3">
  <button 
    onClick={updateworkexperience} 
    className="btn btn-sm" 
    style={{ backgroundColor: "#F86F03", color: "white", borderRadius: "5px", width: "80px",padding:"8px" }}
  >
    Update
  </button>
</div>

          </div>
    
  

        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>


       {loading && (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(255, 255, 255, 0.6)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <UniqueLoader />
  </div>
)}

    </>
  );
}
























//============================== functin for other fields====================================================



function AwardItem() {
  return (
    <div id="award-image" className="flex  items-start gap-2">
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/6b9cac229d3f7e85fc4fb86003b5504fb855a96b?width=186"
        alt="Award"
        className="h-24 w-24 mt-3 rounded-xl object-cover"
      />
      <div id="award-container" className="flex-1 space-y-3">
        <div>
          <h4 id="award-header" className="text-xl ml-0  font-medium text-black">🏅 Best Cardiologist 2022</h4>
          <p id="award-page" className="text-xs ml-3 text-black/75 font-medium">Indian Medical Association</p>
        </div>
               <p id="award-page2" className="text-xs ml-3 text-black/75">I has received multiple awards for excellence in cardi.....</p>
      <div id="award-certificate" className=" flex mb-5  items-center justify-start gap-6">
  {/* Date */}
  <div id="award-date" className="flex  ml-3 items-center gap-2">
    <svg className="h-4 w-4 text-black/50" fill="currentColor" viewBox="0 0 15 15">
      <path d="M4.375 6.25H10.625M4.375 8.75H7.5M4.375 1.875V3.125M10.625 1.875V3.125M3.875 13.125H11.125C11.8251 13.125 12.1751 13.125 12.4425 12.9887C12.6777 12.8689 12.8689 12.6777 12.9887 12.4425C13.125 12.1751 13.125 11.8251 13.125 11.125V5.125C13.125 4.42493 13.125 4.0749 12.9887 3.80751C12.8689 3.57231 12.6777 3.38108 12.4425 3.26124C12.1751 3.125 11.8251 3.125 11.125 3.125H3.875C3.17494 3.125 2.8249 3.125 2.55751 3.26124C2.32231 3.38108 2.13108 3.57231 2.01124 3.80751C1.875 4.0749 1.875 4.42493 1.875 5.125V11.125C1.875 11.8251 1.875 12.1751 2.01124 12.4425C2.13108 12.6777 2.32231 12.8689 2.55751 12.9887C2.8249 13.125 3.17493 13.125 3.875 13.125Z" />
    </svg>
    <span className="text-xs font-semibold text-black/75">15/05/2022</span>
   </div>

  {/* View Certificate */}
    <div id="view-cirtificate" className="flex items-center gap-2">
    <svg className="h-4 w-4 text-black/50" fill="none" stroke="currentColor" viewBox="0 0 15 15">
      <path strokeLinecap="round" strokeWidth={1.25} d="M8.75 7.5C8.75 9.22587 7.35087 10.625 5.625 10.625H4.375C2.64911 10.625 1.25 9.22587 1.25 7.5C1.25 5.77411 2.64911 4.375 4.375 4.375H4.6875M6.25 7.5C6.25 5.77411 7.64912 4.375 9.375 4.375H10.625C12.3509 4.375 13.75 5.77411 13.75 7.5C13.75 9.22587 12.3509 10.625 10.625 10.625H10.3125" />
    </svg>
    <span className="text-xs font-semibold text-primary underline">View Certificate</span>
    </div>
    </div>
     </div>
    </div>
  );
}

function SectionWithImages({ title }) {
  return (
    <div className="rounded-lg bg-[#EFEFEF] p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-medium text-black">{title}</h3>
        <div id="gallary" className="flex items-center gap-4">
          <button className="p-2" >
            <svg id="plus-button" className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 32 32">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.67} d="M8 16H16M16 16H24M16 16V24M16 16V8" />
            </svg>
          </button>
          <button className="p-2">
            <svg id="edit-button" className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 32 32">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.67} d="M26.8664 10.5865L11.0397 26.4133C9.62637 27.8399 5.39969 28.4931 4.43969 27.5465C3.47969 26.5998 4.1597 22.3733 5.57304 20.9466L21.3997 5.11992C22.1305 4.42394 23.1044 4.04122 24.1135 4.05351C25.1227 4.06582 26.0869 4.47216 26.8005 5.18576C27.5141 5.89935 27.9204 6.86367 27.9328 7.87276C27.9451 8.88187 27.5624 9.85578 26.8664 10.5865Z" />
            </svg>
          </button>
        </div>
      </div>
      <div className=" gallery-image grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 mb-6">
  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
    <div key={i} className="aspect-[4/3] rounded-lg overflow-hidden">
      <img
        src={`https://api.builder.io/api/v1/image/assets/TEMP/${
          i === 1
            ? "ddb409042be3f954b59b0cb47684677d7ce51356"
            : i === 2
            ? "5be83afe340568f7c4a5e93394b0873bd9c183e8"
            : i === 3
            ? "466794a463d5c4b31f51dadb0efd3575c3d75668"
            : i === 4
            ? "b91d0df4656ba3c498568d86fb50f046a1eec901"
            : i === 5
            ? "f646eac8358748baa02029528f08353b95402dbe"
            : i === 6
            ? "66a564adca9fb765b3def09045f0af645b0c88c6"
            : i === 7
            ? "f646eac8358748baa02029528f08353b95402dbe"
            : "f5ddc7a342a5cbc930459f63cf40f1829fea19ce"
        }?width=336`}
        alt={`Gallery ${i}`}
        className="w-full h-full object-cover"
      />
    </div>
  ))}
</div>
    </div>
  );
}

function SectionWithVideoGrid({ title }) {
  return (
    <div className="rounded-lg bg-[#EFEFEF] p-8">
      <div id="digital-cme" className="flex items-center justify-between mb-8">
        <h3  className="text-2xl font-medium text-black">{title}</h3>
        <div className="function-button flex items-center gap-4">
          <button className="p-2">
            <svg id="plus-button" className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 32 32">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.67} d="M8 16H16M16 16H24M16 16V24M16 16V8" />
            </svg>
          </button>
          <button className="p-2">
            <svg id="edit-button" className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 32 32">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.67} d="M26.8664 10.5865L11.0397 26.4133C9.62637 27.8399 5.39969 28.4931 4.43969 27.5465C3.47969 26.5998 4.1597 22.3733 5.57304 20.9466L21.3997 5.11992C22.1305 4.42394 23.1044 4.04122 24.1135 4.05351C25.1227 4.06582 26.0869 4.47216 26.8005 5.18576C27.5141 5.89935 27.9204 6.86367 27.9328 7.87276C27.9451 8.88187 27.5624 9.85578 26.8664 10.5865Z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <VideoCard key={i} />
        ))}
      </div>
    </div>
  );
}

function SectionWithCaseStudies({ title }) {
  return (
    <div className="rounded-lg bg-[#EFEFEF] p-8">
      <div className=" case-study flex items-center justify-between mb-8">
        <h3  className="text-2xl font-medium text-black">{title}</h3>
        <div className="flex items-center gap-4">
          <button className="p-2">
            <svg  id="plus-button" className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 32 32">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.67} d="M8 16H16M16 16H24M16 16V24M16 16V8" />
            </svg>
          </button>
          <button className="p-2">
            <svg  id="edit-button" className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 32 32">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.67} d="M26.8664 10.5865L11.0397 26.4133C9.62637 27.8399 5.39969 28.4931 4.43969 27.5465C3.47969 26.5998 4.1597 22.3733 5.57304 20.9466L21.3997 5.11992C22.1305 4.42394 23.1044 4.04122 24.1135 4.05351C25.1227 4.06582 26.0869 4.47216 26.8005 5.18576C27.5141 5.89935 27.9204 6.86367 27.9328 7.87276C27.9451 8.88187 27.5624 9.85578 26.8664 10.5865Z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <CaseStudyCard key={i} />
        ))}
      </div>
    </div>
  );
}

function VideoCard() {
  return (
    <div className="space-y-3">
      <div
        className="aspect-video rounded bg-gradient-to-b from-black/15 to-black/15 bg-cover bg-center relative"
        style={{
          backgroundImage: `url('https://api.builder.io/api/v1/image/assets/TEMP/217096612a6ad7690b13676112155122f937a83f?width=454')`,
        }}
      >
        <button className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
            <svg
              className="h-4 w-4 text-primary ml-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 18L21 12L9 6v12z" />
            </svg>
          </div>
        </button>
      </div>
      <div className="space-y-1">
        <p className="text-xs text-black">Doctor Mike hosts the AMA Tribute to the Medical School Class of 2023</p>
        <div className="flex items-center  justify-start gap-1">
          <img src={image3} className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 25 24">
            
          </img>
          <span className="text-xs text-black/50">20/07/2025, 02:03</span>
        </div>
      </div>
    </div>
  );
}

function CaseStudyCard() {
  return (
    <div className="space-y-3">
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/936762393e6ad66842daf467fa264eb00eb21674?width=454"
        alt="Case Study"
        className="aspect-video w-full rounded-lg object-cover shadow-md"
      />
      <div className="space-y-1">
        <p className="text-xs text-black">Doctor Mike hosts the AMA Tribute to the Medical School Class of 2023</p>
        <div className="flex items-center  justify-start gap-1">
          <img src={image3} className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 25 24">
           
          </img>
          <span className="text-xs  text-black/50">20/07/2025, 02:03</span>
        </div>
      </div>
    </div>
  );
}

