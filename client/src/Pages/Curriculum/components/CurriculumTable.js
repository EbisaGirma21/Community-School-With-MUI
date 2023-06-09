import React, { useContext, useEffect, useState } from "react";
import CurriculumContext from "../../../context/CurriculumContext";
import Datatable from "../../../components/UI/Datatable";
import CurriculumDelete from "./CurriculumDelete";
import CurriculumUpdate from "./CurriculumUpdate";

// Curriculum Basic information datatable Column
const tableColumns = [
  { field: "curriculumTitle", headerName: "Title", flex: 1, minWidth: 150 },
  {
    field: "curriculumYear",
    headerName: "Curriculum Year",
    flex: 1,
    minWidth: 150,
  },
  { field: "stage", headerName: "Curriculum Stage", flex: 1, minWidth: 150 },
  {
    field: "classification",
    headerName: "Classification",
    flex: 1,
    minWidth: 150,
  },
  { field: "totalMaximumLoad", headerName: "Max Load", flex: 1, minWidth: 150 },
  { field: "subjectCount", headerName: "Subjects", flex: 1, minWidth: 150 },
  { field: "curriculum_state", headerName: "Status", flex: 1, minWidth: 150 },
];

const CurriculumTable = () => {
  // component states
  const [deleteOpen, setdDeleteOpen] = useState(false);
  const [editOpen, setdEditOpen] = useState(false);
  const [curriculumId, setCurriculumId] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  // component context
  const { curriculum, fetchCurriculums } = useContext(CurriculumContext);

  // update local curriculum state when context curriculum changes
  useEffect(() => {
    fetchCurriculums();
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
    setCurriculumId("");
  };

  // delete handler
  const handleDelete = (id) => {
    handleDeleteOpen();
    setCurriculumId(id);
  };

  // funtions open edit modal
  const handleEditOpen = () => {
    setdEditOpen(true);
  };

  // funtion close Edit modal
  const handleEditClose = () => {
    setdEditOpen(false);
    setCurriculumId("");
  };

  // edit handler
  const handleEdit = (id) => {
    handleEditOpen();
    setCurriculumId(id);
  };

  // convert curriculum object to array if necessary
  const tableRows = Array.isArray(curriculum) ? curriculum : [curriculum];

  // toggle delete modal
  let content = "";
  if (deleteOpen) {
    content = (
      <CurriculumDelete
        open={deleteOpen}
        handleClose={handleDeleteClose}
        curriculumId={curriculumId}
      />
    );
  }
  if (editOpen) {
    content = (
      <CurriculumUpdate
        open={editOpen}
        handleClose={handleEditClose}
        curriculumId={curriculumId}
      />
    );
  }

  return (
    <div>
      <Datatable
        onDelete={handleDelete}
        onEdit={handleEdit}
        tableColumns={tableColumns}
        key={curriculum._id}
        tableRows={tableRows}
        setSelectedRows={setSelectedRows}
        getRowId={(row) => row._id || curriculum.indexOf(row)}
      />
      {content}
    </div>
  );
};

export default CurriculumTable;
