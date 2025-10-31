import React, { useState ,useRef, useEffect} from 'react';
import {
  Box, Grid, Button, Typography, Card, Avatar,
  TextField, FormControl, InputLabel, Select, MenuItem, Paper,
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
// import '../Admin/admincss/add_asset_master.css'
import { customMenuProps } from '../../utils/mui_select_scroll_bar';


function Addassestsmaster() {

     const [assetmaster, setassetmaster] = useState({
    AssetCategoryLevel1: null,
    AssetCategoryLevel2: null,
    AssetCategoryLevel3: null,
    StationId: null,
    ParentAssetId: null,
    AssetName: "",
    SubscriptionType: null,
  });



      const[allasset_master_list,setallasset_master_list]=useState([])
      const getall_assest_master=async()=>
      {
        try {
          const resp=await api.post('api/v1/admin/AssetList')
          console.log(resp);
          
          setallasset_master_list(resp.data.data.list)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        getall_assest_master()
    
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
        { field: 'AssetName', headerName: 'Asset Name', flex: 1 },
        { field: 'StationId', headerName: 'Station Name', flex: 1 , renderCell: (params) => {
          return params.row?.StationId?.StationName || "";
        } },
       
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
    
      const rowshospital = allasset_master_list?.map((doc, index) => ({
        id: doc._id || index,
        ...doc,
      }));

// =================================get org list==============================================

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




//========================================= get asset level 1 ================================================

  const[allassest_category_level1,setallassest_category_level1]=useState([])
      const getallassest_category=async()=>
      {
        try {
          const resp=await api.post('api/v1/admin/LookupList',{lookupcodes:"asset_category_level_1"})
          setallassest_category_level1(resp.data.data)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
        getallassest_category()
    
      },[])

   


//====================================== get asset level 2==============================================

  const[allassest_category_level2,setallassest_category_level2]=useState([])
      const getallassest_category_level2=async()=>
      {
        try {
          const resp=await api.post('api/v1/common/LookupList',{lookup_type:"asset_category_level_2",parent_lookup_id:assetmaster.AssetCategoryLevel1})
          console.log(resp);
          
          setallassest_category_level2(resp.data.data)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
    useEffect(() => {
  if (assetmaster.AssetCategoryLevel1) {
    getallassest_category_level2();
  }
}, [assetmaster.AssetCategoryLevel1]);

 
//===================================== all asset level 3==========================================

  const[allassest_category_level3,setallassest_category_level3]=useState([])
      const getallassest_category_level3=async()=>
      {
        try {
          const resp=await api.post('api/v1/common/LookupList',{lookup_type:"asset_category_level_3",parent_lookup_id:assetmaster.AssetCategoryLevel2})
          setallassest_category_level3(resp.data.data)
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
      useEffect(()=>
      {
         if (assetmaster.AssetCategoryLevel2) {
          getallassest_category_level3();
        }
        
      },[assetmaster.AssetCategoryLevel2])


  //================================== get all station list===========================================

  const[allstationmaster,setallstationmaster]=useState([])
        const getallstation_list=async()=>
        {
          try {
            const resp=await api.post('api/v1/admin/StationList',{ page:1, limit:10, search:"" })
            console.log(resp);
            
            setallstationmaster(resp.data.data.list)
            
          } catch (error) {
            console.log(error);
            
          }
        }
      
        useEffect(()=>
        {
          getallstation_list()
      
        },[])

  //==================================== get all subscription======================================

       const[allsubscription,setallsubscription]=useState([])
        const getallsubscription=async()=>
        {
          try {
            const resp=await api.post('api/v1/admin/LookupList',{lookupcodes:"subscription_type"})
            setallsubscription(resp.data.data)
            
          } catch (error) {
            console.log(error);
            
          }
        }
      
        useEffect(()=>
        {
          getallsubscription()
      
        },[])


 

    const handlechange = (e) => {
  const { name, value, checked, type } = e.target;

  setassetmaster((prev) => {
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


     
        const add_assest_master = async () => {
        try {
          const resp = await api.post("api/v1/admin/SaveAsset_Identifier",assetmaster);
      
          if (resp.data.response.response_code === "200") {
              Swal.fire({
                      icon:"success",
                      title:"Asset Master Added",
                      text:"Asset Master Addedd Successfully...",
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
                  <h3>Enter Details for Assets Master</h3>
                  <p>Add or update the required details for the assets master to keep records accurate and complete.</p>
                  </div>
        
        
           {/* Form */}
                <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>

      <div className="form-grid">
          
       <FormControl fullWidth size="small">
             <label className="form-label">Asset Category Level 1</label>
            <Select 
              name="AssetCategoryLevel1"
              value={assetmaster.AssetCategoryLevel1}
              onChange={handlechange}
              MenuProps={customMenuProps}
                displayEmpty
                renderValue={(selected) => {
                  if (!selected) {
                    return <span style={{ color: "#9ca3af" }}>Asset Category Level 1</span>; // grey placeholder
                  }
                  return allassest_category_level1.find((item) => item._id === selected)?.lookup_value;
                }}
            >

               <MenuItem disabled value="">
                  <em>Asset Category Level 1 Id</em>
                </MenuItem>
             {
                allassest_category_level1?.map((item)=>
                (
                    <MenuItem key={item._id} value={item._id}>{item.lookup_value}</MenuItem>
                ))
            }
            </Select>
          </FormControl> 


           <FormControl fullWidth size="small">
            <label className="form-label">Asset Category Level 2</label>
            <Select 
              name="AssetCategoryLevel2"
              value={assetmaster.AssetCategoryLevel2}
              MenuProps={customMenuProps}
              onChange={handlechange}
                displayEmpty
                renderValue={(selected) => {
                  if (!selected) {
                    return <span style={{ color: "#9ca3af" }}>Select Asset Category Level 2</span>; // grey placeholder
                  }
                  return allassest_category_level2.find((item) => item._id === selected)?.lookup_value;
                }}
            >
               <MenuItem disabled value="">
                  <em>Asset Category Level 2 Id</em>
                </MenuItem>
             {
                allassest_category_level2?.map((item)=>
                (
                    <MenuItem key={item._id} value={item._id}>{item.lookup_value}</MenuItem>
                ))
            }
            </Select>
          </FormControl> 


           <FormControl fullWidth size="small">
            <label className="form-label">Asset Category Level 3</label>
            <Select 
              name="AssetCategoryLevel3"
              value={assetmaster.AssetCategoryLevel3}
              MenuProps={customMenuProps}
              onChange={handlechange}
                 displayEmpty
                renderValue={(selected) => {
                  if (!selected) {
                    return <span style={{ color: "#9ca3af" }}>Select Asset Category Level 3</span>; // grey placeholder
                  }
                  return allassest_category_level3.find((item) => item._id === selected)?.lookup_value;
                }}
            >

                <MenuItem disabled value="">
                  <em>Asset Category Level 3 Id</em>
                </MenuItem>
             {
                allassest_category_level3?.map((item)=>
                (
                    <MenuItem key={item._id} value={item._id}>{item.lookup_value}</MenuItem>
                ))
            }
            </Select>
          </FormControl> 

          <FormControl fullWidth size="small">
            <label className="form-label">Station</label>
            <Select 
              name="StationId"
              value={assetmaster.StationId}
              MenuProps={customMenuProps}
              onChange={handlechange}
                 displayEmpty
                renderValue={(selected) => {
                  if (!selected) {
                    return <span style={{ color: "#9ca3af" }}>Select Station Id</span>; // grey placeholder
                  }
                  return allstationmaster.find((item) => item._id === selected)?.StationName;
                }}
            >
               <MenuItem disabled value="">
                  <em>Station Id</em>
                </MenuItem>
             {
                allstationmaster?.map((item)=>
                (
                    <MenuItem key={item._id} value={item._id}>{item.StationName}</MenuItem>
                ))
            }
            </Select>
          </FormControl> 

         <FormControl fullWidth size="small">
            <label className="form-label">Parent Asset</label>
            <Select 
              name="ParentAssetId"
              value={assetmaster.ParentAssetId}
              MenuProps={customMenuProps}
              onChange={handlechange}
                 displayEmpty
                renderValue={(selected) => {
                  if (!selected) {
                    return <span style={{ color: "#9ca3af" }}>Select Asset Id</span>; // grey placeholder
                  }
                  return allorgunits.find((item) => item._id === selected)?.lookup_value;
                }}
            >
               <MenuItem disabled value="">
                  <em>Asset Id</em>
                </MenuItem>
            {
                allorgunits.map((item)=>
                (
                    <MenuItem key={item._id} value={item._id}>{item.lookup_value}</MenuItem>
                ))
            }
            </Select>
          </FormControl> 
        
          <FormControl fullWidth size="small">
            <label className="form-label">Asset Name</label>
          <TextField
            name="AssetName"
            placeholder="Asset Name"
            value={assetmaster.AssetName}
            onChange={handlechange}
            fullWidth
            size="small"
          />
          </FormControl>

         <FormControl fullWidth size="small">
            <label className="form-label">Subscription Type</label>
            <Select 
              name="SubscriptionType"
              value={assetmaster.SubscriptionType}
              MenuProps={customMenuProps}
              onChange={handlechange}
                 displayEmpty
                renderValue={(selected) => {
                  if (!selected) {
                    return <span style={{ color: "#9ca3af" }}>Subscription Type Id</span>; // grey placeholder
                  }
                  return allsubscription.find((item) => item._id === selected)?.lookup_value;
                }}
            >
               <MenuItem disabled value="">
                  <em>Subscription Type</em>
                </MenuItem>
              {
                allsubscription.map((item)=>
                (
                    <MenuItem key={item._id} value={item._id}>{item.lookup_value}</MenuItem>
                ))
            }
            </Select>
          </FormControl> 
         
         </div>

          <Button
         className='submit-button'
            onClick={add_assest_master}
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

export default Addassestsmaster
