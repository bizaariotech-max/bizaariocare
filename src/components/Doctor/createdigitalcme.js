import React, { useEffect } from 'react'
import { useState,useRef } from 'react';
import Doctorheader from './doctorheader'
import Doctorsidebar from './doctorsidebar'
import {Box, Grid, Button, TextField,Menu,MenuItem,IconButton,FormControl,Typography,FormGroup,
        FormControlLabel,Checkbox, Chip,} from '@mui/material';
import api from '../../api'
import Swal from 'sweetalert2';
import '../Doctor/stylingcss/createdigitalcme.css'
import UniqueLoader from '../loader';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';


function Createdigitalcme() {

      const doctordetails = JSON.parse(localStorage.getItem("user"));
  
      

     const [loading, setLoading] = useState(false);

     
// =============================crete course code=============================================

       const [cme,setcme]=useState({digital_cme_id:"",user_id:"",course_id:"",cme_title:"",
                                        short_description:"",long_description:"",video_url:"",
                                        meta_tags:[],image_gallary:[],image_gallary_preview:[],
                                        references:[],target_audience:[],
                                        target_geography:"",publish_date:"",valid_up_to:"",comments:""
                                        })


                                        const generatedigitalcmeid = () => {
                                        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                                        let id = "";
                                        for (let i = 0; i < 6; i++) {
                                          id += chars.charAt(Math.floor(Math.random() * chars.length));
                                        }
                                        return id;
                                      };

                                      useEffect(() => {
                                    setcme((prev) => ({
                                      ...prev,
                                      digital_cme_id: generatedigitalcmeid(),
                                    }));
                                  }, []);



        const [inputValuemetatags, setInputValuemetatags] = useState("");

  const handleChangemetataginput = (e) => {
    setInputValuemetatags(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValuemetatags.trim() !== "") {
      e.preventDefault();
      if (!cme.meta_tags.includes(inputValuemetatags.trim())) {
        setcme((prev) => ({
          ...prev,
          meta_tags: [...prev.meta_tags, inputValuemetatags.trim()],
        }));
      }
      setInputValuemetatags("");
    }
  };

  const handleDelete = (tagToDelete) => {
    setcme((prev) => ({
      ...prev,
      meta_tags: prev.meta_tags.filter((tag) => tag !== tagToDelete),
    }));
  };


   const [inputValuerefrence, setinputValuerefrence] = useState("");

  const handleChangerefrence = (e) => {
    setinputValuerefrence(e.target.value);
  };

  const handleKeyDownrefrence = (e) => {
    if (e.key === "Enter" && inputValuerefrence.trim() !== "") {
      e.preventDefault();
      if (!cme.references.includes(inputValuerefrence.trim())) {
        setcme((prev) => ({
          ...prev,
          references: [...prev.references, inputValuerefrence.trim()],
        }));
      }
      setinputValuerefrence("");
    }
  };

  const handleDeleterefrence = (tagToDelete) => {
    setcme((prev) => ({
      ...prev,
      references: prev.references.filter((ref) => ref !== tagToDelete),
    }));
  };



        const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        if (files.length > 0) {
            const previewUrls = files.map((file) => URL.createObjectURL(file));

            setcme((prev) => ({
            ...prev,
            image_gallary: [...(prev.image_gallary || []), ...files],
            image_gallary_preview: [...(prev.image_gallary_preview || []), ...previewUrls],
            }));
        }
        };


        const handleDeleteImage = (index) => {
      setcme((prev) => ({
        ...prev,
        image_gallary_preview: prev.image_gallary_preview.filter((_, i) => i !== index),
        image_gallary: prev.image_gallary.filter((_, i) => i !== index),
      }));
    };



const handleChange = (e) => {
  const { name, value, checked, type } = e.target;

  setcme((prev) => {
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
    setcme(prev => ({ ...prev, user_id: doctordetails?.user?._id }));
  }
}, []);


//============================ get course by id for course id field==================================

