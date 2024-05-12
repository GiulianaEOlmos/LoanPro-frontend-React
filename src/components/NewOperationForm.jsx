import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Card,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { createNewOperation, getSortedRecords } from "../helpers/api";

function NewOperationForm({ user, setUser, setRecords }) {
  const [cost, setCost] = useState(5);
  const [type, setType] = useState("");
  const [inputA, setInputA] = useState(0);
  const [inputB, setInputB] = useState(0);
  const [result, setResult] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(
    `An error occurred during the operation.`
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    const operationData = {
      userID: user.userID,
      userBalance: user.balance,
      cost: cost,
      type,
      input: {
        a: Number(inputA),
        b: Number(inputB),
      },
    };

    console.log(operationData);

    try {
      if (user.balance < cost) {
        setMessage(`Insufficient balance to perform the operation.`);
        setOpen(true);
        return;
      }
      const response = await createNewOperation(operationData);
      console.log(response.data.response);
      const newBalance = response.data.response.newBalance;
      setResult(response.data.response.result);
      setUser({ ...user, balance: newBalance });

      const updatesRecords = await getSortedRecords(user.userID);
      setRecords(updatesRecords);
      console.log(result);
    } catch (error) {
      console.error(error);
      setOpen(true);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
        alignItems: "flex-start",
        marginTop: 4,
      }}
    >
      <Box
        component={Card}
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: 300,
          padding: 3,
        }}
        elevation={3}
      >
        <h2>New Operation</h2>
        <TextField
          label="Cost"
          type="number"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />
        <FormControl>
          <InputLabel>Type</InputLabel>
          <Select value={type} onChange={(e) => setType(e.target.value)}>
            <MenuItem value="addition">Addition</MenuItem>
            <MenuItem value="subtraction">Subtraction</MenuItem>
            <MenuItem value="multiplication">Multiplication</MenuItem>
            <MenuItem value="division">Division</MenuItem>
            <MenuItem value="square_root">Square Root</MenuItem>
            <MenuItem value="random_string">Random String</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Input A"
          value={inputA}
          type="number"
          disabled={type === "random_string"}
          onChange={(e) => setInputA(e.target.value)}
        />
        <TextField
          label="Input B"
          value={inputB}
          type="number"
          disabled={type === "random_string" || type === "square_root"}
          onChange={(e) => setInputB(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
        {result && <Typography variant="h6">Result: {result}</Typography>}
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default NewOperationForm;
