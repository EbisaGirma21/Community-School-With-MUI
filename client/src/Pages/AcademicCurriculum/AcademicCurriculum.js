import AcademicCurriculumTable from "./components/AcademicCurriculumTable";
import { Box } from "@mui/material";
function AcademicCurriculum() {
  return (
    <Box>
      <Box>Academic Curriculum</Box>
      {localStorage.setItem("path", JSON.stringify("academicCurriculum"))}
      <Box>
        <Box>
          <AcademicCurriculumTable />
        </Box>
      </Box>
    </Box>
  );
}

export default AcademicCurriculum;
