import React, { useState ,useRef, useEffect} from 'react';
import {
  Box, Grid, Button, Typography, Card, Avatar,
  TextField, FormControl, InputLabel, Select, MenuItem, Paper,
  FormControlLabel, Radio, Fade,Chip,Menu,InputAdornment 
} from '@mui/material';
import {  IconButton,  Tooltip } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import api from '../../../../api'
import Swal from 'sweetalert2';
import UniqueLoader from '../../../loader';
import { DataGrid } from '@mui/x-data-grid';
import Adminsidebar from '../../adminsidebar';
import Adminheader from '../../adminheader';
import '../style/common_config.css';


function Addorgunit() {


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
        // { field: 'lookup_type', headerName: 'Org Unit Type', flex: 1 },
        { field: 'lookup_value', headerName: 'Org Unit', flex: 1 },
       
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
    
      const rowshospital = allorgunits?.map((doc, index) => ({
        id: doc._id || index,
        ...doc,
      }));


       const[orgunit,setorgunit]=useState("")
            const add_org_unit = async () => {
              try {
                const resp = await api.post("api/v1/admin/SaveLookup", {
                  lookup_type: "org_unit_type",
                  parent_lookup_id: null ,
                  lookup_value:orgunit         
                });
            
                if (resp.data.response.response_code === "200") {
                    Swal.fire({
                            icon:"success",
                            title:"Org Created",
                            text:"Org Unit Addedd Sucessfully...",
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
  <Adminheader />

      <div className="layout">
        <Adminsidebar />
        <div className="content-wrapper">
          <div className="main-content">
        <div className='profile-header'>
                  <h3>Enter Details for Org Unit Master</h3>
                  <p>Add or update the required details for the org unit master to keep records accurate and complete.</p>
                  </div>

       {/* Form */}
         <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
            <div className="form-grid">

         <FormControl fullWidth size="small">
          <label className="form-label">Org Unit</label>
          <TextField
            name="orgunit"
            placeholder="org unit"
            value={orgunit}
            onChange={(e)=>setorgunit(e.target.value)}
            fullWidth
            size="small"
          />
          </FormControl>

          </div>
        
          <Button
           className='submit-button'
          >
            Submit
          </Button>
        </Paper>
        
        
        {/* Table */}
                <Paper elevation={3} sx={{ p: 2, borderRadius: 2,marginTop:4 }}> 
                                              
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
              </Paper>
         </div>
          </div>
        </div>
        </div>
  )
}

export default Addorgunit
