import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function ProductsList({ data }) {
  console.log(">> data: ", data);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="center">Image</TableCell>
            <TableCell align="center">Price</TableCell>
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
                <TableCell align="center">
                  <img
                    alt=""
                    src={item.image}
                    style={{ width: "100%", maxWidth: "120px" }}
                  />
                </TableCell>
                <TableCell align="center">{item.price}</TableCell>
                {/* <TableCell align="right">{row.carbs}</TableCell> */}
                <TableCell align="center">{item.dateCreated || ""}</TableCell>
                <TableCell align="right">
                  <IconButton>
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
