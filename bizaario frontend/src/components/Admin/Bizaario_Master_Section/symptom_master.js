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



function SymptomMaster() {

  const[loading,setloading]=useState(false)

     const [symtommaster, setsymtommaster] = useState({
    symptom_class_type: null,
    symptom: "",
    explanation:"",
 
  });



      const[allsymptom_master,setallsymptom_master]=useState([])
      const getall_symptom_master=async()=>
      {
        try {
          const resp=await api.post('api/v1/admin/LookupList/',{lookupcodes:"symptom_master"})
          console.log(resp);
          
          setallsymptom_master(resp.data.data)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        getall_symptom_master()
    
      },[])

      console.log(allsymptom_master);
      

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
     setsymtommaster({
      symptom_class_type:row.parent_lookup_id,
      symptom:row.lookup_value,
      explanation:row.other.explanation
    })
  }

  const onDeletehospital=()=>
  {
    alert("delete")
  }
  console.log(allsymptom_master);
  

     const columnsymptommaster = [
        { field: 'sno', headerName: 'S.No.', flex: 0.2,renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1},
        { field: 'parent_lookup_name', headerName: 'Symptom Class', flex: 0.5 }, 
        { field: 'lookup_value', headerName: 'Symptom', flex: 0.5 },
        { field: 'other', headerName: 'Explanation',flex:1,  renderCell: (params) => {
          return params.row?.other?.explanation || "";
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
    
      const rowssymptom = allsymptom_master?.map((doc, index) => ({
        id: doc._id || index,
        ...doc,
      }));





//========================================= get symtom class id ================================================

  const[symtop_class_id,setsymtop_class_id]=useState([])
      const get_stymptom_class_id=async()=>
      {
        try {
          const resp=await api.post('api/v1/admin/LookupList',{lookupcodes:"symptom_class_type"})
          setsymtop_class_id(resp.data.data)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        get_stymptom_class_id()
    
      },[])

   


    const handlechange = (e) => {
  const { name, value, checked, type } = e.target;

  setsymtommaster((prev) => {
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



     
        const add_symptom_master = async () => {
        try {
          setloading(true)
          const resp = await api.post("api/v1/admin/SaveLookup",
            {
              lookup_id:lookup_id,
              lookup_type:"symptom_master",
              lookup_value:symtommaster.symptom,
              parent_lookup_id:symtommaster.symptom_class_type,
              other:{explanation:symtommaster.explanation}
            }
          );
          console.log(resp);
          
      
          if (resp.data.response.response_code === "200") {
              Swal.fire({
                      icon:"success",
                      title:"Symptom Master Added",
                      text:"Symptom Master Addedd Successfully...",
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
                  <h3>Enter Details for Symptom Master</h3>
                  <p>Add or update the required details for the symptom master to keep records accurate and complete.</p>
                  </div>
        
        
           {/* Form */}
                   <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
      <div className="form-grid">
          
       <FormControl fullWidth size="small">
             <label className="form-label">SYMPTOM CLASS</label>
            <Select 
              name="symptom_class_type"
              value={symtommaster.symptom_class_type}
              onChange={handlechange}
             MenuProps={{
                    disablePortal: true,
                    disableScrollLock: true,
                    }}
                displayEmpty
                renderValue={(selected) => {
                  if (!selected) {
                    return <span style={{ color: "#9ca3af" }}>SYMPTOM CLASS</span>; // grey placeholder
                  }
                  return symtop_class_id.find((item) => item._id === selected)?.lookup_value;
                }}
            >

               <MenuItem disabled value="">
                  <em>SYMPTOM CLASS</em>
                </MenuItem>
             {
                symtop_class_id?.map((item)=>
                (
                    <MenuItem key={item._id} value={item._id}>{item.lookup_value}</MenuItem>
                ))
            }
            </Select>
          </FormControl> 


           <FormControl fullWidth size="small">
            <label className="form-label">Symptom </label>
            <TextField 
              name="symptom"
              defaultValue={symtommaster.symptom}
              onChange={handlechange}
              placeholder='Symptom'
            >
           
            </TextField>
          </FormControl> 


           <FormControl fullWidth size="small">
            <label className="form-label">EXPLANATION</label>
            <TextField 
              name="explanation"
              defaultValue={symtommaster.explanation}
              onChange={handlechange}
              placeholder='Explanation'
             
            >

            </TextField>
          </FormControl> 
        
         </div>

          <Button
           className='submit-button'
            onClick={add_symptom_master}
          >
            Submit
          </Button>
        </Paper>
        
        
      {/* Table */}
              <Paper elevation={3} sx={{ p: 2, borderRadius: 2,marginTop:4 }}>  
                                              
              <DataGrid
               className="custom-data-grid"
                rows={rowssymptom}
                columns={columnsymptommaster}
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

export default SymptomMaster
