import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const StudentContext = createContext();

function StudentProvider({ children }) {
  const [student, setStudent] = useState([]);
  const [studentById, setStudentById] = useState(null);
  const [studentEnrollment, setStudentEnrollment] = useState(null);
  const [studentMark, setStudentMark] = useState(null);
  const [specificStudent, setSpecificStudent] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

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
    if (response.status === 200) {
      setSpecificStudent(response?.data);
    } else if (response.status === 202) {
      setSpecificStudent([]);
    }
  };

  const fetchStudentById = async () => {
    try {
      setIsLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        throw new Error("No student ID found in local storage.");
      }
      const response = await axios.get(`/student/${user._id}`);

      setStudentById(response.data);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to fetch student by ID.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStudentEnrollment = async () => {
    try {
      setIsLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        throw new Error("No student ID found in local storage.");
      }
      const response = await axios.get(`/student/enrollment/${user._id}`);

      setStudentEnrollment(response.data);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to fetch student by ID.");
    } finally {
      setIsLoading(false);
    }
  };
  const fetchStudentMark = async (gradeId, sectionId, semesterId, id) => {
    const response = await axios.get(
      `/student/single-mark/${gradeId}/${sectionId}/${semesterId}/${id}`
    );
    setStudentMark(response.data);
  };

  // shared operation between components
  const studentOperation = {
    student,
    specificStudent,
    error,
    isLoading,
    studentById,
    studentEnrollment,
    studentMark,
    setError,
    setIsLoading,
    fetchStudents,
    fetchStudentsBySpecifying,
    fetchStudentById,
    fetchStudentEnrollment,
    fetchStudentMark,
  };

  return (
    <StudentContext.Provider value={studentOperation}>
      {children}
    </StudentContext.Provider>
  );
}

export { StudentProvider };
export default StudentContext;
