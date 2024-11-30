import React, { useContext, useEffect, useState } from "react";
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
import GradeContext from "../../../context/GradeContext";

const registrationTypeOption = [
  { label: "New", value: "NOR" },
  { label: "Transfer", value: "TRN" },
];
const statusOption = [
  { label: "Pass", value: "PAS" },
  { label: "Fail", value: "FAL" },
];

const classificationOption = [
  { label: "Regular", value: "R" },
  { label: "Night", value: "N" },
  { label: "Distance", value: "D" },
];

const stageOption = [
  { label: "Kindergarten", value: "KG" },
  { label: "First Cycle Primary", value: "PRM-I" },
  { label: "Second Cycle Primary", value: "PRM-II" },
  { label: "Secondary", value: "SEC" },
  { label: "Preparatory", value: "PREP" },
];

const NewStudentCreate = ({ handleClose, open }) => {
  // useSate for hte for input
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [familyFirstName, setFamilyFirstName] = useState("");
  const [familyMiddleName, setFamilyMiddleName] = useState("");
  const [familyLastName, setFamilyLastName] = useState("");
  const [familyGender, setFamilyGender] = useState("");
  const [familyEmail, setfamilyEmail] = useState("");
  const [familyPhoneNumber, setFamilyPhoneNumber] = useState("");
  const [familyAddress, setFamilyAddress] = useState("");
  const [registrationType, setRegistrationType] = useState("");
  const [previousYear, setPreviousYear] = useState("");
  const [previousGrade, setPreviousGrade] = useState("");
  const [previousStage, setPreviousStage] = useState("");
  const [previousClassification, setPreviousClassification] = useState("");
  const [previousAcademicStatus, setPreviousAcademicStatus] = useState("");
  const [previousTotalMark, setPreviousTotalMark] = useState("");
  const [previousAverage, setPreviousAverage] = useState("");
  const [isMainRegistration, setIsMainRegistration] = useState(true);

  // context creation
  const { createNewStudent, createTransferStudent, error, isLoading } =
    useContext(NewStudentContext);
  const { fetchGradeByStage, grade } = useContext(GradeContext);

  useEffect(() => {
    previousStage && fetchGradeByStage(previousStage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previousStage]);

  const gradeOption = !previousStage
    ? [{ label: "Not found", value: 1 }]
    : grade.map((gr) => ({
        label: gr.stage === "KG" ? `KG - ${gr.level}` : `Grade - ${gr.level}`,
        value: gr._id,
      }));

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
  const handleFamilyFirstNameChange = (e) => {
    setFamilyFirstName(e.target.value);
  };
  const handleFamilyMiddleNameChange = (e) => {
    setFamilyMiddleName(e.target.value);
  };
  const handleFamilyLastNameChange = (e) => {
    setFamilyLastName(e.target.value);
  };
  const handleFamilyGenderChange = (e) => {
    setFamilyGender(e.target.value);
  };
  const handleFamilyEmailChange = (e) => {
    setfamilyEmail(e.target.value);
  };
  const handleFamilyPhoneNumberChange = (e) => {
    setFamilyPhoneNumber(e.target.value);
  };
  const handleFamilyAddressChange = (e) => {
    setFamilyAddress(e.target.value);
  };
  const handlePreviousYearChange = (e) => {
    setPreviousYear(e.target.value);
  };
  const handlePreviousTotalMarkChange = (e) => {
    setPreviousTotalMark(e.target.value);
  };
  const handlePreviousAverageChange = (e) => {
    setPreviousAverage(e.target.value);
  };

  const handleNextClick = () => {
    setIsMainRegistration(false);
  };
  const handlePreviousClick = () => {
    setIsMainRegistration(true);
  };

  // submit functions
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success =
      registrationType === "NOR"
        ? await createNewStudent(
            firstName,
            middleName,
            lastName,
            gender,
            email,
            birthDate,
            registrationType,
            familyFirstName,
            familyMiddleName,
            familyLastName,
            familyGender,
            familyEmail,
            familyPhoneNumber,
            familyAddress
          )
        : await createTransferStudent(
            firstName,
            middleName,
            lastName,
            gender,
            email,
            birthDate,
            registrationType,
            familyFirstName,
            familyMiddleName,
            familyLastName,
            familyGender,
            familyEmail,
            familyPhoneNumber,
            familyAddress,
            previousYear,
            previousStage,
            previousGrade,
            previousClassification,
            previousTotalMark,
            previousAverage,
            previousAcademicStatus
          );
    if (success) {
      setFirstName("");
      setMiddleName("");
      setLastName("");
      setGender("");
      setEmail("");
      setBirthDate("");
      setRegistrationType("");
      setFamilyFirstName("");
      setFamilyMiddleName("");
      setFamilyLastName("");
      setFamilyGender("");
      setfamilyEmail("");
      setFamilyPhoneNumber("");
      setFamilyAddress("");
      setPreviousYear("");
      setPreviousStage("");
      setPreviousGrade("");
      setPreviousClassification("");
      setPreviousTotalMark("");
      setPreviousAverage("");
      setPreviousAcademicStatus("");
      handleClose();
    }
  };

  return (
    <Modal
      title="New Student"
      btnText="New"
      onSubmit={handleSubmit}
      open={open}
      handleClose={handleClose}
      isLoading={isLoading}
      error={error}
    >
      <form className="p-2">
        {/* Main student registration */}
        <Box
          className="flex justify-between gap-8 p-2"
          sx={{ display: isMainRegistration ? "flex" : "none" }}
        >
          <Box className="flex flex-col  items-center">
            <Typography>Student Information</Typography>
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
              label="Registration Type"
              options={registrationTypeOption}
              value={registrationType}
              onChange={(e) => {
                setRegistrationType(e.target.value);
              }}
              width={"100%"}
            />
          </Box>
          <Box className="flex flex-col items-center ">
            <Typography>Family Information</Typography>
            <TextField
              margin="dense"
              label="First Name"
              type="text"
              sx={{ minWidth: 300 }}
              variant="standard"
              value={familyFirstName}
              onChange={handleFamilyFirstNameChange}
            />
            <TextField
              margin="dense"
              label="Middle Name"
              type="text"
              sx={{ minWidth: 300 }}
              variant="standard"
              value={familyMiddleName}
              onChange={handleFamilyMiddleNameChange}
            />
            <TextField
              margin="dense"
              label="Last Name"
              type="text"
              sx={{ minWidth: 300 }}
              variant="standard"
              value={familyLastName}
              onChange={handleFamilyLastNameChange}
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
            <TextField
              margin="dense"
              label="Email"
              type="email"
              sx={{ minWidth: 300 }}
              variant="standard"
              value={familyEmail}
              onChange={handleFamilyEmailChange}
            />
            <TextField
              margin="dense"
              label="Phone Number"
              type="email"
              sx={{ minWidth: 300 }}
              variant="standard"
              value={familyPhoneNumber}
              onChange={handleFamilyPhoneNumberChange}
            />
            <TextField
              margin="dense"
              label="Address"
              type="email"
              sx={{ minWidth: 300 }}
              variant="standard"
              value={familyAddress}
              onChange={handleFamilyAddressChange}
            />
          </Box>
        </Box>

        {/* additional transfer student registration */}

        <Box
          className="flex justify-between gap-8 p-2"
          sx={{
            display: isMainRegistration ? "none" : "flex",
          }}
        >
          <Box className="flex flex-col  items-center">
            <Typography>Additional Information</Typography>
            <TextField
              margin="dense"
              label="Completed Year"
              type="number"
              sx={{ minWidth: 300 }}
              variant="standard"
              value={previousYear}
              onChange={handlePreviousYearChange}
            />
            <Dropdown
              label="Stage"
              options={stageOption}
              value={previousStage}
              onChange={(e) => {
                setPreviousStage(e.target.value);
              }}
              width={"100%"}
            />
            <Dropdown
              label="Completed Grade"
              options={gradeOption}
              value={previousGrade}
              onChange={(e) => {
                setPreviousGrade(e.target.value);
              }}
              width={"100%"}
            />

            <Dropdown
              label="Classification"
              options={classificationOption}
              value={previousClassification}
              onChange={(e) => {
                setPreviousClassification(e.target.value);
              }}
              width={"100%"}
            />

            <TextField
              margin="dense"
              label="Total Mark of Completed Grade"
              type="number"
              sx={{ minWidth: 300 }}
              variant="standard"
              value={previousTotalMark}
              onChange={handlePreviousTotalMarkChange}
            />
            <TextField
              margin="dense"
              label="Average of Completed Grade"
              type="number"
              sx={{ minWidth: 300 }}
              variant="standard"
              value={previousAverage}
              onChange={handlePreviousAverageChange}
            />
            <Dropdown
              label="Previous Academic Status"
              options={statusOption}
              value={previousAcademicStatus}
              onChange={(e) => {
                setPreviousAcademicStatus(e.target.value);
              }}
              width={"100%"}
            />
          </Box>
          <Box className="flex flex-col  items-center">
            <Typography>Previos School Information(Optional)</Typography>
            <TextField
              margin="dense"
              label="Name of School"
              type="number"
              sx={{ minWidth: 300 }}
              variant="standard"
            />
            <TextField
              margin="dense"
              label="Address of School"
              type="number"
              sx={{ minWidth: 300 }}
              variant="standard"
            />
            <TextField
              margin="dense"
              label="Contact Information of School"
              type="number"
              sx={{ minWidth: 300 }}
              variant="standard"
            />
            <TextField
              margin="dense"
              label="Other Information of School"
              type="number"
              sx={{ minWidth: 300 }}
              variant="standard"
            />
          </Box>
        </Box>
        <Box className="flex justify-between">
          <Button
            variant="contained"
            disabled={
              registrationType === "TRN" && !isMainRegistration ? false : true
            }
            onClick={handlePreviousClick}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            disabled={
              registrationType === "TRN" && isMainRegistration ? false : true
            }
            onClick={handleNextClick}
          >
            Next
          </Button>
        </Box>
      </form>
    </Modal>
  );
};

export default NewStudentCreate;
