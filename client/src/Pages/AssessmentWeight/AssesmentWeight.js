import React, { useContext, useEffect, useState } from "react";
import CurriculumContext from "../../context/CurriculumContext";
import GradeContext from "../../context/GradeContext";
import Dropdown from "../../components/UI/Dropdown";
import { Box, Button, IconButton, Menu, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AssignWeightTable from "./components/AssignWeightTable";
import { Cancel } from "@mui/icons-material";
import AssessmentWeightContext from "../../context/AssessmentWeightContext";
import { toast } from "react-toastify";

const assessmentOption = [
  { label: "Quiz", value: "quiz" },
  { label: "Test", value: "test" },
  { label: "Assignment", value: "assignment" },
  { label: "Mid-Exam", value: "midExam" },
  { label: "Final-Exam", value: "finalExam" },
];
const existAssessment = ["quiz", "test", "midExam", "assignment", "finalExam"];

const AssessmentWeight = () => {
  // Subject Information input form
  const [curriculumId, setCurriculumId] = useState("");
  const [gradeId, setGradeId] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [textFields, setTextFields] = useState([]);

  const { curriculum, fetchCurriculums } = useContext(CurriculumContext);
  const { grade, fetchGradeByStage } = useContext(GradeContext);
  const { createAssessmentWeights, assessmentWeight, fetchAssessmentWeights } =
    useContext(AssessmentWeightContext);

  // update local subject state when context subject changes
  useEffect(() => {
    gradeId && fetchAssessmentWeights(curriculumId, gradeId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gradeId]);

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

  // adding weight menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleAddClick = (event) => {
    const selectedSubject = assessmentWeight.find(
      (sub) => sub._id === selectedRows[0]
    );

    if (selectedSubject) {
      const transformedArray = existAssessment
        .filter((key) => selectedSubject.hasOwnProperty(key))
        .map((key) => ({
          type: key,
          weight: selectedSubject[key],
        }));

      setTextFields(transformedArray);
      setAnchorEl(event.currentTarget);
    } else {
      toast.warning("Subject not found.");
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Function to handle the change event for a specific set of text fields
  const handleTextFieldsChange = (index, event, name) => {
    const { value } = event.target;
    const updatedFields = [...textFields];
    updatedFields[index] = { ...updatedFields[index], [name]: value };
    setTextFields(updatedFields);
  };

  // Function to add a new set of text fields
  const addTextFields = () => {
    setTextFields([...textFields, { type: "", weight: "" }]);
  };

  // Function to remove a set of text fields
  const removeTextFields = (index) => {
    const updatedFields = [...textFields];
    updatedFields.splice(index, 1);
    setTextFields(updatedFields);
  };

  const handleSave = () => {
    const assessments = textFields.reduce((result, { type, weight }) => {
      result[type] = parseFloat(weight);
      return result;
    }, {});

    createAssessmentWeights(curriculumId, gradeId, selectedRows, assessments);
    handleClose();
  };

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
        <Box className="">
          <Button
            variant="contained"
            className="w-full"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleAddClick}
          >
            Assign Weight
          </Button>
        </Box>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <Box className="mt-4 p-4 flex flex-col w-96">
            <Box className="flex gap-3 justify-center">
              <Button variant="contained" onClick={addTextFields}>
                <AddIcon /> Assessment
              </Button>
              <Button
                variant="contained"
                disabled={textFields.length !== 0 ? false : true}
                onClick={handleSave}
              >
                Save
              </Button>
            </Box>

            {textFields.map((textField, index) => (
              <Box key={index} className="flex gap-2 items-center">
                <Dropdown
                  label="Type"
                  options={assessmentOption}
                  value={textField.type}
                  onChange={(event) => {
                    handleTextFieldsChange(index, event, "type");
                    console.log(event);
                  }}
                  width={"40%"}
                />
                <TextField
                  margin="dense"
                  label="Weight"
                  type="Number"
                  variant="standard"
                  className="w-2/5"
                  value={textField.weight}
                  onChange={(event) =>
                    handleTextFieldsChange(index, event, "weight")
                  }
                />
                <IconButton
                  onClick={() => removeTextFields(index)}
                  className="w-1/5"
                >
                  <Cancel />
                </IconButton>
              </Box>
            ))}
          </Box>
        </Menu>
      </Box>
      <AssignWeightTable
        setSelectedRows={setSelectedRows}
        curriculumId={curriculumId}
        gradeId={gradeId}
      />
    </Box>
  );
};

export default AssessmentWeight;
