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
import '../Admin/admincss/content-type.css'


function Addstationmaster() {


      const[allhospital,setallhospital]=useState([])
      const getallhospital=async()=>
      {
        try {
          const resp=await api.get('hospital/getallhospital')
          setallhospital(resp.data.hospital)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        getallhospital()
    
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
        { field: 'hospital_name', headerName: 'Content Type ID', flex: 1 },
        { field: 'hospital_type', headerName: 'Content Type', flex: 1 },
       
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
    
      const rowshospital = allhospital.map((doc, index) => ({
        id: doc._id || index,
        ...doc,
      }));


  return (
    <div>
        <Adminsidebar/>
        <Adminheader/>
<div className='station_master'>
        <div className='profile-header'>
                  <h3>Enter Details for Content Type</h3>
                  <p>Add or update the required details for the content type to keep records accurate and complete.</p>
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
          

           <FormControl fullWidth size="small">
            <InputLabel>Parent Station</InputLabel>
            <Select 
              name="hospital_type"
              label="Parent Station"
            //   value={hospital.hospital_type}
              MenuProps={{
                disablePortal: true,
                disableScrollLock: true,
              }}
            //   onChange={handleChange1}
            >
              <MenuItem value="India">India</MenuItem>
              <MenuItem value="Usa">USA</MenuItem>
              <MenuItem value="United Kingdom">UK</MenuItem>
            </Select>
          </FormControl> 
        
          <TextField
            name="hospital_name"
            label="Content Type"
            // value={hospital.hospital_name}
            // onChange={handleChange1}
            fullWidth
            size="small"
          />
        
         
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            sx={{ py: 1.2, fontSize: 16, fontWeight: 600, borderRadius: 2, mt: 1 }}
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
