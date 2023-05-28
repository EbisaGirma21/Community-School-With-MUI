import React, { useContext, useState } from "react";
import Modal from "../../../components/UI/Modal";
import { TextField } from "@mui/material";
import DepartmentContext from "../../../context/DepartmentContext";

const DepartmentUpdate = (props) => {
  const { handleClose, open, departmentId } = props;

  //   context inclusiion
  const { editDepartmentById, department } = useContext(DepartmentContext);

  const departments = department.filter((department) => {
    return department._id === departmentId;
  });

  // useSate for hte for input
  const [departmentName, setDepartmentName] = useState(departments[0].departmentName);

  // Change handler funtions
  const handleDepartmentNameChange = (e) => {
    
    setDepartmentName(e.target.value);
  };

  // submit functions
  const handleSubmit = () => {
    editDepartmentById(departmentId, departmentName);

    setDepartmentName("");
  };

  return (
    <Modal
      title="Edit Department"
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

export default DepartmentUpdate;
