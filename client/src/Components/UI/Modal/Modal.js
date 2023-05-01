import "./Modal.scss";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";

const Modal = (props) => {
  const { title, children, onSubmit, handleClose, open } = props;
  const handleSave = () => {
    onSubmit();
    handleClose();
  };
  return (
    <div className="dialog-modal">
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
        <DialogContent
          sx={{ padding: 5 }}
         
        >
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            <ClearIcon />
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained">
            <DoneIcon /> Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Modal;
