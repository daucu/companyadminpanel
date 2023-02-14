import {
  AppBar,
  Autocomplete,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Toolbar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import React, { useEffect, useState } from "react";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function AddBankAccount() {
  const navigate = useNavigate();

  const [bankAccount, setBankAccount] = useState("");
  const [iban, setIban] = useState("");
  const [country, setCountry] = useState("");

  const [successLoading, setSuccessLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const handleSubmit = (e) => {
    setBtnLoading(true);
    e.preventDefault();

    const data = {
      bankAccount,
      iban,
      country,
    };

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/account`, data, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        setBtnLoading(false);
        setSuccessLoading(true);
        handleClick();
        console.log(res.data);
      })
      .catch((e) => {
        setBtnLoading(false);
        console.log(e);
      });
  };

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <div
      style={{
        marginTop: "20px",
      }}
    >
      <form>
        <AppBar position="static">
          <Toolbar variant="dense" sx={{ background: "#333" }}>
            Add Bankaccounts
            <Divider sx={{ flexGrow: 1 }} />
            {btnLoading === true ? (
              <Button
                variant="contained"
                size="small"
                color="success"
                sx={{
                  boxShadow: 0,
                }}
                disabled
              >
                <CircularProgress size={20} />
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
              name={bankAccount}
              onChange={(e) => setBankAccount(e.target.value)}
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
            <InputLabel htmlFor="outlined-adornment-amount">IBAN</InputLabel>
          </div>
          <div
            style={{
              width: "75%",
            }}
          >
            <TextField
              id="outlined-basic"
              label="IBAN"
              name={iban}
              onChange={(e) => setIban(e.target.value)}
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
            <InputLabel htmlFor="outlined-adornment-amount">Country</InputLabel>
          </div>
          <div
            style={{
              width: "75%",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Country"
              name={country}
              onChange={(e) => setCountry(e.target.value)}
              size="small"
              variant="outlined"
              sx={{ width: "100%", marginTop: 2 }}
            />
          </div>
        </div>
      </form>
      {successLoading === true ? (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            position="bottom-right"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            severity="success"
            sx={{ width: "100%" }}
          >
            Bank Account Added Successfully
          </Alert>
        </Snackbar>
      ) : null}
    </div>
  );
}

export default AddBankAccount;
