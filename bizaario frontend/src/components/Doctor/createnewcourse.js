import React, { useEffect } from 'react'
import { useState,useRef } from 'react';
import Doctorheader from './doctorheader'
import Doctorsidebar from './doctorsidebar'
import {Box, Grid, Button, TextField,Menu,MenuItem,IconButton} from '@mui/material';
import api from '../../api'
import Swal from 'sweetalert2';
import '../Doctor/stylingcss/createnewcourse.css'
import UniqueLoader from '../loader';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';



function Createnewcourse() {

      const doctordetails = JSON.parse(localStorage.getItem("user"));
  
      

     const [loading, setLoading] = useState(false);

     
// =============================crete course code=============================================

       const [course,setcourse]=useState({user_id:"",course_id:"",course_title:"",description:"",
                                               course_image:[],course_image_preview:[]})


         const handleImageChange = (e) => {
            const files = Array.from(e.target.files);
            if (files.length > 0) {
                const file = files[0];
                const previewUrl = URL.createObjectURL(file);
                setcourse({
                ...course,
                course_image: file,
                course_image_preview: previewUrl,
                });
            }
            };


const handleChange = (e) => {
  const { name, value, checked, type } = e.target;

  setcourse((prev) => {
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

useEffect(() => {
  if (doctordetails) {
    setcourse(prev => ({ ...prev, user_id: doctordetails?.user?._id }));
  }
}, []);


   // Function to generate 6-char random courseid
 const generateCourseId = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 6; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
};


  // Auto-generate password on mount
  useEffect(() => {
    setcourse((prev) => ({ ...prev, course_id: generateCourseId() }));
  }, []);


      const handleSubmit = async(e) => {
        e.preventDefault();
         setLoading(true);
        try {
          
          const resp=await api.post('/doctor/createcourse',course,{headers: {
                                        "Content-Type": "multipart/form-data",
                                      }
                                    }
          )
          if(resp.status===200)
          {
            Swal.fire({
              icon:"success",
              title:"Course Created",
              text:"New Course Created Successfully...",
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


const[allcourse,setallcourse]=useState([])
  const getallcourse=async()=>
  {
    try {
      const resp=await api.get('doctor/getcourse')
      setallcourse(resp.data.course)
      
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>
  {
    getallcourse()

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
        const resp=await api.delete(`doctor/deletecourse/${id}`)
         if(resp.status===200)
          {
            Swal.fire({
              icon:"success",
              title:"Course Deleted",
              text:"Course Deleted Successfully...",
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
    { field: 'course_id', headerName: 'Course Id', flex: 1 },
    { field: 'course_title', headerName: 'Course Title', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 80,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <IconButton onClick={(event) => handleOpenMenu(event, params.row._id)}>
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
    },
  ];

  const rows = allcourse.map((doc, index) => ({
    id: doc._id || index,
    ...doc,
  }));
  


  return (
    <div>
        <Doctorheader/>
        <Doctorsidebar/>
       
           <div className='create_course'>
         <div className='profile-header'>
                 <h3>Enter Details for Create New Course</h3>
                 <p>Add or update the required details for the active course to keep records accurate and complete.</p>
                 </div>
       
         {/* ================================add doctor================================================ */}
       
         <div className='coursesection'>
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
           name="course_id"
           label="Course Id"
           value={course.course_id}
           onChange={handleChange}
           fullWidth
           size="small"
            InputProps={{
            readOnly: true,
          }}
           
         />
       
         <TextField
           name="course_title"
           label="Course Title"
           value={course.course_title}
           onChange={handleChange}
           fullWidth
           size="small"
         />
       
         <TextField
           name="description"
           label="Description"
           value={course.description}
           onChange={handleChange}
           fullWidth
           size="small"
         />

<label htmlFor="courseImage" style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
  Course Image/Poster
</label>

         <input
          id="courseImage"
        type="file"
        accept="image/*"
        name="image"
        onChange={handleImageChange}
        />
        {
            course.course_image_preview.length!==0 && (

            <img src={course.course_image_preview} style={{height:"100px",width:"100px"}} alt=''></img>

            )
        }
       
       
        
       
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
       
       
       {/* =========================== Right: doctor table =================================== */}
                           
                           <Grid item xs={12} md={5} sx={{ mt: { xs: 3, md: 0 } } }>
                              <Box
                              className='rightsection'
                       component="form"
                       autoComplete="off"
                       sx={{
                         background: '#fff',
                         borderRadius: 3,
                        //  boxShadow: 1,
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

export default Createnewcourse
