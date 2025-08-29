import React, { useState ,useRef, useEffect} from 'react';
import {
  Box, Grid, Button, Typography, Card, Avatar,
  TextField, FormControl, InputLabel, Select, MenuItem, RadioGroup,
  FormControlLabel, Radio, Fade,Chip,Menu,InputAdornment 
} from '@mui/material';
import {  IconButton,  Tooltip } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import api from '../../api'
import Swal from 'sweetalert2';
import UniqueLoader from '../loader';
import { DataGrid } from '@mui/x-data-grid';
import Adminsidebar from './adminsidebar';
import Adminheader from './adminheader';
import '../Admin/admincss/station-master.css'


function Loginmaster() {

  
    const [loginmaster, setloginmaster] = useState({
 
    ParentUserId: null,
    EntityTypeId: null,
    Entity: null,
    UserName: "",
    PhoneNumber: "",
    Email: "",
    // Password: "",
    IsPhoneVerified: "",
    IsEmailVerified: "",
  });

console.log(loginmaster);

  

      const[allmedical_speciality,setallmedical_speciality]=useState([])
      const getallmedical_speciality=async()=>
      {
        try {
          const resp=await api.post('api/v1/admin/LookupList',{lookupcodes:"medical_speciality"})
          setallmedical_speciality(resp.data.data)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        getallmedical_speciality()
    
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

  const onEdithospital=()=>
  {
    alert("edit")
  }

  const onDeletehospital=()=>
  {
    alert("delete")
  }

     const columnshospital = [
        { field: 'sno', headerName: 'S.No.', flex: 0.2,renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1},
        { field: 'lookup_type', headerName: 'Medical Speciality Type', flex: 1 },
        { field: 'lookup_value', headerName: 'Medical Speciality', flex: 1 },
       
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
                  onEdithospital(params.row._id);
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
    
      const rowshospital = allmedical_speciality?.map((doc, index) => ({
        id: doc._id || index,
        ...doc,
      }));


// =============================get create login for list=====================================

  const[login_for,setlogin_for]=useState([])
      const getall_login_for=async()=>
      {
        try {
          const resp=await api.post('api/v1/common/LookupList',{"lookup_type": "entity_type"})
          setlogin_for(resp.data.data)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        getall_login_for()
    
      },[])

     const selectedLoginFor = login_for?.find(
      (item) => item._id === loginmaster.EntityTypeId
    );
      

// =================================get org list==============================================

  const[allorgunits,setallorgunits]=useState([])
      const getallorgunits=async()=>
      {
        try {
          const resp=await api.post('api/v1/admin/LookupList',{lookupcodes:"org_unit_type"})
          setallorgunits(resp.data.data)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        getallorgunits()
    
      },[])

//================================= get station list=================================================

       const[allstationmaster,setallstationmaster]=useState([])
      const getallstation_list=async()=>
      {
        try {
          const resp=await api.post('api/v1/admin/StationList',{ page:1, limit:10, search:"" })
          console.log(resp);
          
          setallstationmaster(resp.data.data.list)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        getallstation_list()
    
      },[])


//========================================= get entity type ================================================

 const[allassest_category_level1,setallassest_category_level1]=useState([])
      const getallassest_category=async()=>
      {
        try {
          const resp=await api.post('api/v1/admin/LookupList',{lookupcodes:"asset_category_level_1"})
          setallassest_category_level1(resp.data.data)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        getallassest_category()
    
      },[])




//====================================== get asset ========================================================

      const[allasset_master_list,setallasset_master_list]=useState([])
      const[entitytype,setentitytype]=useState(null)
      const getall_assest_master=async()=>
      {
        try {
          const resp=await api.post('api/v1/admin/AssetList',
            {
            page: 1,
            limit: 10,
            AssetCategoryLevel1: entitytype,
            // "AssetCategoryLevel2": "64f1a2b3c4d5e6f7g8h9i0j2",
            // "search": "hospital"
            }
          )
      
         
          
          setallasset_master_list(resp.data.data.list)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        if(entitytype)
        {
           getall_assest_master()
        }
       
      },[entitytype])
  
console.log(entitytype);



const handlechange = (e) => {
  const { name, value, checked, type } = e.target;

  setloginmaster((prev) => {
    // Handle boolean radios (true/false as string)
    const booleanFields = ["IsEmailVerified", "IsPhoneVerified"];
    if (booleanFields.includes(name)) {
      return { ...prev, [name]: value === "true" };
    }

    // Handle checkboxes (single boolean)
    if (type === "checkbox" && !Array.isArray(prev[name])) {
      return { ...prev, [name]: checked };
    }

    // Handle checkboxes (array)
    if (type === "checkbox" && Array.isArray(prev[name])) {
      const updated = checked
        ? [...prev[name], value]
        : prev[name].filter((item) => item !== value);
      return { ...prev, [name]: updated };
    }

    // Normal single-value field
    return { ...prev, [name]: value };
  });
};


//========================== post api for create login master=============================
     
        const addstation_master = async () => {
        try {
          const resp = await api.post("api/v1/admin/CreateAssetLogin",loginmaster);
      
          if (resp.data.response.response_code === "200") {
              Swal.fire({
                      icon:"success",
                      title:"Login Created",
                      text:"Login Created Successfully...",
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
          }
        } catch (error) {
          console.error("❌ API Error:", error);
        }
      };

 
      

  return (
    <div>
        <Adminsidebar/>
        <Adminheader/>
<div className='station-master'>
        <div className='profile-header'>
                  <h3>Enter Details for Login Master</h3>
                  <p>Add or update the required details for the login master to keep records accurate and complete.</p>
                  </div>
        
        
          <div  className='doctorform'>
                    <Box>
                        <Box
                          sx={{
                            mt: { xs: 3, lg: 5 },
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            width: '100%',
                          }}
                        >
                          <Grid container spacing={4} sx={{ maxWidth: 1150, width: '100%' }} >
                            {/* ===== Left: FORM ===== */}
                           <Box
                        component="form"
                        // onSubmit={add_medical_group}
                        autoComplete="off"
                        sx={{
                          background: '#fff',
                          borderRadius: 3,
                          // boxShadow: 3,
                           minWidth:440,
                          maxWidth: { xs: 630, lg: 900 },
                          p: { xs: 2, sm: 3, md: 5 },
                          mx: 'auto',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 2, // spacing between inputs
                        }}
                      >
          
          <FormControl component="fieldset" sx={{ mt: 0 }}>
              <Typography sx={{ fontWeight: 500 }}>Create Login For (Entity Type)</Typography>
              <RadioGroup size="small"
                row
                name="EntityTypeId"
                value={loginmaster.EntityTypeId}
                onChange={handlechange}
                sx={{ flexDirection: 'row', alignItems: 'flex-start', gap: 1 }}
              >
                {
                  login_for?.map((item)=>
                  (
                    <>
                     <FormControlLabel value={item._id} control={<Radio />} label={item.lookup_value} />
                    {/* <FormControlLabel value={item._id} control={<Radio />} label={item.lookup_value} /> */}
                    </>
                  ))
                }
               
              </RadioGroup>
            </FormControl>

{
  selectedLoginFor?.lookup_value==="Station" &&
  (

       <FormControl fullWidth size="small">
            <InputLabel>Entity</InputLabel>
            <Select 
              name="Entity"
              label="Entity"
              value={loginmaster.Entity}
              MenuProps={{
                disablePortal: true,
                disableScrollLock: true,
              }}
              onChange={handlechange}
            >
             {
                allstationmaster?.map((item)=>
                (
                    <MenuItem key={item._id} value={item._id}>{item.StationName}</MenuItem>
                ))
            }
            </Select>
          </FormControl> 

  )
}

{
  selectedLoginFor?.lookup_value==="Asset" &&
  (
<>
       <FormControl fullWidth size="small">
            <InputLabel>Entity Type</InputLabel>
            <Select 
              name="entitytype"
              label="Entity Type"
              value={entitytype}
              MenuProps={{
                disablePortal: true,
                disableScrollLock: true,
              }}
              onChange={(e)=>setentitytype(e.target.value)}
            >
             {
                allassest_category_level1?.map((item)=>
                (
                    <MenuItem key={item._id} value={item._id}>{item.lookup_value}</MenuItem>
                ))
            }
            </Select>
          </FormControl> 


           <FormControl fullWidth size="small">
            <InputLabel>Entity</InputLabel>
            <Select 
              name="Entity"
              label="Entity"
              value={loginmaster.Entity}
              MenuProps={{
                disablePortal: true,
                disableScrollLock: true,
              }}
              onChange={handlechange}
            >
             {
                allasset_master_list?.map((item)=>
                (
                    <MenuItem key={item._id} value={item._id}>{item.AssetName}</MenuItem>
                ))
            }
            </Select>
          </FormControl> 
</>
  )
}
          


      
           <FormControl fullWidth size="small">
            <InputLabel>Parent User ID</InputLabel>
            <Select 
              name="StationId"
              label=" ⁠Parent User ID"
              value={loginmaster.ParentStationId}
              MenuProps={{
                disablePortal: true,
                disableScrollLock: true,
              }}
              onChange={handlechange}
            >
             {
                allorgunits.map((item)=>
                (
                    <MenuItem key={item._id} value={item._id}>{item.lookup_value}</MenuItem>
                ))
            }
            </Select>
          </FormControl> 

          {/* <FormControl fullWidth size="small">
            <InputLabel>User ID</InputLabel>
            <Select 
              name="StationId"
              label="UserID"
              value={stationmaster.ParentStationId}
              MenuProps={{
                disablePortal: true,
                disableScrollLock: true,
              }}
              onChange={handlechange}
            >
             {
                allorgunits.map((item)=>
                (
                    <MenuItem key={item._id} value={item._id}>{item.lookup_value}</MenuItem>
                ))
            }
            </Select>
          </FormControl>  */}


           <TextField
            name="UserName"
            label="⁠User Name"
            defaultValue={loginmaster.UserName}
            onChange={handlechange}
            fullWidth
            size="small"
          />
        
          <TextField
            name="PhoneNumber"
            label="Phone Number"
            defaultValue={loginmaster.PhoneNumber}
            onChange={handlechange}
            fullWidth
            size="small"
          />

         
            <TextField
            name="Email"
            label="Email Address"
            defaultValue={loginmaster.Email}
            onChange={handlechange}
            fullWidth
            size="small"
          />

           <FormControl component="fieldset" sx={{ mt: 0 }}>
              <Typography sx={{ fontWeight: 500 }}>⁠Is Phone Verified</Typography>
              <RadioGroup size="small"
                row
                name="IsPhoneVerified"
                value={loginmaster.IsPhoneVerified}
                onChange={handlechange}
                sx={{ flexDirection: 'row', alignItems: 'flex-start', gap: 1 }}
              >
                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                <FormControlLabel value="false" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

              <FormControl component="fieldset" sx={{ mt: 0 }}>
              <Typography sx={{ fontWeight: 500 }}>⁠Is Email Verified</Typography>
              <RadioGroup size="small"
                row
                name="IsEmailVerified"
                value={loginmaster.IsEmailVerified}
                onChange={handlechange}
                sx={{ flexDirection: 'row', alignItems: 'flex-start', gap: 1 }}
              >
                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                <FormControlLabel value="false" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
         
            {/* <TextField
            name="Password"
            label="Password"
            value={loginmaster.Password}
            onChange={handlechange}
            fullWidth
            size="small"
          /> */}

            {/* <TextField
            type='date'
            InputLabelProps={{ shrink: true }}
            name="AssetName"
            label="CreatedOn"
            value={loginmaster.StationName}
            onChange={handlechange}
            fullWidth
            size="small"
          /> */}

          <Button
            variant="contained"
            color="primary"
            fullWidth
            // type="submit"
            sx={{ py: 1.2, fontSize: 16, fontWeight: 600, borderRadius: 2, mt: 1 }}
            onClick={addstation_master}
          >
            Submit
          </Button>
        </Box>
        
        
          {/* ======================= Right: hospital talbe================================= ===== */}
                           <Grid item xs={12} md={5} sx={{ mt: { xs: 3, md: 0 } } }>
                               <Box
                               className='rightsection'
                        component="form"
                        autoComplete="off"
                        sx={{
                          background: '#fff',
                          borderRadius: 3,
                          // boxShadow: 3,
                          minWidth:510,
                          maxWidth: 530,
                          p: { xs: 0, sm: 0, md: 0 },
                          mx: 'auto',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 2, // spacing between inputs
                        }}
                      >
                            
                                              
              <DataGrid
               className="custom-data-grid"
                rows={rowshospital}
                columns={columnshospital}
                pageSize={10}
                pageSizeOptions={[]} // removes the rows per page selector
                initialState={{
                  pagination: { paginationModel: { pageSize: 10, page: 0 } },
                }}
                disableSelectionOnClick
              
              />
              </Box>
              
         
        
                                 
                            
                          
                            </Grid>
                          </Grid>
                        </Box>
                    
                    </Box>
                  </div>
      
      </div>
    </div>
  )
}

export default Loginmaster
