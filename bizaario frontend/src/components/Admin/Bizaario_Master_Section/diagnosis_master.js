import React, { useState ,useRef, useEffect} from 'react';
import {
  Box, Grid, Button, Typography, Card, Avatar,
  TextField, FormControl, InputLabel, Select, MenuItem, Paper,
  FormControlLabel, Radio, Fade,Chip,Menu,InputAdornment 
} from '@mui/material';
import {  IconButton,  Tooltip } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import api from '../../../api'
import Swal from 'sweetalert2';
import UniqueLoader from '../../loader';
import { DataGrid } from '@mui/x-data-grid';
import Adminsidebar from '../adminsidebar';
import Adminheader from '../adminheader';



function DiagnosisMaster() {

  const[loading,setloading]=useState(false)
     const [diagnosis_master, setdiagnosis_master] = useState({
    medical_speciality_id: null,
    medical_diagnosis: "",

  });



      const[all_diagnosis_master,setall_diagnosis_master]=useState([])
      const getall_diagnosis_master=async()=>
      {
        try {
            const resp=await api.post('api/v1/admin/LookupList/',{lookupcodes:"diagnosis_master"})
          console.log(resp);
          
          setall_diagnosis_master(resp.data.data)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        getall_diagnosis_master()
    
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
       setdiagnosis_master({
        medical_speciality_id:row.parent_lookup_id,
        medical_diagnosis:row.lookup_value
      })
    }

  const onDeletehospital=()=>
  {
    alert("delete")
  }

     const columns = [
        { field: 'sno', headerName: 'S.No.', flex: 0.2,renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1},
        { field: 'parent_lookup_name', headerName: 'Medical Speciality', flex: 0.5 }, 
        { field: 'lookup_value', headerName: 'Medical Diagnosis', flex: 0.5 },
        // { field: 'other', headerName: 'Description',flex:1,  renderCell: (params) => {
        //     return params.row?.other?.description || "";
        // }},
     
       
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
    
      const rows = all_diagnosis_master?.map((doc, index) => ({
        id: doc._id || index,
        ...doc,
      }));




    //========================================= get medical speciality id ================================================

  const[medical_speciality,setmedical_speciality]=useState([])
      const getmedical_speciality=async()=>
      {
        try {
          const resp=await api.post('api/v1/admin/LookupList',{lookupcodes:"medical_speciality"})
          setmedical_speciality(resp.data.data)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        getmedical_speciality()
    
      },[])




   


    const handlechange = (e) => {
  const { name, value, checked, type } = e.target;

  setdiagnosis_master((prev) => {
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


     
        const add_diagnosis_master = async () => {
        try {
          setloading(true)
          const resp = await api.post("api/v1/admin/SaveLookup",
            {
              lookup_id:lookup_id,
              lookup_type:"diagnosis_master",
              lookup_value:diagnosis_master.medical_diagnosis,
              parent_lookup_id:diagnosis_master.medical_speciality_id
            }
          );
      
          if (resp.data.response.response_code === "200") {
              Swal.fire({
                      icon:"success",
                      title:"Diagnosis Master Added",
                      text:"Diagnosis Master Addedd Successfully...",
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
    <Adminheader />

      <div className="layout">
        <Adminsidebar />
        <div className="content-wrapper">
          <div className="main-content">

        <div className='profile-header'>
                  <h3>Enter Details for Diagnosis Master</h3>
                  <p>Add or update the required details for the diagnosis master to keep records accurate and complete.</p>
                  </div>
        
        
           {/* Form */}
                  <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
      <div className="form-grid">
          

               <FormControl fullWidth size="small">
             <label className="form-label">Medical Speciality ID</label>
            <Select 
              name="medical_speciality_id"
              value={diagnosis_master.medical_speciality_id}
              onChange={handlechange}
             MenuProps={{
                    disablePortal: true,
                    disableScrollLock: true,
                    }}
                displayEmpty
                renderValue={(selected) => {
                  if (!selected) {
                    return <span style={{ color: "#9ca3af" }}>Medical Speciality ID</span>; // grey placeholder
                  }
                  return medical_speciality.find((item) => item._id === selected)?.lookup_value;
                }}
            >

               <MenuItem disabled value="">
                  <em>Medical Speciality ID</em>
                </MenuItem>
             {
                medical_speciality?.map((item)=>
                (
                    <MenuItem key={item._id} value={item._id}>{item.lookup_value}</MenuItem>
                ))
            }
            </Select>
          </FormControl> 


       <FormControl fullWidth size="small">
             <label className="form-label">Medical Diagnosis</label>
            <TextField 
              name="medical_diagnosis"
              defaultValue={diagnosis_master.medical_diagnosis}
              onChange={handlechange}
              placeholder='Disease Name'
            >

            </TextField>
          </FormControl> 

         </div>

          <Button
          className='submit-button'
            onClick={add_diagnosis_master}
          >
            Submit
          </Button>
        </Paper>
        
        
      {/* Table */}
              <Paper elevation={3} sx={{ p: 2, borderRadius: 2,marginTop:4 }}>  
                                              
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
              </Paper>
     
          </div>
      </div>
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

export default DiagnosisMaster
