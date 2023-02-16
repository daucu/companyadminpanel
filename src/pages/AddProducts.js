import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";

import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Autocomplete,
  CircularProgress,
  Divider,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import axios from "axios";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import TextField from "@mui/material/TextField";
import Loading from "./Loading";
import { useState } from "react";
const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: "#1A2027",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: 1,
}));

export default function AddProduct() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(null);

  const handleClick = (e) => {
    console.log("click");
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [video, setVideo] = useState("");
  const [video_thumbnail, setVideo_thumbnail] = useState("");
  const [gallery, setGallery] = useState("");
  const [tags, setTags] = useState([]);

  //Axios POST request

  const [successSnack, setSuccessSnack] = React.useState(false);
  const [successOpen, setSuccessOpen] = React.useState(false);

  // success snackbar
  const handlesuccessOpen = () => {
    setSuccessOpen(true);
  };
  const handlesuccessClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessOpen(false);
  };

  // error snackbar

  //Generate Slug
  const slug = slugify(name, {
    replacement: "-", // replace spaces with replacement
    remove: null, // regex to remove characters
    lower: true, // result in lower case
    remove: /[*+~.()'"!:@#/]/g,
  });

  // const errorSnack
  const [geterror, setGeterror] = React.useState(false);
  const handleErrOpen = () => {
    setGeterror(true);
  };
  const handleErrClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setGeterror(false);
  };

  const handleVideoUpload = async (file) => {
    const formData = new FormData();
    formData.append("uploadedFile", file);

    let resp = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/storage`,
      formData
    );
    return resp.data.file_name;
  };
  const [btnLoading, setBtnLoading] = useState(false);
  const handleSubmit = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    let videoUpload = await handleVideoUpload(video);
    let videoThumbnailUpload = await handleVideoUpload(video_thumbnail);
    let galleryUpload = await handleVideoUpload(gallery);

    const sendData = {
      name,
      description,
      category,
      tags: tags,
      slug,
      video: videoUpload,
      video_thumbnail: videoThumbnailUpload,
      gallery: galleryUpload,
    };

    console.log(sendData);

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/products`, sendData, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        setBtnLoading(false);
        // setSuccessSnack(res.data.message);
        // handlesuccessOpen(true);
        toast.success(res.data.message);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setBtnLoading(false);
        // setGeterror(true);
        toast.error(err.response.data.message);
      });
  };
  // loading animation
  const [loadingGif, setLoadingGif] = React.useState(false);
  // code to get company profile data
  const [companyProfileData, setCompanyProfileData] = React.useState([]);
  const [prodLoading, setProdLoading] = React.useState(false);

  const getCompanyProfileData = async () => {
    setProdLoading(true);
    setLoadingGif(true);
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/profile/company`, {
        withCredentials: true,
      })
      .then((res) => {
        setProdLoading(false);
        setCompanyProfileData(res.data[0].data);
      })
      .catch((e) => {
        console.log(e);
        setProdLoading(false);
      });
  };
  React.useEffect(() => {
    getCompanyProfileData();
  }, []);

  // code to get categories and map them to the select option
  const [categories, setCategories] = React.useState([]);
  const getAllCategories = async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/categories`)
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  React.useEffect(() => {
    getAllCategories();
  }, []);

  // code to get tags and map them to the select option
  const [fetchTags, setFetchTags] = useState([]);
  const getAllTags = async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/tags`)
      .then((res) => {
        console.log(res.data);
        setFetchTags(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  React.useEffect(() => {
    getAllTags();
  }, []);

  // code to post video , video thumbnail and gallery images

  return (
    <Box sx={{ flexGrow: 1, marginTop: 3 }}>
      {companyProfileData.isVerified !== true ? (
        <>
          <AppBar position="static">
            <Toolbar variant="dense" sx={{ background: "#333" }}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => navigate("/admin/products")}
              >
                <CloseIcon />
              </IconButton>

              {/* <input
                type={text}
                placeholder="Enter Page Title"
                value={name}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                  width: "60%",
                  height: "35px",
                  color: "#fff",
                  backgroundColor: "#00000000",
                  outline: "none",
                  border: "none",
                  fontSize: "1.2rem",
                  placeholder: "Enter Page Title",
                  placeholderColor: "#fff",
                }}
              /> */}

              <Divider sx={{ flexGrow: 1 }} />
              {/* <IconButton edge="start" color="inherit" aria-label="menu">
            <AddIcon />
          </IconButton> */}
              {btnLoading === true ? (
                <Button
                  variant="contained"
                  size="small"
                  color="success"
                  sx={{
                    boxShadow: 0,
                  }}
                  disabled
                >
                  <CircularProgress size={20} color="success" />
                </Button>
              ) : (
                <Button
                  variant="contained"
                  size="small"
                  color="success"
                  sx={{
                    boxShadow: 0,
                  }}
                  onClick={handleSubmit}
                >
                  Publish
                </Button>
              )}
            </Toolbar>
          </AppBar>
          {prodLoading === true ? (
            <>
              <Grid
                container
                spacing={2}
                sx={{
                  width: "100%",
                  height: "100%",
                  marginTop: 0,
                  paddingBottom: 4,
                  paddingTop: 2,
                  paddingLeft: 2,
                  paddingRight: 2,
                }}
              >
                <Grid item xs={12}>
                  <LinearProgress />
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              {" "}
              <Grid container spacing={1} alignItems="stretch">
                <Grid item xs={12} alignItems="stretch">
                  <form onSubmit={(e) => handleSubmit(e)}>
                    <Item
                      onDoubleClick={handleClick}
                      sx={{
                        height: "auto",
                      }}
                    >
                      {/* Product title */}
                      <TextField
                        id="outlined-basic"
                        placeholder="Product name"
                        label="Product name"
                        size="small"
                        name={name}
                        onChange={(e) => setName(e.target.value)}
                        minRows={6}
                        variant="outlined"
                        sx={{
                          width: "100%",
                          color: "#fff",

                          outline: "none",
                          border: "none",
                          fontSize: "1.2rem",
                          placeholder: "Enter Page Title",
                          placeholderColor: "#fff",
                        }}
                      />
                      {/* Product Description */}
                      <TextField
                        id="outlined-basic"
                        placeholder="Product content"
                        label="Product Description"
                        multiline={true}
                        name={description}
                        onChange={(e) => setDescription(e.target.value)}
                        minRows={6}
                        variant="outlined"
                        sx={{
                          width: "100%",
                          color: "#fff",

                          outline: "none",
                          border: "none",
                          fontSize: "1.2rem",
                          placeholder: "Enter Page Title",
                          placeholderColor: "#fff",
                          marginTop: 1,
                        }}
                      />
                      {/* Map the categories into select dropdown optioin */}

                      <InputLabel
                        sx={{
                          textAlign: "left",
                          marginTop: 1,
                        }}
                        id="demo-simple-select-outlined-label"
                      >
                        Category
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        size="small"
                        id="demo-simple-select-outlined"
                        value={category}
                        name={category}
                        sx={{
                          width: "100%",
                          textAlign: "left",
                        }}
                        onChange={(e) => setCategory(e.target.value)}
                        label="Category"
                      >
                        {categories.map((category) => (
                          <MenuItem value={category.id}>
                            {category.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {/* video input */}
                      <InputLabel
                        sx={{
                          textAlign: "left",
                          marginTop: 1,
                        }}
                        id="demo-simple-select-outlined-label"
                      >
                        Video
                      </InputLabel>
                      <TextField
                        id="outlined-basic"
                        type={"file"}
                        size="small"
                        name={video}
                        onChange={(e) => setVideo(e.target.files[0])}
                        sx={{
                          width: "100%",
                          marginTop: 1,
                        }}
                      />
                      <InputLabel
                        sx={{
                          textAlign: "left",
                          marginTop: 1,
                        }}
                        id="demo-simple-select-outlined-label"
                      >
                        Video Thumbnail
                      </InputLabel>
                      <TextField
                        id="outlined-basic"
                        type={"file"}
                        name={video_thumbnail}
                        onChange={(e) => setVideo_thumbnail(e.target.files[0])}
                        size="small"
                        sx={{
                          width: "100%",
                          marginTop: 1,
                        }}
                      />
                      <InputLabel
                        sx={{
                          textAlign: "left",
                          marginTop: 1,
                        }}
                        id="demo-simple-select-outlined-label"
                      >
                        Gallery
                      </InputLabel>
                      <TextField
                        id="outlined-basic"
                        type={"file"}
                        name={gallery}
                        onChange={(e) => setGallery(e.target.files[0])}
                        size="small"
                        sx={{
                          width: "100%",
                          marginTop: 1,
                        }}
                      />
                      {/* map tags in select menu  */}
                      <InputLabel
                        sx={{
                          textAlign: "left",
                          marginTop: 2,
                        }}
                        id="demo-simple-select-outlined-label"
                      >
                        Tags
                      </InputLabel>
                      {/* map tags in autocomplete selct menu option with chip  */}
                      <Autocomplete
                        multiple
                        id="tags-standard"
                        options={fetchTags}
                        getOptionLabel={(option) => option.name}
                        onChange={(e, value) =>
                          setTags(value.map((tag) => tag.id))
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="standard"
                            size="small"
                            sx={{
                              width: "100%",
                              marginTop: 1,
                            }}
                          />
                        )}
                      />
                      {/* map tags in select menu  */}
                    </Item>
                  </form>
                </Grid>
                {/* success snach */}
                {successSnack ? (
                  <Snackbar
                    open={handlesuccessOpen}
                    autoHideDuration={3000}
                    onClose={handlesuccessClose}
                    position="right"
                    variant="success"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  >
                    <Alert
                      onClose={handlesuccessClose}
                      severity="success"
                      variant="filled"
                      sx={{ width: "100%" }}
                    >
                      {successSnack}
                    </Alert>
                  </Snackbar>
                ) : null}

                {/* error snack */}
                {geterror === true ? (
                  <Snackbar
                    open={handleErrOpen}
                    autoHideDuration={3000}
                    onClose={handleErrClose}
                    position="right"
                    // dark mode
                    variant="contained"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  >
                    <Alert
                      onClose={handleErrClose}
                      severity="error"
                      variant="filled"
                      sx={{ width: "100%" }}
                    >
                      Error in adding product
                    </Alert>
                  </Snackbar>
                ) : null}
              </Grid>
            </>
          )}
        </>
      ) : (
        <>
          <AppBar position="static">
            <Toolbar variant="dense" sx={{ background: "#333" }}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => navigate("/admin/products")}
              >
                <CloseIcon />
              </IconButton>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: "60%",
                  height: "35px",
                  color: "#fff",
                  backgroundColor: "#00000000",
                  outline: "none",
                  border: "none",
                  fontSize: "1.2rem",
                  placeholder: "Enter Page Title",
                  placeholderColor: "#fff",
                }}
              />

              <Divider sx={{ flexGrow: 1 }} />
              {/* <IconButton edge="start" color="inherit" aria-label="menu">
            <AddIcon />
          </IconButton> */}
            </Toolbar>
          </AppBar>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              minHeight: "70vh",
            }}
          >
            <div
              style={{
                fontSize: "22px",
                fontWeight: "semibold",
              }}
            >
              Please Verify you company details before adding products
            </div>
          </div>
        </>
      )}
    </Box>
  );
}
