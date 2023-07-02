import React, { useContext, useEffect, useState } from "react";
import EnrollmentTable from "./components/EnrollementTable";
import { Box, Button } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import AddIcon from "@mui/icons-material/Add";
import SectionContext from "../../context/SectionContext";
import Dropdown from "../../components/UI/Dropdown";
import EnrollDialog from "./components/EnrollDialog";
import EnrollmentContext from "../../context/EnrollmentContext";

const Enrollement = ({ acCurriculumId, gradeId }) => {
  const [sectionId, setSectionId] = useState("");
  const [displayed, setDisplayed] = useState(false);
  const [enrollOpen, setdEnrollOpen] = useState(false);

  // context
  const { section, fetchSections } = useContext(SectionContext);
  const { elligibleStudent, enrollStudents } = useContext(EnrollmentContext);

  // funtions open enroll modal
  const handleEnrollOpen = () => {
    setdEnrollOpen(true);
  };

  // funtion close Enroll modal
  const handleEnrollClose = () => {
    setdEnrollOpen(false);
  };

  // Enroll handler
  const handleEnroll = (id) => {
    handleEnrollOpen();
  };

  // update local Section state when context Section changes
  useEffect(() => {
    gradeId && fetchSections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gradeId]);

  //  filter section by grade
  const sections = section.filter((sec) => {
    return sec.grade === gradeId && sec.academicCurriculum === acCurriculumId;
  });

  const sectionOption = !gradeId
    ? [{ label: "Not found", value: 1 }]
    : sections.map((sec) => ({
        label: `Section - ${sec.sectionLabel}`,
        value: sec._id,
      }));

  const handleEnrollStudent = () => {
    enrollStudents(elligibleStudent, gradeId, sectionId, acCurriculumId);
    // console.log(elligibleStudent, gradeId, sectionId, acCurriculumId)
  };
  let content = "";
  if (enrollOpen) {
    content = (
      <EnrollDialog
        open={enrollOpen}
        handleClose={handleEnrollClose}
        handleEnrollStudent={handleEnrollStudent}
      />
    );
  }

  return (
    <Box>
      {content}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: 1,
          border: "1px solid #dbdde0",
          borderRadius: "10px",
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            setDisplayed(!displayed);
          }}
          disabled={gradeId ? false : true}
        >
          <DoneIcon /> Display Elligible Students
        </Button>

        <Box sx={{ display: "flex" }}>
          <Dropdown
            label="Section"
            options={sectionOption}
            value={sectionId}
            onChange={(e) => {
              setSectionId(e.target.value);
            }}
            width={"80px"}
          />
          <Button
            variant="contained"
            disabled={sectionId ? false : true}
            onClick={() => {
              handleEnrollOpen();
            }}
          >
            <AddIcon />
            Enrol Elligible Students
          </Button>
        </Box>
      </Box>
      <EnrollmentTable displayed={displayed} gradeId={gradeId} />
    </Box>
  );
};

export default Enrollement;
