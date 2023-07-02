import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import { Box } from "@mui/material";
import styled from "@emotion/styled";

const ErrorLabel = styled(Box)(() => ({
  backgroundColor: "#FFF0F1",
  border: "1px solid #e5a9ac",
  padding: "5px",
  borderRadius: "10px",
  color: "#864348",
  marginTop: "10px",
}));

const Modal = (props) => {
  const { title, children, onSubmit, handleClose, open, error, isLoading } =
    props;
  const handleSave = (e) => {
    onSubmit(e);
  };
  return (
    <Box className="">
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ margin: "auto", p: 2 }}
        maxWidth="md"
      >
        {/* Modal Title */}
        <DialogTitle
          sx={{
            backgroundColor: "#5e35b1",
            color: "white",
          }}
          variant="contained"
        >
          {title}
        </DialogTitle>
        {/* Modal Content */}
        <DialogContent className="w-full" dividers sx={{ p: 5 }}>
          {children} {error && <ErrorLabel>{error}</ErrorLabel>}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            sx={{ background: "#5e35b1" }}
          >
            <ClearIcon />
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              handleSave(e);
            }}
            disabled={isLoading}
            variant="contained"
            sx={{ background: "#5e35b1" }}
          >
            <DoneIcon /> Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Modal;
