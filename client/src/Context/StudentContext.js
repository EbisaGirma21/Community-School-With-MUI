import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const StudentContext = createContext();

function StudentProvider({ children }) {
  const [student, setStudent] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  //  function  used to fetch data from database
  const fetchStudents = async () => {
    const response = await axios.get("/student");
    setStudent(response.data);
  };

  // shared operation between components
  const studentOperation = {
    student,
    error,
    isLoading,
    setError,
    setIsLoading,
    fetchStudents,
  };

  return (
    <StudentContext.Provider value={studentOperation}>
      {children}
    </StudentContext.Provider>
  );
}

export { StudentProvider };
export default StudentContext;
