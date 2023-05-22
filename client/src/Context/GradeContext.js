import { createContext, useState } from "react";
import axios from "axios";

const GradeContext = createContext();

function GradeProvider({ children }) {
  const [grade, setGrade] = useState([]);

  //  function  used to fetch data from database
  const fetchGrades = async () => {
    const response = await axios.get("http://localhost:8000/api/grade");
    setGrade(response.data.data.grade);
  };

  //  fetching hte grades by stage
  const fetchGradeByStage = async (stage) => {
    const response = await axios.get(
      `http://localhost:8000/api/grade/stage/${stage}`
    );
    setGrade(response.data);
  };

  //
  // shared operation between components
  const gradeOperation = {
    grade,
    fetchGrades,
    fetchGradeByStage,
  };

  return (
    <GradeContext.Provider value={gradeOperation}>
      {children}
    </GradeContext.Provider>
  );
}

export { GradeProvider };
export default GradeContext;
