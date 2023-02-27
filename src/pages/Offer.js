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
import EditIcon from "@mui/icons-material/Edit";
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
import {
  Dialog,
  Divider,
  OutlinedInput,
  TextareaAutosize,
  Button,
  TextField,
  Modal,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Stack } from "@mui/system";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: localStorage.getItem("language") === "arabic" ? "اسم" : "Name",
  },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label:
      localStorage.getItem("language") === "arabic" ? "وصف" : "Description",
  },
  {
    id: "published",
    numeric: false,
    disablePadding: false,
    label:
      localStorage.getItem("language") === "arabic"
        ? "نشرت في"
        : "Published At",
  },
  {
    id: "4",
    numeric: false,
    disablePadding: false,
    label: localStorage.getItem("language") === "arabic" ? "سعر" : "Price",
  },
  {
    id: "5",
    numeric: false,
    disablePadding: false,
    label: localStorage.getItem("language") === "arabic" ? "عملة" : "Currency",
  },
  {
    id: "6",
    numeric: false,
    disablePadding: false,
    label:
      localStorage.getItem("language") === "arabic" ? "العمليات" : "Actions",
  },
];
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "5px",
  width: 400,
  bgcolor: "background.paper",
  // boxShadow: 8,
  p: 4,
};
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
    <TableHead
      style={{
        direction:
          localStorage.getItem("language") === "arabic" ? "rtl" : "ltr",
      }}
    >
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
        direction:
          localStorage.getItem("language") === "arabic" ? "rtl" : "ltr",
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
            ? "تفاصيل العروض"
            : "Product Offers Details"}
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

export default function Offer() {
  const navigate = useNavigate();

  // Alert
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [fetchedData, setFetchedData] = useState();
  const [open, setOpen] = React.useState(false);
  const [offerPrice, setOfferPrice] = useState("");
  const [currency, setCurrency] = useState("");
  const handleClose = () => setOpen(false);

  async function handleModalOpen(id) {
    // console.log(id);
    setOpen(true);
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/offers/${id}`)
      .then((res) => {
        console.log(res);
        // console.log(res.data.id);
        setFetchedData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // console.log("handleModalOpen");
  }

  // code to update offer
  async function updateOffer() {
    // console.log(fetchedData.productId);
    // alert("Offer Updated");
    await axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/offers/my-products/${fetchedData.productId}`,
        {
          offerPrice,
          currency,
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("x-access-token"),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        toast.success("Offer Updated");
        setTimeout(() => {
          getMyProducts();
        }, [1000]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // code to get my-products and map it to table
  const [allProducts, setAllProducts] = useState();
  const getMyProducts = async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/offers/my-products`)
      .then(
        (res) => {
          console.log(res.data);
          setAllProducts(res.data);
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("x-access-token"),
          },
        }
      )
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMyProducts();
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
      {open === true ? (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Update Offer Price ( {fetchedData?.name} )
            </Typography>
            <div
              style={{
                display: "flex",
                marginTop: "20px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography id="modal-modal-description">
                <InputLabel id="demo-simple-select-label">Price</InputLabel>
              </Typography>
              <TextField
                id="outlined-basic"
                label="Offer Price"
                variant="outlined"
                type={"number"}
                value={offerPrice}
                size="small"
                onChange={(e) => setOfferPrice(e.target.value)}
              />
            </div>
            <div
              style={{
                display: "flex",
                marginTop: "20px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography id="modal-modal-description">
                <InputLabel id="demo-simple-select-label">Currency</InputLabel>
              </Typography>
              {/* select tag  */}
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                label="Currency"
                size="small"
                style={{
                  width: "67%",
                }}
              >
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="SAR">SAR</MenuItem>
              </Select>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: "40px",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <div
                style={{
                  marginRight: "20px",
                }}
              >
                <Button variant="contained" onClick={handleClose}>
                  Cancel
                </Button>
              </div>
              <div>
                <Button variant="contained" onClick={() => updateOffer()}>
                  Update
                </Button>
              </div>
            </div>
          </Box>
        </Modal>
      ) : null}
      <AppBar position="static">
        <Toolbar variant="dense" sx={{ background: "#333", color: "#fff" }}>
          {/* <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2,ml:3 }}
            onClick={() => navigate("/admin/addservices")}
          >
            <AddIcon />
          </IconButton> */}
          <Typography variant="h6" color="inherit" component="div">
            {localStorage.getItem("language") === "arabic" ? "عروض" : "Offers"}
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
              {allProducts &&
                allProducts.map((item, key) => {
                  return (
                    <>
                      <TableRow
                        key={key}
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
                            {item.name}
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
                          {item.createdAt}
                        </TableCell>
                        <TableCell align="left" sx={{}} style={{}}>
                          {item.offerPrice}
                        </TableCell>
                        <TableCell align="left" sx={{}} style={{}}>
                          {item.currency}
                        </TableCell>
                        <TableCell align="left" sx={{}} style={{}}>
                          <Button
                            aria-label="delete"
                            onClick={(id) => handleModalOpen(item.id)}
                          >
                            <EditIcon />
                          </Button>
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