const[course,setcourse]=useState([])
  const getallcoursebyuserid=async()=>
  {
    try {
      const resp=await api.get(`doctor/getcoursebyuserid/${doctordetails.user._id}`)
      setcourse(resp.data.course)
      
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>
  {
    getallcoursebyuserid()

  },[])


      const handleSubmit = async(e) => {
        e.preventDefault();
         setLoading(true);
        try {
          
          const resp=await api.post('/doctor/createdigitalcme',cme,{headers: {
                                        "Content-Type": "multipart/form-data",
                                      }
                                    }
          )
          if(resp.status===200)
          {
            Swal.fire({
              icon:"success",
              title:"Cme Created",
              text:"New Digital Cme Created Successfully...",
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


const[allcme,setallcme]=useState([])
  const getallcme=async()=>
  {
    try {
      const resp=await api.get('doctor/getcme')
      setallcme(resp.data.cme)
      
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>
  {
     getallcme()

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
        const resp=await api.delete(`doctor/deletecme/${id}`)
         if(resp.status===200)
          {
            Swal.fire({
              icon:"success",
              title:"Cme Deleted",
              text:"Cme Deleted Successfully...",
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
    { field: 'digital_cme_id', headerName: 'CME Id', flex: 1 },
    { field: 'cme_title', headerName: 'Cme Title', flex: 1 },
     { field: 'target_audience', headerName: 'Target Audience', flex: 1,renderCell: (params) => params.value?.join(', '), },
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

  const rows = allcme.map((doc, index) => ({
    id: doc._id || index,
    ...doc,
  }));
  


  return (
    <div>
        <Doctorheader/>
        <Doctorsidebar/>
       
           <div className='create_digitalcme'>
         <div className='profile-header'>
                 <h3>Enter Details for Create New Digital CME</h3>
                 <p>Add or update the required details for the active digital cme to keep records accurate and complete.</p>
                 </div>
       
         {/* ================================add doctor================================================ */}
       
         <div className='digitalcmesection'>
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
           name="digital_cme_id"
           label="Digital CME Id"
           value={cme.digital_cme_id}
           onChange={handleChange}
           fullWidth
           size="small"
            InputProps={{
            readOnly: true,
          }}
        
         />

       
         <TextField
         select
           name="course_id"
           label="Course Id"
           value={cme.course_id}
           onChange={handleChange}
           fullWidth
           size="small"
            SelectProps={{
            MenuProps: {
              disablePortal: true,
              disableScrollLock: true,
            },
          }}
         >
            {
                course.map((item)=>
                (
                    <MenuItem key={item.course_id} value={item.course_id}>
                                {item.course_id}
                    </MenuItem>
                ))
            }
        </TextField>
       
         <TextField
           name="cme_title"
           label="CME Title"
           value={cme.cme_title}
           onChange={handleChange}
           fullWidth
           size="small"
         />
       
         <TextField
           name="short_description"
           label="Short Description"
           value={cme.short_description}
           onChange={handleChange}
           fullWidth
           size="small"
         />

         <TextField
            name="long_description"
            label="Long Description"
            value={cme.long_description}
            onChange={handleChange}
            fullWidth
            size="small"
            multiline
            rows={5} // number of visible lines
            variant="outlined"
            />


             <TextField
           name="video_url"
           label="Video Url"
           value={cme.video_url}
           onChange={handleChange}
           fullWidth
           size="small"
         />

         <TextField
        label="Meta Tags"
        value={inputValuemetatags}
        onChange={handleChangemetataginput}
        onKeyDown={handleKeyDown}
        fullWidth
        size="small"
      />
      <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 1,maxWidth: "300px" }}>
        {cme.meta_tags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            onDelete={() => handleDelete(tag)}
            color="primary"
            variant="outlined"
          />
        ))}
      </Box>

      <label htmlFor="imagegalarry" style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
        Image Gallary
      </label>
         <input
         id='imagegalarry'
         multiple
        type="file"
        accept="image/*"
        name="image_gallary"
        onChange={handleImageChange}
        />
      {Array.isArray(cme?.image_gallary_preview) &&
  cme.image_gallary_preview.length > 0 && (
    <div>
      {cme.image_gallary_preview.map((item, index) => (
        <div
          key={index}
          style={{
            position: "relative",
            // display: "inline-block",
          }}
        >
          <img
            src={item}
            alt=""
            style={{ height: "100px", width: "100px", borderRadius: "4px", objectFit: "cover",marginTop:"2px" }}
          />
          <IconButton
            size="small"
            onClick={() => handleDeleteImage(index)}
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              backgroundColor: "rgba(255,255,255,0.7)",
              "&:hover": { backgroundColor: "rgba(255,255,255,1)" }
            }}
          >
            <DeleteIcon fontSize="small" color="error" />
          </IconButton>
        </div>
      ))}
    </div>
  )}
       
     
             <TextField
        label="References"
        value={inputValuerefrence}
        onChange={handleChangerefrence}
        onKeyDown={handleKeyDownrefrence}
        fullWidth
        size="small"
      />
      <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 1,maxWidth: "300px" }}>
        {cme.references.map((ref, index) => (
          <Chip
            key={index}
            label={ref}
            onDelete={() => handleDeleterefrence(ref)}
            color="primary"
            variant="outlined"
          />
        ))}
      </Box>

         <FormControl component="fieldset">
           <Typography sx={{ fontWeight: 500 }}>Target Audience</Typography>
           <FormGroup row>
             <FormControlLabel
               control={
                 <Checkbox size="small"
                   checked={cme.target_audience.includes('Doctor')}
                   onChange={handleChange}
                   name="target_audience"
                   value="Doctor"
                 />
               }
               label="Doctor"
             />
             <FormControlLabel
               control={
                 <Checkbox size="small"
                   checked={cme.target_audience.includes('Patient')}
                   onChange={handleChange}
                   name="target_audience"
                   value="Patient"
                 />
               }
               label="Patient"
             />
           </FormGroup>
         </FormControl>
       
         
        <TextField
        select
           name="target_geography"
           label="Target Geography"
           value={cme.target_geography}
           onChange={handleChange}
           fullWidth
           size="small"
            SelectProps={{
            MenuProps: {
              disablePortal: true,
              disableScrollLock: true,
            },
          }}
         >
             {
                course.map((item)=>
                (
                    <MenuItem key={item.course_id} value={item.course_id}>
                                {item.course_id}
                    </MenuItem>
                ))
            }

            </TextField>

          <TextField
          type='date'
           name="publish_date"
           label="Publish Date"
           value={cme.publish_date}
           onChange={handleChange}
           fullWidth
           size="small"
            InputLabelProps={{ shrink: true }}
         />

          <TextField
            type="datetime-local"
           name="valid_up_to"
           label="Valid Up To"
           value={cme.valid_up_to}
           onChange={handleChange}
           fullWidth
           size="small"
           InputLabelProps={{ shrink: true }}
         />

           <TextField
           name="comments"
           label="Comments"
           value={cme.comments}
           onChange={handleChange}
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
       
       
       {/* =========================== Right: doctor table =================================== */}
                           
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

export default Createdigitalcme
