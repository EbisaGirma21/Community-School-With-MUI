import Tab from "../../../components/UI/Tab";
import { Box } from "@mui/material";
import CurriculumTable from "./CurriculumTable";
import CurriculumCreate from "./CurriculumCreate";
import { useContext, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import Subject from "../../Subject/Subject";
import AssessmentWeight from "../../AssessmentWeight/AssesmentWeight";
import CurriculumContext from "../../../context/CurriculumContext";

const CurriculumTab = () => {
  const { setError, setIsLoading } = useContext(CurriculumContext);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsLoading(null);
    setError(null);
  };

  // The information passed to tab of curriculum
  const curriculumTab = [
    {
      id: "1",
      label: "Basic info",
      value: "1",
      content: (
        <Box>
          <Box>
            <Button
              onClick={handleOpen}
              variant="contained"
              sx={{ background: "#1E88E5" }}
            >
              <AddIcon />
              New
            </Button>
            <CurriculumCreate open={open} handleClose={handleClose} />
            <Box>
              <CurriculumTable />
            </Box>
          </Box>
        </Box>
      ),
    },
    {
      id: "2",
      label: "Subjects",
      value: "2",
      content: (
        <>
          <Subject />
        </>
      ),
    },
    {
      id: "3",
      label: "Assessment Weight",
      value: "3",
      content: (
        <>
          <AssessmentWeight />
        </>
      ),
    },
  ];

  return <Tab tab_contents={curriculumTab} />;
};

export default CurriculumTab;
