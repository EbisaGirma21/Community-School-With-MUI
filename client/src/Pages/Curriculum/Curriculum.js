import CurriculumTab from "./components/CurriculumTab";
import { Box } from "@mui/material";

function Curriculum() {
  return (
    <Box>
      {localStorage.setItem("path", JSON.stringify("curriculum"))}
      <Box className="bg-white p-4 text-lg rounded-lg">Curriculum</Box>
      <Box>
        <CurriculumTab />
      </Box>
    </Box>
  );
}

export default Curriculum;
