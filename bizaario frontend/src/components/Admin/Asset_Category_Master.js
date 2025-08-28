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
import '../Admin/admincss/assetcategory_master.css'


function AddAssetCategoryMaster() {


      const[allassest_category,setallassest_category]=useState([])
      const getallassest_category=async()=>
      {
        try {
          const resp=await api.post('api/v1/admin/LookupList',{lookupcodes:"asset_category_level_1"})
          setallassest_category(resp.data.data)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        getallassest_category()
    
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
        { field: 'lookup_type', headerName: 'Asset Category Type', flex: 1 },
        { field: 'lookup_value', headerName: 'Asset Category', flex: 1 },
       
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
    
      const rowshospital = allassest_category?.map((doc, index) => ({
        id: doc._id || index,
        ...doc,
      }));

        const[assest_category,setassest_category]=useState("")
    
       
        
                              const add_assest_category = async () => {
                                try {
                                  const resp = await api.post("api/v1/admin/SaveLookup", {
                                    lookup_type: "asset_category_level_1",
                                    parent_lookup_id:null ,
                                    lookup_value:assest_category         
                                  });
                              
                                  if (resp.data.response.response_code === "200") {
                                      Swal.fire({
                                              icon:"success",
                                              title:"Event Type Created",
                                              text:"Event Type Addedd Successfully...",
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
<div className='asset-category-master'>
        <div className='profile-header'>
                  <h3>Enter Details for Asset Category Master Level 1</h3>
                  <p>Add or update the required details for the asset category master level 1 to keep records accurate and complete.</p>
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
                        // onSubmit={hospitalhandleSubmit}
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
          

        
          <TextField
            name="assest_category"
            label="Asset Category Level 1"
            value={assest_category}
            onChange={(e)=>setassest_category(e.target.value)}
            fullWidth
            size="small"
          />
        
         
          <Button
            variant="contained"
            color="primary"
            fullWidth
            // type="submit"
            sx={{ py: 1.2, fontSize: 16, fontWeight: 600, borderRadius: 2, mt: 1 }}
            onClick={add_assest_category}
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

export default AddAssetCategoryMaster
