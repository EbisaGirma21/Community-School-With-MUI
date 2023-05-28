import { createContext, useState } from "react";
import axios from "axios";

const NewStudentContext = createContext();

function NewStudentProvider({ children }) {
  const [newStudent, setNewStudent] = useState([]);

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
    birthDate
  ) => {
    const response = await axios.post("/student", {
      firstName,
      middleName,
      lastName,
      gender,
      email,
      role: "student",
      birthDate,
    });

    fetchNewStudents();
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
    newStudent,
    fetchNewStudents,
    createNewStudent,
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
