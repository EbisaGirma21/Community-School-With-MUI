import React, { useContext, useState } from "react";
import Modal from "../../../components/UI/Modal";
import { TextField } from "@mui/material";
import AcademicSessionContext from "../../../context/AcademicSessionContext";

const AcademicSessionUpdate = (props) => {
  const { handleClose, open, academicSessionId } = props;

  //   context inclusiion
  const { editAcademicSessionById, academicSession } = useContext(
    AcademicSessionContext
  );

  const academicSessions = academicSession.filter((academicSession) => {
    return academicSession._id === academicSessionId;
  });

  // useSate for hte for input
  const [academicYear, setAcademicYear] = useState(
    academicSessions[0].academicYear
  );

  // Change handler funtions
  const handleAcademicYearChange = (e) => {
    console.log(e.target.value);
    setAcademicYear(e.target.value);
  };

  // submit functions
  const handleSubmit = () => {
    editAcademicSessionById(academicSessionId, academicYear);

    setAcademicYear("");
  };

  return (
    <Modal
      title="Edit AcademicSession"
      btnText="New"
      onSubmit={handleSubmit}
      open={open}
      handleClose={handleClose}
    >
      <form>
        <TextField
          margin="dense"
          label="Title"
          type="text"
          sx={{ minWidth: 300 }}
          variant="standard"
          value={academicYear}
          onChange={handleAcademicYearChange}
        />
      </form>
    </Modal>
  );
};

export default AcademicSessionUpdate;
