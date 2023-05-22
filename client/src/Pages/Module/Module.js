import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import ModuleTable from "./components/ModuleTable";
import ModuleCreate from "./components/ModuleCreate";

function Module() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Box >Module</Box>
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
          <ModuleCreate open={open} handleClose={handleClose} />
          <Box>
            <ModuleTable />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Module;
