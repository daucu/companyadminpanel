import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Autocomplete,
  CircularProgress,
  Divider,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import axios from "axios";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import slugify from "slugify";
import TextField from "@mui/material/TextField";
import Loading from "./Loading";
import { useState } from "react";
import { toast } from "react-toastify";
const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: "#1A2027",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: 1,
}));

export default function UpdateProduct() {
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

  // code to get product data by id
  const [productData, setProductData] = React.useState([]);
  const getProductData = async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/products/${id}`)
      .then((res) => {
        console.log(res.data);
        setProductData(res.data);
        setName(res.data.name);
        setDescription(res.data.description);
        setCategory(res.data.category);
        setTags(res.data.tags);
        setSuccessOpen(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  React.useEffect(() => {
    getProductData();
  }, []);
  const { id } = useParams();

  const [btnLoading, setBtnLoading] = useState(false);

  const handleSubmit = async () => {
    setBtnLoading(true);
    let videoUpload = await handleVideoUpload(video);
    let videoThumbnailUpload = await handleVideoUpload(video_thumbnail);
    let galleryUpload = await handleVideoUpload(gallery);

    const sendData = {
      name,
      description,
      category,
      tags: tags,

      video: videoUpload,
      video_thumbnail: videoThumbnailUpload,
      gallery: galleryUpload,
    };

    console.log(sendData);

    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/products/${id}`, sendData, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        setBtnLoading(false);
        // setSuccessSnack(true);
        toast.success("Product Updated Successfully");
        // handlesuccessOpen();
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setBtnLoading(false);
        toast.error("Error in  Updating Product");
        // setGeterror(true);
      });
  };
  // loading animation
  const [loadingGif, setLoadingGif] = React.useState(false);
  // code to get company profile data
  const [companyProfileData, setCompanyProfileData] = React.useState([]);

  const getCompanyProfileData = async () => {
    setLoadingGif(true);
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/profile/company`, {
        withCredentials: true,
      })
      .then((res) => {
        setCompanyProfileData(res.data[0].data);
        setLoadingGif(false);
      })
      .catch((e) => {
        console.log(e);
        setLoadingGif(false);
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
          {loadingGif === true ? <Loading /> : null}

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

              <Divider sx={{ flexGrow: 1 }} />
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
                  Update
                </Button>
              )}
            </Toolbar>
          </AppBar>
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
                    size="small"
                    //  get value from the database
                    value={name}
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
                    multiline={true}
                    name={description}
                    value={description}
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
                      <MenuItem value={category.id}>{category.name}</MenuItem>
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
                    onChange={(e, value) => setTags(value.map((tag) => tag.id))}
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
            {successSnack === true ? (
              <Snackbar
                open={handlesuccessOpen}
                autoHideDuration={3000}
                variant="success"
                //  bottom right corner
                position="right"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                onClose={handlesuccessClose}
              >
                <Alert
                  onClose={handlesuccessClose}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  Product updated successfully
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
              >
                <Alert
                  onClose={handleErrClose}
                  severity="error"
                  sx={{ width: "100%" }}
                >
                  Error in adding product
                </Alert>
              </Snackbar>
            ) : null}
          </Grid>
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
