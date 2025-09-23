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
import Adminheader from './adminheader';
import Adminsidebar from './adminsidebar';
import '../Admin/admincss/adddoctor.css';
import addmedicalboardicon from '../Admin/images/image 43.png'
import addhospitalpartnersicon from '../Admin/images/image 431.png'
// import selectimageicon from '../Admin/images/Young man face avater vector illustration design _ Premium Vector 1.png'
import api from '../../api'
import Swal from 'sweetalert2';
import UniqueLoader from '../loader';
import { DataGrid } from '@mui/x-data-grid';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { State, City } from "country-state-city";





const initialForm = {
  profile_pic:[],
  profile_pic_preview:[],
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
  state: '',
  city: '',
  postal_code: '',
  dateOfBirth: '',
  email:'',
  gender: '',
  password: '',
  qualification:[],
  medical_specialty :'',
  hospital_association:[],
  clinic_name:'',
  clinic_address1:'',
  clinic_address2:'',
  clinic_state:'',
  clinic_city:'',
  clinic_postal_code:'',
  clinic_geo_location:'',
  subscription:[]
};

export default function AdminAddDoctorHospital() {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const[customhospitalassociation,setcustomhospitalassociation]=useState("")
  const [showPassword, setShowPassword] = useState(false);


     const inputRef = useRef();


 const handlecustomhospitalassociationchange = (e) => {
  setcustomhospitalassociation(e.target.value);
};

// When user confirms
const saveCustomHospitalAssociation = () => {
  if (customhospitalassociation.trim() !== "") {
    setForm((prev) => ({
      ...prev,
      hospital_association: [customhospitalassociation],
    }));
  }
};


 

     // Function to generate 6-char random password
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
    setForm((prev) => ({ ...prev, password: generatePassword() }));
  }, []);


    const states = State.getStatesOfCountry("IN");
  const cities = form.state ? City.getCitiesOfState("IN", form.state) : [];
   const cities1 = form.clinic_state ? City.getCitiesOfState("IN", form.clinic_state) : [];



 const handleImageChange = (e) => {
  const files = Array.from(e.target.files);
  if (files.length > 0) {
    const file = files[0];
    const previewUrl = URL.createObjectURL(file);
    setForm({
      ...form,
      profile_pic: file,
      profile_pic_preview: previewUrl,
    });
  }
};


