import Dropdown from "../../components/UI/Dropdown";
import { Box, Grid, Typography } from "@mui/material";
import AssignTeacherTab from "./components/AssignTeacherTab";
import { useContext, useEffect, useState } from "react";
import AcademicCurriculumContext from "../../context/AcademicCurriculumContext";
import CurriculumContext from "../../context/CurriculumContext";
import GradeContext from "../../context/GradeContext";
import AcademicSessionContext from "../../context/AcademicSessionContext";

function AssignTeacher() {
  {
    localStorage.setItem("path", JSON.stringify("assignTeacher"));
  }

  const [acSession, setAcSession] = useState("");
  const [acCurriculumId, setAcCurriculumId] = useState("");
  const [gradeId, setGradeId] = useState("");

  const { academicCurriculum, fetchAcademicCurriculums } = useContext(
    AcademicCurriculumContext
  );

  const { academicSession, fetchAcademicSessions } = useContext(
    AcademicSessionContext
  );

  const { curriculum, fetchCurriculumById } = useContext(CurriculumContext);
  const { grade, fetchGradeByStage } = useContext(GradeContext);

  //   fetch curriculum useEffect
  useEffect(() => {
    fetchAcademicSessions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //   fetch curriculum useEffect
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

  return (
    <Box>
      <Box className="bg-white p-4 text-lg rounded-lg">Assign Teacher </Box>
      <Box
        className="flex p-1 gap-4"
        sx={{ border: "1px solid #dbdde0", borderRadius: "10px" }}
      >
        <Dropdown
          label="Academic Year"
          options={academicSessionOption}
          value={acSession}
          onChange={(e) => {
            setAcSession(e.target.value);
          }}
          width={"140px"}
        />

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

        <Dropdown
          label="Grade"
          options={gradeOption}
          value={gradeId}
          onChange={(e) => {
            setGradeId(e.target.value);
          }}
          width={"80px"}
        />
      </Box>
      <AssignTeacherTab gradeId={gradeId} acCurriculumId={acCurriculumId} />
    </Box>
  );
}

export default AssignTeacher;
