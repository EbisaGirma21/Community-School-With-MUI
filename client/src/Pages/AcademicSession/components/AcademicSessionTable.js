import React, { useContext, useEffect, useState } from "react";
import Datatable from "../../../components/UI/Datatable";
import AcademicSessionDelete from "./AcademicSessionDelete";
import AcademicSessionUpdate from "./AcademicSessionUpdate";
import AcademicSessionContext from "../../../context/AcademicSessionContext";

// AcademicSession Basic information datatable Column
const tableColumns = [
  { field: "academicYear", headerName: "Academic Year", flex: 1, minWidth: 150  },
];

const AcademicSessionTable = () => {
  // component states
  const [deleteOpen, setdDeleteOpen] = useState(false);
  const [editOpen, setdEditOpen] = useState(false);
  const [academicSessionId, setAcademicSessionId] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  // component context
  const { academicSession, fetchAcademicSessions } = useContext(
    AcademicSessionContext
  );

  // update local academicSession state when context academicSession changes
  useEffect(() => {
    fetchAcademicSessions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // toggler funcions
  // funtions open delete modal
  const handleDeleteOpen = () => {
    setdDeleteOpen(true);
  };

  // funtion close delete modal
  const handleDeleteClose = () => {
    setdDeleteOpen(false);
    setAcademicSessionId("");
  };

  // delete handler
  const handleDelete = (id) => {
    handleDeleteOpen();
    setAcademicSessionId(id);
  };

  // funtions open edit modal
  const handleEditOpen = () => {
    setdEditOpen(true);
  };

  // funtion close Edit modal
  const handleEditClose = () => {
    setdEditOpen(false);
    setAcademicSessionId("");
  };

  // edit handler
  const handleEdit = (id) => {
    handleEditOpen();
    setAcademicSessionId(id);
  };
 
  // convert academicSession object to array if necessary
  const tableRows = Array.isArray(academicSession)
    ? academicSession
    : [academicSession];

  // toggle delete modal
  let content = "";
  if (deleteOpen) {
    content = (
      <AcademicSessionDelete
        open={deleteOpen}
        handleClose={handleDeleteClose}
        academicSessionId={academicSessionId}
      />
    );
  }
  if (editOpen) {
    content = (
      <AcademicSessionUpdate
        open={editOpen}
        handleClose={handleEditClose}
        academicSessionId={academicSessionId}
      />
    );
  }

  return (
    <div>
      <Datatable
        onDelete={handleDelete}
        onEdit={handleEdit}
        tableColumns={tableColumns}
        key={academicSession._id}
        tableRows={tableRows}
        setSelectedRows={setSelectedRows}
        getRowId={(row) => row._id || academicSession.indexOf(row)}
      />
      {content}
    </div>
  );
};

export default AcademicSessionTable;
