import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { Box } from "@mui/material";
import styled from "@emotion/styled";
import UserRecordsTable from "./components/UserRecordsTable";
import NewOperationForm from "./components/NewOperationForm";
import { loginUser } from "./helpers/api";

const Form = styled("form")`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 300px;
  margin: auto;
`;

const CenteredDiv = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

function App() {
  const [user, setUser] = React.useState(
    () => JSON.parse(localStorage.getItem("user")) || false
  );
  const [isLoggedIn, setIsLoggedIn] = React.useState(
    () => JSON.parse(localStorage.getItem("isLoggedIn")) || false
  );
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [toggleTable, setToggleTable] = useState(false);
  const [toggleForm, setToggleForm] = useState(false);

  React.useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    localStorage.setItem("user", JSON.stringify(user));
    console.log("isLoggedIn", isLoggedIn);
    console.log("user", user);
  }, [isLoggedIn, user]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setLoginError(null);

    try {
      const response = await loginUser(
        event.target.elements.email.value,
        event.target.elements.password.value
      );

      console.log({ response });

      if (response.status === 200) {
        setIsLoggedIn(true);
        setUser(response.data.user);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error(error);
      setLoginError("Failed to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const handleViewRecords = () => {
    console.log("View Records");
    setToggleTable(!toggleTable);
  };

  const handleCreateOperation = () => {
    console.log("Create Operation");
    setToggleForm(!toggleForm);
  };

  return (
    <>
      <Router>
        <div className="App">
          <header className="App-header">
            {isLoggedIn ? (
              <>
                <h1>Welcome {user.email}</h1>
                <p>User Balance: {user.balance}</p>
                <Link to="/">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </Link>
                <Box mt={2} display="flex" gap={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleViewRecords}
                  >
                    View All Records
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCreateOperation}
                  >
                    Create New Operation
                  </Button>
                </Box>

                {toggleTable && (
                  <UserRecordsTable
                    user={user}
                    records={records}
                    setRecords={setRecords}
                  />
                )}
                {toggleForm && (
                  <NewOperationForm
                    user={user}
                    setUser={setUser}
                    setRecords={setRecords}
                  />
                )}
              </>
            ) : (
              <CenteredDiv>
                <Form onSubmit={handleLogin}>
                  <TextField label="Email" variant="outlined" id="email" />
                  <TextField
                    id="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                  />
                  <Button type="submit" variant="contained" color="primary">
                    Login
                  </Button>
                  {loading && <CircularProgress />}
                  {loginError && <Alert severity="error">{loginError}</Alert>}
                </Form>
              </CenteredDiv>
            )}
          </header>
        </div>

        <Routes>
          <Route exact path={"/"} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
