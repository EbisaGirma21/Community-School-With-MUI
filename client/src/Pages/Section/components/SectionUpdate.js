import React, { useContext, useState } from "react";
import Modal from "../../../components/UI/Modal";
import { TextField } from "@mui/material";
import SectionContext from "../../../context/SectionContext";

const SectionUpdate = (props) => {
  const { handleClose, open, sectionId } = props;

  //   context inclusiion
  const { editSectionById, section, error, isLoading } =
    useContext(SectionContext);

  const sections = section.filter((section) => {
    return section._id === sectionId;
  });

  // useSate for hte for input
  const [sectionLabel, setSectionLabel] = useState(sections[0].sectionLabel);

  // Change handler funtions
  const handleSectionLabelChange = (e) => {
    setSectionLabel(e.target.value);
  };

  // submit functions
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await editSectionById(sectionId, sectionLabel);
    if (success) {
      setSectionLabel("");
      handleClose();
    }
  };

  return (
    <Modal
      title="Edit Section"
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
