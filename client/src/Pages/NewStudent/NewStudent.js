import { Box, Button } from "@mui/material";
import { useContext, useState } from "react";
import NewStudentTable from "./components/NewStudentTable";
import NewStudentCreate from "./components/NewStudentCreate";
import AddIcon from "@mui/icons-material/Add";
import NewStudentContext from "../../context/NewStudentContext";
import FromCSV from "../Registration/components/FromCSV";

const NewStudent = () => {
  const [open, setOpen] = useState(false);
  const [openRegistration, setOpenRegistration] = useState(false);
  const { setError, setIsLoading } = useContext(NewStudentContext);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleOpenRegistration = () => {
    setOpenRegistration(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsLoading(null);
    setError(null);
  };
  const handleCloseRegistration = () => {
    setOpenRegistration(false);
    setIsLoading(null);
    setError(null);
  };

  let content = "";
  if (openRegistration) {
    content = (
      <FromCSV open={openRegistration} handleClose={handleCloseRegistration} />
    );
  }

  return (
    <Box>
      {content}
      <Box>
        <Box className="w-full p-2 flex justify-between ">
          <Button variant="contained" onClick={handleOpenRegistration}>
            <AddIcon /> Register From CSV
          </Button>
          <Button variant="contained" onClick={handleOpen}>
            <AddIcon /> Register New Student
          </Button>
        </Box>
        <NewStudentCreate open={open} handleClose={handleClose} />
      </Box>
      <NewStudentTable />
    </Box>
  );
};

export default NewStudent;
