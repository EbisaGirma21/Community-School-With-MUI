import { Checkbox } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext } from "react";
import RequestContext from "../../../context/RequestContext";

export default function MarkListChecker({
  handleClose,
  open,
  acCurriculumId,
  semesterId,
  gradeId,
  sectionId,
  mark,
}) {
  const { createRequest, approveStudent } = useContext(RequestContext);

  const handleSave = async () => {
    if (semesterId === "average") {
      await approveStudent(mark);
    } else {
      await createRequest(
        acCurriculumId,
        gradeId,
        sectionId,
        semesterId,
        "remarkRequest"
      );
    }
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle variant="contained" id="alert-dialog-title">
          {"Approval Request"}
        </DialogTitle>
        <DialogContent className="flex flex-col justify-start">
          <DialogContentText id="alert-dialog-description">
            {semesterId === "average"
              ? "Are you sure do you want to approve this average roster?"
              : "Are you sure do you want to send this request?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave} autoFocus>
            {semesterId === "average" ? "Approve" : "Send"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
