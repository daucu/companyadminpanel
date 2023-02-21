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
  const [email, setEmail] = useState("");
  const [companyProfileData, setCompanyProfileData] = React.useState([]);
  const [userprofileData, setUserprofileData] = useState([]);
  const getCompanyProfileData = async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/profile`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setUserprofileData(res.data);
        setName(res.data.name);
        setCountry(res.data.country);
        setDescription(res.data.description);
        setEmail(res.data.email);
        setPhone(res.data.phone);
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
        direction:
          localStorage.getItem("language") === "arabic" ? "rtl" : "ltr",
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
          {localStorage.getItem("language") === "arabic"
            ? "حساب تعريفي"
            : "Profile"}
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
          <InputLabel
            htmlFor="outlined-adornment-amount"
            style={{
              fontSize: localStorage.getItem("language") === "arabic" ? 25 : 17,
            }}
          >
            {localStorage.getItem("language") === "arabic" ? "اسم" : "Name"}
          </InputLabel>
        </div>
        <div
          style={{
            width: "75%",
          }}
        >
          <TextField
            id="outlined-basic"
            value={userprofileData.fullName}
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
          <InputLabel
            htmlFor="outlined-adornment-amount"
            style={{
              fontSize: localStorage.getItem("language") === "arabic" ? 25 : 17,
            }}
          >
            {localStorage.getItem("language") === "arabic" ? "شعار" : "Logo"}
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
          <InputLabel
            htmlFor="outlined-adornment-amount"
            style={{
              fontSize: localStorage.getItem("language") === "arabic" ? 25 : 17,
            }}
          >
            {localStorage.getItem("language") === "arabic"
              ? "وصف"
              : "Discription"}
          </InputLabel>
        </div>
        <div
          style={{
            width: "75%",
          }}
        >
          <TextField
            label={
              localStorage.getItem("language") === "arabic"
                ? "وصف"
                : "Discription"
            }
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
          <InputLabel
            htmlFor="outlined-adornment-amount"
            style={{
              fontSize: localStorage.getItem("language") === "arabic" ? 25 : 17,
            }}
          >
            {localStorage.getItem("language") === "arabic" ? "دولة" : "Country"}
          </InputLabel>
        </div>
        <div
          style={{
            width: "75%",
          }}
        >
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            size="small"
            onChange={handleChange}
            sx={{
              width: "100%",
              textAlign: "left",
            }}
          >
            <MenuItem value={10}>India</MenuItem>
            <MenuItem value={20}>America</MenuItem>
            <MenuItem value={30}>Japan</MenuItem>
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
          <InputLabel
            htmlFor="outlined-adornment-amount"
            style={{
              fontSize: localStorage.getItem("language") === "arabic" ? 25 : 17,
            }}
          >
            {localStorage.getItem("language") === "arabic"
              ? "خرائط جوجل"
              : "Google Map"}
          </InputLabel>
        </div>
        <div
          style={{
            width: "75%",
          }}
        >
          <TextField
            id="outlined-basic"
            label={
              localStorage.getItem("language") === "arabic"
                ? "خرائط جوجل"
                : "Google Map"
            }
            placeholder="خرائط جوجل"
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
          <InputLabel
            htmlFor="outlined-adornment-amount"
            style={{
              fontSize: localStorage.getItem("language") === "arabic" ? 25 : 17,
            }}
          >
            {localStorage.getItem("language") === "arabic"
              ? "رقم الرخصة"
              : "License Number"}
          </InputLabel>
        </div>
        <div
          style={{
            width: "75%",
          }}
        >
          <TextField
            id="outlined-basic"
            label={
              localStorage.getItem("language") === "arabic"
                ? "رقم الرخصة"
                : "License Number"
            }
            placeholder="License Number 
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
          <InputLabel
            htmlFor="outlined-adornment-amount"
            style={{
              fontSize: localStorage.getItem("language") === "arabic" ? 25 : 17,
            }}
          >
            {localStorage.getItem("language") === "arabic"
              ? "صاحب شركة"
              : "Company Owner"}
          </InputLabel>
        </div>
        <div
          style={{
            width: "75%",
          }}
        >
          <TextField
            id="outlined-basic"
            label={
              localStorage.getItem("language") === "arabic"
                ? "صاحب شركة"
                : "Company Owner"
            }
            placeholder="صاحب شركة"
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
          <InputLabel
            htmlFor="outlined-adornment-amount"
            style={{
              fontSize: localStorage.getItem("language") === "arabic" ? 25 : 17,
            }}
            label={
              localStorage.getItem("language") === "arabic"
                ? "اسم المستخدم"
                : "User name"
            }
          >
            {localStorage.getItem("language") === "arabic"
              ? "اسم المستخدم"
              : "User name"}
          </InputLabel>
        </div>
        <div
          style={{
            width: "75%",
          }}
        >
          <TextField
            id="outlined-basic"
            value={userprofileData.username}
            placeholder="User name"
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
          <InputLabel
            htmlFor="outlined-adornment-amount"
            style={{
              fontSize: localStorage.getItem("language") === "arabic" ? 25 : 17,
            }}
          >
            {localStorage.getItem("language") === "arabic"
              ? "المستخدم المحمول"
              : "User Mobile"}
          </InputLabel>
        </div>
        <div
          style={{
            width: "75%",
          }}
        >
          <TextField
            id="outlined-basic"
            value={userprofileData.phone}
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
          <InputLabel
            htmlFor="outlined-adornment-amount"
            style={{
              fontSize: localStorage.getItem("language") === "arabic" ? 25 : 17,
            }}
          >
            {localStorage.getItem("language") === "arabic"
              ? "البريد الالكتروني للمستخدم"
              : "User Email"}
          </InputLabel>
        </div>
        <div
          style={{
            width: "75%",
          }}
        >
          <TextField
            id="outlined-basic"
            value={userprofileData.email}
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
          <InputLabel
            htmlFor="outlined-adornment-amount"
            style={{
              fontSize: localStorage.getItem("language") === "arabic" ? 25 : 17,
            }}
          >
            {localStorage.getItem("language") === "arabic"
              ? "دور المستخدم"
              : "User Role"}
          </InputLabel>
        </div>
        <div
          style={{
            width: "75%",
          }}
        >
          <TextField
            id="outlined-basic"
            value={userprofileData.role}
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
          <InputLabel
            htmlFor="outlined-adornment-amount"
            style={{
              fontSize: localStorage.getItem("language") === "arabic" ? 25 : 17,
            }}
          >
            {localStorage.getItem("language") === "arabic"
              ? "توقيع المستخدم"
              : "User signature"}
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
          <InputLabel
            htmlFor="outlined-adornment-amount"
            style={{
              fontSize: localStorage.getItem("language") === "arabic" ? 25 : 17,
            }}
          >
            {localStorage.getItem("language") === "arabic"
              ? "ختم الشركة"
              : "Company Stamp"}
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
