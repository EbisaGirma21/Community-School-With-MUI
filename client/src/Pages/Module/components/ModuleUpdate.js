import React, { useContext, useEffect, useState } from "react";
import Modal from "../../../components/UI/Modal";
import { Autocomplete, TextField } from "@mui/material";
import ModuleContext from "../../../context/ModuleContext";
import DepartmentContext from "../../../context/DepartmentContext";
import TeacherContext from "../../../context/TeacherContext";

const ModuleUpdate = (props) => {
  const { handleClose, open, moduleId } = props;
  //   context inclusiion
  const { editModuleById, module, error, isLoading } =
    useContext(ModuleContext);
  const { department, fetchDepartments } = useContext(DepartmentContext);
  const { teachers, fetchTeachers } = useContext(TeacherContext);

  const modules = module.filter((module) => {
    return module._id === moduleId;
  });

  // useSate for hte for input
  const [moduleTitle, setModuleTitle] = useState(modules[0].moduleTitle);
  const [categorizedDepartment, setCategorizedDepartment] = useState(
    modules[0].department
  );
  const [selectedTeacherName, setSelectedTeacherName] = useState(
    modules[0].coordinatorTeacher
  );
  const [selectedDepartmentName, setSelectedDepartmentName] = useState(
    modules[0].category
  );
  const [coordinatorTeacher, setCoordinatorTeacher] = useState(
    modules[0].coordinator
  );

  // update local department state when context department changes
  useEffect(() => {
    fetchDepartments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // update local teacher state when context teacher changes
  useEffect(() => {
    fetchTeachers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const departmentOption = teachers
    ? department.map((depar) => ({
        label: depar.departmentName,
        value: depar._id,
      }))
    : [];

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
  const handleModuleTitleChange = (e) => {
    setModuleTitle(e.target.value);
  };

  const handleCategorizedDepartmentChange = (event, newValue) => {
    const selectedDepartment = newValue ? newValue.value : "";
    setCategorizedDepartment(selectedDepartment);
    setSelectedDepartmentName(newValue ? newValue.label : "");
  };

  const handleCoordinatorTeacherChange = (event, newValue) => {
    const selectedTeacher = newValue ? newValue.value : "";
    setCoordinatorTeacher(selectedTeacher);
    setSelectedTeacherName(newValue ? newValue.label : "");
  };

  // submit functions
  const handleSubmit = async (e) => {
    const success = await editModuleById(
      moduleId,
      moduleTitle,
      categorizedDepartment,
      coordinatorTeacher
    );
    if (success) {
      setModuleTitle("");
      setCategorizedDepartment("");
      setCoordinatorTeacher("");
      setSelectedDepartmentName("");
      setSelectedTeacherName("");
      handleClose();
    }
  };

  return (
    <Modal
      title="Edit Module"
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
          label="Title"
          type="text"
          sx={{ minWidth: 300 }}
          variant="standard"
          value={moduleTitle}
          onChange={handleModuleTitleChange}
        />
        <Autocomplete
          options={departmentOption}
          value={selectedDepartmentName}
          onChange={(event, newValue) =>
            handleCategorizedDepartmentChange(event, newValue)
          }
          freeSolo
          disableClearable
          renderInput={(params) => (
            <TextField
              {...params}
              margin="dense"
              label="Categorized Under(Optional)"
              type="text"
              variant="standard"
              style={{ width: "300px" }}
            />
          )}
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

export default ModuleUpdate;
