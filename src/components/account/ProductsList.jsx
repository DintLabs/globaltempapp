import React, { useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ref, set, remove } from "firebase/database";
import { dbReal } from "firebase";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ProductsList({ data }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [notify, setNotify] = useState({
    status: null,
    message: "",
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleView = (slug) => {
    navigate(`/products/${slug}`, { replace: true });
  };

  const handleDelete = (slug) => {
    // remove(ref(dbReal))
    set(ref(dbReal, "products/" + slug), null)
      .then(() => {
        setOpen(true);
        setNotify({
          status: "success",
          message: "Deleted!",
        });
      })
      .catch((err) => {
        setOpen(true);
        setNotify({
          status: "error",
          message: "Delete failed!",
        });
      });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Fee</TableCell>
            {/* <TableCell align="right">Expired</TableCell> */}
            <TableCell align="center">Date Created</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            Object.entries(data).length > 0 &&
            Object.entries(data).map(([key, item], i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.title}
                </TableCell>
                {/* <TableCell align="center">
                  <img
                    alt=""
                    src={item.image}
                    style={{ width: "100%", maxWidth: "120px" }}
                  />
                </TableCell> */}
                <TableCell align="center">{item.price}</TableCell>
                <TableCell align="center">{item.fee}</TableCell>
                {/* <TableCell align="right">{row.carbs}</TableCell> */}
                <TableCell align="center">
                  {(item.date_created &&
                    moment(item.date_created).format("DD/MM/YYYY")) ||
                    ""}
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleView(key)}>
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(key)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={notify.status || "error"}
          sx={{ width: "100%" }}
        >
          {notify.message || ""}
        </Alert>
      </Snackbar>
    </TableContainer>
  );
}
