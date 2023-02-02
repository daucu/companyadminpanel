import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import Tooltip from "@mui/material/Tooltip";
import AppBar from "@mui/material/AppBar";
import AddIcon from "@mui/icons-material/Add";
import Toolbar from "@mui/material/Toolbar";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  // color: "#fff",
  // backgroundColor: "#1A2027",
}));

export default function Support() {
  const [expanded, setExpanded] = React.useState("panel1");
  const [message, setMessage] = React.useState("");
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [server_alert, setAlert] = React.useState();
  const [status, setStatus] = React.useState();

  const navigate = useNavigate();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const supportURL = "http://localhost:4000/support";
  const [support, setSupport] = React.useState([]);

  //Get Data
  function getSupportData() {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/support`)
      .then((response) => {
        setSupport(response.data);
      });
  }

  React.useEffect(() => {
    getSupportData();
  }, []);

  //Axios Post Request
  const createPost = (e, item) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/support/${item._id}/message`,
        {
          message,
        }
      )
      .then((res) => {
        setAlert("Message successfully added", res);
        setStatus("success");
        getSupportData();
        setAlertOpen(true);
      })
      .catch((e) => {
        setAlert(e.response.data.message);
        setStatus(e.response.data.status);
        setAlertOpen(true);
      });
  };

  //Axios Delete Request
  const deletePost = (e, item) => {
    e.preventDefault();
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/support/${item._id}`)
      .then((res) => {
        setAlert("Message successfully deleted", res);
        setStatus("success");
        getSupportData();
        setAlertOpen(true);
      })
      .catch((e) => {
        setAlert(e.response.data.message);
        setStatus(e.response.data.status);
        setAlertOpen(true);
      });
  };

  //Alert
  const alertHandleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  const alertAction = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={alertHandleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <Box sx={{ width: "100%", marginTop: 3, boxShadow: 0 }}>
      <AppBar position="static">
        <Toolbar variant="dense" sx={{ background: "#333", color: "#fff" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate("/add-page")}
          >
            {/* <CloseIcon /> */}
            <AddIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Support
          </Typography>
          <Divider sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>

      <Snackbar
        open={alertOpen}
        autoHideDuration={5000}
        resumeHideDuration={5000}
        action={alertAction}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={alertHandleClose}
      >
        <Alert
          onClose={alertHandleClose}
          severity={status}
          sx={{ width: "100%" }}
        >
          {server_alert}
        </Alert>
      </Snackbar>

      <Paper
        sx={{
          width: "100%",
          mb: 2,
          boxShadow: 0,
          // background: "#1A2027",
          borderRadius: 0,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                overflow: "scroll",
                height: "85vh",
                borderRadius: 2,
                // background: "#1A2027",
              }}
            >
              {support.map((item) => (
                <Accordion
                  expanded={expanded === item._id}
                  onChange={handleChange(item._id)}
                  sx={{}}
                >
                  <AccordionSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                  >
                    <Typography>{item.title}</Typography>
                    {item.status === "active" ? (
                      <Chip
                        size="small"
                        color="success"
                        label="active"
                        sx={{ marginLeft: 5 }}
                      />
                    ) : (
                      <Chip
                        size="small"
                        color="error"
                        label="inactive"
                        sx={{ marginLeft: 5 }}
                      />
                    )}
                    <Typography flexGrow={1} />
                    {/* Delete  */}
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        sx={{
                          backgroundColor: "#00000021",
                          color: "#fff",
                        }}
                        onClick={(e) => deletePost(e, item)}
                      >
                        <DeleteTwoToneIcon />
                      </IconButton>
                    </Tooltip>

                    <Typography sx={{ marginLeft: 2 }}>{item.email}</Typography>
                    <Typography sx={{ marginLeft: 2 }}>{item.name}</Typography>
                  </AccordionSummary>
                  {item.message !== null ? (
                    <AccordionDetails>
                      {/* {item.message.map((subitem) => (
                        <Card
                          key={subitem._id}
                          sx={{
                            minWidth: 275,
                            display: "block",
                            textAlign: "left",
                            borderRadius: 2,
                            padding: 2,
                            margin: 0,
                            backgroundColor: "#282c3413",
                            boxShadow: 0,
                            marginTop: 1,
                            border: "1px solid white",
                          }}
                        >
                          <Chip
                            size="small"
                            color="info"
                            label={subitem.message_by}
                            sx={{ marginLeft: 0, marginBottom: 2 }}
                          />
                          <Typography
                            variant="body1"
                            gutterBottom
                            sx={{ color: "#fff" }}
                          >
                            {subitem.message}
                          </Typography>
                        </Card>
                      ))} */}

                      <TextField
                        id="filled-multiline-static"
                        hiddenLabel
                        multiline
                        rows={3}
                        sx={{ marginTop: 1, width: "100%", borderRadius: 2 }}
                        variant="filled"
                        placeholder="Enter your message here"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        inputProps={{
                          style: {
                            color: "#fff",
                            backgroundColor: "#333",
                          },
                        }}
                      />
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          mr: 2,
                          display: { xs: "none", md: "flex", marginTop: 10 },
                          boxShadow: 0,
                          background: "#333",
                        }}
                        onClick={(e) => createPost(e, item)}
                      >
                        Submit Message
                      </Button>
                    </AccordionDetails>
                  ) : (
                    <Typography>No Message!</Typography>
                  )}
                </Accordion>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
