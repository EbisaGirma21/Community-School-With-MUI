import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ElligibleStudentContext = createContext();

function StudentEnrollmentProvider({ children }) {
  const [elligibleStudent, setElligibleStudent] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  //  function  used to fetch data from database
  const fetchElligibleStudents = async (gradeId) => {
    const response = await axios.get(`/student/elligible/${gradeId}`);
    setElligibleStudent(response.data);
  };

  const enrollStudents = async (
    elligibleStudent,
    gradeId,
    sectionId,
    acCurriculumId
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.patch("/student/enroll", {
        elligibleStudent,
        gradeId,
        sectionId,
        acCurriculumId,
      });

      if (response.status !== 200) {
        setError(response.data.error);
        setIsLoading(false);
        return false;
      } else {
        setError(null);
        setIsLoading(false);
        fetchElligibleStudents(gradeId);
        toast.success("Student enrolled successfully");
        return true;
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error("Failed to enroll student");
        return false;
      }
    }
  };

  const deregisterStudents = async (
    studentIds,
    gradeId,
    sectionId,
    acCurriculumId
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.patch("/student/deregister", {
        studentIds,
        gradeId,
        sectionId,
        acCurriculumId,
      });

      if (response.status !== 200) {
        setError(response.data.error);
        setIsLoading(false);
        return false;
      } else {
        setError(null);
        setIsLoading(false);
        fetchElligibleStudents(gradeId);
        toast.success("Student deregistered successfully");
        return true;
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error("Failed to deregister student");
        return false;
      }
    }
  };

  // shared operation between components
  const elligibleStudentOperation = {
    elligibleStudent,
    error,
    isLoading,
    setError,
    setIsLoading,
    enrollStudents,
    deregisterStudents,
    fetchElligibleStudents,
  };

  return (
    <ElligibleStudentContext.Provider value={elligibleStudentOperation}>
      {children}
    </ElligibleStudentContext.Provider>
  );
}

export { StudentEnrollmentProvider as StudentEnrollmentProvider };
export default ElligibleStudentContext;
