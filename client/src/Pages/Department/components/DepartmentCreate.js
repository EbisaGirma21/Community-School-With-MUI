import React, { useContext, useEffect, useState } from "react";
import Modal from "../../../components/UI/Modal";
import { Autocomplete, TextField } from "@mui/material";
import DepartmentContext from "../../../context/DepartmentContext";
import TeacherContext from "../../../context/TeacherContext";

const DepartmentCreate = ({ handleClose, open }) => {
  // useSate for hte for input
  const [departmentName, setDepartmentName] = useState("");
  const [coordinatorTeacher, setCoordinatorTeacher] = useState("");
  const [selectedTeacherName, setSelectedTeacherName] = useState("");

  // context creation
  const { createDepartment, error, isLoading } = useContext(DepartmentContext);
  const { teachers, fetchTeachers } = useContext(TeacherContext);

  // / update local teacher state when context teacher changes
  useEffect(() => {
    fetchTeachers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const teachersOption = teachers
    ? teachers.map((teacher) => ({
        label:
          teacher.gender === "Male"
            ? `Mr. ${teacher.firstName}`
            : `Mrs. ${teacher.firstName}`,
        value: teacher._id,
      }))
    : [];

  // Change handler funtions
  const handleDepartmentNameChange = (e) => {
    setDepartmentName(e.target.value);
  };

  const handleCoordinatorTeacherChange = (event, newValue) => {
    const selectedTeacher = newValue ? newValue.value : "";
    setCoordinatorTeacher(selectedTeacher);
    setSelectedTeacherName(newValue ? newValue.label : "");
  };

  // submit functions
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await createDepartment(departmentName, coordinatorTeacher);
    if (success) {
      setDepartmentName("");
      setCoordinatorTeacher("");
      setSelectedTeacherName("");
      handleClose();
    }
  };

  return (
    <Modal
      title="New Department"
      btnText="New"
      onSubmit={handleSubmit}
      open={open}
      handleClose={handleClose}
      error={error}
      isLoading={isLoading}
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
        <Autocomplete
          options={teachersOption}
          value={selectedTeacherName}
          onChange={(event, newValue) =>
            handleCoordinatorTeacherChange(event, newValue)
          }
          freeSolo
          disableClearable
          renderInput={(params) => (
            <TextField
              {...params}
              margin="dense"
              label="Coordinator(Optional)"
              type="text"
              variant="standard"
              style={{ width: "300px" }}
            />
          )}
        />
      </form>
    </Modal>
  );
};

export default DepartmentCreate;
