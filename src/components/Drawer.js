import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";

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

import "./Drawer.css";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Link as RouterLink,
  useLocation,
  Outlet,
  useNavigate,
} from "react-router-dom";

//Icons
import KeyboardDoubleArrowLeftTwoToneIcon from "@mui/icons-material/KeyboardDoubleArrowLeftTwoTone";
import NotificationsTwoToneIcon from "@mui/icons-material/NotificationsTwoTone";
import menu_items from "./menu_items";
import axios from "axios";
import { useState } from "react";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

const drawerWidth = 250;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  background: "#fff",
  // code to get langugae from local storage and set it to rtl
  direction: localStorage.getItem("language") === "arabic" ? "rtl" : "ltr",
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
  // code to get langugae from local storage and set it to rtl
  direction: localStorage.getItem("language") === "arabic" ? "rtl" : "ltr",
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
    padding: "  0 4px",
  },
}));
// code to clear token from loacl storage and redirect to login page

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
  //  code to remove cookie
  const handleLogout = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/login/logout`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        localStorage.removeItem("token");
        toast.success("Logout Successfully");
        setTimeout(() => {
          navigate("/");
        }, [1000]);
      })
      .catch((e) => {
        console.log(e);
        toast.error("Something went wrong");
      });
  };
  // code to check login
  const [loadinggif, setLoadinggif] = useState(false);
  const [userLoginValue, setUserLoginValue] = useState(false);
  const [userdata, setUserdata] = useState("username");

  // alert popup
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const [modalOpen, setModalOpen] = useState(false);
  const handleClickOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const checkCompanies = async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/companies/my`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.length === 0) {
          navigate("/company_reg");
        }
      })
      .catch((e) => {
        // print the error
        console.log(e);
        console.log(e.response.data.message);
      });
  };

  // code to get profile data of company
  const [companyProfileData, setCompanyProfileData] = React.useState([]);
  const getCompanyProfileData = async () => {
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/profile/company`, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res.data[0].data);
        setCompanyProfileData(res.data[0].data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  React.useEffect(() => {
    getCompanyProfileData();
    checkCompanies();
  }, []);

  // code to get user profile data
  const [userProfileData, setUserProfileData] = React.useState([]);
  const getUserProfileData = async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/profile`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setUserProfileData(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  React.useEffect(() => {
    getUserProfileData();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
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

          <IconButton
            to="account"
            onClick={handleClickOpen}
            sx={{
              backgroundColor: "white",
              color: "#000",
              borderRadius: "50%",
            }}
          >
            <LogoutIcon sx={{ color: "#000" }} />
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
            {/* <AccountCircleIcon
              style={{
                height: "50px",
                width: "50px",
                color: "#000",
              }}
            /> */}
            <img
              src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
              style={{ height: "90px", width: "90px", borderRadius: "50%" }}
            />

            {open && (
              <div
                style={{
                  color: "#000",
                }}
              >
                {userProfileData.fullName}
                {/* {userdata.name} */}
              </div>
            )}
          </div>
        </div>
        <List
          sx={{
            background: "#fff",
          }}
        >
          {menu_items.map((item, idx) => (
            <div key={idx}>
              {item.header && open && (
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{
                    fontSize:
                      localStorage.getItem("language") === "arabic" ? 30 : 18,
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
                      fontSize:
                        localStorage.getItem("language") === "arabic" ? 20 : 14,
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

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 1,
          pt: 5,
        }}
      >
        <DrawerHeader />
        <Outlet />
      </Box>
      {modalOpen === true ? (
        <>
          <Box>
            <Dialog
              open={handleClickOpen}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogContent>
                <DialogContentText
                  id="alert-dialog-slide-description"
                  style={{
                    fontSize: "25px",
                    padding: "20px",
                  }}
                >
                  Are you sure you want to logout?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleLogout}>Yes</Button>
                <Button onClick={handleClose}>No</Button>
              </DialogActions>
            </Dialog>
          </Box>
        </>
      ) : null}
    </Box>
  );
}
