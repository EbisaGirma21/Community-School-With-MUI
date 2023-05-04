import React, { useContext, useState } from "react";
import Modal from "../../../../../Components/UI/Modal/Modal";
import { TextField } from "@mui/material";
import ModuleContext from "../../../../../Context/ModuleContext";

const ModuleCreate = ({ handleClose, open }) => {
  // useSate for hte for input
  const [moduleTitle, setModuleTitle] = useState("");
  // context creation
  const { createModule } = useContext(ModuleContext);

  // Change handler funtions
  const handleModuleTitleChange = (e) => {
    setModuleTitle(e.target.value);
  };

  // submit functions
  const handleSubmit = () => {
    createModule(moduleTitle);
    setModuleTitle("");
  };

  return (
    <Modal
      title="New Module"
      btnText="New"
      onSubmit={handleSubmit}
      open={open}
      handleClose={handleClose}
    >
      <form>
        <TextField
          margin="dense"
          label="Title"
          type="text"
          sx={{ minWidth: 300 }}
          variant="standard"
          value={moduleTitle}
          onChange={handleModuleTitleChange}
        />
      </form>
    </Modal>
  );
};

export default ModuleCreate;
