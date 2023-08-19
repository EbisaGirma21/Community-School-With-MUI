import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext } from "react";
import AcademicSessionContext from "../../../context/AcademicSessionContext";

export default function AcademicSessionDelete(props) {
  const { handleClose, open, academicSessionId } = props;

  const { deleteAcademicSessionById } = useContext(AcademicSessionContext);

  const handleSave = () => {
    deleteAcademicSessionById(academicSessionId);
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
        <DialogTitle
          variant="contained"
          id="alert-dialog-title"
          sx={{ background: "#5E35B1", color: "white", marginBottom: "10px" }}
        >
          {"Delete Academic Session"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure do you want to delete this record?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
