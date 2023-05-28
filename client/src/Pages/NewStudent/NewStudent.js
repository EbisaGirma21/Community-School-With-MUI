import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import NewStudentTable from "./components/NewStudentTable";
import NewStudentCreate from "./components/NewStudentCreate";
import AddIcon from "@mui/icons-material/Add";

const NewStudent = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box>
      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained" onClick={handleOpen}>
          <AddIcon /> Register New Student
        </Button>
        <NewStudentCreate open={open} handleClose={handleClose} />
      </Box>
      <NewStudentTable />
    </Box>
  );
};

export default NewStudent;
