import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Divider } from "@mui/material";
import axios from "axios";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: 1,
}));

export default function NewCategory() {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
    snackOpen(false);
  };

  const navigate = useNavigate();

  const handleClick = (e) => {
    console.log("click");
  };

  // for error snackbar
  const openerror = () => {
    setErrorOpen(true);
    errorOpen(true);
  };

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorOpen(false);
    errorOpen(false);
  };

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [image, setImage] = React.useState("https://picsum.photos/200/300");
  const [successSnack, setSuccessSnack] = React.useState(false); //Snackbar state for success
  const [snackOpen, setSnackOpen] = React.useState(false);

  const [errorSnack, setErrorSnack] = React.useState(false); //Snackbar state for error
  const [errorOpen, setErrorOpen] = React.useState(false);

  //Axios POST request
  const handleSubmit = (e) => {
    console.log("submit");
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/categories`, {
        name: title,
        description: description,
        image: image,
      })
      .then((res) => {
        console.log(res);
        setSuccessSnack(res.data.message);
        setSnackOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setErrorSnack(err.response.data.message);
        setErrorOpen(true);
      });
  };

  return (
    <Box sx={{ flexGrow: 1, marginTop: 3 }}>
      <AppBar position="static">
        <Toolbar variant="dense" sx={{ background: "#333" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate("/categories")}
          >
            <CloseIcon />
          </IconButton>

          <Divider sx={{ flexGrow: 1 }} />
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
        </Toolbar>
      </AppBar>

      <Grid container spacing={1} alignItems="stretch">
        <Grid item xs={12} alignItems="stretch">
          <Item
            onDoubleClick={handleClick}
            sx={{
              height: "86vh",
            }}
          >
            {/* Category Name */}
            <TextField
              id="outlined-basic"
              placeholder="Category Name"
              label="Categry Name"
              focused={true}
              name={title}
              onChange={(e) => setTitle(e.target.value)}
              minRows={6}
              variant="filled"
              sx={{
                width: "100%",
                color: "#fff",
                backgroundColor: "#f0f0f0",
                outline: "none",
                border: "none",
                fontSize: "1.2rem",
                placeholder: "Enter Page Title",
                placeholderColor: "#fff",
              }}
            />
            {/* Product Content */}
            <TextField
              id="outlined-basic"
              placeholder="Category Description"
              label="Category Description"
              focused={true}
              name={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline={true}
              minRows={6}
              variant="filled"
              sx={{
                width: "100%",
                color: "#fff",
                backgroundColor: "#f0f0f0",
                outline: "none",
                border: "none",
                fontSize: "1.2rem",
                placeholder: "Enter Page Title",
                placeholderColor: "#fff",
                marginTop: 1,
              }}
            />

            {/* Product Content */}
            <TextField
              id="outlined-basic"
              placeholder="Category Image"
              label="Category Image"
              focused={true}
              size="small"
              variant="filled"
              sx={{
                width: "100%",
                color: "#fff",
                backgroundColor: "#f0f0f0",
                outline: "none",
                border: "none",
                fontSize: "1.2rem",
                placeholder: "Enter Page Title",
                placeholderColor: "#fff",
                marginTop: 2,
              }}
              onChange={(e) => setImage(e.target.value)}
            />
          </Item>
        </Grid>
        <Snackbar
          open={snackOpen}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {successSnack}
          </Alert>
        </Snackbar>
        <Snackbar
          open={errorOpen}
          autoHideDuration={3000}
          onClose={handleCloseError}
        >
          <Alert severity="warning">{errorSnack}</Alert>
        </Snackbar>
      </Grid>
    </Box>
  );
}
