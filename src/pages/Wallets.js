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
import React from "react";
// what should i import to convet text to arabic?
import { useTranslation } from "react-i18next";

function Wallets() {
  const { t } = useTranslation();

  const deposit_money =()=>{
    
    var postData = {
      ivp_method: "create",
      ivp_currency: "INR",
      ivp_amount: "1.00",
      ivp_test: "1",
      ivp_authkey: "rz9N-G7Tgs^n42PG",
      ivp_store: "28142",
      return_auth:"https://www.google.com/",
      return_decl:"https://www.google.com/",
      return_can:"https://www.google.com/"
  };

    axios.post("https://secure.telr.com/gateway/order.json",postData)
    .then((res)=>{
      console.log(res);
    }).catch((err)=>{
      console.log(err);
    })
  }

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
          {/* if localstorage language is arabic then text should convert into arabic language */}
          {localStorage.getItem("language") === "arabic" ? "محافظ" : "Wallets"}
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
          <InputLabel htmlFor="outlined-adornment-amount">
            {localStorage.getItem("language") === "arabic" ? "كمية" : "Amount"}
          </InputLabel>
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
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div ></div>
        <div style={{ display: "flex", justifyContent:"space-between", width:"350px" }}> 
          <div >
            <Button
              variant="contained"
              size="small"
              color="success"
              sx={{
                boxShadow: 0,
                marginTop: "50px",
              }}
              style={{padding:"10px 20px"}}
            >
              Withdraw money
            </Button>
          </div>
          <div >
            <Button
              variant="contained"
              size="small"
              color="success"
              onClick={deposit_money}
              sx={{
                boxShadow: 0,
                marginTop: "50px",
              }}
              style={{padding:"10px 20px"}}
              
            >
              Deposit money
            </Button>
          </div>
        </div>


      </div>
    </div>
  );
}

export default Wallets;
