import CurriculumTab from "./components/CurriculumTab";
import { Box } from "@mui/material";

function Curriculum() {
  return (
    <Box>
      {localStorage.setItem("path", JSON.stringify("curriculum"))}
      <Box>Curriculum</Box>
      <Box>
        <CurriculumTab />
      </Box>
    </Box>
  );
}

export default Curriculum;
