import React, { useContext, useEffect, useState } from "react";
import SubjectTable from "./components/SubjectTable";
import CurriculumContext from "../../context/CurriculumContext";
import GradeContext from "../../context/GradeContext";
import Dropdown from "../../components/UI/Dropdown";
import { Box } from "@mui/material";


const Subject = () => {
  // Subject Information input form
  const [curriculumId, setCurriculumId] = useState("");
  const [gradeId, setGradeId] = useState("");

  const { curriculum, fetchCurriculums } = useContext(CurriculumContext);
  const { grade, fetchGradeByStage } = useContext(GradeContext);

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

  const selectedCurriculum = !curriculumId
    ? []
    : curriculum.filter((SelCurr) => {
        return SelCurr._id === curriculumId;
      });

  //   fetch curriculum useEffect
  useEffect(() => {
    curriculumId && fetchGradeByStage(selectedCurriculum[0].stage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curriculumId]);
  curriculumId && console.log();
  const gradeOption = !curriculumId
    ? [{ label: "Not found", value: 1 }]
    : grade.map((gr) => ({
        label: gr.stage === "KG" ? `KG - ${gr.level}` : `Grade - ${gr.level}`,
        value: gr._id,
      }));


  return (
    <Box>
      <Box className="flex justify-between border-2 border-gray-200 rounded-md p-2">
        <Box className="flex">
          <Dropdown
            label="Curriculum"
            options={curriculumOption}
            value={curriculumId}
            onChange={(e) => {
              setGradeId("");
              setCurriculumId(e.target.value);
            }}
            width={"250px"}
          />
          <Dropdown
            label="Grade"
            options={gradeOption}
            value={gradeId}
            onChange={(e) => {
              setGradeId(e.target.value);
            }}
            width={"80px"}
          />
        </Box>
      </Box>
      <SubjectTable curriculumId={curriculumId} gradeId={gradeId} />
    </Box>
  );
};

export default Subject;
