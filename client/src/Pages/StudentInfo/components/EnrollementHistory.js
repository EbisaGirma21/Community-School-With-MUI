import { Box } from "@mui/material";
import React, { useState } from "react";
import Datatable from "../../../components/UI/Datatable";

// history Basic information datatable Column
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
  const [history, SetHistory] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  // convert history object to array if necessary
  const tableRows = Array.isArray(history) ? history : [history];

  return (
    <Box className="flex gap-10 ">
      <Box className="shadow-md w-full lg:w-1/4">
        <Box>Current Enrollement</Box>
        <Box className="">
          <img
            src={require("../../../assets/student.jpg")}
            alt={"W"}
            loading="Wolkite"
            className=""
          />
        </Box>
        <Box>
          <Box className="flex flex-col w-full p-2">
            <Box className="flex justify-between w-full hover:bg-slate-100 hover:cursor-pointer p-2">
              <Box>Name</Box>
              <Box>Ebisa Girma</Box>
            </Box>
            <Box className=" flex justify-between w-full hover:bg-slate-100 hover:cursor-pointer p-2">
              <Box>Family</Box>
              <Box>Girma Garedo</Box>
            </Box>
            <Box className=" flex justify-between w-full hover:bg-slate-100 hover:cursor-pointer p-2">
              <Box>ID Number</Box>
              <Box>01/23/2015</Box>
            </Box>
            <Box className=" flex justify-between w-full hover:bg-slate-100 hover:cursor-pointer p-2">
              <Box>Year</Box>
              <Box>2015</Box>
            </Box>
            <Box className=" flex justify-between w-full hover:bg-slate-100 hover:cursor-pointer p-2">
              <Box>Grade</Box>
              <Box>KG-1</Box>
            </Box>
            <Box className=" flex justify-between w-full hover:bg-slate-100 hover:cursor-pointer p-2">
              <Box>Section</Box>
              <Box>A</Box>
            </Box>
            <Box className=" flex justify-between w-full hover:bg-slate-100 hover:cursor-pointer p-2">
              <Box>Roll No</Box>
              <Box>1</Box>
            </Box>
            <Box className=" flex justify-between w-full hover:bg-slate-100 hover:cursor-pointer p-2">
              <Box> Current Status</Box>
              <Box>Pass</Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className="shadow-md w-3/4 flex flex-col p-4 gap-4">
        <Box className="w-20 h-20 ">
          <img
            src={require("../../../assets/student.jpg")}
            alt={"W"}
            loading="Wolkite"
            className="rounded-full object-cover"
          />
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

export default EnrollementHistory;
