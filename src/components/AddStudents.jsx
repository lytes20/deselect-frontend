import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { postNewStudent } from "../services/studentsService";
import { useState, forwardRef, useContext } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import useForm from "../utils/useForm";
import { StudentContext } from "../utils/studentContext";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AddStudents() {
  
  const { setNewNationality } = useContext(StudentContext);
  const [values, handleChange] = useForm({});
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await postNewStudent({
      ...values,
      id: Number(values.studentId),
      age: Number(values.age),
    });
    if (response.code === 201) {
      setMessage("Successfully created new student");
      setError(false);
    } else {
      setMessage("There was an error creating a new student");
      setError(true);
    }
    setOpenSnackBar(true);
    setIsLoading(false);
    handleChange(null)
    setNewNationality(values.nationality)
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };
  return (
    <>
      <Box
        component="form"
        sx={{
          width: 500,
          maxWidth: "100%",
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        Add a new student
        <br />
        <TextField
          fullWidth
          type="number"
          name="studentId"
          value={values.studentId || ""}
          label="Id"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          name="firstName"
          value={values.firstName || ""}
          label="First Name"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          name="lastName"
          value={values.lastName || ""}
          label="Last Name"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          type="number"
          value={values.age || ""}
          name="age"
          label="Age"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          name="nationality"
          value={values.nationality || ""}
          label="Nationality"
          onChange={handleChange}
        />
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Button type="submit" variant="contained">
            Submit
          </Button>
        )}
        <Snackbar
          open={openSnackBar}
          autoHideDuration={5000}
          onClose={handleCloseSnackBar}
        >
          <Alert
            onClose={handleCloseSnackBar}
            severity={error ? "error" : "success"}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
}

export default AddStudents;
