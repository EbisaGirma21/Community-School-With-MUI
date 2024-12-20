import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import NewStudentContext from "../../../context/NewStudentContext";
import Dropdown from "../../../components/UI/Dropdown";

const registrationTypeOption = [
  { label: "New Student", value: "NOR" },
  // { label: "Transfer Student", value: "TRN" },
];

export default function FromCSV(props) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [registrationType, setRegistrationType] = useState("NOR");
  const { open, handleClose } = props;

  const { fetchNewStudents } = useContext(NewStudentContext);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const fileExtension = selectedFile?.name.split(".").pop().toLowerCase();
    if (fileExtension !== "csv" && fileExtension !== "xlsx") {
      setMessage("Only CSV and XLSX files are allowed.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    // const url =
    //   registrationType === "NOR"
    //     ? "/student/register-file"
    //     : "/student/register-transfer-file";

    try {
      const response = await axios.post("/student/register-file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchNewStudents();
      setMessage(response.data.message || "Students registered successfully.");
      toast.success(response.data.message);
      handleClose();
    } catch (error) {
      setMessage(
        error.response?.data?.error || "Registration failed. Try again."
      );
      toast.error(error.response?.data?.error);
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={handleSubmit} className="space-y-2 ">
          <DialogTitle
            variant="contained"
            id="alert-dialog-title"
            className="text-xl text-white text-center font-bold border-2 shadow-lg bg-[#5e35b1]"
          >
            {"Register Student"}
          </DialogTitle>
          <DialogContent>
            <Box>
              <h2 className="mt-2">
                Student Registration From CSV or XLSX only for new student
              </h2>

              <div className="flex p-2 gap-2">
                {/* <Dropdown
                  label="Registration Type"
                  options={registrationTypeOption}
                  value={registrationType}
                  onChange={(e) => {
                    setRegistrationType(e.target.value);
                  }}
                  width={"50%"}
                /> */}
                <div>
                  <label className="mr-2">Upload File (CSV or Excel):</label>
                  <input type="file" onChange={handleFileChange} />
                </div>
              </div>

              {message && <p className="text-red-400">{message}</p>}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={handleClose}
              className="bg-red-400"
              style={{ backgroundColor: "#e05656" }}
            >
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Register
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
