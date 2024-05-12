import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TableFooter,
  TablePagination,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { getSortedRecords, deleteRecord } from "../helpers/api";

const UserRecordsTable = ({ user, records, setRecords }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);
  const [alertSeverity, setAlertSeverity] = React.useState("");
  const [alertMessage, setAlertMessage] = React.useState("");
  const [deletedRecord, setDeletedRecord] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sortedRecords = await getSortedRecords(user.userID);

        setRecords(sortedRecords);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [deletedRecord, user.userID]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id) => {
    console.log("Delete record with ID:", id);
    console.log("Delete from this user:", user.userID);
    const fetchData = async () => {
      try {
        const response = await deleteRecord(user.userID, id);
        console.log(response);
        if (response.status === 200) {
          setAlertMessage("Record was successfully deleted.");
          setAlertSeverity("success");
        }
      } catch (error) {
        console.error(error);
        setAlertMessage("An error occurred while deleting the record.");
        setAlertSeverity("error");
      }
      setOpen(true);
      setDeletedRecord(id);
    };

    fetchData();
  };

  return (
    <div>
      <TableContainer
        component={Paper}
        sx={{ margin: "1em", maxWidth: "calc(100% - 3em)" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Record ID</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Balance</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Operation Response</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? records.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : records
            ).map((record) => (
              <TableRow key={record.id}>
                <TableCell component="th" scope="row">
                  {record.id}
                </TableCell>
                <TableCell align="right">{record.amount}</TableCell>
                <TableCell align="right">{record.balance}</TableCell>
                <TableCell align="right">{record.date}</TableCell>
                <TableCell align="right">{record.operationResponse}</TableCell>
                <TableCell align="right">{record.type}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleDelete(record.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={9}
                count={records.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    inputProps: { "aria-label": "rows per page" },
                    native: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={alertSeverity}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UserRecordsTable;
