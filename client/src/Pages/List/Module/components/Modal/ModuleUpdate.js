import React, { useContext, useState } from "react";
import Modal from "../../../../../Components/UI/Modal/Modal";
import { TextField } from "@mui/material";
import ModuleContext from "../../../../../Context/ModuleContext";

const ModuleUpdate = (props) => {
  const { handleClose, open, moduleId } = props;

  //   context inclusiion
  const { editModuleById, module } = useContext(ModuleContext);

  const modules = module.filter((module) => {
    return module._id === moduleId;
  });

  // useSate for hte for input
  const [moduleTitle, setModuleTitle] = useState(modules[0].moduleTitle);

  // Change handler funtions
  const handleModuleTitleChange = (e) => {
    console.log(e.target.value);
    setModuleTitle(e.target.value);
  };

  // submit functions
  const handleSubmit = () => {
    editModuleById(moduleId, moduleTitle);

    setModuleTitle("");
  
  };

  return (
    <Modal
      title="Edit Module"
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

export default ModuleUpdate;
