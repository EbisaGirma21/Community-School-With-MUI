import "./Modal.scss";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";

const Modal = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="dialog-modal">
      <Button
        onClick={handleClickOpen}
        variant="contained"
        className="add__button"
      >
        <AddIcon /> New
      </Button>
      <Dialog open={open} onClose={handleClose} className="dialog-modal__box">
        <DialogTitle>New Accadamic Session</DialogTitle>
        <DialogContent className="dialog-modal__box">
          <TextField
            autoFocus
            margin="dense"
            id="year"
            label="Academic Year"
            type="number"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            <ClearIcon />
            Cancel
          </Button>
          <Button onClick={handleClose}>
            <DoneIcon /> Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Modal;
