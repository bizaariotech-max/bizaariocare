import React, { useEffect, useState } from 'react'
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Radio, FormControlLabel, RadioGroup, FormLabel } from '@mui/material';
import api from '../../../../api'
import Swal from 'sweetalert2';
import UniqueLoader from '../../../loader';
import { customMenuProps } from '../../../../utils/mui_select_scroll_bar';

export default function PatientBasicDetails() {

  const[isloading_for,setisloading_for]=useState(false)
  const [patient_details, setpatient_details] = useState({
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
    IsActive: '',
    CreatedBy: '',
  });



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

  const doctor_details=JSON.parse(localStorage.getItem("user"))

  

  const save_hospital_size=async()=>
  {
    setisloading_for(true)
    try {
      const resp=await api.put(`api/v1/asset-sections/hospital-size/${doctor_details._id}`,patient_details,
          {
        headers: { "Content-Type": "application/json" },
      }
      )
      console.log(resp);
      
    if(resp.status===200)
       {
          Swal.fire({
           icon:"success",
           title:"Details Updated",
           text:"Hospital Size Details Updated Successfully...",
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
      console.log(error);
       Swal.fire({
            icon:"error",
            title:"error ",
            text:error.response.data.message,
            showConfirmButton:true,
              customClass: {
              confirmButton: 'my-swal-button',
            },
          })
      
    }
    finally
    {
      setisloading_for(false)
    }
  }


  //=========================== update hospital_size=========================================

  const get_patient_details=async()=>
  {
    try {
      const resp=await api.get(`api/v1/asset-sections/hospital-size/${doctor_details._id}`)
      if (resp.data?.data) {
      // ✅ remove _id from API response before setting state
      const { _id, ...rest } = resp.data.data;
      setpatient_details(rest);
    }
      
      
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>
  {
    // get_patient_details()
  },[])


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

    const [allstationmaster, setallstationmaster] = useState([]);
    const getallstation_list = async () => {
      try {
        const resp = await api.post('api/v1/admin/StationList', { page: 1, limit: 10, search: "" });
        setallstationmaster(resp.data.data.list);
      } catch (error) {
        console.log(error);
      }
    };

     useEffect(() => {
        getallstation_list();
      }, []);

      console.log(allstationmaster);
      


  return (
    <>
        <div >
      
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">

           {/* <FormControl fullWidth size="small">
            <label className="form-label">Patient ID</label>
            <TextField
            placeholder="Number Of Departments" 
            name="NumberOfDepartments" 
            size="small" 
            value={hospital_size.NumberOfDepartments} 
            onChange={handleChange} 
            />
            </FormControl> */}
           
            <FormControl fullWidth size="small">
            <label className="form-label">Phone Number with ISD Code </label>
            <TextField
            type='PhoneNumber'
            placeholder="Phone Number With Isd Code" 
            name="NumberOfDoctors" 
            size="small" 
            value={patient_details.PhoneNumber} 
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
                  return allstationmaster?.find((item) => item._id === selected)?.lookup_value;
                }}
              >
                <MenuItem value="">
                  <em>Select Content Type</em>
                </MenuItem>
                {allstationmaster?.map((type) => (
                  <MenuItem key={type._id} value={type._id}>
                    {type.lookup_value}
                  </MenuItem>
                ))}
                            

            </Select>
            </FormControl>

              <FormControl fullWidth size="small">
            <label className="form-label">Country of Residence  </label>
             <Select
                labelId="content-type-label"
                name="ContentTypeId"
                // value={ContentTypeId || ""}
                onChange={handleChange}
                displayEmpty
                  MenuProps={{
                disablePortal: true,
                disableScrollLock: true,
                }}
                renderValue={(selected) => {
                  if (!selected) {
                    return <span style={{ color: "#9ca3af" }}>Content Type</span>; // grey placeholder
                  }
                  // return ContentType.find((item) => item._id === selected)?.name;
                }}
              >
                <MenuItem value="">
                  <em>Select Content Type</em>
                </MenuItem>
                {/* {ContentType.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.name}
                  </MenuItem>
                ))} */}
                            

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
            <label className="form-label"> State </label>
            <TextField
            placeholder="State" 
            name="State" 
            size="small" 
            value={patient_details.State} 
            onChange={handleChange} 
            />
            </FormControl>

            <FormControl fullWidth size="small">
            <label className="form-label"> City </label>
            <TextField
            placeholder="City" 
            name="City" 
            size="small" 
            value={patient_details.City} 
            onChange={handleChange} 
            />
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
            type='SecondaryContactNumber'
            placeholder="Secondary Contact Number" 
            name="SecondaryContactNumber" 
            size="small" 
            value={patient_details.SecondaryContactNumber} 
            onChange={handleChange} 
            />
            </FormControl>

          <FormControl fullWidth size="small">
            <label className="form-label">Relationship     </label>
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
           <Button style={{backgroundColor:"#52677D",fontFamily:"Lora",color:"white"}} onClick={save_hospital_size}>Save</Button>
         </div>

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

           {/* <div className="bg-white rounded-xl shadow p-4">
                  <h3 className="font-semibold mb-4">Preview</h3>
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-semibold">Hospital Size Details</p>
            
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    
                    <div>
                     
                      <div className="text-sm text-gray-600  flex-wrap gap-x-6 text-[12px]">
                        <p>Number Of Departments : <span  className="text-[#000000] font-semibold">{hospital_size?.NumberOfDepartments || ""}</span></p><br></br>
                        <p>Number Of Doctors : <span  className="text-[#000000] font-semibold">{hospital_size?.NumberOfDoctors || ""}</span></p><br></br>
                        <p>Number Of Consulting Physicians : <span  className="text-[#000000] font-semibold">{hospital_size?.NumberOfConsultingPhysicians || ""}</span></p><br></br>
                        <p>Number Of Nursing Staff : <span  className="text-[#000000] font-semibold">{hospital_size?.NumberOfNursingStaff || ""}</span></p><br></br>
                        <p>Number Of Beds : <span  className="text-[#000000] font-semibold">{hospital_size?.NumberOfBeds || ""}</span></p><br></br>
                        <p>Number Of ICU Beds : <span  className="text-[#000000] font-semibold">{hospital_size?.NumberOfICUBeds || ""}</span></p><br></br>
                        <p>Number Of OTs : <span  className="text-[#000000] font-semibold">{hospital_size?.NumberOfOTs || ""}</span></p>
                      </div>
                    </div>
                  </div>
      
                
                </div> */}




     

    </>
    )
}



