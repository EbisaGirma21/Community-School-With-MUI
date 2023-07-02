import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext, useEffect, useState } from "react";
import TeacherContext from "../../../context/TeacherContext";
import { Autocomplete, Box, TextField } from "@mui/material";
import SectionContext from "../../../context/SectionContext";

export default function AssignHRTeacherModal(props) {
  const { handleClose, open, subjectId, sectionId, acCurriculumId, gradeId } =
    props;
  const [teacher, setTeacher] = useState("");
  const [selectedTeacherName, setSelectedTeacherName] = useState("");

  // component context
  const { teachers, fetchTeachers } = useContext(TeacherContext);
  const { assignHomeRoomTeacher } = useContext(SectionContext);

  // update local teacher state when context teacher changes
  useEffect(() => {
    fetchTeachers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const teachersOption = teachers
    ? teachers.map((teacher) => ({
        label:
          teacher.gender === "Male"
            ? `Mr. ${teacher.firstName}`
            : `Mrs. ${teacher.firstName}`,
        value: `${teacher._id}`,
      }))
    : [];

  // Change handler functions
  const handleTeacherChange = (event, newValue) => {
    const selectedTeacher = newValue ? newValue.value : "";
    setTeacher(selectedTeacher);

    // Update the selectedTeacherName state
    setSelectedTeacherName(newValue ? newValue.label : "");
  };

  const handleSave = () => {
    assignHomeRoomTeacher(sectionId, teacher, acCurriculumId, gradeId);
    handleClose();
  };

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle variant="contained" id="alert-dialog-title">
          {"Assign Teachers"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Autocomplete
              options={teachersOption}
              value={selectedTeacherName}
              onChange={(event, newValue) =>
                handleTeacherChange(event, newValue)
              }
              freeSolo
              disableClearable
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="dense"
                  label="Teacher Name"
                  type="text"
                  variant="standard"
                  style={{ width: "300px" }}
                />
              )}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
