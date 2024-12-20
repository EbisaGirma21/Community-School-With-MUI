import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Datatable from "../../../components/UI/Datatable";
import StudentContext from "../../../context/StudentContext";

const tableColumns = [
  {
    field: "academicYear",
    headerName: "Year",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "grade",
    headerName: "Grade",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "section",
    headerName: "Section",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "totalMark",
    headerName: "Total Mark",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "average",
    headerName: "Average",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    minWidth: 150,
  },
];

const EnrollementHistory = () => {
  const [history, setHistory] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const {
    fetchStudentById,
    fetchStudentEnrollment,
    studentById,
    studentEnrollment,
  } = useContext(StudentContext);

  useEffect(() => {
    fetchStudentById();
    fetchStudentEnrollment();
  }, []);

  const tableRows = Array.isArray(history) ? history : [history];

  return (
    <Box className="flex flex-col lg:flex-row gap-8 p-4">
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
            { label: "ID Number", value: "01/23/2015" },
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
      <Box className="shadow-md w-full lg:w-2/3 bg-white rounded-md p-4">
        <Box className="text-lg font-bold mb-4">Enrollment History</Box>
        <Datatable
          tableColumns={tableColumns}
          key={history._id}
          tableRows={tableRows}
          setSelectedRows={setSelectedRows}
          getRowId={(row) => row._id}
        />
      </Box>
    </Box>
  );
};

export default EnrollementHistory;
