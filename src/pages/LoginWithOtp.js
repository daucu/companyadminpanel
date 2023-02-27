import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import * as React from "react";
import "../styles/login.css";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const theme = createTheme();

export default function LoginWithOtp() {
  const [checkOtp, setCheckOtp] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(false);

  const [username, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [server_alert, setAlert] = React.useState();
  const [status, setStatus] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [erroralert, setErroralert] = React.useState(false);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const handleCheckOtp = () => {
    if (email === "") {
      setErroralert("Please enter email ");
      setErrorOpen(true);
      return;
    }

    if (!email.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)) {
      setErroralert("Please enter valid email");
      setErrorOpen(true);
      return;
    }

    // code for otp
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/login/otp`, {
        email: email,
      })
      .then((res) => {
        // console.log(res.status);
        setCheckOtp(res.status);
        setAlert(res.data.message, res);
        setStatus(res.data.status);
        setOpen(true);
      })
      .catch((e) => {
        setErroralert(e.response.data.message);
        setErrorOpen(true);
        console.log(e.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const navigate = useNavigate();

  // login
  const handleLogin = (e) => {
    setIsLoading(true);
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/login/otplogin`, {
        email: email,
        otp: otp,
      })
      .then((res) => {
        console.log(res.data.token);
        localStorage.setItem("token", res.data.token);

        setAlert(res.data.message, res);
        setStatus(res.data.status);
        setOpen(true);
        setTimeout(() => {
          navigate("/admin");
        }, 1000);
      })
      .catch((e) => {
        setErroralert(e.response.data.message);
        setErrorOpen(true);
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const errorHandleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorOpen(false);
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
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
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

        <Snackbar
          open={errorOpen}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert
            onClose={errorHandleClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            {erroralert}
          </Alert>
        </Snackbar>
        <CssBaseline />
        <Box
          sx={{
            height: "90vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#f3f3f3",
              padding: "20px",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login With OTP
            </Typography>
            <p
              style={{
                marginTop: "10px",
              }}
            >
              Enter your email to get OTP
            </p>
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              {/* textfield for Otp */}
              {checkOtp === 200 ? (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="otp"
                  label="OTP"
                  name="otp"
                  autoComplete="otp"
                  autoFocus
                  onChange={(e) => setOtp(e.target.value)}
                  value={otp}
                />
              ) : null}
              {checkOtp !== 200 ? (
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{
                    marginTop: "20px",
                    boxShadow: "none",
                    borderRadius: "50px",
                    border: "1px solid #d6d4d4",
                    cursor: "pointer",
                  }}
                  onClick={(e) => handleCheckOtp(e)}
                  disabled={isLoading}
                >
                  Get OTP
                </Button>
              ) : (
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  color="primary"
                  sx={{
                    marginTop: "20px",
                    boxShadow: "none",
                    borderRadius: "50px",
                    border: "1px solid #d6d4d4",
                    cursor: "pointer",
                  }}
                  onClick={(e) => handleLogin(e)}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <CircularProgress size={24} color="secondary" />
                  ) : (
                    "Login"
                  )}
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
