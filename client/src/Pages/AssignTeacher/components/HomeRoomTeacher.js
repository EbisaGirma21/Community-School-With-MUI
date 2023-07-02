import { Box, Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import SectionContext from "../../../context/SectionContext";
import Datatable from "../../../components/UI/Datatable";
import AssignHRTeacherModal from "./AssignHRTeacherModal";

const tableColumns = [
  { field: "sectionLabel", headerName: "Section", flex: 1, minWidth: 150 },
  {
    field: "home_room_teacher",
    headerName: "Home Room Teacher",
    flex: 1,
    minWidth: 150,
  },
  { field: "noStudent", headerName: "No. Student", flex: 1, minWidth: 150 },
];

function HomeRoomTeacher({ gradeId, acCurriculumId }) {
  const [assignOpen, setAssignOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const { section, fetchSections } = useContext(SectionContext);
  // update local Section state when context Section changes
  useEffect(() => {
    gradeId && fetchSections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gradeId]);

  //  filter section by grade
  const sections = section.filter((sec) => {
    return sec.grade === gradeId && sec.academicCurriculum === acCurriculumId;
  });

  const handleAssignClose = () => {
    setAssignOpen(false);
  };
  const handleAssignOpen = () => {
    setAssignOpen(true);
  };
  // convert Section object to array if necessary
  const tableRows = Array.isArray(sections) ? sections : [sections];

  // toggle delete modal
  let content = "";
  if (assignOpen) {
    content = (
      <AssignHRTeacherModal
        open={assignOpen}
        handleClose={handleAssignClose}
        sectionId={selectedRows[0]}
        acCurriculumId={acCurriculumId}
        gradeId={gradeId}
      />
    );
  }

  return (
    <Box>
      <Box className="flex justify-between p-2 rounded-md border-2 border-gray-300">
        <Box></Box>
        <Button variant="contained" onClick={handleAssignOpen}>
          Assign Teacher
        </Button>
      </Box>
      <Datatable
        // onDelete={handleDelete}
        // onEdit={handleEdit}
        tableColumns={tableColumns}
        key={sections._id}
        tableRows={tableRows}
        setSelectedRows={setSelectedRows}
        getRowId={(row) => row._id || sections.indexOf(row)}
      />
      {content}
    </Box>
  );
}

export default HomeRoomTeacher;
