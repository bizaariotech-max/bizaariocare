import React, { useState ,useRef, useEffect} from 'react';
import {
  Box, Grid, Button, Typography, Card, Avatar,
  TextField, FormControl, InputLabel, Select, MenuItem, RadioGroup,
  FormControlLabel, Radio, Fade,Chip,Menu,InputAdornment 
} from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";
// import PersonIcon from '@mui/icons-material/Person';
import { Checkbox, FormGroup } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import {  IconButton,  Tooltip } from '@mui/material';
import addmedicalboardicon from '../Admin/images/image 43.png'
import addhospitalpartnersicon from '../Admin/images/image 431.png'
// import selectimageicon from '../Admin/images/Young man face avater vector illustration design _ Premium Vector 1.png'
import api from '../../api'
import Swal from 'sweetalert2';
import UniqueLoader from '../loader';
import { DataGrid } from '@mui/x-data-grid';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { State, City } from "country-state-city";
import Doctorheader from './doctorheader';
import Doctorsidebar from './doctorsidebar';
import DeleteIcon from "@mui/icons-material/Delete";
import '../Doctor/stylingcss/createdigitalcmequestionbank.css'



export default function Createdititalcmequestionbank() {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);





const[questionbank,setquestionbank]=useState({digital_cme_id:"",question_id:"",question_type:"",question_text:"",
                                            valid_answer:[],answer_options:[],references:[],image_gallary:[],image_gallary_preview:[]})


   const [inputValuerefrence, setinputValuerefrence] = useState("");
 
   const handleChangerefrence = (e) => {
     setinputValuerefrence(e.target.value);
   };
 
   const handleKeyDownrefrence = (e) => {
     if (e.key === "Enter" && inputValuerefrence.trim() !== "") {
       e.preventDefault();
       if (!questionbank.references.includes(inputValuerefrence.trim())) {
         setquestionbank((prev) => ({
           ...prev,
           references: [...prev.references, inputValuerefrence.trim()],
         }));
       }
       setinputValuerefrence("");
     }
   };
 
   const handleDeleterefrence = (tagToDelete) => {
     setquestionbank((prev) => ({
       ...prev,
       references: prev.references.filter((ref) => ref !== tagToDelete),
     }));
   };


   const [inpurvalidanswerkeyword, setinpurvalidanswerkeyword] = useState("");
 
   const handlechangevalidanswerkeyword = (e) => {
     setinpurvalidanswerkeyword(e.target.value);
   };
 
   const handlekeydownvalidanswerkeyword = (e) => {
     if (e.key === "Enter" && inpurvalidanswerkeyword.trim() !== "") {
       e.preventDefault();
       if (!questionbank.valid_answer.includes(inpurvalidanswerkeyword.trim())) {
         setquestionbank((prev) => ({
           ...prev,
           valid_answer: [...prev.valid_answer, inpurvalidanswerkeyword.trim()],
         }));
       }
       setinpurvalidanswerkeyword("");
     }
   };
 
   const handleDeletevalidanswerkeyword = (tagToDelete) => {
     setquestionbank((prev) => ({
       ...prev,
       references: prev.references.filter((ref) => ref !== tagToDelete),
     }));
   };


 

     // Function to generate 6-char random password
  const generatequestionid = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let pass = "";
    for (let i = 0; i < 6; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pass;
  };

  // Auto-generate password on mount
  useEffect(() => {
    setquestionbank((prev) => ({ ...prev, question_id: generatequestionid() }));
  }, []);



  const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        if (files.length > 0) {
            const previewUrls = files.map((file) => URL.createObjectURL(file));

            setquestionbank((prev) => ({
            ...prev,
            image_gallary: [...(prev.image_gallary || []), ...files],
            image_gallary_preview: [...(prev.image_gallary_preview || []), ...previewUrls],
            }));
        }
        };


        const handleDeleteImage = (index) => {
      setquestionbank((prev) => ({
        ...prev,
        image_gallary_preview: prev.image_gallary_preview.filter((_, i) => i !== index),
        image_gallary: prev.image_gallary.filter((_, i) => i !== index),
      }));
    };


