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
  const navigate = useNavigate();
  return (
    <>
      <Box sx={{ flexGrow: 1, marginTop: 3 }}>
        <AppBar position="static">
          <Toolbar variant="dense" sx={{ background: "#333", color: "#fff" }}>
            <Typography variant="h6" color="inherit" component="div">
              Settings
            </Typography>
            <Divider sx={{ flexGrow: 1 }} />
          </Toolbar>
        </AppBar>
        {/* dropdown */}
        <InputLabel
          id="demo-simple-select-label"
          style={{
            marginTop: "20px",
            textAlign: "left",
          }}
        >
          Language
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Language"
          size="small"
          onChange={handleChange}
          style={{
            width: "100%",
            textAlign: "left",
          }}
        >
          <MenuItem value={10}>English</MenuItem>
          <MenuItem value={20}>العربية</MenuItem>
        </Select>
        <InputLabel
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
      </Box>
    </>
  );
}
