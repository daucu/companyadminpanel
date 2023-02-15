// import {
//   AppBar,
//   Autocomplete,
//   Button,
//   CircularProgress,
//   Divider,
//   IconButton,
//   InputLabel,
//   MenuItem,
//   Select,
//   Snackbar,
//   TextField,
//   Toolbar,
// } from "@mui/material";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import MuiAlert from "@mui/material/Alert";

// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });
// function AddAuction() {
//   // code to get contract by id
//   const [allContract, setAllContract] = useState([]);
//   const getAllContract = async () => {
//     axios
//       .get(`${process.env.REACT_APP_BACKEND_URL}/contract`)
//       .then((res) => {
//         console.log(res.data);
//         setAllContract(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   useEffect(() => {
//     getAllContract();
//   }, []);

//   const [value, setValue] = useState("");
//   const [items, setItems] = useState([]);
//   const [currency, setCurrency] = useState("");
//   const [minimal_step, setMinimal_step] = useState("");
//   const [description, setDescription] = useState("");
//   const [token, setToken] = useState("jdhsakdhifsd8939djhi");
//   const [title, setTitle] = useState("");
//   const [type, setType] = useState("");
//   const [contract, setContract] = useState("");

//   // code to get products from backend and display them in the dropdown menu
//   const [getCompanyProducts, setGetCompanyProducts] = useState([]);
//   // const CompanyProductsData = async () => {

//   // }

//   const [products, setProducts] = React.useState([]);
//   React.useEffect(() => {
//     // get products
//     axios
//       .get(`${process.env.REACT_APP_BACKEND_URL}/products`)
//       .then((res) => {
//         console.log(res.data);
//         setProducts(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   const [successLoading, setSuccessLoading] = useState(false);
//   const [btnLoading, setBtnLoading] = useState(false);
//   const handleSubmit = (e) => {
//     setBtnLoading(true);
//     e.preventDefault();

//     const data = {
//       contract: contract,
//       value: value,
//       items: items,
//       currency: currency,
//       minimal_step: minimal_step,
//       description: description,
//       tkn: token,
//       title: title,
//       type: type,
//     };

//     axios
//       .post(`${process.env.REACT_APP_BACKEND_URL}/auctions`, data, {
//         headers: {
//           "x-access-token": localStorage.getItem("token"),
//         },
//       })
//       .then((res) => {
//         console.log(res);
//         setBtnLoading(false);
//         setSuccessLoading(true);
//         handleClick();
//         console.log(res.data);
//       })
//       .catch((e) => {
//         setBtnLoading(false);
//         console.log(e);
//       });
//   };

//   const [open, setOpen] = React.useState(false);

//   const handleClick = () => {
//     setOpen(true);
//   };

//   const handleClose = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }

//     setOpen(false);
//   };

//   // code to split the name of the product into two
//   const splitName = (name) => {
//     const splitName = name.split(" ");
//     return splitName[0] + " " + splitName[1] + " " + splitName[2] + " ...";
//   };

//   return (
//     <div
//       style={{
//         marginTop: "20px",
//       }}
//     >
//       <AppBar position="static">
//         <Toolbar variant="dense" sx={{ background: "#333" }}>
//           <IconButton
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             sx={{ mr: 2 }}
//           ></IconButton>
//           Add Auction
//           <Divider sx={{ flexGrow: 1 }} />
//           {btnLoading === true ? (
//             <Button
//               variant="contained"
//               size="small"
//               color="success"
//               sx={{
//                 boxShadow: 0,
//               }}
//               disabled
//             >
//               <CircularProgress size={20} color="success" />
//             </Button>
//           ) : (
//             <Button
//               variant="contained"
//               size="small"
//               color="success"
//               sx={{
//                 boxShadow: 0,
//               }}
//               onClick={handleSubmit}
//             >
//               Publish
//             </Button>
//           )}
//         </Toolbar>
//       </AppBar>
//       <form onSubmit={(e) => handleSubmit(e)}>
//         <div
//           style={{
//             marginTop: "10px",
//             // display: "flex",
//             alignItems: "center",
//           }}
//         >
//           <TextField
//             id="outlined-basic"
//             label="Title"
//             variant="outlined"
//             size="small"
//             name={title}
//             onChange={(e) => setTitle(e.target.value)}
//             style={{
//               width: "100%",
//               marginBottom: "10px",
//             }}
//           />
//           <TextField
//             id="outlined-basic"
//             label="Value"
//             variant="outlined"
//             size="small"
//             name={value}
//             onChange={(e) => setValue(e.target.value)}
//             style={{
//               width: "100%",
//               marginBottom: "10px",
//             }}
//           />
//           <TextField
//             id="outlined-basic"
//             label="Description"
//             multiline
//             rows={6}
//             variant="outlined"
//             size="small"
//             name={description}
//             onChange={(e) => setDescription(e.target.value)}
//             style={{
//               width: "100%",
//               marginBottom: "10px",
//             }}
//           />
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               // media query for mobile
//               "@media (max-width: 600px)": {
//                 display: "block",
//               },
//             }}
//           >
//             <div
//               style={{
//                 width: "40%",
//               }}
//             >
//               <Select
//                 labelId="demo-simple-select-label"
//                 id="demo-simple-select"
//                 value={currency}
//                 defaultChecked="USD"
//                 label="Currency"
//                 style={{
//                   width: "100%",
//                   textAlign: "left",
//                 }}
//                 size="small"
//                 // code to select the product from the dropdown menu and set the state
//                 onChange={(e) => setCurrency(e.target.value)}
//               >
//                 <MenuItem value="USD">USD</MenuItem>
//                 <MenuItem value="SAR">SAR</MenuItem>
//               </Select>
//             </div>
//             <div
//               style={{
//                 width: "33%",
//               }}
//             >
//               <TextField
//                 id="outlined-basic"
//                 label="Minimal Step"
//                 variant="outlined"
//                 size="small"
//                 name={minimal_step}
//                 onChange={(e) => setMinimal_step(e.target.value)}
//                 style={{
//                   width: "100%",
//                   marginBottom: "10px",
//                 }}
//               />
//             </div>
//             <div
//               style={{
//                 width: "33%",
//               }}
//             >
//               <TextField
//                 id="outlined-basic"
//                 label="Type"
//                 variant="outlined"
//                 size="small"
//                 name={type}
//                 onChange={(e) => setType(e.target.value)}
//                 style={{
//                   width: "100%",
//                   marginBottom: "10px",
//                 }}
//               />
//             </div>
//           </div>
//           {/* map fetched contract into select drop down */}

