import { Box, Button } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";

const Deregistration = () => {
  return (
    <Box>
      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained" color="error">
          <RemoveIcon /> Deregister selected Student
        </Button>
      </Box>
      <Box>Up on progress</Box>
    </Box>
  );
};

export default Deregistration;
