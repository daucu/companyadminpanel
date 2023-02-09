// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Paper from "@mui/material/Paper";
// import IconButton from "@mui/material/IconButton";
// import Grid from "@mui/material/Grid";
// import { styled } from "@mui/material/styles";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import * as React from "react";
// import ShieldTwoToneIcon from "@mui/icons-material/ShieldTwoTone";
// import "../styles/login.css";
// import CircularProgress from "@mui/material/CircularProgress";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import CloseIcon from "@mui/icons-material/Close";
// import MuiAlert from "@mui/material/Alert";
// import Snackbar from "@mui/material/Snackbar";

// //Axios allow auth
// // axios.defaults.withCredentials = true;
// //Axios Header
// // axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   textAlign: "center",
//   color: theme.palette.text.secondary,
//   borderRadius: 0,
// }));

// export default function Login() {
//   const [isLoading, setIsLoading] = React.useState(false);

//   const [username, setUserName] = React.useState("");
//   const [password, setPassword] = React.useState("");
//   const [server_alert, setAlert] = React.useState();
//   const [status, setStatus] = React.useState();
//   const [open, setOpen] = React.useState(false);

//   const navigate = useNavigate();

//   // https://ayakart.dauqu.com/api/login

//   async function createPost(e) {
//     setIsLoading(true);
//     e.preventDefault();
//     await axios
//       .post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
//         email: username,
//         password: password,
//       })
//       .then((res) => {
//         console.log(res);
//         // setAlert(res.data.message, res);
//         // setStatus(res.data.status);
//         setOpen(true);
//         //Redirect to home page if login is successful
//         navigate("/");
//         // window.location.reload();
//         setIsLoading(false);
//       })
//       .catch((e) => {
//         // setAlert(e.response.data.message);
//         // setStatus(e.response.data.status);
//         setOpen(true);
//         setIsLoading(false);
//         console.log(e);
//       });
//   }

//   const handleClose = (reason) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     setOpen(false);
//   };

//   const action = (
//     <React.Fragment>
//       <IconButton
//         size="small"
//         aria-label="close"
//         color="inherit"
//         onClick={handleClose}
//       >
//         <CloseIcon fontSize="small" />
//       </IconButton>
//     </React.Fragment>
//   );

//   const Alert = React.forwardRef(function Alert(props, ref) {
//     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
//   });

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <Snackbar
//         open={open}
//         autoHideDuration={3000}
//         resumeHideDuration={3000}
//         action={action}
//         anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//         onClose={handleClose}
//       >
//         <Alert onClose={handleClose} severity={status} sx={{ width: "100%" }}>
//           {server_alert}
//         </Alert>
//       </Snackbar>

//       <Grid
//         container
//         spacing={0}
//         sx={{
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100vh",
//           width: "100%",
//         }}
//       >
//         <Grid
//           item
//           xs={3}
//           sx={{
//             minWidth: "350px",
//             height: "100%",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//             backgroundColor: "#1A2027",
//             paddingTop: "5vh",
//           }}
//         >
//           <Item
//             sx={{
//               height: "100%",
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               alignItems: "center",
//               backgroundColor: "#1A2027",
//             }}
//           >
//             <Box
//               sx={{
//                 width: "80%",
//                 height: "auto",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 backgroundColor: "#d6d4d4",
//                 padding: "20px",
//                 borderRadius: "10px",
//                 paddingBottom: "50px",
//                 paddingTop: "50px",
//               }}
//             >
//               <Typography component="h1" variant="h5">
//                 Secure Sign In
//               </Typography>

//               {/* Icon */}
//               <IconButton
//                 sx={{
//                   borderRadius: "50%",
//                   backgroundColor: "#ffffff",
//                   mt: "20px",
//                   mb: "20px",
//                 }}
//               >
//                 <ShieldTwoToneIcon
//                   sx={{
//                     fontSize: 60,
//                   }}
//                 />
//               </IconButton>

//               {/* Text  */}
//               <Typography
//                 component="h1"
//                 variant="h5"
//                 sx={{
//                   color: "#333333",
//                   mt: "20px",
//                   mb: "20px",
//                 }}
//               >
//                 123Auc
//               </Typography>

//               <TextField
//                 variant="outlined"
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="email"
//                 label="Email Address"
//                 name="email"
//                 autoComplete="email"
//                 autoFocus
//                 onChange={(e) => setUserName(e.target.value)}
//                 value={username}
//               />
//               <TextField
//                 variant="outlined"
//                 margin="normal"
//                 required
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 type="password"
//                 id="password"
//                 autoComplete="current-password"
//                 onChange={(e) => setPassword(e.target.value)}
//                 value={password}
//               />
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 sx={{
//                   marginTop: "20px",
//                   boxShadow: "none",
//                   borderRadius: "50px",
//                   border: "1px solid #d6d4d4",
//                   cursor: "pointer",
//                 }}
//                 onClick={(e) => createPost(e)}
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <CircularProgress size={24} color="secondary" />
//                 ) : (
//                   "Login Now"
//                 )}
//               </Button>

//               <Typography
//                 component="h1"
//                 variant="h5"
//                 sx={{
//                   color: "#333333",
//                   mt: "20px",
//                   mb: "20px",
//                   fontSize: "18px",
//                   cursor: "pointer",
//                   textDecoration: "underline",
//                 }}
//               >
//                 Forgot Password ? Reset Here
//               </Typography>

//               {/* Login with social */}
//             </Box>
//           </Item>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }
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

export default function Login() {
  const [isLoading, setIsLoading] = React.useState(false);

  const [username, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [server_alert, setAlert] = React.useState();
  const [status, setStatus] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [erroralert, setErroralert] = React.useState(false);
  const [errorOpen, setErrorOpen] = React.useState(false);

  // code to show and hide password with eye icon
  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const navigate = useNavigate();

  // https://ayakart.dauqu.com/api/login

  async function createPost(e) {
    setIsLoading(true);
    e.preventDefault();
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/login/company`, {
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
            {/* <LockOutlinedIcon /> */}
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
            {/* code for textfield with show and hide password with eye icon */}
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
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
            <Grid container style={{ marginTop: 10 }}>
              <Grid item xs>
                <Link href="/company_reg" variant="body2">
                  Register Your Company here!
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
