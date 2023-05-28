import React, { useContext, useState } from "react";
import Modal from "../../../components/UI/Modal";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { TextField } from "@mui/material";
import TeacherContext from "../../../context/TeacherContext";

const TeacherCreate = ({ handleClose, open }) => {
  // useSate for hte for input
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  // context creation
  const { createTeacher } = useContext(TeacherContext);

  // Change handler funtions
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleMiddleNameChange = (e) => {
    setMiddleName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // submit functions
  const handleSubmit = () => {
    createTeacher(firstName, middleName, lastName, gender, email);
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setGender("");
    setEmail("");
  };

  return (
    <Modal
      title="New Teacher"
      btnText="New"
      onSubmit={handleSubmit}
      open={open}
      handleClose={handleClose}
    >
      <form style={{ display: "inline-grid", padding: "10px" }}>
        <TextField
          margin="dense"
          label="First Name"
          type="text"
          sx={{ minWidth: 300 }}
          variant="standard"
          value={firstName}
          onChange={handleFirstNameChange}
        />
        <TextField
          margin="dense"
          label="Middle Name"
          type="text"
          sx={{ minWidth: 300 }}
          variant="standard"
          value={middleName}
          onChange={handleMiddleNameChange}
        />
        <TextField
          margin="dense"
          label="Last Name"
          type="text"
          sx={{ minWidth: 300 }}
          variant="standard"
          value={lastName}
          onChange={handleLastNameChange}
        />
        <RadioGroup
          aria-label="gender"
          name="gender"
          value={gender}
          onChange={handleGenderChange}
          row
          sx={{ m: 0, marginTop: 2 }}
        >
          <FormControlLabel value="Male" control={<Radio />} label="Male" />
          <FormControlLabel value="Female" control={<Radio />} label="Female" />
        </RadioGroup>

        <TextField
          margin="dense"
          label="Email"
          type="email"
          sx={{ minWidth: 300 }}
          variant="standard"
          value={email}
          onChange={handleEmailChange}
        />
      </form>
    </Modal>
  );
};

export default TeacherCreate;
