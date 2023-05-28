import React, { useContext, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import SubjectContext from "../../../context/SubjectContext";
import Modal from "../../../components/UI/Modal";
import Dropdown from "../../../components/UI/subjectDropdown";
import ModuleContext from "../../../context/ModuleContext";

//// Global and Toast references...

const SubjectCreate = ({ handleClose, open, curriculumId, gradeId }) => {
  // useSate for hte for input
  const [modules, setModules] = useState([]);
  const [subjectLoad, setSubjectLoad] = useState("");

  // context creation
  const { createSubjects } = useContext(SubjectContext);
  const { fetchModules, module } = useContext(ModuleContext);
  //   fetch curriculum useEffect
  useEffect(() => {
    gradeId && fetchModules();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gradeId]);
  //   Curruculum to dropdown
  const moduleOption = module.map((modul) => ({
    label: modul.moduleTitle,
    value: modul._id,
  }));

  // Change handler funtions
  const handleSubjectLoadChange = (e) => {
    setSubjectLoad(e.target.value);
  };

  // submit functions
  const handleSubmit = () => {
    createSubjects(curriculumId, gradeId, { modules }, subjectLoad);
    setModules([]);
    setSubjectLoad("");
  };

  return (
    <Modal
      title="New Subject"
      btnText="New"
      onSubmit={handleSubmit}
      open={open}
      handleClose={handleClose}
    >
      <form style={{ display: "inline-grid", padding: "10px" }}>
        <Dropdown
          label="Module Title"
          options={moduleOption}
          value={modules}
          onChange={(e) => {
            setModules(e.target.value);
          }}
          width={"100%"}
        />

        <TextField
          margin="dense"
          label="Subject Load"
          type="number"
          sx={{ minWidth: 300 }}
          variant="standard"
          value={subjectLoad}
          onChange={handleSubjectLoadChange}
        />
      </form>
    </Modal>
  );
};

export default SubjectCreate;
