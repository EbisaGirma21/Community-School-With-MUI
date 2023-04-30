import "./Modal.scss";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";

const Modal = ({ title, btnText, children }) => {
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
        <AddIcon />
        {btnText}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        {/* Modal Title */}
        <DialogTitle
          sx={{
            backgroundColor: "#1565c0",
            color: "white",
            borderRadius: 1,
            mb: 2,
          }}
        >
          {title}
        </DialogTitle>

        {/* Modal Content */}
        <DialogContent sx={{ padding: 5 }}>{children}</DialogContent>

        <DialogActions sx={{}}>
          <Button onClick={handleClose} variant="contained">
            <ClearIcon />
            Cancel
          </Button>
          <Button onClick={handleClose} variant="contained">
            <DoneIcon /> Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Modal;
