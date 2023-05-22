import React, { useContext, useState } from "react";
import { TextField } from "@mui/material";
import CurriculumContext from "../../../context/CurriculumContext";
import Modal from "../../../components/UI/Modal";
import Dropdown from "../../../components/UI/Dropdown";

//// Global and Toast references...

const classificationOption = [
  { label: "Regular", value: "R" },
  { label: "Night", value: "N" },
  { label: "Distance", value: "D" },
];

const stageOption = [
  { label: "Kindergarten", value: "KG" },
  { label: "First Cycle Primary", value: "PRM-I" },
  { label: "Second Cycle Primary", value: "PRM-II" },
  { label: "Secondary", value: "SEC" },
  { label: "Preparatory", value: "PREP" },
];

const CurriculumCreate = ({ handleClose, open }) => {
  // useSate for hte for input
  const [curriculumTitle, setCurriculumTitle] = useState("");
  const [curriculumYear, setCurriculumYear] = useState("");
  const [totalMaximumLoad, setTotalMaximumLoad] = useState("");
  const [stage, setStage] = useState("");
  const [classification, setClassification] = useState("");

  // context creation
  const { createCurriculum } = useContext(CurriculumContext);

  // Change handler funtions
  const handleCurriculumTitleChange = (e) => {
    setCurriculumTitle(e.target.value);
  };
  const handleCurriculumYearChange = (e) => {
    setCurriculumYear(e.target.value);
  };
  const handleTotalMaximumLoadChange = (e) => {
    setTotalMaximumLoad(e.target.value);
  };

  // submit functions
  const handleSubmit = () => {
    createCurriculum(
      curriculumTitle,
      curriculumYear,
      stage,
      classification,
      totalMaximumLoad
    );
    setCurriculumTitle("");
    setCurriculumYear("");
    setClassification("");
    setStage("");
    setTotalMaximumLoad("");
  };

  return (
    <Modal
      title="New Curriculum"
      btnText="New"
      onSubmit={handleSubmit}
      open={open}
      handleClose={handleClose}
    >
      <form style={{ display: "inline-grid", padding: "10px" }}>
        <TextField
          margin="dense"
          label="Title"
          type="text"
          sx={{ minWidth: 300 }}
          variant="standard"
          value={curriculumTitle}
          onChange={handleCurriculumTitleChange}
        />
        <TextField
          margin="dense"
          label="Curriculum Year"
          type="number"
          sx={{ minWidth: 300 }}
          variant="standard"
          value={curriculumYear}
          onChange={handleCurriculumYearChange}
        />
        <Dropdown
          label="Stage"
          options={stageOption}
          value={stage}
          onChange={(e) => {
            setStage(e.target.value);
          }}
          width={"100%"}
        />
        <Dropdown
          label="Classification"
          options={classificationOption}
          value={classification}
          onChange={(e) => {
            setClassification(e.target.value);
          }}
          width={"100%"}
        />

        <TextField
          margin="dense"
          label="Maximum Load"
          type="number"
          sx={{ minWidth: 300 }}
          variant="standard"
          value={totalMaximumLoad}
          onChange={handleTotalMaximumLoadChange}
        />
      </form>
    </Modal>
  );
};

export default CurriculumCreate;
