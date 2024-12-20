import React, { useContext, useState } from "react";
import Modal from "../../../components/UI/Modal";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { TextField } from "@mui/material";
import TeacherContext from "../../../context/TeacherContext";
import Dropdown from "../../../components/UI/Dropdown";

const educationLevelOption = [
  { label: "Level IV", value: "IV" },
  { label: "BSc", value: "BSc" },
  { label: "MSc", value: "MSc" },
  { label: "PhD", value: "PhD" },
];

const TeacherCreate = ({ handleClose, open }) => {
  // useSate for hte for input
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [educationLevel, setEducationLevel] = useState("");

  // context creation
  const { createTeacher, error, isLoading } = useContext(TeacherContext);

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
    const success = await createTeacher(
      firstName,
      middleName,
      lastName,
      gender,
      email,
      phoneNumber,
      address,
      educationLevel
    );
    if (success) {
      setFirstName("");
      setMiddleName("");
      setLastName("");
      setGender("");
      setEmail("");
      setPhoneNumber("");
      setAddress("");
      setEducationLevel("");
      handleClose();
    }
  };

  return (
    <Modal
      title="New Teacher"
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
        <Dropdown
          label="EducationLevel"
          options={educationLevelOption}
          value={educationLevel}
          onChange={(e) => {
            setEducationLevel(e.target.value);
          }}
          width={"100%"}
        />
      </form>
    </Modal>
  );
};

export default TeacherCreate;
