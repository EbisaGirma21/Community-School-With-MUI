import AcademicCurriculumTable from "./components/AcademicCurriculumTable";
import { Box } from "@mui/material";
function AcademicCurriculum() {
  return (
    <Box>
      <Box className="bg-white p-4 text-lg rounded-lg">Academic Curriculum</Box>
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
