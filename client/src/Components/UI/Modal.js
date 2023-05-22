import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import { Box } from "@mui/material";

const Modal = (props) => {
  const { title, children, onSubmit, handleClose, open } = props;
  const handleSave = () => {
    onSubmit();
    handleClose();
  };
  return (
    <Box sx={{ margin: "10px" }}>
      <Dialog open={open} onClose={handleClose} >
        {/* Modal Title */}
        <DialogTitle
          sx={{
            backgroundColor: "#1E88E5",
            color: "white",
            mb: 2,
          }}
          variant="contained"
        >
          {title}
        </DialogTitle>
        {/* Modal Content */}
        <DialogContent sx={{ padding: 5 }}>{children}</DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            sx={{ background: "#1E88E5" }}
          >
            <ClearIcon />
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{ background: "#1E88E5" }}
          >
            <DoneIcon /> Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Modal;
