import {
  AppBar,
  Divider,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Toolbar,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

function Profile() {
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [description, setDescription] = useState("");
  const [contact_email, setContact_email] = useState("");
  const [company_owner, setCompany_owner] = useState("");
  const [contact_phone, setContact_phone] = useState("");
  const [gst, setGst] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");

  const [companyProfileData, setCompanyProfileData] = React.useState([]);
  const getCompanyProfileData = async () => {
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/profile/company`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data[0].data);
        setCompanyProfileData(res.data[0].data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  React.useEffect(() => {
    getCompanyProfileData();
  }, []);

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
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
          Profile
          <Divider sx={{ flexGrow: 1 }} />
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
          <InputLabel htmlFor="outlined-adornment-amount">Name</InputLabel>
        </div>
        <div
          style={{
            width: "75%",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Name"
            size="small"
            variant="outlined"
            sx={{ width: "100%", marginTop: 2 }}
          />
        </div>
      </div>
      <div
        style={{
          marginTop: "10px",
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
          <InputLabel htmlFor="outlined-adornment-amount">Logo</InputLabel>
        </div>
        <div
          style={{
            width: "75%",
          }}
        >
          <TextField
            type={"file"}
            id="outlined-basic"
            size="small"
            variant="outlined"
            sx={{ width: "100%", marginTop: 1 }}
          />
        </div>
      </div>
      <div
        style={{
          marginTop: "10px",
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
            Discription
          </InputLabel>
        </div>
        <div
          style={{
            width: "75%",
          }}
        >
          <TextField
            label="Discription"
            multiline
            rows={4}
            id="outlined-basic"
            size="small"
            variant="outlined"
            sx={{ width: "100%", marginTop: 1 }}
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
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            size="small"
            onChange={handleChange}
            sx={{
              width: "100%",
              textAlign: "left",
            }}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </div>
      </div>
      <div
        style={{
          marginTop: "10px",
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
            Google Map
          </InputLabel>
        </div>
        <div
          style={{
            width: "75%",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Google map url location
            "
            placeholder="Google map url location
            "
            size="small"
            variant="outlined"
            sx={{ width: "100%", marginTop: 1 }}
          />
        </div>
      </div>
      <div
        style={{
          marginTop: "10px",
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
            License number
          </InputLabel>
        </div>
        <div
          style={{
            width: "75%",
          }}
        >
          <TextField
            id="outlined-basic"
            label="License Number registered in selected country
            "
            placeholder="License Number registered in selected country
            "
            size="small"
            variant="outlined"
            sx={{ width: "100%", marginTop: 1 }}
          />
        </div>
      </div>
      <div
        style={{
          marginTop: "10px",
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
            Company Owner
          </InputLabel>
        </div>
        <div
          style={{
            width: "75%",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Company
            "
            placeholder="Owner
            "
            size="small"
            variant="outlined"
            sx={{ width: "100%", marginTop: 1 }}
          />
        </div>
      </div>
      <div
        style={{
          marginTop: "10px",
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
          <InputLabel htmlFor="outlined-adornment-amount">User name</InputLabel>
        </div>
        <div
          style={{
            width: "75%",
          }}
        >
          <TextField
            id="outlined-basic"
            label="User name
            "
            placeholder="User name
            "
            size="small"
            variant="outlined"
            sx={{ width: "100%", marginTop: 1 }}
          />
        </div>
      </div>
      <div
        style={{
          marginTop: "10px",
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
            User mobile
          </InputLabel>
        </div>
        <div
          style={{
            width: "75%",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Mobile
            "
            placeholder="Mobile
            "
            size="small"
            variant="outlined"
            sx={{ width: "100%", marginTop: 1 }}
          />
        </div>
      </div>
      <div
        style={{
          marginTop: "10px",
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
            User Email
          </InputLabel>
        </div>
        <div
          style={{
            width: "75%",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Email
            "
            placeholder="Email
            "
            size="small"
            variant="outlined"
            sx={{ width: "100%", marginTop: 1 }}
          />
        </div>
      </div>
      <div
        style={{
          marginTop: "10px",
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
          <InputLabel htmlFor="outlined-adornment-amount">User Role</InputLabel>
        </div>
        <div
          style={{
            width: "75%",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Role
            "
            placeholder="Role
            "
            size="small"
            variant="outlined"
            sx={{ width: "100%", marginTop: 1 }}
          />
        </div>
      </div>
      <div
        style={{
          marginTop: "10px",
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
            User signature
          </InputLabel>
        </div>
        <div
          style={{
            width: "75%",
          }}
        >
          <TextField
            type={"file"}
            id="outlined-basic"
            size="small"
            variant="outlined"
            sx={{ width: "100%", marginTop: 1 }}
          />
        </div>
      </div>
      <div
        style={{
          marginTop: "10px",
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
            Company Stamp
          </InputLabel>
        </div>
        <div
          style={{
            width: "75%",
          }}
        >
          <TextField
            type={"file"}
            id="outlined-basic"
            size="small"
            variant="outlined"
            sx={{ width: "100%", marginTop: 1 }}
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
