import React, { useContext, useEffect, useState } from "react";
import Datatable from "../../../components/UI/Datatable";
import NewStudentDelete from "./NewStudentDelete";
import NewStudentUpdate from "./NewStudentUpdate";
import NewStudentContext from "../../../context/NewStudentContext";

// NewStudent Basic information datatable Column
const tableColumns = [
  { field: "firstName", headerName: "First Name", flex: 1, minWidth: 150 },
  { field: "middleName", headerName: "Middle Name", flex: 1, minWidth: 150 },
  { field: "lastName", headerName: "Last Name", flex: 1, minWidth: 150 },
  { field: "gender", headerName: "Gender", flex: 1, minWidth: 150 },
  { field: "email", headerName: "Email", flex: 1, minWidth: 150 },
  { field: "studentBirthDate", headerName: "Birth Date", flex: 1, minWidth: 150 },
];

const NewStudentTable = () => {
  // component states
  const [deleteOpen, setdDeleteOpen] = useState(false);
  const [editOpen, setdEditOpen] = useState(false);
  const [newStudentId, setNewStudentId] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  // component context
  const { newStudent, fetchNewStudents } = useContext(NewStudentContext);

  // update local newStudent state when context newStudent changes
  useEffect(() => {
    fetchNewStudents();
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
    setNewStudentId("");
  };

  // delete handler
  const handleDelete = (id) => {
    handleDeleteOpen();
    setNewStudentId(id);
  };

  // funtions open edit modal
  const handleEditOpen = () => {
    setdEditOpen(true);
  };

  // funtion close Edit modal
  const handleEditClose = () => {
    setdEditOpen(false);
    setNewStudentId("");
  };

  // edit handler
  const handleEdit = (id) => {
    handleEditOpen();
    setNewStudentId(id);
  };

  // convert newStudent object to array if necessary
  const tableRows = Array.isArray(newStudent) ? newStudent : [newStudent];

  // toggle delete modal
  let content = "";
  if (deleteOpen) {
    content = (
      <NewStudentDelete
        open={deleteOpen}
        handleClose={handleDeleteClose}
        newStudentId={newStudentId}
      />
    );
  }
  if (editOpen) {
    content = (
      <NewStudentUpdate
        open={editOpen}
        handleClose={handleEditClose}
        newStudentId={newStudentId}
      />
    );
  }

  return (
    <div>
      <Datatable
        onDelete={handleDelete}
        onEdit={handleEdit}
        tableColumns={tableColumns}
        key={newStudent._id}
        tableRows={tableRows}
        setSelectedRows={setSelectedRows}
        getRowId={(row) => row._id || newStudent.indexOf(row)}
      />
      {content}
    </div>
  );
};

export default NewStudentTable;
