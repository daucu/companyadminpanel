import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";

import Tooltip from "@mui/material/Tooltip";
import { visuallyHidden } from "@mui/utils";
import FilterListIcon from "@mui/icons-material/FilterList";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import RemoveRedEyeTwoToneIcon from "@mui/icons-material/RemoveRedEyeTwoTone";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import AppBar from "@mui/material/AppBar";
import AddIcon from "@mui/icons-material/Add";
import QRCode from "react-qr-code";
import QrCodeIcon from '@mui/icons-material/QrCode';
import {
  Dialog,
  Divider,
  OutlinedInput,
  TextareaAutosize,
  Button,
  TextField,
} from "@mui/material";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Stack } from "@mui/system";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
const headCells = [
  {
    id: "1",
    numeric: false,
    disablePadding: true,
    label: localStorage.getItem("language") === "arabic" ? "العنوان" : "Title",
  },
  {
    id: "2",
    numeric: false,
    disablePadding: true,
    label:
      localStorage.getItem("language") === "arabic" ? "الوصف" : "Description",
  },
  {
    id: "3",
    numeric: false,
    disablePadding: false,
    label: localStorage.getItem("language") === "arabic" ? "التاريخ" : "Date",
  },
  {
    id: "4",
    numeric: false,
    disablePadding: false,
    label: localStorage.getItem("language") === "arabic" ? "التاريخ" : "QrCode",
  },
  // {
  //   id: "4",
  //   numeric: false,
  //   disablePadding: false,
  //   label:
  //     localStorage.getItem("language") === "arabic" ? "أجراءات" : "Actions",
  // },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            sx={
              {
                // color: "white"
              }
            }
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            // sx={{ color: "white" }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%", display: { xs: "none", md: "flex" } }}
          color="inherit"
          variant="h6"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%", mr: 2, display: { xs: "none", md: "flex" } }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {localStorage.getItem("language") === "arabic"
            ? "تفاصيل الشكاوى"
            : "Complaints Details"}
        </Typography>
      )}

      {/* View Product */}
      {numSelected === 1 ? (
        <Tooltip title="View">
          <IconButton
            // sx={{ color: "#fff" }}
            to={`./../view-product/${window.selected}`}
            component={RouterLink}
          >
            <RemoveRedEyeTwoToneIcon />
          </IconButton>
        </Tooltip>
      ) : (
        ""
      )}

      {/* Edit Product */}
      {numSelected === 1 ? (
        <Tooltip
          title="Edit"
          // sx={{ color: "#fff" }}
        >
          <IconButton
            to={`./../update-product/${window.selected}`}
            component={RouterLink}
          >
            <EditTwoToneIcon />
          </IconButton>
        </Tooltip>
      ) : (
        ""
      )}

      {/* Delete Product */}
      {numSelected > 0 ? (
        <Tooltip title="Delete" sx={{}}>
          <IconButton onClick={window.deleteProduct}>
            <DeleteTwoToneIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function Complaints() {
  const navigate = useNavigate();
  const [ishovering, setIshovering] = useState("");
  // Alert
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  // code to get all complaints
  const [complaints, setComplaints] = useState([]);
  const getAllComplaints = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/complaints`)
      .then((res) => {
        console.log(res.data);
        setComplaints(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllComplaints();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        marginTop: 3,
        boxShadow: 0,
        animation: "fadeIn 0.5s ease-in-out",
        transition: "box-shadow 1s ease-in-out",
        direction:
          localStorage.getItem("language") === "arabic" ? "rtl" : "ltr",
      }}
    >
      <AppBar position="static">
        <Toolbar variant="dense" sx={{ background: "#333", color: "#fff" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, ml: 3 }}
            onClick={() => navigate("/admin/addcomplaints")}
          >
            <AddIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            {localStorage.getItem("language") === "arabic"
              ? "شكاوي"
              : "Complaints"}
          </Typography>
          <Divider sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>

      {/* Alert */}
      <Snackbar
        autoHideDuration={5000}
        resumeHideDuration={5000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert sx={{ width: "100%" }}>"Dgssdg"</Alert>
      </Snackbar>

      {/*  */}

      <Paper
        sx={{
          width: "100%",
          mb: 2,
          boxShadow: 0,
          overflow: "scroll",
        }}
      >
        <EnhancedTableToolbar />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="small"
          >
            <EnhancedTableHead />
            <TableBody>
              {complaints &&
                complaints.map((item, key) => {
                  return (
                    <>
                      {" "}
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        sx={{ color: "#fff" }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox color="primary" />
                        </TableCell>

                        <TableCell scope="row" padding="none">
                          <Typography
                            size="small"
                            sx={{
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              maxWidth: "20ch",
                              textOverflow: "ellipsis",
                              cursor: "pointer",
                            }}
                          >
                            {item.title}
                          </Typography>
                        </TableCell>

                        <TableCell
                          component="th"
                          scope="row"
                          padding="none"
                          sx={{
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            maxWidth: "20ch",
                            minWidth: "15ch",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.description}
                        </TableCell>
                        <TableCell align="left" sx={{}}>
                          {item.createAt}
                        </TableCell>
                        {/* <TableCell align="left" sx={{}} style={{}}>
                          <Stack
                            direction={"row"}
                            sx={{ columnGap: "10px" }}
                          ></Stack>
                        </TableCell> */}
                            <TableCell >
                              <a href="" onMouseOver={()=>setIshovering(item.id)} onMouseOut={()=>setIshovering("")} style={{position:"relative"}}>
                              <QrCodeIcon/>
                              </a>
                              {ishovering === item.id ? (
                                  <div style={{ width: "150px", height: "150px", marginTop: "50px", zIndex: "60", position: "absolute"}}>
                                  <QRCode
                                    size={256}
                                    value="hello world"
                                    style={{ height: "100px", width: "100px"}} />
                                </div> 
                                ) : null}
                              
                            </TableCell>
                      </TableRow>
                    </>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={100}
          rowsPerPage={5}
          page={0}
          onPageChange={() => {}}
        />
      </Paper>
    </Box>
  );
}
