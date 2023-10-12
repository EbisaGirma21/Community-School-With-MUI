import { useContext, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import ClubTable from "./ClubTable";
import ClubCreate from "./ClubCreate";
import ClubContext from "../../../context/ClubContext";

function Club() {
  const { setError, setIsLoading } = useContext(ClubContext);
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
      <Box>
        <Box>
          <Button onClick={handleOpen} variant="contained" sx={{ m: 1 }}>
            <AddIcon />
            New
          </Button>
          <ClubCreate open={open} handleClose={handleClose} />
          <Box>
            <ClubTable />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Club;
