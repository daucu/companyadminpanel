import {
  AppBar,
  Button,
  Divider,
  IconButton,
  InputLabel,
  TextField,
  Toolbar,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

function AddComplaints() {
  const [description, setDescription] = useState("");
  const [token, setToken] = useState("token");
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      description: description,
      title: title,
    };

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/complaints`, data, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        toast.success("Complaints Added Successfully");
      })
      .catch((e) => {
        console.log(e);
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
            ? "أضف الشكاوى"
            : "Add Complaints"}
          <Divider sx={{ flexGrow: 1 }} />
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
        </Toolbar>
      </AppBar>
      <form onSubmit={(e) => handleSubmit(e)}>
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
                  localStorage.getItem("language") === "arabic"
                    ? "20px"
                    : "16px",
              }}
            >
              {localStorage.getItem("language") === "arabic"
                ? "عنوان"
                : "Title"}
            </InputLabel>
          </div>
          <div
            style={{
              width: "75%",
            }}
          >
            <TextField
              id="outlined-basic"
              label={
                localStorage.getItem("language") === "arabic"
                  ? "عنوان"
                  : "Title"
              }
              size="small"
              name={title}
              onChange={(e) => setTitle(e.target.value)}
              variant="outlined"
              sx={{ width: "100%", marginTop: 1 }}
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
                  localStorage.getItem("language") === "arabic"
                    ? "20px"
                    : "16px",
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
              label={
                localStorage.getItem("language") === "arabic"
                  ? "وصف"
                  : "Description"
              }
              size="small"
              name={description}
              onChange={(e) => setDescription(e.target.value)}
              variant="outlined"
              sx={{ width: "100%", marginTop: 1 }}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddComplaints;
