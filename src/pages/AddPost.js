import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import axios from "axios";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import AppBar from "@mui/material/AppBar";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { Link as RouterLink } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  // color: "#ffffff",
  // backgroundColor: "#1A2027",
}));

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");

  const [server_alert, setAlert] = useState();
  const [status, setStatus] = useState();
  const [rows, setBlogs] = React.useState([]);
  const [openAlert, setAlertOpen] = React.useState(false);
  const [loading, setLoading] = useState(true);

  //Get all categories
  function getBlogsData() {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/blogs`).then((response) => {
      setBlogs(response.data);
    });
  }

  React.useEffect(() => {
    getBlogsData();
    getCategories();
    setLoading(false);
  }, []);

  //Post new category
  const createPost = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/blogs`, {
        title,
        description,
        content,
        category,
        image,
      })
      .then((res) => {
        setAlert("Post successfully added", res);
        setStatus("success");
        getBlogsData();
        setAlertOpen(true);
      })
      .catch((e) => {
        setAlert(e.response.data.message);
        setStatus(e.response.data.status);
        setAlertOpen(true);
      });
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [category, setCategory] = React.useState("");

  //Axios request for category list
  const [categories, setCategories] = React.useState([]);
  const getCategories = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/categories`)
      .then((response) => {
        setCategories(response.data);
      });
  };

  return (
    <Box sx={{ marginTop: 3 }}>
      {/* Alert */}
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Snackbar
          open={openAlert}
          autoHideDuration={3000}
          resumeHideDuration={3000}
          action={action}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={status} sx={{ width: "100%" }}>
            {server_alert}
          </Alert>
        </Snackbar>
      </Stack>
      {/* Alert */}
      <AppBar
        variant="dense"
        sx={{ position: "relative" }}
      >
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="close"
            to={`/posts`}
            component={RouterLink}
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Create Blog
          </Typography>
          <Button
            size="small"
            variant="contained"
            color="success"
            onClick={createPost}
          >
            Publish
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 3, }}>
        <Grid container spacing={0.2}>
          <Grid item xs={12}>
            <TextField id="outlined-basic" placeholder="Active default" label="Status" focused={true} variant="filled" size="small" sx={{
              width: "100%",
              color: "#fff",
              // backgroundColor: "#f0f0f0",
              outline: "none",
              border: "none",
              fontSize: "1rem",
              placeholder: "Enter Page Title",
              placeholderColor: "#fff",
              marginTop: 1,
            }} />
          </Grid>
          <Grid item xs={12}>
            <TextField id="outlined-basic" placeholder="Active default" label="Status" focused={true} variant="filled" size="small" sx={{
              width: "100%",
              color: "#fff",
              // backgroundColor: "#f0f0f0",
              outline: "none",
              border: "none",
              fontSize: "1rem",
              placeholder: "Enter Page Title",
              placeholderColor: "#fff",
              marginTop: 1,
            }} />
          </Grid>
          <Grid item xs={12}>
            {/* <TextField
              id="outlined-basic"
              hiddenLabel
              placeholder="Content"
              variant="filled"
              size="small"
              fullWidth
              multiline
              rows={15}
              value={content}
              sx={{ background: "#333", borderRadius: 1 }}
              onChange={(e) => setContent(e.target.value)}
              inputProps={{ style: { color: "#fff" } }}
            /> */}

            <TextField id="outlined-basic" multiline rows={15} placeholder="Active default" label="Status" focused={true} variant="filled" size="small" sx={{
              width: "100%",
              color: "#fff",
              // backgroundColor: "#f0f0f0",
              outline: "none",
              border: "none",
              fontSize: "1rem",
              placeholder: "Enter Page Title",
              placeholderColor: "#fff",
              marginTop: 1,
            }} />
          </Grid>
          <Grid item xs={12}>
            <FormControl
              fullWidth
              sx={{
                // background: "#f0f0f0",
                textAlign: "left",
              }}
            >
              <Select
                defaultValue={0}
                value={category}
                size="small"
                focused={true}
                hiddenLabel
                onChange={(e) => setCategory(e.target.value)}
                inputProps={{
                  style: {
                    color: "#fff",
                    // backgroundColor: "#f0f0f0",
                    borderRadius: 1,
                    outline: "none",
                  },
                }}
                sx={{
                  // backgroundColor: "#f0f0f0",
                  borderRadius: 1,
                  color: "#000",
                  outline: "none",
                  border: "none",
                }}
              >
                <MenuItem value={0}>Select Category</MenuItem>
                {categories !== null ? (
                  categories.map((category) => (
                    // <option key={category._id} value={category.name}>
                    //   {category.name}
                    // </option>
                    <MenuItem key={category._id} value={category.name}>
                      {category.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem>Loading...</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField id="outlined-basic" placeholder="Active default" label="Status" focused={true} variant="filled" size="small" sx={{
              width: "100%",
              // color: "#fff",
              // backgroundColor: "#f0f0f0",
              outline: "none",
              border: "none",
              fontSize: "1rem",
              placeholder: "Enter Page Title",
              // placeholderColor: "#fff",
              marginTop: 1,
            }} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}