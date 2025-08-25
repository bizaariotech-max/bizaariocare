import React, { useState,useRef, useEffect } from "react";
import api from '../../api'
import Doctorheader from "./doctorheader";
import Doctorsidebar from "./doctorsidebar";
import { FaEdit } from "react-icons/fa";
import Swal from 'sweetalert2';
import { Modal, Button, Form } from "react-bootstrap";

function Updateupcomingevent() {

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

  // ===========================edit doctor work experience information=======================================

    const[loading,setloading]=useState(false)

const [doctorprofileaddupcomingevents, setdoctorprofileaddupcomingevents] = useState({doctor_id:"",
  event_id:"",event_type:"",event_title:"",venue:"",start_date:"",end_date:"",start_time:"",
  end_time:"",instructions_for_attendees:"",currency:"",fee:"", event_image: [],events_preview:[]});


    const handleChangeupcomingevents = (e) => {
  const { name, value, checked, type } = e.target;

  setdoctorprofileaddupcomingevents((prev) => {
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

   const handleaddupcomingevents = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 0) {
        const previewUrls = files.map((file) => URL.createObjectURL(file));

        setdoctorprofileaddupcomingevents((prev) => ({
        ...prev,
        event_image: [...(prev.event_image || []), ...files],
        events_preview: [...(prev.events_preview || []), ...previewUrls],
        }));
    }
    };



const [showupcomingevents, setshowupcomingevents] = useState(false);




 
const [eventindex,seteventindex]=useState("")
 
  const handleShowupcomingevents = (item,index) => 
    {
        seteventindex(index)
        setshowupcomingevents(true);
        setdoctorprofileaddupcomingevents(item)
    }
const handleCloseupcomingevents = () => setshowupcomingevents(false);


const handleDeleteAwardImage = async (imageIndex) => {
    setdoctorprofileaddupcomingevents((prev) => ({
    ...prev,
    event_image: prev.event_image.filter((_, i) => i !== imageIndex)
  }));

  try {
    const response = await api.put(
      `doctor/deleteupcomingeventsimage/${doctordetails.user._id}/${eventindex}/${imageIndex}`
    );

  alert("image delete")
    return response.data; // return updated doctor data
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};

 
const deleteevents=async(index)=>
{
  try {
    setloading(true)
    const resp = await api.delete(`doctor/deleteupcomingevents/${doctordetails.user._id}/${index}`);

    if(resp.status===200)
    {
       Swal.fire({
        icon:"success",
        title:"Event Deleted",
        text:"Event Deleted Successfully...",
        showConfirmButton:true,
        customClass: {
        confirmButton: 'my-swal-button',
      },
      }).then(()=>
      {
        window.location.reload()
      })
    }
  
    
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

  
const updateevents=async(index)=>
{
  try {
    setloading(true)
    const resp = await api.put(`doctor/updateupcomingevents/${doctordetails.user._id}/${eventindex}`,doctorprofileaddupcomingevents,
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
        text:"Events Updated Successfully...",
        showConfirmButton:true,
        customClass: {
        confirmButton: 'my-swal-button',
      },
      }).then(()=>
      {
        window.location.reload()
      })
    }
    handleCloseupcomingevents()
    
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
        {/*=============================== Upcoming Events ===============================================*/}
        
        
            <div  className=" rounded-lg p-6">
              {/* Header */}
              <div className="work-experience flex items-center justify-between mb-8">
                <div className="work-experience-heading ">
                <h3 className=" text-2xl font-semibold text-black">Edit Upcoming Events</h3>
                </div>
                <div className="work-experincemain flex items-center gap-3">
                  {/* <button  className=" hover:bg-gray-200 p-2 rounded-full" >
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
                  </button> */}
                
                </div>
              </div>
        
             

{
  user?.upcoming_events?.map((item, index) => (
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
          src={item.event_image[0]}
          alt="hospital"
          style={{ width: "100px", height: "100px", marginRight: "12px", borderRadius: "8px" }}
        />
        <div>
          <span style={{ fontWeight: "bold", fontSize: "20px", display: "block" }}>
            {item.event_title}, {item.event_type}
          </span>
            <span style={{ fontWeight: "bold", fontSize: "20px", display: "block" }}>
            {item.venue},
          </span>
          <span style={{ fontSize: "16px", color: "#555" }}>
            {item.fee} {item.currency} <br />
            ({new Date(item.start_date).toLocaleDateString()} -{" "}
            {new Date(item.end_date).toLocaleDateString()})
          </span>
        </div>
      </div>

      {/* Right side: Edit icon */}
   <div className="flex flex-col sm:flex-row items-center sm:space-x-2 space-y-2 sm:space-y-0">
  {/* Show upcoming events button */}
  <button
    className="hover:bg-gray-200 p-2 rounded-full flex items-center justify-center"
    onClick={() => handleShowupcomingevents(item, index)}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.2}
        d="M26.866 10.587L11.04 26.413c-1.414 1.427-5.64 2.08-6.6 1.133s.72-5.173 2.133-6.6L21.4 5.12A4 4 0 0 1 26.8 5.186a4 4 0 0 1 .133 5.401z"
      />
    </svg>
  </button>

  {/* Delete button */}
  <button
    onClick={() => deleteevents(index)}
    className="hover:bg-gray-200 p-2 rounded-full flex items-center justify-center"
  >
    <span className="material-icons text-red-600 text-[22px]">delete</span>
  </button>
</div>

        
    </div>
  ))
}

        
            </div>
        
                  
        
        
        
                 
                  </div>
                </div>
              </div>
        
{/*======================== update upcoming events modal ========================================*/}

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

      
        <div className="col-md-6 mb-3 position-relative">
        <label className="form-label fw-bold">Event ID</label>

        <input name="event_id" type="text" className="form-control"
         defaultValue={doctorprofileaddupcomingevents.event_id} onChange={handleChangeupcomingevents}/>

      
      </div>

           <div className="col-md-6 mb-3 position-relative">
        <label className="form-label fw-bold">Event Type</label>
          <select
    name="event_type"
    className="form-control"
    defaultValue={doctorprofileaddupcomingevents.event_type}
    onChange={handleChangeupcomingevents}
  >
    <option value="">-- Select Type --</option>
    <option value="India">OPD</option>
    <option value="United States">CME</option>
  
  </select>

        
      </div>
 
           <div className="col-md-6 mb-3 position-relative">
            <label className="form-label fw-bold">Event Title</label>
            <input name="event_title" type="text" className="form-control"
             defaultValue={doctorprofileaddupcomingevents.event_title} onChange={handleChangeupcomingevents}/>
        
          </div>

             <div className="col-md-6 mb-3 position-relative">
            <label className="form-label fw-bold">Venue</label>
            <input name="venue" type="text" className="form-control"
             defaultValue={doctorprofileaddupcomingevents.venue} onChange={handleChangeupcomingevents}/>
        
          </div>

          <div className="col-md-6 mb-3 position-relative">
            <label className="form-label fw-bold">Start Date</label>
            <input name="start_date" type="date" className="form-control"
             defaultValue={doctorprofileaddupcomingevents.start_date} onChange={handleChangeupcomingevents}/>
        
          </div>

          <div className="col-md-6 mb-3 position-relative">
            <label className="form-label fw-bold">End Date</label>
            <input name="end_date" type="date" className="form-control"
             defaultValue={doctorprofileaddupcomingevents.end_date} onChange={handleChangeupcomingevents}/>
        
          </div>

          <div className="col-md-6 mb-3 position-relative">
            <label className="form-label fw-bold">Start Time</label>
            <input name="start_time" type="date-time" className="form-control"
             defaultValue={doctorprofileaddupcomingevents.start_time} onChange={handleChangeupcomingevents}/>
        
          </div>

          <div className="col-md-6 mb-3 position-relative">
            <label className="form-label fw-bold">End Time</label>
            <input name="end_time" type="date-time" className="form-control"
             defaultValue={doctorprofileaddupcomingevents.end_time} onChange={handleChangeupcomingevents}/>
        
          </div>

           <div className="col-md-6 mb-3 position-relative">
            <label className="form-label fw-bold"> Instructions For Attendees</label>
            <input name="instructions_for_attendees" type="date-time" className="form-control"
             defaultValue={doctorprofileaddupcomingevents.instructions_for_attendees} onChange={handleChangeupcomingevents}/>
        
          </div>
           <div className="col-md-6 mb-3 position-relative">
            <label className="form-label fw-bold"> Currency</label>
                 <select
                name="currency"
                className="form-control"
                defaultValue={doctorprofileaddupcomingevents.currency}
                onChange={handleChangeupcomingevents}
              >
                <option value="">-- Select Currency --</option>
                <option value="India">OPD</option>
                <option value="United States">CME</option>
              
              </select>
        
          </div>
           <div className="col-md-6 mb-3 position-relative">
            <label className="form-label fw-bold"> Fee</label>
            <input name="fee" type="date-time" className="form-control"
             defaultValue={doctorprofileaddupcomingevents.fee} onChange={handleChangeupcomingevents}/>
        
          </div>
  
        <label className="form-label fw-bold">Event Image</label>

            <div className="gallery-image grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 mb-6">
  {doctorprofileaddupcomingevents.event_image.length > 0 ? (
    doctorprofileaddupcomingevents.event_image.map((imgUrl, index) => (
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
      <strong>Drag or Drop Your Photo &amp; Video</strong>({doctorprofileaddupcomingevents.event_image.length})
      <div class="upload-or">Or</div>
      <label class="upload-browse">
        <input name="event_image" multiple type="file" hidden onChange={handleaddupcomingevents} />
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
    onClick={updateevents} 
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

export default Updateupcomingevent
