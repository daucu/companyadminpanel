import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import ShieldTwoToneIcon from "@mui/icons-material/ShieldTwoTone";
import { Avatar, Container, CssBaseline } from "@mui/material";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: 0,
}));

export default function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [logo, setLogo] = useState("https://picsum.photos/500/500");
  const [description, setDescription] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [google_map, setGoogle_map] = useState([]);
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  // code to get longitude and latitude from google map api
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const getlocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
          setStatus(null);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };
  useEffect(() => {
    getlocation();
  }, []);

  // success snackbar
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // error snackbar
  const [openError, setOpenError] = React.useState(false);
  const [errStatus, setErrStatus] = useState("");
  const handleClickError = () => {
    setOpenError(true);
  };

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };

  // code to submit form to backend
  // loading state
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    setLoading(true);

    e.preventDefault();
    const data = {
      fullName: fullName,
      logo: logo,
      description: description,
      username: username,
      email: email,
      phone: phone,
      country: country,
      google_map: [
        {
          lat: lat,
          lng: lng,
        },
      ],
      password: password,
      role: role,
    };

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/register`, data)
      .then((res) => {
        console.log(res);
        setLoading(false);
        handleClick();
        setTimeout(() => {
          navigate("/");
        }, [2000]);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);

        setErrStatus(err.response.data.message);
        handleClickError();
      });
  };

  return (
    <div
      style={{
        backgroundColor: "#E2EBF0",
        minHeight: "100vh",
        height: "auto",
        padding: "30px 10px",
        // media query
        "@media (max-width: 768px)": {
          display: "flex",
          padding: "0px",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Box
        sx={{
          width: "70%",
          margin: "auto",
          background: "white",
          height: "80vh",
          padding: "20px",
          "@media (max-width: 768px)": {
            minHeight: "75vh",
            height: "auto",
          },
          direction:
            localStorage.getItem("language") === "arabic" ? "rtl" : "ltr",
        }}
      >
        <Container component="main">
          <Avatar
            sx={{ m: 1, bgcolor: "secondary.main" }}
            style={{ margin: "auto", display: "flex" }}
          >
            <ShieldTwoToneIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ marginTop: 1 }}>
            Signup
          </Typography>
          <form>
            <Box noValidate sx={{ mt: 7 }}>
              {/* Grid  */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="dense"
                    required
                    size="small"
                    fullWidth
                    id="fullName"
                    label="Full Name"
                    autoComplete="fullName"
                    autoFocus
                    name={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="dense"
                    required
                    type={"file"}
                    fullWidth
                    id="logo"
                    size="small"
                    autoComplete="logo"
                    autoFocus
                    name={logo}
                    onChange={(e) => setLogo(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="dense"
                    required
                    fullWidth
                    id="Username"
                    size="small"
                    label="Username"
                    autoComplete="Username"
                    autoFocus
                    name={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="dense"
                    required
                    fullWidth
                    id="Email"
                    size="small"
                    label="Email"
                    autoComplete="Email"
                    autoFocus
                    name={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="dense"
                    required
                    fullWidth
                    type={"number"}
                    id="Phone"
                    size="small"
                    label="Phone"
                    name={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete="Phone"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="dense"
                    required
                    fullWidth
                    id="Country"
                    size="small"
                    label="Country"
                    autoComplete="Country"
                    name={country}
                    onChange={(e) => setCountry(e.target.value)}
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    margin="dense"
                    required
                    fullWidth
                    id="Password"
                    size="small"
                    label="Password"
                    autoComplete="Password"
                    name={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="dense"
                    required
                    multiline
                    rows={4}
                    fullWidth
                    id="Description"
                    size="small"
                    label="Description"
                    autoComplete="Description"
                    name={description}
                    onChange={(e) => setDescription(e.target.value)}
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12}>
                  {loading === true ? (
                    <Button
                      type="submit"
                      disabled
                      fullWidth
                      variant="contained"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CircularProgress
                        size={18}
                        sx={{
                          marginRight: "10px",
                        }}
                      />{" "}
                      Loading...
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      onClick={handleSubmit}
                    >
                      Signup
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Box>
          </form>
          {open === true ? (
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                User Registered Successfully
              </Alert>
            </Snackbar>
          ) : null}
          {
            // error snackbar
            openError === true ? (
              <Snackbar
                open={openError}
                autoHideDuration={6000}
                onClose={handleCloseError}
              >
                <Alert
                  severity="error"
                  onClose={handleCloseError}
                  sx={{ width: "100%" }}
                >
                  {errStatus}
                </Alert>
              </Snackbar>
            ) : null
          }
        </Container>
      </Box>
    </div>
  );
}
