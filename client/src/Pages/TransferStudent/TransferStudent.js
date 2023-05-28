import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const TransferStudent = () => {
  return (
    <Box>
      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained">
          <AddIcon /> Register Transfer Student
        </Button>
      </Box>
      <Box>Up on progress</Box>
    </Box>
  );
};

export default TransferStudent;
