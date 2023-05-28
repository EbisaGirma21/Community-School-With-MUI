import React, { useContext, useEffect, useState } from "react";
import Datatable from "../../../components/UI/Datatable";
import SubjectDelete from "./SubjectDelete";
import SubjectUpdate from "./SubjectUpdate";
import SubjectContext from "../../../context/SubjectContext";
import CurriculumContext from "../../../context/CurriculumContext";
import GradeContext from "../../../context/GradeContext";
import { Box, Button } from "@mui/material";
import Dropdown from "../../../components/UI/Dropdown";
import AddIcon from "@mui/icons-material/Add";
import SubjectCreate from "./SubjectCreate";

// Subject Basic information datatable Column
const tableColumns = [
  { field: "moduleTitle", headerName: "Subject", width: 150 },
  { field: "subjectLoad", headerName: "Subject Load", width: 150 },
];

const SubjectTable = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Subject Information input form
  const [curriculumId, setCurriculumId] = useState("");
  const [gradeId, setGradeId] = useState("");
  const { curriculum, fetchCurriculums } = useContext(CurriculumContext);
  const { grade, fetchGradeByStage } = useContext(GradeContext);
  const { subject, fetchSubjects } = useContext(SubjectContext);

  //   fetch curriculum useEffect
  useEffect(() => {
    fetchCurriculums();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //   Curruculum to dropdown
  const curriculumOption = curriculum.map((curr) => ({
    label: `${curr.curriculumTitle} ${curr.curriculumYear} (${curr.stage} - ${curr.classification})`,
    value: curr._id,
  }));

  const selectedCurriculum = !curriculumId
    ? []
    : curriculum.filter((SelCurr) => {
        return SelCurr._id === curriculumId;
      });

  //   fetch curriculum useEffect
  useEffect(() => {
    curriculumId && fetchGradeByStage(selectedCurriculum[0].stage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curriculumId]);
  curriculumId && console.log();
  const gradeOption = !curriculumId
    ? [{ label: "Not found", value: 1 }]
    : grade.map((gr) => ({
        label: `Grade - ${gr.level}`,
        value: gr._id,
      }));

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
  const tableRows = Array.isArray(subject) ? subject : [subject];

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
        <Box sx={{ display: "flex" }}>
          <Dropdown
            label="Curriculum"
            options={curriculumOption}
            value={curriculumId}
            onChange={(e) => {
              setGradeId("");
              setCurriculumId(e.target.value);
            }}
            width={"250px"}
          />
          <Dropdown
            label="Grade"
            options={gradeOption}
            value={gradeId}
            onChange={(e) => {
              setGradeId(e.target.value);
            }}
            width={"80px"}
          />
        </Box>
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
        getRowId={(row) => row._id || subject.indexOf(row)}
      />
      {content}
    </Box>
  );
};

export default SubjectTable;
