import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import Datatable from "../../../components/UI/Datatable";
import Dropdown from "../../../components/UI/Dropdown";

// history Basic information datatable Column
const tableColumns = [
  {
    field: "subject",
    headerName: "Subject",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "quiz",
    headerName: "Quiz",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "test",
    headerName: "Test",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "assignment",
    headerName: "Assignment",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "midExam",
    headerName: "Mid-Exam",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "finalExam",
    headerName: "Final Exam",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "total",
    headerName: "Total",
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

const semesterOption = [
  { label: "Semister-I", value: "1" },
  { label: "Semester-II", value: "2" },
];

const MyAssessment = () => {
  const [history, SetHistory] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [semester, setSemester] = useState("");

  // convert history object to array if necessary
  const tableRows = Array.isArray(history) ? history : [history];

  return (
    <Box className="flex gap-10 ">
      <Box className="shadow-md w-full flex flex-col p-4 gap-4">
        <Box className="w-full h-20  flex items-center gap-4">
          <img
            src={require("../../../assets/student.jpg")}
            alt={"W"}
            loading="Wolkite"
            className="rounded-full object-cover w-20 h-20"
          />
          <Box className="flex w-full gap-4">
            <Box className="flex-1 items-center">
              <Dropdown
                label="Classification"
                options={semesterOption}
                value={semester}
                onChange={(e) => {
                  setSemester(e.target.value);
                }}
                width={"100%"}
              />
            </Box>
            <Box className="flex items-center">
              <Box className="p-2 "> Total Number Subject </Box>
              <Box className="pl-10 pr-10 border-2 border-gray-100 p-2">5</Box>
            </Box>
            <Box className="flex items-center">
              <Box className="p-2 "> Total Mark </Box>
              <Box className="pl-10 pr-10 border-2 border-gray-100 p-2">
                455
              </Box>
            </Box>
            <Box className="flex items-center">
              <Box className="p-2"> Average Mark </Box>
              <Box className="pl-10 pr-10 border-2 border-gray-100 p-2">
                93.4
              </Box>
            </Box>
            <Box className="flex items-center">
              <Box className="p-2"> Rank </Box>
              <Box className="pl-10 pr-10 border-2 border-gray-100 p-2">4</Box>
            </Box>
          </Box>
        </Box>
        <Box>
          <Datatable
            tableColumns={tableColumns}
            key={history._id}
            tableRows={tableRows}
            setSelectedRows={setSelectedRows}
            getRowId={(row) => row._id}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default MyAssessment;
