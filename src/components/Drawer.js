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

const drawerWidth = 250;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  background: "#1A2027",
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
  background: "#1A2027",
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


  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          boxShadow: 0,
          background: "#1A2027",
          borderBottom: "1px solid #333",
        }}
      >
        <Toolbar variant="dense">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
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
                sx={{ color: "#ffffff", marginLeft: 0 }}
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
              color: "#ffffff",
              marginLeft: "auto",
              marginRight: 5,
            }}
          >
            <StyledBadge
              badgeContent={countNotifications}
              color="error"
              to="/notifications"
              component={RouterLink}
              sx={{ color: "#ffffff" }}
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
      <Drawer variant="permanent" open={open} sx={{ background: "#1A2027" }}>
        <AppBar position="static" color="default" elevation={0}>
          <Toolbar
            variant="dense"
            sx={{
              background: "#1A2027",
              boxShadow: 0,
              height: 40,
              color: "#ffffff",
              borderBottom: "1px solid #333",
            }}
          >
            <DrawerHeader
              sx={{
                color: "#ffffff",
                justifyContent: "center",
                display: "flex",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  color: "#ffffff",
                  justifyContent: "center",
                  display: "flex",
                  textAlign: "center",
                  alignItems: "center",
                }}
              >
                123AUC
              </Typography>
            </DrawerHeader>
          </Toolbar>
        </AppBar>
        <Divider />
        {/* Menu List */}
        <List
          sx={{
            background: "#1A2027",
          }}
        >
          {menu_items.map((item) => (
            <div key={item.id}>
              <ListItemButton
                key={item.label}
                sx={{
                  py: 0,
                  minHeight: 32,
                  color: "rgba(255,255,255,.8)",
                  ":hover": { color: "#ffffff", background: "#0070d1" },
                }}
                to={item.url}
                component={RouterLink}
                className={location.pathname === item.url ? "active" : null}
              >
                <ListItemIcon sx={{ color: "inherit" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: "medium",
                  }}
                  sx={{
                    color: "#ffffff",
                    textAlign: "left",
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "left",
                    marginBottom: 1,
                  }}
                />
              </ListItemButton>
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
