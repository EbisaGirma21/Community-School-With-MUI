import React, { useContext, useState } from "react";
import Modal from "../../../components/UI/Modal";
import { Divider, TextField } from "@mui/material";
import AcademicSessionContext from "../../../context/AcademicSessionContext";

const AcademicSessionCreate = ({ handleClose, open }) => {
  // useSate for hte for input
  const [academicYear, setAcademicYear] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");
  const [registrationDeadLine, setRegistrationDeadLine] = useState("");
  const [classStartDate, setClassStartDate] = useState("");
  const [classEndDate, setClassEndDate] = useState("");

  // context creation
  const { createAcademicSession, error, isLoading } = useContext(
    AcademicSessionContext
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
    const success = await createAcademicSession(
      academicYear,
      registrationDate,
      registrationDeadLine,
      classStartDate,
      classEndDate
    );
    if (success) {
      setAcademicYear("");
      setRegistrationDate("");
      setRegistrationDeadLine("");
      setClassStartDate("");
      setClassEndDate("");
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
      <form className="flex flex-col">
        <TextField
          margin="dense"
          label="Academic Year"
          type="number"
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

export default AcademicSessionCreate;
