import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1A2027",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "start",
  color: theme.palette.text.secondary,
  borderRadius: 0,
  color: "#ffffff",
}));

export default function Dashboard() {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          marginTop: 3,
          boxShadow: 0,
          animation: "fadeIn 0.5s ease-in-out",
          transition: "box-shadow 1s ease-in-out",
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs>
            <Item
              sx={{
                minWidth: "200px",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Total active users
              </Typography>
              <Typography variant="h4" gutterBottom>
                51,234
              </Typography>
            </Item>
          </Grid>
          <Grid item xs>
            <Item
              sx={{
                minWidth: "200px",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Total inactive users
              </Typography>
              <Typography variant="h4" gutterBottom>
                1,234
              </Typography>
            </Item>
          </Grid>
          <Grid item xs>
            <Item
              sx={{
                minWidth: "200px",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Upcoming Products
              </Typography>
              <Typography variant="h4" gutterBottom>
                1,234
              </Typography>
            </Item>
          </Grid>
          <Grid item xs>
            <Item
              sx={{
                minWidth: "200px",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Completed Products
              </Typography>
              <Typography variant="h4" gutterBottom>
                1,234
              </Typography>
            </Item>
          </Grid>
          <Grid item xs>
            <Item
              sx={{
                minWidth: "200px",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Total Vendors
              </Typography>
              <Typography variant="h4" gutterBottom>
                1,234
              </Typography>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
