import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Grid,
  Button,
  Typography,
  Card,
  Avatar,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Fade,
  Chip,
  Menu,
  InputAdornment,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import api from "../../../api";
import { __getCommenApiDataList } from "../../../utils/api/commonApi";
import Swal from "sweetalert2";
import UniqueLoader from "../../loader";
import { DataGrid } from "@mui/x-data-grid";
import Adminsidebar from "../adminsidebar";
import Adminheader from "../adminheader";
import "../../Admin/admincss/station-master.css";
import { __postApiData } from "../../../utils/api";

function EventMaster() {
  const [isLoading, setIsLoading] = useState(false);
  const [eventList, setEventList] = useState([]);
  const [currentSchedule, setCurrentSchedule] = useState({
    Date: "",
    StartTime: "",
    EndTime: "",
    NoOfSlots: "",
  });

  const [state, setState] = useState({
    event_id: null, // for edit
    AssetId: null,
    StationId: null,
    EventTypeId: null,
    EventTitle: "",
    EventVenue: "",
    EventSchedule: [],
    RegistrationCurrency: null,
    RegistrationFee: "",
    EventPoster: [],
    EventAdvertisement: [],
    // Dropdown data
    AssetList: [],
    StationList: [],
    EventTypeList: [],
    CurrencyList: [],
    // Loading states
    eventPosterLoading: false,
    eventAdvertisementLoading: false,
  });

  const {
    event_id,
    AssetId,
    StationId,
    EventTypeId,
    EventTitle,
    EventVenue,
    EventSchedule,
    RegistrationCurrency,
    RegistrationFee,
    EventPoster,
    EventAdvertisement,
    AssetList,
    StationList,
    EventTypeList,
    CurrencyList,
    eventPosterLoading,
    eventAdvertisementLoading,
  } = state;

  const updateState = (data) =>
    setState((prevState) => ({ ...prevState, ...data }));

  // Fetch event list
  const getEventList = async () => {
    try {
      setIsLoading(true);
      const resp = await __postApiData("/api/v1/admin/EventList", {});
      if (resp.response.response_code === "200") {
        setEventList(resp.data.list || []);
      }
    } catch (error) {
      console.error("Error fetching event list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch Asset List
  const getAssetList = async () => {
    try {
      const resp = await __postApiData("/api/v1/admin/AssetList", {});
      if (resp.response.response_code === "200") {
        updateState({ AssetList: resp.data.list || [] });
      }
    } catch (error) {
      console.error("Error fetching AssetList:", error);
    }
  };

  // Fetch Station List
  const getStationList = async () => {
    try {
      const resp = await __postApiData("/api/v1/admin/StationList", {});
      if (resp.response.response_code === "200") {
        updateState({ StationList: resp.data.list || [] });
      }
    } catch (error) {
      console.error("Error fetching StationList:", error);
    }
  };

  // Fetch dropdown data using common API
  const fetchDropdownData = async (lookupTypes, stateKey, parent_lookup_id) => {
    try {
      const data = await __getCommenApiDataList({
        lookup_type: lookupTypes,
        parent_lookup_id: parent_lookup_id || null,
      });
      updateState({ [stateKey]: data });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getEventList();
    getAssetList();
    getStationList();
    // Fetch lookup data for dropdowns
    fetchDropdownData(["event_type"], "EventTypeList");
    fetchDropdownData(["currency_type"], "CurrencyList");
  }, []);

  // DataGrid columns
  const columns = [
    {
      field: "sno",
      headerName: "S.No.",
      flex: 0.2,
      renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
    },
    { field: "EventTitle", headerName: "Event Title", flex: 1 },
    { field: "EventVenue", headerName: "Venue", flex: 1 },
    { field: "RegistrationFee", headerName: "Registration Fee", flex: 0.8 },
    {
      field: "AssetId",
      headerName: "Asset",
      flex: 1,
      renderCell: (params) => params.row.AssetId?.AssetName || "N/A",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 80,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <IconButton onClick={(e) => handleOpenMenu(e, params.row._id)}>
            <MoreVertIcon />
          </IconButton>
          {menuRowId === params.row._id && (
            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={handleCloseMenu}
              disableScrollLock
            >
              <MenuItem
                onClick={() => {
                  onEdit(params.row);
                  handleCloseMenu();
                }}
              >
                Edit
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onDelete(params.row._id);
                  handleCloseMenu();
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

  const [menuAnchor, setMenuAnchor] = useState(null);
  const [menuRowId, setMenuRowId] = useState(null);

  const handleOpenMenu = (event, rowId) => {
    setMenuAnchor(event.currentTarget);
    setMenuRowId(rowId);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
    setMenuRowId(null);
  };

  const onEdit = (row) => {
    updateState({
      event_id: row._id || null,
      AssetId: row.AssetId?._id || "",
      StationId: row.StationId?._id || "",
      EventTypeId: row.EventTypeId?._id || "",
      EventTitle: row.EventTitle || "",
      EventVenue: row.EventVenue || "",
      EventSchedule: row.EventSchedule || [],
      RegistrationCurrency: row.RegistrationCurrency?._id || "",
      RegistrationFee: row.RegistrationFee || "",
      EventPoster: row.EventPoster || [],
      EventAdvertisement: row.EventAdvertisement || [],
    });
  };

  const onDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        setIsLoading(true);
        const resp = await __postApiData("/api/v1/admin/DeleteEvent", { id });
        if (resp.response.response_code === "200") {
          Swal.fire("Deleted!", "Event has been deleted.", "success");
          getEventList();
        }
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      Swal.fire("Error!", "Failed to delete event.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Image upload function
  const __handleUploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await __postApiData(
        "/api/v1/common/AddImage",
        formData,
        "form"
      );
      console.log("Upload response:", res);

      if (res.response.response_code === "200") {
        // Handle both single object and array responses
        if (Array.isArray(res.data)) {
          return res.data[0].full_URL;
        } else {
          return res.data.full_URL;
        }
      } else {
        throw new Error(res.response.response_message || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  };

  // Handle single image upload
  const handleSingleImageUpload = async (event, fieldName) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      updateState({ [`${fieldName}Loading`]: true });
      const uploadedUrl = await __handleUploadFile(file);
      updateState({
        [fieldName]: [uploadedUrl],
        [`${fieldName}Loading`]: false,
      });
    } catch (error) {
      console.error("Upload error:", error);
      updateState({ [`${fieldName}Loading`]: false });
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: error.message || "Failed to upload image",
      });
    }
  };

  // Handle multiple image upload
  const handleMultipleImageUpload = async (event, fieldName) => {
    const files = Array.from(event.target.files);
    const uploadPromises = files.map((file) => __handleUploadFile(file));

    try {
      updateState({ [`${fieldName}Loading`]: true });
      const uploadedUrls = await Promise.all(uploadPromises);
      updateState({
        [fieldName]: [...state[fieldName], ...uploadedUrls],
        [`${fieldName}Loading`]: false,
      });
    } catch (error) {
      console.error("Upload error:", error);
      updateState({ [`${fieldName}Loading`]: false });
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: error.message || "Failed to upload images",
      });
    }
  };

  // Remove image from gallery
  const removeImage = (index, fieldName) => {
    updateState({
      [fieldName]: state[fieldName].filter((_, i) => i !== index),
    });
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateState({ [name]: value });
  };

  // Handle schedule input changes
  const handleScheduleChange = (e) => {
    const { name, value } = e.target;
    setCurrentSchedule((prev) => ({ ...prev, [name]: value }));
  };

  // Add schedule to event
  const addSchedule = () => {
    if (
      currentSchedule.Date &&
      currentSchedule.StartTime &&
      currentSchedule.EndTime &&
      currentSchedule.NoOfSlots
    ) {
      updateState({
        EventSchedule: [
          ...EventSchedule,
          {
            ...currentSchedule,
            NoOfSlots: parseInt(currentSchedule.NoOfSlots),
          },
        ],
      });
      setCurrentSchedule({
        Date: "",
        StartTime: "",
        EndTime: "",
        NoOfSlots: "",
      });
    }
  };

  // Remove schedule
  const removeSchedule = (index) => {
    updateState({
      EventSchedule: EventSchedule.filter((_, i) => i !== index),
    });
  };

  // Save event function
  const __handleSaveEvent = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!EventTitle.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please enter event title",
      });
      return;
    }

    if (!EventVenue.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please enter event venue",
      });
      return;
    }

    if (EventSchedule.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please add at least one event schedule",
      });
      return;
    }

    const requestData = {
      // _id: event_id ? event_id : null,
      AssetId,
      StationId,
      EventTypeId,
      EventTitle,
      EventVenue,
      EventSchedule,
      RegistrationCurrency,
      RegistrationFee,
      EventPoster,
      EventAdvertisement,
    };

    // Add event_id for edit mode
    if (event_id) {
      requestData._id = event_id;
    }

    try {
      setIsLoading(true);
      //   const endpoint = event_id ? "/api/v1/admin/UpdateEvent" : "/api/v1/admin/SaveEvent";
      const endpoint = "/api/v1/admin/SaveEvent";

      const res = await __postApiData(endpoint, requestData);

      if (res.response.response_code === "200") {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: event_id
            ? "Event updated successfully!"
            : "Event created successfully!",
          showConfirmButton: true,
          customClass: {
            confirmButton: "my-swal-button",
          },
        }).then(() => {
          getEventList();
          // Reset form state
          updateState({
            event_id: null,
            AssetId: "",
            StationId: "",
            EventTypeId: "",
            EventTitle: "",
            EventVenue: "",
            EventSchedule: [],
            RegistrationCurrency: "",
            RegistrationFee: "",
            EventPoster: [],
            EventAdvertisement: [],
          });
          setCurrentSchedule({
            Date: "",
            StartTime: "",
            EndTime: "",
            NoOfSlots: "",
          });
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            res.response.response_message ||
            "Failed to save event. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error saving event:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to save event. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Prepare rows for DataGrid
  const rows = eventList.map((event, index) => ({
    id: event._id,
    ...event,
  }));

  return (
    <div>
      <Adminsidebar />
      <Adminheader />
      <div className="station-master">
        <div className="profile-header">
          <h3>Enter Details for Event Master</h3>
          <p>
            Add or update the required details for the event master to keep
            records accurate and complete.
          </p>
        </div>

        <div>
          <Box>
            <Box
              sx={{
                mt: { xs: 3, lg: 5 },
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                width: "100%",
              }}
            >
              <Grid
                container
                spacing={5}
                sx={{ maxWidth: 1150, width: "100%" }}
              >
                {/* ===== Left: FORM ===== */}
                <Grid item xs={12} md={7}>
                  <Box
                    component="form"
                    onSubmit={__handleSaveEvent}
                    autoComplete="off"
                    sx={{
                      background: "#fff",
                      borderRadius: 3,
                      minWidth: 440,
                      maxWidth: { xs: 630, lg: 900 },
                      p: { xs: 2, sm: 3, md: 5 },
                      mx: "auto",
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <Grid container spacing={2}>
                      {/* Asset Dropdown */}
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth size="small">
                          <InputLabel>Asset</InputLabel>
                          <Select
                            name="AssetId"
                            value={AssetId}
                            label="Asset"
                            onChange={handleChange}
                          >
                            {AssetList.map((asset) => (
                              <MenuItem key={asset._id} value={asset._id}>
                                {asset.AssetName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      {/* Station Dropdown */}
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth size="small">
                          <InputLabel>Station</InputLabel>
                          <Select
                            name="StationId"
                            value={StationId}
                            label="Station"
                            onChange={handleChange}
                          >
                            {StationList.map((station) => (
                              <MenuItem key={station._id} value={station._id}>
                                {station.StationName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      {/* Event Type Dropdown */}
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth size="small">
                          <InputLabel>Event Type</InputLabel>
                          <Select
                            name="EventTypeId"
                            value={EventTypeId}
                            label="Event Type"
                            onChange={handleChange}
                          >
                            {EventTypeList.map((type) => (
                              <MenuItem key={type.id} value={type.id}>
                                {type.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      {/* Event Title */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          name="EventTitle"
                          label="Event Title"
                          value={EventTitle}
                          onChange={handleChange}
                          fullWidth
                          size="small"
                          required
                        />
                      </Grid>

                      {/* Event Venue */}
                      <Grid item xs={12}>
                        <TextField
                          name="EventVenue"
                          label="Event Venue"
                          value={EventVenue}
                          onChange={handleChange}
                          fullWidth
                          size="small"
                          required
                        />
                      </Grid>

                      {/* Registration Currency */}
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth size="small">
                          <InputLabel>Registration Currency</InputLabel>
                          <Select
                            name="RegistrationCurrency"
                            value={RegistrationCurrency}
                            label="Registration Currency"
                            onChange={handleChange}
                          >
                            {CurrencyList.map((currency) => (
                              <MenuItem key={currency.id} value={currency.id}>
                                {currency.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      {/* Registration Fee */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          name="RegistrationFee"
                          label="Registration Fee"
                          value={RegistrationFee}
                          onChange={handleChange}
                          fullWidth
                          size="small"
                          type="number"
                        />
                      </Grid>
                    </Grid>

                    {/* Event Schedule Section */}
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="h6" gutterBottom>
                        Event Schedule
                      </Typography>

                      <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={12} sm={3}>
                          <TextField
                            name="Date"
                            label="Date"
                            type="date"
                            value={currentSchedule.Date}
                            onChange={handleScheduleChange}
                            fullWidth
                            size="small"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <TextField
                            name="StartTime"
                            label="Start Time"
                            type="time"
                            value={currentSchedule.StartTime}
                            onChange={handleScheduleChange}
                            fullWidth
                            size="small"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <TextField
                            name="EndTime"
                            label="End Time"
                            type="time"
                            value={currentSchedule.EndTime}
                            onChange={handleScheduleChange}
                            fullWidth
                            size="small"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                          <TextField
                            name="NoOfSlots"
                            label="No. of Slots"
                            type="number"
                            value={currentSchedule.NoOfSlots}
                            onChange={handleScheduleChange}
                            fullWidth
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} sm={1}>
                          <Button
                            onClick={addSchedule}
                            variant="contained"
                            size="small"
                            sx={{ height: "40px" }}
                          >
                            <AddIcon />
                          </Button>
                        </Grid>
                      </Grid>

                      {/* Display added schedules */}
                      {EventSchedule.map((schedule, index) => (
                        <Chip
                          key={index}
                          label={`${schedule.Date} | ${schedule.StartTime} - ${schedule.EndTime} | ${schedule.NoOfSlots} slots`}
                          onDelete={() => removeSchedule(index)}
                          sx={{ mr: 1, mb: 1 }}
                        />
                      ))}
                    </Box>

                    {/* Event Poster Upload */}
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="h6" gutterBottom>
                        Event Poster
                      </Typography>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleSingleImageUpload(e, "EventPoster")
                        }
                        style={{ display: "none" }}
                        id="event-poster-upload"
                      />
                      <label htmlFor="event-poster-upload">
                        <Button
                          variant="outlined"
                          component="span"
                          startIcon={
                            eventPosterLoading ? (
                              <CircularProgress size={20} />
                            ) : (
                              <CloudUploadIcon />
                            )
                          }
                          disabled={eventPosterLoading}
                          sx={{
                            cursor: eventPosterLoading
                              ? "not-allowed"
                              : "pointer",
                            opacity: eventPosterLoading ? 0.6 : 1,
                          }}
                        >
                          {eventPosterLoading
                            ? "Uploading..."
                            : "Upload Event Poster"}
                        </Button>
                      </label>

                      {EventPoster.length > 0 && (
                        <Box
                          sx={{
                            mt: 2,
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 1,
                          }}
                        >
                          {EventPoster.map((url, index) => (
                            <Box key={index} sx={{ position: "relative" }}>
                              <img
                                src={url}
                                alt={`Event Poster ${index + 1}`}
                                style={{
                                  width: 100,
                                  height: 100,
                                  objectFit: "cover",
                                  borderRadius: 8,
                                }}
                              />
                              <IconButton
                                onClick={() =>
                                  removeImage(index, "EventPoster")
                                }
                                sx={{
                                  position: "absolute",
                                  top: -8,
                                  right: -8,
                                  backgroundColor: "red",
                                  color: "white",
                                  "&:hover": { backgroundColor: "darkred" },
                                  width: 24,
                                  height: 24,
                                }}
                              >
                                <DeleteIcon sx={{ fontSize: 16 }} />
                              </IconButton>
                            </Box>
                          ))}
                        </Box>
                      )}
                    </Box>

                    {/* Event Advertisement Upload */}
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="h6" gutterBottom>
                        Event Advertisement
                      </Typography>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) =>
                          handleMultipleImageUpload(e, "EventAdvertisement")
                        }
                        style={{ display: "none" }}
                        id="event-advertisement-upload"
                      />
                      <label htmlFor="event-advertisement-upload">
                        <Button
                          variant="outlined"
                          component="span"
                          startIcon={
                            eventAdvertisementLoading ? (
                              <CircularProgress size={20} />
                            ) : (
                              <CloudUploadIcon />
                            )
                          }
                          disabled={eventAdvertisementLoading}
                          sx={{
                            cursor: eventAdvertisementLoading
                              ? "not-allowed"
                              : "pointer",
                            opacity: eventAdvertisementLoading ? 0.6 : 1,
                          }}
                        >
                          {eventAdvertisementLoading
                            ? "Uploading..."
                            : "Upload Event Advertisements"}
                        </Button>
                      </label>

                      {EventAdvertisement.length > 0 && (
                        <Box
                          sx={{
                            mt: 2,
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 1,
                          }}
                        >
                          {EventAdvertisement.map((url, index) => (
                            <Box key={index} sx={{ position: "relative" }}>
                              <img
                                src={url}
                                alt={`Event Advertisement ${index + 1}`}
                                style={{
                                  width: 100,
                                  height: 100,
                                  objectFit: "cover",
                                  borderRadius: 8,
                                }}
                              />
                              <IconButton
                                onClick={() =>
                                  removeImage(index, "EventAdvertisement")
                                }
                                sx={{
                                  position: "absolute",
                                  top: -8,
                                  right: -8,
                                  backgroundColor: "red",
                                  color: "white",
                                  "&:hover": { backgroundColor: "darkred" },
                                  width: 24,
                                  height: 24,
                                }}
                              >
                                <DeleteIcon sx={{ fontSize: 16 }} />
                              </IconButton>
                            </Box>
                          ))}
                        </Box>
                      )}
                    </Box>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={isLoading}
                      sx={{
                        mt: 3,
                        py: 1.5,
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                      }}
                    >
                      {isLoading
                        ? "Saving..."
                        : event_id
                        ? "Update Event"
                        : "Save Event"}
                    </Button>
                  </Box>
                </Grid>

                {/* ===== Right: DATA GRID ===== */}
                <Grid item xs={12} md={5} sx={{ mt: { xs: 3, md: 0 } }}>
                  <Box
                    className="rightsection"
                    sx={{
                      background: "#fff",
                      borderRadius: 3,
                      minWidth: 560,
                      maxWidth: 580,
                      p: { xs: 0, sm: 0, md: 0 },
                      mx: "auto",
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      pageSize={20}
                      pageSizeOptions={[]}
                      disableSelectionOnClick
                      initialState={{
                        pagination: {
                          paginationModel: { pageSize: 10, page: 0 },
                        },
                      }}
                    />
                  </Box>
                </Grid>
{/* 
                <div className="col-span-12 pb-2 bg-white rounded-lg lg:col-span-7">
                  <DataGrid
                    loading={isLoading}
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    autoHeight
                    pagination
                    getRowId={(row) => row._id}
                    initialState={{
                      pagination: {
                        paginationModel: { pageSize: 10, page: 0 },
                      },
                    }}
                    pageSizeOptions={[10]}
                  />
                </div> */}
              </Grid>
            </Box>
          </Box>
        </div>
      </div>
      {isLoading && <UniqueLoader />}
    </div>
  );
}

export default EventMaster;
