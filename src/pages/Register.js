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
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

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
  const [fullName, setFullName] = useState("");
  const [logo, setLogo] = useState("https://picsum.photos/500/500");
  const [description, setDescription] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [google_map, setGoogle_map] = useState([]);
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

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

  // code to submit form to backend
  const handleSubmit = (e) => {
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
    console.log(data);

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/register`, data)
      .then((res) => {
        console.log(res);
        handleClick();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#f3f3f3",
            padding: "20px",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Signup
          </Typography>
          <form>
            <Box noValidate sx={{ mt: 1 }}>
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

                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="dense"
                    required
                    fullWidth
                    id="Role"
                    size="small"
                    label="Role"
                    autoComplete="Role"
                    name={role}
                    onChange={(e) => setRole(e.target.value)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
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
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={handleSubmit}
                  >
                    Signup
                  </Button>
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
        </Box>
      </Container>
    </Box>
  );
}
