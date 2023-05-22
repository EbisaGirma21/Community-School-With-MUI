import React, { useContext, useEffect, useState } from "react";
import Datatable from "../../../components/UI/Datatable";

// AcademicSession Basic information datatable Column
const tableColumns = [
  { field: "firstName", headerName: "First Name", width: 150 },
  { field: "middleName", headerName: "Middle Name", width: 150 },
  { field: "lastName", headerName: "Last Name", width: 150 },
  { field: "gender", headerName: "First Name", width: 150 },
  { field: "birthDate", headerName: "Birth Date", width: 150 },
];

const NewStudentTable = () => {
  // component states
  const [deleteOpen, setdDeleteOpen] = useState(false);
  const [editOpen, setdEditOpen] = useState(false);



  // toggler funcions
  // funtions open delete modal
  const handleDeleteOpen = () => {
    setdDeleteOpen(true);
  };

  // funtion close delete modal
  const handleDeleteClose = () => {
    setdDeleteOpen(false);
  };

  // delete handler
  const handleDelete = (id) => {
    handleDeleteOpen();
  };

  // funtions open edit modal
  const handleEditOpen = () => {
    setdEditOpen(true);
  };

  // funtion close Edit modal
  const handleEditClose = () => {
    setdEditOpen(false);
  };

  // edit handler
  const handleEdit = (id) => {
    handleEditOpen();
  };

  // convert academicSession object to array if necessary
  const tableRows = [];

  // toggle delete modal
  let content = "";
//   if (deleteOpen) {
//     content = (
//       <AcademicSessionDelete
//         open={deleteOpen}
//         handleClose={handleDeleteClose}
//         academicSessionId={academicSessionId}
//       />
//     );
//   }
//   if (editOpen) {
//     content = (
//       <AcademicSessionUpdate
//         open={editOpen}
//         handleClose={handleEditClose}
//         academicSessionId={academicSessionId}
//       />
//     );
//   }

  return (
    <div>
      <Datatable
        onDelete={handleDelete}
        onEdit={handleEdit}
        tableColumns={tableColumns}
        // key={academicSession._id}
        tableRows={tableRows}
        // getRowId={(row) => row._id || academicSession.indexOf(row)}
      />
      {content}
    </div>
  );
};

export default NewStudentTable;
