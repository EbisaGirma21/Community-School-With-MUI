import React, { useContext, useEffect, useState } from "react";
import Datatable from "../../../components/UI/Datatable";
import TeacherDelete from "./TeacherDelete";
import TeacherUpdate from "./TeacherUpdate";
import TeacherContext from "../../../context/TeacherContext";

// Teacher Basic information datatable Column
const tableColumns = [
  { field: "firstName", headerName: "First Name", width: 150 },
  { field: "middleName", headerName: "Middle Name", width: 150 },
  { field: "lastName", headerName: "Last Name", width: 150 },
  { field: "gender", headerName: "Gender", width: 150 },
  { field: "email", headerName: "Email", width: 190 },
];

const TeacherTable = () => {
  // component states
  const [deleteOpen, setdDeleteOpen] = useState(false);
  const [editOpen, setdEditOpen] = useState(false);
  const [teacherId, setTeacherId] = useState("");

  // component context
  const { teacher, fetchTeachers } = useContext(TeacherContext);

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
  const tableRows = Array.isArray(teacher) ? teacher : [teacher];

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
        key={teacher._id}
        tableRows={tableRows}
        getRowId={(row) => row._id || teacher.indexOf(row)}
      />
      {content}
    </div>
  );
};

export default TeacherTable;
