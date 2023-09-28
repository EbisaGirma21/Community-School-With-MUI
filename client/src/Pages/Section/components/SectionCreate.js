import React, { useContext, useEffect, useState } from "react";
import Modal from "../../../components/UI/Modal";
import { TextField } from "@mui/material";
import SectionContext from "../../../context/SectionContext";
import AcademicCurriculumContext from "../../../context/AcademicCurriculumContext";
import SubjectContext from "../../../context/SubjectContext";

const SectionCreate = ({ handleClose, open, acCurriculumId, gradeId }) => {
  //  Context
  const { createSection, error, isLoading } = useContext(SectionContext);
  const { academicCurriculum, fetchAcademicCurriculums } = useContext(
    AcademicCurriculumContext
  );
  const { subject, fetchSubjects } = useContext(SubjectContext);

  //   useState
  const [sectionLabel, setSectionLabel] = useState("");
  const [curriculumId, setCurriculumId] = useState("");

  //   filter acCurriculumByID
  const acCurriculum = academicCurriculum.filter((acCurr) => {
    return acCurr._id === acCurriculumId;
  });

  //   assign selected Curriculum
  useEffect(() => {
    if (acCurriculum.length > 0) {
      setCurriculumId(acCurriculum[0].curriculumId);
    }
    fetchAcademicCurriculums();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gradeId]);

  //   fetch subject
  useEffect(() => {
    curriculumId && fetchSubjects(curriculumId, gradeId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curriculumId]);

  const subjects = subject.map((sub) => {
    return sub._id;
  });

  // Change handler functions
  const handleSectionLabelChange = (e) => {
    setSectionLabel(e.target.value);
  };

  // Submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = curriculumId
      ? await createSection(sectionLabel, acCurriculumId, gradeId, subjects)
      : null;
    if (success) {
      setSectionLabel("");
      handleClose();
    }
  };

  return (
    <Modal
      title="New Section"
      btnText="New"
      onSubmit={handleSubmit}
      open={open}
      handleClose={handleClose}
      isLoading={isLoading}
      error={error}
    >
      <form style={{ display: "inline-grid", padding: "10px" }}>
        <TextField
          margin="dense"
          label="Section Label"
          type="text"
          sx={{ minWidth: 300 }}
          variant="standard"
          value={sectionLabel}
          onChange={handleSectionLabelChange}
        />
      </form>
    </Modal>
  );
};

export default SectionCreate;
