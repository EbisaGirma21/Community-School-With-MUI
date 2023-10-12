import React, { useContext, useEffect, useState } from "react";
import MarkContext from "../../../context/MarkContext";
import SubjectContext from "../../../context/SubjectContext";
import { Box, Button } from "@mui/material";
import Dropdown from "../../../components/UI/Dropdown";
import { DataGrid } from "@mui/x-data-grid";
import RequestContext from "../../../context/RequestContext";
import { toast } from "react-toastify";

const MarkListTable = ({
  curriculumId,
  gradeId,
  sectionId,
  semesterId,
  currentStatus,
}) => {
  // useStattes
  const [subjectId, setSubjectId] = useState("");
  const [subjectColumns, setSubjectColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [editedStatus, setEditedStatus] = useState(0);

  // Component contexts
  const { markList, fetchMarkLists, fetchAverageMarkLists, addSubjectMarks } =
    useContext(MarkContext);
  const { subject, fetchSubjects } = useContext(SubjectContext);
  const { request, fetchRequests } = useContext(RequestContext);
  // Update of prevsemetser check in request
  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [semesterId]);

  // Update local mark state when context mark changes
  useEffect(() => {
    subjectId &&
      semesterId !== "average" &&
      fetchMarkLists(gradeId, sectionId, subjectId, semesterId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjectId, editedStatus, semesterId]);

  // Update local average state when context average changes
  useEffect(() => {
    subjectId && semesterId === "average" && fetchAverageMarkLists(gradeId,sectionId,subjectId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjectId, editedStatus, semesterId]);

  // section option
  const subjectOption = !sectionId
    ? [{ label: "Not found", value: 1 }]
    : subject.map((sub) => ({
        label: sub.moduleTitle,
        value: sub._id,
      }));

  const assessment = subject
    .filter((sub) => {
      return sub._id === subjectId;
    })
    .map((sub) => sub.assessments);
  useEffect(() => {
    const fetchSubjectColumns = async () => {
      if (assessment.length > 0) {
        const columns = Object.keys(assessment[0]).map((key) => ({
          field: key,
          headerName: key,
          type: "number",
          editable:
            currentStatus === "ONP"
              ? semesterId !== "average"
                ? true
                : false
              : false,
          align: "left",
          headerAlign: "left",
          flex: 1,
          minWidth: 150,
        }));
        setSubjectColumns(columns);
      }
    };

    fetchSubjectColumns();
  }, [assessment]);

  useEffect(() => {
    const fetchSubjectData = async () => {
      if (curriculumId && gradeId) {
        await fetchSubjects(curriculumId, gradeId);
      }
    };

    fetchSubjectData();
  }, [curriculumId, gradeId]);

  // Create table columns including subject columns
  const tableColumns = [
    // { field: "rollNumber", headerName: "Roll Number", flex: 1, minWidth: 150 },
    { field: "firstName", headerName: "First Name", flex: 1, minWidth: 150 },
    { field: "middleName", headerName: "Middle Name", flex: 1, minWidth: 150 },
    { field: "gender", headerName: "Gender", flex: 1, minWidth: 150 },
    ...subjectColumns,
    { field: "totalMark", headerName: "Total", flex: 1, minWidth: 150 },
  ];

  // Convert mark object to array if necessary
  const tableRows = subjectId
    ? Array.isArray(markList)
      ? markList
      : [markList]
    : [];

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    // Check if the newRow already exists in the rows array
    const existingIndex = rows.findIndex((row) => row._id === newRow._id);

    if (existingIndex !== -1) {
      // If it exists, replace the old row with the updated row
      const updatedRows = [...rows];
      updatedRows[existingIndex] = { ...newRow };
      setRows(updatedRows);
    } else {
      // If it doesn't exist, add the newRow to the array
      const updatedRows = [...rows, { ...newRow }];
      setRows(updatedRows);
    }

    return updatedRow;
  };

  // Function to handle Save Changes button click
  const handleSaveChanges = (e) => {
    e.preventDefault();
    if (subjectId) {
      addSubjectMarks(rows, subjectId, semesterId, gradeId, sectionId);
      setEditedStatus(editedStatus + 1);
      setRows([]);
    } else {
      toast.warning("No selected subject");
    }
  };


  return (
    <Box>
      <Box className="border-2 border-gray-200 p-2 rounded-md m-1 flex justify-between">
        <Box className="w-1/6">
          <Dropdown
            label="Subject"
            options={subjectOption}
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
            width={"50%"}
          />
        </Box>
        <Button
          variant="contained"
          disabled={semesterId === "average" ? true : false}
          onClick={(e) => handleSaveChanges(e)}
        >
          Save Changes
        </Button>
      </Box>
      <Box style={{ height: 500, m: 1 }}>
        <DataGrid
          rows={tableRows}
          columns={tableColumns}
          getRowId={(row) => row._id || markList.indexOf(row)}
          key={markList._id}
          onRowClick={() => {
            if (semesterId === "average") {
              return null;
            } else if (currentStatus === "REG") {
              return toast.warning("The previous semester not ended");
            } else if (currentStatus === "CMP") {
              return toast.warning("The semester is already ended");
            } else {
              return null;
            }
          }}
          processRowUpdate={processRowUpdate}
        />
      </Box>

      {/* {content} */}
    </Box>
  );
};

export default MarkListTable;
