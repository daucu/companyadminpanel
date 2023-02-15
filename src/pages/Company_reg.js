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
  InputLabel,
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

  // "name": "req.body.name",
  // "description": "req.body.description",
  // "address": "req.body.address",
  // "gst": "req.body.gst",
  // "company_owner": "req.body.company_owner",
  // "category": "req.body.category",
  // "tags": "req.body.tags",
  // "featured_image": "req.body.featured_image",
  // "digital_signature": "req.body.digital_signature",
  // "status": "pending",
  // "isVerified": false

  // code to add address before company registration

  // const [title, setTitle] = useState(""); //  title done
  // const [address, setAddress] = useState(""); // address done
  // const [phone, setPhone] = useState(""); // phone done
  // const [email, setEmail] = useState(""); // email done
  // const [contact_email, setContact_email] = useState(""); // contact_email done
  // const [contact_phone, setContact_phone] = useState(""); // contact_phone done
  // const [contact_name, setContact_name] = useState("");
  // const [password, setPassword] = useState(""); // password done
  // const [status, setStatus] = useState("");
  // const [isVerified, setIsVerified] = useState(""); // isVerified done

  const [addressID, setAddressID] = useState("");
  const [first_address, setFirst_address] = useState("");
  const [sec_address, setSec_address] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zip_code, setZip_code] = useState("");
  const [city, setCity] = useState("");

  const addAddressData = () => {
    const addressData = new FormData();
    addressData.append("first_address", first_address);
    addressData.append("sec_address", sec_address);
    addressData.append("state", state);
    addressData.append("country", country);

    addressData.append("zip_code", zip_code);
    addressData.append("city", city);

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/address`, addressData)
      .then((res) => {
        console.log(res.data.address.id);
        setAddressID(res.data.address.id);
        console.log(res);
        if (res.status === 200) {
          setSuccessAddressSubmit(true);
          addressSnackOpen();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [name, setName] = useState(""); // name done
  const [description, setDescription] = useState(""); // description done
  const [gst, setGst] = useState(""); // gst done
  const [company_owner, setCompany_owner] = useState(""); // company_owner done
  const [category, setCategory] = useState("default"); // category done
  const [address, setAddress] = useState(""); // address done
  const [tags, setTags] = useState([]);
  const [featured_image, setFeatured_image] = useState(""); // featured_image done
  const [digital_signature, setDigital_signature] = useState("");

  const handleImgUpload = async (file) => {
    const imgData = new FormData();
    imgData.append("uploadedFile", file);

    let response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/storage`,
      imgData
    );
    return response.data.file_name;
  };

  // finish page state
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(false);

  // code to add company to database
  const addCompany = async (e) => {
    setLoading(true);

    let featured_imageupload = await handleImgUpload(featured_image);
    let digital_signatureupload = await handleImgUpload(digital_signature);
    let fetchedAddressId = addressID;

    const sendData = {
      name,
      description,
      address: fetchedAddressId,
      gst,
      company_owner,
      category,
      tags: tags,
      featured_image: imgurl,
      digital_signature: digital_sign,
      status: "pending",
      isVerified: false,
    };

    const res = axios
      .post(`${API}/companies`, sendData)
      .then((res) => {
        console.log(res);
        setLoading(false);
        if (res.status === 200) {
          setSuccessData(res.status);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  // code to get tags and map them to the select option
  const [fetchTags, setFetchTags] = useState([]);
  const getAllTags = async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/tags`)
      .then((res) => {
        console.log(res.data);
        setFetchTags(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  React.useEffect(() => {
    getAllTags();
  }, []);

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
    // code to validate spet 0 of stpper form and restrict user to go to next step if any field is empty
    if (
      first_address.length === 0 ||
      sec_address.length === 0 ||
      state.length === 0 ||
      city.length === 0 ||
      zip_code.length === 0 ||
      country.length === 0
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
      name.length === 0 ||
      description.length === 0 ||
      gst.length === 0 ||
      company_owner.length === 0
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
  const [successAddressSubmit, setSuccessAddressSubmit] = useState(false);
  const addressSnackOpen = () => {
    setSuccessAddressSubmit(true);
  };
  const addressSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessAddressSubmit(false);
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
                {successData === 200 ? (
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
                      name={first_address}
                      onChange={(e) => setFirst_address(e.target.value)}
                      label="Address"
                      variant="outlined"
                      sx={{
                        width: "100%",
                      }}
                    />

                    <TextField
                      id="outlined-basic"
                      size="small"
                      name={sec_address}
                      onChange={(e) => setSec_address(e.target.value)}
                      label="Second Address"
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
                      name={country}
                      onChange={(e) => setCountry(e.target.value)}
                      label="Country"
                      variant="outlined"
                      sx={{
                        width: "100%",
                      }}
                    />
                    <TextField
                      id="outlined-basic"
                      size="small"
                      name={state}
                      onChange={(e) => setState(e.target.value)}
                      label="State"
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
                      name={zip_code}
                      onChange={(e) => setZip_code(e.target.value)}
                      label="Zip Code"
                      variant="outlined"
                      sx={{
                        width: "100%",
                      }}
                    />
                    <TextField
                      id="outlined-basic"
                      size="small"
                      name={city}
                      onChange={(e) => setCity(e.target.value)}
                      label="City"
                      variant="outlined"
                      sx={{
                        width: "100%",
                      }}
                    />
                  </Stack>
                  <Stack
                    sx={{
                      marginTop: "40px",
                      padding: "10px",
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={addAddressData}
                      size="small"
                    >
                      Add Address
                    </Button>
                  </Stack>
                  {/* <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                      padding: "10px",
                    }}
                  >
                    <Autocomplete
                      multiple
                      sx={{
                        width: "100%",
                      }}
                      label="Tags"
                      id="tags-standard"
                      options={top100Films}
                      size="small"
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
                  </Stack> */}
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
                            name={digital_sign}
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
                      name={name}
                      onChange={(e) => setName(e.target.value)}
                      label="Name"
                      variant="outlined"
                      sx={{
                        width: "100%",
                      }}
                    />
                    <TextField
                      id="outlined-basic"
                      size="small"
                      name={description}
                      onChange={(e) => setDescription(e.target.value)}
                      label="Description"
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
                      name={gst}
                      onChange={(e) => setGst(e.target.value)}
                      label="GST"
                      variant="outlined"
                      sx={{
                        width: "100%",
                      }}
                    />
                    <TextField
                      id="outlined-basic"
                      size="small"
                      name={company_owner}
                      onChange={(e) => setCompany_owner(e.target.value)}
                      label="Company Owner"
                      variant="outlined"
                      sx={{
                        width: "100%",
                      }}
                    />
                  </Stack>
                  <Stack
                    spacing={2}
                    sx={{
                      padding: "10px",
                    }}
                  >
                    <InputLabel
                      sx={{
                        textAlign: "left",
                        marginTop: 2,
                      }}
                      id="demo-simple-select-outlined-label"
                    >
                      Tags
                    </InputLabel>
                    {/* map tags in autocomplete selct menu option with chip  */}
                    <Autocomplete
                      multiple
                      id="tags-standard"
                      options={fetchTags}
                      sx={{
                        width: "100%",
                      }}
                      getOptionLabel={(option) => option.name}
                      onChange={(e, value) =>
                        setTags(value.map((tag) => tag.id))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          size="small"
                          sx={{
                            width: "100%",
                            marginTop: 1,
                          }}
                        />
                      )}
                    />
                  </Stack>
                  {/* <Stack
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
                      label="Category"
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
                  </Stack> */}
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
              autoHideDuration={2000}
              onClose={zeroErrClose}
              position="bottom-right"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
              <Alert
                onClose={zeroErrClose}
                severity="error"
                variant="filled"
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
              autoHideDuration={2000}
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
              autoHideDuration={2000}
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
        {successAddressSubmit === true ? (
          <>
            {" "}
            <Snackbar
              open={addressSnackOpen}
              autoHideDuration={5000}
              position="bottom-right"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              onClose={addressSnackClose}
            >
              <Alert
                onClose={addressSnackClose}
                severity="success"
                variant="filled"
                sx={{ width: "100%" }}
              >
                Address Added Successfully , Please Go to the next step 👍.
              </Alert>
            </Snackbar>
          </>
        ) : null}
      </Box>
    </div>
  );
}
