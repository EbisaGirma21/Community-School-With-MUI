import React, { useContext, useEffect, useState } from "react";
import Modal from "../../../components/UI/Modal";
import { Autocomplete, TextField } from "@mui/material";
import ClubContext from "../../../context/ClubContext";
import StudentContext from "../../../context/StudentContext";
import TeacherContext from "../../../context/TeacherContext";

const ClubCreate = ({ handleClose, open }) => {
  // useSate for hte for input
  const [clubName, setClubName] = useState("");
  const [leaderStudent, setLeaderStudent] = useState("");
  const [selectedTeacherName, setSelectedTeacherName] = useState("");
  const [selectedStudentName, setSelectedStudentName] = useState("");
  const [coordinatorTeacher, setCoordinatorTeacher] = useState("");
  // context creation
  const { createClub, error, isLoading } = useContext(ClubContext);
  const { student, fetchStudents } = useContext(StudentContext);
  const { teachers, fetchTeachers } = useContext(TeacherContext);

  // update local student state when context student changes
  useEffect(() => {
    fetchStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // update local teacher state when context teacher changes
  useEffect(() => {
    fetchTeachers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const studentOption = student
    ? student.map((stud) => ({
        label: `${stud.firstName} ${stud.middleName}`,
        value: stud._id,
      }))
    : [];

  const teachersOption = teachers
    ? teachers.map((teacher) => ({
        label:
          teacher.gender === "Male"
            ? `Mr. ${teacher.firstName}`
            : `Mrs. ${teacher.firstName}`,
        value: teacher._id,
      }))
    : [];

  // Change handler funtions
  const handleClubNameChange = (e) => {
    setClubName(e.target.value);
  };

  const handleLeaderStudentChange = (event, newValue) => {
    const selectedStudent = newValue ? newValue.value : "";
    setLeaderStudent(selectedStudent);
    setSelectedStudentName(newValue ? newValue.label : "");
  };

  const handleCoordinatorTeacherChange = (event, newValue) => {
    const selectedTeacher = newValue ? newValue.value : "";
    setCoordinatorTeacher(selectedTeacher);
    setSelectedTeacherName(newValue ? newValue.label : "");
  };

  // submit functions
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await createClub(
      clubName,
      leaderStudent,
      coordinatorTeacher
    );
    if (success) {
      setClubName("");
      setLeaderStudent("");
      setCoordinatorTeacher("");
      setSelectedStudentName("");
      setSelectedTeacherName("");
      handleClose();
    }
  };

  return (
    <Modal
      Name="New Club"
      btnText="New"
      onSubmit={handleSubmit}
      open={open}
      handleClose={handleClose}
      error={error}
      isLoading={isLoading}
    >
      <form style={{ display: "inline-grid", padding: "10px" }}>
        <TextField
          margin="dense"
          label="Name"
          type="text"
          sx={{ minWidth: 300 }}
          variant="standard"
          value={clubName}
          onChange={handleClubNameChange}
        />
        <Autocomplete
          options={studentOption}
          value={selectedStudentName}
          onChange={(event, newValue) =>
            handleLeaderStudentChange(event, newValue)
          }
          freeSolo
          disableClearable
          renderInput={(params) => (
            <TextField
              {...params}
              margin="dense"
              label="Leader(Optional)"
              type="text"
              variant="standard"
              style={{ width: "300px" }}
            />
          )}
        />
        <Autocomplete
          options={teachersOption}
          value={selectedTeacherName}
          onChange={(event, newValue) =>
            handleCoordinatorTeacherChange(event, newValue)
          }
          freeSolo
          disableClearable
          renderInput={(params) => (
            <TextField
              {...params}
              margin="dense"
              label="Coordinator(Optional)"
              type="text"
              variant="standard"
              style={{ width: "300px" }}
            />
          )}
        />
      </form>
    </Modal>
  );
};

export default ClubCreate;
