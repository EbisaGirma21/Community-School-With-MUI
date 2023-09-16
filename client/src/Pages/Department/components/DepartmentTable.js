import React, { useContext, useEffect, useState } from "react";
import Datatable from "../../../components/UI/Datatable";
import DepartmentDelete from "./DepartmentDelete";
import DepartmentUpdate from "./DepartmentUpdate";
import DepartmentContext from "../../../context/DepartmentContext";

// Department Basic information datatable Column
const tableColumns = [
  { field: "departmentName", headerName: "Name", flex: 1, minWidth: 150 },
  {
    field: "coordinatorTeacher",
    headerName: "Deparment Leader",
    flex: 1,
    minWidth: 150,
  },
  { field: "members", headerName: "Members", flex: 1, minWidth: 150 },
];

const DepartmentTable = () => {
  // component states
  const [deleteOpen, setdDeleteOpen] = useState(false);
  const [editOpen, setdEditOpen] = useState(false);
  const [departmentId, setDepartmentId] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  // component context
  const { department, fetchDepartments } = useContext(DepartmentContext);

  // update local department state when context department changes
  useEffect(() => {
    fetchDepartments();
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
    setDepartmentId("");
  };

  // delete handler
  const handleDelete = (id) => {
    handleDeleteOpen();
    setDepartmentId(id);
  };

  // funtions open edit modal
  const handleEditOpen = () => {
    setdEditOpen(true);
  };

  // funtion close Edit modal
  const handleEditClose = () => {
    setdEditOpen(false);
    setDepartmentId("");
  };

  // edit handler
  const handleEdit = (id) => {
    handleEditOpen();
    setDepartmentId(id);
  };

  // convert department object to array if necessary
  const tableRows = Array.isArray(department) ? department : [department];

  // toggle delete modal
  let content = "";
  if (deleteOpen) {
    content = (
      <DepartmentDelete
        open={deleteOpen}
        handleClose={handleDeleteClose}
        departmentId={departmentId}
      />
    );
  }
  if (editOpen) {
    content = (
      <DepartmentUpdate
        open={editOpen}
        handleClose={handleEditClose}
        departmentId={departmentId}
      />
    );
  }

  return (
    <div>
      <Datatable
        onDelete={handleDelete}
        onEdit={handleEdit}
        tableColumns={tableColumns}
        key={department._id}
        tableRows={tableRows}
        setSelectedRows={setSelectedRows}
        getRowId={(row) => row._id || department.indexOf(row)}
      />
      {content}
    </div>
  );
};

export default DepartmentTable;
