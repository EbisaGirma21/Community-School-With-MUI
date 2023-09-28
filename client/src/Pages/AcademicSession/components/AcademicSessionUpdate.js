import React, { useContext, useState } from "react";
import Modal from "../../../components/UI/Modal";
import { TextField } from "@mui/material";
import AcademicSessionContext from "../../../context/AcademicSessionContext";

const AcademicSessionUpdate = (props) => {
  const { handleClose, open, academicSessionId } = props;

  //   context inclusiion
  const { editAcademicSessionById, academicSession, error, isLoading } =
    useContext(AcademicSessionContext);

  const academicSessions = academicSession.filter((academicSession) => {
    return academicSession._id === academicSessionId;
  });

  // useSate for hte for input
  const [academicYear, setAcademicYear] = useState(
    academicSessions[0].academicYear
  );
  const [registrationDate, setRegistrationDate] = useState(
    formatDate(academicSessions[0].registrationDate)
  );
  const [registrationDeadLine, setRegistrationDeadLine] = useState(
    formatDate(academicSessions[0].registrationDeadLine)
  );
  const [classStartDate, setClassStartDate] = useState(
    formatDate(academicSessions[0].classStartDate)
  );
  const [classEndDate, setClassEndDate] = useState(
    formatDate(academicSessions[0].classEndDate)
  );

  // Change handler funtions
  const handleAcademicYearChange = (e) => {
    setAcademicYear(e.target.value);
  };
  const handleRegistrationDateChange = (e) => {
    setRegistrationDate(e.target.value);
  };
  const handleRegistrationDeadLineChange = (e) => {
    setRegistrationDeadLine(e.target.value);
  };
  const handleClassStartDateChange = (e) => {
    setClassStartDate(e.target.value);
  };
  const handleClassEndDateChange = (e) => {
    setClassEndDate(e.target.value);
  };

  // submit functions
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await editAcademicSessionById(
      academicSessionId,
      academicYear,
      registrationDate,
      registrationDeadLine,
      classStartDate,
      classEndDate
    );
    if (success) {
      setAcademicYear("");
      handleClose();
    }
  };
  

  function formatDate(inputDateStr) {
    const inputDate = new Date(inputDateStr);
    if (isNaN(inputDate.getTime())) {
      return "Invalid Date"; // Handle invalid input
    }

    const year = inputDate.getFullYear();
    const month = (inputDate.getMonth() + 1).toString().padStart(2, "0"); // Add 1 because months are 0-indexed
    const day = inputDate.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  return (
    <Modal
      title="Edit AcademicSession"
      btnText="New"
      onSubmit={handleSubmit}
      open={open}
      handleClose={handleClose}
      isLoading={isLoading}
      error={error}
    >
      <form className="flex flex-col">
        <TextField
          margin="dense"
          label="Title"
          type="text"
          sx={{ minWidth: 300 }}
          variant="standard"
          value={academicYear}
          onChange={handleAcademicYearChange}
        />
        <TextField
          margin="dense"
          label="Registration Date"
          type="date"
          sx={{ minWidth: 300 }}
          variant="standard"
          value={registrationDate}
          focused
          onChange={handleRegistrationDateChange}
        />
        <TextField
          margin="dense"
          label="Registration Dead Line"
          type="date"
          sx={{ minWidth: 300 }}
          variant="standard"
          value={registrationDeadLine}
          focused
          onChange={handleRegistrationDeadLineChange}
        />
        <TextField
          margin="dense"
          label="Class Start Date"
          type="date"
          sx={{ minWidth: 300 }}
          variant="standard"
          value={classStartDate}
          focused
          onChange={handleClassStartDateChange}
        />
        <TextField
          margin="dense"
          label="Class End Date Year"
          type="date"
          sx={{ minWidth: 300 }}
          variant="standard"
          value={classEndDate}
          focused
          onChange={handleClassEndDateChange}
        />
      </form>
    </Modal>
  );
};

export default AcademicSessionUpdate;
