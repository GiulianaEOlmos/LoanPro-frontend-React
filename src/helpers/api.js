import axios from "axios";

export const loginUser = async (email, password) => {
  const response = await axios.post(
    process.env.REACT_APP_LOGIN_URL,
    {
      email,
      password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const createNewOperation = async (operationData) => {
  const response = await axios.post(
    process.env.REACT_APP_NEW_OPERATION_URL,
    operationData
  );
  return response;
};

export const getSortedRecords = async (userID) => {
  const response = await axios.post(process.env.REACT_APP_GET_RECORDS_URL, {
    userID,
  });
  console.log(response.data.records);

  const sortedRecords = [...response.data.records].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  return sortedRecords;
};

export const deleteRecord = async (userID, recordID) => {
  const response = await axios.post(process.env.REACT_APP_DELETE_RECORDS_URL, {
    userID,
    recordID,
  });
  return response;
};
