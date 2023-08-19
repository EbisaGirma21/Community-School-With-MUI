import React, { useContext, useEffect, useState } from "react";
import Datatable from "../../../components/UI/Datatable";
import TeacherDelete from "./TeacherDelete";
import TeacherUpdate from "./TeacherUpdate";
import TeacherContext from "../../../context/TeacherContext";

// Teacher Basic information datatable Column
const tableColumns = [
  { field: "firstName", headerName: "First Name", flex: 1, minWidth: 150 },
  { field: "middleName", headerName: "Middle Name", flex: 1, minWidth: 150 },
  { field: "lastName", headerName: "Last Name", flex: 1, minWidth: 150 },
  { field: "gender", headerName: "Gender", flex: 1, minWidth: 150 },
  { field: "email", headerName: "Email", flex: 1, minWidth: 150 },
  { field: "phoneNumber", headerName: "Phone Number", flex: 1, minWidth: 150 },
  { field: "address", headerName: "Address", flex: 1, minWidth: 150 },
];

const TeacherTable = () => {
  // component states
  const [deleteOpen, setdDeleteOpen] = useState(false);
  const [editOpen, setdEditOpen] = useState(false);
  const [teacherId, setTeacherId] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  // component context
  const { teachers, fetchTeachers } = useContext(TeacherContext);

  // update local teacher state when context teacher changes
  useEffect(() => {
    fetchTeachers();
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
    setTeacherId("");
  };

  // delete handler
  const handleDelete = (id) => {
    handleDeleteOpen();
    setTeacherId(id);
  };

  // funtions open edit modal
  const handleEditOpen = () => {
    setdEditOpen(true);
  };

  // funtion close Edit modal
  const handleEditClose = () => {
    setdEditOpen(false);
    setTeacherId("");
  };

  // edit handler
  const handleEdit = (id) => {
    handleEditOpen();
    setTeacherId(id);
  };

  // convert teacher object to array if necessary
  const tableRows = Array.isArray(teachers) ? teachers : [teachers];

  // toggle delete modal
  let content = "";
  if (deleteOpen) {
    content = (
      <TeacherDelete
        open={deleteOpen}
        handleClose={handleDeleteClose}
        teacherId={teacherId}
      />
    );
  }
  if (editOpen) {
    content = (
      <TeacherUpdate
        open={editOpen}
        handleClose={handleEditClose}
        teacherId={teacherId}
      />
    );
  }

  return (
    <div>
      <Datatable
        onDelete={handleDelete}
        onEdit={handleEdit}
        tableColumns={tableColumns}
        key={teachers._id}
        tableRows={tableRows}
        setSelectedRows={setSelectedRows}
        getRowId={(row) => row._id || teachers.indexOf(row)}
      />
      {content}
    </div>
  );
};

export default TeacherTable;
