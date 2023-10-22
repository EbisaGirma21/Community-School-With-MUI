import React, { useContext, useEffect, useState } from "react";
import Modal from "../../../components/UI/Modal";
import { Autocomplete, TextField } from "@mui/material";
import ClubMemberContext from "../../../context/ClubMemberContext";
import StudentContext from "../../../context/StudentContext";
import Dropdown from "../../../components/UI/Dropdown";

const ClubMemberUpdate = (props) => {
  const { handleClose, open, clubMemberId, club } = props;
  //   context inclusiion
  const { editClubMemberById, clubMember, error, isLoading } =
    useContext(ClubMemberContext);
  const { student, fetchStudents } = useContext(StudentContext);

  const clubMembers = clubMember.filter((clubMember) => {
    return clubMember._id === clubMemberId;
  });

  // useSate for hte for input

  const [selectedStudentName, setSelectedStudentName] = useState(
    clubMembers[0].member
  );
  const [member, setMember] = useState(clubMembers[0].member);
  const [role, setRole] = useState(clubMembers[0].coordinator);

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

  // Change handler funtions

  const handleMemberChange = (event, newValue) => {
    const selectedStudent = newValue ? newValue.value : "";
    setMember(selectedStudent);
    setSelectedStudentName(newValue ? newValue.label : "");
  };

  // submit functions
  const handleSubmit = async (e) => {
    const success = await editClubMemberById(clubMemberId, club, member, role);
    if (success) {
      setMember("");
      setRole("");
      setSelectedStudentName("");
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
      title="Edit Club Member"
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

export default ClubMemberUpdate;
