import React, { useState,useRef, useEffect } from "react";
import api from '../../api'
import Doctorheader from "./doctorheader";
import Doctorsidebar from "./doctorsidebar";
import { FaEdit } from "react-icons/fa";
import Swal from 'sweetalert2';
import { Modal, Button, Form } from "react-bootstrap";

function Updateawards() {

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

    

  // ===========================edit doctor awards information=======================================

    const[loading,setloading]=useState(false)

const[doctorprofileaward,setdoctorprofileaward] =useState({doctor_id:"",award_title:"",awarding_body:"",
                                      date: '',venue: '',award_image: [],picture_gallary:[],video_url:""});

    


const handleDeleteAwardImage = async (imageIndex) => {
    setdoctorprofileaward((prev) => ({
    ...prev,
    award_image: prev.award_image.filter((_, i) => i !== imageIndex)
  }));
  try {
    const response = await api.put(
      `doctor/deleteawardimage/${doctordetails.user._id}/${awardIndex}/${imageIndex}`
    );

  alert("image delete")
    return response.data; // return updated doctor data
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};

const handleDeletepicturegallary = async (imageIndex) => {
    setdoctorprofileaward((prev) => ({
    ...prev,
    picture_gallary: prev.picture_gallary.filter((_, i) => i !== imageIndex)
  }));
  try {
    const response = await api.put(
      `doctor/deletepicturegallary/${doctordetails.user._id}/${awardIndex}/${imageIndex}`
    );

  alert("image delete")
    return response.data; // return updated doctor data
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};



 useEffect(() => {
  if (user && Object.keys(user).length > 0) {
    setdoctorprofileaward(user);
    setdoctorprofileaward({...setdoctorprofileaward,doctor_id:user._id})
  }
}, [user]);


const [awardIndex,setawardIndex]=useState("")
 const [showaward, setshowaward] = useState(false);

  const handleshowaward = (item,index) =>
    {
        setawardIndex(index)
        setshowaward(true);
        setdoctorprofileaward(item)

    } 
  const handlecloseaward = () => setshowaward(false);



  const handlechangeaward = (e) => {
  const { name, value, checked, type } = e.target;

  setdoctorprofileaward((prev) => {
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

const handlechangeawardimage = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 0) {
  
        setdoctorprofileaward((prev) => ({
        ...prev,
        award_image: [...(prev.award_image || []), ...files],
        }));
    }
    };

    const handlechangepicturegallary = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 0) {
  
        setdoctorprofileaward((prev) => ({
        ...prev,
        picture_gallary: [...(prev.picture_gallary || []), ...files],

        }));
    }
    };



const updateaward=async()=>
{
  try {
    setloading(true)
    const resp = await api.put(`doctor/updateaward/${doctordetails.user._id}/${awardIndex}`,doctorprofileaward,
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
   handlecloseaward()
    
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
    <div>
        <Doctorheader/>
        <Doctorsidebar/>

        <div className="min-h-screen bg-background">
              <div className="ml-0 lg:ml-64 pt-4">
                <div className=" mx-auto p-4 lg:p-8 space-y-6 lg:space-y-8">
{/*=============================== Award section===============================================*/}
        
        
            <div  className=" rounded-lg p-6">
              {/* Header */}
              <div className="work-experience flex items-center justify-between mb-8">
                <div className="work-experience-heading ">
                <h3 className=" text-2xl font-semibold text-black">Update Awards & Certificates</h3>
                </div>
                <div className="work-experincemain flex items-center gap-3">
                  <button  className=" hover:bg-gray-200 p-2 rounded-full" >
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
                
                </div>
              </div>
        
             



{
  user?.awards_and_achievements?.map((item, index) => (
    <div
      key={index}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "15px",
        marginBottom: "15px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        backgroundColor: "#EFEFEF",
      }}
    >
      {/* Left side: hospital logo + details */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
        src={item.award_image[0]}
        alt="hospital"
        style={{ width: "100px", height: "100px", marginRight: "12px",borderRadius:"5%" }}
    />
          <div>
                  <span style={{ fontWeight: "bold", fontSize: "18px" }}>{item.award_title}</span>
                  <br />
                   <span>{item.awarding_body}</span><br></br>
                  <span style={{ fontSize: "14px" }}>
                   {new Date(item.date).toLocaleDateString()}
                  </span>
                </div>
      </div>

      {/* Right side: Edit icon */}
       <button className="hover:bg-gray-200 p-2 rounded-full" onClick={()=>handleshowaward(item,index)}>
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
  ))
}

        
            </div>
        
                  
        
        
        
                 
                  </div>
                </div>
              </div>
        
{/*======================== update awards modal ========================================*/}

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
          <Modal.Title style={{fontWeight:"bold"}}>Update Reward and Certificates </Modal.Title>
        
 
          <div className="row mt-4">
          <div className="col-md-6 mb-3">
            <label className="form-label fw-bold">Award Title</label>
            <input name="award_title" type="text" className="form-control" defaultValue={doctorprofileaward.award_title} onChange={handlechangeaward} />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label fw-bold">Awarding Body</label>
            <input name="awarding_body" type="text" className="form-control" defaultValue={doctorprofileaward.awarding_body} onChange={handlechangeaward} />
          </div>
          
         
          <div className="col-md-6 mb-3">
            <label className="form-label fw-bold">Date</label>
            <input name="date" type="date" className="form-control"  defaultValue={doctorprofileaward.date}  onChange={handlechangeaward}/>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label fw-bold">Venue</label>
            <input name="venue" type="text" className="form-control" defaultValue={doctorprofileaward.venue} onChange={handlechangeaward} />
          </div>

          

           <div className="col-md-6 mb-3">
            <label className="form-label fw-bold">Video Url</label>
            <input name="video_url" type="text" className="form-control" defaultValue={doctorprofileaward.video_url} onChange={handlechangeaward} />
          </div>


    <label className="form-label fw-bold">Award Image</label>
    <div className="gallery-image grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 mb-6">
  {doctorprofileaward.award_image?.length > 0 ? (
    doctorprofileaward.award_image.map((imgUrl, index) => (
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
          onClick={() => handleDeleteAwardImage(index)}
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




     <div class="upload-drop-zone">
    <div class="upload-drop-icon">&#8682;</div>
    <div class="upload-instructions">
      <strong>Drag or Drop Your Photo &amp; Video</strong>
      <div class="upload-or">Or</div>
      <label class="upload-browse">
        <input name="award_image" multiple type="file" hidden onChange={handlechangeawardimage} />
        <span>Browse the File</span>
      </label>
      <div class="upload-info">
        Upload in PDF, JPEG, PNG, .jpg, .gif format<br/>
        (Not more than 20MB)
      </div>
    </div>
  </div>

   <label className="form-label fw-bold">Picture Gallery</label>
<div className="gallery-image grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 mb-6">
  {doctorprofileaward.picture_gallary?.length > 0 ? (
    doctorprofileaward.picture_gallary.map((imgUrl, index) => (
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
          onClick={() => handleDeletepicturegallary(index)}
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

     <div class="upload-drop-zone">
    <div class="upload-drop-icon">&#8682;</div>
    <div class="upload-instructions">
      <strong>Drag or Drop Your Photo &amp; Video</strong>
      <div class="upload-or">Or</div>
      <label class="upload-browse">
        <input name="picture_gallary" multiple type="file" hidden onChange={handlechangepicturegallary} />
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
    onClick={updateaward} 
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

      
    </div>
  )
}

export default Updateawards