const handleChange = (e) => {
  const { name, value, checked, type } = e.target;

  setquestionbank((prev) => {
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

  const [newOption, setNewOption] = useState("");

  // Handle adding a new option
  const handleAddOption = () => {
    if (newOption.trim() !== "") {
      setquestionbank((prev) => ({
        ...prev,
        answer_options: [...prev.answer_options, newOption.trim()],
      }));
      setNewOption("");
    }
  };

   const handleToggleValidAnswer = (option) => {
    setquestionbank((prev) => {
      const isSelected = prev.valid_answer.includes(option);
      return {
        ...prev,
        valid_answer: isSelected
          ? prev.valid_answer.filter((ans) => ans !== option) // remove
          : [...prev.valid_answer, option], // add
      };
    });
  };

 
  const[alldigitalcme,setalldigitalcme]=useState([])
    const getalldigitalcme=async()=>
    {
      try {
        const resp=await api.get(`doctor/getcme`)
        setalldigitalcme(resp.data.cme)
        
      } catch (error) {
        console.log(error);
        
      }
    }
  
    useEffect(()=>
    {
      getalldigitalcme()
  
    },[])

  
//============================ post request of add question bank================================================

  const handleSubmit = async(e) => {
    e.preventDefault();
     setLoading(true);
    try {
      
      const resp=await api.post('/doctor/createdigitalcmequestionbank',questionbank,{headers: {
                                    "Content-Type": "multipart/form-data",
                                  }
                                }
      )
      if(resp.status===200)
      {
        Swal.fire({
          icon:"success",
          title:"Question Created",
          text:"Question Created Successfully...",
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


  // =============================get request of all question bank=========================================

  const[allquestion,setallquestion]=useState([])
  const getalldoctor=async()=>
  {
    try {
      const resp=await api.get('doctor/getdigitalcmequestionbank')
      setallquestion(resp.data.questionbank)
      
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>
  {
    getalldoctor()

  },[])

 

  //=================================== display table===============================================

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
        const resp=await api.delete(`doctor/deletequestion/${id}`)
         if(resp.status===200)
          {
            Swal.fire({
              icon:"success",
              title:"Question Deleted",
              text:"Question  Deleted Successfully...",
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
    { field: 'sno', headerName: 'S.No.', flex: 0.3,renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1},
    { field: 'question_id', headerName: 'Question Id', flex: 1 },
    { field: 'question_type', headerName: 'Question Type', flex: 1 },
   
    {
      field: 'references',
      headerName: 'References',
      flex: 1,
      renderCell: (params) => params.value?.join(', '),
    },
   
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

  const rows = allquestion.map((doc, index) => ({
    id: doc._id || index,
    ...doc,
  }));
  



  return (
    <>
      <Doctorheader />
      <Doctorsidebar />
     

      <div className="create-question-bank">
      
          {/* ============== FORM & PROFILE AREA ============== */}
        <div className='profile-header' style={{display:open?"block" : "none"}}>
          <h3>Enter Details for Question Bank</h3>
          <p>Add or update the required details for question bank to keep records accurate and complete.</p>
          </div>

  {/* ================================add doctor================================================ */}

  
          <Fade in={open} className='question-bank-section'>
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
  select
    name="digital_cme_id"
    label="Digital Cme Id"
    value={questionbank.digital_cme_id}
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
                    alldigitalcme.map((item)=>
                    (
                        <MenuItem key={item.digital_cme_id} value={item.digital_cme_id}>
                                    {item.digital_cme_id}
                        </MenuItem>
                    ))
                }

    </TextField>

  <TextField
    name="question_id"
    label="Question Id"
    value={questionbank.question_id}
    onChange={handleChange}
    fullWidth
    size="small"
  />

   <FormControl component="fieldset" sx={{ mt: 0 }}>
    <Typography sx={{ fontWeight: 500 }}>Question Type</Typography>
    <RadioGroup size="small"
      row
      name="question_type"
      value={questionbank.question_type}
      onChange={handleChange}
      sx={{ flexDirection: 'row', alignItems: 'flex-start', gap: 1 }}
    >
      <FormControlLabel value="Objective" control={<Radio />} label="Objective" />
      <FormControlLabel value="Subjective" control={<Radio />} label="Subjective" />
    </RadioGroup>
  </FormControl>

  <TextField
    name="question_text"
    label="Question Text"
    value={questionbank.question_text}
    onChange={handleChange}
    fullWidth
    size="small"
  />

{
    questionbank.question_type==="Subjective" &&
    (
        <>
         <TextField
        label="Valid Answer"
        value={inpurvalidanswerkeyword}
        onChange={handlechangevalidanswerkeyword}
        onKeyDown={handlekeydownvalidanswerkeyword}
        fullWidth
        size="small"
      />
      <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 1,maxWidth: "300px" }}>
        {questionbank.valid_answer.map((ref, index) => (
          <Chip
            key={index}
            label={ref}
            onDelete={() => handleDeletevalidanswerkeyword(ref)}
            color="primary"
            variant="outlined"
          />
        ))}
      </Box>
      </>
    )
}

{
     questionbank.question_type==="Objective" &&
     (
        <>
        {/* Add New Option */}
      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        <TextField
          label="Add Option"
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
          size="small"
          fullWidth
        />
        <Button variant="contained" onClick={handleAddOption}>
          Add
        </Button>
      </Box>
   

      {/* List of Options with Checkboxes */}
      {questionbank.answer_options.map((option, index) => (
        <FormControlLabel
          key={index}
          control={
            <Checkbox
              checked={questionbank.valid_answer.includes(option)}
              onChange={() => handleToggleValidAnswer(option)}
            />
          }
          label={option}
        />
      ))}
   </>
     )

}
 

     
    
 

    <TextField
        label="References"
        value={inputValuerefrence}
        onChange={handleChangerefrence}
        onKeyDown={handleKeyDownrefrence}
        fullWidth
        size="small"
      />
      <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 1,maxWidth: "300px" }}>
        {questionbank.references.map((ref, index) => (
          <Chip
            key={index}
            label={ref}
            onDelete={() => handleDeleterefrence(ref)}
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
            {Array.isArray(questionbank?.image_gallary_preview) &&
        questionbank.image_gallary_preview.length > 0 && (
          <div>
            {questionbank.image_gallary_preview.map((item, index) => (
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
                  // boxShadow: 3,
                  minWidth:510,
                  maxWidth: 510,
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
  pageSizeOptions={[]} // removes the rows per page selector
  initialState={{
    pagination: { paginationModel: { pageSize: 10, page: 0 } },
  }}
  disableSelectionOnClick
 
  slotProps={{
    pagination: {
      SelectProps: {
        MenuProps: {
          disableScrollLock: true, // Prevents body scroll lock
          disablePortal: true,
        },
      },
    },
  }}
/>




      </Box>
      
 

                         
                    
                  
                    </Grid>
                  </Grid>
                </Box>
              
            </Box>
          </Fade>


       

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
    </>
  );
}
