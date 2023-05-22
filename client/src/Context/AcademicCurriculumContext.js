import { createContext, useState } from "react";
import axios from "axios";

const AcademicCurriculumContext = createContext();

function AcademicCurriculumProvider({ children }) {
  const [academicCurriculum, setAcademicCurriculum] = useState([]);

  //  function  used to fetch data from database
  const fetchAcademicCurriculums = async () => {
    const response = await axios.get(
      "http://localhost:8000/api/academicCurriculum"
    );
    setAcademicCurriculum(response.data);
  };

  //  function  used to fetch data from database
  const fetchAcademicCurriculumByYear = async (acYear) => {
    setAcademicCurriculum([]);
    const response = await axios.get(
      `http://localhost:8000/api/academicCurriculum/year/${acYear}`
    );
    setAcademicCurriculum(response.data);
  };

  // function used to create academicCurriculum
  const createAcademicCurriculum = async (
    academicSession,
    curriculum,
    maxSemester
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/academicCurriculum",
        {
          academicSession,
          curriculum,
          maxSemester,
        }
      );
      fetchAcademicCurriculumByYear(academicSession);
      const updateAcademicCurriculum = [...academicCurriculum, response.data];
      setAcademicCurriculum(updateAcademicCurriculum);
    } catch (error) {
      console.log(error);
    }
  };

  // function used to delete academicCurriculum
  const deleteAcademicCurriculumById = async (id) => {
    await axios.delete(`http://localhost:8000/api/academicCurriculum/${id}`);

    const updatedAcademicCurriculum = academicCurriculum.filter(
      (academicCurriculum) => {
        return academicCurriculum._id !== id;
      }
    );

    setAcademicCurriculum(updatedAcademicCurriculum);
  };

  // function used to delete academicCurriculum
  const editAcademicCurriculumById = async (
    id,
    academicSession,
    newCurriculum,
    newMaxSemester
  ) => {
    const response = await axios.patch(
      `http://localhost:8000/api/academicCurriculum/${id}`,
      {
        curriculum: newCurriculum,
        maxSemester: newMaxSemester,
      }
    );

    const updatedAcademicCurriculums = academicCurriculum.map(
      (academicCurriculum) => {
        if (academicCurriculum._id === id) {
          return { ...academicCurriculum, ...response.data };
        }

        return academicCurriculum;
      }
    );
    fetchAcademicCurriculumByYear(academicSession);
    setAcademicCurriculum(updatedAcademicCurriculums);
  };

  // shared operation between components
  const academicCurriculumOperation = {
    academicCurriculum,
    fetchAcademicCurriculumByYear,
    fetchAcademicCurriculums,
    createAcademicCurriculum,
    deleteAcademicCurriculumById,
    editAcademicCurriculumById,
  };

  return (
    <AcademicCurriculumContext.Provider value={academicCurriculumOperation}>
      {children}
    </AcademicCurriculumContext.Provider>
  );
}

export { AcademicCurriculumProvider };
export default AcademicCurriculumContext;
