import * as React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
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
import {
  Dialog,
  Divider,
  OutlinedInput,
  TextareaAutosize,
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
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
    label: "Description",
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

  const [age, setAge] = React.useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
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
          Services Details
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

export default function EditContract() {
  const navigate = useNavigate();
  // Alert
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  //   get contract by id
  const { id } = useParams();
  const [contractByid, setContractByid] = useState([]);
  const getContractById = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/contract/${id}`)
      .then((res) => {
        console.log(res.data.contract);
        setContractByid(res.data.contract);
        setTitle(res.data.contract.title);
        setSignature_profile(res.data.contract.signature_profile);
        setStamp_profile(res.data.contract.stamp_profile);
        setTerms(res.data.contract.terms);

        setReturn_terms(res.data.contract.return_terms);
        setInternational_ship_terms(res.data.contract.international_ship_terms);

        setLocal_ship_terms(res.data.contract.local_ship_terms);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getContractById();
  }, []);

  // code to add contract
  const [title, setTitle] = useState("");
  const [signature_profile, setSignature_profile] = useState(
    "https://picsum.photos/500/500"
  );
  const [stamp_profile, setStamp_profile] = useState(
    "https://picsum.photos/500/500"
  );
  const [terms, setTerms] = useState("");
  const [return_terms, setReturn_terms] = useState("");
  const [international_ship_terms, setInternational_ship_terms] = useState([]);
  const [local_ship_terms, setLocal_ship_terms] = useState([]);

  const [btnLoading, setBtnLoading] = useState(false);

  const addContractdata = (e) => {
    setBtnLoading(true);
    // code to store days and price in array of objects
    e.preventDefault();

    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/contract/${id}`, {
        title: title,
        signature_profile: signature_profile,
        stamp_profile: stamp_profile,
        terms: terms,
        return_terms: return_terms,
        international_ship_terms: {
          days: international_ship_terms.days,
          price: international_ship_terms.price,
        },
        local_ship_terms: {
          days: local_ship_terms.days,
          price: local_ship_terms.price,
        },
      })
      .then((res) => {
        console.log(res.data);
        setBtnLoading(false);
        // handleOpen();
        toast.success("Contract Updated Successfully");
      })
      .catch((err) => {
        console.log(err);
        setBtnLoading(false);
        toast.error("Error in Updating Contract");
      });
  };

  // code for success snackbar
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Box
      sx={{
        width: "100%",
        marginTop: 3,
        boxShadow: 0,
        animation: "fadeIn 0.5s ease-in-out",
        transition: "box-shadow 1s ease-in-out",
      }}
    >
      <AppBar position="static">
        <Toolbar variant="dense" sx={{ background: "#333", color: "#fff" }}>
          <Typography variant="h6" color="inherit" component="div">
            Edit Contract
          </Typography>
          <Divider sx={{ flexGrow: 1 }} />
          {btnLoading === true ? (
            <Button
              variant="contained"
              size="small"
              color="success"
              sx={{
                boxShadow: 0,
              }}
              disabled
            >
              <CircularProgress size={20} color="success" />
            </Button>
          ) : (
            <Button
              variant="contained"
              size="small"
              color="success"
              sx={{
                boxShadow: 0,
              }}
              onClick={addContractdata}
            >
              Publish
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <form
        onSubmit={(e) => {
          addContractdata(e);
        }}
      >
        <div>
          {/* title */}
          <TextField
            id="outlined-basic"
            name={title}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            size="small"
            variant="outlined"
            sx={{ width: "100%", marginTop: 2 }}
          />
          {/* terms */}
          <TextField
            id="outlined-basic"
            value={terms}
            name={terms}
            onChange={(e) => setTerms(e.target.value)}
            size="small"
            variant="outlined"
            sx={{ width: "100%", marginTop: 2 }}
          />
          {/* local terms */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div
              style={{
                width: "24%",
                textAlign: "left",
              }}
            >
              <InputLabel
                id="demo-simple-select-label"
                sx={{ marginTop: 2, marginRight: 2 }}
              >
                Local Terms
              </InputLabel>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "70%",
              }}
            >
              <div
                style={{
                  width: "50%",
                }}
              >
                <TextField
                  id="outlined-basic"
                  type={"number"}
                  value={local_ship_terms.price}
                  name={local_ship_terms.price}
                  onChange={(e) =>
                    setLocal_ship_terms({
                      ...local_ship_terms,
                      price: e.target.value,
                    })
                  }
                  size="small"
                  variant="outlined"
                  sx={{ width: "100%", marginTop: 2 }}
                />
              </div>
              <div
                style={{
                  width: "50%",
                }}
              >
                <TextField
                  id="outlined-basic"
                  value={local_ship_terms.days}
                  type={"number"}
                  name={local_ship_terms.days}
                  onChange={(e) =>
                    setLocal_ship_terms({
                      ...local_ship_terms,
                      days: e.target.value,
                    })
                  }
                  size="small"
                  variant="outlined"
                  sx={{ width: "100%", marginTop: 2 }}
                />
              </div>
            </div>
          </div>
          {/* International terms */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div
              style={{
                width: "24%",
                textAlign: "left",
              }}
            >
              <InputLabel
                id="demo-simple-select-label"
                sx={{ marginTop: 2, marginRight: 2 }}
              >
                International Terms
              </InputLabel>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "70%",
              }}
            >
              <div
                style={{
                  width: "50%",
                }}
              >
                <TextField
                  id="outlined-basic"
                  value={international_ship_terms.price}
                  type={"number"}
                  name={international_ship_terms.price}
                  onChange={(e) =>
                    setInternational_ship_terms({
                      ...international_ship_terms,
                      price: e.target.value,
                    })
                  }
                  size="small"
                  variant="outlined"
                  sx={{ width: "100%", marginTop: 2 }}
                />
              </div>
              <div
                style={{
                  width: "50%",
                }}
              >
                <TextField
                  id="outlined-basic"
                  value={international_ship_terms.days}
                  type={"number"}
                  name={international_ship_terms.days}
                  onChange={(e) =>
                    setInternational_ship_terms({
                      ...international_ship_terms,
                      days: e.target.value,
                    })
                  }
                  size="small"
                  variant="outlined"
                  sx={{ width: "100%", marginTop: 2 }}
                />
              </div>
            </div>
          </div>
          <div>
            <TextField
              id="outlined-basic"
              value={return_terms}
              size="small"
              name={return_terms}
              onChange={(e) => setReturn_terms(e.target.value)}
              variant="outlined"
              sx={{ width: "100%", marginTop: 2 }}
            />
          </div>
          <div>
            <InputLabel
              id="demo-simple-select-label"
              sx={{ marginTop: 2, marginRight: 2, textAlign: "left" }}
            >
              Signature Profile
            </InputLabel>
          </div>
          <div>
            <TextField
              id="outlined-basic"
              size="small"
              type={"file"}
              // name={signature_profile}
              // onChange={(e) => setSignature_profile(e.target.value)}
              variant="outlined"
              sx={{ width: "100%", marginTop: 2 }}
            />
          </div>
          <div>
            <InputLabel
              id="demo-simple-select-label"
              sx={{ marginTop: 2, marginRight: 2, textAlign: "left" }}
            >
              Stamp Profile
            </InputLabel>
          </div>
          <div>
            <TextField
              id="outlined-basic"
              size="small"
              type={"file"}
              // name={stamp_profile}
              // onChange={(e) => setStamp_profile(e.target.value)}
              variant="outlined"
              sx={{ width: "100%", marginTop: 2 }}
            />
          </div>
        </div>
      </form>
      {open === true ? (
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          position="right"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Contract Added Successfully
          </Alert>
        </Snackbar>
      ) : null}
    </Box>
  );
}
