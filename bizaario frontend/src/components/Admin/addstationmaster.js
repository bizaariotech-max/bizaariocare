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


function Addstationmaster() {


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
        { field: 'StationName', headerName: 'Station Name', flex: 1 },
        // { field: 'TotalPopulation', headerName: 'Total Population', flex: 1 },
        { field: 'LiteracyRate', headerName: 'Literacy Rate', flex: 1 },
           
       
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
    
      const rowshospital = allstationmaster?.map((doc, index) => ({
        id: doc._id || index,
        ...doc,
      }));

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

//================================= get country group=================================================

    const[allcountrygroup,setallcountrygroup]=useState([])
      const getallcountrygroup=async()=>
      {
        try {
          const resp=await api.post('api/v1/admin/LookupList',{ lookupcodes:"country_group_type"})
          setallcountrygroup(resp.data.data)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        getallcountrygroup()
    
      },[])


//========================================= get isd ================================================


    const[allisdcode,setallisdcode]=useState([])
      const getallisdcode=async()=>
      {
        try {
          const resp=await api.post('api/v1/admin/LookupList',{ lookupcodes:"isd_code_type"})
          setallisdcode(resp.data.data)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        getallisdcode()
    
      },[])


//====================================== get currency==============================================

   const[allcurrency,setallcurrency]=useState([])
      const getallcurrency=async()=>
      {
        try {
          const resp=await api.post('api/v1/admin/LookupList',{ lookupcodes:"currency_type"})
          setallcurrency(resp.data.data)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        getallcurrency()
    
      },[])


    const [stationmaster, setstationmaster] = useState({
    ParentStationId: null,
    OrgUnitLevel: "",
    StationName: "",
    CountryGroupId: null,
    ISDCode: "",
    Currency: "",
    CensusYear: "",
    PopulationMale: "",
    PopulationFemale: "",
    TotalPopulation: "",
    LiteracyRate: "",
    AreaSQKM: "",
  });

    const handlechange = (e) => {
  const { name, value, checked, type } = e.target;

  setstationmaster((prev) => {
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


     
        const addstation_master = async () => {
        try {
          const resp = await api.post("api/v1/admin/SaveStation",stationmaster);
      
          if (resp.data.response.response_code === "200") {
              Swal.fire({
                      icon:"success",
                      title:"Station Master Added",
                      text:"Station Master Addedd Successfully...",
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
               Swal.fire({
                                  icon:"error",
                                  title:"Error Occured",
                                  text:resp.data.response.response_message.error,
                                  showConfirmButton:true,
                                   customClass: {
                                  confirmButton: 'my-swal-button',
                                }
                              })
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
                  <h3>Enter Details for Station Master</h3>
                  <p>Add or update the required details for the station master to keep records accurate and complete.</p>
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
          

          <FormControl fullWidth size="small">
            <InputLabel>Parent Station</InputLabel>
            <Select 
              name="ParentStationId"
              label="Parent Station"
              value={stationmaster.ParentStationId}
              MenuProps={{
                disablePortal: true,
                disableScrollLock: true,
              }}
              onChange={handlechange}
            >
             {
                allstationmaster.map((item)=>
                (
                    <MenuItem key={item._id} value={item._id}>{item.StationName}</MenuItem>
                ))
            }
            </Select>
          </FormControl> 

         <FormControl fullWidth size="small">
            <InputLabel>Org Unit Level</InputLabel>
            <Select 
              name="OrgUnitLevel"
              label="Org Unit Level"
              value={stationmaster.OrgUnitLevel}
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
        
          <TextField
            name="StationName"
            label="Station Name"
            value={stationmaster.StationName}
            onChange={handlechange}
            fullWidth
            size="small"
          />

         <FormControl fullWidth size="small">
            <InputLabel>Country Group ID</InputLabel>
            <Select 
              name="CountryGroupId"
              label="Country Group ID"
              value={stationmaster.CountryGroupId}
              MenuProps={{
                disablePortal: true,
                disableScrollLock: true,
              }}
              onChange={handlechange}
            >
              {
                allcountrygroup.map((item)=>
                (
                    <MenuItem key={item._id} value={item._id}>{item.lookup_value}</MenuItem>
                ))
            }
            </Select>
          </FormControl> 
         
       <FormControl fullWidth size="small">
            <InputLabel>ISD Code</InputLabel>
            <Select 
              name="ISDCode"
              label="ISD Code"
              value={stationmaster.ISDCode}
              MenuProps={{
                disablePortal: true,
                disableScrollLock: true,
              }}
              onChange={handlechange}
            >
            {
                allisdcode.map((item)=>
                (
                    <MenuItem key={item._id} value={item._id}>{item.lookup_value}</MenuItem>
                ))
            }
            </Select>
          </FormControl> 

 <FormControl fullWidth size="small">
            <InputLabel>Currency</InputLabel>
            <Select 
              name="Currency"
              label="Currency"
              value={stationmaster.Currency}
              MenuProps={{
                disablePortal: true,
                disableScrollLock: true,
              }}
              onChange={handlechange}
            >
            {
                allcurrency.map((item)=>
                (
                    <MenuItem key={item._id} value={item._id}>{item.lookup_value}</MenuItem>
                ))
            }
            </Select>
          </FormControl> 

          
             <TextField
             type='number'
            name="CensusYear"
            label="Census Year "
            value={stationmaster.CensusYear}
            onChange={handlechange}
            fullWidth
            size="small"
          />

            <TextField
            type='number'
            name="PopulationMale"
            label="Population Male "
            value={stationmaster.PopulationMale}
            onChange={handlechange}
            fullWidth
            size="small"
          />

            <TextField
            type='number'
            name="PopulationFemale"
            label="Population Female "
            value={stationmaster.PopulationFemale}
            onChange={handlechange}
            fullWidth
            size="small"
          />

            <TextField
            type='number'
            name="TotalPopulation"
            label="Total Population "
            value={stationmaster.TotalPopulation}
            onChange={handlechange}
            fullWidth
            size="small"
          />

             <TextField
             type='number'
            name="LiteracyRate"
            label="Literacy Rate (%)"
            value={stationmaster.LiteracyRate}
            onChange={handlechange}
            fullWidth
            size="small"
          />
            <TextField
            type='number'
            name="AreaSQKM"
            label="Area in SQKM"
            value={stationmaster.AreaSQKM}
            onChange={handlechange}
            fullWidth
            size="small"
          />

            {/* <TextField
            name="medical_speciality"
            label="Station Admin"
            value={medical_speciality}
            onChange={(e)=>setmedicalspeciality(e.target.value)}
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

export default Addstationmaster
