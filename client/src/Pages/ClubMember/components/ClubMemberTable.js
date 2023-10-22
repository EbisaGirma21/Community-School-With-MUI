import React, { useContext, useEffect, useState } from "react";
import Datatable from "../../../components/UI/Datatable";
import ClubMemberDelete from "./ClubMemberDelete";
import ClubMemberUpdate from "./ClubMemberUpdate";
import ClubMemberContext from "../../../context/ClubMemberContext";

// Club Basic information datatable Column
const tableColumns = [
  { field: "firstName", headerName: "First Name", flex: 1, minWidth: 150 },
  { field: "middleName", headerName: "Middle Name", flex: 1, minWidth: 150 },
  { field: "lastName", headerName: "Last Name", flex: 1, minWidth: 150 },
  { field: "grade", headerName: "Grade", flex: 1, minWidth: 150 },
  {
    field: "role",
    headerName: "Role",
    flex: 1,
    minWidth: 150,
  },
];

const ClubTable = ({ clubId }) => {
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

  const filteredClubMembers = clubId
    ? clubMember.filter((member) => {
        return member.club === clubId;
      })
    : [];
  // convert club object to array if necessary
  const tableRows = Array.isArray(filteredClubMembers)
    ? filteredClubMembers
    : [filteredClubMembers];

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
        clubId={clubId}
      />
    );
  }

  return (
    <div>
      <Datatable
        onDelete={handleDelete}
        onEdit={handleEdit}
        tableColumns={tableColumns}
        key={filteredClubMembers._id}
        tableRows={tableRows}
        setSelectedRows={setSelectedRows}
        getRowId={(row) => row._id || filteredClubMembers.indexOf(row)}
      />
      {content}
    </div>
  );
};

export default ClubTable;
