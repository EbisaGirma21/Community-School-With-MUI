import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const StudentContext = createContext();

function StudentProvider({ children }) {
  const [student, setStudent] = useState([]);
  const [specificStudent, setSpecificStudent] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  //  function  used to fetch data from database
  const fetchStudents = async () => {
    const response = await axios.get("/student");
    setStudent(response.data);
  };

  const fetchStudentsBySpecifying = async (
    academicYear,
    academicCurriculum,
    grade,
    section
  ) => {
    const response = await axios.get(
      `/student/specificStudent/${academicYear}/${academicCurriculum}/${grade}/${section}`
    );

    setSpecificStudent(response.data);
  };

  // shared operation between components
  const studentOperation = {
    student,
    specificStudent,
    error,
    isLoading,
    setError,
    setIsLoading,
    fetchStudents,
    fetchStudentsBySpecifying,
  };

  return (
    <StudentContext.Provider value={studentOperation}>
      {children}
    </StudentContext.Provider>
  );
}

export { StudentProvider };
export default StudentContext;
