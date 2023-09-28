import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const NewStudentContext = createContext();

function NewStudentProvider({ children }) {
  const [newStudent, setNewStudent] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  //  function  used to fetch data from database
  const fetchNewStudents = async () => {
    const response = await axios.get("/student");
    setNewStudent(response.data);
  };

  // function used to create newStudent
  const createNewStudent = async (
    firstName,
    middleName,
    lastName,
    gender,
    email,
    birthDate,
    registrationType,
    familyFirstName,
    familyMiddleName,
    familyLastName,
    familyGender,
    familyEmail,
    familyPhoneNumber,
    familyAddress
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post("/student", {
        firstName,
        middleName,
        lastName,
        gender,
        email,
        role: "student",
        birthDate,
        registrationType,
        familyFirstName,
        familyMiddleName,
        familyLastName,
        familyGender,
        familyEmail,
        familyPhoneNumber,
        familyAddress,
      });
      if (response.status !== 200) {
        setError(response.data.error);
        setIsLoading(false);
        return false;
      } else {
        setError(null);
        setIsLoading(false);
        fetchNewStudents();
        toast.success("Student added successfully");
        return true;
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error("Failed to add  student");
        return false;
      }
    }
  };

  // function used to create newStudent
  const createTransferStudent = async (
    firstName,
    middleName,
    lastName,
    gender,
    email,
    birthDate,
    registrationType,
    familyFirstName,
    familyMiddleName,
    familyLastName,
    familyGender,
    familyEmail,
    familyPhoneNumber,
    familyAddress,
    previousYear,
    previousStage,
    previousGrade,
    previousClassification,
    previousTotalMark,
    previousAverage,
    previousAcademicStatus
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("/student/senior", {
        firstName,
        middleName,
        lastName,
        gender,
        email,
        role: "student",
        birthDate,
        registrationType,
        familyFirstName,
        familyMiddleName,
        familyLastName,
        familyGender,
        familyEmail,
        familyPhoneNumber,
        familyAddress,
        previousYear,
        previousStage,
        previousGrade,
        previousClassification,
        previousTotalMark,
        previousAverage,
        previousAcademicStatus,
      });

      if (response.status !== 200) {
        setError(response.data.error);
        setIsLoading(false);
        return false;
      } else {
        setError(null);
        setIsLoading(false);
        fetchNewStudents();
        toast.success("Student added successfully");
        return true;
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error("Failed to add  student");
        return false;
      }
    }
  };

  // function used to delete newStudent
  const deleteNewStudentById = async (id) => {
    await axios.delete(`/student/${id}`);

    const updatedNewStudent = newStudent.filter((newStudent) => {
      return newStudent._id !== id;
    });

    setNewStudent(updatedNewStudent);
  };

  // function used to delete newStudent
  const editNewStudentById = async (
    id,
    newFirstName,
    newMiddleName,
    newLastName,
    newGender,
    newEmail,
    newBithDate
  ) => {
    const response = await axios.patch(`/student/${id}`, {
      firstName: newFirstName,
      middleName: newMiddleName,
      lastName: newLastName,
      gender: newGender,
      email: newEmail,
      birthDate: newBithDate,
    });
    const updatedNewStudents = newStudent.map((newStudent) => {
      if (newStudent._id === id) {
        return { ...newStudent, ...response.data };
      }
      return newStudent;
    });
    fetchNewStudents();
    setNewStudent(updatedNewStudents);
  };

  // shared operation between components
  const newStudentOperation = {
    error,
    isLoading,
    newStudent,
    setError,
    setIsLoading,
    fetchNewStudents,
    createNewStudent,
    createTransferStudent,
    deleteNewStudentById,
    editNewStudentById,
  };

  return (
    <NewStudentContext.Provider value={newStudentOperation}>
      {children}
    </NewStudentContext.Provider>
  );
}

export { NewStudentProvider };
export default NewStudentContext;
