import React, { useState ,useRef, useEffect} from 'react';
import {
  Box, Grid, Button, Typography, Card, Avatar,
  TextField, FormControl, InputLabel, Select, MenuItem, RadioGroup,
  FormControlLabel, Radio, Fade,Chip,Menu,InputAdornment 
} from '@mui/material';
import {  IconButton,  Tooltip } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import api from '../../../api'
import Swal from 'sweetalert2';
import UniqueLoader from '../../loader';
import { DataGrid } from '@mui/x-data-grid';
import '../../Admin/admincss/add_asset_master.css'
import Doctorsidebar from '../doctorsidebar';
import Doctorheader from '../doctorheader';


function PatientProfiling() {

  const[loading,setloading]=useState(false)

  const [patient_profile, setpatient_profile] = useState({
    Name: "",
    age_dob: "",
    gender: "",
    nationality: "",
    referring_docotr: "",
    phone_no: "",
    email_address: "",
  });

  
  
  



      const[all_investigation_master,setall_investigation_master]=useState([])
      const getall_investigation_master=async()=>
      {
        try {
            const resp=await api.post(`api/v1/admin/investigationList`)
          console.log(resp);
          
          setall_investigation_master(resp.data.data.list)
          
        } catch (error) {
          console.log(error);
          
        }
      }

  
      useEffect(()=>
      {
        getall_investigation_master()
    
      },[])


      const [menuAnchor, setMenuAnchor] = useState(null);
      const [menuRowId, setMenuRowId] = useState(null);
      
      const handleOpenMenuhospital = (event, rowId) => {
        setMenuAnchor(event.currentTarget);
        setMenuRowId(rowId);
      };
      
      const handleCloseMenuhospital = () => {
        setMenuAnchor(null);
        setMenuRowId(null);
      };

   const[lookup_id,setlookup_id]=useState(null)
   const onEdit=(row)=>
   {
      setlookup_id(row._id)
      setpatient_profile({
        Investigation_CategoryId: row.Investigation_CategoryId._id,
        InvestigationName: row.InvestigationName,
        ResponseUnit: row.ResponseUnit,
        Validity_Min_Value:row.Validity_Min_Value,
        Validity_Max_Value: row.Validity_Max_Value,
        Normal_Value_Minimum: row.Normal_Value_Minimum,
        Normal_Value_Maximum: row.Normal_Value_Maximum,
        Weightage_Value_Minimum: row.Weightage_Value_Minimum,
        Weightage_Value_Maximum:row.Weightage_Value_Maximum,
        SOS_Value_Minimum:row.SOS_Value_Minimum,
        SOS_Value_Maximum: row.SOS_Value_Maximum,
        Abnormalities: row.Abnormalities,
        })
        
      }



  const onDeletehospital=()=>
  {
    alert("delete")
  }

     const columns = [
        { field: 'sno', headerName: 'S.No.', flex: 0.2,renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1},
        { field: 'parent_lookup_id', headerName: 'Investigation Category', flex: 0.5,renderCell: (params) => {
          return params.row?.Investigation_CategoryId?.lookup_value || "" }}, 
        { field: 'InvestigationName:', headerName: 'Investigation Name', flex: 0.5, renderCell: (params) => {
          return params.row?.InvestigationName || "" }},
       {
      field: 'actions',
      headerName: 'Actions',
      width: 80,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <IconButton onClick={(e) => handleOpenMenuhospital(e, params.row._id)}>
            <MoreVertIcon />
          </IconButton>
    
          {menuRowId === params.row._id && (
            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={handleCloseMenuhospital}
              disableScrollLock
            >
              <MenuItem
                onClick={() => {
                  onEdit(params.row);
                  handleCloseMenuhospital();
                }}
              >
                Edit
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onDeletehospital(params.row._id);
                  handleCloseMenuhospital();
                }}
              >
                Delete
              </MenuItem>
            </Menu>
          )}
        </>
      ),
    }
    
      ];
    
      const rows = all_investigation_master?.map((doc, index) => ({
        id: doc._id || index,
        ...doc,
      }));




    //========================================= get group name id ================================================

  const[investigation_category,setinvestigation_category]=useState([])
      const get_investigation_category=async()=>
      {
        try {
          const resp=await api.post('api/v1/admin/LookupList',{lookupcodes:"procedure_group_name_type"})
          setinvestigation_category(resp.data.data)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        get_investigation_category()
    
      },[])




   


    const handlechange = (e) => {
  const { name, value, checked, type } = e.target;

  setpatient_profile((prev) => {
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


     
        const add_investigation_master = async () => {
        try {
           const body = {
          ...patient_profile,   // existing fields
          _id: lookup_id, // or wherever your lookup_id is
        };

          setloading(true)
          const resp = await api.post("api/v1/admin/SaveInvestigation",body
           
          );
          console.log(resp);
          
      
          if (resp.data.response.response_code === "200") {
              Swal.fire({
                      icon:"success",
                      title:"Investigation Master Added",
                      text:"Investigation Master Addedd Successfully...",
                      showConfirmButton:true,
                       customClass: {
                      confirmButton: 'my-swal-button',
                    },
                    }).then(()=>
                    {
                      window.location.reload()
                    })
            console.log("✅ Lookup list:", resp.data.data);
          } else {
            console.warn("⚠️ Error:", resp.data.response.response_message);
              Swal.fire({
                      icon:"error",
                      title:"Error Occured",
                      text:resp.data.response.response_message,
                      showConfirmButton:true,
                       customClass: {
                      confirmButton: 'my-swal-button',
                    }
                }
                )
          }
        } catch (error) {
          console.error("❌ API Error:", error);
        }
        finally
        {
          setloading(false)
        }
      };

 
      

  return (
    <div>
        <Doctorsidebar/>
        <Doctorheader/>
<div className='asset-master'>
   <Box sx={{ maxWidth: 1150, mx: "auto", px: 2 }}>
        <div className='profile-header'>
                  <h3>Enter Details for Patient Profile</h3>
                  <p>Add or update the required details for the patient profile to keep records accurate and complete.</p>
                  </div>
        
        
           {/* Form */}
                   <Box
                     component="form"
                     autoComplete="off"
                     sx={{
                       background: '#fff',
                       borderRadius: 3,
                       p: { xs: 2, sm: 3, md: 5 },
                       mb: 4,
                       display: 'flex',
                       flexDirection: 'column',
                       gap: 2,
                     }}
                   >
      <div className="form-grid">
          

     


       <FormControl fullWidth size="small">
             <label className="form-label">Patient Name</label>
            <TextField 
              name="Name"
              defaultValue={patient_profile.Name}
              onChange={handlechange}
              placeholder='Patient Name'
            >

            </TextField>
          </FormControl> 

        


           <FormControl fullWidth size="small">
            <label className="form-label">Age/DOB </label>
            <TextField 
              name="age_dob"
              value={patient_profile.age_dob}
              onChange={handlechange}
              placeholder='Age/Dob'
            >
           
            </TextField>
          </FormControl> 

           <FormControl fullWidth size="small">
            <label className="form-label">Gender </label>
            <RadioGroup size="small"
                    row
                    name="referral_for"
                    value={patient_profile.gender}
                    onChange={handlechange}
                    sx={{ flexDirection: 'row', alignItems: 'flex-start', gap: 1,width:"100%" }}
                >
                    
                        <>
                        <FormControlLabel  control={<Radio />} label="Male" />
                        <FormControlLabel  control={<Radio />} label="Female" />
                        </>
                  
                    
                </RadioGroup>
          </FormControl> 

           <FormControl fullWidth size="small">
            <label className="form-label">Nationality </label>
            <TextField 
              name="nationality"
              value={patient_profile.nationality}
              onChange={handlechange}
              placeholder='Nationality'
            >
           
            </TextField>
          </FormControl> 

          <FormControl fullWidth size="small">
            <label className="form-label">Referring Doctor </label>
            <TextField 
              name="referring_docotr"
              value={patient_profile.referring_docotr}
              onChange={handlechange}
              placeholder='Referring Doctor'
            >
           
            </TextField>
          </FormControl> 

           <FormControl fullWidth size="small">
            <label className="form-label">Phone Number With ISD Code </label>
            <TextField 
              name="phone_no"
              value={patient_profile.phone_no}
              onChange={handlechange}
              placeholder='Phone Number With ISD Code'
            >
           
            </TextField>
          </FormControl>

            <FormControl fullWidth size="small">
            <label className="form-label">Email Address </label>
            <TextField 
              name="email_address"
              value={patient_profile.email_address}
              onChange={handlechange}
              placeholder='Email Address'
            >
           
            </TextField>
          </FormControl>

          

         </div>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            // type="submit"
            sx={{ width: "200px", alignSelf: "flex-start",fontFamily:"Lora",fontWeight:"bold" }}
            onClick={add_investigation_master}
          >
            Submit
          </Button>
        </Box>
        
        
      {/* Table */}
               <Box sx={{ background: '#fff', borderRadius: 3, p: 2 }}>  
                                              
              <DataGrid
               className="custom-data-grid"
                rows={rows}
                columns={columns}
                pageSize={10}
                pageSizeOptions={[]} // removes the rows per page selector
                initialState={{
                  pagination: { paginationModel: { pageSize: 10, page: 0 } },
                }}
                disableSelectionOnClick
              
              />
              </Box>
     
          </Box>
      </div>

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

    </div>
  )
}

export default PatientProfiling
