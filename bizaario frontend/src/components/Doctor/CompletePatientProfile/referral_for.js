import React, { useState ,useRef, useEffect} from 'react';
import {
  Box, Grid, Button, Typography, Card, Avatar,
  TextField, FormControl, InputLabel, Select, MenuItem, RadioGroup,
  FormControlLabel, Radio, Fade,Chip,Menu,InputAdornment 
} from '@mui/material';
import {  IconButton,  Tooltip } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import api from '../../../api'
import Swal from 'sweetalert2';
import UniqueLoader from '../../loader';
import { DataGrid } from '@mui/x-data-grid';
import '../../Admin/admincss/add_asset_master.css'
import Doctorheader from '../doctorheader';
import Doctorsidebar from '../doctorsidebar';
import CommonHeader from "../../common/CommonHeader";

function ReferralFor() {
  const [loading, setloading] = useState(false);

  const [referral_for, setreferral_for] = useState({
    referral_for: "",
  });

  const [all_symptom_class_master, setall_symptom_class_master] = useState([]);
  const getall_symptom_class_master = async () => {
    try {
      const resp = await api.post("api/v1/admin/LookupList/", {
        lookupcodes: "symptom_class_type",
      });
      console.log(resp);

      setall_symptom_class_master(resp.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getall_symptom_class_master();
  }, []);

  const [all_patient_referral_type, setall_patient_referral_type] = useState(
    []
  );
  const getall_patient_referral_type = async () => {
    try {
      const resp = await api.post("api/v1/admin/LookupList/", {
        lookupcodes: "patient_referral_type",
      });
      console.log(resp);

      setall_patient_referral_type(resp.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getall_patient_referral_type();
  }, []);

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

  const [lookup_id, setlookup_id] = useState(null);
  //   const onEdit=(row)=>
  //   {
  //     setlookup_id(row._id)
  //     setsymptom_class_master({symptom_class:row.lookup_value})
  //   }

  const onDeletehospital = () => {
    alert("delete");
  };

  const columnsymptommaster = [
    {
      field: "sno",
      headerName: "S.No.",
      flex: 0.2,
      renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
    },
    { field: "lookup_value", headerName: "Symptom Class", flex: 0.5 },
    {
      field: "actions",
      headerName: "Actions",
      width: 80,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={(e) => handleOpenMenuhospital(e, params.row._id)}
          >
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
                  //   onEdit(params.row);
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
    },
  ];

  const rowssymptom = all_symptom_class_master?.map((doc, index) => ({
    id: doc._id || index,
    ...doc,
  }));

  const handlechange = (e) => {
    const { name, value, checked, type } = e.target;

    setreferral_for((prev) => {
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

  const add_referral_for = async () => {
    try {
      setloading(true);
      const resp = await api.post(
        "api/v1/admin/SaveLookup"
        // {
        //   lookup_id:lookup_id,
        //   lookup_type:"symptom_class_type",
        //   lookup_value:symptom_class_master.symptom_class,
        // }
      );

      if (resp.data.response.response_code === "200") {
        Swal.fire({
          icon: "success",
          title: "Symptom Class Master Added",
          text: "Symptom Class Master Addedd Successfully...",
          showConfirmButton: true,
          customClass: {
            confirmButton: "my-swal-button",
          },
        }).then(() => {
          window.location.reload();
        });
        console.log("✅ Lookup list:", resp.data.data);
      } else {
        console.warn("⚠️ Error:", resp.data.response.response_message);
        Swal.fire({
          icon: "error",
          title: "Error Occured",
          text: resp.data.response.response_message,
          showConfirmButton: true,
          customClass: {
            confirmButton: "my-swal-button",
          },
        });
      }
    } catch (error) {
      console.error("❌ API Error:", error);
    } finally {
      setloading(false);
    }
  };

  return (
    <div>
      {/* <Doctorheader/> */}
      <CommonHeader />

      <Doctorsidebar />
      <div className="asset-master">
        <Box sx={{ maxWidth: 1150, mx: "auto", px: 2 }}>
          <div className="profile-header">
            <h3>Enter Details for Patient Referral For</h3>
            <p>
              Add or update the required details for the patient referral for to
              keep records accurate and complete.
            </p>
          </div>

          {/* Form */}
          <Box
            component="form"
            autoComplete="off"
            sx={{
              background: "#fff",
              borderRadius: 3,
              p: { xs: 2, sm: 3, md: 5 },
              mb: 4,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <div>
              <FormControl fullWidth size="small">
                <label className="form-label">Referral For </label>
                <RadioGroup
                  size="small"
                  row
                  name="referral_for"
                  value={referral_for.referral_for}
                  onChange={handlechange}
                  sx={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    gap: 1,
                    width: "100%",
                  }}
                >
                  {all_patient_referral_type?.map((item) => (
                    <>
                      <FormControlLabel
                        value={item._id}
                        control={<Radio />}
                        label={item.lookup_value}
                      />
                    </>
                  ))}
                </RadioGroup>
              </FormControl>
            </div>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              // type="submit"
              sx={{
                width: "200px",
                alignSelf: "flex-start",
                fontFamily: "Lora",
                fontWeight: "bold",
              }}
              onClick={add_referral_for}
            >
              Submit
            </Button>
          </Box>

          {/* Table */}
          <Box sx={{ background: "#fff", borderRadius: 3, p: 2 }}>
            {/* <DataGrid
               className="custom-data-grid"
                rows={rowssymptom}
                columns={columnsymptommaster}
                pageSize={10}
                pageSizeOptions={[]} // removes the rows per page selector
                initialState={{
                  pagination: { paginationModel: { pageSize: 10, page: 0 } },
                }}
                disableSelectionOnClick
              
              /> */}
          </Box>
        </Box>
      </div>

      {loading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(255, 255, 255, 0.6)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <UniqueLoader />
        </div>
      )}
    </div>
  );
}

export default ReferralFor
