import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AssessmentWeightContext = createContext();

function AssessmentWeightProvider({ children }) {
  const [assessmentWeight, setAssessmentWeight] = useState([]);

  //  function  used to fetch data from database
  const fetchAssessmentWeights = async (curriculumId, gradeId) => {
    const response = await axios.get(
      `/assessmentWeight/${curriculumId}/${gradeId}`
    );
    setAssessmentWeight(response.data);
  };

  //  function  used to fetch data from database
  const fetchAssessmentWeightById = async (curriculumId, gradeId, id) => {
    const response = await axios.get(
      `/assessmentWeight/year/${curriculumId}/${gradeId}/${id}`
    );
    setAssessmentWeight(response.data.data.assessmentWeight);
  };

  // function used to create assessmentWeight
  const createAssessmentWeights = async (
    curriculumId,
    gradeId,
    subjects,
    weights
  ) => {
    console.log(assessmentWeight);
    const response = await axios.post("/assessmentWeight", {
      curriculumId,
      gradeId,
      subjects,
      weights,
    });

    if (response.status === 200) {
      toast.success("Weight assigned successfully");
    }

    fetchAssessmentWeights(curriculumId, gradeId);
  };

  // function used to delete assessmentWeight
  const deleteAssessmentWeightById = async (curriculumId, gradeId, id) => {
    await axios.delete(`/assessmentWeight/${curriculumId}/${gradeId}/${id}`);

    const updatedAssessmentWeight = assessmentWeight.filter(
      (assessmentWeight) => {
        return assessmentWeight._id !== id;
      }
    );

    setAssessmentWeight(updatedAssessmentWeight);
  };

  // function used to delete assessmentWeight
  const editAssessmentWeightById = async (
    curriculumId,
    gradeId,
    id,
    assessmentWeightLoad
  ) => {
    const response = await axios.patch(
      `/assessmentWeight/${curriculumId}/${gradeId}/${id}`,
      {
        assessmentWeightLoad,
      }
    );

    fetchAssessmentWeights(curriculumId, gradeId);
  };

  // shared operation between components
  const assessmentWeightOperation = {
    assessmentWeight,
    fetchAssessmentWeightById,
    fetchAssessmentWeights,
    createAssessmentWeights,
    deleteAssessmentWeightById,
    editAssessmentWeightById,
  };

  return (
    <AssessmentWeightContext.Provider value={assessmentWeightOperation}>
      {children}
    </AssessmentWeightContext.Provider>
  );
}

export { AssessmentWeightProvider };
export default AssessmentWeightContext;
