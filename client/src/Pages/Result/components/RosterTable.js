import React, { useContext, useEffect, useState } from "react";
import Table from "../../../components/UI/Table";
import MarkContext from "../../../context/MarkContext";
import SubjectContext from "../../../context/SubjectContext";
import { Box, Button } from "@mui/material";
import RosterChecker from "./RosterChecker";
import { toast } from "react-toastify";
import RequestContext from "../../../context/RequestContext";

const RosterTable = ({
  acCurriculumId,
  semesterId,
  curriculumId,
  gradeId,
  sectionId,
  currentStatus,
}) => {
  const [subjectColumns, setSubjectColumns] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [approveOpen, setApproveOpen] = useState(false);

  // Component contexts
  const { mark, fetchMarks, fetchAverageMarks } = useContext(MarkContext);
  const { subject, fetchSubjects } = useContext(SubjectContext);
  const { request, fetchRequests } = useContext(RequestContext);

  // Update of prevsemetser check in request
  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [semesterId]);

  // Update local mark state when context mark changes
  useEffect(() => {
    sectionId &&
      semesterId !== "average" &&
      fetchMarks(gradeId, sectionId, semesterId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionId, semesterId]);

  // Update local mark state when context mark changes
  useEffect(() => {
    sectionId &&
      semesterId === "average" &&
      fetchAverageMarks(gradeId, sectionId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionId, semesterId]);

  useEffect(() => {
    const fetchSubjectColumns = async () => {
      if (subject.length > 0) {
        const columns = subject.map((sub) => ({
          field: sub._id,
          headerName: sub.moduleTitle,
          flex: 1,
          minWidth: 100,
        }));
        setSubjectColumns(columns);
      }
    };

    fetchSubjectColumns();
  }, [subject]);

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
    { field: "gender", headerName: "Gender", flex: 1, minWidth: 100 },
    ...subjectColumns,
    { field: "totalMark", headerName: "Total", flex: 1, minWidth: 100 },
    { field: "average", headerName: "Average", flex: 1, minWidth: 100 },
    { field: "rank", headerName: "Rank", flex: 1, minWidth: 100 },
    { field: "status", headerName: "Status", flex: 1, minWidth: 100 },
  ];

  // Convert mark object to array if necessary
  const tableRows = Array.isArray(mark) ? mark : [mark];

  // toggler funcions
  // funtions open approval modal
  const handleApproveOpen = () => {
    if (semesterId.length === 0) {
      toast.warning("No selected semester");
    } else if (semesterId === "average") {
      setApproveOpen(true);
    } else if (currentStatus === "REG") {
      toast.warning("Previous semester not ended");
    } else if (currentStatus === "CMP") {
      toast.warning("The semester is already approved");
    } else {
      setApproveOpen(true);
    }
  };

  // funtion close approve modal
  const handleApproveClose = () => {
    setApproveOpen(false);
  };

  const handleRosterApprovalClick = () => {
    handleApproveOpen();
  };

  // toggle delete modal
  let content = "";
  if (approveOpen) {
    content = (
      <RosterChecker
        open={approveOpen}
        handleClose={handleApproveClose}
        acCurriculumId={acCurriculumId}
        semesterId={semesterId}
        curriculumId={curriculumId}
        gradeId={gradeId}
        sectionId={sectionId}
        currentStatus={currentStatus}
        mark={mark}
      />
    );
  }

  return (
    <Box>
      <Box
        className="border-2 border-gray-200 p-2 h-16 rounded-md m-1 flex justify-end"
        // sx={{ display: user.role !== "teacher" ? "none" : "flex" }}
      >
        <Button variant="contained" onClick={handleRosterApprovalClick}>
          {semesterId === "average" ? "Enroll to next" : "Request Approval"}
        </Button>
      </Box>
      <Table
        tableColumns={tableColumns}
        key={mark._id}
        tableRows={tableRows}
        setSelectedRows={setSelectedRows}
        getRowId={(row) => row._id || mark.indexOf(row)}
      />
      {content}
    </Box>
  );
};

export default RosterTable;
