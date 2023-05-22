import Dropdown from "../../components/UI/Dropdown";
import { Box, Grid, Typography } from "@mui/material";
import RegistrationTab from "./RegistrationTab";
import { useContext, useEffect, useState } from "react";
import AcademicCurriculumContext from "../../context/AcademicCurriculumContext";
import CurriculumContext from "../../context/CurriculumContext";
import GradeContext from "../../context/GradeContext";

function Registration() {
  const [acCurriculumId, setAcCurriculumId] = useState("");
  const [gradeId, setGradeId] = useState("");

  const { academicCurriculum, fetchAcademicCurriculums } = useContext(
    AcademicCurriculumContext
  );
  const { curriculum, fetchCurriculumById } = useContext(CurriculumContext);
  const { grade, fetchGradeByStage } = useContext(GradeContext);

  //   fetch curriculum useEffect
  useEffect(() => {
    fetchAcademicCurriculums();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //   Curruculum to dropdown
  const acCurriculumOption = academicCurriculum.map((acCurriculum) => ({
    label: `${acCurriculum.curriculumTitle} - ${acCurriculum.academicYear}`,
    value: acCurriculum._id,
  }));

  const selectedAcCurriculum = !acCurriculumId
    ? []
    : academicCurriculum.filter((SelAcCurr) => {
        return SelAcCurr._id === acCurriculumId;
      });

  // fetch curriculum By Id
  useEffect(() => {
    if (acCurriculumId && selectedAcCurriculum.length > 0) {
      const curriculumId = selectedAcCurriculum[0].curriculumId;

      fetchCurriculumById(curriculumId)
        .then((curriculum) => {
          fetchGradeByStage(curriculum.stage);
        })
        .catch((error) => {
          // Handle any errors
        });
    }
  }, [acCurriculumId]);

  // Fetch grade when curriculum is fetched
  useEffect(() => {
    if (curriculum && curriculum.stage) {
      fetchGradeByStage(curriculum.stage)
        .then(() => {
          // Handle any additional logic after fetching the grade
        })
        .catch((error) => {
          // Handle any errors
        });
    }
  }, [acCurriculumId, curriculum]);

  // gradeOption
  const gradeOption = !acCurriculumId
    ? [{ label: "Not found", value: 1 }]
    : grade.map((gr) => ({
        label: `Grade - ${gr.level}`,
        value: gr._id,
      }));

  return (
    <Box>
      <Typography>Registrations</Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Dropdown
            label="Academic Curriculum"
            options={acCurriculumOption}
            value={acCurriculumId}
            onChange={(e) => {
              setGradeId("");
              setAcCurriculumId(e.target.value);
            }}
            width={"250px"}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Dropdown
            label="Grade"
            options={gradeOption}
            value={gradeId}
            onChange={(e) => {
              setGradeId(e.target.value);
            }}
            width={"80px"}
          />
        </Grid>
      </Grid>
      <RegistrationTab />
    </Box>
  );
}

export default Registration;
