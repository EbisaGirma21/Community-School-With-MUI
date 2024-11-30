import React, { useContext, useEffect, useState } from "react";
import MarkContext from "../../../context/MarkContext";
import SubjectContext from "../../../context/SubjectContext";
import { Box, Button, filledInputClasses } from "@mui/material";
import Dropdown from "../../../components/UI/Dropdown";
import { DataGrid } from "@mui/x-data-grid";
import RequestContext from "../../../context/RequestContext";
import { toast } from "react-toastify";
import MarkListChecker from "./MarkListChecker";
import AcademicSessionContext from "../../../context/AcademicSessionContext";
import AcademicCurriculumContext from "../../../context/AcademicCurriculumContext";

const MarkListTable = ({
  acCurriculumId,
  curriculumId,
  gradeId,
  sectionId,
  semesterId,
  currentStatus,
  subjectIds,
  classStartDate,
  classEndDate,
}) => {
  // getting user from local storage
  const user = JSON.parse(localStorage.getItem("user"));

  // useStattes
  const [subjectId, setSubjectId] = useState("");
  const [subjectColumns, setSubjectColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [editedStatus, setEditedStatus] = useState(0);
  const [approveOpen, setApproveOpen] = useState(false);
  const currentDate = new Date();

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
    subjectId &&
      semesterId === "average" &&
      fetchAverageMarkLists(gradeId, sectionId, subjectId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjectId, editedStatus, semesterId]);

  // filtering the authorized subject

  // Check if subjectIds is defined and an array before using it
  const filteredSubject =
    sectionId && subjectIds.length !== 0
      ? subject.filter((sub) => {
          return subjectIds.includes(sub._id);
        })
      : [];

  // subject option creating depend on the role
  const subjectOption = !sectionId
    ? [{ label: "Not found", value: 1 }]
    : !user.role.includes("director")
    ? filteredSubject.map((sub) => ({
        label: sub.moduleTitle,
        value: sub._id,
      }))
    : subject.map((sub) => ({
        label: sub.moduleTitle,
        value: sub._id,
      }));

  // assessment mappin depend on tyhe requirement
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
          editable: user.role.includes("subjectTeach")
            ? currentStatus === "ONP"
              ? semesterId !== "average"
                ? true
                : false
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
    if (rows.length === 0) {
      toast.warning("No change on mark");
    } else if (subjectId) {
      addSubjectMarks(rows, subjectId, semesterId, gradeId, sectionId);
      setEditedStatus(editedStatus + 1);
      setRows([]);
    } else {
      toast.warning("No selected subject");
    }
  };

  // toggler funcions
  // funtions open approval modal
  const handleApproveOpen = () => {
    if (semesterId.length === 0) {
      toast.warning("No selected semester");
    } else if (currentStatus === "REG") {
      toast.warning("Previous semester not ended");
    } else if (currentStatus === "ONP") {
      toast.warning("The semester is on progress");
    } else if (currentStatus === "CMP") {
      setApproveOpen(true);
    }
  };

  const handleRemarkRequestClick = () => {
    handleApproveOpen();
  };

  // funtion close approve modal
  const handleApproveClose = () => {
    setApproveOpen(false);
  };

  // toggle delete modal
  let content = "";
  if (approveOpen) {
    content = (
      <MarkListChecker
        open={approveOpen}
        handleClose={handleApproveClose}
        acCurriculumId={acCurriculumId}
        semesterId={semesterId}
        curriculumId={curriculumId}
        gradeId={gradeId}
        sectionId={sectionId}
        currentStatus={currentStatus}
      />
    );
  }

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
        <Box className="flex justify-between gap-2">
          <Button
            style={{
              background: "#673AB7",
              ":hover": { background: "#713AB7" },
            }}
            variant="contained"
            disabled={semesterId === "average" ? true : false}
            onClick={(e) => handleSaveChanges(e)}
          >
            Save Changes
          </Button>
          <Button
            variant="contained"
            disabled={semesterId === "average" ? true : false}
            onClick={handleRemarkRequestClick}
          >
            Remark Request
          </Button>
        </Box>
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
            } else if (currentDate < classStartDate) {
              return toast.warning("Class not started yet");
            } else if (currentDate > classEndDate) {
              return toast.warning("Class already ended");
            } else {
              return null;
            }
          }}
          processRowUpdate={processRowUpdate}
        />
      </Box>

      {content}
    </Box>
  );
};

export default MarkListTable;
