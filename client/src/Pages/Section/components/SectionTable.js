import React, { useContext, useEffect, useState } from "react";
import Datatable from "../../../components/UI/Datatable";
import SectionDelete from "./SectionDelete";
import SectionUpdate from "./SectionUpdate";
import SectionContext from "../../../context/SectionContext";

// Section Basic information datatable Column
const tableColumns = [
  { field: "sectionLabel", headerName: "Section", flex: 1, minWidth: 150 },
  { field: "homeRoomTeacher", headerName: "HR Teacher", flex: 1, minWidth: 150 },
  { field: "noStudent", headerName: "No. Student", flex: 1, minWidth: 150 },
];

const SectionTable = ({ acCurriculumId, gradeId }) => {
  // component states
  const [deleteOpen, setdDeleteOpen] = useState(false);
  const [editOpen, setdEditOpen] = useState(false);
  const [sectionId, setSectionId] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);


  // component context
  const { section, fetchSections } = useContext(SectionContext);
  // update local Section state when context Section changes
  useEffect(() => {
    gradeId && fetchSections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gradeId]);

  //  filter section by grade
  const sections = section.filter((sec) => {
    return sec.grade === gradeId;
  });

  // funtions open delete modal
  const handleDeleteOpen = () => {
    setdDeleteOpen(true);
  };

  // funtion close delete modal
  const handleDeleteClose = () => {
    setdDeleteOpen(false);
    setSectionId("");
  };

  // delete handler
  const handleDelete = (id) => {
    handleDeleteOpen();
    setSectionId(id);
  };

  // funtions open edit modal
  const handleEditOpen = () => {
    setdEditOpen(true);
  };

  // funtion close Edit modal
  const handleEditClose = () => {
    setdEditOpen(false);
    setSectionId("");
  };

  // edit handler
  const handleEdit = (id) => {
    handleEditOpen();
    setSectionId(id);
  };

  // convert Section object to array if necessary
  const tableRows = Array.isArray(sections) ? sections : [sections];

  // toggle delete modal
  let content = "";
  if (deleteOpen) {
    content = (
      <SectionDelete
        open={deleteOpen}
        handleClose={handleDeleteClose}
        sectionId={sectionId}
      />
    );
  }
  if (editOpen) {
    content = (
      <SectionUpdate
        open={editOpen}
        handleClose={handleEditClose}
        sectionId={sectionId}
      />
    );
  }

  return (
    <div>
      <Datatable
        onDelete={handleDelete}
        onEdit={handleEdit}
        tableColumns={tableColumns}
        key={sections._id}
        tableRows={tableRows}
        setSelectedRows={setSelectedRows}
        getRowId={(row) => row._id || sections.indexOf(row)}
      />
      {content}
    </div>
  );
};

export default SectionTable;
