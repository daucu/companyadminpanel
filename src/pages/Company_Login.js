import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import * as React from "react";
import ShieldTwoToneIcon from "@mui/icons-material/ShieldTwoTone";
import "../styles/login.css";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

//Axios allow auth
// axios.defaults.withCredentials = true;
//Axios Header
// axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: 0,
}));
const theme = createTheme();

export default function Company_Login() {
  const [isLoading, setIsLoading] = React.useState(false);

  const [username, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [server_alert, setAlert] = React.useState();
  const [status, setStatus] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [erroralert, setErroralert] = React.useState(false);
  const [errorOpen, setErrorOpen] = React.useState(false);

  const navigate = useNavigate();

  // https://ayakart.dauqu.com/api/login

  async function createPost(e) {
    setIsLoading(true);
    e.preventDefault();
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
        email: username,
        password: password,
      })
      .then((res) => {
        console.log(res);
        setAlert(res.data.message, res);
        setStatus(res.data.status);
        setOpen(true);
        //Redirect to home page if login is successful
        setTimeout(() => {
          navigate("/admin");
        }, [1000]);
        setIsLoading(false);
      })
      .catch((e) => {
        setErroralert(e.response.data.message);
        setErrorOpen(true);

        setIsLoading(false);
        console.log(e);
      });
  }

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
            marginTop: 8,
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
            Company Login
          </Typography>
          <Box component="form" onSubmit={createPost} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setUserName(e.target.value)}
              value={username}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

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
              onClick={(e) => createPost(e)}
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} color="secondary" />
              ) : (
                "Login  "
              )}
            </Button>
            <Grid
              container
              sx={{
                marginTop: "20px",
              }}
            >
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
