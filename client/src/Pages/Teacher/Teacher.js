import { useContext, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import TeacherTable from "./components/TeacherTable";
import TeacherCreate from "./components/TeacherCreate";
import TeacherContext from "../../context/TeacherContext";

function Teacher() {
  const { setError, setIsLoading } = useContext(TeacherContext);

  {
    localStorage.setItem("path", JSON.stringify("teacher"));
  }

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Box className="bg-white p-4 text-lg rounded-lg">Teacher </Box>
      <Box>
        <Box>
          <Button onClick={handleOpen} variant="contained" sx={{ m: 1 }}>
            <AddIcon />
            New
          </Button>
          <TeacherCreate open={open} handleClose={handleClose} />
          <Box>
            <TeacherTable />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Teacher;
