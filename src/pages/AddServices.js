import {
  AppBar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import { useNavigate } from "react-router-dom";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Paper from "@mui/material/Paper";
function AddServices() {
  const [spacing, setSpacing] = React.useState(2);

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };
  const jsx = `
  <Grid container spacing={${spacing}}>
  `;
  const [video, setVideo] = useState("");
  const [videoThumbnail, setVideoThumbnail] = useState("");
  const [imageone, setImageone] = useState("");
  const [imagetwo, setImagetwo] = useState("");
  const [imagethree, setImagethree] = useState("");

  const navigate = useNavigate();
  return (
    <div
      style={{
        marginTop: "20px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          marginTop: 3,
          boxShadow: 0,
          animation: "fadeIn 0.5s ease-in-out",
          transition: "box-shadow 1s ease-in-out",
        }}
      >
        <AppBar position="static">
          <Toolbar variant="dense" sx={{ background: "#333", color: "#fff" }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => navigate("/admin/addservices")}
            ></IconButton>
            <Typography variant="h6" color="inherit" component="div">
              Add Services
            </Typography>

            <Divider sx={{ flexGrow: 1 }} />
            <Button
              variant="contained"
              size="small"
              color="success"
              sx={{
                boxShadow: 0,
              }}
            >
              Publish
            </Button>
          </Toolbar>
        </AppBar>
        {/* code for responsive form in mui */}
        <div
          style={{
            marginTop: "20px",
          }}
        >
          <form>
            {/* Product title */}
            <TextField
              id="outlined-basic"
              placeholder="Name"
              label="Name"
              size="small"
              //   name={title}
              //   onChange={(e) => setTitle(e.target.value)}
              minRows={6}
              variant="outlined"
              sx={{
                width: "100%",
                color: "#fff",
                outline: "none",
                border: "none",
                fontSize: "1.2rem",
                placeholderColor: "#fff",
              }}
            />
            {/* responsive grid for 2 coloumns */}

            <div
              style={{
                marginTop: "50px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  overflow: "hidden",
                  justifyContent: "space-evenly",
                  marginTop: "10px",
                }}
              >
                <div
                  item
                  style={{
                    width: "300px",
                    margin: "20px",
                    // media query for mobile
                    "@media (max-width: 500px)": {
                      width: "90%",
                      margin: "auto",
                    },
                  }}
                >
                  {video && video ? (
                    <div
                      style={{
                        height: "250px",
                        border: "1px solid #000",
                        borderStyle: "dashed",
                        borderRadius: "3px",
                        borderColor: "#000",
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                        objectFit: "cover",
                      }}
                    >
                      <video src={video} style={{ width: "100%" }} controls />
                    </div>
                  ) : (
                    <div
                      style={{
                        height: "250px",
                        border: "1px solid #000",
                        borderStyle: "dashed",
                        borderRadius: "3px",
                        borderColor: "#000",
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                      }}
                    >
                      Upload Video
                    </div>
                  )}

                  <Button
                    variant="contained"
                    component="label"
                    style={{
                      width: "100%",
                      marginTop: "10px",
                      "@media (max-width: 500px)": {
                        width: "90%",
                        margin: "auto",
                      },
                    }}
                  >
                    Upload
                    <input
                      hidden
                      // accept video files
                      accept="video/*"
                      multiple
                      name={video}
                      type="file"
                      onChange={(e) =>
                        setVideo(URL.createObjectURL(e.target.files[0]))
                      }
                    />
                  </Button>
                </div>
                <div
                  item
                  style={{
                    width: "300px",
                    margin: "20px",
                    "@media (max-width: 500px)": {
                      width: "90%",
                      margin: "auto",
                    },
                  }}
                >
                  {videoThumbnail && videoThumbnail.length > 0 ? (
                    <div
                      style={{
                        height: "250px",
                        border: "1px solid #000",
                        borderStyle: "dashed",
                        borderRadius: "3px",
                        borderColor: "#000",
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={videoThumbnail}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        alt="video thumbnail"
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        height: "250px",
                        border: "1px solid #000",
                        borderStyle: "dashed",
                        borderRadius: "3px",
                        borderColor: "#000",
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                      }}
                    >
                      Video Thumbnail
                    </div>
                  )}

                  <Button
                    variant="contained"
                    component="label"
                    style={{
                      width: "100%",
                      marginTop: "10px",
                    }}
                  >
                    Upload
                    <input
                      hidden
                      accept="image/*"
                      multiple
                      name={videoThumbnail}
                      type="file"
                      onChange={(e) => {
                        setVideoThumbnail(
                          URL.createObjectURL(e.target.files[0])
                        );
                      }}
                    />
                  </Button>
                </div>
                <div
                  item
                  style={{
                    width: "300px",
                    margin: "20px",
                  }}
                >
                  <div
                    style={{
                      height: "250px",
                      border: "1px solid #000",
                      borderStyle: "dashed",
                      borderRadius: "3px",
                      borderColor: "#000",
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Images
                  </div>
                  <Button
                    variant="contained"
                    component="label"
                    style={{
                      width: "100%",
                      marginTop: "10px",
                    }}
                  >
                    Upload
                    <input hidden accept="image/*" multiple type="file" />
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
        {/* success snach */}
        {/* {successSnack ? (
            <Snackbar
              open={handlesuccessOpen}
              autoHideDuration={3000}
              onClose={handlesuccessClose}
            >
              <Alert
                onClose={handlesuccessClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                {successSnack}
              </Alert>
            </Snackbar>
          ) : null} */}

        {/* error snack */}
        {/* <Snackbar
          open={handleerrorOpen}
          autoHideDuration={3000}
          onClose={handleerrorClose}
        >
          <Alert
            onClose={handleerrorClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            {errorSnack}
          </Alert>
        </Snackbar> */}
      </Box>
    </div>
  );
}

export default AddServices;
