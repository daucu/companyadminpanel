import {
  AppBar,
  Autocomplete,
  Button,
  Divider,
  IconButton,
  InputLabel,
  TextField,
  Toolbar,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

function AddAuction() {
  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);
  const [currency, setCurrency] = useState("");
  const [minimal_step, setMinimal_step] = useState("");
  const [description, setDescription] = useState("");
  const [token, setToken] = useState("token");
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
          Add Auction
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
              alignItems: "center",
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
              <TextField
                id="outlined-basic"
                label="Currency"
                variant="outlined"
                size="small"
                name={currency}
                onChange={(e) => setCurrency(e.target.value)}
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
          <TextField
            id="outlined-basic"
            label="Contract"
            variant="outlined"
            size="small"
            name={contract}
            onChange={(e) => setContract(e.target.value)}
            style={{
              width: "100%",
              marginBottom: "10px",
            }}
          />
          {/* dropdown menu */}
          <Autocomplete
            multiple
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
            getOptionLabel={(option) => option.title}
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
      </form>
    </div>
  );
}

export default AddAuction;
