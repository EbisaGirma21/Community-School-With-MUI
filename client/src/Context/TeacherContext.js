import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


const TeacherContext = createContext();

function TeacherProvider({ children }) {
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  //  function  used to fetch data from database
  const fetchTeachers = async () => {
    const response = await axios.get("/teacher");
    setTeachers(response.data);
  };

  // function used to create teacher
  const createTeacher = async (
    firstName,
    middleName,
    lastName,
    gender,
    email,
    phoneNumber,
    address
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("/teacher", {
        firstName,
        middleName,
        lastName,
        gender,
        email,
        role: "teacher",
        phoneNumber,
        address,
      });

      if (response.status !== 200) {
        setError(response.data.error);
        setIsLoading(false);
        return false;
      } else {
        setError(null);
        setIsLoading(false);
        fetchTeachers();
        toast.success("Teacher added successfully");
        return true;
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error("Failed to add  teacher");
        return false;
      }
    }
  };

  // function used to delete teacher
  const deleteTeacherById = async (id) => {
    try {
      const response = await axios.delete(`/teacher/${id}`);
      if (response.status !== 200) {
        toast.error(response.data.error);
      } else {
        const updatedTeacher = teachers.filter((teacher) => {
          return teacher._id !== id;
        });
        setTeachers(updatedTeacher);
        toast.warning("Teahcer deleted successfully");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Failed to delete Teacher");
      }
    }
  };

  // function used to delete teacher
  // function used to delete newStudent
  const editTeacherById = async (
    id,
    newFirstName,
    newMiddleName,
    newLastName,
    newGender,
    newEmail,
    newPhoneNumber,
    newAddress
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.patch(`/teacher/${id}`, {
        firstName: newFirstName,
        middleName: newMiddleName,
        lastName: newLastName,
        gender: newGender,
        email: newEmail,
        phoneNumber: newPhoneNumber,
        address: newAddress,
      });

      if (response.status !== 200) {
        setError(response.data.error);
        setIsLoading(false);
        return false;
      } else {
        setError(null);
        setIsLoading(false);
        fetchTeachers();
        toast.info("Teacher updated successfully");
        return true;
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error("Failed to update teacher");
      }
    }
  };

  // shared operation between components
  const teacherOperation = {
    error,
    isLoading,
    teachers,
    setError,
    setIsLoading,
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
