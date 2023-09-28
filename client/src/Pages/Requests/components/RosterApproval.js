import React, { useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import RequestContext from "../../../context/RequestContext";

const RosterApproval = () => {
  const [selectedRows, setSelectedRows] = useState([]);

  const { request, fetchRequests } = useContext(RequestContext);

  const tableColumns = [
    {
      field: "requestedAcademicCurriculum",
      headerName: "Academic Curriculum",
      flex: 1,
      minWidth: 150,
    },
    { field: "requestedGrade", headerName: "Grade", flex: 1, minWidth: 150 },
    {
      field: "requestedSection",
      headerName: "Section",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "requestedSemester",
      headerName: "Semester",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 150,
    },
  ];

  // update local request state when context request changes
  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // convert department object to array if necessary
  const tableRows = Array.isArray(request) ? request : [request];
  return (
    <Box>
      {/* <Box className="border-2 border-gray-200 p-2 rounded-md m-1 flex justify-between"></Box> */}
      <Box style={{ height: 500, m: 1 }}>
        <DataGrid
          columns={tableColumns}
          key={request._id}
          rows={tableRows}
          setSelectedRows={setSelectedRows}
          getRowId={(row) => row._id || request.indexOf(row)}
        />
      </Box>
    </Box>
  );
};

export default RosterApproval;
