import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import SectionTable from "./components/SectionTable";
import { useState } from "react";
import SectionCreate from "./components/SectionCreate";

function Section({ acCurriculumId, gradeId }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Box>
        <Box>
          <Box display="flex" justifyContent="flex-end">
            <Button
              disabled={gradeId ? false : true}
              variant="contained"
              onClick={handleOpen}
            >
              <AddIcon /> Register New Section
            </Button>
          </Box>
          <SectionCreate
            open={open}
            handleClose={handleClose}
            acCurriculumId={acCurriculumId}
            gradeId={gradeId}
          />
          <Box>
            <SectionTable acCurriculumId={acCurriculumId} gradeId={gradeId} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Section;
