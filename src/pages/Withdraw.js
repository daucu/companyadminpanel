import { AppBar, Divider, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function Withdraw() {
  return (
    <div>
      <Box sx={{ flexGrow: 1, mt: 3 }}>
        <AppBar position="static">
          <Toolbar variant="dense" sx={{ background: "#333", color: "#fff" }}>
            <Typography variant="h6" color="inherit" component="div">
              Withdraw
            </Typography>
            <Divider sx={{ flexGrow: 1 }} />
          </Toolbar>
        </AppBar>
        <Box sx={{ p: 2 }}>
          <Typography
            variant="h6"
            color="inherit"
            style={{
              textAlign: "center",
              color: "black",
            }}
            component="div"
          >
            Withdraw
          </Typography>
        </Box>{" "}
      </Box>
    </div>
  );
}

export default Withdraw;
