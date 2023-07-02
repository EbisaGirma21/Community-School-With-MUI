import React, { useContext, useState } from "react";
import Modal from "../../../components/UI/Modal";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import { TextField } from "@mui/material";
import NewStudentContext from "../../../context/NewStudentContext";
import Dropdown from "../../../components/UI/Dropdown";

const registrationTypeOption = [
  { label: "New", value: "NOR" },
  { label: "Transfer", value: "TRN" },
];

const NewStudentCreate = ({ handleClose, open }) => {
  // useSate for hte for input
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [familyGender, setFamilyGender] = useState("");
  const [familyEmail, setfamilyEmail] = useState("");
  const [registrationType, setRegistrationType] = useState("");
  // context creation
  const { createNewStudent } = useContext(NewStudentContext);

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
  const handleBirthDateChange = (e) => {
    setBirthDate(e.target.value);
  };

  // family information
  const handleFamilyNameChange = (e) => {
    setFamilyName(e.target.value);
  };
  const handleFamilyGenderChange = (e) => {
    setFamilyGender(e.target.value);
  };
  const handleFamilyEmailChange = (e) => {
    setfamilyEmail(e.target.value);
  };

  // submit functions
  const handleSubmit = () => {
    createNewStudent(firstName, middleName, lastName, gender, email, birthDate);
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setGender("");
    setEmail("");
    setBirthDate("");
  };

  return (
    <Modal
      title="New Student"
      btnText="New"
      onSubmit={handleSubmit}
      open={open}
      handleClose={handleClose}
    >
      <form className="p-2">
        <Box className="flex justify-between gap-8 p-2">
          <Box className="flex flex-col  items-center">
            <Typography>Student Form</Typography>
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
              <FormControlLabel
                value="Female"
                control={<Radio />}
                label="Female"
              />
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
              label="Birth Date"
              type="date"
              sx={{ minWidth: 300 }}
              variant="standard"
              value={birthDate}
              onChange={handleBirthDateChange}
              focused
            />
            <Dropdown
              label="Stage"
              options={registrationTypeOption}
              value={registrationType}
              onChange={(e) => {
                setRegistrationType(e.target.value);
              }}
              width={"100%"}
            />
          </Box>
          <Box className="flex flex-col items-center ">
            <Typography>Family Form</Typography>
            <TextField
              margin="dense"
              label="Family Full Name"
              type="text"
              sx={{ minWidth: 300 }}
              variant="standard"
              value={familyName}
              onChange={handleFamilyNameChange}
            />
            <TextField
              margin="dense"
              label="Email"
              type="email"
              sx={{ minWidth: 300 }}
              variant="standard"
              value={familyEmail}
              onChange={handleFamilyEmailChange}
            />
            <RadioGroup
              aria-label="gender"
              name="gender"
              value={familyGender}
              onChange={handleFamilyGenderChange}
              row
              sx={{ m: 0, marginTop: 2 }}
            >
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="Female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          </Box>
        </Box>
        <Box className="flex justify-end">
          <Button
            variant="contained"
            disabled={registrationType === "TRN" ? false : true}
          >
            Next
          </Button>
        </Box>
      </form>
    </Modal>
  );
};

export default NewStudentCreate;
