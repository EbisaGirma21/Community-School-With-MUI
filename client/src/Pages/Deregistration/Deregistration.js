import React, { useContext, useEffect, useState } from "react";
import Table from "../../components/UI/Table";
import { toast } from "react-toastify";
import { Box, Button } from "@mui/material";
import DeregisterDialog from "./components/DeregisterDialog";
import Dropdown from "../../components/UI/Dropdown";
import RemoveIcon from "@mui/icons-material/Remove";
import SectionContext from "../../context/SectionContext";
import StudentContext from "../../context/StudentContext";
import EnrollmentContext from "../../context/EnrollmentContext";

// Student Basic information datatable Column
const tableColumns = [
  { field: "firstName", headerName: "First Name", flex: 1, minWidth: 150 },
  { field: "middleName", headerName: "Middle Name", flex: 1, minWidth: 150 },
  { field: "lastName", headerName: "Last Name", flex: 1, minWidth: 150 },
  { field: "gender", headerName: "Gender", flex: 1, minWidth: 150 },
  { field: "email", headerName: "Email", flex: 1, minWidth: 150 },
  { field: "birthDate", headerName: "Birth Date", flex: 1, minWidth: 150 },
];

const Deregistration = ({ acSession, acCurriculumId, gradeId }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [sectionId, setSectionId] = useState("");
  const [isDeredistered, setIsDeredistered] = useState(false);
  const [deredisterOpen, setDeregisterOpen] = useState(false);

  const { section, fetchSections } = useContext(SectionContext);
  const { deregisterStudents } = useContext(EnrollmentContext);

  useEffect(() => {
    gradeId && fetchSections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gradeId]);

  const handleDeregisterOpen = () => {
    setDeregisterOpen(true);
  };

  // funtion close Deregister modal
  const handleDeregisterClose = () => {
    setDeregisterOpen(false);
  };

  //  filter section by grade
  const sections = section.filter((sec) => {
    return sec.grade === gradeId && sec.academicCurriculum === acCurriculumId;
  });

  const sectionOption = !gradeId
    ? [{ label: "Not found", value: 1 }]
    : sections.map((sec) => ({
        label: `Section - ${sec.sectionLabel}`,
        value: sec._id,
      }));

  const { specificStudent, fetchStudentsBySpecifying } =
    useContext(StudentContext);

  // component context

  // update local student state when context student changes
  useEffect(() => {
    sectionId &&
      fetchStudentsBySpecifying(acSession, acCurriculumId, gradeId, sectionId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionId, isDeredistered]);

  // convert student object to array if necessary
  const tableRows = sectionId
    ? Array.isArray(specificStudent)
      ? specificStudent
      : [specificStudent]
    : [];

  const handleDeregisterStudent = async (e) => {
    const success = await deregisterStudents(
      selectedRows,
      gradeId,
      sectionId,
      acCurriculumId
    );

    setIsDeredistered(success);
  };

  let content = "";
  if (deredisterOpen) {
    content = (
      <DeregisterDialog
        open={deredisterOpen}
        handleClose={handleDeregisterClose}
        handleDeregisterStudent={handleDeregisterStudent}
      />
    );
  }

  return (
    <div>
      <Box>
        {content}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 1,
            border: "1px solid #dbdde0",
            borderRadius: "10px",
          }}
        >
          <Box className="flex gap-4 justify-between w-full">
            <Dropdown
              label="Section"
              options={sectionOption}
              value={sectionId}
              onChange={(e) => {
                setSectionId(e.target.value);
              }}
              width={"100px"}
            />
            <Button
              variant="contained"
              onClick={() => {
                sectionId
                  ? selectedRows.length !== 0
                    ? handleDeregisterOpen()
                    : toast.warning("No  selected student.")
                  : toast.warning("No  selected section.");
              }}
            >
              <RemoveIcon /> Deregister selected Student
            </Button>
          </Box>
        </Box>
        <Table
          tableColumns={tableColumns}
          key={specificStudent._id}
          tableRows={tableRows}
          setSelectedRows={setSelectedRows}
          getRowId={(row) => row._id || specificStudent.indexOf(row)}
        />
      </Box>
    </div>
  );
};

export default Deregistration;
