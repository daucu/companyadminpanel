import {
  AppBar,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  InputLabel,
  TextField,
  Toolbar,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

function Add_jobs() {
  // code to post jobs to the database
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [company, setCompany] = useState("");

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    // code to get email and username from token and post with the job
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/jobs`,
        {
          title,
          description,
          location,
          salary,
          company,
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        setLoading(false);
        toast.success("Job added successfully");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error("Something went wrong");
      });
  };

  return (
    <div
      style={{
        marginTop: "20px",
        direction:
          localStorage.getItem("language") === "arabic" ? "rtl" : "ltr",
      }}
    >
      <AppBar position="static">
        <Toolbar variant="dense" sx={{ background: "#333" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          {localStorage.getItem("language") === "arabic"
            ? "وظائف"
            : "Add New Job"}
          <Divider sx={{ flexGrow: 1 }} />
          {loading === true ? (
            <Button
              variant="contained"
              size="small"
              color="success"
              sx={{
                boxShadow: 0,
              }}
              disabled
            >
              <CircularProgress size={20} color="success" />
            </Button>
          ) : (
            <Button
              variant="contained"
              size="small"
              color="success"
              sx={{
                boxShadow: 0,
              }}
              onClick={handleSubmit}
            >
              Publish
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "25%",
              padding: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <InputLabel
              htmlFor="outlined-adornment-amount"
              style={{
                fontSize:
                  localStorage.getItem("language") === "arabic" ? 25 : 17,
              }}
            >
              {localStorage.getItem("language") === "arabic" ? "اسم" : "Title"}
            </InputLabel>
          </div>
          <div
            style={{
              width: "75%",
            }}
          >
            <TextField
              id="outlined-basic"
              size="small"
              name={title}
              onChange={(e) => setTitle(e.target.value)}
              variant="outlined"
              sx={{ width: "100%", marginTop: 2 }}
            />
          </div>
        </div>
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "25%",
              padding: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <InputLabel
              htmlFor="outlined-adornment-amount"
              style={{
                fontSize:
                  localStorage.getItem("language") === "arabic" ? 25 : 17,
              }}
            >
              {localStorage.getItem("language") === "arabic"
                ? "وصف"
                : "Description"}
            </InputLabel>
          </div>
          <div
            style={{
              width: "75%",
            }}
          >
            <TextField
              id="outlined-basic"
              size="small"
              name={description}
              onChange={(e) => setDescription(e.target.value)}
              variant="outlined"
              sx={{ width: "100%", marginTop: 2 }}
            />
          </div>
        </div>
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "25%",
              padding: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <InputLabel
              htmlFor="outlined-adornment-amount"
              style={{
                fontSize:
                  localStorage.getItem("language") === "arabic" ? 25 : 17,
              }}
            >
              {localStorage.getItem("language") === "arabic"
                ? "الموقع"
                : "Location"}
            </InputLabel>
          </div>
          <div
            style={{
              width: "75%",
            }}
          >
            <TextField
              id="outlined-basic"
              size="small"
              name={location}
              onChange={(e) => setLocation(e.target.value)}
              variant="outlined"
              sx={{ width: "100%", marginTop: 2 }}
            />
          </div>
        </div>
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "25%",
              padding: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <InputLabel
              htmlFor="outlined-adornment-amount"
              style={{
                fontSize:
                  localStorage.getItem("language") === "arabic" ? 25 : 17,
              }}
            >
              {localStorage.getItem("language") === "arabic"
                ? "المرتب"
                : "Salary"}
            </InputLabel>
          </div>
          <div
            style={{
              width: "75%",
            }}
          >
            <TextField
              id="outlined-basic"
              size="small"
              name={salary}
              onChange={(e) => setSalary(e.target.value)}
              variant="outlined"
              sx={{ width: "100%", marginTop: 2 }}
            />
          </div>
        </div>
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "25%",
              padding: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <InputLabel
              htmlFor="outlined-adornment-amount"
              style={{
                fontSize:
                  localStorage.getItem("language") === "arabic" ? 25 : 17,
              }}
            >
              {localStorage.getItem("language") === "arabic"
                ? "الشركة"
                : "Company"}
            </InputLabel>
          </div>
          <div
            style={{
              width: "75%",
            }}
          >
            <TextField
              id="outlined-basic"
              size="small"
              name={company}
              onChange={(e) => setCompany(e.target.value)}
              variant="outlined"
              sx={{ width: "100%", marginTop: 2 }}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Add_jobs;
