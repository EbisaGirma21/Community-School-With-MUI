import Dropdown from "../../components/UI/Dropdown";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import AcademicCurriculumContext from "../../context/AcademicCurriculumContext";
import SectionContext from "../../context/SectionContext";
import GradeContext from "../../context/GradeContext";
import CurriculumContext from "../../context/CurriculumContext";
import ResultTab from "./components/ResultTab";
import AcademicSessionContext from "../../context/AcademicSessionContext";

function Result() {
  {
    localStorage.setItem("path", JSON.stringify("result"));
  }
  const user = JSON.parse(localStorage.getItem("user"));

  // state
  const [acSession, setAcSession] = useState("");
  const [acCurriculumId, setAcCurriculumId] = useState("");
  const [gradeId, setGradeId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [curriculumId, setCurriculumId] = useState("");
  const [semesterId, setSemesterId] = useState("");

  // context
  const { academicCurriculum, fetchAcademicCurriculums } = useContext(
    AcademicCurriculumContext
  );
  const { curriculum, fetchCurriculumById } = useContext(CurriculumContext);
  const { academicSession, fetchAcademicSessions } = useContext(
    AcademicSessionContext
  );
  const { grade, fetchGradeByStage } = useContext(GradeContext);
  const { section, fetchSections } = useContext(SectionContext);

  //   fetch curriculum useEffect
  useEffect(() => {
    fetchAcademicSessions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // academic curriculum
  useEffect(() => {
    fetchAcademicCurriculums();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const academicSessionOption = academicSession.map((ac_Session) => ({
    label: ac_Session.academicYear,
    value: ac_Session.academicYear,
  }));

  const filteredAcCurriculum = academicCurriculum.filter((acCurriculum) => {
    return acCurriculum.academicYear === acSession;
  });
  //   Curruculum to dropdown
  const acCurriculumOption = !acSession
    ? [{ label: "Not found", value: 1 }]
    : filteredAcCurriculum.map((acCurriculum) => ({
        label: `${acCurriculum.curriculumTitle}`,
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
  const sections =
    user.role === "teacher"
      ? section.filter((sec) => {
          const hasHomeRoomTeacher = sec.homeRoomTeacher === user._id;
          const hasDesiredTeacher = sec.teachers.some(
            (teacher) => teacher.teacher === user._id
          );
          return hasHomeRoomTeacher || hasDesiredTeacher;
        })
      : section.filter((sec) => {
          return (
            sec.grade === gradeId && sec.academicCurriculum === acCurriculumId
          );
        });

  // section option
  const sectionOption = !acCurriculumId
    ? [{ label: "Not found", value: 1 }]
    : sections.map((sec) => ({
        label: `Section - ${sec.sectionLabel}`,
        value: sec._id,
      }));


  const filteredAcademicCurriculum = academicCurriculum.filter(
    (acCurriculum) => {
      return acCurriculum._id === acCurriculumId;
    }
  );

  const semesterOption = !acCurriculumId
    ? [{ label: "Not found", value: 1 }]
    : filteredAcademicCurriculum[0].semesters.map((semester) => ({
        label: semester._semesterLabel,
        value: semester._id,
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
      <Box className="flex justify-between p-2 border-2 border-gray-200 rounded-md">
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Dropdown
              label="Academic Year"
              options={academicSessionOption}
              value={acSession}
              onChange={(e) => {
                setAcSession(e.target.value);
              }}
              width={"140px"}
            />
          </Grid>
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
            <Box>
              <Dropdown
                label="Section"
                options={sectionOption}
                value={sectionId}
                onChange={(e) => {
                  setSectionId(e.target.value);
                }}
                width={"40px"}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box>
              <Dropdown
                label="Semesters"
                options={semesterOption}
                value={semesterId}
                onChange={(e) => setSemesterId(e.target.value)}
                width={"50%"}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <ResultTab
        acCurriculumId={acCurriculumId}
        semesterId={semesterId}
        curriculumId={curriculumId}
        gradeId={gradeId}
        sectionId={sectionId}
      />
    </Box>
  );
}

export default Result;
