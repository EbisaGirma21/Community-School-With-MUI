import React, { useContext, useEffect, useState } from "react";
import Datatable from "../../../components/UI/Datatable";
import SubjectDelete from "./SubjectDelete";
import SubjectUpdate from "./SubjectUpdate";
import SubjectContext from "../../../context/SubjectContext";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SubjectCreate from "./SubjectCreate";

// Subject Basic information datatable Column
const tableColumns = [
  { field: "moduleTitle", headerName: "Subject", flex: 1, minWidth: 150 },
  { field: "subjectLoad", headerName: "Subject Load", flex: 1, minWidth: 150 },
];

const SubjectTable = ({ curriculumId, gradeId }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Subject Information input form
  const [selectedRows, setSelectedRows] = useState([]);

  const { subject, fetchSubjects } = useContext(SubjectContext);

  // component states
  const [deleteOpen, setdDeleteOpen] = useState(false);
  const [editOpen, setdEditOpen] = useState(false);
  const [subjectId, setSubjectId] = useState("");

  // update local subject state when context subject changes
  useEffect(() => {
    gradeId && fetchSubjects(curriculumId, gradeId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gradeId]);

  // toggler funcions
  // funtions open delete modal
  const handleDeleteOpen = () => {
    setdDeleteOpen(true);
  };

  // funtion close delete modal
  const handleDeleteClose = () => {
    setdDeleteOpen(false);
    setSubjectId("");
  };

  // delete handler
  const handleDelete = (id) => {
    handleDeleteOpen();
    setSubjectId(id);
  };

  // funtions open edit modal
  const handleEditOpen = () => {
    setdEditOpen(true);
  };

  // funtion close Edit modal
  const handleEditClose = () => {
    setdEditOpen(false);
    setSubjectId("");
  };

  // edit handler
  const handleEdit = (id) => {
    handleEditOpen();
    setSubjectId(id);
  };

  // convert subject object to array if necessary
  const tableRows = gradeId
    ? Array.isArray(subject)
      ? subject
      : [subject]
    : [];

  // toggle delete modal
  let content = "";
  if (deleteOpen) {
    content = (
      <SubjectDelete
        subjectId={subjectId}
        curriculumId={curriculumId}
        gradeId={gradeId}
        open={deleteOpen}
        handleClose={handleDeleteClose}
      />
    );
  }
  if (editOpen) {
    content = (
      <SubjectUpdate
        open={editOpen}
        handleClose={handleEditClose}
        subjectId={subjectId}
        curriculumId={curriculumId}
        gradeId={gradeId}
      />
    );
  }

  return (
    <Box sx={{}}>
      <Box
        sx={{
          borderRadius: 1,
          width: "100%",
        }}
      >
        <Button
          disabled={gradeId ? false : true}
          onClick={handleOpen}
          variant="contained"
          sx={{ m: 1, background: "#1E88E5" }}
        >
          <AddIcon />
          Add Subjects
        </Button>
        <SubjectCreate
          open={open}
          handleClose={handleClose}
          curriculumId={curriculumId}
          gradeId={gradeId}
        />
      </Box>

      <Datatable
        onDelete={handleDelete}
        onEdit={handleEdit}
        tableColumns={tableColumns}
        key={subject._id}
        tableRows={tableRows}
        setSelectedRows={setSelectedRows}
        getRowId={(row) => row._id || subject.indexOf(row)}
      />
      {content}
    </Box>
  );
};

export default SubjectTable;
