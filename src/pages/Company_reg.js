import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
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
  const [tags, setTags] = useState([]);
  const [company_owner, setCompany_owner] = useState(""); // company_owner done
  const [category, setCategory] = useState(""); // category done
  const [contact_email, setContact_email] = useState(""); // contact_email done
  const [contact_phone, setContact_phone] = useState(""); // contact_phone done
  const [contact_name, setContact_name] = useState("");
  const [password, setPassword] = useState(""); // password done
  const [status, setStatus] = useState("");
  const [isVerified, setIsVerified] = useState(""); // isVerified done
  const [digital_signature, setDigital_signature] = useState(
    "https://picsum.photos/200/300"
  );
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
    formData.append("tags", tags);
    formData.append("company_owner", company_owner);
    formData.append("category", category);
    formData.append("contact_email", contact_email);
    formData.append("contact_phone", contact_phone);
    formData.append("contact_name", contact_name);
    formData.append("password", password);
    formData.append("status", status);
    formData.append("isVerified", isVerified);
    formData.append("digital_signature", digital_signature);
    const res = axios
      .post(`${API}/companies`, formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: "Pulp Fiction", year: 1994 },
    {
      title: "The Lord of the Rings: The Return of the King",
      year: 2003,
    },
    { title: "The Good, the Bad and the Ugly", year: 1966 },
    { title: "Fight Club", year: 1999 },
    {
      title: "The Lord of the Rings: The Fellowship of the Ring",
      year: 2001,
    },
    {
      title: "Star Wars: Episode V - The Empire Strikes Back",
      year: 1980,
    },
    { title: "Forrest Gump", year: 1994 },
    { title: "Inception", year: 2010 },
    {
      title: "The Lord of the Rings: The Two Towers",
      year: 2002,
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: "Goodfellas", year: 1990 },
    { title: "The Matrix", year: 1999 },
    { title: "Seven Samurai", year: 1954 },
    {
      title: "Star Wars: Episode IV - A New Hope",
      year: 1977,
    },
    { title: "City of God", year: 2002 },
    { title: "Se7en", year: 1995 },
    { title: "The Silence of the Lambs", year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: "Life Is Beautiful", year: 1997 },
    { title: "The Usual Suspects", year: 1995 },
    { title: "Léon: The Professional", year: 1994 },
    { title: "Spirited Away", year: 2001 },
    { title: "Saving Private Ryan", year: 1998 },
    { title: "Once Upon a Time in the West", year: 1968 },
    { title: "American History X", year: 1998 },
    { title: "Interstellar", year: 2014 },
    { title: "Casablanca", year: 1942 },
    { title: "City Lights", year: 1931 },
    { title: "Psycho", year: 1960 },
    { title: "The Green Mile", year: 1999 },
    { title: "The Intouchables", year: 2011 },
    { title: "Modern Times", year: 1936 },
    { title: "Raiders of the Lost Ark", year: 1981 },
    { title: "Rear Window", year: 1954 },
    { title: "The Pianist", year: 2002 },
    { title: "The Departed", year: 2006 },
    { title: "Terminator 2: Judgment Day", year: 1991 },
    { title: "Back to the Future", year: 1985 },
    { title: "Whiplash", year: 2014 },
    { title: "Gladiator", year: 2000 },
    { title: "Memento", year: 2000 },
    { title: "The Prestige", year: 2006 },
    { title: "The Lion King", year: 1994 },
    { title: "Apocalypse Now", year: 1979 },
    { title: "Alien", year: 1979 },
    { title: "Sunset Boulevard", year: 1950 },
    {
      title:
        "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
      year: 1964,
    },
    { title: "The Great Dictator", year: 1940 },
    { title: "Cinema Paradiso", year: 1988 },
    { title: "The Lives of Others", year: 2006 },
    { title: "Grave of the Fireflies", year: 1988 },
    { title: "Paths of Glory", year: 1957 },
    { title: "Django Unchained", year: 2012 },
    { title: "The Shining", year: 1980 },
    { title: "WALL·E", year: 2008 },
    { title: "American Beauty", year: 1999 },
    { title: "The Dark Knight Rises", year: 2012 },
    { title: "Princess Mononoke", year: 1997 },
    { title: "Aliens", year: 1986 },
    { title: "Oldboy", year: 2003 },
    { title: "Once Upon a Time in America", year: 1984 },
    { title: "Witness for the Prosecution", year: 1957 },
    { title: "Das Boot", year: 1981 },
    { title: "Citizen Kane", year: 1941 },
    { title: "North by Northwest", year: 1959 },
    { title: "Vertigo", year: 1958 },
    {
      title: "Star Wars: Episode VI - Return of the Jedi",
      year: 1983,
    },
    { title: "Reservoir Dogs", year: 1992 },
    { title: "Braveheart", year: 1995 },
    { title: "M", year: 1931 },
    { title: "Requiem for a Dream", year: 2000 },
    { title: "Amélie", year: 2001 },
    { title: "A Clockwork Orange", year: 1971 },
    { title: "Like Stars on Earth", year: 2007 },
    { title: "Taxi Driver", year: 1976 },
    { title: "Lawrence of Arabia", year: 1962 },
    { title: "Double Indemnity", year: 1944 },
    {
      title: "Eternal Sunshine of the Spotless Mind",
      year: 2004,
    },
    { title: "Amadeus", year: 1984 },
    { title: "To Kill a Mockingbird", year: 1962 },
    { title: "Toy Story 3", year: 2010 },
    { title: "Logan", year: 2017 },
    { title: "Full Metal Jacket", year: 1987 },
    { title: "Dangal", year: 2016 },
    { title: "The Sting", year: 1973 },
    { title: "2001: A Space Odyssey", year: 1968 },
    { title: "Singin' in the Rain", year: 1952 },
    { title: "Toy Story", year: 1995 },
    { title: "Bicycle Thieves", year: 1948 },
    { title: "The Kid", year: 1921 },
    { title: "Inglourious Basterds", year: 2009 },
    { title: "Snatch", year: 2000 },
    { title: "3 Idiots", year: 2009 },
    { title: "Monty Python and the Holy Grail", year: 1975 },
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

  // img
  const [imgurl, setImgurl] = useState(null);

  return (
    <div
      style={{
        backgroundColor: "#E2EBF0",
        height: "100vh",
        padding: "50px 10px",
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
            height: "90vh",
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
                    <Autocomplete
                      multiple
                      limitTags={3}
                      id="multiple-limit-tags"
                      options={top100Films}
                      variant="filled"
                      getOptionLabel={(option) => option.title}
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="filled"
                          label="Tags"
                          placeholder="Favorites"
                        />
                      )}
                      sx={{ width: "100%" }}
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
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        width: "50%",
                        margin: "auto",
                      }}
                    >
                      <div
                        className="imgcont"
                        style={{
                          width: "90%",
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
                            width: "90%",
                          }}
                        >
                          Upload
                          <input hidden accept="image/*" multiple type="file" />
                        </Button>
                      </div>
                    </div>
                    <div
                      style={{
                        width: "50%",
                        margin: "auto",
                      }}
                    >
                      <div
                        className="imgcont"
                        style={{
                          width: "90%",
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
                        <h2>Digital Signature</h2>
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
      </Box>
    </div>
  );
}
