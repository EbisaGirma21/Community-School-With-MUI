import React, { useContext, useState } from "react";
import { TextField } from "@mui/material";
import SubjectContext from "../../../context/SubjectContext";
import Modal from "../../../components/UI/Modal";

const SubjectUpdate = (props) => {
  const { handleClose, open, subjectId, curriculumId, gradeId } = props;

  //   context inclusiion
  const { editSubjectById, subject, error, isLoading } =
    useContext(SubjectContext);

  const subjects = subject.filter((subject) => {
    return subject._id === subjectId;
  });

  // useSate for hte for input
  const [subjectLoad, setSubjectLoad] = useState(subjects[0].subjectLoad);

  // Change handler funtions
  const handleSubjectLoadChange = (e) => {
    setSubjectLoad(e.target.value);
  };

  // submit functions
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await editSubjectById(
      curriculumId,
      gradeId,
      subjectId,
      subjectLoad
    );
    if (success) {
      setSubjectLoad("");
      handleClose();
    }
  };

  return (
    <Modal
      title="Edit Subject"
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

export default SubjectUpdate;
