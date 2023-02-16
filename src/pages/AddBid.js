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
import { toast } from "react-toastify";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function AddBid() {
  const navigate = useNavigate();

  const [auctionId, setAuctionId] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [currency, setCurrency] = useState("");
  const [createdBy, setCreatedBy] = useState(localStorage.getItem("token"));

  const [successLoading, setSuccessLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const tkn = localStorage.getItem("token");

  const handleSubmit = (e) => {
    setBtnLoading(true);
    e.preventDefault();

    const data = {
      auctionId,
      amount,
      description,
      currency,
      createdBy: tkn,
    };

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/bids`, data, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        setBtnLoading(false);

        toast.success("Bid Added Successfully");
        console.log(res.data);
      })
      .catch((e) => {
        setBtnLoading(false);
        console.log(e);
        toast.error("Error in Adding Bid");
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

  // code to fetch my-auction and map into select option
  const [auctionLoading, setAuctionLoading] = useState(false);
  const [countacution, setCountacution] = useState([]);
  const getallacutions = () => {
    setAuctionLoading(true);
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/auctions`)
      .then((res) => {
        console.log(res.data);
        // setProducts(res.data);
        // count the length of the total auctions and set it to the state
        setAuctionLoading(false);
        setCountacution(res.data);
      })
      .catch((err) => {
        setAuctionLoading(false);
        console.log(err);
      });
  };

  React.useEffect(() => {
    getallacutions();
  }, []);
  return (
    <div
      style={{
        marginTop: "20px",
      }}
    >
      <form>
        <AppBar position="static">
          <Toolbar variant="dense" sx={{ background: "#333" }}>
            Add New Bid
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
            <InputLabel htmlFor="outlined-adornment-amount">Auction</InputLabel>
          </div>
          <div
            style={{
              width: "75%",
            }}
          >
            {/* map the fetched auction in select option without multiple  */}
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={auctionId}
              label="Auction"
              size="small"
              onChange={(e) => setAuctionId(e.target.value)}
              sx={{
                width: "100%",
                textAlign: "left",
              }}
            >
              {countacution.map((item) => (
                <MenuItem value={item.id}>{item.title}</MenuItem>
              ))}
            </Select>
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
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          </div>
          <div
            style={{
              width: "75%",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Bid Price"
              name={amount}
              autoComplete="off"
              suggestion="off"
              onChange={(e) => setAmount(e.target.value)}
              type="number"
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
              multiline
              rows={4}
              name={description}
              onChange={(e) => setDescription(e.target.value)}
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
              Currency
            </InputLabel>
          </div>
          <div
            style={{
              width: "75%",
            }}
          >
            {/* tow dropdown for currenct but select only 1 */}
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currency}
              sx={{
                width: "100%",
                textAlign: "left",
              }}
              size="small"
              label="Currency"
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="SAR">SAR</MenuItem>
            </Select>
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

export default AddBid;
