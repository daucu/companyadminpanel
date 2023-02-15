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
import axios from "axios";
import React, { useEffect, useState } from "react";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function AddAuction() {
  // code to get contract by id
  const [allContract, setAllContract] = useState([]);
  const getAllContract = async () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/contract`)
      .then((res) => {
        console.log(res.data);
        setAllContract(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllContract();
  }, []);

  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);
  const [currency, setCurrency] = useState("");
  const [minimal_step, setMinimal_step] = useState("");
  const [description, setDescription] = useState("");
  const [token, setToken] = useState("jdhsakdhifsd8939djhi");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [contract, setContract] = useState("");

  // code to get products from backend and display them in the dropdown menu
  const [getCompanyProducts, setGetCompanyProducts] = useState([]);
  // const CompanyProductsData = async () => {

  // }

  const [products, setProducts] = React.useState([]);
  React.useEffect(() => {
    // get products
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/products`)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [successLoading, setSuccessLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const handleSubmit = (e) => {
    setBtnLoading(true);
    e.preventDefault();

    const data = {
      contract: contract,
      value: value,
      items: items,
      currency: currency,
      minimal_step: minimal_step,
      description: description,
      tkn: token,
      title: title,
      type: type,
    };

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/auctions`, data, {
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

  // code to split the name of the product into two
  const splitName = (name) => {
    const splitName = name.split(" ");
    return splitName[0] + " " + splitName[1];
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
          Add Auction
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
            marginTop: "10px",
            // display: "flex",
            alignItems: "center",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            size="small"
            name={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              marginBottom: "10px",
            }}
          />
          <TextField
            id="outlined-basic"
            label="Value"
            variant="outlined"
            size="small"
            name={value}
            onChange={(e) => setValue(e.target.value)}
            style={{
              width: "100%",
              marginBottom: "10px",
            }}
          />
          <TextField
            id="outlined-basic"
            label="Description"
            multiline
            rows={6}
            variant="outlined"
            size="small"
            name={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              width: "100%",
              marginBottom: "10px",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              // media query for mobile
              "@media (max-width: 600px)": {
                display: "block",
              },
            }}
          >
            <div
              style={{
                width: "40%",
              }}
            >
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currency}
                defaultChecked="USD"
                label="Currency"
                style={{
                  width: "100%",
                  textAlign: "left",
                }}
                size="small"
                // code to select the product from the dropdown menu and set the state
                onChange={(e) => setCurrency(e.target.value)}
              >
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="SAR">SAR</MenuItem>
              </Select>
            </div>
            <div
              style={{
                width: "33%",
              }}
            >
              <TextField
                id="outlined-basic"
                label="Minimal Step"
                variant="outlined"
                size="small"
                name={minimal_step}
                onChange={(e) => setMinimal_step(e.target.value)}
                style={{
                  width: "100%",
                  marginBottom: "10px",
                }}
              />
            </div>
            <div
              style={{
                width: "33%",
              }}
            >
              <TextField
                id="outlined-basic"
                label="Type"
                variant="outlined"
                size="small"
                name={type}
                onChange={(e) => setType(e.target.value)}
                style={{
                  width: "100%",
                  marginBottom: "10px",
                }}
              />
            </div>
          </div>
          {/* map fetched contract into select drop down */}

          <InputLabel
            id="demo-simple-select-label"
            sx={{
              textAlign: "left",
            }}
          >
            Contract
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={contract}
            size="small"
            label="Contract"
            onChange={(e) => setContract(e.target.value)}
            sx={{
              width: "100%",
              marginBottom: "10px",
              textAlign: "left",
            }}
          >
            {allContract.map((contract) => (
              <MenuItem value={contract.id}>{contract.title}</MenuItem>
            ))}
          </Select>

          {/* dropdown menu */}
          <Autocomplete
            multiple
            sx={{
              width: "100%",
              marginTop: "10px",
            }}
            label="Items"
            defaultChecked={items}
            isOptionEqualToValue={(option, value) => value == option.id}
            id="tags-standard"
            options={products}
            name={items}
            size="small"
            //  get optionlabel from array without using map
            // split option.name
            getOptionLabel={(option) => splitName(option.name)}
            // split fetched value
            onChange={(e, value) => {
              setItems(value.map((item) => item.id));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Items"
                placeholder="Items"
                value={items}
              />
            )}
          />
        </div>
        {successLoading === true ? (
          <>
            <Snackbar
              open={open}
              autoHideDuration={3000}
              onClose={handleClose}
              position="bottom-right"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                Auction added successfully
              </Alert>
            </Snackbar>
          </>
        ) : null}
      </form>
    </div>
  );
}

export default AddAuction;
