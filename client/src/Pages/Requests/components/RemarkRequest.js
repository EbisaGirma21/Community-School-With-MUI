import React, { useContext, useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import RequestContext from "../../../context/RequestContext";
import RemarkRequestDialog from "./RemarkRequestDialog";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";

const RemarkRequest = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [approveOpen, setApproveOpen] = useState(false);
  const [semesterId, setSemesterId] = useState("");

  const { request, fetchRequests } = useContext(RequestContext);

  const tableColumns = [
    {
      field: "acCurriculum",
      headerName: "Academic Curriculum",
      flex: 1,
      minWidth: 150,
    },
    { field: "grade", headerName: "Grade", flex: 1, minWidth: 150 },
    {
      field: "section",
      headerName: "Section",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "semester",
      headerName: "Semester",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => (
        <>
          <div>
            <GridActionsCellItem
              icon={
                params.row.requestStatus === "approved" ? (
                  <CheckCircleOutlineIcon className=" text-green-500  " />
                ) : (
                  <PanoramaFishEyeIcon className="text-red-500" />
                )
              }
              label="Approve"
              onClick={() => handleApprove(params.id)}
            />
          </div>
        </>
      ),
    },
  ];

  // update local request state when context request changes
  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // toggler funcions
  // funtions open approval modal
  const handleApprove = (id) => {
    setApproveOpen(true);
    setSemesterId(id);
  };

  // funtion close approve modal
  const handleApproveClose = () => {
    setApproveOpen(false);
  };

  // toggle delete modal
  let content = "";
  if (approveOpen) {
    content = (
      <RemarkRequestDialog
        open={approveOpen}
        handleClose={handleApproveClose}
        semesterId={semesterId}
      />
    );
  }

  const remarkRequest = request.filter((reque) => {
    return reque.requestType === "remarkRequest";
  });
  // convert department object to array if necessary
  const tableRows = Array.isArray(remarkRequest)
    ? remarkRequest
    : [remarkRequest];
  return (
    <Box>
      {/* <Box className="border-2 border-gray-200 p-2 rounded-md m-1 flex justify-between"></Box> */}
      <Box style={{ height: 500, m: 1 }}>
        <DataGrid
          columns={tableColumns}
          key={remarkRequest._id}
          rows={tableRows}
          setSelectedRows={setSelectedRows}
          getRowId={(row) => row._id || remarkRequest.indexOf(row)}
        />
      </Box>
      {content}
    </Box>
  );
};

export default RemarkRequest;
