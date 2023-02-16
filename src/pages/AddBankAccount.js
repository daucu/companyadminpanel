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

  const [account_number, setAccount_number] = useState("");
  const [account_type, setAccount_type] = useState("");
  const [address, setAddress] = useState("");
  const [bank_name, setBank_name] = useState("");
  const [branch_name, setBranch_name] = useState("");
  const [ifsc_code, setIfsc_code] = useState("");
  const [swift_code, setSwift_code] = useState("");
  const [createdBy, setCreatedBy] = useState("");

  const [successLoading, setSuccessLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const tkn = localStorage.getItem("token");

  const handleSubmit = (e) => {
    setBtnLoading(true);
    e.preventDefault();

    const data = {
      account_number,
      account_type,
      address,
      bank_name,
      branch_name,
      ifsc_code,
      swift_code,
      createdBy: tkn,
      ifsc_code,
      swift_code,
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
              Bank Name
            </InputLabel>
          </div>
          <div
            style={{
              width: "75%",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Bank Name"
              size="small"
              name={bank_name}
              onChange={(e) => setBank_name(e.target.value)}
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
              Branch Name
            </InputLabel>
          </div>
          <div
            style={{
              width: "75%",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Branch Name"
              name={branch_name}
              onChange={(e) => setBranch_name(e.target.value)}
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
              Account Type
            </InputLabel>
          </div>
          <div
            style={{
              width: "75%",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Account Type"
              name={account_type}
              onChange={(e) => setAccount_type(e.target.value)}
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
              Account Number
            </InputLabel>
          </div>
          <div
            style={{
              width: "75%",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Account Number"
              name={account_number}
              onChange={(e) => setAccount_number(e.target.value)}
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
            <InputLabel htmlFor="outlined-adornment-amount">Address</InputLabel>
          </div>
          <div
            style={{
              width: "75%",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Address"
              name={address}
              onChange={(e) => setAddress(e.target.value)}
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
              IFSC Code
            </InputLabel>
          </div>
          <div
            style={{
              width: "75%",
            }}
          >
            <TextField
              id="outlined-basic"
              label="IFSC"
              name={ifsc_code}
              onChange={(e) => setIfsc_code(e.target.value)}
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
              SWIFT Code
            </InputLabel>
          </div>
          <div
            style={{
              width: "75%",
            }}
          >
            <TextField
              id="outlined-basic"
              label="SWIFT"
              name={swift_code}
              onChange={(e) => setSwift_code(e.target.value)}
              size="small"
              variant="outlined"
              sx={{ width: "100%", marginTop: 2 }}
            />
          </div>
        </div>
      </form>
      {successLoading === true ? (
        <Snackbar
          open={open}
          autoHideDuration={3000}
          position="bottom-right"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          onClose={handleClose}
        >
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
