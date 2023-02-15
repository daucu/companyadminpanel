import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import MuiAlert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import CircularProgress from "@mui/material/CircularProgress";
import successgif from "../assets/images/successgif.gif";
import {
  Autocomplete,
  TextareaAutosize,
  TextField,
  Tooltip,
} from "@mui/material";
import "../styles/company_reg.css";
import { Stack } from "@mui/system";
import axios from "axios";
import { API } from "../constant/constant";
import { useState } from "react";
import { Link } from "react-router-dom";
const steps = ["Address", "Upload Documents", "Verification"];


export default function Company_reg() {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="outlined" {...props} />;
  });
  const [name, setName] = useState(""); // name done
  const [title, setTitle] = useState(""); //  title done
  const [featured_image, setFeatured_image] = useState(""); // featured_image done
  const [description, setDescription] = useState(""); // description done
  const [address, setAddress] = useState(""); // address done
  const [phone, setPhone] = useState(""); // phone done
  const [email, setEmail] = useState(""); // email done
  const [gst, setGst] = useState(""); // gst done
  const [tags, setTags] = useState([]);
  const [company_owner, setCompany_owner] = useState(""); // company_owner done
  const [category, setCategory] = useState(""); // category done
  const [contact_email, setContact_email] = useState(""); // contact_email done
  const [contact_phone, setContact_phone] = useState(""); // contact_phone done
  const [contact_name, setContact_name] = useState("");
  const [password, setPassword] = useState(""); // password done
  const [status, setStatus] = useState("");
  const [isVerified, setIsVerified] = useState(""); // isVerified done
  const [digital_signature, setDigital_signature] = useState("");

  // finish page state
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(false);

  // code to add company to database
  const addCompany = async (e) => {
    setLoading(true);
    // console.log(tags);
    // return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("title", title);
    formData.append("featured_image", featured_image);
    formData.append("description", description);
    formData.append("address", address);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("gst", gst);
    formData.append("tags", JSON.stringify(tags));
    formData.append("company_owner", company_owner);
    formData.append("category", category);
    formData.append("contact_email", contact_email);
    formData.append("contact_phone", contact_phone);
    formData.append("contact_name", contact_name);
    formData.append("password", password);
    formData.append("digital_signature", digital_signature);

    const res = axios
      .post(`${API}/companies`, formData)
      .then((res) => {
        console.log(res);
        setSuccessData(res.status);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const top100Films = [
    "Agrochemicals",
    "Machinery",
    "Car Services",
    "Agricultural Supplies",
    "Agriculture",
    "Electronics",
    "Energy",
    "Environment",
    "Food",
    "Health",
    "Industrial",
    "Information Technology",
    "Materials",
    "Media",
    "Metals",
    "Mining",
    "Oil & Gas",
    "Pharmaceuticals",
    "Plastics",
    "Power",
  ];
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    // // if validateStep0() return false then return from here and don't go to next step
    if (activeStep === 0 && !validateStep0()) {
      return;
    }
    // // if validateStep1() return false then return from here and don't go to next step
    if (activeStep === 1 && !validateStep1()) {
      return;
    }
    // // if validateStep2() return false then return from here and don't go to next step
    if (activeStep === 2 && !validateStep2()) {
      return;
    }

    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);

    // when finish button is clicked then call addCompany function to add company to database
    if (activeStep === steps.length - 1) {
      const res = addCompany();
      console.log(res);

      console.log("last step");
    } else {
      console.log("not last step");
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // img
  const [imgurl, setImgurl] = useState("");
  const [digital_sign, setDigital_sign] = useState("");
  // code to split selected value from autocomplete and set into array of tags and then set into state

  const [stepzeroErr, setStepzeroErr] = useState(false);
  // const [setZeroErrSnackOpen, setSetZeroErrSnackOpen] = useState(false);
  // code to validate spet 0 of stpper form and restrict user to go to next step if any field is empty
  // stepper zero index validation--------------------------------------------
  const validateStep0 = () => {
    if (
      name === "" ||
      title === "" ||
      address === "" ||
      phone === "" ||
      tags.length === 0 ||
      description === ""
    ) {
      setStepzeroErr(true);
      return false;
    } else {
      return true;
    }
  };

  const zeroErrOpen = () => {
    setStepzeroErr(true);
  };

  const zeroErrClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setStepzeroErr(false);
  };

  // stepper one index validation--------------------------------------------
  const [steponeErr, setSteponeErr] = useState(false);

  const validateStep1 = () => {
    if (imgurl.length === 0 || digital_sign.length === 0) {
      setSteponeErr(true);
      return false;
    } else {
      return true;
    }
  };

  const oneErrOpen = () => {
    setSteponeErr(true);
  };
  const oneErrClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSteponeErr(false);
  };

  // stepper two index validation--------------------------------------------
  const [steptwoErr, setSteptwoErr] = useState(false);
  const validateStep2 = () => {
    if (
      contact_email === "" ||
      gst === "" ||
      contact_name === "" ||
      contact_phone === "" ||
      password === "" ||
      company_owner === "" ||
      category === ""
    ) {
      setSteptwoErr(true);
      return false;
    } else {
      return true;
    }
  };

  const twoErrOpen = () => {
    setSteptwoErr(true);
  };
  const twoErrClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSteptwoErr(false);
  };

  // code to add address before submiting form
  const [first_address, setFirst_address] = useState("");
  const [sec_address, setSec_address] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zip_code, setZip_code] = useState("");
  const [city, setCity] = useState("");

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
            width: "90%",
            minHeight: "75vh",
            height: "auto",
          },
        }}
      >
        <Tooltip
          sx={{
            padding: "10px",
          }}
        >
          <Typography
            sx={{
              fontSize: "25px",
              fontWeight: "bold",
            }}
          >
            Create Company account{" "}
          </Typography>
        </Tooltip>
        <form onSubmit={(e) => addCompany(e)}>
          <Stepper
            activeStep={activeStep}
            sx={{
              padding: "50px 0px",
              width: "100%",
              "@media (max-width: 768px)": {
                display: "block",
              },
            }}
          >
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant="caption"></Typography>
                );
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label} </StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              {loading ? (
                <>
                  <Typography
                    sx={{
                      mt: 2,
                      mb: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "30px",
                    }}
                  >
                    Submitting data.....
                  </Typography>
                  <CircularProgress
                    size={100}
                    sx={{
                      marginTop: "20px",
                    }}
                  />
                </>
              ) : null}

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                {successData === 201 ? (
                  <>
                    <Typography
                      sx={{
                        mt: 6,
                        mb: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "30px",
                      }}
                    >
                      Thank you for Joining us..
                    </Typography>
                    <Typography sx={{ mt: 5, mb: 1 }}>
                      <Link
                        to="/admin/login"
                        style={{
                          textDecoration: "none",
                          color: "black",
                        }}
                      >
                        <Button variant="contained">Go To Login</Button>
                      </Link>
                    </Typography>
                  </>
                ) : null}
              </div>

              {/* <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box> */}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {/* change content of step  */}
              {activeStep === 0 ? (
                <div className="ItemCont">
                  {/*  stack with 2 text field in 1 container  */}
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                      padding: "10px",
                    }}
                  >
                    <TextField
                      id="outlined-basic"
                      size="small"
                      name={name}
                      onChange={(e) => setName(e.target.value)}
                      label="Company Name"
                      variant="outlined"
                      sx={{
                        width: "100%",
                      }}
                    />

                    <TextField
                      id="outlined-basic"
                      size="small"
                      name={title}
                      onChange={(e) => setTitle(e.target.value)}
                      label="Company Title"
                      variant="outlined"
                      sx={{
                        width: "100%",
                      }}
                    />
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                      padding: "10px",
                    }}
                  >
                    <TextField
                      id="outlined-basic"
                      size="small"
                      name={address}
                      onChange={(e) => setAddress(e.target.value)}
                      label="Company Location"
                      variant="outlined"
                      sx={{
                        width: "100%",
                      }}
                    />
                    <TextField
                      id="outlined-basic"
                      size="small"
                      name={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      label="Company phone Number"
                      variant="outlined"
                      sx={{
                        width: "100%",
                      }}
                    />
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                      padding: "10px",
                    }}
                  >
                    {/* how to add multiple value in array in database using autocomplete tag*/}
                    <Autocomplete
                      multiple
                      sx={{
                        width: "100%",
                      }}
                      label="Tags"
                      id="tags-standard"
                      options={top100Films}
                      size="small"
                      //  get optionlabel from array without using map
                      getOptionLabel={(option) => option}
                      onChange={(e, value) => {
                        setTags(value);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Tags"
                          placeholder="Tags"
                          value={tags}
                          name={tags}
                        />
                      )}
                    />
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                      padding: "10px",
                    }}
                  >
                    <TextField
                      multiline
                      rows={6}
                      name={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Company Description"
                      variant="outlined"
                      style={{
                        width: "100%",
                      }}
                    />
                  </Stack>
                </div>
              ) : activeStep === 1 ? (
                <div>
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                      padding: "10px",
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "space-between",
                      // media query
                      "@media (max-width: 768px)": {
                        width: "95%",
                        display: "block",
                        alignItems: "center",
                      },
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        margin: "15px auto",
                        // media query
                        "@media (max-width: 768px)": {
                          width: "100%",
                          margin: "10px auto",
                        },
                      }}
                    >
                      <div
                        className="imgcont"
                        style={{
                          width: "90%",
                          margin: "auto",
                          height: "270px",
                          border: "1px solid black",
                          borderStyle: "dashed",
                          borderRadius: "10px",
                          display: "flex",
                          textAlign: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {imgurl === "" ? (
                          <div>IMAGE</div>
                        ) : (
                          <>
                            <img
                              src={imgurl}
                              alt
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "fill",
                              }}
                            />
                          </>
                        )}
                      </div>
                      <div
                        style={{
                          marginTop: "20px",
                        }}
                      >
                        <Button
                          variant="contained"
                          component="label"
                          sx={{
                            width: "90%",
                          }}
                        >
                          Upload
                          <input
                            hidden
                            accept="image/*"
                            multiple
                            type="file"
                            onChange={(e) => {
                              setImgurl(URL.createObjectURL(e.target.files[0]));
                            }}
                          />
                        </Button>
                      </div>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        margin: "15px auto",
                        // media query
                        "@media (max-width: 768px)": {
                          width: "100%",
                          margin: "20px auto",
                        },
                      }}
                    >
                      <div
                        className="imgcont"
                        style={{
                          width: "90%",
                          margin: "auto",
                          height: "270px",
                          border: "1px solid black",
                          borderStyle: "dashed",
                          borderRadius: "10px",
                          display: "flex",
                          textAlign: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {digital_sign === "" ? (
                          <div>DIGITAL SIGNATURE</div>
                        ) : (
                          <>
                            <img
                              src={digital_sign}
                              alt
                              style={{
                                width: "100%",
                                height: "100%",

                                objectFit: "fill",
                              }}
                            />
                          </>
                        )}
                      </div>
                      <div
                        style={{
                          marginTop: "20px",
                        }}
                      >
                        <Button
                          variant="contained"
                          component="label"
                          sx={{
                            width: "90%",
                          }}
                        >
                          Upload
                          <input
                            hidden
                            accept="image/*"
                            multiple
                            type="file"
                            onChange={(e) => {
                              setDigital_sign(
                                URL.createObjectURL(e.target.files[0])
                              );
                            }}
                          />
                        </Button>
                      </div>
                    </div>
                  </Stack>
                </div>
              ) : activeStep === 2 ? (
                <div>
                  {" "}
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                      padding: "10px",
                    }}
                  >
                    <TextField
                      id="outlined-basic"
                      size="small"
                      name={email}
                      onChange={(e) => setEmail(e.target.value)}
                      label="Company Email"
                      variant="outlined"
                      sx={{
                        width: "100%",
                      }}
                    />
                    <TextField
                      id="outlined-basic"
                      size="small"
                      name={gst}
                      onChange={(e) => setGst(e.target.value)}
                      label="Company License"
                      variant="outlined"
                      sx={{
                        width: "100%",
                      }}
                    />
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                      padding: "10px",
                    }}
                  >
                    <TextField
                      id="outlined-basic"
                      size="small"
                      name={company_owner}
                      onChange={(e) => setCompany_owner(e.target.value)}
                      label="Owner Name"
                      variant="outlined"
                      sx={{
                        width: "100%",
                      }}
                    />
                    <TextField
                      id="outlined-basic"
                      size="small"
                      name={contact_phone}
                      onChange={(e) => setContact_phone(e.target.value)}
                      label="Owner Phone"
                      variant="outlined"
                      sx={{
                        width: "100%",
                      }}
                    />
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                      padding: "10px",
                    }}
                  >
                    <TextField
                      id="outlined-basic"
                      size="small"
                      name={contact_email}
                      onChange={(e) => setContact_email(e.target.value)}
                      label="Owner Email"
                      variant="outlined"
                      sx={{
                        width: "100%",
                      }}
                    />
                    <TextField
                      id="outlined-basic"
                      size="small"
                      name={password}
                      onChange={(e) => setPassword(e.target.value)}
                      label="Password"
                      variant="outlined"
                      sx={{
                        width: "100%",
                      }}
                    />
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                      padding: "10px",
                    }}
                  >
                    <TextField
                      id="outlined-basic"
                      size="small"
                      name={category}
                      onChange={(e) => setCategory(e.target.value)}
                      label="Business Category"
                      variant="outlined"
                      sx={{
                        width: "100%",
                      }}
                    />
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                      padding: "10px",
                    }}
                  >
                    <TextField
                      id="outlined-basic"
                      size="small"
                      name={contact_name}
                      onChange={(e) => setContact_name(e.target.value)}
                      label="Contact Name"
                      variant="outlined"
                      sx={{
                        width: "100%",
                      }}
                    />
                  </Stack>
                  {/* <div>
                    <Button
                      onClick={(e) => addCompany(e)}
                      variant="contained"
                      component="label"
                      sx={{
                        width: "100%",
                      }}
                    >
                      Submit
                    </Button>
                  </div> */}
                </div>
              ) : null}

              {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{
                    mr: 1,
                    // hover css
                  }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                {/* {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )} */}

                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </form>
        {stepzeroErr ? (
          <>
            {/* Stepper Zero Index Error Snack */}
            <Snackbar
              open={zeroErrOpen}
              autoHideDuration={1000}
              onClose={zeroErrClose}
            >
              <Alert
                onClose={zeroErrClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                Please fill all the fields
              </Alert>
            </Snackbar>
          </>
        ) : null}
        {
          // Stepper One Index Error Snack
          steponeErr ? (
            <Snackbar
              open={oneErrOpen}
              autoHideDuration={1000}
              onClose={oneErrClose}
            >
              <Alert
                onClose={oneErrClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                Please Upload both the images
              </Alert>
            </Snackbar>
          ) : null
        }
        {
          // Stepper Two Index Error Snack
          steptwoErr ? (
            <Snackbar
              open={twoErrOpen}
              autoHideDuration={1000}
              onClose={twoErrClose}
            >
              <Alert
                onClose={twoErrClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                Please fill all the fields
              </Alert>
            </Snackbar>
          ) : null
        }
      </Box>
    </div>
  );
}
