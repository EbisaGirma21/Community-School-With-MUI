import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Dropdown from "../../../components/UI/Dropdown";
import StudentContext from "../../../context/StudentContext";
import SubjectContext from "../../../context/SubjectContext";
import { DataGrid } from "@mui/x-data-grid";

const MyAssessment = () => {
  const [semester, setSemester] = useState("");
  const [tableData, setTableData] = useState([]);

  const {
    fetchStudentEnrollment,
    fetchStudentMark,
    studentEnrollment,
    studentMark,
  } = useContext(StudentContext);

  const { subject, fetchSubjects } = useContext(SubjectContext);

  useEffect(() => {
    fetchStudentEnrollment();
  }, []);

  const semesterOptions =
    studentEnrollment?.currentEnrollement?._academicCurriculum?.semesters.map(
      (semester) => ({
        label: semester?._semesterLabel,
        value: semester?._id,
      })
    ) || [];

  useEffect(() => {
    if (semester && studentEnrollment) {
      fetchStudentMark(
        studentEnrollment?.currentEnrollement?._grade?._id,
        studentEnrollment?.currentEnrollement?._section?._id,
        semester,
        studentEnrollment?._id
      );
    }
  }, [semester, studentEnrollment]);

  useEffect(() => {
    if (
      studentEnrollment?.currentEnrollement?._academicCurriculum?.curriculum &&
      studentEnrollment?.currentEnrollement?._grade?._id
    ) {
      fetchSubjects(
        studentEnrollment?.currentEnrollement?._academicCurriculum.curriculum,
        studentEnrollment?.currentEnrollement?._grade?._id
      );
    }
  }, [studentEnrollment]);

  useEffect(() => {
    if (semester && studentMark) {
      handleSemesterChange(semester);
    }
  }, [studentMark]);

  const handleSemesterChange = (semesterId) => {
    setSemester(semesterId);

    const semesterData = studentMark?.results?.find(
      (result) => result._semesters === semesterId
    );

    if (!semesterData || !semesterData.result) {
      setTableData([]);
      return;
    }

    const rows = semesterData.result.map((item) => {
      const subjectDetails = subject.find((sub) => sub._id === item?.subject);

      const total = Object.values(item.assessment || {}).reduce(
        (acc, curr) => acc + (curr?.value || 0),
        0
      );

      return {
        id: item._id,
        moduleTitle: subjectDetails?.moduleTitle || "Unknown Subject",
        quiz: item.assessment?.quiz?.value || 0,
        test: item.assessment?.test?.value || 0,
        assignment: item.assessment?.assignment?.value || 0,
        midExam: item.assessment?.midExam?.value || 0,
        finalExam: item.assessment?.finalExam?.value || 0,
        total,
        status: total > 50 ? "Pass" : "Fail",
      };
    });

    setTableData(rows);
  };

  const tableColumns = [
    { field: "moduleTitle", headerName: "Subject", flex: 1, minWidth: 150 },
    { field: "quiz", headerName: "Quiz", flex: 1, minWidth: 150 },
    { field: "test", headerName: "Test", flex: 1, minWidth: 150 },
    { field: "assignment", headerName: "Assignment", flex: 1, minWidth: 150 },
    { field: "midExam", headerName: "Mid-Exam", flex: 1, minWidth: 150 },
    { field: "finalExam", headerName: "Final Exam", flex: 1, minWidth: 150 },
    { field: "total", headerName: "Total", flex: 1, minWidth: 150 },
    { field: "status", headerName: "Status", flex: 1, minWidth: 150 },
  ];

  return (
    <Box className="flex flex-col lg:flex-row gap-10">
      <Box className="shadow-md w-full flex flex-col gap-4 bg-white rounded-md">
        <Box className="w-full flex flex-col md:flex-row items-center gap-4 p-4">
          <img
            src={require("../../../assets/student.jpg")}
            alt="Student"
            className="rounded-full object-cover w-20 h-20"
          />
          <Box className="flex flex-wrap w-full gap-4 items-center justify-evenly">
            <Box className="flex-1">
              <Dropdown
                label="Semester"
                options={semesterOptions}
                value={semester}
                onChange={(e) => {
                  setSemester(e.target.value);
                  handleSemesterChange(e.target.value);
                }}
                width="100%"
              />
            </Box>
            <Box className="flex items-center gap-2">
              <span className="font-medium">Total Subjects:</span>
              <span className="p-2 bg-gray-100 rounded-md">
                {subject?.length}
              </span>
            </Box>
            <Box className="flex items-center gap-2">
              <span className="font-medium">Total Mark:</span>
              <span className="p-2 bg-gray-100 rounded-md">
                {studentMark?.totalMark}
              </span>
            </Box>
            <Box className="flex items-center gap-2">
              <span className="font-medium">Average Mark:</span>
              <span className="p-2 bg-gray-100 rounded-md">
                {studentMark?.average}
              </span>
            </Box>
            <Box className="flex items-center gap-2">
              <span className="font-medium">Rank:</span>
              <span className="p-2 bg-gray-100 rounded-md">
                {studentMark?.rank}
              </span>
            </Box>
          </Box>
        </Box>
        <Box className="p-4">
          <DataGrid
            rows={tableData}
            columns={tableColumns}
            getRowId={(row) => row.id}
            autoHeight
            className="bg-white rounded-md"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default MyAssessment;
