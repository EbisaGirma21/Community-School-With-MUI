import React, { useContext, useEffect, useState } from "react";
import Datatable from "../../../components/UI/Datatable";
import { Box } from "@mui/material";
import AssessmentWeightContext from "../../../context/AssessmentWeightContext";

// Subject Basic information datatable Column
const tableColumns = [
  { field: "moduleTitle", headerName: "Subject", flex: 1, minWidth: 150 },
  { field: "quiz", headerName: "Quiz", flex: 1, minWidth: 150 },
  { field: "test", headerName: "Test", flex: 1, minWidth: 150 },
  { field: "assignment", headerName: "Assignment", flex: 1, minWidth: 150 },
  { field: "midExam", headerName: "Mid-Exam", flex: 1, minWidth: 150 },
  { field: "finalExam", headerName: "Final-Exam", flex: 1, minWidth: 150 },
];

const AssignWeightTable = ({ curriculumId, gradeId, setSelectedRows }) => {
  // Subject Information input form

  const { assessmentWeight, fetchAssessmentWeights } = useContext(
    AssessmentWeightContext
  );

  // update local subject state when context subject changes
  useEffect(() => {
    gradeId && fetchAssessmentWeights(curriculumId, gradeId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gradeId]);

  // convert subject object to array if necessary
  const tableRows = gradeId
    ? Array.isArray(assessmentWeight)
      ? assessmentWeight
      : [assessmentWeight]
    : [];

  return (
    <Box sx={{}}>
      <Box
        sx={{
          borderRadius: 1,
          width: "100%",
        }}
      ></Box>

      <Datatable
        onEdit={() => null}
        tableColumns={tableColumns}
        key={assessmentWeight._id}
        tableRows={tableRows}
        setSelectedRows={setSelectedRows}
        getRowId={(row) => row._id || assessmentWeight.indexOf(row)}
      />
    </Box>
  );
};

export default AssignWeightTable;
