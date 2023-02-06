import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import MuiAlert from "@mui/material/Alert";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import AddIcon from "@mui/icons-material/Add";
import { Button, Divider } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  // color: "#fff",
  // backgroundColor: "#0000009E",
}));

export default function ViewMedia() {
  const [files, setFiles] = React.useState([]);
  const [dir, setDir] = React.useState([]);
  const [server_alert, setAlert] = useState();
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = useState();

  // code to get image
  const [image, setImage] = useState("");
  const getProducts = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/products/company/HarshaWeb`)
      .then((response) => {
        console.log(response.data);
        setImage(response.data);
      });
  };

  React.useEffect(() => {
    getProducts();
  }, []);

  const navigate = useNavigate();

  // Files Data
  async function getFileData() {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/storage/uploaded_files`)
      .then((response) => {
        setFiles(response.data);
      });
  }

  //Delete Post
  async function deleteOneFile(item) {
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/storage/delete`, {
        name: item.name,
      })
      .then((res) => {
        setAlert("File successfully Deleted", res);
        setStatus("success");
        getFileData();
      })
      .catch((e) => {
        setAlert(e.response.data.message);
        setStatus(e.response.data.status);
      });
    setOpen(true);
  }

  // Directory Data
  React.useEffect(() => {
    getFileData();
  }, []);

  async function getDirectoryData() {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/storage/dir`)
      .then((response) => {
        setDir(response.data);
      });
  }

  //get directory data path
  React.useEffect(() => {
    getDirectoryData();
  }, []);

  // if (!files) return null;

  //Copy Link on Button Click
  const handleCopyClick = (item) => {
    setAlert("Link copied successfully");
    setStatus("success");
    navigator.clipboard.writeText(item.path);
    setOpen(true);
  };

  //On Click Open New Tab
  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const onClickUrl = (url) => {
    return () => openInNewTab(url);
  };

  //Alert
  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
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

  return (
    <Box sx={{ flexGrow: 1, mt: 3 }}>
      <AppBar position="static">
        <Toolbar variant="dense" sx={{ background: "#333", color: "#fff" }}>
          <Typography variant="h6" color="inherit" component="div">
            View Images
          </Typography>
          <Divider sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>

      <Snackbar
        open={open}
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
      <Paper
        sx={{ boxShadow: 0, borderRadius: 1, background: "#e3e3e3", p: 1 }}
      >
        {/* Grid container for images card  */}
        <Grid container spacing={2}>
          {image &&
            image.map((item) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                  <Item
                    sx={{
                      maxWidth: "450px",
                      minWidth: "200px",
                    }}
                  >
                    <Card
                      sx={{
                        height: 250,
                        boxShadow: 0,
                        border: "1px solid #1A2027",
                        background: "#0000009E",
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="150"
                        width="150"
                        image={item.image}
                        style={{
                          objectFit: "contain",
                        }}
                      />
                      <CardContent>
                        <Typography
                          sx={{
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            maxWidth: "25ch",
                            minWidth: "25ch",
                            textOverflow: "ellipsis",
                            justifyContent: "left",
                            textAlign: "left",
                            color: "#fff",
                          }}
                        >
                          {item.title}
                        </Typography>
                      </CardContent>

                      <CardActions
                        sx={{
                          margin: 0,
                          padding: 0,
                          marginLeft: 1,
                          marginRight: 1,
                        }}
                      >
                        <Tooltip title="View">
                          <IconButton
                            size="small"
                            sx={{
                              backgroundColor: "#00000021",
                              color: "#fff",
                              border: "1px solid #fff",
                            }}
                          >
                            <RemoveRedEyeOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Copy Link">
                          <IconButton
                            size="small"
                            sx={{
                              backgroundColor: "#00000021",
                              color: "#fff",
                              border: "1px solid #fff",
                            }}
                          >
                            <LinkOutlinedIcon />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            sx={{
                              backgroundColor: "#00000021",
                              color: "#fff",
                              border: "1px solid #fff",
                            }}
                          >
                            <DeleteTwoToneIcon />
                          </IconButton>
                        </Tooltip>
                      </CardActions>
                    </Card>
                  </Item>
                </Grid>
              );
            })}
        </Grid>
      </Paper>
    </Box>
  );
}
