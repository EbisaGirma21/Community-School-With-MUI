import { useContext, useEffect } from "react";
import Datatable from "../../../components/UI/Datatable";
import ElligibleStudentContext from "../../../context/ElligibleContext";

// NewStudent Basic information datatable Column
const tableColumns = [
  { field: "firstName", headerName: "First Name", width: 150 },
  { field: "middleName", headerName: "Middle Name", width: 150 },
  { field: "lastName", headerName: "Last Name", width: 150 },
  { field: "gender", headerName: "Gender", width: 150 },
];

const EnrollmentTable = ({ displayed, gradeId }) => {
  // component states

  const { elligibleStudent, fetchElligibleStudents } = useContext(
    ElligibleStudentContext
  );

  // update local newStudent state when context newStudent changes
  useEffect(() => {
    gradeId && fetchElligibleStudents(gradeId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gradeId]);

  const tableRows = displayed
    ? Array.isArray(elligibleStudent)
      ? elligibleStudent
      : [elligibleStudent]
    : [];

  return (
    <div>
      <Datatable
        tableColumns={tableColumns}
        tableRows={tableRows}
        key={elligibleStudent._id}
        getRowId={(row) => row._id || elligibleStudent.indexOf(row)}
      />
    </div>
  );
};

export default EnrollmentTable;
