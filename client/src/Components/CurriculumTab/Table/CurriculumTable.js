import React, { useContext, useEffect, useState } from "react";
import CurriculumContext from "../../../Context/CurriculumContext";
import Datatable from "../../UI/Datatable/Datatable";
import CurriculumDelete from "../Modals/CurriculumDelete";
import CurriculumUpdate from "../Modals/CurriculumUpdate";

// Curriculum Basic information datatable Column
const tableColumns = [
  { field: "curriculumTitle", headerName: "Title", width: 150 },
  { field: "curriculumYear", headerName: "Curriculum Year", width: 150 },
  { field: "stage", headerName: "Curriculum Stage", width: 150 },
  {
    field: "classification",
    headerName: "Classification",
    width: 150,
  },
  { field: "totalMaximumLoad", headerName: "Max Load", width: 100 },
  { field: "subject", headerName: "Subjects", width: 120 },
];

const CurriculumTable = () => {
  // component states
  const [deleteOpen, setdDeleteOpen] = useState(false);
  const [editOpen, setdEditOpen] = useState(false);
  const [curriculumId, setCurriculumId] = useState("");

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
        getRowId={(row) => row._id || curriculum.indexOf(row)}
      />
      {content}
    </div>
  );
};

export default CurriculumTable;
