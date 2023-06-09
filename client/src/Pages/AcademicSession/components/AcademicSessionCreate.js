import React, { useContext, useState } from "react";
import Modal from "../../../components/UI/Modal";
import { TextField } from "@mui/material";
import AcademicSessionContext from "../../../context/AcademicSessionContext";

const AcademicSessionCreate = ({ handleClose, open }) => {
  // useSate for hte for input
  const [academicYear, setAcademicYear] = useState("");

  // context creation
  const { createAcademicSession, error, isLoading } = useContext(
    AcademicSessionContext
  );

  // Change handler funtions
  const handleAcademicYearChange = (e) => {
    setAcademicYear(e.target.value);
  };

  // submit functions
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await createAcademicSession(academicYear);
    if (success) {
      setAcademicYear("");
      handleClose();
    }
  };

  return (
    <Modal
      title="New Academic Session"
      btnText="New"
      onSubmit={handleSubmit}
      open={open}
      isLoading={isLoading}
      error={error}
    >
      <form>
        <TextField
          margin="dense"
          label="Academic Year"
          type="number"
          sx={{ minWidth: 300 }}
          variant="standard"
          value={academicYear}
          onChange={handleAcademicYearChange}
        />
      </form>
    </Modal>
  );
};

export default AcademicSessionCreate;
