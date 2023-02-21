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
import DeleteIcon from "@mui/icons-material/Delete";

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
import { useState, useEffect } from "react";

import {
  Dialog,
  Divider,
  OutlinedInput,
  TextareaAutosize,
  Button,
  TextField,
  LinearProgress,
  Grid,
} from "@mui/material";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Stack } from "@mui/system";
import axios from "axios";
import { toast } from "react-toastify";
const headCells = [
  {
    id: "1",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "2",
    numeric: false,
    disablePadding: true,
    label: "Return Terms",
  },
  {
    id: "3",
    numeric: false,
    disablePadding: false,
    label: "Published At",
  },
  {
    id: "4",
    numeric: false,
    disablePadding: false,
    label: "Actions",
  },
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
            align={headCell.numeric ? "right" : "center"}
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
            ? "تفاصيل العقد"
            : "Contract Details"}
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

export default function Contract() {
  const navigate = useNavigate();

  // Alert
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  // code to get all contracts from the database
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [prodLoading, setProdLoading] = React.useState(false);

  const getAllContracts = async () => {
    setProdLoading(true);
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/contract`)
      .then((res) => {
        console.log(res.data);
        setProdLoading(false);
        setContracts(res.data);
      })
      .catch((err) => {
        console.log(err);
        setProdLoading(false);
      });
  };
  useEffect(() => {
    getAllContracts();
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  // code to delete a contract by id
  const [deleteSnack, setDeleteSnack] = useState(false);
  const deleteContract = async (id) => {
    await axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/contract/${id}`)
      .then((res) => {
        console.log(res.data);
        toast.success("Contract Deleted Successfully");
        // setDeleteSnack(true);
        // handleClick();
        getAllContracts();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error in Deleting Contract");
      });
  };

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
            onClick={() => navigate("/admin/createcontract")}
          >
            <AddIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            {localStorage.getItem("language") === "arabic"
              ? "انكماش"
              : "Contracts"}
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
      {prodLoading === true ? (
        <>
          <Grid
            container
            spacing={2}
            sx={{
              width: "100%",
              height: "100%",
              marginTop: 0,
              paddingBottom: 4,
              paddingTop: 2,
              paddingLeft: 2,
              paddingRight: 2,
            }}
          >
            <Grid item xs={12}>
              <LinearProgress />
            </Grid>
          </Grid>
        </>
      ) : (
        <>
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
                  {contracts &&
                    contracts.map((contract) => {
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
                                {contract.title}
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
                              {contract.return_terms}
                            </TableCell>
                            <TableCell align="left" sx={{}}>
                              {contract.createdAt}
                            </TableCell>
                            <TableCell
                              align="left"
                              sx={{}}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-evenly",
                              }}
                            >
                              <IconButton
                                aria-label="edit"
                                size="small"
                                onClick={() => {
                                  navigate(
                                    `/admin/editcontract/${contract.id}`
                                  );
                                }}
                              >
                                <EditTwoToneIcon />
                              </IconButton>
                              <IconButton
                                aria-label="delete"
                                size="small"
                                onClick={() => {
                                  deleteContract(contract.id);
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
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
            {deleteSnack === true ? (
              <Snackbar
                open={open}
                autoHideDuration={3000}
                position="bottom-right"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  This is a success message!
                </Alert>
              </Snackbar>
            ) : null}
          </Paper>
        </>
      )}
    </Box>
  );
}
