import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Divider,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import axios from "axios";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import TextField from "@mui/material/TextField";

const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: "#1A2027",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: 1,
}));

export default function AddProduct() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(null);

  const handleClick = (e) => {
    console.log("click");
  };

  //get pages
  const [content, setContent] = React.useState([]);

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [salePrice, setSalePrice] = React.useState("");
  const [image, setImage] = React.useState("");
  const [vendor, setVendor] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [type, setType] = React.useState("");
  const [featured, setFeatured] = React.useState("");
  const [language, setLanguage] = React.useState("");
  const [bidDate, setBidDate] = React.useState("");
  const [company, setCompany] = React.useState("HarshaWeb");
  //Axios POST request

  const [successSnack, setSuccessSnack] = React.useState(false);
  const [successOpen, setSuccessOpen] = React.useState(false);
  const [errorSnack, setErrorSnack] = React.useState(false);
  const [errorOpen, setErrorOpen] = React.useState(false);

  // success snackbar
  const handlesuccessOpen = () => {
    setSuccessOpen(true);
  };
  const handlesuccessClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessOpen(false);
  };

  // error snackbar
  const handleerrorOpen = () => {
    setErrorOpen(true);
  };
  const handleerrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorOpen(false);
  };

  //Generate Slug
  const slug = slugify(title, {
    replacement: "-", // replace spaces with replacement
    remove: null, // regex to remove characters
    lower: true, // result in lower case
    remove: /[*+~.()'"!:@#/]/g,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("slug", slug);
    formdata.append("description", description);
    formdata.append("price", price);
    formdata.append("salePrice", salePrice);
    formdata.append("banner", image);
    formdata.append("vendor", vendor);
    formdata.append("status", status);
    formdata.append("category", category);
    formdata.append("type", type);
    formdata.append("featured", featured);
    formdata.append("language", language);
    formdata.append("bidDate", bidDate);
    formdata.append("company", company);

    console.log(formdata);

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/products`, formdata)
      .then((res) => {
        console.log(res);
        setSuccessSnack(res.data.message);
        handlesuccessOpen(true);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setErrorSnack(err.response.data.message);
        handleerrorOpen(true);
      });
  };

  return (
    <Box sx={{ flexGrow: 1, marginTop: 3 }}>
      <AppBar position="static">
        <Toolbar variant="dense" sx={{ background: "#333" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate("/products")}
          >
            <CloseIcon />
          </IconButton>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "60%",
              height: "35px",
              color: "#fff",
              backgroundColor: "#00000000",
              outline: "none",
              border: "none",
              fontSize: "1.2rem",
              placeholder: "Enter Page Title",
              placeholderColor: "#fff",
            }}
          />

          <Divider sx={{ flexGrow: 1 }} />
          {/* <IconButton edge="start" color="inherit" aria-label="menu">
            <AddIcon />
          </IconButton> */}
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

      <Grid container spacing={1} alignItems="stretch">
        <Grid item xs={12} alignItems="stretch">
          <form onSubmit={(e) => handleSubmit(e)}>
            <Item
              onDoubleClick={handleClick}
              sx={{
                height: "auto",
              }}
            >
              {/* Product title */}
              <TextField
                id="outlined-basic"
                placeholder="Product title"
                label="Product Title"
                name={title}
                onChange={(e) => setTitle(e.target.value)}
                focused={true}
                minRows={6}
                variant="filled"
                sx={{
                  width: "100%",
                  color: "#fff",
                  backgroundColor: "#f0f0f0",
                  outline: "none",
                  border: "none",
                  fontSize: "1.2rem",
                  placeholder: "Enter Page Title",
                  placeholderColor: "#fff",
                }}
              />
              {/* Product Description */}
              <TextField
                id="outlined-basic"
                placeholder="Product content"
                label="Product Description"
                focused={true}
                multiline={true}
                name={description}
                onChange={(e) => setDescription(e.target.value)}
                minRows={6}
                variant="filled"
                sx={{
                  width: "100%",
                  color: "#fff",
                  backgroundColor: "#f0f0f0",
                  outline: "none",
                  border: "none",
                  fontSize: "1.2rem",
                  placeholder: "Enter Page Title",
                  placeholderColor: "#fff",
                  marginTop: 1,
                }}
              />

              {/* Product price */}
              <TextField
                type={"number"}
                id="outlined-basic"
                placeholder="254"
                label="Price"
                name={price}
                onChange={(e) => setPrice(e.target.value)}
                focused={true}
                variant="filled"
                size="small"
                sx={{
                  width: "100%",
                  color: "#fff",
                  backgroundColor: "#f0f0f0",
                  outline: "none",
                  border: "none",
                  fontSize: "1rem",
                  placeholder: "Enter Page Title",
                  placeholderColor: "#fff",
                  marginTop: 1,
                }}
              />
              {/* sale price */}
              <TextField
                id="outlined-basic"
                placeholder="154"
                label="Sale Price"
                name={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
                focused={true}
                variant="filled"
                size="small"
                sx={{
                  width: "100%",
                  color: "#fff",
                  backgroundColor: "#f0f0f0",
                  outline: "none",
                  border: "none",
                  fontSize: "1rem",
                  placeholder: "Enter Page Title",
                  placeholderColor: "#fff",
                  marginTop: 1,
                }}
              />
              {/* Vendor */}
              <TextField
                id="outlined-basic"
                placeholder="Vendor name"
                label="Vendor"
                name={vendor}
                onChange={(e) => setVendor(e.target.value)}
                focused={true}
                variant="filled"
                size="small"
                sx={{
                  width: "100%",
                  color: "#fff",
                  backgroundColor: "#f0f0f0",
                  outline: "none",
                  border: "none",
                  fontSize: "1rem",
                  placeholder: "Enter Page Title",
                  placeholderColor: "#fff",
                  marginTop: 1,
                }}
              />
              {/* type */}
              <TextField
                id="outlined-basic"
                placeholder="Type"
                label="Type"
                name={type}
                onChange={(e) => setType(e.target.value)}
                focused={true}
                variant="filled"
                size="small"
                sx={{
                  width: "100%",
                  color: "#fff",
                  backgroundColor: "#f0f0f0",
                  outline: "none",
                  border: "none",
                  fontSize: "1rem",
                  placeholder: "Enter Page Title",
                  placeholderColor: "#fff",
                  marginTop: 1,
                }}
              />
              {/* Featured */}
              <TextField
                id="outlined-basic"
                placeholder="Featured"
                label="Featured"
                name={featured}
                onChange={(e) => setFeatured(e.target.value)}
                focused={true}
                variant="filled"
                size="small"
                sx={{
                  width: "100%",
                  color: "#fff",
                  backgroundColor: "#f0f0f0",
                  outline: "none",
                  border: "none",
                  fontSize: "1rem",
                  placeholder: "Enter Page Title",
                  placeholderColor: "#fff",
                  marginTop: 1,
                }}
              />
              {/* Language */}
              <TextField
                id="outlined-basic"
                placeholder="Language"
                label="Language"
                name={language}
                onChange={(e) => setLanguage(e.target.value)}
                focused={true}
                variant="filled"
                size="small"
                sx={{
                  width: "100%",
                  color: "#fff",
                  backgroundColor: "#f0f0f0",
                  outline: "none",
                  border: "none",
                  fontSize: "1rem",
                  placeholder: "Enter Page Title",
                  placeholderColor: "#fff",
                  marginTop: 1,
                }}
              />

              {/* Category */}
              <TextField
                id="outlined-basic"
                type={"file"}
                placeholder="https://google.com/image.png"
                label="Product Image"
                focused={true}
                name="banner"
                onChange={(e) => setImage(e.target.files[0])}
                variant="filled"
                size="small"
                sx={{
                  width: "100%",
                  color: "#fff",
                  backgroundColor: "#f0f0f0",
                  outline: "none",
                  border: "none",
                  fontSize: "1rem",
                  placeholder: "Enter Page Title",
                  placeholderColor: "#fff",
                  marginTop: 1,
                }}
              />

              {/* Category */}
              {/* <TextField
              id="outlined-basic"
              placeholder="sale"
              label="Product Category"
              focused={true}
              variant="filled"
              size="small"
              sx={{
                width: "100%",
                color: "#fff",
                backgroundColor: "#f0f0f0",
                outline: "none",
                border: "none",
                fontSize: "1rem",
                placeholder: "Enter Page Title",
                placeholderColor: "#fff",
                marginTop: 1,
              }}
            /> */}

              {/* Date */}
              <TextField
                type={"date"}
                id="outlined-basic"
                placeholder="13/09/2022"
                label="Ready for bid"
                focused={true}
                name={bidDate}
                onChange={(e) => setBidDate(e.target.value)}
                variant="filled"
                size="small"
                sx={{
                  width: "100%",
                  color: "#fff",
                  backgroundColor: "#f0f0f0",
                  outline: "none",
                  border: "none",
                  fontSize: "1rem",
                  placeholder: "Enter Page Title",
                  placeholderColor: "#fff",
                  marginTop: 1,
                }}
              />
              {/* Status */}
              <InputLabel
                id="demo-select-small"
                sx={{
                  textAlign: "left",
                  marginTop: 1,
                }}
              >
                Status
              </InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                name={status}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                label="Status"
                sx={{
                  width: "100%",
                  color: "black",
                  backgroundColor: "#f0f0f0",
                  outline: "none",
                  border: "none",
                  fontSize: "1rem",
                  placeholder: "Enter Page Title",
                  placeholderColor: "black",
                  marginTop: 1,
                  textAlign: "left",
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="unactive">Un-Active</MenuItem>
              </Select>
              {/* <TextField
              id="outlined-basic"
              placeholder="Active default"
              label="Status"
              focused={true}
              name={status}
              value="active"
              onChange={(e) => setStatus(e.target.value)}
              variant="filled"
              size="small"
              sx={{
                width: "100%",
                color: "#fff",
                backgroundColor: "#f0f0f0",
                outline: "none",
                border: "none",
                fontSize: "1rem",
                placeholder: "Enter Page Title",
                placeholderColor: "#fff",
                marginTop: 1,
              }}
            /> */}
            </Item>
          </form>
        </Grid>
        {/* success snach */}
        {successSnack ? (
          <Snackbar
            open={handlesuccessOpen}
            autoHideDuration={3000}
            onClose={handlesuccessClose}
          >
            <Alert
              onClose={handlesuccessClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              {successSnack}
            </Alert>
          </Snackbar>
        ) : null}

        {/* error snack */}
        {/* <Snackbar
          open={handleerrorOpen}
          autoHideDuration={3000}
          onClose={handleerrorClose}
        >
          <Alert
            onClose={handleerrorClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            {errorSnack}
          </Alert>
        </Snackbar> */}
      </Grid>
    </Box>
  );
}
