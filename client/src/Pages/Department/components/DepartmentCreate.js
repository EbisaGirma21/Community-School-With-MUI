import React, { useContext, useState } from "react";
import Modal from "../../../components/UI/Modal";
import { TextField } from "@mui/material";
import DepartmentContext from "../../../context/DepartmentContext";

const DepartmentCreate = ({ handleClose, open }) => {
  // useSate for hte for input
  const [departmentName, setDepartmentName] = useState("");
  // context creation
  const { createDepartment } = useContext(DepartmentContext);

  // Change handler funtions
  const handleDepartmentNameChange = (e) => {
    setDepartmentName(e.target.value);
  };

  // submit functions
  const handleSubmit = () => {
    createDepartment(departmentName);
    setDepartmentName("");
  };

  return (
    <Modal
      title="New Department"
      btnText="New"
      onSubmit={handleSubmit}
      open={open}
      handleClose={handleClose}
    >
      <form style={{ display: "inline-grid", padding: "10px" }}>
        <TextField
          margin="dense"
          label="Name"
          type="text"
          sx={{ minWidth: 300 }}
          variant="standard"
          value={departmentName}
          onChange={handleDepartmentNameChange}
        />
      </form>
    </Modal>
  );
};

export default DepartmentCreate;
