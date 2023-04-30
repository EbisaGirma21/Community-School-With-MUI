import { createContext, useState } from "react";
import axios from "axios";

const CurriculumContext = createContext();

function CurriculumProvider({ children }) {
  const [curriculum, setCurriculum] = useState([]);

  // this function is used to fetch data from database
  const fetchCurriculums = async () => {
    const response = await axios.get("http://localhost:8000/api/curriculum");
    setCurriculum(response.data);
  };
  const curriculumOperation = {
    curriculum,
    fetchCurriculums,
  };

  return (
    <CurriculumContext.Provider value={curriculumOperation}>
      {children}
    </CurriculumContext.Provider>
  );
}

export { CurriculumProvider };
export default CurriculumContext;
