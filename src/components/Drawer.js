import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import "./Drawer.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Link as RouterLink,
  Route,
  Routes,
  useLocation,
  Outlet,
  useNavigate,
} from "react-router-dom";

//Icons
import KeyboardDoubleArrowLeftTwoToneIcon from "@mui/icons-material/KeyboardDoubleArrowLeftTwoTone";
import NotificationsTwoToneIcon from "@mui/icons-material/NotificationsTwoTone";
import menu_items from "./menu_items";
import axios from "axios";
import Loading from "../pages/Loading";
import { useState } from "react";

const drawerWidth = 250;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  background: "#fff",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(7)} + 1px)`,
  },
  background: "#fff",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: theme.spacing(0, 0),
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    padding: "0 4px",
  },
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const location = useLocation();
  const [countNotifications, setCountNotifications] = React.useState(1);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  // code to check login
  const [loadinggif, setLoadinggif] = useState(false);
  const [userLoginValue, setUserLoginValue] = useState(false);
  const [userdata, setUserdata] = useState("username");
  const checkLogin = async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/login/checktoken`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setUserLoginValue(res.data.islogin);
        setUserdata(res.data.user);
        if (res.data.islogin === true) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      })
      .catch((e) => {
        console.log(e);
        navigate("/");
      });
  };

  React.useEffect(() => {
    checkLogin();
  }, []);

  // code to get logged in user data if logged in true
  if (userLoginValue === true) {
    console.log("user is logged in");
  } else {
    console.log("user is not logged in");
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          boxShadow: 0,
          background: "rgb(247,250,252)",
          borderBottom: ".5px solid #d9d9d9",
        }}
      >
        <Toolbar variant="dense">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              color: "#000",
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {open === true ? (
              <IconButton
                onClick={handleDrawerClose}
                sx={{ color: "#000", marginLeft: 0 }}
              >
                <KeyboardDoubleArrowLeftTwoToneIcon />
              </IconButton>
            ) : (
              ""
            )}
          </Typography>
          <Typography
            variant="h6"
            noWrap
            // to="/"
            // component={RouterLink}
            sx={{ color: "#fff", TextDecoration: "none" }}
          >
            {/* Dashboard */}
          </Typography>
          <Typography sx={{ flexGrow: 1 }}></Typography>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleDrawerClose}
            sx={{
              color: "#000",
              marginLeft: "auto",
              marginRight: 5,
            }}
          >
            <StyledBadge
              badgeContent={countNotifications}
              color="error"
              to="/admin/notifications"
              component={RouterLink}
              sx={{ color: "#000" }}
            >
              <NotificationsTwoToneIcon />
            </StyledBadge>
          </IconButton>

          <Typography
            variant="subtitle1"
            sx={{ paddingRight: 1, cursor: "pointer" }}
          >
            {/* {profile.fname} */}
          </Typography>
          <IconButton to="account">
            <Avatar
              alt="Remy Sharp"
              //   src={profile.dp}
              sx={{ width: 30, height: 30 }}
              to="account"
              component={RouterLink}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} sx={{ background: "#fff" }}>
        <AppBar position="static" color="default" elevation={0}>
          <Toolbar
            variant="dense"
            sx={{
              boxShadow: 0,
              height: 40,
              color: "#ffffff",
              backgroundColor: "#ffffff",
            }}
          >
            <DrawerHeader
              sx={{
                color: "#000000",
                justifyContent: "center",
                display: "flex",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  justifyContent: "center",
                  display: "flex",
                  textAlign: "center",
                  alignItems: "center",
                  fontSize: 18,
                  fontWeight: 600,
                }}
              >
                123AUC
              </Typography>
            </DrawerHeader>
          </Toolbar>
        </AppBar>
        <Divider />
        {/* Menu List */}
        <div>
          <div
            style={{
              margin: "20px auto",
            }}
          >
            <AccountCircleIcon
              style={{
                height: "50px",
                width: "50px",
                color: "#000",
              }}
            />
            {open && (
              <div
                style={{
                  color: "#000",
                }}
              >
                {userdata.fullname}
              </div>
            )}
          </div>
        </div>
        <List
          sx={{
            background: "#fff",
          }}
        >
          {menu_items.map((item) => (
            <div key={item.id}>
              {item.header && open && (
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{
                    fontSize: 18,
                    fontWeight: "semibold",
                  }}
                  sx={{
                    color: "rgb(85,85,85)",
                    padding: "5px 10px",
                    textAlign: "left",
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "left",
                    marginBottom: 1,
                  }}
                />
              )}
              {!item.header && (
                <ListItemButton
                  key={item.label}
                  sx={{
                    py: 0,
                    minHeight: 32,
                    ":hover": {
                      boxShadow: "1px 2px 3px #d9d9d9",
                    },
                  }}
                  to={item.url}
                  component={RouterLink}
                  className={location.pathname === item.url ? "active" : null}
                >
                  <ListItemIcon
                    sx={{
                      color:
                        location.pathname === item.url
                          ? "white"
                          : "rgb(85,85,85)",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: "medium",
                    }}
                    sx={{
                      color:
                        location.pathname === item.url
                          ? "white"
                          : "rgb(33,33,33)",
                      textAlign: "left",
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "left",
                      marginBottom: 1,
                    }}
                  />
                </ListItemButton>
              )}
            </div>
          ))}
          {/* <div>
            <Outlet />
          </div> */}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 1, pt: 5 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
