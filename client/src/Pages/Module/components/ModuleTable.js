import React, { useContext, useEffect, useState } from "react";
import Datatable from "../../../components/UI/Datatable";
import ModuleDelete from "./ModuleDelete";
import ModuleUpdate from "./ModuleUpdate";
import ModuleContext from "../../../context/ModuleContext";

// Module Basic information datatable Column
const tableColumns = [
  { field: "moduleTitle", headerName: "Title", width: 150 },
];

const ModuleTable = () => {
  // component states
  const [deleteOpen, setdDeleteOpen] = useState(false);
  const [editOpen, setdEditOpen] = useState(false);
  const [moduleId, setModuleId] = useState("");

  // component context
  const { module, fetchModules } = useContext(ModuleContext);

  // update local module state when context module changes
  useEffect(() => {
    fetchModules();
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
    setModuleId("");
  };

  // delete handler
  const handleDelete = (id) => {
    handleDeleteOpen();
    setModuleId(id);
  };

  // funtions open edit modal
  const handleEditOpen = () => {
    setdEditOpen(true);
  };

  // funtion close Edit modal
  const handleEditClose = () => {
    setdEditOpen(false);
    setModuleId("");
  };

  // edit handler
  const handleEdit = (id) => {
    handleEditOpen();
    setModuleId(id);
  };

  // convert module object to array if necessary
  const tableRows = Array.isArray(module) ? module : [module];

  // toggle delete modal
  let content = "";
  if (deleteOpen) {
    content = (
      <ModuleDelete
        open={deleteOpen}
        handleClose={handleDeleteClose}
        moduleId={moduleId}
      />
    );
  }
  if (editOpen) {
    content = (
      <ModuleUpdate
        open={editOpen}
        handleClose={handleEditClose}
        moduleId={moduleId}
      />
    );
  }

  return (
    <div>
      <Datatable
        onDelete={handleDelete}
        onEdit={handleEdit}
        tableColumns={tableColumns}
        key={module._id}
        tableRows={tableRows}
        getRowId={(row) => row._id || module.indexOf(row)}
      />
      {content}
    </div>
  );
};

export default ModuleTable;
