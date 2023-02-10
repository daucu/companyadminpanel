import {
  AppBar,
  Divider,
  IconButton,
  InputLabel,
  TextField,
  Toolbar,
} from "@mui/material";
import React from "react";

function Bankaccounts() {
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
          Bankaccounts
          <Divider sx={{ flexGrow: 1 }} />
          {/* <IconButton edge="start" color="inherit" aria-label="menu">
            <AddIcon />
          </IconButton> */}
        </Toolbar>
      </AppBar>
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
          <InputLabel htmlFor="outlined-adornment-amount">
            Bank Account
          </InputLabel>
        </div>
        <div
          style={{
            width: "75%",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Bank Account"
            size="small"
            variant="outlined"
            sx={{ width: "100%", marginTop: 2 }}
          />
        </div>
      </div>
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
          <InputLabel htmlFor="outlined-adornment-amount">
       IBAN
          </InputLabel>
        </div>
        <div
          style={{
            width: "75%",
          }}
        >
          <TextField
            id="outlined-basic"
            label="IBAN"
            size="small"
            variant="outlined"
            sx={{ width: "100%", marginTop: 2 }}
          />
        </div>
      </div>
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
          <InputLabel htmlFor="outlined-adornment-amount">
            Country
          </InputLabel>
        </div>
        <div
          style={{
            width: "75%",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Country"
            size="small"
            variant="outlined"
            sx={{ width: "100%", marginTop: 2 }}
          />
        </div>
      </div>
       
    </div>
  );
}

export default Bankaccounts;
