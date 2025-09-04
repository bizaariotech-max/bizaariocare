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

function ContentMaster() {
  const [isLoading, setIsLoading] = useState(false);
  const [contentList, setContentList] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [currentReference, setCurrentReference] = useState("");
  const [currentVideo, setCurrentVideo] = useState("");

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
    } finally {
      setIsLoading(false);
    }
  };

  const getAssetList = async () => {
    try {
      setIsLoading(true);
      //   const resp = await api.post("api/v1/admin/AssetList", {});
      const resp = await __postApiData("/api/v1/admin/AssetList", {});
      if (resp.response.response_code === "200") {
        updateState({ AssetList: resp.data.list || [] });
      }
    } catch (error) {
      console.error("Error fetching AssetList list:", error);
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
    }
  };

  //   useEffect(() => {
  //     getContentList();
  //     getAssetList();
  //     fetchDropdownData(["content_type"], "ContentType");
  //     // fetchDropdownData(["asset_list"], "AssetList");
  //   }, []);

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
        //   fetchDropdownData(["asset_list"], "AssetList");
        getAssetList();
      } catch (error) {
        console.error("Error initializing dropdowns:", error);
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
    } catch (error) {
      console.error("Upload error:", error);
      updateState({ pictureGalleryLoading: false }); // Clear loading state on error
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: error.message || "Failed to upload images",
      });
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
      } catch (error) {
        console.error("Upload error:", error);
        updateState({ contentImageLoading: false }); // Clear loading state on error
        Swal.fire({
          icon: "error",
          title: "Upload Failed",
          text: error.message || "Failed to upload image",
        });
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

    // Validation (uncomment and modify as needed)
    if (!AssetId) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Asset is required",
      });
      return;
    }
    if (!ContentTypeId) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Content Type is required",
      });
      return;
    }
    if (!ContentTitle) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Content Title is required",
      });
      return;
    }

    const payload = {
      _id: content_id || null,
      // ...(ParentStationId ? { ParentStationId } : { ParentStationId: null }),
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
    // api.post("api/v1/admin/SaveContent", payload)
    __postApiData("/api/v1/admin/SaveContent", payload)
      .then((res) => {
        if (res.response.response_code === "200") {
          Swal.fire({
            icon: "success",
            title: "Content Added",
            text: "Content added successfully...",
            showConfirmButton: true,
            customClass: {
              confirmButton: "my-swal-button",
            },
          }).then(() => {
            getContentList(); // Refresh the content list
            // Reset form state
            updateState({
              isLoading: false,
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
          });
        } else {
          updateState({ isLoading: false });
          Swal.fire({
            icon: "error",
            title: "Error",
            text:
              res.response.response_message ||
              "Failed to save content. Please try again.",
          });
        }
      })
      .catch((error) => {
        console.error("Error saving content:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message || "Failed to save content. Please try again.",
        });
        updateState({ isLoading: false });
      });
  };

  return (
    <div>
      <Adminsidebar />
      <Adminheader />
      <div className="station-master">
        <div className="profile-header">
          <h3>Enter Details for Content Master</h3>
          <p>
            Add or update the required details for the content master to keep
            records accurate and complete.
          </p>
        </div>

        <div
          // className="doctorform"
          style={
            {
              // marginLeft: "-200px"
            }
          }
        >
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
                <>
                  {/* ===== Left: FORM ===== */}
                  <Box
                    component="form"
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
                    <FormControl fullWidth size="small">
                      <InputLabel>Asset</InputLabel>
                      <Select
                        name="AssetId"
                        label="Asset"
                        value={AssetId}
                        onChange={handleChange}
                        MenuProps={{
                          disablePortal: true,
                          disableScrollLock: true,
                          InputLabelProps: { shrink: true },
                        }}
                      >
                        {AssetList.map((asset) => (
                          <MenuItem key={asset._id} value={asset._id}>
                            {asset.AssetName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth size="small">
                      <InputLabel>Content Type</InputLabel>
                      <Select
                        name="ContentTypeId"
                        label="Content Type"
                        value={ContentTypeId}
                        onChange={handleChange}
                        MenuProps={{
                          disablePortal: true,
                          disableScrollLock: true,
                          InputLabelProps: { shrink: true },
                        }}
                      >
                        {ContentType.map((type) => (
                          <MenuItem key={type.id} value={type.id}>
                            {type.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="ContentTitle"
                        label="Content Title"
                        value={ContentTitle}
                        onChange={handleChange}
                        fullWidth
                        size="small"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="GrantingBody"
                        label="Granting Body"
                        value={GrantingBody}
                        onChange={handleChange}
                        fullWidth
                        size="small"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="Date"
                        label="Date"
                        type="date"
                        value={Date}
                        onChange={handleChange}
                        fullWidth
                        size="small"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Content Priority</InputLabel>
                        <Select
                          name="ContentPriority"
                          label="Content Priority"
                          value={ContentPriority}
                          onChange={handleChange}
                          MenuProps={{
                            disablePortal: true,
                            disableScrollLock: true,
                          }}
                        >
                          <MenuItem value="High">High</MenuItem>
                          <MenuItem value="Medium">Medium</MenuItem>
                          <MenuItem value="Low">Low</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="ValidUpto"
                        label="Valid Upto"
                        type="date"
                        value={ValidUpto}
                        onChange={handleChange}
                        fullWidth
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        // sx={{
                        //   "& .MuiInputLabel-root": {
                        //     transform: "translate(14px, -9px) scale(0.75)",
                        //   },
                        // }}
                      />
                    </Grid>

                    {/* Content Image */}
                    <Typography
                      variant="h6"
                      sx={{ mt: 3, mb: 2, fontWeight: 600 }}
                    >
                      Content Image
                    </Typography>

                    <Box
                      sx={{
                        border: "2px dashed #ccc",
                        borderRadius: 2,
                        p: 3,
                        textAlign: "center",
                        cursor: contentImageLoading ? "not-allowed" : "pointer",
                        "&:hover": {
                          borderColor: contentImageLoading
                            ? "#ccc"
                            : "primary.main",
                        },
                        opacity: contentImageLoading ? 0.7 : 1,
                      }}
                    >
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
                      <label
                        htmlFor="content-image-upload"
                        style={{
                          cursor: contentImageLoading
                            ? "not-allowed"
                            : "pointer",
                        }}
                      >
                        {contentImageLoading ? (
                          <>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                mb: 1,
                              }}
                            >
                              <CircularProgress size={48} />
                            </Box>
                            <Typography variant="body1" color="textSecondary">
                              Uploading image...
                            </Typography>
                          </>
                        ) : (
                          <>
                            <CloudUploadIcon
                              sx={{ fontSize: 48, color: "grey.400", mb: 1 }}
                            />
                            <Typography variant="body1" color="textSecondary">
                              Click to upload content image
                            </Typography>
                          </>
                        )}
                      </label>
                      {ContentImage && !contentImageLoading && (
                        <Box sx={{ mt: 2 }}>
                          <img
                            src={ContentImage}
                            alt="Content"
                            style={{
                              maxWidth: "100%",
                              height: "150px",
                              objectFit: "cover",
                              borderRadius: "8px",
                            }}
                          />
                        </Box>
                      )}
                    </Box>

                    {/* Descriptions */}
                    <Typography
                      variant="h6"
                      sx={{ mt: 3, mb: 2, fontWeight: 600 }}
                    >
                      Descriptions
                    </Typography>

                    {/* <Grid container spacing={2}>
                   ShortDescription and LongDescription
                  </Grid> */}
                    <Grid item xs={12} md={6}>
                      <TextField
                        name="ShortDescription"
                        label="Short Description"
                        value={ShortDescription}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={4}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        name="LongDescription"
                        label="Long Description"
                        value={LongDescription}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={4}
                        size="small"
                      />
                    </Grid>
                    {/* Meta Tags */}
                    <Typography
                      variant="h6"
                      sx={{ mt: 3, mb: 2, fontWeight: 600 }}
                    >
                      Meta Tags
                    </Typography>

                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                      <TextField
                        label="Add Meta Tag"
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        size="small"
                        sx={{ flex: 1 }}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            addMetaTag();
                          }
                        }}
                      />
                      <Button
                        variant="contained"
                        onClick={addMetaTag}
                        startIcon={<AddIcon />}
                        size="small"
                      >
                        Add
                      </Button>
                    </Box>

                    <Box
                      sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}
                    >
                      {MetaTags.map((tag, index) => (
                        <Chip
                          key={index}
                          label={tag}
                          onDelete={() => removeMetaTag(index)}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      ))}
                    </Box>

                    {/* Picture Gallery */}
                    <Typography
                      variant="h6"
                      sx={{ mt: 3, mb: 2, fontWeight: 600 }}
                    >
                      Picture Gallery
                    </Typography>

                    <Box
                      sx={{
                        border: "2px dashed #ccc",
                        borderRadius: 2,
                        p: 3,
                        textAlign: "center",
                        cursor: pictureGalleryLoading
                          ? "not-allowed"
                          : "pointer",
                        "&:hover": {
                          borderColor: pictureGalleryLoading
                            ? "#ccc"
                            : "primary.main",
                        },
                        opacity: pictureGalleryLoading ? 0.7 : 1,
                      }}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) =>
                          handleMultipleImageUpload(e, "PictureGallery")
                        }
                        style={{ display: "none" }}
                        id="gallery-upload"
                        disabled={pictureGalleryLoading}
                      />
                      <label
                        htmlFor="gallery-upload"
                        style={{
                          cursor: pictureGalleryLoading
                            ? "not-allowed"
                            : "pointer",
                        }}
                      >
                        {pictureGalleryLoading ? (
                          <>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                mb: 1,
                              }}
                            >
                              <CircularProgress size={48} />
                            </Box>
                            <Typography variant="body1" color="textSecondary">
                              Uploading images...
                            </Typography>
                          </>
                        ) : (
                          <>
                            <CloudUploadIcon
                              sx={{ fontSize: 48, color: "grey.400", mb: 1 }}
                            />
                            <Typography variant="body1" color="textSecondary">
                              Click to upload gallery images
                            </Typography>
                          </>
                        )}
                      </label>
                    </Box>

                    <Grid container spacing={2} sx={{ mt: 1 }}>
                      {PictureGallery.map((image, index) => (
                        <Grid item xs={6} sm={4} md={3} key={index}>
                          <Card sx={{ position: "relative" }}>
                            <img
                              src={image}
                              alt={`Gallery ${index + 1}`}
                              style={{
                                // width: "100%",
                                maxWidth: "120px",
                                height: "120px",
                                objectFit: "cover",
                              }}
                            />
                            <IconButton
                              sx={{
                                position: "absolute",
                                top: 5,
                                right: 5,
                                backgroundColor: "rgba(255,255,255,0.8)",
                                "&:hover": {
                                  backgroundColor: "rgba(255,255,255,0.9)",
                                },
                              }}
                              size="small"
                              onClick={() =>
                                removeImage(index, "PictureGallery")
                              }
                            >
                              <DeleteIcon fontSize="small" color="error" />
                            </IconButton>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>

                    {/* Video Gallery */}
                    <Typography
                      variant="h6"
                      sx={{ mt: 3, mb: 2, fontWeight: 600 }}
                    >
                      Video Gallery
                    </Typography>

                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                      <TextField
                        label="Add Video URL"
                        value={currentVideo}
                        onChange={(e) => setCurrentVideo(e.target.value)}
                        size="small"
                        sx={{ flex: 1 }}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            addVideo();
                          }
                        }}
                      />
                      <Button
                        variant="contained"
                        onClick={addVideo}
                        startIcon={<AddIcon />}
                        size="small"
                      >
                        Add
                      </Button>
                    </Box>

                    <Box sx={{ mt: 2 }}>
                      {VideoGallery.map((video, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 1,
                            p: 1,
                            border: "1px solid #ddd",
                            borderRadius: 1,
                          }}
                        >
                          <Typography sx={{ flex: 1, fontSize: "0.9rem" }}>
                            {video}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => removeVideo(index)}
                            color="error"
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      ))}
                    </Box>

                    {/* References */}
                    <Typography
                      variant="h6"
                      sx={{ mt: 3, mb: 2, fontWeight: 600 }}
                    >
                      References
                    </Typography>

                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                      <TextField
                        label="Add Reference"
                        value={currentReference}
                        onChange={(e) => setCurrentReference(e.target.value)}
                        size="small"
                        sx={{ flex: 1 }}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            addReference();
                          }
                        }}
                      />
                      <Button
                        variant="contained"
                        onClick={addReference}
                        startIcon={<AddIcon />}
                        size="small"
                      >
                        Add
                      </Button>
                    </Box>

                    <Box sx={{ mt: 2 }}>
                      {References.map((reference, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 1,
                            p: 1,
                            border: "1px solid #ddd",
                            borderRadius: 1,
                          }}
                        >
                          <Typography sx={{ flex: 1, fontSize: "0.9rem" }}>
                            {reference}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => removeReference(index)}
                            color="error"
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      ))}
                    </Box>

                    {/* Save Button */}
                    <Button
                      variant="contained"
                      onClick={__handleSaveContent}
                      sx={{
                        mt: 3,
                        py: 1.5,
                        fontSize: "1rem",
                        fontWeight: 600,
                        background:
                          "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                        "&:hover": {
                          background:
                            "linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)",
                        },
                      }}
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : "Save Content"}
                    </Button>
                  </Box>
                </>

                {/* ===== Right: LIST ===== */}
                {/* <Grid
                //   item
                //   xs={12}
                //   lg={6}
                //   sx={{
                //     background: "#fff",
                //     borderRadius: 3,
                //     p: { xs: 2, sm: 3, md: 4 },
                //     height: "fit-content",
                //   }}
                  item
                  xs={12}
                  md={5}
                  lg={6}
                  sx={{ mt: { xs: 3, md: 0 } }}
                >
                  <Typography
                    variant="h5"
                    sx={{ mb: 3, fontWeight: 600, color: "#333" }}
                  >
                    Content List
                  </Typography>

                  <Box
                    // sx={{ height: 600, width: "100%" }}
                    // className="rightsection"
                    component="form"
                    autoComplete="off"
                    // sx={{
                    //   background: "#fff",
                    //   borderRadius: 3,
                    //   // boxShadow: 3,
                    //   minWidth: 510,
                    //   maxWidth: 530,
                    //   p: { xs: 0, sm: 0, md: 0 },
                    //   mx: "auto",
                    //   display: "flex",
                    //   flexDirection: "column",
                    //   gap: 2, // spacing between inputs
                    // }}
                  >
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      pageSize={10}
                      rowsPerPageOptions={[10, 25, 50]}
                      disableSelectionOnClick
                      sx={{
                        "& .MuiDataGrid-root": {
                          border: "none",
                        },
                        "& .MuiDataGrid-cell": {
                          borderBottom: "1px solid #f0f0f0",
                        },
                        "& .MuiDataGrid-columnHeaders": {
                          backgroundColor: "#f8f9fa",
                          borderBottom: "2px solid #e9ecef",
                        },
                        "& .MuiDataGrid-virtualScroller": {
                          backgroundColor: "#ffffff",
                        },
                      }}
                    />
                  </Box>
                </Grid> */}
                <>
                  <Grid item xs={12} md={5} sx={{ mt: { xs: 3, md: 0 } }}>
                    <Box
                      className="rightsection"
                      component="form"
                      autoComplete="off"
                      sx={{
                        background: "#fff",
                        borderRadius: 3,
                        // boxShadow: 3,
                        //   minWidth: 510,
                        //   maxWidth: 530,
                        minWidth: 560,
                        maxWidth: 580,
                        p: { xs: 0, sm: 0, md: 0 },
                        mx: "auto",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2, // spacing between inputs
                      }}
                    >
                      <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={20}
                        // rowsPerPageOptions={[10, 25, 50]}
                        pageSizeOptions={[]} // removes the rows per page selector
                        disableSelectionOnClick
                        initialState={{
                          pagination: {
                            paginationModel: { pageSize: 10, page: 0 },
                          },
                        }}
                        // sx={{
                        //   "& .MuiDataGrid-root": {
                        //     border: "none",
                        //   },
                        //   "& .MuiDataGrid-cell": {
                        //     borderBottom: "1px solid #f0f0f0",
                        //   },
                        //   "& .MuiDataGrid-columnHeaders": {
                        //     backgroundColor: "#f8f9fa",
                        //     borderBottom: "2px solid #e9ecef",
                        //   },
                        //   "& .MuiDataGrid-virtualScroller": {
                        //     backgroundColor: "#ffffff",
                        //   },
                        // }}
                      />
                    </Box>
                  </Grid>
                </>
              </Grid>
            </Box>
          </Box>
        </div>
      </div>
      {isLoading && <UniqueLoader />}
    </div>
  );
}

export default ContentMaster;