//           <InputLabel
//             id="demo-simple-select-label"
//             sx={{
//               textAlign: "left",
//             }}
//           >
//             Contract
//           </InputLabel>
//           <Select
//             labelId="demo-simple-select-label"
//             id="demo-simple-select"
//             value={contract}
//             size="small"
//             label="Contract"
//             onChange={(e) => setContract(e.target.value)}
//             sx={{
//               width: "100%",
//               marginBottom: "10px",
//               textAlign: "left",
//             }}
//           >
//             {allContract.map((contract) => (
//               <MenuItem value={contract.id}>{contract.title}</MenuItem>
//             ))}
//           </Select>

//           {/* dropdown menu */}
//           <Autocomplete
//             multiple
//             sx={{
//               width: "100%",
//               marginTop: "10px",
//             }}
//             label="Items"
//             defaultChecked={items}
//             isOptionEqualToValue={(option, value) => value == option.id}
//             id="tags-standard"
//             options={products}
//             name={items}
//             size="small"
//             //  get optionlabel from array without using map
//             // split option.name
//             getOptionLabel={(option) => splitName(option.name)}
//             // split fetched value
//             onChange={(e, value) => {
//               setItems(value.map((item) => item.id));
//             }}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 variant="outlined"
//                 label="Items"
//                 placeholder="Items"
//                 value={items}
//               />
//             )}
//           />
//         </div>
//         {successLoading === true ? (
//           <>
//             <Snackbar
//               open={open}
//               autoHideDuration={3000}
//               onClose={handleClose}
//               position="bottom-right"
//               anchorOrigin={{
//                 vertical: "bottom",
//                 horizontal: "right",
//               }}
//             >
//               <Alert
//                 onClose={handleClose}
//                 severity="success"
//                 sx={{ width: "100%" }}
//               >
//                 Auction added successfully
//               </Alert>
//             </Snackbar>
//           </>
//         ) : null}
//       </form>
//     </div>
//   );
// }

// export default AddAuction;

import {
  AppBar,
  Autocomplete,
  Button,
  Divider,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Toolbar,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

function AddAuction() {
  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);
  const [currency, setCurrency] = useState([]);
  const [minimal_step, setMinimal_step] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [contract, setContract] = useState("");
  const [contract_list, setContract_list] = useState([]);

  const [products, setProducts] = React.useState([]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      contract: contract,
      value: value,
      items: items,
      currency: currency,
      minimal_step: minimal_step,
      description: description,
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

  const currency_array = [{ label: "USD" }, { label: "SAR" }];
  const type_array = [{ label: "English" }, { label: "Dutch" }];
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
              sx={{ width: 300 }}
              onChange={(value) => {
                setCurrency(value.label);
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
              onChange={(value) => {
                setType(value.label);
              }}
              style={{
                width: "100%",
                marginBottom: "10px",
              }}
              renderInput={(params) => (
                <TextField {...params} label="English" />
              )}
            />
          </Stack>

          <Stack direction="row" spacing={2}>
            <Autocomplete
              disablePortal
              size="small"
              options={quick_start_array}
              sx={{ width: 300 }}
              onChange={(value) => {
                setType(value.label);
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
              onChange={(e) => setMinimal_step(e.target.value)}
              style={{
                width: "100%",
                marginBottom: "10px",
              }}
            />
          </Stack>

          {/* <Autocomplete
            disablePortal
            size="small"
            options={contract_array}
            sx={{ width: 300 }}
            onChange={(value) => {
              setContract(value.label);
            }}
            style={{
              width: "100%",
              marginBottom: "10px",
            }}
            renderInput={(params) => <TextField {...params} label="Contract" />}
          /> */}

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
            {contract_list.map((contract) => (
              <MenuItem sx={{
                boxShadow: 0,
              }} value={contract.id}>{contract.title}</MenuItem>
            ))}
          </Select>

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
          />
        </div>
      </form>
    </div>
  );
}

export default AddAuction;
