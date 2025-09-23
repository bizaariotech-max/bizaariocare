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



function PharmaceuticalSaltMaster() {

  const[loading,setloading]=useState(false)
     const [pharmaceutical_salt_master, setpharmaceutical_salt_master] = useState({
    salt_type: null,
    salt_composition: "",
    purpose: "",

  });



      const[all_salt_master,setall_salt_master]=useState([])
      const getall_salt_master=async()=>
      {
        try {
            const resp=await api.post('api/v1/admin/LookupList/',{lookupcodes:"pharmaceutical_salt_master"})
          console.log(resp);
          
          setall_salt_master(resp.data.data)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        getall_salt_master()
    
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
     setpharmaceutical_salt_master({
      salt_type:row.parent_lookup_id,
      salt_composition:row.lookup_value,
      purpose:row.other.purpose
  })
  }

  const onDeletehospital=()=>
  {
    alert("delete")
  }

     const column_salt_master = [
        { field: 'sno', headerName: 'S.No.', flex: 0.2,renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1},
        { field: 'parent_lookup_name', headerName: 'Salt Type', flex: 0.5 }, 
        { field: 'lookup_value', headerName: 'Salt Compositin', flex: 0.5 },
        { field: 'other', headerName: 'Purpose',flex:1,  renderCell: (params) => {
            return params.row?.other?.purpose || "";
        }},
     
       
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
    
      const rowssaltmaster = all_salt_master?.map((doc, index) => ({
        id: doc._id || index,
        ...doc,
      }));




    //========================================= get salt type id ================================================

  const[salt_type,setsalt_type]=useState([])
      const get_salt_type=async()=>
      {
        try {
          const resp=await api.post('api/v1/admin/LookupList',{lookupcodes:"pharmaceutical_salt_type"})
          setsalt_type(resp.data.data)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        get_salt_type()
    
      },[])




   


    const handlechange = (e) => {
  const { name, value, checked, type } = e.target;

  setpharmaceutical_salt_master((prev) => {
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


     
        const add_pharmaceutical_salt_master = async () => {
        try {
          setloading(true)
          const resp = await api.post("api/v1/admin/SaveLookup",
            {
              lookup_id:lookup_id,
              lookup_type:"pharmaceutical_salt_master",
              lookup_value:pharmaceutical_salt_master.salt_composition,
              parent_lookup_id:pharmaceutical_salt_master.salt_type,
              other:{purpose:pharmaceutical_salt_master.purpose}
            }
          );
      
          if (resp.data.response.response_code === "200") {
              Swal.fire({
                      icon:"success",
                      title:"Salt Master Added",
                      text:"Pharmaceutical Salt Master Addedd Successfully...",
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
                  <h3>Enter Details for Pharmaceutical Salt Master</h3>
                  <p>Add or update the required details for the pharmaceutical salt master to keep records accurate and complete.</p>
                  </div>
        
        
           {/* Form */}
              <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
      <div className="form-grid">
          

               <FormControl fullWidth size="small">
             <label className="form-label">Salt Type</label>
            <Select 
              name="salt_type"
              value={pharmaceutical_salt_master.salt_type}
              onChange={handlechange}
             MenuProps={{
                    disablePortal: true,
                    disableScrollLock: true,
                    }}
                displayEmpty
                renderValue={(selected) => {
                  if (!selected) {
                    return <span style={{ color: "#9ca3af" }}>Salt Type</span>; // grey placeholder
                  }
                  return salt_type.find((item) => item._id === selected)?.lookup_value;
                }}
            >

               <MenuItem disabled value="">
                  <em>Salt Type</em>
                </MenuItem>
             {
                salt_type?.map((item)=>
                (
                    <MenuItem key={item._id} value={item._id}>{item.lookup_value}</MenuItem>
                ))
            }
            </Select>
          </FormControl> 


       <FormControl fullWidth size="small">
             <label className="form-label">Salt Composition</label>
            <TextField 
              name="salt_composition"
              defaultValue={pharmaceutical_salt_master.salt_composition}
              onChange={handlechange}
              placeholder='Salt Composition'
            >

            </TextField>
          </FormControl> 

        


           <FormControl fullWidth size="small">
            <label className="form-label">Purpose </label>
            <TextField 
              name="purpose"
              value={pharmaceutical_salt_master.purpose}
              onChange={handlechange}
              placeholder='purpose'
            >
           
            </TextField>
          </FormControl> 

         
         </div>

          <Button
           className='submit-button'
            onClick={add_pharmaceutical_salt_master}
          >
            Submit
          </Button>
        </Paper>
        
        
      {/* Table */}
               <Paper elevation={3} sx={{ p: 2, borderRadius: 2,marginTop:4 }}>  
                                              
              <DataGrid
               className="custom-data-grid"
                rows={rowssaltmaster}
                columns={column_salt_master}
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

export default PharmaceuticalSaltMaster
