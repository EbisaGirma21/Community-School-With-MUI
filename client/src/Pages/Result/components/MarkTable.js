import React, { useContext, useEffect, useState } from "react";
import Datatable from "../../../components/UI/Datatable";
import MarkContext from "../../../context/MarkContext";
import SubjectContext from "../../../context/SubjectContext";

const MarkTable = ({ acCurriculumId, curriculumId, gradeId, sectionId }) => {
  // Component contexts
  const { mark, fetchMarks } = useContext(MarkContext);
  const { subject, fetchSubjects } = useContext(SubjectContext);
  const [subjectColumns, setSubjectColumns] = useState([]);

  // Update local mark state when context mark changes
  useEffect(() => {
    sectionId && fetchMarks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionId]);

  useEffect(() => {
    const fetchSubjectColumns = async () => {
      if (subject.length > 0) {
        const columns = subject.map((sub) => ({
          field: sub._id,
          headerName: sub.moduleTitle,
          flex: 1,
          minWidth: 150,
        }));
        setSubjectColumns(columns);
      }
    };

    fetchSubjectColumns();
  }, [subject]);

  useEffect(() => {
    const fetchSubjectData = async () => {
      if (curriculumId && gradeId) {
        await fetchSubjects(curriculumId, gradeId);
      }
    };

    fetchSubjectData();
  }, [curriculumId, gradeId]);

  // Create table columns including subject columns
  const tableColumns = [
    { field: "rollNumber", headerName: "Roll Number", flex: 1, minWidth: 150 },
    { field: "firstName", headerName: "First Name", flex: 1, minWidth: 150 },
    { field: "middleName", headerName: "Middle Name", flex: 1, minWidth: 150 },
    { field: "gender", headerName: "Gender", flex: 1, minWidth: 150 },
    ...subjectColumns,
  ];

  // Convert mark object to array if necessary
  const tableRows = Array.isArray(mark) ? mark : [mark];

  return (
    <div>
      <Datatable
        tableColumns={tableColumns}
        key={mark._id}
        tableRows={tableRows}
        // setSelectedRows={setSelectedRows}
        getRowId={(row) => row._id || mark.indexOf(row)}
      />
      {/* {content} */}
    </div>
  );
};

export default MarkTable;
