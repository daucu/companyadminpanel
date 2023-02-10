import {
  AppBar,
  Button,
  Divider,
  IconButton,
  InputLabel,
  TextField,
  Toolbar,
} from "@mui/material";
import React from "react";

function Wallets() {
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
          Wallets
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
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "30%",
          }}
        >
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
        </div>
        <div
          style={{
            width: "70%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "40%",
              margin: "auto",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Balance"
              size="small"
              variant="outlined"
              disabled
              sx={{ width: "100%", marginTop: 2 }}
            />
          </div>
          <div
            style={{
              width: "40%",
              margin: "auto",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Currency"
              size="small"
              variant="outlined"
              sx={{ width: "100%", marginTop: 2 }}
            />
          </div>
        </div>
      </div>
      <div>
        <Button
          variant="contained"
          size="small"
          color="success"
          sx={{
            boxShadow: 0,
            marginTop: "50px",
          }}
        >
          Withdraw money
        </Button>
      </div>
    </div>
  );
}

export default Wallets;