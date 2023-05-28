import { createContext, useState } from "react";
import axios from "axios";

const ElligibleStudentContext = createContext();

function ElligibleStudentProvider({ children }) {
  const [elligibleStudent, setElligibleStudent] = useState([]);

  //  function  used to fetch data from database
  const fetchElligibleStudents = async (gradeId) => {
    const response = await axios.get(`/student/elligible/${gradeId}`);
    setElligibleStudent(response.data);
  };

  // shared operation between components
  const elligibleStudentOperation = {
    elligibleStudent,
    fetchElligibleStudents,
  };

  return (
    <ElligibleStudentContext.Provider value={elligibleStudentOperation}>
      {children}
    </ElligibleStudentContext.Provider>
  );
}

export { ElligibleStudentProvider };
export default ElligibleStudentContext;