const handleChange = (e) => {
  const { name, value, checked, type } = e.target;

  setForm((prev) => {
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


//============================ post request of add doctor================================================

  const handleSubmit = async(e) => {
    e.preventDefault();
     setLoading(true);
    try {
      
      const resp=await api.post('/doctor/adddoctor',form,{headers: {
                                    "Content-Type": "multipart/form-data",
                                  }
                                }
      )
      if(resp.status===200)
      {
        Swal.fire({
          icon:"success",
          title:"Profile Created",
          text:"Doctor Profile Created Successfully...",
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


  // =============================get request of all doctor=========================================

  const[alldoctor,setalldoctor]=useState([])
  const getalldoctor=async()=>
  {
    try {
      const resp=await api.get('doctor/getalldoctor')
      setalldoctor(resp.data.doctor)
      
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

  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const onEdit=()=>
  {
    alert("edit")
  }

  const onDelete=()=>
  {
    alert("delete")
  }

  const columns = [
    { field: 'sno', headerName: 'S.No.', flex: 0.3,renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1},
    { field: 'fullname', headerName: 'Name', flex: 1, renderCell: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}` },
    { field: 'medical_specialty', headerName: 'Specialty', flex: 1 },
   
    {
      field: 'qualification',
      headerName: 'Qualification',
      flex: 1,
      renderCell: (params) => params.value?.join(', '),
    },
   
    {
      field: 'actions',
      headerName: 'Actions',
      width: 80,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <IconButton onClick={handleOpenMenu}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
           
            disableScrollLock 
     
      
          >
            <MenuItem onClick={() => { onEdit(params.row._id); handleCloseMenu(); }}>
              Edit
            </MenuItem>
            <MenuItem onClick={() => { onDelete(params.row._id); handleCloseMenu(); }}>
              Delete
            </MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  const rows = alldoctor.map((doc, index) => ({
    id: doc._id || index,
    ...doc,
  }));
  




  // ===============================add hospital======================================================

  const [hospital,sethospital]=useState({hospital_name:"",hospital_type:"",address1:"",address2:"",
                                          city:"",state:"",postal_code:"",geo_location:""})


        
    const hstates = State.getStatesOfCountry("IN");
  const hcities = hospital.state ? City.getCitiesOfState("IN", hospital.state) : [];
                  
  const handleChange1 = (e) => {
  const { name, value, checked, type } = e.target;

  sethospital((prev) => {
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


//============================ post request of add hospital================================================

  const hospitalhandleSubmit = async(e) => {
    e.preventDefault();
     setLoading(true);
    try {
      
      const resp=await api.post('/hospital/addhospital',hospital)
      if(resp.status===200)
      {
        Swal.fire({
          icon:"success",
          title:"Hosptial Added",
          text:"Hospital Partner Added Successfully...",
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


  // =============================get request of all hospital=========================================

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

 

  //=================================== display table===============================================

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
    { field: 'hospital_name', headerName: 'Hospital Name', flex: 1 },
    { field: 'hospital_type', headerName: 'Type', flex: 1 },
    { field: 'address1', headerName: 'Address', flex: 1 },
   
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
    <>
      <Adminheader />
      <Adminsidebar />
     

      <div className="adddoctor">
        <Box
          sx={{
            minHeight: '100vh',
            background: '#f7f8fa',
            width: '100%',
            pt: { xs: 3, md: 5 },
            pb: 4,
            px: { xs: 1, sm: 2 },
          }}
        >
          {/* ============== TOP CARDS ============== */}
          <Grid container spacing={3} justifyContent="flex-start">
            <Grid item xs={12} sm={'auto'}>
              <Card
                onClick={() => {
                  setOpen(true)
                  setOpen1(false)
                }}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  px: 3,
                  py: 1.5,
                  marginLeft:"16px",
                  cursor: 'pointer',borderRadius:"20px",
                  boxShadow: open ? 4 : 1,
                  border: open ? '2px solid #4d7bf3' : '2px solid #e3eafc',
                  // '&:hover': { boxShadow: 6, border: '2px solid #4d7bf3' },
                  mb: { xs: 2, sm: 0 },
                }}
                elevation={0}
              >
                <img className='cardicons' src={addmedicalboardicon} style={{borderRadius:"50%",border:"3px solid #DD4343"}} alt=''></img>
                {/* <AddCircleOutlineIcon sx={{ fontSize: 42, color: '#4d7bf3', mr: 2 }} /> */}
                <Box>
                    
                  <Typography sx={{ color: '#4d7bf3', fontWeight: 700, fontSize: 18,marginLeft:"5px" }}>
                    Add Medical Board
                  </Typography>
                </Box>
              </Card>
            </Grid>

              <Grid item xs={12} sm={'auto'}>
              <Card
                  onClick={() => {
                  setOpen(false)
                  setOpen1(true)
                }}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  px: 3,
                  py: 1.5,
                  cursor: 'pointer',
                  borderRadius:"20px",
                  boxShadow: open ? 4 : 1,
                  border: open1 ? '2px solid #4d7bf3' : '2px solid #e3eafc',
                  // '&:hover': { boxShadow: 6, border: '2px solid #4d7bf3' },
                  mb: { xs: 2, sm: 0 },
                }}
                elevation={0}
              >
                 <img className='cardicons' src={addhospitalpartnersicon} style={{borderRadius:"50%",border:"3px solid #DD4343"}} alt=''></img>
                {/* <AddCircleOutlineIcon sx={{ fontSize: 42, color: '#4d7bf3', mr: 2 }} /> */}
                <Box>
                  <Typography sx={{ color: '#4d7bf3', fontWeight: 700, fontSize: 18,marginLeft:"5px" }}>
                    Add Hospitals Partners
                  </Typography>
                </Box>
              </Card>
            </Grid>
          </Grid>

          {/* ============== FORM & PROFILE AREA ============== */}
        <div className='profile-header' style={{display:open?"block" : "none"}}>
          <h3>Enter Details for Active Doctor Profile</h3>
          <p>Add or update the required details for the active doctor profile to keep records accurate and complete.</p>
          </div>

  {/* ================================add doctor================================================ */}

  
          <Fade in={open} className='doctorform'>
            <Box>
              {open && (
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
  

     <Box  sx={{ position: 'relative', display: 'inline-block', minWidth: 100,height: 100,marginLeft:"40%" }}>
      <Avatar
        src={form.profile_pic_preview}
        sx={{
          width: 100,
          height: 100,
          border: '3px solid #fff',
          boxShadow: 2,
        }}
      />

      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />

      <Tooltip title="Edit profile picture">
        <IconButton
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 120,
            bgcolor: '#fff',
            border: '1px solid #ccc',
            width: 30,
            height: 30,
            '&:hover': {
              bgcolor: '#f0f0f0',
            },
          }}
          onClick={() => inputRef.current.click()}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>

 

  <TextField
    name="firstName"
    label="First Name"
    value={form.firstName}
    onChange={handleChange}
    fullWidth
    size="small"
  />

  <TextField
    name="lastName"
    label="Last Name"
    value={form.lastName}
    onChange={handleChange}
    fullWidth
    size="small"
  />

  <TextField
    name="address1"
    label="Address1"
    value={form.address1}
    onChange={handleChange}
    fullWidth
    size="small"
  />

  <TextField
    name="address2"
    label="Address 2"
    value={form.address2}
    onChange={handleChange}
    fullWidth
    size="small"
  />

  <TextField
        select
        name="state"
        label="State"
        value={form.state}
        onChange={(e) => {
          handleChange(e);
          setForm((prev) => ({ ...prev, city: "" })); // reset city when state changes
        }}
       fullWidth={false}
        size="small"
        sx={{ width: 360 }}
        SelectProps={{
        MenuProps: {
          disablePortal: true,
          disableScrollLock: true,
        },
      }}

      >
        {states.map((s) => (
          <MenuItem key={s.isoCode} value={s.isoCode}>
            {s.name}
          </MenuItem>
        ))}
      </TextField>

   <TextField
        select
        name="city"
        label="City"
        value={form.city}
        onChange={handleChange}
        fullWidth
        size="small"
        disabled={!form.state}
        SelectProps={{
        MenuProps: {
          disablePortal: true,
          disableScrollLock: true,
        },
      }}

      >
        {cities.map((c) => (
          <MenuItem key={c.name} value={c.name}>
            {c.name}
          </MenuItem>
        ))}
      </TextField>

  <TextField
    name="postal_code"
    label="Postal Code"
    value={form.postal_code}
    onChange={handleChange}
    fullWidth
    size="small"
  />

  <TextField
    name="dateOfBirth"
    label="Date of Birth"
    type="date"
    InputLabelProps={{ shrink: true }}
    value={form.dateOfBirth}
    onChange={handleChange}
    fullWidth
    size="small"
  />

    <TextField
    name="email"
    label="Email"
    value={form.email}
    onChange={handleChange}
    fullWidth
    size="small"
  />

  <FormControl component="fieldset" sx={{ mt: 0 }}>
    <Typography sx={{ fontWeight: 500 }}>Gender</Typography>
    <RadioGroup size="small"
      row
      name="gender"
      value={form.gender}
      onChange={handleChange}
      sx={{ flexDirection: 'row', alignItems: 'flex-start', gap: 1 }}
    >
      <FormControlLabel value="Male" control={<Radio />} label="Male" />
      <FormControlLabel value="Female" control={<Radio />} label="Female" />
      <FormControlLabel value="Other" control={<Radio />} label="Others" />
    </RadioGroup>
  </FormControl>

  



  <TextField
      type={showPassword ? "text" : "password"}
      name="password"
      label="Password"
      value={form.password}
      onChange={handleChange}
      fullWidth
      size="small"
      InputProps={{
         readOnly: true,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />

  <FormControl fullWidth size="small">
    <InputLabel>Qualification</InputLabel>
    <Select 
    multiple
      name="qualification"
      label="Qualification"
      value={form.qualification}
      onChange={handleChange}
       MenuProps={{
      disablePortal: true,
      disableScrollLock: true,
    }}
       renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
      
    >
      <MenuItem value="MBBS">MBBS</MenuItem>
      <MenuItem value="BDS">BDS</MenuItem>
      <MenuItem value="BAMS">BAMS</MenuItem>
      <MenuItem value="BHMS">BHMS</MenuItem>
    </Select>
  </FormControl>

  <FormControl fullWidth size="small">
    <InputLabel>Medical Specialty</InputLabel>
    <Select 
      name="medical_specialty"
      label="Medical Specialty"
      value={form.medical_specialty}
      onChange={handleChange}
       MenuProps={{
      disablePortal: true,
      disableScrollLock: true,
    }}
      
    >
      <MenuItem value="General Medicine">General Medicine</MenuItem>
      <MenuItem value="General Surgery">General Surgery</MenuItem>
      <MenuItem value="Pediatrics">Pediatrics</MenuItem>
      <MenuItem value="Gynecology & Obstetrics">Gynecology & Obstetrics</MenuItem>
    </Select>
  </FormControl>

   <FormControl fullWidth size="small">
    <InputLabel>Hospital Association  </InputLabel>
    <Select 
      multiple
      name="hospital_association"
      label="Hospital Association"
      value={form.hospital_association}
       MenuProps={{
      disablePortal: true,
      disableScrollLock: true,
    }}

      onChange={handleChange}
       renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
    >
      <MenuItem value="India">India</MenuItem>
      <MenuItem value="Usa">USA</MenuItem>
      <MenuItem value="United Kingdom">UK</MenuItem>
      <MenuItem value="Not In List">Not In List</MenuItem>
    </Select>

    {form.hospital_association.includes("Not In List") && (
        <TextField
          fullWidth
          size="small"
          label="Enter your Hospital Association"
          value={customhospitalassociation}
          onChange={handlecustomhospitalassociationchange}
          onBlur={saveCustomHospitalAssociation}
          sx={{ mt: 2 }}
        />
      )}

  </FormControl>


<TextField
    type="text"
    name="clinic_name"
    label="Clinic Name"
    value={form.clinic_name}
    onChange={handleChange}
    fullWidth
    size="small"
  />

   <TextField
    name="clinic_address1"
    label="Address1"
    value={form.clinic_address1}
    onChange={handleChange}
    fullWidth
    size="small"
  />

  <TextField
    name="clinic_address2"
    label="Address 2"
    value={form.clinic_address2}
    onChange={handleChange}
    fullWidth
    size="small"
  />


    <TextField
        select
        name="clinic_state"
        label="State"
        value={form.clinic_state}
        onChange={(e) => {
          handleChange(e);
          setForm((prev) => ({ ...prev, clinic_city: "" })); // reset city when state changes
        }}
        fullWidth={false}
        size="small"
        sx={{ width: 360 }}
         SelectProps={{
        MenuProps: {
          disablePortal: true,
          disableScrollLock: true,
        },
      }}
      >
        {states.map((s) => (
          <MenuItem key={s.isoCode} value={s.isoCode}>
            {s.name}
          </MenuItem>
        ))}
      </TextField>

   <TextField
        select
        name="clinic_city"
        label="City"
        value={form.clinic_city}
        onChange={handleChange}
        fullWidth
        size="small"
        disabled={!form.clinic_state}
         SelectProps={{
        MenuProps: {
          disablePortal: true,
          disableScrollLock: true,
        },
      }}
      >
        {cities1.map((c) => (
          <MenuItem key={c.name} value={c.name}>
            {c.name}
          </MenuItem>
        ))}
      </TextField>


  <TextField
    name="clinic_postal_code"
    label="Postal Code"
    value={form.clinic_postal_code}
    onChange={handleChange}
    fullWidth
    size="small"
  />
 
  <TextField
    name="clinic_geo_location"
    label="Geo Location"
    value={form.clinic_geo_location}
    onChange={handleChange}
    fullWidth
    size="small"
  />

 <FormControl component="fieldset">
  <Typography sx={{ fontWeight: 500 }}>Subscription</Typography>
  <FormGroup row>
    <FormControlLabel
      control={
        <Checkbox size="small"
          checked={form.subscription.includes('Digital CME')}
          onChange={handleChange}
          name="subscription"
          value="Digital CME"
        />
      }
      label="Digital CME"
    />
    <FormControlLabel
      control={
        <Checkbox size="small"
          checked={form.subscription.includes('Innovative Cases')}
          onChange={handleChange}
          name="subscription"
          value="Innovative Cases"
        />
      }
      label="Innovative Cases"
    />
  </FormGroup>
</FormControl>


  

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
              )}
            </Box>
          </Fade>

{/* ============================add hospital partners============================================ */}

 <div className='profile-header' style={{display:open1?"block" : "none"}}>
          <h3>Enter Details for Hospital Partner</h3>
          <p>Add or update the required details for the active hospital profile to keep records accurate and complete.</p>
          </div>


  <Fade in={open1} className='doctorform'>
            <Box>
              {open1 && (
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
                onSubmit={hospitalhandleSubmit}
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
    name="hospital_name"
    label="Hospital Name"
    value={hospital.hospital_name}
    onChange={handleChange1}
    fullWidth
    size="small"
  />

  <FormControl fullWidth size="small">
    <InputLabel>Hospital Type</InputLabel>
    <Select 
      name="hospital_type"
      label="Hospital Type"
      value={hospital.hospital_type}
      MenuProps={{
        disablePortal: true,
        disableScrollLock: true,
      }}
      onChange={handleChange1}
    >
      <MenuItem value="India">India</MenuItem>
      <MenuItem value="Usa">USA</MenuItem>
      <MenuItem value="United Kingdom">UK</MenuItem>
    </Select>
  </FormControl>



  <TextField
    name="address1"
    label="Address1"
    value={hospital.address1}
    onChange={handleChange1}
    fullWidth
    size="small"
  />

  <TextField
    name="address2"
    label="Address 2"
    value={hospital.address2}
    onChange={handleChange1}
    fullWidth
    size="small"
  />

  <TextField
        select
        name="state"
        label="State"
        value={hospital.state}
        SelectProps={{
        MenuProps: {
          disablePortal: true,
          disableScrollLock: true,
        },
      }}

        onChange={(e) => {
          handleChange1(e);
          sethospital((prev) => ({ ...prev, city: "" })); // reset city when state changes
        }}
        fullWidth={false}
        size="small"
        sx={{ width: 360 }}
      >
        {hstates.map((s) => (
          <MenuItem key={s.isoCode} value={s.isoCode}>
            {s.name}
          </MenuItem>
        ))}
      </TextField>

   <TextField
        select
        name="city"
        label="City"
        value={hospital.city}
        onChange={handleChange1}
        fullWidth
        size="small"
        disabled={!hospital.state}
        SelectProps={{
        MenuProps: {
          disablePortal: true,
          disableScrollLock: true,
        },
      }}

      >
        {hcities.map((c) => (
          <MenuItem key={c.name} value={c.name}>
            {c.name}
          </MenuItem>
        ))}
      </TextField>

  <TextField
    name="postal_code"
    label="Postal Code"
    value={hospital.postal_code}
    onChange={handleChange1}
    fullWidth
    size="small"
  />

  <TextField
    name="geo_location"
    label="Geo Location"
    value={hospital.geo_location}
    onChange={handleChange1}
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
              )}
            </Box>
          </Fade>

        </Box>

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
