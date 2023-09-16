import React, { useContext, useEffect, useState } from "react";
import Modal from "../../../components/UI/Modal";
import { TextField } from "@mui/material";
import AcademicCurriculumContext from "../../../context/AcademicCurriculumContext";
import Dropdown from "../../../components/UI/Dropdown";
import CurriculumContext from "../../../context/CurriculumContext";

const AcademicCurriculumUpdate = (props) => {
  const { handleClose, open, academicCurriculumId } = props;

  //   context inclusiion
  const { editAcademicCurriculumById, academicCurriculum, error, isLoading } =
    useContext(AcademicCurriculumContext);
  const { curriculum, fetchCurriculums } = useContext(CurriculumContext);

  //   fetch curriculum useEffect
  useEffect(() => {
    fetchCurriculums();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //   Curruculum to dropdown
  const curriculumOption = curriculum.map((curr) => ({
    label: `${curr.curriculumTitle} ${curr.curriculumYear} (${curr.stage} - ${curr.classification})`,
    value: curr._id,
  }));

  const academicCurriculums = academicCurriculum.filter(
    (academicCurriculum) => {
      return academicCurriculum._id === academicCurriculumId;
    }
  );

  // useSate for hte for input
  const [academicYear, setAcademicYear] = useState(
    academicCurriculums[0].academicSession
  );
  const [curriculumId, setCurriculumId] = useState(
    academicCurriculums[0].curriculumId
  );
  const [maxSemester, setMaxSemester] = useState(
    academicCurriculums[0].maxSemester
  );
  const [passTresholdAverage, setPassTresholdAverage] = useState(
    academicCurriculums[0].passTresholdAverage
  );

  // Change handler funtions
  const handlePassTresholdAverageChange = (e) => {
    setPassTresholdAverage(e.target.value);
  };
  const handleMaxSemesterChange = (e) => {
    setMaxSemester(e.target.value);
  };
  // submit functions
  const handleSubmit = async (e) => {
    const success = editAcademicCurriculumById(
      academicCurriculumId,
      academicYear,
      curriculumId,
      passTresholdAverage,
      maxSemester
    );
    if (success) {
      setAcademicYear("");
      setCurriculumId("");
      setPassTresholdAverage("");
      setMaxSemester("");
      handleClose("");
    }
  };

  return (
    <Modal
      title="Edit AcademicCurriculum"
      btnText="New"
      onSubmit={handleSubmit}
      open={open}
      handleClose={handleClose}
      error={error}
      isLoading={isLoading}
    >
      <form style={{ display: "inline-grid", padding: "10px" }}>
        <Dropdown
          label="Curriculum"
          options={curriculumOption}
          value={curriculumId}
          onChange={(e) => {
            setCurriculumId(e.target.value);
          }}
          width={"100%"}
        />
        <TextField
          margin="dense"
          label="Maximun Semister"
          type="number"
          sx={{ minWidth: 300 }}
          variant="standard"
          value={maxSemester}
          onChange={handleMaxSemesterChange}
        />
        <TextField
          margin="dense"
          label="Treshold Average to pass"
          type="number"
          sx={{ minWidth: 300 }}
          variant="standard"
          value={passTresholdAverage}
          onChange={handlePassTresholdAverageChange}
        />
      </form>
    </Modal>
  );
};

export default AcademicCurriculumUpdate;
