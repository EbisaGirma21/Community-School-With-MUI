import React, { useContext, useEffect, useState } from "react";
import Modal from "../../../components/UI/Modal";
import { TextField } from "@mui/material";
import AcademicCurriculumContext from "../../../context/AcademicCurriculumContext";
import CurriculumContext from "../../../context/CurriculumContext";
import Dropdown from "../../../components/UI/Dropdown";

//

const AcademicCurriculumCreate = ({ handleClose, open, academicYear }) => {
  // useSate for hte for input
  const [curriculumId, setCurriculumId] = useState("");
  const [maxSemester, setMaxSemester] = useState("");

  // context creation
  const { createAcademicCurriculum, error, isLoading } = useContext(
    AcademicCurriculumContext
  );
  const { curriculum, fetchCurriculums } = useContext(CurriculumContext);

  //   fetch curriculum useEffect
  useEffect(() => {
    fetchCurriculums();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //   Curruculum to dropdown
  const curriculumOption = curriculum.map((curr) => ({
    label: `${curr.curriculumTitle} ${curr.curriculumYear} (${curr.stage} - ${curr.classification})`,
    value: curr._id,
  }));

  // Change handler funtions
  const handleMaxSemesterChange = (e) => {
    setMaxSemester(e.target.value);
  };

  // submit functions
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await createAcademicCurriculum(
      academicYear,
      curriculumId,
      maxSemester
    );
    if (success) {
      setCurriculumId("");
      setMaxSemester("");
      handleClose();
    }
  };

  return (
    <Modal
      title="New Academic Session"
      btnText="New"
      onSubmit={handleSubmit}
      open={open}
      handleClose={handleClose}
      isLoading={isLoading}
      error={error}
    >
      <form style={{ display: "inline-grid", padding: "10px" }}>
        <Dropdown
          label="Curriculum"
          options={curriculumOption}
          value={curriculumId}
          onChange={(e) => {
            setCurriculumId(e.target.value);
          }}
          width={"100%"}
        />
        <TextField
          margin="dense"
          label="Maximun Semister"
          type="number"
          sx={{ minWidth: 300 }}
          variant="standard"
          value={maxSemester}
          onChange={handleMaxSemesterChange}
        />
      </form>
    </Modal>
  );
};

export default AcademicCurriculumCreate;
