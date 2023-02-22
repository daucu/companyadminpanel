import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function Offer() {
  return (
    <Box>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
          padding: "40px",
          textAlign: "center",
        }}
      >
        <Typography
          style={{
            fontSize:
              localStorage.getItem("language") === "arabic" ? "25px" : "18px",
          }}
        >
          {localStorage.getItem("language") === "arabic"
            ? "العروض ستكون متاحة قريبا"
            : "Offers will be aviailable soon "}
        </Typography>
      </div>
    </Box>
  );
}

export default Offer;
