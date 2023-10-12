import { useContext, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import ClubMemberCreate from "./components/ClubMemberCreate";
import ClubMemberContext from "../../context/ClubMemberContext";
import ClubMemberTable from "./components/ClubMemberTable";



function ClubMember() {
  const { setError, setIsLoading } = useContext(ClubMemberContext);
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
          <ClubMemberCreate open={open} handleClose={handleClose} />
          <Box>
            <ClubMemberTable />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ClubMember;
