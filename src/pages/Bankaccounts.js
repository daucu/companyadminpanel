import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import FilterListIcon from "@mui/icons-material/FilterList";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";
import TableSortLabel from "@mui/material/TableSortLabel";
import TablePagination from "@mui/material/TablePagination";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";
import AppBar from "@mui/material/AppBar";
import AddIcon from "@mui/icons-material/Add";
import {
  Alert,
  Button,
  CircularProgress,
  Divider,
  Snackbar,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
// import Loading from "../components/Loading";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  // backgroundColor: "#1A2027",
  // color: "#ffffff",
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "Title",
    numeric: false,
    disablePadding: true,
    label: "Title",
  },
  {
    id: "Value",
    numeric: false,
    disablePadding: false,
    label: "Value",
  },
  {
    id: "Description",
    numeric: false,
    disablePadding: false,
    label: "Description",
  },
  {
    id: "Currency",
    numeric: false,
    disablePadding: false,
    label: "Currency",
  },
  {
    id: "Actions",
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
        <TableCell padding="checkbox" sx={{}}>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
            sx={{}}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{}}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              sx={{}}
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
        // backgroundColor: "#1A2027",
        // color: "#ffffff",
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Bank Account List
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon sx={{}} />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon sx={{}} />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
export default function Bankaccounts() {
  const [rows, setCategories] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState("");

  const navigate = useNavigate();

  //Get all categories
  async function getCategoryData() {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/auctions`
    );
    console.log(res.data);
    setCategories(res.data);
  }

  React.useEffect(() => {
    getCategoryData();
    setLoading(false);
  }, []);

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("description");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);

  const [erroralert, setErroralert] = React.useState(false);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [server_alert, setAlert] = React.useState();
  const [status, setStatus] = React.useState();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (_id) => selected.indexOf(_id) !== -1;

  const handleDelete = (id) => {
    setDeleting(id);
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/auctions/${id}`)
      .then((res) => {
        const removedBids = rows.filter((bid) => bid.id !== id);
        setCategories(removedBids);
        setAlert(res.data.message);
        setOpen(true);
        setStatus("success");
        console.log(res.data);
      })
      .catch((e) => {
        setAlert("Error deleting bid. Check your internet connection.");
        setOpen(true);
        setStatus("error");
      })
      .finally(() => {
        setDeleting("");
      });
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Box sx={{ flexGrow: 1, marginTop: 3 }}>
      <AppBar position="static">
        <Toolbar variant="dense" sx={{ background: "#333", color: "#fff" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate("/admin/addbank")}
          >
            <AddIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Bank Accounts
          </Typography>
          <Divider sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        resumeHideDuration={3000}
        action={action}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={status} sx={{ width: "100%" }}>
          {server_alert}
        </Alert>
      </Snackbar>

      <Grid container spacing={1}>
        {/* StartSubmit Form */}

        {/* End Submit form */}
        {/* Start Table of Post */}
        <Grid item xs>
          <Paper sx={{ boxShadow: 0, borderRadius: 1 }}>
            {loading ? (
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
            ) : (
              <Item sx={{ boxShadow: 0, borderRadius: 1 }}>
                <Paper
                  sx={{
                    width: "100%",
                    mb: 2,
                    boxShadow: 0,
                    borderRadius: 1,
                    zIndex: 1,
                  }}
                >
                  <EnhancedTableToolbar numSelected={selected.length} />
                  <TableContainer sx={{}}>
                    <Table
                      sx={{ minWidth: 750 }}
                      aria-labelledby="tableTitle"
                      size="small"
                    >
                      <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                      />
                      <TableBody>
                        {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                        {stableSort(rows, getComparator(order, orderBy))
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .slice()
                          .reverse()
                          .map((row, index) => {
                            const isItemSelected = isSelected(row._id);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                              <TableRow
                                hover
                                // onClick={(event) => handleClick(event, row._id)}
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={row.id}
                                selected={isItemSelected}
                              >
                                <TableCell padding="checkbox">
                                  <Checkbox
                                    color="primary"
                                    checked={isItemSelected}
                                    inputProps={{
                                      "aria-labelledby": labelId,
                                    }}
                                    sx={{}}
                                  />
                                </TableCell>

                                <TableCell
                                  component="th"
                                  id={labelId}
                                  scope="row"
                                  padding="none"
                                >
                                  <Typography
                                    sx={{
                                      overflow: "hidden",
                                      whiteSpace: "nowrap",
                                      maxWidth: "20ch",
                                      textOverflow: "ellipsis",
                                      // color: "#ffffff",
                                    }}
                                  >
                                    {row.title}
                                  </Typography>
                                </TableCell>

                                <TableCell align="left">
                                  <Typography
                                    sx={{
                                      overflow: "hidden",
                                      whiteSpace: "nowrap",
                                      maxWidth: "50ch",
                                      textOverflow: "ellipsis",
                                      // color: "#ffffff",
                                    }}
                                  >
                                    {row.value}
                                  </Typography>
                                </TableCell>
                                <TableCell align="left">
                                  <Typography
                                    sx={{
                                      overflow: "hidden",
                                      whiteSpace: "nowrap",
                                      maxWidth: "50ch",
                                      textOverflow: "ellipsis",
                                      // color: "#ffffff",
                                    }}
                                  >
                                    {row.description}
                                  </Typography>
                                </TableCell>

                                <TableCell align="left">
                                  <Typography
                                    sx={{
                                      overflow: "hidden",
                                      whiteSpace: "nowrap",
                                      maxWidth: "20ch",
                                      textOverflow: "ellipsis",
                                      // color: "#ffffff",
                                    }}
                                  >
                                    {row.currency}
                                  </Typography>
                                </TableCell>
                                <TableCell align="left">
                                  <Stack
                                    direction={"row"}
                                    sx={{
                                      columnGap: "10px",
                                      alignItems: "center",
                                    }}
                                  >
                                    <ModeEditOutlineOutlinedIcon
                                      onClick={() =>
                                        navigate(
                                          `/admin/editauctinos/${row.id}`
                                        )
                                      }
                                      size={22}
                                    />
                                    {deleting === row.id ? (
                                      <CircularProgress size={22} />
                                    ) : (
                                      <DeleteOutlineOutlinedIcon
                                        onClick={() => handleDelete(row.id)}
                                        size={22}
                                      />
                                    )}
                                  </Stack>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[15, 30, 40]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{}}
                  />
                </Paper>
              </Item>
            )}
          </Paper>
          {/* End Table */}
        </Grid>
      </Grid>
    </Box>
  );
}
