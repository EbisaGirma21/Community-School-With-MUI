import { useContext, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import ModuleTable from "./components/ModuleTable";
import ModuleCreate from "./components/ModuleCreate";
import ModuleContext from "../../context/ModuleContext";

function Module() {
  const { setError, setIsLoading } = useContext(ModuleContext);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setError(null);
    setIsLoading(null);
    setOpen(false);
  };

  return (
    <Box>
      <Box className="bg-white p-4 text-lg rounded-lg">Module </Box>
      <Box>
        <Box>
          <Button
            onClick={handleOpen}
            variant="contained"
            sx={{ m: 1, background: "#5E35B1" }}
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
