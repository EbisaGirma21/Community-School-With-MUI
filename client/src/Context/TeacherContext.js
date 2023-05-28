import { createContext, useState } from "react";
import axios from "axios";

const TeacherContext = createContext();

function TeacherProvider({ children }) {
  const [teacher, setTeacher] = useState([]);

  //  function  used to fetch data from database
  const fetchTeachers = async () => {
    const response = await axios.get("/teacher");
    setTeacher(response.data);
  };

  // function used to create teacher
  const createTeacher = async (
    firstName,
    middleName,
    lastName,
    gender,
    email
  ) => {
    const response = await axios.post("/teacher", {
      firstName,
      middleName,
      lastName,
      gender,
      email,
      role: "teacher",
    });

    fetchTeachers();
  };

  // function used to delete teacher
  const deleteTeacherById = async (id) => {
    await axios.delete(`/teacher/${id}`);

    const updatedTeacher = teacher.filter((teacher) => {
      return teacher._id !== id;
    });

    setTeacher(updatedTeacher);
  };

  // function used to delete teacher
  // function used to delete newStudent
  const editTeacherById = async (
    id,
    newFirstName,
    newMiddleName,
    newLastName,
    newGender,
    newEmail
  ) => {
    const response = await axios.patch(`/teacher/${id}`, {
      firstName: newFirstName,
      middleName: newMiddleName,
      lastName: newLastName,
      gender: newGender,
      email: newEmail,
    });
    const updatedTeachers = teacher.map((teacher) => {
      if (teacher._id === id) {
        return { ...teacher, ...response.data };
      }

      return teacher;
    });
    fetchTeachers();
    setTeacher(updatedTeachers);
  };

  // shared operation between components
  const teacherOperation = {
    teacher,
    fetchTeachers,
    createTeacher,
    deleteTeacherById,
    editTeacherById,
  };

  return (
    <TeacherContext.Provider value={teacherOperation}>
      {children}
    </TeacherContext.Provider>
  );
}

export { TeacherProvider };
export default TeacherContext;
