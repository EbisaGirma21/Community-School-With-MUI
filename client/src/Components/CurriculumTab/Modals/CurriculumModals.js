import React, { useState } from "react";
import Modal from "../../UI/Modal/Modal";
import { TextField } from "@mui/material";
import Dropdown from "../../UI/Dropdown/Dropdown";

//// Global and Toast references...

const classificationOption = [
  { label: "Regular", value: "R" },
  { label: "Night", value: "N" },
  { label: "Distance", value: "D" },
];

const stageOption = [
  { label: "Kindergarten", value: "KG" },
  { label: "First Cycle Primary", value: "PRM" },
  { label: "Second Cycle Primary", value: "PRM-II" },
  { label: "Secondary", value: "SEC" },
  { label: "Preparatory", value: "PREP" },
];

const CurriculumModals = () => {
  const [title, setTitle] = useState("");
  const [curriculumYear, setCurriculumYear] = useState("");
  const [maxLoad, setMaxLoad] = useState("");
  const [stage, setStage] = useState("");
  const [classification, setClassification] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleCurriculumYearChange = (e) => {
    setCurriculumYear(e.target.value);
  };
  const handleMaxLoadChange = (e) => {
    setMaxLoad(e.target.value);
  };

  return (
    <Modal title="New Curriculum" btnText="New">
      <form>
        <TextField
          margin="dense"
          label="Title"
          type="text"
          sx={{ minWidth: 300 }}
          variant="standard"
          value={title}
          onChange={handleTitleChange}
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
          onChange={(e) => setStage(e.target.value)}
        />
        <Dropdown
          label="Classification"
          options={classificationOption}
          value={classification}
          onChange={(e) => {
            setClassification(e.target.value);
            console.log(classification);
          }}
        />

        <TextField
          margin="dense"
          label="Maximum Load"
          type="number"
          sx={{ minWidth: 300 }}
          variant="standard"
          value={maxLoad}
          onChange={handleMaxLoadChange}
        />
      </form>
    </Modal>
  );
};

export default CurriculumModals;
