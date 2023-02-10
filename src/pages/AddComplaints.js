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

function AddComplaints() {
  const [contract, setContract] = useState("");
  const [value, setValue] = useState("");
  const [items, setItems] = useState("");
  const [currency, setCurrency] = useState("");
  const [minimal_step, setMinimal_step] = useState("");
  const [description, setDescription] = useState("");
  const [token, setToken] = useState("token");
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      contract: contract,
      value: value,
      items: items,
      currency: currency,
      minimal_step: minimal_step,
      description: description,
      token: token,
      title: title,
    };

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/bids`, data)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div
      style={{
        marginTop: "20px",
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
          Add Complaints
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
            <InputLabel htmlFor="outlined-adornment-amount">
              Contract
            </InputLabel>
          </div>
          <div
            style={{
              width: "75%",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Contract"
              name={contract}
              onChange={(e) => setContract(e.target.value)}
              size="small"
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
            <InputLabel htmlFor="outlined-adornment-amount">Value</InputLabel>
          </div>
          <div
            style={{
              width: "75%",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Value"
              name={value}
              onChange={(e) => setValue(e.target.value)}
              size="small"
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
            <InputLabel htmlFor="outlined-adornment-amount">Items</InputLabel>
          </div>
          <div
            style={{
              width: "75%",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Items"
              size="small"
              name={items}
              onChange={(e) => setItems(e.target.value)}
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
            <InputLabel htmlFor="outlined-adornment-amount">
              Currency
            </InputLabel>
          </div>
          <div
            style={{
              width: "75%",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Currency"
              size="small"
              name={currency}
              onChange={(e) => setCurrency(e.target.value)}
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
            <InputLabel htmlFor="outlined-adornment-amount">
              Minimal_step
            </InputLabel>
          </div>
          <div
            style={{
              width: "75%",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Minimal_step"
              size="small"
              name={minimal_step}
              onChange={(e) => setMinimal_step(e.target.value)}
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
            <InputLabel htmlFor="outlined-adornment-amount">
              Description
            </InputLabel>
          </div>
          <div
            style={{
              width: "75%",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Description"
              size="small"
              name={description}
              onChange={(e) => setDescription(e.target.value)}
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
            <InputLabel htmlFor="outlined-adornment-amount">Title</InputLabel>
          </div>
          <div
            style={{
              width: "75%",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Title"
              size="small"
              name={title}
              onChange={(e) => setTitle(e.target.value)}
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
