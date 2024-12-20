import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AssessmentWeightContext = createContext();

function AssessmentWeightProvider({ children }) {
  const [assessmentWeight, setAssessmentWeight] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

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
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post("/assessmentWeight", {
        curriculumId,
        gradeId,
        subjects,
        weights,
      });

      if (response.status !== 200) {
        setError(response.data.error);
        setIsLoading(false);
        return false;
      } else {
        setError(null);
        setIsLoading(false);
        toast.success("Weight assigned successfully");
        fetchAssessmentWeights(curriculumId, gradeId);
        return true;
      }
    } catch (error) {
      if (error.response) {
        toast.error("The assessment sum exceed 100%");
        setError(error.response.data.error);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error("Failed to assign weight");
        return false;
      }
    }
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
