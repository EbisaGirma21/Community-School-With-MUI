import React, { useContext, useEffect, useState } from "react";
import EnrollmentTable from "./components/EnrollementTable";
import { Box, Button } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import AddIcon from "@mui/icons-material/Add";
import SectionContext from "../../context/SectionContext";
import Dropdown from "../../components/UI/Dropdown";
import EnrollDialog from "./components/EnrollDialog";
import EnrollmentContext from "../../context/EnrollmentContext";
import { toast } from "react-toastify";

const Enrollement = ({ acCurriculumId, gradeId }) => {
  const [sectionId, setSectionId] = useState("");
  const [displayed, setDisplayed] = useState(false);
  const [enrollOpen, setdEnrollOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

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
    setDisplayed(false);
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

  const handleEnrollStudent = async (e) => {
    const filteredElligibleStudent = elligibleStudent.filter((student) => {
      return selectedRows.includes(student._id);
    });

    const success = await enrollStudents(
      filteredElligibleStudent,
      gradeId,
      sectionId,
      acCurriculumId
    );
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
            gradeId ? setDisplayed(true) : toast.warning("No selected grade.");
          }}
        >
          <DoneIcon /> Display Elligible Students
        </Button>

        <Box className="flex gap-4">
          <Dropdown
            label="Section"
            options={sectionOption}
            value={sectionId}
            onChange={(e) => {
              setSectionId(e.target.value);
            }}
            width={"100px"}
          />
          <Button
            variant="contained"
            onClick={() => {
              sectionId
                ? selectedRows.length !== 0
                  ? handleEnrollOpen()
                  : toast.warning("No  selected student.")
                : toast.warning("No  selected section.");
            }}
          >
            <AddIcon />
            Enrol Elligible Students
          </Button>
        </Box>
      </Box>
      <EnrollmentTable
        displayed={displayed}
        gradeId={gradeId}
        setSelectedRows={setSelectedRows}
      />
    </Box>
  );
};

export default Enrollement;
