import { Box, TextField } from "@mui/material";
import React, { useContext, useEffect } from "react";
import StudentContext from "../../../context/StudentContext";
import SubjectContext from "../../../context/SubjectContext";

const CurrentEnrollement = () => {
  const {
    fetchStudentById,
    fetchStudentEnrollment,
    studentById,
    studentEnrollment,
  } = useContext(StudentContext);
  const { subject, fetchSubjects } = useContext(SubjectContext);

  useEffect(() => {
    fetchStudentById();
    fetchStudentEnrollment();
  }, []);

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

  return (
    <Box className="flex gap-10 ">
      <Box className="shadow-md w-full lg:w-1/3 flex flex-col gap-4 bg-white rounded-md p-4">
        <Box className="font-bold text-lg">Current Enrollment</Box>
        <Box className="w-full flex justify-center">
          <img
            src={require("../../../assets/student.jpg")}
            alt="Student"
            className="rounded-full object-cover w-24 h-24"
          />
        </Box>
        <Box className="flex flex-col gap-4 p-4">
          {[
            {
              label: "Name",
              value: `${studentById?.firstName} ${studentById?.middleName}`,
            },
            {
              label: "Family",
              value: `${studentById?.middleName} ${studentById?.lastName}`,
            },
            {
              label: "ID Number",
              value: `${studentEnrollment?.studentIdNumber}`,
            },
            { label: "Year", value: "2015" },
            {
              label: "Grade",
              value: `${studentEnrollment?.currentEnrollement?._grade?.stage} - ${studentEnrollment?.currentEnrollement?._grade?.level}`,
            },
            {
              label: "Section",
              value: `${studentEnrollment?.currentEnrollement?._section?.sectionLabel}`,
            },
            { label: "Roll No", value: "1" },
          ].map((item, index) => (
            <Box
              key={index}
              className="flex justify-between w-full p-2 border-b last:border-none"
            >
              <Box className="font-medium">{item.label}</Box>
              <Box className="text-gray-700">{item.value}</Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Box className="shadow-md w-3/4 flex flex-col p-4 gap-4">
        <Box className="flex w-full gap-4">
          <Box className="w-full">
            <Box className="p-2"> First Name </Box>
            <Box className="w-full border-2 border-gray-100 p-2">
              {`${studentById?.firstName} `}
            </Box>
          </Box>
          <Box className="w-full">
            <Box className="p-2"> Last Name </Box>
            <Box className="w-full border-2 border-gray-100 p-2">{`${studentById?.middleName}`}</Box>
          </Box>
        </Box>
        <Box className="w-full">
          <Box className="p-2"> Your Home Room Teacher </Box>
          <Box className="w-full border-2 border-gray-100 p-2">
            {`${studentEnrollment?.currentEnrollement?._section?.homeRoomTeacher?.firstName}  ${studentEnrollment?.currentEnrollement?._section?.homeRoomTeacher?.middleName}`}
          </Box>
        </Box>
        <Box className="flex w-full gap-4">
          <Box className="w-full">
            <Box className="p-2">Grade </Box>
            <Box className="w-full border-2 border-gray-100 p-2">{`${studentEnrollment?.currentEnrollement?._grade?.stage} - ${studentEnrollment?.currentEnrollement?._grade?.level}`}</Box>
          </Box>
          <Box className="w-full">
            <Box className="p-2"> Section </Box>
            <Box className="w-full border-2 border-gray-100 p-2">{`${studentEnrollment?.currentEnrollement?._section?.sectionLabel}`}</Box>
          </Box>
        </Box>
        <Box className="mt-6">
          <Box className="font-medium mb-2">Subjects:</Box>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subject.map((subject) => (
              <Box
                key={subject?._id}
                className="border rounded-md p-2 bg-gray-50"
              >
                {subject?.moduleTitle}
              </Box>
            )) || (
              <Box className="text-gray-500">No subjects assigned yet.</Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CurrentEnrollement;
