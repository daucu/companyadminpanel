import {
  AppBar,
  Autocomplete,
  Button,
  Divider,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Toolbar,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";

function AddAuction() {
  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);
  const [currency, setCurrency] = useState([]);
  const [minimal_step, setMinimal_step] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [contract, setContract] = useState("");
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");
  const [contract_list, setContract_list] = useState([]);

  const [products, setProducts] = React.useState([]);

  const [loading, setLoading] = useState(false);

  //Get products
  async function getProducts() {
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
  }

  //Get contract address
  async function getContract() {
    // get products
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/contract`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setContract_list(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function addNewAuction() {
    setLoading(true);
    const data = {
      title: title,
      description: description,
      type: type,
      value: value,
      minimal_step: minimal_step,
      currency: currency,
      items: items,
      contract: contract,
      start_date: start_date,
      end_date: end_date,
    };

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/auctions`, {
        title: title, //done
        description: description, //done
        type: type, //Nope
        value: value, //done
        minimal_step: minimal_step, //done
        currency: currency, //nope
        items: items, //done
        contract: contract, //done
        start_date: start_date, //nope
        end_date: end_date, //done
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setLoading(false);
        toast.success(res.data.message);
      })
      .catch((e) => {
        setLoading(false);
        toast.error(e.response.data.message);
      });
  }

  const currency_array = [
    { label: "USD", value: "usd" },
    { label: "SAR", value: "sar" },
  ];
  const type_array = [
    { label: "English", value: "en" },
    { label: "Dutch", value: "du" },
  ];
  const contract_array = [{ label: "No Contract Found" }];
  const quick_start_array = [
    {
      label: "After 5 minutes",
      value: 300,
    },
    {
      label: "After 10 minutes",
      value: 600,
    },
    {
      label: "After 15 minutes",
      value: 900,
    },
    {
      label: "After 30 minutes",
      value: 1800,
    },
    {
      label: "After 1 hour",
      value: 3600,
    },
    {
      label: "After 2 hours",
      value: 7200,
    },
    {
      label: "After 3 hours",
      value: 10800,
    },
    {
      label: "After 4 hours",
      value: 14400,
    },
    {
      label: "After 5 hours",
      value: 18000,
    },
    {
      label: "After 6 hours",
      value: 21600,
    },
    {
      label: "After 7 hours",
      value: 25200,
    },
    {
      label: "After 8 hours",
      value: 28800,
    },
    {
      label: "After 9 hours",
      value: 32400,
    },
    {
      label: "After 10 hours",
      value: 36000,
    },
    {
      label: "After 11 hours",
      value: 39600,
    },
    {
      label: "After 12 hours",
      value: 43200,
    },
  ];

  React.useEffect(() => {
    getProducts();
    getContract();
  }, []);

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
          <Button
            variant="contained"
            size="small"
            color="success"
            sx={{
              boxShadow: 0,
            }}
            disabled={loading}
            onClick={() => addNewAuction()}
          >
            {loading === true ? "Loading..." : "Add Auction"}
          </Button>
        </Toolbar>
      </AppBar>
      <form>
        <Stack
          spacing={3}
          sx={{
            marginTop: "10px",
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

          <Stack direction="row" spacing={2}>
            <TextField
              id="outlined-basic"
              label="Value"
              variant="outlined"
              size="small"
              type={"number"}
              name={value}
              onChange={(e) => setValue(e.target.value)}
              style={{
                width: "100%",
                marginBottom: "10px",
              }}
            />

            <Autocomplete
              disablePortal
              size="small"
              options={currency_array}
              getOptionLabel={(e) => e.label}
              sx={{ width: 300 }}
              onChange={(e, value) => {
                setCurrency(value.value);
              }}
              style={{
                width: "100%",
                marginBottom: "10px",
              }}
              renderInput={(params) => <TextField {...params} label="USD" />}
            />
          </Stack>

          <Stack direction="row" spacing={2}>
            <TextField
              id="outlined-basic"
              label="Minimal Step"
              variant="outlined"
              size="small"
              type={"number"}
              name={minimal_step}
              onChange={(e) => setMinimal_step(e.target.value)}
              style={{
                width: "100%",
                marginBottom: "10px",
              }}
            />

            <Autocomplete
              disablePortal
              size="small"
              options={type_array}
              sx={{ width: 300 }}
              onChange={(e) => {
                setType(e.target.value);
              }}
              style={{
                width: "100%",
                marginBottom: "10px",
              }}
              renderInput={(params) => <TextField {...params} label="Type" />}
            />
          </Stack>

          <Stack direction="row" spacing={2}>
            <Autocomplete
              disablePortal
              size="small"
              options={quick_start_array}
              getOptionLabel={(e) => e.label}
              sx={{ width: 300 }}
              onChange={(e, value) => {
                setStart_date(value.value);
              }}
              style={{
                width: "100%",
                marginBottom: "10px",
              }}
              renderInput={(params) => (
                <TextField {...params} label="Quick start time" />
              )}
            />

            <TextField
              id="outlined-basic"
              label="End time"
              variant="outlined"
              size="small"
              type={"datetime-local"}
              name={minimal_step}
              onChange={(e) => setEnd_date(e.target.value)}
              style={{
                width: "100%",
                marginBottom: "10px",
              }}
            />
          </Stack>

          <Autocomplete
            disablePortal
            size="small"
            options={contract_list}
            getOptionLabel={(e) => e.title}
            sx={{ width: 300 }}
            onChange={(e, value) => {
              setContract(value.id);
            }}
            style={{
              width: "100%",
              marginBottom: "10px",
            }}
            renderInput={(params) => <TextField {...params} label="Contract" />}
          />

          {/* <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={contract}
            size="small"
            variant="filled"
            label="Contract"
            onChange={(e) => setContract(e.target.value)}
            sx={{
              width: "100%",
              marginBottom: "10px",
              textAlign: "left",
            }}
          >
            {contract_list.map((contract) => (
              <MenuItem sx={{
                boxShadow: 0,
              }} value={contract.id}>{contract.title}</MenuItem>
            ))}
          </Select> */}

          {/* dropdown menu */}
          {/* <Autocomplete
            sx={{
              width: "100%",
            }}
            label="Items"
            defaultChecked={items}
            isOptionEqualToValue={(option, value) => value == option.id}
            id="tags-standard"
            options={products}
            name={items}
            size="small"
            //  get optionlabel from array without using map
            getOptionLabel={(option) => option.name}
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
          /> */}

          {/* code to map product into select dropdown without multiple selector  */}
          <InputLabel
            id="demo-simple-select-label"
            sx={{
              width: "100%",
              textAlign: "left",
              paddingLeft: "10px",
            }}
          >
            Items
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={items}
            size="small"
            label="Items"
            onChange={(e) => setItems(e.target.value)}
            sx={{
              width: "100%",
              marginBottom: "10px",
              textAlign: "left",
            }}
          >
            {products.map((product) => (
              <MenuItem
                sx={{
                  boxShadow: 0,
                }}
                value={product.id}
              >
                {product.name}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </form>
    </div>
  );
}

export default AddAuction;
