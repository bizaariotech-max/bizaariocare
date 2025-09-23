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



function MedicineFrequencyMaster() {

  const[loading,setloading]=useState(false)
     const [medicine_frequency_master, setmedicine_frequency_master] = useState({
            medicine_frequency: "",
        
        });



      const[all_medical_frequency_type,setall_medical_frequency_type]=useState([])
      const getall_medical_frequency_type=async()=>
      {
        try {
          const resp=await api.post('api/v1/admin/LookupList/',{lookupcodes:"medicine_frequency_type"})
          console.log(resp);
          
          setall_medical_frequency_type(resp.data.data)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        getall_medical_frequency_type()
    
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
      setmedicine_frequency_master({medicine_frequency:row.lookup_value})
   }

  const onDeletehospital=()=>
  {
    alert("delete")
  }

  

     const columns = [
        { field: 'sno', headerName: 'S.No.', flex: 0.2,renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1},
        { field: 'lookup_value', headerName: 'Medicine Frequency Type', flex: 0.5 }, 
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
    
      const rows = all_medical_frequency_type?.map((doc, index) => ({
        id: doc._id || index,
        ...doc,
      }));




    const handlechange = (e) => {
  const { name, value, checked, type } = e.target;

  setmedicine_frequency_master((prev) => {
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



     
        const add_medicine_frequency_type_master = async () => {
        try {
          setloading(true)
          const resp = await api.post("api/v1/admin/SaveLookup",
            {
              lookup_id:lookup_id,
              lookup_type:"medicine_frequency_type",
              lookup_value:medicine_frequency_master.medicine_frequency,
            }
          );
    
          if (resp.data.response.response_code === "200") {
              Swal.fire({
                      icon:"success",
                      title:"Frequency Type Master Added",
                      text:"Medicine Frequency Type Master Addedd Successfully...",
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
                  <h3>Enter Details for Medicine Frequency Master</h3>
                  <p>Add or update the required details for the medicine frequency master to keep records accurate and complete.</p>
                  </div>
        
        
           {/* Form */}
                   <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
      <div className="form-grid">
    
           <FormControl fullWidth size="small">
            <label className="form-label">Medicine Frequency</label>
            <TextField 
              name="medicine_frequency"
              defaultValue={medicine_frequency_master.medicine_frequency}
              onChange={handlechange}
              placeholder='medicine frequency'
            >
           
            </TextField>
          </FormControl> 

         </div>

          <Button
          className='submit-button'
            onClick={add_medicine_frequency_type_master}
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

export default MedicineFrequencyMaster
