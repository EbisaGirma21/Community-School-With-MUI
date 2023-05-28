import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import AcademicSessionTable from "./components/AcademicSessionTable";
import AcademicSessionCreate from "./components/AcademicSessionCreate";

function AcademicSession() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Box>Academic Session</Box>

      <Button
        onClick={handleOpen}
        variant="contained"
        sx={{ m: 1, background: "#1E88E5" }}
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