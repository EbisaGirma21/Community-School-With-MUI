import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CurriculumContext = createContext();

function CurriculumProvider({ children }) {
  const [curriculum, setCurriculum] = useState([]);

  const fetchCurriculumById = async (id) => {
    const response = await axios.get(`/curriculum/${id}`);
    setCurriculum(response.data.data.curriculum);
  };

  //  function  used to fetch data from database
  const fetchCurriculums = async () => {
    const response = await axios.get("/curriculum");
    setCurriculum(response.data.data.curriculums);
  };

  // function used to create curriculum
  const createCurriculum = async (
    curriculumTitle,
    curriculumYear,
    stage,
    classification,
    totalMaximumLoad
  ) => {
    const response = await axios.post("/curriculum", {
      curriculumTitle,
      curriculumYear,
      stage,
      classification,
      totalMaximumLoad,
    });

    const updateCurriculum = [...curriculum, response.data.data.curriculum];
    fetchCurriculums();
    setCurriculum(updateCurriculum);
  };

  // function used to delete curriculum
  const deleteCurriculumById = async (id) => {
    try {
      const response = await axios.delete(`/curriculum/${id}`);
      if (response.status !== 200) {
        toast.error(response.data.error);
      } else {
        const updatedCurriculum = curriculum.filter((curriculum) => {
          return curriculum._id !== id;
        });
        setCurriculum(updatedCurriculum);
        toast.warning("Curriculum deleted successfully");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Failed to delete curriculum");
      }
    }
  };

  // function used to delete curriculum
  const editCurriculumById = async (
    id,
    newCurriculumTitle,
    newCurriculumYear,
    newStage,
    newClassification,
    newTotalMaximumLoad
  ) => {
    const response = await axios.patch(`/curriculum/${id}`, {
      curriculumTitle: newCurriculumTitle,
      curriculumYear: newCurriculumYear,
      stage: newStage,
      classification: newClassification,
      totalMaximumLoad: newTotalMaximumLoad,
    });

    const updatedCurriculums = curriculum.map((curriculum) => {
      if (curriculum._id === id) {
        return { ...curriculum, ...response.data.data.curriculum };
      }

      return curriculum;
    });
    fetchCurriculums();
    setCurriculum(updatedCurriculums);
  };

  // shared operation between components
  const curriculumOperation = {
    curriculum,
    fetchCurriculumById,
    fetchCurriculums,
    createCurriculum,
    deleteCurriculumById,
    editCurriculumById,
  };

  return (
    <CurriculumContext.Provider value={curriculumOperation}>
      {children}
    </CurriculumContext.Provider>
  );
}

export { CurriculumProvider };
export default CurriculumContext;
