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
      // width: 150,
      headerClassName: "blue-header",
      renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
    },
    { field: "EventTitle", headerName: "Event Title", flex: 2 },
    { field: "EventVenue", headerName: "Venue", flex: 1 },
    { field: "RegistrationFee", headerName: "Fee", flex: 0.8 },
    {
      field: "AssetId",
      headerName: "Asset",
      flex: 2,
      renderCell: (params) => params.row.AssetId?.AssetName || "N/A",
    },
    {
      field: "Event Type",
      headerName: "Event Type",
      flex: 1,
      renderCell: (params) => params.row.EventTypeId?.lookup_value || "N/A",
    },
    {
      field: "Currency",
      headerName: "Currency",
      flex: 1,
      renderCell: (params) =>
        params.row.RegistrationCurrency?.lookup_value || "N/A",
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
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-800">Event Master</h1>
          <div className="flex items-center justify-between">
            <div className="grid w-full grid-cols-6 gap-6 mx-auto lg:grid-cols-12">
              {/* Form Section */}
              <div className="col-span-12 px-3 py-3 bg-white border rounded-xl lg:col-span-5">
                <form
                  onSubmit={__handleSaveEvent}
                  className="w-full max-w-2xl p-2 space-y-4 bg-white rounded-2xl"
                >
                  {/* Asset Dropdown */}
                  <FormControl fullWidth>
                    <InputLabel id="asset-label">Asset</InputLabel>
                    <Select
                      MenuProps={{
                        disablePortal: true,
                        disableScrollLock: true,
                      }}
                      labelId="asset-label"
                      name="AssetId"
                      value={AssetId || ""}
                      onChange={handleChange}
                      label="Asset"
                    >
                      <MenuItem value="">
                        <em>Select Asset</em>
                      </MenuItem>
                      {AssetList.map((asset) => (
                        <MenuItem key={asset._id} value={asset._id}>
                          {asset.AssetName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {/* Station Dropdown */}
                  <FormControl fullWidth>
                    <InputLabel id="station-label">Station</InputLabel>
                    <Select
                      MenuProps={{
                        disablePortal: true,
                        disableScrollLock: true,
                      }}
                      labelId="station-label"
                      name="StationId"
                      value={StationId || ""}
                      onChange={handleChange}
                      label="Station"
                    >
                      <MenuItem value="">
                        <em>Select Station</em>
                      </MenuItem>
                      {StationList.map((station) => (
                        <MenuItem key={station._id} value={station._id}>
                          {station.StationName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {/* Event Type Dropdown */}
                  <FormControl fullWidth>
                    <InputLabel id="event-type-label">Event Type</InputLabel>
                    <Select
                      MenuProps={{
                        disablePortal: true,
                        disableScrollLock: true,
                      }}
                      labelId="event-type-label"
                      name="EventTypeId"
                      value={EventTypeId || ""}
                      onChange={handleChange}
                      label="Event Type"
                    >
                      <MenuItem value="">
                        <em>Select Event Type</em>
                      </MenuItem>
                      {EventTypeList.map((type) => (
                        <MenuItem key={type.id} value={type.id}>
                          {type.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {/* Event Title */}
                  <TextField
                    label="Event Title"
                    name="EventTitle"
                    value={EventTitle}
                    onChange={handleChange}
                    fullWidth
                    required
                  />

                  {/* Event Venue */}
                  <TextField
                    label="Event Venue"
                    name="EventVenue"
                    value={EventVenue}
                    onChange={handleChange}
                    fullWidth
                    required
                  />

                  {/* Registration Currency */}
                  <FormControl fullWidth>
                    <InputLabel id="currency-label">
                      Registration Currency
                    </InputLabel>
                    <Select
                      MenuProps={{
                        disablePortal: true,
                        disableScrollLock: true,
                      }}
                      labelId="currency-label"
                      name="RegistrationCurrency"
                      value={RegistrationCurrency || ""}
                      onChange={handleChange}
                      label="Registration Currency"
                    >
                      <MenuItem value="">
                        <em>Select Currency</em>
                      </MenuItem>
                      {CurrencyList.map((currency) => (
                        <MenuItem key={currency.id} value={currency.id}>
                          {currency.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {/* Registration Fee */}
                  <TextField
                    label="Registration Fee"
                    name="RegistrationFee"
                    value={RegistrationFee}
                    onChange={handleChange}
                    fullWidth
                    type="number"
                  />

                  {/* Event Schedule Section */}
                  <div className="space-y-4">
                    <Typography variant="h6" className="text-gray-700">
                      Event Schedule
                    </Typography>

                    <div className="grid grid-cols-2 gap-4">
                      <TextField
                        label="Date"
                        name="Date"
                        type="date"
                        value={currentSchedule.Date}
                        onChange={handleScheduleChange}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                      />
                      <TextField
                        label="Start Time"
                        name="StartTime"
                        type="time"
                        value={currentSchedule.StartTime}
                        onChange={handleScheduleChange}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <TextField
                        label="End Time"
                        name="EndTime"
                        type="time"
                        value={currentSchedule.EndTime}
                        onChange={handleScheduleChange}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                      />
                      <TextField
                        label="Number of Slots"
                        name="NoOfSlots"
                        type="number"
                        value={currentSchedule.NoOfSlots}
                        onChange={handleScheduleChange}
                        fullWidth
                      />
                    </div>

                    <Button
                      onClick={addSchedule}
                      variant="outlined"
                      startIcon={<AddIcon />}
                      className="w-full"
                    >
                      Add Schedule
                    </Button>

                    {/* Display added schedules */}
                    {EventSchedule.length > 0 && (
                      <div className="space-y-2">
                        <Typography
                          variant="subtitle2"
                          className="text-gray-600"
                        >
                          Added Schedules:
                        </Typography>
                        {EventSchedule.map((schedule, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 rounded bg-gray-50"
                          >
                            <span className="text-sm">
                              {schedule.Date} | {schedule.StartTime} -{" "}
                              {schedule.EndTime} | Slots: {schedule.NoOfSlots}
                            </span>
                            <IconButton
                              onClick={() => removeSchedule(index)}
                              size="small"
                              color="error"
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Event Poster Upload */}
                  <div className="space-y-2">
                    <Typography variant="subtitle1" className="text-gray-700">
                      Event Poster
                    </Typography>
                    <div className="flex items-center space-x-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleSingleImageUpload(e, "EventPoster")
                        }
                        style={{ display: "none" }}
                        id="event-poster-upload"
                        disabled={eventPosterLoading}
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
                          className="cursor-pointer"
                        >
                          {eventPosterLoading
                            ? "Uploading..."
                            : "Upload Poster"}
                        </Button>
                      </label>
                    </div>
                    {EventPoster.length > 0 && (
                      <div className="grid grid-cols-2 gap-2">
                        {EventPoster.map((url, index) => (
                          <div key={index} className="relative">
                            <img
                              src={url}
                              alt={`Event Poster ${index + 1}`}
                              className="object-cover w-full h-32 border rounded"
                            />
                            <IconButton
                              onClick={() => removeImage(index, "EventPoster")}
                              className="absolute text-white bg-red-500 top-1 right-1"
                              size="small"
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Event Advertisement Upload */}
                  <div className="space-y-2">
                    <Typography variant="subtitle1" className="text-gray-700">
                      Event Advertisement
                    </Typography>
                    <div className="flex items-center space-x-2">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) =>
                          handleMultipleImageUpload(e, "EventAdvertisement")
                        }
                        style={{ display: "none" }}
                        id="event-advertisement-upload"
                        disabled={eventAdvertisementLoading}
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
                          className="cursor-pointer"
                        >
                          {eventAdvertisementLoading
                            ? "Uploading..."
                            : "Upload Advertisements"}
                        </Button>
                      </label>
                    </div>
                    {EventAdvertisement.length > 0 && (
                      <div className="grid grid-cols-2 gap-2">
                        {EventAdvertisement.map((url, index) => (
                          <div key={index} className="relative">
                            <img
                              src={url}
                              alt={`Event Advertisement ${index + 1}`}
                              className="object-cover w-full h-32 border rounded"
                            />
                            <IconButton
                              onClick={() =>
                                removeImage(index, "EventAdvertisement")
                              }
                              className="absolute text-white bg-red-500 top-1 right-1"
                              size="small"
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isLoading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : event_id ? (
                      "Update Event"
                    ) : (
                      "Save Event"
                    )}
                  </Button>
                </form>
              </div>

              {/* Data Grid Section */}

              {/* <div className="col-span-12 pb-2 bg-white rounded-lg lg:col-span-7">
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

              <div className="col-span-12 px-3 py-3 bg-white border rounded-xl lg:col-span-7">
                <div className="h-96">
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    disableSelectionOnClick
                    loading={isLoading}
                    className="border-0"
                    autoHeight
                    pagination
                    // getRowId={(row) => row._id}
                    // initialState={{
                    //   pagination: {
                    //     paginationModel: { pageSize: 10, page: 0 },
                    //   },
                    // }}
                    // pageSizeOptions={[10]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isLoading && <UniqueLoader />}
    </div>
  );
}

export default EventMaster;
