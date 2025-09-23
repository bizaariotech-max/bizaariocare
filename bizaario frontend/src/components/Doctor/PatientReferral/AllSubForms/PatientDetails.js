import React, { useEffect, useState ,useRef} from 'react'
import { TextField, Select, MenuItem, FormControl, Box,Avatar,Tooltip,IconButton,CircularProgress, Button, Radio, FormControlLabel, RadioGroup, FormLabel } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import api from '../../../../api'
import Swal from 'sweetalert2';
import UniqueLoader from '../../../loader';
import { customMenuProps } from '../../../../utils/mui_select_scroll_bar';
import { Calendar, MapPin } from 'lucide-react';
import ProfileCard1 from '../AllSubForms/UI/ProfileCard1';
import ProfileCard2 from '../AllSubForms/UI/ProfileCard2';
import { Plus, Edit } from 'lucide-react';
import { Modal,  Form, Row, Col } from 'react-bootstrap';
import { __postApiData } from "../../../../utils/api";


const PatientDetails = (patientId) => {

  console.log(patientId);
  
  //=================== get selected patient details================================

  
  const[selected_patient_details,setselected_patient_details]=useState([])
      const getpatient_details=async()=>
      {
        try {
          const resp=await api.get(`api/v1/admin/getPatient/${patientId.patientId}`)
          console.log(resp);
          
          setselected_patient_details(resp.data.data)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        getpatient_details()
    
      },[patientId])

  const doctor_details=JSON.parse(localStorage.getItem("user"))

  

  const [show, setShow] = useState(false)

  // function to open modal
  const handleShow = () => setShow(true);
  // function to close modal
  const handleClose = () => setShow(false);


const[isloading_for,setisloading_for]=useState(false)
  const [patient_details, setpatient_details] = useState({
    ProfilePic:"",
    Name: '',
    PhoneNumber: '',
    Gender: '',
    DateOfBirth: '',
    Age: '',
    Nationality: '',
    CountryOfResidence: '',
    AddressLine1: '',
    AddressLine2: '',
    State: '',
    City: '',
    PostalCode: '',
    EmailAddress: '',
    InsuranceProvider: '',
    InsurancePolicyNumber: '',
    InsuranceValidUpto: '',
    SecondaryContactName: '',
    SecondaryContactNumber: '',
    Relationship: '',
    IsVerified: '',
    IsActive: true,
    CreatedBy: '',

  });

useEffect(() => {
  setpatient_details((pre) => ({
    ...pre,
    CreatedBy: doctor_details._id
  }));
}, []);




    const handleChange = (e) => {
  const { name, value, checked, type } = e.target;

  setpatient_details((prev) => {
    if (Array.isArray(value)) {
      return { ...prev, [name]: value };
    }

    if (Array.isArray(prev[name])) {
      const updated = checked
        ? [...prev[name], value] // Add
        : prev[name].filter((item) => item !== value); // Remove
      return { ...prev, [name]: updated };
    }

    if (type === "checkbox" && Array.isArray(prev[name])) {
      const updated = checked
        ? [...prev[name], value] // Add to array
        : prev[name].filter((item) => item !== value); // Remove from array
      return { ...prev, [name]: updated };
    }

    if (type === "checkbox") {
      return { ...prev, [name]: checked };
    }

    // Normal single-value field
    return { ...prev, [name]: type === "checkbox" ? checked : value };
  });
};

  const __handleUploadFile = async (file) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", file);
      __postApiData("/api/v1/common/AddImage", formData, "form")
        .then((res) => {
          console.log(res, "res");
          if (res.response.response_code === "200") {
            // Handle both single image and multiple images response
            let imageUrl;

            if (Array.isArray(res.data)) {
              // If response is an array, take the first image
              imageUrl = res.data[0]?.full_URL;
            } else if (res.data?.full_URL) {
              // If response is a single object
              imageUrl = res.data.full_URL;
            } else {
              // Fallback: try to access directly
              imageUrl = res.data;
            }

            if (imageUrl) {
              console.log("Uploaded image URL:", imageUrl);
              resolve(imageUrl);
            } else {
              reject(new Error("No image URL found in response"));
            }
          } else {
            reject(new Error(res.response.response_message || "Upload failed"));
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };


  
const inputRef = useRef();

const handleSingleImageUpload = async (event) => {
  setisloading_for(true)
  const file = event.target.files[0];
  if (file) {
    try {
      const uploadedUrl = await __handleUploadFile(file);
      console.log(uploadedUrl);
      
      setpatient_details((prv) => ({
        ...prv,
        ProfilePic: uploadedUrl, // or use [fieldName]: uploadedUrl if dynamic
      }));

    } catch (error) {
      console.error("Upload error:", error);
    }
    finally
    {
      setisloading_for(false)
    }
  }
};




 const save_patient_details = async () => {
  setisloading_for(true);
  try {
    const resp = await api.post(
      `api/v1/admin/savePatient`,
      patient_details,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(resp);
    

    const { response_code, response_message } = resp.data.response;

    if (response_code === "200") {
      Swal.fire({
        icon: "success",
        title: "Details Added",
        text: "Patient Details Added Successfully...",
        showConfirmButton: true,
        customClass: { confirmButton: "my-swal-button" },
      }).then(() => {
        window.location.reload();
      });
    } else if (response_code === "400") {
      // Show server validation error here
      Swal.fire({
        icon: "error",
        title: response_message.errorType || "Error",
        text: response_message.error,
        showConfirmButton: true,
        customClass: { confirmButton: "my-swal-button" },
      });
    } else {
      // Optional: handle other response codes
      Swal.fire({
        icon: "warning",
        title: "Unexpected response",
        text: "Something went wrong. Please try again.",
        showConfirmButton: true,
        customClass: { confirmButton: "my-swal-button" },
      });
    }
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Request failed",
      text: error.message || "Something went wrong",
      showConfirmButton: true,
      customClass: { confirmButton: "my-swal-button" },
    });
  } finally {
    setisloading_for(false);
  }
};






// ==========================get relationship drop downs value=====================================

  const[all_relationship_master,setall_relationship_master]=useState([])
      const getall_relationship_master=async()=>
      {
        try {
          const resp=await api.post('api/v1/admin/LookupList',{lookupcodes:"relationship_type"})
          setall_relationship_master(resp.data.data)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        getall_relationship_master()
    
      },[])


//========================= get insurance provider drop downs ===================================

  const[all_insurance_provider,setall_insurance_provider]=useState([])
      const getall_insurance_provider=async()=>
      {
        try {
          const resp=await api.post('api/v1/admin/LookupList',{lookupcodes:"insurance_provider_master"})
          setall_insurance_provider(resp.data.data)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        getall_insurance_provider()
    
      },[])


  //============================== get all station master list===================================

    const [all_country, setall_country] = useState([]);
    const getall_country = async () => {
      try {
        const resp = await api.post('api/v1/admin/StationList',{OrgUnitLevel:"68affb6d874340d8d79dbea4"});
        setall_country(resp.data.data.list);
        console.log(resp);
        
      } catch (error) {
        console.log(error);
      }
    };

     useEffect(() => {
        getall_country();
      }, []);



        //============================== get all state  list===================================

    const [all_state, setall_state] = useState([]);
    const getall_state = async () => {
      try {
        const resp = await api.post('api/v1/admin/StationList',
          {OrgUnitLevel:"68affb77874340d8d79dbeaa",ParentStationId:patient_details.Nationality});
        setall_state(resp.data.data.list);
        console.log(resp);
        
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
  if (patient_details.Nationality) {
    getall_state();
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [patient_details.Nationality]);



    //============================== get all city  list===================================

    const [all_city, setall_city] = useState([]);
    const getall_city = async () => {
      try {
        const resp = await api.post('api/v1/admin/StationList',
          {OrgUnitLevel:"68affb90874340d8d79dbeb6",ParentStationId:patient_details.State});
        setall_city(resp.data.data.list);
        console.log(resp);
        
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
  if (patient_details.State) {
    getall_city();
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [patient_details.State]);






  return (
    <div className="mt-[40px]">
         <div className="flex justify-end items-center space-x-4">
          <button className="flex items-center space-x-2 text-[var(--primary-color)] hover:text-blue-700 transition-colors">
            <span className="text-sm font-medium underline" onClick={handleShow}>Add</span>
            <Plus className="w-4 h-4" />
          </button>
          <button className="flex items-center space-x-2 text-[var(--primary-color)] hover:text-blue-700 transition-colors">
            <Edit className="w-4 h-4" />
            <span className="text-sm font-medium underline">Edit</span>
          </button>
        </div>
      <div className='grid lg:grid-cols-2 grid-cols-1 gap-10'>
        <ProfileCard1 patient_details={selected_patient_details}/>
        <ProfileCard2 patient_details={selected_patient_details}/>
      </div>


{/*============================= modal for add details====================================== */}

  <Modal show={show} onHide={handleClose} centered size="lg">
  
        <Modal.Header closeButton>
          <Modal.Title>Add Patient Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        

   <div >
      

             <Box  sx={{ position: 'relative', display: 'inline-block', minWidth: 100,height: 100,marginLeft:"40%" }}>
      <Avatar
        src={patient_details.ProfilePic}
        sx={{
          width: 100,
          height: 100,
          border: '3px solid #fff',
          boxShadow: 2,
        }}
      />

      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={(e)=>handleSingleImageUpload(e)}
        style={{ display: 'none' }}
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
          onClick={() => inputRef.current.click()}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
          
     
           
            <FormControl fullWidth size="small">
            <label className="form-label">Phone Number with ISD Code </label>
            <TextField
            type='text'
            placeholder="Phone Number With Isd Code" 
            name="PhoneNumber" 
            size="small" 
            defaultValue={patient_details.PhoneNumber} 
            onChange={handleChange} 
            />
            </FormControl>

          
            <FormControl fullWidth size="small">
            <label className="form-label">Name</label>
            <TextField
            placeholder="Name" 
            name="Name" 
            size="small"  
            value={patient_details.Name} 
            onChange={handleChange} 
            />
            </FormControl>

           <FormControl fullWidth size="small">
            <label className="form-label">DOB</label>
            <TextField
            type='date'
            placeholder="Date Of Birth" 
            name="DateOfBirth" 
            size="small" 
            value={patient_details.DateOfBirth} 
            onChange={handleChange} 
            />
            </FormControl>

            <FormControl fullWidth size="small">
            <label className="form-label">Age</label>
            <TextField
            type='number'
            placeholder="Age" 
            name="Age" 
            size="small" 
            value={patient_details.Age} 
            onChange={handleChange} 
            />
            </FormControl>

          

            <FormControl fullWidth size="small">
            <label className="form-label">Gender </label>
               <RadioGroup size="small"
                 row
                 name="Gender"
                 value={patient_details.Gender}
                 onChange={handleChange}
                 sx={{ flexDirection: 'row', alignItems: 'flex-start', gap: 1 }}
               >
                 <FormControlLabel value="Male" control={<Radio />} label="Male" />
                 <FormControlLabel value="Female" control={<Radio />} label="Female" />
                  <FormControlLabel value="Other" control={<Radio />} label="Other" />

               </RadioGroup>
            </FormControl>

                <FormControl fullWidth size="small">
            <label className="form-label">Is Verified</label>
            <RadioGroup size="small"
            row
            name="IsVerified"
            value={patient_details.IsVerified}
            onChange={handleChange}
            sx={{ flexDirection: 'row', alignItems: 'flex-start', gap: 1 }}
          >
            <FormControlLabel value="true" control={<Radio />} label="Yes" />
            <FormControlLabel value="false" control={<Radio />} label="No" />

          </RadioGroup>
        </FormControl>


            <FormControl fullWidth size="small">
            <label className="form-label">Nationality</label>
           <Select
                labelId="content-type-label"
                name="Nationality"
                value={patient_details.Nationality}
                onChange={handleChange}
                displayEmpty
                MenuProps={customMenuProps}
                renderValue={(selected) => {
                  if (!selected) {
                    return <span style={{ color: "#9ca3af" }}>Nationality</span>; 
                  }
                  return all_country?.find((item) => item._id === selected)?.StationName;
                }}
              >
                <MenuItem value="">
                  <em>Select Country</em>
                </MenuItem>
                {all_country?.map((type) => (
                  <MenuItem key={type._id} value={type._id}>
                    {type.StationName}
                  </MenuItem>
                ))}
                            

            </Select>
            </FormControl>

              <FormControl fullWidth size="small">
            <label className="form-label">Country of Residence  </label>
             <Select
                labelId="content-type-label"
                name="CountryOfResidence"
                value={patient_details.CountryOfResidence}
                onChange={handleChange}
                displayEmpty
                MenuProps={customMenuProps}
                renderValue={(selected) => {
                  if (!selected) {
                    return <span style={{ color: "#9ca3af" }}>Country Of Residence</span>; // grey placeholder
                  }
                  return all_country.find((item) => item._id === selected)?.StationName;
                }}
              >
                <MenuItem value="">
                  <em>Select Country Of Residence</em>
                </MenuItem>
                {all_country.map((type) => (
                  <MenuItem key={type.id} value={type._id}>
                    {type.StationName}
                  </MenuItem>
                ))}
                            

            </Select>
            </FormControl>

            <FormControl fullWidth size="small">
            <label className="form-label"> Address Line 1 </label>
            <TextField
            placeholder="Address Line 1" 
            name="AddressLine1" 
            size="small" 
            value={patient_details.AddressLine1} 
            onChange={handleChange} 
            />
            </FormControl>

            <FormControl fullWidth size="small">
            <label className="form-label"> Address Line 2 </label>
            <TextField
            placeholder="Address Line 2" 
            name="AddressLine2" 
            size="small" 
            value={patient_details.AddressLine2} 
            onChange={handleChange} 
            />
            </FormControl>

      

            <FormControl fullWidth size="small">
            <label className="form-label">State</label>
           <Select
                labelId="content-type-label"
                name="State"
                value={patient_details.State}
                onChange={handleChange}
                displayEmpty
                MenuProps={customMenuProps}
                renderValue={(selected) => {
                  if (!selected) {
                    return <span style={{ color: "#9ca3af" }}>State</span>; 
                  }
                  return all_state?.find((item) => item._id === selected)?.StationName;
                }}
              >
                <MenuItem value="">
                  <em>Select State</em>
                </MenuItem>
                {all_state?.map((type) => (
                  <MenuItem key={type._id} value={type._id}>
                    {type.StationName}
                  </MenuItem>
                ))}
                            

            </Select>
            </FormControl>

           
               <FormControl fullWidth size="small">
            <label className="form-label">City</label>
           <Select
                labelId="content-type-label"
                name="City"
                value={patient_details.City}
                onChange={handleChange}
                displayEmpty
                MenuProps={customMenuProps}
                renderValue={(selected) => {
                  if (!selected) {
                    return <span style={{ color: "#9ca3af" }}>City</span>; 
                  }
                  return all_city?.find((item) => item._id === selected)?.StationName;
                }}
              >
                <MenuItem value="">
                  <em>Select City</em>
                </MenuItem>
                {all_city?.map((type) => (
                  <MenuItem key={type._id} value={type._id}>
                    {type.StationName}
                  </MenuItem>
                ))}
                            

            </Select>
            </FormControl>

            <FormControl fullWidth size="small">
            <label className="form-label"> Postal Code</label>
            <TextField
            type='number'
            placeholder="Postal Code" 
            name="PostalCode" 
            size="small" 
            value={patient_details.PostalCode} 
            onChange={handleChange} 
            />
            </FormControl>

          <FormControl fullWidth size="small">
            <label className="form-label">Insurance Provider  </label>
            <Select
                labelId="content-type-label"
                name="InsuranceProvider"
                value={patient_details.InsuranceProvider || ""}
                onChange={handleChange}
                displayEmpty
                MenuProps={customMenuProps}
                renderValue={(selected) => {
                  if (!selected) {
                    return <span style={{ color: "#9ca3af" }}>Insurance Provider</span>; // grey placeholder
                  }
                  return all_insurance_provider.find((item) => item._id === selected)?.lookup_value;
                }}
              >
                <MenuItem value="">
                  <em>Select Insurance Provider</em>
                </MenuItem>
                {all_insurance_provider.map((type) => (
                  <MenuItem key={type._id} value={type._id}>
                    {type.lookup_value}
                  </MenuItem>
                ))}
                            

            </Select>
            </FormControl>

              <FormControl fullWidth size="small">
            <label className="form-label">Insurance Policy Number </label>
            <TextField
            placeholder="Insurance Policy Number" 
            name="InsurancePolicyNumber" 
            size="small" 
            value={patient_details.InsurancePolicyNumber} 
            onChange={handleChange} 
            />
            </FormControl>

            <FormControl fullWidth size="small">
            <label className="form-label">Valid Upto</label>
            <TextField
            type='date'
            placeholder="Insurance Valid Upto" 
            name="InsuranceValidUpto" 
            size="small" 
            value={patient_details.InsuranceValidUpto} 
            onChange={handleChange} 
            />
            </FormControl>

            <FormControl fullWidth size="small">
            <label className="form-label">Email Address</label>
            <TextField
            placeholder="Email Address" 
            name="EmailAddress" 
            size="small" 
            value={patient_details.EmailAddress} 
            onChange={handleChange} 
            />
            </FormControl>

            <FormControl fullWidth size="small">
            <label className="form-label">Secondary Contact Name</label>
            <TextField
            placeholder="Secondary Contact Name" 
            name="SecondaryContactName" 
            size="small" 
            value={patient_details.SecondaryContactName} 
            onChange={handleChange} 
            />
            </FormControl>

            <FormControl fullWidth size="small">
            <label className="form-label">Secondary Contact Number</label>
            <TextField
            placeholder="Secondary Contact Number" 
            name="SecondaryContactNumber" 
            size="small" 
            value={patient_details.SecondaryContactNumber} 
            onChange={handleChange} 
            />
            </FormControl>

          <FormControl fullWidth size="small">
            <label className="form-label">Relationship </label>
            <Select
                labelId="content-type-label"
                name="Relationship"
                value={patient_details.Relationship}
                onChange={handleChange}
                MenuProps={customMenuProps}
                displayEmpty
                renderValue={(selected) => {
                  if (!selected) {
                    return <span style={{ color: "#9ca3af" }}>Relationship</span>; 
                  }
                  return all_relationship_master.find((item) => item._id === selected)?.lookup_value;
                }}
              >
                <MenuItem value="">
                  <em>Select Relationship </em>
                </MenuItem>
                {all_relationship_master.map((type) => (
                  <MenuItem key={type._id} value={type._id}>
                    {type.lookup_value}
                  </MenuItem>
                ))}
                            

            </Select>
            </FormControl>

              <FormControl fullWidth size="small">
            <label className="form-label">Record Created By</label>
            <TextField
            placeholder="Record Created By" 
            name="CreatedBy" 
            size="small" 
            value={patient_details.CreatedBy} 
            onChange={handleChange} 
            />
            </FormControl>




          </div> 
         
         
          <div className="flex justify-end gap-3 mt-4">
           <Button style={{backgroundColor:"#52677D",fontFamily:"Lora",color:"white"}} onClick={save_patient_details}>Save</Button>
         </div>

        </div> 

        </Modal.Body>
    
   
    </Modal>

          {isloading_for && (
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


    </div>
  );
};

export default PatientDetails;
