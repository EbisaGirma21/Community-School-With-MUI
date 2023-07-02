import { useContext, useEffect, useState } from "react";
import Datatable from "../../../components/UI/Datatable";
import EnrollmentContext from "../../../context/EnrollmentContext";

// NewStudent Basic information datatable Column
const tableColumns = [
  { field: "firstName", headerName: "First Name", flex: 1, minWidth: 150  },
  { field: "middleName", headerName: "Middle Name", flex: 1, minWidth: 150  },
  { field: "lastName", headerName: "Last Name", flex: 1, minWidth: 150  },
  { field: "gender", headerName: "Gender", flex: 1, minWidth: 150  },
];

const EnrollmentTable = ({ displayed, gradeId }) => {
  // component states
  const [selectedRows, setSelectedRows] = useState([]);


  const { elligibleStudent, fetchElligibleStudents } =
    useContext(EnrollmentContext);

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
        setSelectedRows={setSelectedRows}
        getRowId={(row) => row._id || elligibleStudent.indexOf(row)}
      />
    </div>
  );
};

export default EnrollmentTable;
