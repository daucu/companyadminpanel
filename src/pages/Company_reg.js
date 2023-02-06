import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextareaAutosize, TextField, Tooltip } from "@mui/material";
import "../styles/company_reg.css";
import { Stack } from "@mui/system";
import axios from "axios";
import { API } from "../constant/constant";
import { useState } from "react";
const steps = ["Basic information", "Upload Documents", "Verification"];

export default function Company_reg() {
  const [name, setName] = useState(""); // name done
  const [title, setTitle] = useState(""); //  title done
  const [featured_image, setFeatured_image] = useState(
    "https://picsum.photos/200/300"
  ); // featured_image done
  const [description, setDescription] = useState(""); // description done
  const [address, setAddress] = useState(""); // address done
  const [phone, setPhone] = useState(""); // phone done
  const [email, setEmail] = useState(""); // email done
  const [gst, setGst] = useState(""); // gst done
  const [company_owner, setCompany_owner] = useState(""); // company_owner done
  const [category, setCategory] = useState(""); // category done
  const [contact_email, setContact_email] = useState(""); // contact_email done
  const [contact_phone, setContact_phone] = useState(""); // contact_phone done
  const [contact_name, setContact_name] = useState("");
  const [password, setPassword] = useState(""); // password done
  const [status, setStatus] = useState("");
  const [isVerified, setIsVerified] = useState(""); // isVerified done

  // code to add company to database
  const addCompany = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("title", title);
    formData.append("featured_image", featured_image);
    formData.append("description", description);
    formData.append("address", address);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("gst", gst);
    formData.append("company_owner", company_owner);
    formData.append("category", category);
    formData.append("contact_email", contact_email);
    formData.append("contact_phone", contact_phone);
    formData.append("contact_name", contact_name);
    formData.append("password", password);
    formData.append("status", status);
    formData.append("isVerified", isVerified);

    const res = axios
      .post(`${API}/companies`, formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
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

  return (
    <div
      style={{
        backgroundColor: "#E2EBF0",
        padding: "50px",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: "70%",
          margin: "auto",
          background: "white",
          height: "80vh",
          padding: "20px",
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
              padding: "50px",
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
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
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
                      variant="filled"
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
                      variant="filled"
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
                      variant="filled"
                      sx={{
                        width: "100%",
                      }}
                    />
                    <TextField
                      id="outlined-basic"
                      size="small"
                      name={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      label="Company Contact"
                      variant="filled"
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
                      multiline
                      rows={6}
                      name={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Company Description"
                      variant="filled"
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
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        width: "90%",
                        margin: "auto",
                      }}
                    >
                      <div
                        className="imgcont"
                        style={{
                          width: "100%",
                          margin: "auto",
                          height: "200px",
                          border: "1px solid black",
                          borderStyle: "dashed",
                          borderRadius: "10px",
                          display: "flex",
                          textAlign: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <h2>Image</h2>
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
                            width: "100%",
                          }}
                        >
                          Upload
                          <input hidden accept="image/*" multiple type="file" />
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
                      variant="filled"
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
                      variant="filled"
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
                      variant="filled"
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
                      variant="filled"
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
                      variant="filled"
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
                      variant="filled"
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
                      variant="filled"
                      sx={{
                        width: "100%",
                      }}
                    />
                    <TextField
                      id="outlined-basic"
                      size="small"
                      name={isVerified}
                      onChange={(e) => setIsVerified(e.target.value)}
                      label="Verified"
                      variant="filled"
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
                      variant="filled"
                      sx={{
                        width: "100%",
                      }}
                    />
                    <TextField
                      id="outlined-basic"
                      size="small"
                      name={status}
                      onChange={(e) => setStatus(e.target.value)}
                      label="Status"
                      variant="filled"
                      sx={{
                        width: "100%",
                      }}
                    />
                  </Stack>
                  <div>
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
                  </div>
                </div>
              ) : null}

              {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
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
      </Box>
    </div>
  );
}
