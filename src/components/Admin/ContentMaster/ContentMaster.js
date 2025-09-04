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
  Snackbar,
  Alert,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import api from "../../../api";
import { __getCommenApiDataList } from "../../../utils/api/commonApi";
import UniqueLoader from "../../loader";
import { DataGrid } from "@mui/x-data-grid";
import Adminsidebar from "../adminsidebar";
import Adminheader from "../adminheader";
import "../../Admin/admincss/station-master.css";
import { __postApiData } from "../../../utils/api";

function ContentMaster() {
  const [isLoading, setIsLoading] = useState(false);
  const [contentList, setContentList] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [currentReference, setCurrentReference] = useState("");
  const [currentVideo, setCurrentVideo] = useState("");

  // Toast state
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success", // success, error, warning, info
  });

  const [state, setState] = useState({
    content_id: null, // for edit
    AssetId: null,
    ContentTypeId: null,
    ContentType: [],
    AssetList: [],
    ContentTitle: "",
    GrantingBody: "",
    Date: "",
    ContentPriority: "",
    ValidUpto: "",
    ContentImage: "",
    ShortDescription: "",
    LongDescription: "",
    MetaTags: [],
    PictureGallery: [],
    VideoGallery: [],
    References: [],
    // Add loading states
    contentImageLoading: false,
    pictureGalleryLoading: false,
  });

  const {
    content_id, //for edit
    AssetId,
    ContentTypeId,
    ContentType,
    AssetList,
    ContentTitle,
    GrantingBody,
    Date,
    ContentPriority,
    ValidUpto,
    ContentImage,
    ShortDescription,
    LongDescription,
    MetaTags,
    PictureGallery,
    VideoGallery,
    References,
    // Add loading states to destructuring
    contentImageLoading,
    pictureGalleryLoading,
  } = state;

  const updateState = (data) =>
    setState((prevState) => ({ ...prevState, ...data }));

  // Toast functions
  const showToast = (message, severity = "success") => {
    setToast({ open: true, message, severity });
  };

  const hideToast = () => {
    setToast({ ...toast, open: false });
  };

  // Fetch content list
  const getContentList = async () => {
    try {
      setIsLoading(true);
      const resp = await __postApiData("/api/v1/admin/ContentList", {});
      
      if (resp.response.response_code === "200") {
        setContentList(resp.data.list || []);
      }
    } catch (error) {
      console.error("Error fetching content list:", error);
      showToast("Error fetching content list", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const getAssetList = async () => {
    try {
      setIsLoading(true);
      const resp = await __postApiData("/api/v1/admin/AssetList", {});
      if (resp.response.response_code === "200") {
        updateState({ AssetList: resp.data.list || [] });
      }
    } catch (error) {
      console.error("Error fetching AssetList list:", error);
      showToast("Error fetching asset list", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // for common api :__getCommenApiDataList
  const fetchDropdownData = async (lookupTypes, stateKey, parent_lookup_id) => {
    updateState({ isLoading: true });
    try {
      const data = await __getCommenApiDataList({
        lookup_type: lookupTypes,
        parent_lookup_id: parent_lookup_id || null,
      });
      updateState({ [stateKey]: data, isLoading: false });
    } catch (error) {
      updateState({ isLoading: false });
      console.error(error);
      showToast("Error fetching dropdown data", "error");
    }
  };

  useEffect(() => {
    getContentList();
    // Fetch dropdown data and set default for Content Type
    const initializeDropdowns = async () => {
      try {
        // Fetch Content Type data
        const contentTypeData = await __getCommenApiDataList({
          lookup_type: ["content_type"],
          parent_lookup_id: null,
        });

        // Find and set Digital CME as default
        const digitalCMEOption = contentTypeData.find(
          (item) => item.name === "Digital CME"
        );

        updateState({
          ContentType: contentTypeData,
          ContentTypeId: digitalCMEOption ? digitalCMEOption.id : "",
        });

        // Fetch Asset List data
        getAssetList();
      } catch (error) {
        console.error("Error initializing dropdowns:", error);
        showToast("Error initializing dropdowns", "error");
      }
    };

    initializeDropdowns();
  }, []);

  // DataGrid columns
  const columns = [
    {
      field: "sno",
      headerName: "S.No.",
      flex: 0.2,
      renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
    },
    { field: "ContentTitle", headerName: "Title", flex: 1 },
    { field: "GrantingBody", headerName: "Granting Body", flex: 1 },
    { field: "Date", headerName: "Date", flex: 1 },
    { field: "ContentPriority", headerName: "Priority", flex: 1 },
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
      content_id: row._id || null,
      AssetId: row.AssetId?._id || "",
      ContentTypeId: row.ContentTypeId?._id || "",
      ContentTitle: row.ContentTitle || "",
      GrantingBody: row.GrantingBody || "",
      Date: row.Date ? row.Date.split("T")[0] : "",
      ContentPriority: row.ContentPriority || "",
      ValidUpto: row.ValidUpto ? row.ValidUpto.split("T")[0] : "",
      ContentImage: row.ContentImage || "",
      ShortDescription: row.ShortDescription || "",
      LongDescription: row.LongDescription || "",
      MetaTags: row.MetaTags || [],
      PictureGallery: row.PictureGallery || [],
      VideoGallery: row.VideoGallery || [],
      References: row.References || [],
    });
  };

  const onDelete = async (id) => {
    console.log("Delete content with id:", id);
  };

  const rows = contentList?.map((content, index) => ({
    id: content._id || index,
    ...content,
  }));

  // Modified image upload function for multiple images
  const __handleUploadFile = async (file) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", file);
      __postApiData("/api/v1/common/AddImage", formData, "form")
        .then((res) => {
          console.log(res, "res");
          if (res.response.response_code === "200") {
            // Handle both single image and multiple images response
            let imageUrl;

            if (Array.isArray(res.data)) {
              // If response is an array, take the first image
              imageUrl = res.data[0]?.full_URL;
            } else if (res.data?.full_URL) {
              // If response is a single object
              imageUrl = res.data.full_URL;
            } else {
              // Fallback: try to access directly
              imageUrl = res.data;
            }

            if (imageUrl) {
              console.log("Uploaded image URL:", imageUrl);
              resolve(imageUrl);
            } else {
              reject(new Error("No image URL found in response"));
            }
          } else {
            reject(new Error(res.response.response_message || "Upload failed"));
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  // Handle multiple image upload for gallery
  const handleMultipleImageUpload = async (event, fieldName) => {
    const files = Array.from(event.target.files);
    const uploadPromises = files.map((file) => __handleUploadFile(file));

    try {
      // Set loading state
      updateState({ pictureGalleryLoading: true });

      const uploadedUrls = await Promise.all(uploadPromises);
      updateState({
        [fieldName]: [...state[fieldName], ...uploadedUrls],
        pictureGalleryLoading: false, // Clear loading state
      });
      showToast("Images uploaded successfully", "success");
    } catch (error) {
      console.error("Upload error:", error);
      updateState({ pictureGalleryLoading: false }); // Clear loading state on error
      showToast(error.message || "Failed to upload images", "error");
    }
  };

  // Handle single image upload
  const handleSingleImageUpload = async (event, fieldName) => {
    const file = event.target.files[0];
    if (file) {
      try {
        // Set loading state
        updateState({ contentImageLoading: true });

        const uploadedUrl = await __handleUploadFile(file);
        updateState({
          [fieldName]: uploadedUrl,
          contentImageLoading: false, // Clear loading state
        });
        showToast("Image uploaded successfully", "success");
      } catch (error) {
        console.error("Upload error:", error);
        updateState({ contentImageLoading: false }); // Clear loading state on error
        showToast(error.message || "Failed to upload image", "error");
      }
    }
  };

  // Remove image from gallery
  const removeImage = (index, fieldName) => {
    updateState({
      [fieldName]: state[fieldName].filter((_, i) => i !== index),
    });
  };

  // Handle form input changes (unified function for all inputs)
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateState({ [name]: value });
  };

  // Add meta tag
  const addMetaTag = () => {
    if (currentTag.trim()) {
      updateState({
        MetaTags: [...MetaTags, currentTag.trim()],
      });
      setCurrentTag("");
    }
  };

  // Remove meta tag
  const removeMetaTag = (index) => {
    updateState({
      MetaTags: MetaTags.filter((_, i) => i !== index),
    });
  };

  // Add reference
  const addReference = () => {
    if (currentReference.trim()) {
      updateState({
        References: [...References, currentReference.trim()],
      });
      setCurrentReference("");
    }
  };

  // Remove reference
  const removeReference = (index) => {
    updateState({
      References: References.filter((_, i) => i !== index),
    });
  };

  // Add video URL
  const addVideo = () => {
    if (currentVideo.trim()) {
      updateState({
        VideoGallery: [...VideoGallery, currentVideo.trim()],
      });
      setCurrentVideo("");
    }
  };

  // Remove video
  const removeVideo = (index) => {
    updateState({
      VideoGallery: VideoGallery.filter((_, i) => i !== index),
    });
  };

  const __handleSaveContent = (e) => {
    e.preventDefault();

    // Validation
    if (!AssetId) {
      showToast("Asset is required", "warning");
      return;
    }
    if (!ContentTypeId) {
      showToast("Content Type is required", "warning");
      return;
    }
    if (!ContentTitle) {
      showToast("Content Title is required", "warning");
      return;
    }

    const payload = {
      _id: content_id || null,
      AssetId: AssetId || null,
      ContentTypeId: ContentTypeId || null,
      ContentTitle,
      GrantingBody,
      Date,
      ContentPriority,
      ValidUpto,
      ContentImage,
      ShortDescription,
      LongDescription,
      MetaTags,
      PictureGallery,
      VideoGallery,
      References,
    };

    updateState({ isLoading: true });
    __postApiData("/api/v1/admin/SaveContent", payload)
      .then((res) => {
        if (res.response.response_code === "200") {
          showToast(
            content_id
              ? "Content updated successfully!"
              : "Content added successfully!",
            "success"
          );
          getContentList(); // Refresh the content list
          // Reset form state
          updateState({
            isLoading: false,
            content_id: null,
            AssetId: "",
            ContentTypeId: "",
            ContentTitle: "",
            GrantingBody: "",
            Date: "",
            ContentPriority: "",
            ValidUpto: "",
            ContentImage: "",
            ShortDescription: "",
            LongDescription: "",
            MetaTags: [],
            PictureGallery: [],
            VideoGallery: [],
            References: [],
          });
          setCurrentTag("");
          setCurrentReference("");
          setCurrentVideo("");
        } else {
          updateState({ isLoading: false });
          showToast(
            res.response.response_message ||
              "Failed to save content. Please try again.",
            "error"
          );
        }
      })
      .catch((error) => {
        console.error("Error saving content:", error);
        showToast(
          error.message || "Failed to save content. Please try again.",
          "error"
        );
        updateState({ isLoading: false });
      });
  };

  return (
    <div>
      <Adminsidebar />
      <Adminheader />
      <div className="station-master">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-800">Content Master</h1>
          <div className="flex items-center justify-between">
            <div className="grid w-full grid-cols-6 gap-6 mx-auto lg:grid-cols-12">
              {/* Form Section */}
              <div className="col-span-12 px-3 py-3 bg-white border rounded-xl lg:col-span-5">
                <form
                  onSubmit={__handleSaveContent}
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

                  {/* Content Type Dropdown */}
                  <FormControl fullWidth>
                    <InputLabel id="content-type-label">
                      Content Type
                    </InputLabel>
                    <Select
                      MenuProps={{
                        disablePortal: true,
                        disableScrollLock: true,
                      }}
                      labelId="content-type-label"
                      name="ContentTypeId"
                      value={ContentTypeId || ""}
                      onChange={handleChange}
                      label="Content Type"
                    >
                      <MenuItem value="">
                        <em>Select Content Type</em>
                      </MenuItem>
                      {ContentType.map((type) => (
                        <MenuItem key={type.id} value={type.id}>
                          {type.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {/* Content Title */}
                  <TextField
                    label="Content Title"
                    name="ContentTitle"
                    value={ContentTitle}
                    onChange={handleChange}
                    fullWidth
                    required
                  />

                  {/* Granting Body */}
                  <TextField
                    label="Granting Body"
                    name="GrantingBody"
                    value={GrantingBody}
                    onChange={handleChange}
                    fullWidth
                  />

                  {/* Date and Content Priority */}
                  <div className="grid grid-cols-2 gap-4">
                    <TextField
                      label="Date"
                      name="Date"
                      type="date"
                      value={Date}
                      onChange={handleChange}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                    <FormControl fullWidth>
                      <InputLabel id="priority-label">
                        Content Priority
                      </InputLabel>
                      <Select
                        MenuProps={{
                          disablePortal: true,
                          disableScrollLock: true,
                        }}
                        labelId="priority-label"
                        name="ContentPriority"
                        value={ContentPriority || ""}
                        onChange={handleChange}
                        label="Content Priority"
                      >
                        <MenuItem value="">
                          <em>Select Priority</em>
                        </MenuItem>
                        <MenuItem value="High">High</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="Low">Low</MenuItem>
                      </Select>
                    </FormControl>
                  </div>

                  {/* Valid Upto */}
                  <TextField
                    label="Valid Upto"
                    name="ValidUpto"
                    type="date"
                    value={ValidUpto}
                    onChange={handleChange}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />

                  {/* Content Image Upload */}
                  <div className="space-y-2">
                    <Typography variant="subtitle1" className="text-gray-700">
                      Content Image
                    </Typography>
                    <div className="flex items-center space-x-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleSingleImageUpload(e, "ContentImage")
                        }
                        style={{ display: "none" }}
                        id="content-image-upload"
                        disabled={contentImageLoading}
                      />
                      <label htmlFor="content-image-upload">
                        <Button
                          variant="outlined"
                          component="span"
                          startIcon={
                            contentImageLoading ? (
                              <CircularProgress size={20} />
                            ) : (
                              <CloudUploadIcon />
                            )
                          }
                          disabled={contentImageLoading}
                          className="cursor-pointer"
                        >
                          {contentImageLoading
                            ? "Uploading..."
                            : "Upload Image"}
                        </Button>
                      </label>
                    </div>
                    {ContentImage && (
                      <div className="relative w-32 h-32">
                        <img
                          src={ContentImage}
                          alt="Content"
                          className="object-cover w-full h-full border rounded"
                        />
                        <IconButton
                          onClick={() => updateState({ ContentImage: "" })}
                          className="absolute text-white bg-red-500 top-1 right-1"
                          size="small"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </div>
                    )}
                  </div>

                  {/* Short Description */}
                  <TextField
                    label="Short Description"
                    name="ShortDescription"
                    value={ShortDescription}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={3}
                  />

                  {/* Long Description */}
                  <TextField
                    label="Long Description"
                    name="LongDescription"
                    value={LongDescription}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={4}
                  />

                  {/* Meta Tags Section */}
                  <div className="space-y-2">
                    <Typography variant="subtitle1" className="text-gray-700">
                      Meta Tags
                    </Typography>
                    <div className="flex space-x-2">
                      <TextField
                        label="Add Meta Tag"
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        fullWidth
                        size="small"
                      />
                      <Button
                        onClick={addMetaTag}
                        variant="outlined"
                        startIcon={<AddIcon />}
                      >
                        Add
                      </Button>
                    </div>
                    {MetaTags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {MetaTags.map((tag, index) => (
                          <Chip
                            key={index}
                            label={tag}
                            onDelete={() => removeMetaTag(index)}
                            color="primary"
                            variant="outlined"
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Picture Gallery Upload */}
                  <div className="space-y-2">
                    <Typography variant="subtitle1" className="text-gray-700">
                      Picture Gallery
                    </Typography>
                    <div className="flex items-center space-x-2">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) =>
                          handleMultipleImageUpload(e, "PictureGallery")
                        }
                        style={{ display: "none" }}
                        id="picture-gallery-upload"
                        disabled={pictureGalleryLoading}
                      />
                      <label htmlFor="picture-gallery-upload">
                        <Button
                          variant="outlined"
                          component="span"
                          startIcon={
                            pictureGalleryLoading ? (
                              <CircularProgress size={20} />
                            ) : (
                              <CloudUploadIcon />
                            )
                          }
                          disabled={pictureGalleryLoading}
                          className="cursor-pointer"
                        >
                          {pictureGalleryLoading
                            ? "Uploading..."
                            : "Upload Images"}
                        </Button>
                      </label>
                    </div>
                    {PictureGallery.length > 0 && (
                      <div className="grid grid-cols-2 gap-2">
                        {PictureGallery.map((url, index) => (
                          <div key={index} className="relative">
                            <img
                              src={url}
                              alt={`Gallery ${index + 1}`}
                              className="object-cover w-full h-32 border rounded"
                            />
                            <IconButton
                              onClick={() =>
                                removeImage(index, "PictureGallery")
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

                  {/* Video Gallery Section */}
                  <div className="space-y-2">
                    <Typography variant="subtitle1" className="text-gray-700">
                      Video Gallery
                    </Typography>
                    <div className="flex space-x-2">
                      <TextField
                        label="Add Video URL"
                        value={currentVideo}
                        onChange={(e) => setCurrentVideo(e.target.value)}
                        fullWidth
                        size="small"
                      />
                      <Button
                        onClick={addVideo}
                        variant="outlined"
                        startIcon={<AddIcon />}
                      >
                        Add
                      </Button>
                    </div>
                    {VideoGallery.length > 0 && (
                      <div className="space-y-2">
                        {VideoGallery.map((url, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 rounded bg-gray-50"
                          >
                            <span className="text-sm truncate">{url}</span>
                            <IconButton
                              onClick={() => removeVideo(index)}
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

                  {/* References Section */}
                  <div className="space-y-2">
                    <Typography variant="subtitle1" className="text-gray-700">
                      References
                    </Typography>
                    <div className="flex space-x-2">
                      <TextField
                        label="Add Reference"
                        value={currentReference}
                        onChange={(e) => setCurrentReference(e.target.value)}
                        fullWidth
                        size="small"
                      />
                      <Button
                        onClick={addReference}
                        variant="outlined"
                        startIcon={<AddIcon />}
                      >
                        Add
                      </Button>
                    </div>
                    {References.length > 0 && (
                      <div className="space-y-2">
                        {References.map((ref, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 rounded bg-gray-50"
                          >
                            <span className="text-sm">{ref}</span>
                            <IconButton
                              onClick={() => removeReference(index)}
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

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isLoading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : content_id ? (
                      "Update Content"
                    ) : (
                      "Save Content"
                    )}
                  </Button>
                </form>
              </div>

              {/* Data Grid Section */}
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
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <Snackbar
        open={toast.open}
        autoHideDuration={6000}
        onClose={hideToast}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={hideToast}
          severity={toast.severity}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>

      {isLoading && <UniqueLoader />}
    </div>
  );
}

export default ContentMaster;
