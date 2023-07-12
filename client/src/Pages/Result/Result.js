import Dropdown from "../../components/UI/Dropdown";
import { Box, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import AcademicCurriculumContext from "../../context/AcademicCurriculumContext";
import SectionContext from "../../context/SectionContext";
import MarkTable from "./components/MarkTable";
import GradeContext from "../../context/GradeContext";
import CurriculumContext from "../../context/CurriculumContext";
import ResultTab from "./components/ResultTab";

function Result() {
  {
    localStorage.setItem("path", JSON.stringify("result"));
  }

  // state
  const [acCurriculumId, setAcCurriculumId] = useState("");
  const [gradeId, setGradeId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [curriculumId, setCurriculumId] = useState("");

  // context
  const { academicCurriculum, fetchAcademicCurriculums } = useContext(
    AcademicCurriculumContext
  );
  const { curriculum, fetchCurriculumById } = useContext(CurriculumContext);

  const { grade, fetchGradeByStage } = useContext(GradeContext);
  const { section, fetchSections } = useContext(SectionContext);

  // academic curriculum
  useEffect(() => {
    fetchAcademicCurriculums();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //   Curruculum to dropdown
  const acCurriculumOption = academicCurriculum.map((acCurriculum) => ({
    label: `${acCurriculum.curriculumTitle} - ${acCurriculum.academicYear}`,
    value: acCurriculum._id,
  }));
  // academic curriculum end

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acCurriculumId, curriculum]);

  // gradeOption
  const gradeOption = !acCurriculumId
    ? [{ label: "Not found", value: 1 }]
    : grade.map((gr) => ({
        label: gr.stage === "KG" ? `KG - ${gr.level}` : `Grade - ${gr.level}`,
        value: gr._id,
      }));

  const selectedAcCurriculum = !acCurriculumId
    ? []
    : academicCurriculum.filter((SelAcCurr) => {
        return SelAcCurr._id === acCurriculumId;
      });

  // fetching section
  useEffect(() => {
    acCurriculumId && fetchSections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acCurriculumId]);

  //  filter section by grade
  const sections = section.filter((sec) => {
    return sec.grade === gradeId && sec.academicCurriculum === acCurriculumId;
  });

  // section option
  const sectionOption = !acCurriculumId
    ? [{ label: "Not found", value: 1 }]
    : sections.map((sec) => ({
        label: `Section - ${sec.sectionLabel}`,
        value: sec._id,
      }));

  // Event handler for dropdown value change
  const handleAcCurriculumChange = (e) => {
    setAcCurriculumId(e.target.value);
    const selectedCurriculum = academicCurriculum.find(
      (acCurriculum) => acCurriculum._id === e.target.value
    );
    if (selectedCurriculum) {
      setCurriculumId(selectedCurriculum.curriculumId);
    } else {
      setCurriculumId("");
    }
  };

  return (
    <Box>
      <Typography sx={{ m: 1 }}>Student Result</Typography>
      <Grid
        container
        spacing={1}
        sx={{ p: 1, border: "1px solid #dbdde0", borderRadius: "10px" }}
      >
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Dropdown
            label="Academic Curriculum"
            options={acCurriculumOption}
            value={acCurriculumId}
            onChange={handleAcCurriculumChange}
            width={"150px"}
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
            width={"40px"}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Dropdown
            label="Section"
            options={sectionOption}
            value={sectionId}
            onChange={(e) => {
              setSectionId(e.target.value);
            }}
            width={"40px"}
          />
        </Grid>
      </Grid>
      <ResultTab
        acCurriculumId={acCurriculumId}
        curriculumId={curriculumId}
        gradeId={gradeId}
        sectionId={sectionId}
      />
    </Box>
  );
}

export default Result;
