import * as React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import TabUnstyled from "@mui/base/TabUnstyled";
import Button from "@mui/material/Button";
import { AppBar, Grid, IconButton, Select, Toolbar } from "@mui/material";
import MarkEmailUnreadTwoToneIcon from "@mui/icons-material/MarkEmailUnreadTwoTone";
import PaymentTwoToneIcon from "@mui/icons-material/PaymentTwoTone";
// import SMTP from "./settings/SMTP";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import Tabs from "@mui/material/Tabs";
// import Payment from "./settings/Payment";
import InsertPageBreakTwoToneIcon from "@mui/icons-material/InsertPageBreakTwoTone";
import HubTwoToneIcon from "@mui/icons-material/HubTwoTone";
import VpnLockTwoToneIcon from "@mui/icons-material/VpnLockTwoTone";
import AccessTimeTwoToneIcon from "@mui/icons-material/AccessTimeTwoTone";
import TranslateTwoToneIcon from "@mui/icons-material/TranslateTwoTone";
import Typography from "@mui/material/Typography";
import DnsTwoToneIcon from "@mui/icons-material/DnsTwoTone";
// import ServerDetails from "./settings/ServerDetails";
// import EmailTemplate from "./settings/EmailTemplate";
// import CORS from "./settings/CORS";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { toast } from "react-toastify";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  // color: "#fff",
  // backgroundColor: "#1A2027",
}));

const FireNav = styled(List)({
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    paddingRight: 24,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});

const Tab = styled(TabUnstyled)`
  color: "#333333";
  cursor: pointer;
  font-size: 0.875rem;
  width: 100%;
  padding: 6px 16px;
  margin: 6px 0px;
  border: none;
  display: flex;
  justify-content: left;
  outline: none;
`;

export default function CustomizedList() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [currency, setCurrency] = useState("");
  const handlecurrency = (event) => {
    setCurrency(event.target.value);
  };

  const [colorbg, setColorbg] = useState("");
  const handlecolorbg = (event) => {
    setColorbg(event.target.value);
  };

  const navigate = useNavigate();

  const [language, setLanguage] = useState("en");

  // code to save the language in local storage
  const handleLanguage = (e) => {
    setLanguage(e.target.value);
    // localStorage.setItem("language", e.target.value);
    console.log("language", e.target.value);
  };

  const handlechange = (e) => {
    console.log(language);
    localStorage.setItem("language", language);
    toast.success("Language Changed Successfully");
    setTimeout(() => {
      window.location.reload();
    }, [1000]);
  };

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          marginTop: 3,
          direction:
            localStorage.getItem("language") === "arabic" ? "rtl" : "ltr",
        }}
      >
        <AppBar position="static">
          <Toolbar variant="dense" sx={{ background: "#333", color: "#fff" }}>
            <Typography variant="h6" color="inherit" component="div">
              {localStorage.getItem("language") === "arabic"
                ? "إعدادات"
                : "Settings"}
            </Typography>
            <Divider sx={{ flexGrow: 1 }} />
            <Button
              variant="contained"
              size="small"
              color="success"
              sx={{
                boxShadow: 0,
              }}
              onClick={() => handlechange()}
            >
              Save
            </Button>
          </Toolbar>
        </AppBar>
        {/* dropdown */}
        <form onSubmit={() => handlechange()}></form>
        <InputLabel
          id="demo-simple-select-label"
          style={{
            marginTop: "20px",

            textAlign:
              localStorage.getItem("language") === "arabic" ? "right" : "left",
            fontSize:
              localStorage.getItem("language") === "arabic" ? "24px" : "16px",
          }}
        >
          {localStorage.getItem("language") === "arabic" ? "لغة" : "Language"}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={language}
          label="Language"
          size="small"
          onChange={handleLanguage}
          style={{
            width: "100%",
            textAlign:
              localStorage.getItem("language") === "arabic" ? "right" : "left",
          }}
        >
          <MenuItem value={"english"}>English</MenuItem>
          <MenuItem value={"arabic"}>العربية</MenuItem>
        </Select>
        {/* <InputLabel
          id="demo-simple-select-label"
          style={{
            marginTop: "20px",
            textAlign: "left",
          }}
        >
          Currency
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currency}
          label="Language"
          size="small"
          onChange={handlecurrency}
          style={{
            width: "100%",
            textAlign: "left",
          }}
        >
          <MenuItem value={10}>SAR</MenuItem>
          <MenuItem value={20}>USD</MenuItem>
        </Select>
        <InputLabel
          id="demo-simple-select-label"
          style={{
            marginTop: "20px",
            textAlign: "left",
          }}
        >
          Background Color
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={colorbg}
          label="Language"
          size="small"
          onChange={handlecolorbg}
          style={{
            width: "100%",
            textAlign: "left",
          }}
        >
          <MenuItem value={10}>Red</MenuItem>
          <MenuItem value={20}>Green</MenuItem>
          <MenuItem value={30}>Yellow</MenuItem>
          <MenuItem value={40}>Red</MenuItem>
          <MenuItem value={50}>Black</MenuItem>
        </Select> */}
      </Box>
    </>
  );
}
