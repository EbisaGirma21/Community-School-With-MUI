import React, { useContext, useEffect, useState } from "react";
import Datatable from "../../../components/UI/Datatable";

// Student Basic information datatable Column
const tableColumns = [
  { field: "firstName", headerName: "First Name", flex: 1, minWidth: 150 },
  { field: "middleName", headerName: "Middle Name", flex: 1, minWidth: 150 },
  { field: "lastName", headerName: "Last Name", flex: 1, minWidth: 150 },
  { field: "gender", headerName: "Gender", flex: 1, minWidth: 150 },
  { field: "email", headerName: "Email", flex: 1, minWidth: 150 },
  { field: "birthDate", headerName: "Birth Date", flex: 1, minWidth: 150 },
];

const StudentTable = ({ acCurriculumId, gradeId, sectionId }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [student, setStudent] = useState([]);

  // component context

  // update local student state when context student changes
  //   useEffect(() => {
  //     fetchStudents();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  // convert student object to array if necessary
  const tableRows = Array.isArray(student) ? student : [student];

  return (
    <div>
      <Datatable
        tableColumns={tableColumns}
        key={student._id}
        tableRows={tableRows}
        setSelectedRows={setSelectedRows}
        getRowId={(row) => row._id || student.indexOf(row)}
      />
    </div>
  );
};

export default StudentTable;
