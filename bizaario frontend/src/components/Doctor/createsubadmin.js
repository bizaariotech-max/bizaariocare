import React, { useEffect } from 'react'
import { useState,useRef } from 'react';
import Doctorheader from './doctorheader'
import Doctorsidebar from './doctorsidebar'
import {Box, Grid, Button, TextField,Menu,MenuItem,IconButton,FormControl,Typography,FormGroup,
        FormControlLabel,Checkbox, Chip,} from '@mui/material';
import api from '../../api'
import Swal from 'sweetalert2';
import '../Doctor/stylingcss/subadmin.css'
import UniqueLoader from '../loader';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';


function Createsubadmin() {

      const doctordetails = JSON.parse(localStorage.getItem("user"));
  
      

     const [loading, setLoading] = useState(false);

     
// =============================crete course code=============================================

       const [subadmin,setsubadmin]=useState({name:"",phone_no:"",designation:"",email:"",
                                        password:""})


                            const generatePassword = () => {
                                const chars =
                                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
                                let pass = "";
                                for (let i = 0; i < 6; i++) {
                                pass += chars.charAt(Math.floor(Math.random() * chars.length));
                                }
                                return pass;
                            };

                            // Auto-generate password on mount
                            useEffect(() => {
                                setsubadmin((prev) => ({ ...prev, password: generatePassword() }));
                            }, []);



const handleChange = (e) => {
  const { name, value, checked, type } = e.target;

  setsubadmin((prev) => {
    // If dropdown/multiple select returns an array directly
    if (Array.isArray(value)) {
      return { ...prev, [name]: value };
    }

    // If the state field is already an array (checkbox group)
    if (Array.isArray(prev[name])) {
      const updated = checked
        ? [...prev[name], value] // Add
        : prev[name].filter((item) => item !== value); // Remove
      return { ...prev, [name]: updated };
    }

     // If this is a checkbox group for an array field
    if (type === "checkbox" && Array.isArray(prev[name])) {
      const updated = checked
        ? [...prev[name], value] // Add to array
        : prev[name].filter((item) => item !== value); // Remove from array
      return { ...prev, [name]: updated };
    }

    // If this is a single checkbox (boolean)
    if (type === "checkbox") {
      return { ...prev, [name]: checked };
    }

    // Normal single-value field
    return { ...prev, [name]: type === "checkbox" ? checked : value };
  });
};







      const handleSubmit = async(e) => {
        e.preventDefault();
         setLoading(true);
        try {
          
          const resp=await api.post('/doctor/createsubadmin',subadmin)
          if(resp.status===200)
          {
            Swal.fire({
              icon:"success",
              title:"Sub-Admin Created",
              text:"New Sub Admin Created Successfully...",
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
          Swal.fire({
            icon:"error",
            title:"error ",
            text:error.response.data.message,
            showConfirmButton:true,
             customClass: {
              confirmButton: 'my-swal-button',
            },
          })
          console.log(error);
          
        }finally
        {
          setLoading(false)
        }
      };


// ==========================view course and display it in table=======================================


const[allsubadmin,setallsubadmin]=useState([])
  const getallsubadmin=async()=>
  {
    try {
      const resp=await api.get('doctor/getsubadmindetails')
      setallsubadmin(resp.data.subadmin)
      
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>
  {
     getallsubadmin()

  },[])

const [anchorEl, setAnchorEl] = useState(null);
const [selectedRowId, setSelectedRowId] = useState(null);

const handleOpenMenu = (event, id) => {
  setAnchorEl(event.currentTarget);
  setSelectedRowId(id); // store the current row id
};

const handleCloseMenu = () => {
  setAnchorEl(null);
  setSelectedRowId(null);
};

  const onEdit=()=>
  {
    alert("edit")
  }

  const onDelete=async(id)=>
  {
    try {
     
         const confirmResult = await Swal.fire({
            title: "Are you sure?",
            text: "This action will permanently delete the Sub-Admin.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
            reverseButtons: true,
            customClass: {
                confirmButton: 'my-swal-button',
                cancelButton: 'my-swal-cancel-button'
            }
            });

        if (confirmResult.isConfirmed) {
        const resp=await api.delete(`doctor/deletesubadmin/${id}`)
         if(resp.status===200)
          {
            Swal.fire({
              icon:"success",
              title:"Sub-Admin Deleted",
              text:"Sub Admin Deleted Successfully...",
              showConfirmButton:true,
               customClass: {
              confirmButton: 'my-swal-button',
            },
            }).then(()=>
            {
              window.location.reload()
            })
           
          }
        }
        
    } catch (error) {
         Swal.fire({
            icon:"error",
            title:"error ",
            text:error.response.data.message,
            showConfirmButton:true,
             customClass: {
              confirmButton: 'my-swal-button',
            },
          })
          console.log(error);
          
        
    }
  }

  const columns = [
    { field: 'sno', headerName: 'S.No.', flex: 0.2,renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1},
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'phone_no', headerName: 'Phone No.', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'password', headerName: 'Password', flex: 1 },
 {
  field: 'actions',
  headerName: 'Actions',
  width: 100,
  sortable: false,
  filterable: false,
  renderCell: (params) => (
    <>
      <IconButton 
       onClick={(event) => handleOpenMenu(event, params.row._id)} 
        size="small"
        sx={{
          backgroundColor: '#f5f5f5',
          '&:hover': { backgroundColor: '#e0e0e0' },
        }}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl) && selectedRowId === params.row._id}
        onClose={handleCloseMenu}
        disableScrollLock
        PaperProps={{
          elevation: 4,
          sx: {
            borderRadius: 2,
            minWidth: 160,
            bgcolor: 'background.paper',
            '& .MuiMenuItem-root': {
              gap: 1,
              fontSize: '0.9rem',
              px: 2,
              py: 1,
              '&:hover': {
                bgcolor: 'primary.light',
                color: 'white',
              },
            }
          }
        }}
      >
        <MenuItem onClick={() => { onEdit(params.row._id); handleCloseMenu(); }}>
          <EditIcon fontSize="small" /> Edit
        </MenuItem>
        <MenuItem onClick={() => { onDelete(selectedRowId); handleCloseMenu(); }}>
          <DeleteIcon fontSize="small" color="error" /> Delete
        </MenuItem>
      </Menu>
    </>
  ),
}

  ];

  const rows = allsubadmin.map((doc, index) => ({
    id: doc._id || index,
    ...doc,
  }));
  


  return (
    <div>
        <Doctorheader/>
        <Doctorsidebar/>
       
           <div className='create_subadmin'>
         <div className='profile-header'>
                 <h3>Enter Details for Create New Sub-Admin</h3>
                 <p>Add or update the required details for the sub-admin to keep records accurate and complete.</p>
                 </div>
       
         {/* ================================add doctor================================================ */}
       
         <div className='subadminsection'>
                       <Box
                         sx={{
                           mt: { xs: 3, lg: 5 },
                           display: 'flex',
                           justifyContent: 'center',
                           alignItems: 'flex-start',
                           width: '100%',
                         }}
                       >
                         <Grid  container spacing={4} sx={{ maxWidth: 1150, width: '100%' }} >
                           {/* ===== Left: FORM ===== */}
                          <Box
                       component="form"
                       onSubmit={handleSubmit}
                       autoComplete="off"
                       sx={{
                         background: '#fff',
                         borderRadius: 3,
                         boxShadow: 1,
                         minWidth:430,
                         maxWidth: { xs: 630, lg: 900 },
                         p: { xs: 2, sm: 3, md: 5 },
                         mx: 'auto',
                         display: 'flex',
                         flexDirection: 'column',
                         gap: 2, // spacing between inputs
                       }}
                     >
         
       
         <TextField
           name="name"
           label="Name"
           value={subadmin.name}
           onChange={handleChange}
           fullWidth
           size="small"
         />

         <TextField
           name="phone_no"
           label="Phone Number"
           value={subadmin.phone_no}
           onChange={handleChange}
           fullWidth
           size="small"
         />
       
         <TextField
           name="designation"
           label="Designation"
           value={subadmin.designation}
           onChange={handleChange}
           fullWidth
           size="small"
         />

        <TextField
           name="email"
           label="Email Id"
           value={subadmin.email}
           onChange={handleChange}
           fullWidth
           size="small"
         />

           <TextField
           name="password"
           label="Password"
           value={subadmin.password}
           onChange={handleChange}
           fullWidth
           size="small"
            InputProps={{
            readOnly: true,
          }}
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
       
       
       {/* =========================== Right: subadmin table =================================== */}
                           
                           <Grid item xs={12} md={5} sx={{ mt: { xs: 3, md: 0 } } }>
                              <Box
                              className='rightsection'
                       component="form"
                       autoComplete="off"
                       sx={{
                         background: '#fff',
                         borderRadius: 3,
                        //  boxShadow: 3,
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
             
        
       
                                
                           
                         
                           </Grid>
                         </Grid>
                       </Box>

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

export default Createsubadmin
