import { createContext, useState } from "react";
import axios from "axios";

const CurriculumContext = createContext();

function CurriculumProvider({ children }) {
  const [curriculum, setCurriculum] = useState([]);

  //  function  used to fetch data from database
  const fetchCurriculums = async () => {
    const response = await axios.get("http://localhost:8000/api/curriculum");
    setCurriculum(response.data);
  };

  // function used to create curriculum
  const createCurriculum = async (
    curriculumTitle,
    curriculumYear,
    stage,
    classification,
    totalMaximumLoad
  ) => {
    const response = await axios.post("http://localhost:8000/api/curriculum", {
      curriculumTitle,
      curriculumYear,
      stage,
      classification,
      totalMaximumLoad,
    });

    const updateCurriculum = [...curriculum, response.data];
    setCurriculum(updateCurriculum);
  };

  // function used to delete curriculum
  const deleteCurriculumById = async (id) => {
    await axios.delete(`http://localhost:8000/api/curriculum/${id}`);

    const updatedCurriculum = curriculum.filter((curriculum) => {
      return curriculum._id !== id;
    });

    setCurriculum(updatedCurriculum);
  };

  // shared operation between components
  const curriculumOperation = {
    curriculum,
    fetchCurriculums,
    createCurriculum,
    deleteCurriculumById,
  };

  return (
    <CurriculumContext.Provider value={curriculumOperation}>
      {children}
    </CurriculumContext.Provider>
  );
}

export { CurriculumProvider };
export default CurriculumContext;
