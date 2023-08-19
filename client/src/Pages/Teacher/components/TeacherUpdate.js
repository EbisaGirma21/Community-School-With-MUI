import React, { useContext, useState } from "react";
import Modal from "../../../components/UI/Modal";
import { TextField } from "@mui/material";
import TeacherContext from "../../../context/TeacherContext";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";

const TeacherUpdate = (props) => {
  const { handleClose, open, teacherId } = props;

  //   context inclusiion
  const { editTeacherById, teachers, error, isLoading } =
    useContext(TeacherContext);

  const filteredTeacher = teachers.filter((teacher) => {
    return teacher._id === teacherId;
  });
  // useSate for hte for input
  const [firstName, setFirstName] = useState(filteredTeacher[0].firstName);
  const [middleName, setMiddleName] = useState(filteredTeacher[0].middleName);
  const [lastName, setLastName] = useState(filteredTeacher[0].lastName);
  const [gender, setGender] = useState(filteredTeacher[0].gender);
  const [email, setEmail] = useState(filteredTeacher[0].email);
  const [phoneNumber, setPhoneNumber] = useState(filteredTeacher[0].phoneNumber);
  const [address, setAddress] = useState(filteredTeacher[0].address);

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

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  // submit functions
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await editTeacherById(
      teacherId,
      firstName,
      middleName,
      lastName,
      gender,
      email,
      phoneNumber,
      address
    );
    if (success) {
      setFirstName("");
      setMiddleName("");
      setLastName("");
      setGender("");
      setEmail("");
      setPhoneNumber("");
      setAddress("");
      handleClose();
    }
  };

  return (
    <Modal
      title="Edit Teacher"
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

        <TextField
          margin="dense"
          label="Phone Number"
          type="tel"
          sx={{ minWidth: 300 }}
          variant="standard"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
        <TextField
          margin="dense"
          label="Address"
          type="text"
          sx={{ minWidth: 300 }}
          variant="standard"
          value={address}
          onChange={handleAddressChange}
        />
      </form>
    </Modal>
  );
};

export default TeacherUpdate;
