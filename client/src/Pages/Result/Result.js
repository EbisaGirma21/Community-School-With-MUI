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
  const [currentStatus, setCurrentStatus] = useState("");
  const [currentSectionHomeRoom, setCurrentSectionHomeRoom] = useState(false);
  const [subjectIds, setSubjectIds] = useState([]);
  const [classStartDate, setClassStartDate] = useState(null);
  const [classEndDate, setClassEndDate] = useState(null);

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
    ? []
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
    ? []
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
  const sections = user.role.includes("teacher")
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
    ? []
    : sections.map((sec) => ({
        label: `Section - ${sec.sectionLabel}`,
        value: sec._id,
      }));

  // Filter subjects where teacher's ID matches the user's ID
  const filteredSubjects = sectionId
    ? sections[0].teachers.filter((teacher) => {
        // Check if teacher's ID is missing or not equal to the user's ID
        if (teacher.teacher) {
          return teacher.teacher == user._id; // Exclude this teacher
        }
        return false; // Include this teacher
      })
    : [];

  // check if teacher is home roomteacher of the current section
  useEffect(() => {
    // Extract the subject IDs
    const subjectIds = filteredSubjects
      ? filteredSubjects.map((teacher) => teacher.subject)
      : [];

    filteredSubjects && setSubjectIds(subjectIds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionId]);

  // check if teacher is home roomteacher of the current section
  useEffect(() => {
    const filterSectionByTeacher = sectionId
      ? sections.filter((section) => {
          return section._id === sectionId;
        })
      : [];
    if (
      filterSectionByTeacher.length !== 0 &&
      filterSectionByTeacher[0].homeRoomTeacher === user._id
    ) {
      setCurrentSectionHomeRoom(true);
    } else {
      setCurrentSectionHomeRoom(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionId]);

  const filteredAcademicCurriculum = academicCurriculum.filter(
    (acCurriculum) => {
      return acCurriculum._id === acCurriculumId;
    }
  );

  const semesterOption =
    !acCurriculumId || !sectionId
      ? []
      : [
          ...filteredAcademicCurriculum[0].semesters.map((semester) => ({
            label: `Semester - ${semester._semesterLabel}`,
            value: semester._id,
          })),
          { label: "Average", value: "average" }, // Add the "Average" option manually
        ];

  // Event handler for dropdown value change
  const handleAcCurriculumChange = (e) => {
    setAcCurriculumId(e.target.value);
    setGradeId("");
    setSectionId("");
    setSemesterId("");
    const selectedCurriculum = academicCurriculum.find(
      (acCurriculum) => acCurriculum._id === e.target.value
    );
    if (selectedCurriculum) {
      setCurriculumId(selectedCurriculum.curriculumId);
    } else {
      setCurriculumId("");
    }
  };

  const filteredSection = sectionId
    ? sections.filter((section) => {
        return section._id === sectionId;
      })
    : [];

  //   setCurrentStatus
  useEffect(() => {
    const currentSemester = acCurriculumId
      ? filteredSection[0].semesters.filter((semester) => {
          return semester._semester === semesterId;
        })
      : [];

    currentSemester.length !== 0 &&
      setCurrentStatus(currentSemester[0]._status);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [semesterId]);

  useEffect(() => {
    const filteredAcademicSession = academicSession.filter((acaSession) => {
      return acaSession.academicYear === acSession;
    });

    if (filteredAcademicSession.length > 0) {
      setClassStartDate(filteredAcademicSession[0].classStartDate);
      setClassEndDate(filteredAcademicSession[0].classEndDate);
    } else {
      setClassStartDate(null);
      setClassEndDate(null);
    }
  }, [acSession, academicSession]);
  console.log(classStartDate);

  return (
    <Box>
      <Box className="bg-white p-4 text-lg rounded-lg">Student Result</Box>
      <Box className="flex justify-between p-2 border-2 border-gray-200 rounded-md">
        <Box className="flex p-1 gap-4">
          <Dropdown
            label="Academic Year"
            options={academicSessionOption}
            value={acSession}
            onChange={(e) => {
              setAcSession(e.target.value);
              setAcCurriculumId("");
              setGradeId("");
              setSectionId("");
              setSemesterId("");
            }}
            width={"140px"}
          />

          <Dropdown
            label="Academic Curriculum"
            options={acCurriculumOption}
            value={acCurriculumId}
            onChange={handleAcCurriculumChange}
            width={"240px"}
          />

          <Dropdown
            label="Grade"
            options={gradeOption}
            value={gradeId}
            onChange={(e) => {
              setGradeId(e.target.value);
              setSectionId("");
              setSemesterId("");
            }}
            width={"120px"}
          />

          <Dropdown
            label="Section"
            options={sectionOption}
            value={sectionId}
            onChange={(e) => {
              setSectionId(e.target.value);
              setSemesterId("");
            }}
            width={"80px"}
          />

          <Dropdown
            label="Semesters"
            options={semesterOption}
            value={semesterId}
            onChange={(e) => setSemesterId(e.target.value)}
            width={"150px"}
          />
        </Box>
      </Box>
      <ResultTab
        acCurriculumId={acCurriculumId}
        semesterId={semesterId}
        curriculumId={curriculumId}
        gradeId={gradeId}
        sectionId={sectionId}
        currentStatus={currentStatus}
        currentSectionHomeRoom={currentSectionHomeRoom}
        subjectIds={subjectIds}
        classStartDate={classStartDate}
        classEndDate={classEndDate}
        semesterOption={semesterOption}
      />
    </Box>
  );
}
export default Result;
