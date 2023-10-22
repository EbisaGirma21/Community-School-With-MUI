import React, { useContext, useEffect, useState } from "react";
import Table from "../../../components/UI/Table";
import StudentContext from "../../../context/StudentContext";

// Student Basic information datatable Column
const tableColumns = [
  { field: "firstName", headerName: "First Name", flex: 1, minWidth: 150 },
  { field: "middleName", headerName: "Middle Name", flex: 1, minWidth: 150 },
  { field: "lastName", headerName: "Last Name", flex: 1, minWidth: 150 },
  { field: "gender", headerName: "Gender", flex: 1, minWidth: 150 },
  { field: "email", headerName: "Email", flex: 1, minWidth: 150 },
  { field: "birthDate", headerName: "Birth Date", flex: 1, minWidth: 150 },
];

const StudentTable = ({ acSession, acCurriculumId, gradeId, sectionId }) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const { specificStudent, fetchStudentsBySpecifying } =
    useContext(StudentContext);

  // component context

  // update local student state when context student changes
  useEffect(() => {
    sectionId &&
      fetchStudentsBySpecifying(acSession, acCurriculumId, gradeId, sectionId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionId]);

  // convert student object to array if necessary
  const tableRows = sectionId
    ? Array.isArray(specificStudent)
      ? specificStudent
      : [specificStudent]
    : [];

  return (
    <div>
      <Table
        tableColumns={tableColumns}
        key={specificStudent._id}
        tableRows={tableRows}
        setSelectedRows={setSelectedRows}
        getRowId={(row) => row._id || specificStudent.indexOf(row)}
      />
    </div>
  );
};

export default StudentTable;
