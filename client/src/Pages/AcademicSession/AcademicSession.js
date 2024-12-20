import { useContext, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import AcademicSessionTable from "./components/AcademicSessionTable";
import AcademicSessionCreate from "./components/AcademicSessionCreate";
import AcademicSessionContext from "../../context/AcademicSessionContext";

function AcademicSession() {
  const { setError, setIsLoading } = useContext(AcademicSessionContext);

  // first process
  {
    localStorage.setItem("path", JSON.stringify("academicSession"));
  }

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsLoading(null);
    setError(null);
  };

  return (
    <Box>
      <Box className="bg-white p-4 text-lg rounded-lg">Academic Session</Box>
      <Button
        onClick={handleOpen}
        variant="contained"
        sx={{ m: 1, background: "#5E35B1" }}
      >
        <AddIcon />
        New
      </Button>
      <AcademicSessionCreate open={open} handleClose={handleClose} />
      <Box>
        <AcademicSessionTable />
      </Box>
    </Box>
  );
}

export default AcademicSession;
