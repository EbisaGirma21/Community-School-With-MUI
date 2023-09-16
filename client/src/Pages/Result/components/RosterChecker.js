import { Checkbox } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function RosterChecker(props) {
  const { handleClose, open } = props;

  const handleSave = () => {
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
            Are you sure do you want to send this request?
          </DialogContentText>
        </DialogContent>
        <Checkbox />
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave} autoFocus>
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
