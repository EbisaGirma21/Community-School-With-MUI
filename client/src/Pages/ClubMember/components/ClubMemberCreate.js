import React, { useContext, useEffect, useState } from "react";
import Modal from "../../../components/UI/Modal";
import { Autocomplete, TextField } from "@mui/material";
import ClubMemberContext from "../../../context/ClubMemberContext";
import StudentContext from "../../../context/StudentContext";
import Dropdown from "../../../components/UI/Dropdown";


const ClubMemberCreate = ({ handleClose, open, clubId }) => {
  // useSate for hte for input
  const [member, setMember] = useState("");
  const [selectedStudentName, setSelectedStudentName] = useState("");
  const [role, setRole] = useState("");
  // context creation
  const { createClubMember, error, isLoading } = useContext(ClubMemberContext);
  const { student, fetchStudents } = useContext(StudentContext);

  // update local student state when context student changes
  useEffect(() => {
    fetchStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const studentOption = student
    ? student.map((stud) => ({
        label: `${stud.firstName} ${stud.middleName}`,
        value: stud._id,
      }))
    : [];

  const handleMemberChange = (event, newValue) => {
    const selectedStudent = newValue ? newValue.value : "";
    setMember(selectedStudent);
    setSelectedStudentName(newValue ? newValue.label : "");
  };

  // submit functions
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await createClubMember(clubId, member, role);
    if (success) {
      setMember("");
      setSelectedStudentName("");
      setRole("");
      handleClose();
    }
  };

  const roleOption = [
    { label: "Member", value: "Member" },
    { label: "Leader", value: "Leader" },
    { label: "Sectretary", value: "Sectretary" },
    { label: "Vice Leader", value: "Vice Leader" },
  ];

  return (
    <Modal
      Name="New ClubMember"
      btnText="New"
      onSubmit={handleSubmit}
      open={open}
      handleClose={handleClose}
      error={error}
      isLoading={isLoading}
    >
      <form style={{ display: "inline-grid", padding: "10px" }}>
        <Autocomplete
          options={studentOption}
          value={selectedStudentName}
          onChange={(event, newValue) => handleMemberChange(event, newValue)}
          freeSolo
          disableClearable
          renderInput={(params) => (
            <TextField
              {...params}
              margin="dense"
              label="Student Name"
              type="text"
              variant="standard"
              style={{ width: "300px" }}
            />
          )}
        />
        <Dropdown
          label="Role"
          options={roleOption}
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
          }}
          width={"100%"}
        />
      </form>
    </Modal>
  );
};

export default ClubMemberCreate;
