import { AppBar, Divider, IconButton, Toolbar } from "@mui/material";
import React from "react";

function PServices() {
  return (
    <div style={{
        marginTop: "20px",
    }}>
      <AppBar position="static">
        <Toolbar variant="dense" sx={{ background: "#333" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
             
          >
          </IconButton>
  Services
          <Divider sx={{ flexGrow: 1 }} />
          {/* <IconButton edge="start" color="inherit" aria-label="menu">
            <AddIcon />
          </IconButton> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default PServices;
