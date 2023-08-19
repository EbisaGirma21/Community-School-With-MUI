import { Box, Button, IconButton } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import SectionContext from "../../../context/SectionContext";
import Dropdown from "../../../components/UI/Dropdown";
import AssignTeacherModal from "./AssignTeacherModal";
import { toast } from "react-toastify";
import Table from "../../../components/UI/Table";

const tableColumns = [
  { field: "moduleTitle", headerName: "Subject", flex: 1, minWidth: 150 },
  { field: "teacherName", headerName: "Teacher", flex: 1, minWidth: 150 },
  { field: "subjectLoad", headerName: "SubjectLoad", flex: 1, minWidth: 150 },
];

function SubjectTeacher({ gradeId, acCurriculumId }) {
  const [assignOpen, setAssignOpen] = useState(false);
  const [sectionId, setSectionId] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  const { section, fetchSections, fetchSectionSubject, sectionSubject } =
    useContext(SectionContext);

  // update local Section state when context Section changes
  useEffect(() => {
    gradeId && fetchSections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gradeId]);

  useEffect(() => {
    sectionId && fetchSectionSubject(acCurriculumId, gradeId, sectionId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionId]);

  //  filter section by grade
  const sections = section.filter((sec) => {
    return sec.grade === gradeId && sec.academicCurriculum === acCurriculumId;
  });

  //   assign modal handler

  const handleAssignClose = () => {
    setAssignOpen(false);
  };
  const handleAssignOpen = () => {
    if (selectedRows.length === 0) {
      toast.warning("No selected subject!");
    } else {
      setAssignOpen(true);
    }
  };

  const sectionOption = !gradeId
    ? [{ label: "Not found", value: 1 }]
    : sections.map((sec) => ({
        label: `Section - ${sec.sectionLabel}`,
        value: sec._id,
      }));

  // convert Section object to array if necessary
  const tableRows = sectionId
    ? Array.isArray(sectionSubject)
      ? sectionSubject
      : [sectionSubject]
    : [];

  // toggle delete modal
  let content = "";
  if (assignOpen) {
    content = (
      <AssignTeacherModal
        open={assignOpen}
        handleClose={handleAssignClose}
        subjectId={selectedRows[0]}
        sectionId={sectionId}
        acCurriculumId={acCurriculumId}
        gradeId={gradeId}
      />
    );
  }

  return (
    <Box>
      <Box className="flex justify-between p-2 rounded-md border-2 border-gray-300">
        <Dropdown
          label="Section"
          options={sectionOption}
          value={sectionId}
          onChange={(e) => {
            setSectionId(e.target.value);
          }}
          width={"100px"}
        />
        <Button variant="contained" onClick={handleAssignOpen}>
          Assign Teacher
        </Button>
      </Box>

      <Table
       
        tableColumns={tableColumns}
        key={sectionSubject._id}
        tableRows={tableRows}
        setSelectedRows={setSelectedRows}
        getRowId={(row) => row._id || sectionSubject.indexOf(row)}
      />
      {content}
    </Box>
  );
}

export default SubjectTeacher;
