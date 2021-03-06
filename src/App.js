import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";
import Navigation from "./containers/Navigation";
import Header from "./containers/Header";
import Main from "./containers/Main";
import AddStudents from "./components/AddStudents";
import ViewStudents from "./components/ViewStudents";
import { Route, Routes, Navigate } from "react-router-dom";
import { StudentContext } from "./utils/studentContext";

export default function App() {
  const [open, setOpen] = useState(true);
  const [newNationality, setNewNationality] = useState()
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header open={open} handleDrawerOpen={handleDrawerOpen} title="Gideon" />
      <Navigation open={open} handleDrawerClose={handleDrawerClose} />
      <Main open={open}>
        <StudentContext.Provider value={{newNationality, setNewNationality}}>
          <Routes>
            <Route exact path="/" element={<Navigate to="/home" />} />
            <Route exact path="/home" element={<ViewStudents />} />
            <Route exact path="/new" element={<AddStudents />} />
          </Routes>
        </StudentContext.Provider>
      </Main>
    </Box>
  );
}
