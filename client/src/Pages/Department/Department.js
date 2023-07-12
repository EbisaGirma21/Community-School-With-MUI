import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import DepartmentTable from "./components/DepartmentTable";
import DepartmentCreate from "./components/DepartmentCreate";

function Department() {
  {localStorage.setItem("path", JSON.stringify("department"))}


  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Box >Department</Box>
      <Box>
        <Box>
          <Button
            onClick={handleOpen}
            variant="contained"
           sx={{m:1}}
          >
            <AddIcon />
            New
          </Button>
          <DepartmentCreate open={open} handleClose={handleClose} />
          <Box>
            <DepartmentTable />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Department;
