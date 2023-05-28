import Tab from "../../components/UI/Tab";
import { Box } from "@mui/material";
import CurriculumTable from "./components/CurriculumTable";
import CurriculumCreate from "./components/CurriculumCreate";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";

import SubjectTable from "../Subject/components/SubjectTable";

const CurriculumTab = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          <SubjectTable />
        </>
      ),
    },
  ];

  return <Tab tab_contents={curriculumTab} />;
};

export default CurriculumTab;
