import React, { useContext, useEffect, useState } from "react";
import Datatable from "../../../components/UI/Datatable";
import ClubMemberDelete from "./ClubMemberDelete";
import ClubMemberUpdate from "./ClubMemberUpdate";
import ClubMemberContext from "../../../context/ClubMemberContext";

// Club Basic information datatable Column
const tableColumns = [
  { field: "First Name", headerName: "fistName", flex: 1, minWidth: 150 },
  { field: "Middle Name", headerName: "middleName", flex: 1, minWidth: 150 },
  { field: "Last Name", headerName: "LastName", flex: 1, minWidth: 150 },
  { field: "Grade", headerName: "grade", flex: 1, minWidth: 150 },
  {
    field: "Role",
    headerName: "role",
    flex: 1,
    minWidth: 150,
  },
];

const ClubTable = () => {
  // component states
  const [deleteOpen, setdDeleteOpen] = useState(false);
  const [editOpen, setdEditOpen] = useState(false);
  const [clubMemberId, setClubMemberId] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  // component context
  const { clubMember, fetchClubMembers } = useContext(ClubMemberContext);

  // update local club state when context club changes
  useEffect(() => {
    fetchClubMembers();
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
    setClubMemberId("");
  };

  // delete handler
  const handleDelete = (id) => {
    handleDeleteOpen();
    setClubMemberId(id);
  };

  // funtions open edit modal
  const handleEditOpen = () => {
    setdEditOpen(true);
  };

  // funtion close Edit modal
  const handleEditClose = () => {
    setdEditOpen(false);
    setClubMemberId("");
  };

  // edit handler
  const handleEdit = (id) => {
    handleEditOpen();
    setClubMemberId(id);
  };

  // convert club object to array if necessary
  const tableRows = Array.isArray(clubMember) ? clubMember : [clubMember];

  // toggle delete modal
  let content = "";
  if (deleteOpen) {
    content = (
      <ClubMemberDelete
        open={deleteOpen}
        handleClose={handleDeleteClose}
        clubMemberId={clubMemberId}
      />
    );
  }
  if (editOpen) {
    content = (
      <ClubMemberUpdate
        open={editOpen}
        handleClose={handleEditClose}
        clubMemberId={clubMemberId}
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
        key={clubMember._id}
        tableRows={tableRows}
        setSelectedRows={setSelectedRows}
        getRowId={(row) => row._id || clubMember.indexOf(row)}
      />
      {content}
    </div>
  );
};

export default ClubTable;
