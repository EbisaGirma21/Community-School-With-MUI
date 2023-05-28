import React, { useContext, useState } from "react";
import Modal from "../../../components/UI/Modal";
import { TextField } from "@mui/material";
import SectionContext from "../../../context/SectionContext";

const SectionUpdate = (props) => {
  const { handleClose, open, sectionId } = props;

  //   context inclusiion
  const { editSectionById, section } = useContext(SectionContext);

  const sections = section.filter((section) => {
    return section._id === sectionId;
  });

  // useSate for hte for input
  const [sectionLabel, setSectionLabel] = useState(sections[0].sectionLabel);

  // Change handler funtions
  const handleSectionLabelChange = (e) => {
    console.log(e.target.value);
    setSectionLabel(e.target.value);
  };

  // submit functions
  const handleSubmit = () => {
    editSectionById(sectionId, sectionLabel);

    setSectionLabel("");
  };

  return (
    <Modal
      title="Edit Section"
      btnText="New"
      onSubmit={handleSubmit}
      open={open}
      handleClose={handleClose}
    >
      <form style={{ display: "inline-grid", padding: "10px" }}>
        <TextField
          margin="dense"
          label="Label"
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

export default SectionUpdate;
