import { AppBar, Box, Divider, IconButton, Toolbar } from "@mui/material";
import React from "react";

function Ads() {
  return (
    <Box
      style={{
        marginTop: "20px",
        direction: localStorage.getItem("language") === "arabic" ? "rtl" : "ltr",
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
          {
            localStorage.getItem("language") === "arabic" ? "إعلانات" : "Ads"
          }
          <Divider sx={{ flexGrow: 1 }} />
          {/* <IconButton edge="start" color="inherit" aria-label="menu">
            <AddIcon />
          </IconButton> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Ads;
