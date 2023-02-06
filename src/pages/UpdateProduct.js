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
import { useNavigate, useParams } from "react-router-dom";
import slugify from "slugify";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";

const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: "#1A2027",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: 1,
}));

export default function UpdateProduct() {
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
  const [saleprice, setSaleprice] = React.useState("");
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

  //   code to get product by slug
  const { slug } = useParams();

  const [productfetched, setProductfetched] = React.useState([]);

  async function getproductbyslug(slug) {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/products/slug/${slug}`)
      .then((res) => {
        console.log(res.data[0]);
        let data = res.data[0];
        setTitle(data.title);
        setDescription(data.description);
        setPrice(data.price);
        setSaleprice(data.salePrice);
        setImage(data.image);
        setVendor(data.vendor);
        setStatus(data.status);
        setCategory(data.category);
        setType(data.type);
        setFeatured(data.featured);
        setLanguage(data.language);
        setBidDate(data.bidDate);
        setCompany(data.company);

        setProductfetched(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getproductbyslug(slug);
  }, [slug]);

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

  // snack bar for product delete
  const delprod = () => {
    setProdDelSnac(true);
  };
  const delprodclose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setProdDelSnac(false);
  };

  const P_id = productfetched.productId;
  console.log(P_id);

  const handleSubmit = (e) => {
    // console.log("submit");

    e.preventDefault();

    // form data
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("saleprice", saleprice);
    formData.append("banner", image);
    formData.append("vendor", vendor);
    formData.append("status", status);
    formData.append("category", category);
    formData.append("type", type);
    formData.append("featured", featured);
    formData.append("language", language);
    formData.append("bidDate", bidDate);
    formData.append("company", company);

    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/products/${P_id}`, formData)
      .then((res) => {
        console.log(res);
        // setSuccessSnack(res.data.message);
        // handlesuccessOpen(true);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setErrorSnack(err.response.data.message);
        handleerrorOpen(true);
      });
  };

  const [prodDelSnac, setProdDelSnac] = React.useState(false);
  const handleproductdelete = (props) => {
    console.log("delete" + props);
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/products/${props}`)
      .then((res) => {
        console.log(res);
        delprod();
        setTimeout(() => {
          navigate("/admin/products");
        }, [1000]);
      })
      .catch((err) => {
        console.log(err);
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
            onClick={() => navigate("/admin/products")}
          >
            <CloseIcon />
            <Typography sx={{ marginLeft: 2 }}>Update Product</Typography>
          </IconButton>
          ( {productfetched.title} )
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
            Update
          </Button>
          <Button
            variant="contained"
            size="small"
            color="error"
            sx={{
              boxShadow: 0,
              // backgroundColor:"red",
              marginLeft: 2,
            }}
            onClick={() => handleproductdelete(P_id)}
          >
            Delete
          </Button>
        </Toolbar>
      </AppBar>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Grid container spacing={1} alignItems="stretch">
          <Grid item xs={12} alignItems="stretch">
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
                value={title}
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
                value={description}
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
                value={price}
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
                value={saleprice}
                onChange={(e) => setSaleprice(e.target.value)}
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
                value={vendor}
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
                value={type}
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
                value={featured}
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
                value={language}
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
                placeholder="https://google.com/image.png"
                label="Product Image"
                focused={true}
                type={"file"}
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
                value={bidDate}
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
             value={status}
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
          </Grid>
          {prodDelSnac ? (
            <Snackbar
              open={delprod}
              variant="filled"
              autoHideDuration={3000}
              onClose={delprodclose}
            >
              <Alert
                onClose={delprodclose}
                severity="success"
                variant="filled"
                sx={{ width: "100%" }}
              >
                Product Deleted Successfully
              </Alert>
            </Snackbar>
          ) : null}
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
      </form>
    </Box>
  );
}
