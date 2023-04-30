import React, { useContext } from "react";
import CurriculumContext from "../../../Context/CurriculumContext";
import Datatable from "../../UI/Datatable/Datatable";

// Curriculum Basic information datatable Column
const tableColumns = [
  { field: "curriculumTitle", headerName: "Title", width: 150 },
  { field: "curriculumYear", headerName: "Curriculum Year", width: 190 },
  { field: "stage", headerName: "Curriculum Stage", width: 190 },
  {
    field: "addmissionClassification",
    headerName: "Classification",
    width: 150,
  },
  { field: "totalMaximumLoad", headerName: "Max Load", width: 150 },
  { field: "subject", headerName: "Subjects", width: 150 },
];

const CurriculumTable = () => {
  const { curriculum } = useContext(CurriculumContext);

  // convert curriculum object to array if necessary
  const tableRows = Array.isArray(curriculum) ? curriculum : [curriculum];

  return (
    <div>
      <Datatable
        tableColumns={tableColumns}
        key={curriculum._id}
        tableRows={tableRows}
        getRowId={(row) => row.id || curriculum.indexOf(row)}
      />
    </div>
  );
};

export default CurriculumTable;
