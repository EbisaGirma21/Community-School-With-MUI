import React, { useContext, useState } from "react";
import CurriculumContext from "../../../Context/CurriculumContext";
import Datatable from "../../UI/Datatable/Datatable";
import CurriculumDelete from "../Modals/CurriculumDelete";

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
  const [open, setOpen] = useState(false);
  const [curriculumId, setCurriculumId] = useState("");

  // component context
  const { curriculum } = useContext(CurriculumContext);

  // toggler funcions
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurriculumId("");
  };

  const handleDelete = (id) => {
    handleOpen();
    setCurriculumId(id);
  };

  // convert curriculum object to array if necessary
  const tableRows = Array.isArray(curriculum) ? curriculum : [curriculum];

  // toggle delete modal
  let content = "";
  if (open) {
    content = (
      <CurriculumDelete
        open={open}
        handleClose={handleClose}
        curriculumId={curriculumId}
      />
    );
  }

  return (
    <div>
      <Datatable
        onDelete={handleDelete}
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
