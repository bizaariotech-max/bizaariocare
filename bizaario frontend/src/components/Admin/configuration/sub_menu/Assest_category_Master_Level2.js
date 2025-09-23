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


function AddAssetCategoryMasterLevel2() {


      const[allassest_category,setallassest_category]=useState([])
      const getallassest_category=async()=>
      {
        try {
          const resp=await api.post('api/v1/admin/LookupList',{lookupcodes:"asset_category_level_2"})
          setallassest_category(resp.data.data)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        getallassest_category()
    
      },[])

      console.log(allassest_category);

      const[allassest_categorylevel1,setallassest_categorylevel1]=useState([])
      const getallassest_categorylevel1=async()=>
      {
        try {
          const resp=await api.post('api/v1/admin/LookupList',{lookupcodes:"asset_category_level_1"})
          setallassest_categorylevel1(resp.data.data)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        getallassest_categorylevel1()
    
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
        // { field: 'lookup_type', headerName: 'Asset Category Type', flex: 1 },
        
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
        const[parent_lookup_id,setparent_lookup_id]=useState("")
       
        
                              const add_assest_category = async () => {
                                try {
                                  const resp = await api.post("api/v1/admin/SaveLookup", {
                                    lookup_type: "asset_category_level_2",
                                    parent_lookup_id: parent_lookup_id ? parent_lookup_id:null ,
                                    lookup_value:assest_category         
                                  });
                              
                                  if (resp.data.response.response_code === "200") {
                                      Swal.fire({
                                              icon:"success",
                                              title:"Assest Category Added",
                                              text:"Assest Category Level 2 Addedd Successfully...",
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
                  <h3>Enter Details for Asset Category Master Level 2</h3>
                  <p>Add or update the required details for the asset category master level 2 to keep records accurate and complete.</p>
                  </div>
        
        
          {/* Form */}
                      <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
                      <div className="form-grid">
          
 
     <FormControl fullWidth size="small">
             <label className="form-label">Parent Asset Category Id</label>
            <Select 
              name="hospital_type"
              label="Parent Asset Category"
              value={parent_lookup_id}
              onChange={(e)=>setparent_lookup_id(e.target.value)}
              displayEmpty
                renderValue={(selected) => {
                  if (!selected) {
                    return <span style={{ color: "#9ca3af" }}>Parent Asset Category Id</span>; // grey placeholder
                  }
                  return allassest_categorylevel1.find((item) => item._id === selected)?.lookup_value;
                }}

            >
                {/* Placeholder option (disabled so it can't be re-selected) */}
                <MenuItem disabled value="">
                  <em>Parent Asset Category</em>
                </MenuItem>
            {
              allassest_categorylevel1?.map((item)=>
              (
                <MenuItem value={item._id}>{item.lookup_value}</MenuItem>
              ))
            }
            </Select>
          </FormControl>  
        
          <FormControl fullWidth size="small">
            <label className="form-label">Asset Category Level 2</label>
          <TextField
            name=""
            placeholder="Asset Category Level 2"
            value={assest_category}
            onChange={(e)=>setassest_category(e.target.value)}
            fullWidth
            size="small"
          />
          </FormControl>
        
        </div>
         
          <Button
          className='submit-button'
            onClick={add_assest_category}
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

export default AddAssetCategoryMasterLevel2
