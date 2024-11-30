import React, { useContext, useEffect, useState } from "react";
import Datatable from "../../../components/UI/Datatable";
import AcademicCurriculumDelete from "./AcademicCurriculumDelete";
import AcademicCurriculumUpdate from "./AcademicCurriculumUpdate";
import AcademicCurriculumContext from "../../../context/AcademicCurriculumContext";
import Dropdown from "../../../components/UI/Dropdown";
import AcademicSessionContext from "../../../context/AcademicSessionContext";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
// import { CustomButton } from "../../../components/UI/StyledCompoments";

import AcademicCurriculumCreate from "./AcademicCurriculumCreate";

// AcademicCurriculum Basic information datatable Column
const tableColumns = [
  {
    field: "curriculumTitle",
    headerName: "Curriculum",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "maxSemester",
    headerName: "Semesters",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "passTresholdAverage",
    headerName: "Pass Treshold",
    flex: 1,
    minWidth: 150,
  },
];

const AcademicCurriculumTable = () => {
  // component states
  const [deleteOpen, setdDeleteOpen] = useState(false);
  const [editOpen, setdEditOpen] = useState(false);
  const [academicCurriculumId, setAcademicCurriculumId] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  // modal constant
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // component context
  const { academicCurriculum, fetchAcademicCurriculumByYear } = useContext(
    AcademicCurriculumContext
  );

  const { academicSession, fetchAcademicSessions } = useContext(
    AcademicSessionContext
  );

  // update local academicCurriculum state when context academicCurriculum changes

  useEffect(() => {
    academicYear && fetchAcademicCurriculumByYear(academicYear);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [academicYear]);

  //   fetch curriculum useEffect
  useEffect(() => {
    fetchAcademicSessions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // toggler funcions
  // funtions open delete modal
  const handleDeleteOpen = () => {
    setdDeleteOpen(true);
  };

  // funtion close delete modal
  const handleDeleteClose = () => {
    setdDeleteOpen(false);
    setAcademicCurriculumId("");
  };

  // delete handler
  const handleDelete = (id) => {
    handleDeleteOpen();
    setAcademicCurriculumId(id);
  };

  // funtions open edit modal
  const handleEditOpen = () => {
    setdEditOpen(true);
  };

  // funtion close Edit modal
  const handleEditClose = () => {
    setdEditOpen(false);
    setAcademicCurriculumId("");
  };

  // edit handler
  const handleEdit = (id) => {
    handleEditOpen();
    setAcademicCurriculumId(id);
  };

  // convert academicCurriculum object to array if necessary
  const tableRows = Array.isArray(academicCurriculum)
    ? academicCurriculum
    : [academicCurriculum];

  let content = "";
  if (deleteOpen) {
    content = (
      <AcademicCurriculumDelete
        open={deleteOpen}
        handleClose={handleDeleteClose}
        academicCurriculumId={academicCurriculumId}
        academicYear={academicYear}
      />
    );
  }
  if (editOpen) {
    content = (
      <AcademicCurriculumUpdate
        open={editOpen}
        handleClose={handleEditClose}
        academicCurriculumId={academicCurriculumId}
      />
    );
  }

  const academicSessionOption = academicSession.map((ac_Session) => ({
    label: ac_Session.academicYear,
    value: ac_Session._id,
  }));

  return (
    <Box>
      <Box sx={{ width: 15 }}>
        <Dropdown
          label="Academic Year"
          options={academicSessionOption}
          value={academicYear}
          onChange={(e) => {
            setAcademicYear(e.target.value);
          }}
          width={"140px"}
        />
      </Box>
      <Box className="create-modal">
        <Button
          onClick={handleOpen}
          variant="contained"
          sx={{ m: 1, background: "#5E35B1" }}
        >
          <AddIcon />
          New
        </Button>
        <AcademicCurriculumCreate
          open={open}
          handleClose={handleClose}
          academicYear={academicYear}
        />
      </Box>
      <Datatable
        onDelete={handleDelete}
        onEdit={handleEdit}
        tableColumns={tableColumns}
        key={academicCurriculum._id}
        tableRows={tableRows}
        setSelectedRows={setSelectedRows}
        getRowId={(row) => row._id || academicCurriculum.indexOf(row)}
      />
      {content}
    </Box>
  );
};

export default AcademicCurriculumTable;
