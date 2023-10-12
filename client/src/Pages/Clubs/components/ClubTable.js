import React, { useContext, useEffect, useState } from "react";
import Datatable from "../../../components/UI/Datatable";
import ClubDelete from "./ClubDelete";
import ClubUpdate from "./ClubUpdate";
import ClubContext from "../../../context/ClubContext";

// Club Basic information datatable Column
const tableColumns = [
  { field: "clubName", headerName: "Title", flex: 1, minWidth: 150 },
  { field: "leaderStudent", headerName: "Leader", flex: 1, minWidth: 150 },
  {
    field: "coordinatorTeacher",
    headerName: "Coordinator",
    flex: 1,
    minWidth: 150,
  },
];

const ClubTable = () => {
  // component states
  const [deleteOpen, setdDeleteOpen] = useState(false);
  const [editOpen, setdEditOpen] = useState(false);
  const [clubId, setClubId] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  // component context
  const { club, fetchClubs } = useContext(ClubContext);

  // update local club state when context club changes
  useEffect(() => {
    fetchClubs();
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
    setClubId("");
  };

  // delete handler
  const handleDelete = (id) => {
    handleDeleteOpen();
    setClubId(id);
  };

  // funtions open edit modal
  const handleEditOpen = () => {
    setdEditOpen(true);
  };

  // funtion close Edit modal
  const handleEditClose = () => {
    setdEditOpen(false);
    setClubId("");
  };

  // edit handler
  const handleEdit = (id) => {
    handleEditOpen();
    setClubId(id);
  };

  // convert club object to array if necessary
  const tableRows = Array.isArray(club) ? club : [club];

  // toggle delete modal
  let content = "";
  if (deleteOpen) {
    content = (
      <ClubDelete
        open={deleteOpen}
        handleClose={handleDeleteClose}
        clubId={clubId}
      />
    );
  }
  if (editOpen) {
    content = (
      <ClubUpdate
        open={editOpen}
        handleClose={handleEditClose}
        clubId={clubId}
      />
    );
  }

  console.log(tableRows);

  return (
    <div>
      <Datatable
        onDelete={handleDelete}
        onEdit={handleEdit}
        tableColumns={tableColumns}
        key={club._id}
        tableRows={tableRows}
        setSelectedRows={setSelectedRows}
        getRowId={(row) => row._id || club.indexOf(row)}
      />
      {content}
    </div>
  );
};

export default ClubTable;
