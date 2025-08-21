import React, { useState,useRef, useEffect } from "react";
import api from '../../api'
import Doctorheader from "./doctorheader";
import Doctorsidebar from "./doctorsidebar";
import { FaEdit } from "react-icons/fa";
import Swal from 'sweetalert2';
import { Modal, Button, Form } from "react-bootstrap";

function Updateworkexperience() {

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


  // ===========================edit doctor work experience information=======================================

    const[loading,setloading]=useState(false)

const[doctorprofileworkexperience,setdoctorprofileworkexperience] =useState({doctor_id:"",hospital_name:"",from_year:"",
                                      to_year: '',designation: '',major_achievements: ''});

                              
                                      
//  useEffect(() => {
//   if (user && Object.keys(user).length > 0) {
//     setdoctorprofileworkexperience(user);
//     setdoctorprofileworkexperience({...doctorprofileworkexperience,doctor_id:user._id})
//   }
// }, [user]);




 const [showworkexperience, setshowworkexperience] = useState(false);

 
 const[indexforupdate,setindexforupdate]=useState("")
 
  const handleshowworkexperience = (item,index) => 
    {
        setindexforupdate(index)
        setshowworkexperience(true);
        setdoctorprofileworkexperience(item)
    }
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



const updateworkexperience=async(index)=>
{
  try {
    setloading(true)
    const resp = await api.put(`doctor/updateworkexperience/${doctordetails.user._id}/${indexforupdate}`,doctorprofileworkexperience);

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
    handlecloseworkexperience()
    
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
        {/*=============================== Work Experience ===============================================*/}
        
        
            <div  className=" rounded-lg p-6">
              {/* Header */}
              <div className="work-experience flex items-center justify-between mb-8">
                <div className="work-experience-heading ">
                <h3 className=" text-2xl font-semibold text-black">Work Experience</h3>
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
  user?.work_experience?.map((item, index) => (
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
          src="https://api.builder.io/api/v1/image/assets/TEMP/1b856e809c7235f840a5c224f76e47c868c95e60?width=96"
          alt="hospital"
          style={{ width: "100px", height: "100px", marginRight: "12px", borderRadius: "8px" }}
        />
        <div>
          <span style={{ fontWeight: "bold", fontSize: "20px", display: "block" }}>
            {item.hospital_name}
          </span>
          <span style={{ fontSize: "16px", color: "#555" }}>
            {item.designation} <br />
            ({new Date(item.from_year).toLocaleDateString()} -{" "}
            {new Date(item.to_year).toLocaleDateString()})
          </span>
        </div>
      </div>

      {/* Right side: Edit icon */}
       <button className="hover:bg-gray-200 p-2 rounded-full" onClick={()=>handleshowworkexperience(item,index)}>
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
        
{/*======================== update work experience modal ========================================*/}

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

      
    </div>
  )
}

export default Updateworkexperience
