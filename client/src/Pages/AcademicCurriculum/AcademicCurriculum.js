import AcademicCurriculumTable from "./components/AcademicCurriculumTable";
import { Box } from "@mui/material";
function AcademicCurriculum() {
  return (
    <Box>
      <Box>Academic Curriculum</Box>
      <Box>
        <Box>
          <AcademicCurriculumTable />
        </Box>
      </Box>
    </Box>
  );
}

export default AcademicCurriculum;
