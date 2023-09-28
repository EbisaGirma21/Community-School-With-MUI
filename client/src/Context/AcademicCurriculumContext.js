import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AcademicCurriculumContext = createContext();

function AcademicCurriculumProvider({ children }) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [academicCurriculum, setAcademicCurriculum] = useState([]);

  //  function  used to fetch data from database
  const fetchAcademicCurriculums = async () => {
    const response = await axios.get("/academicCurriculum");
    setAcademicCurriculum(response.data);
  };

  //  function  used to fetch data from database
  const fetchAcademicCurriculumByYear = async (acYear) => {
    setAcademicCurriculum([]);
    const response = await axios.get(`/academicCurriculum/year/${acYear}`);
    setAcademicCurriculum(response.data);
  };

  // function used to create academicCurriculum
  const createAcademicCurriculum = async (
    academicSession,
    curriculum,
    passTresholdAverage,
    maxSemester
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("/academicCurriculum", {
        academicSession,
        curriculum,
        passTresholdAverage,
        maxSemester,
      });

      if (response.status !== 200) {
        setError(response.data.error);
        setIsLoading(false);
        return false;
      } else {
        setError(null);
        setIsLoading(false);
        fetchAcademicCurriculumByYear(academicSession);
        toast.success("Academic Curriculum created successfully");
        return true;
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error("Failed to create academic curriculum");
        return false;
      }
    }
  };

  // function used to delete academicCurriculum
  const deleteAcademicCurriculumById = async (id) => {
    try {
      const response = await axios.delete(`/academicCurriculum/${id}`);
      console.log(response);
      if (response.status !== 200) {
        toast.error(response.data.error);
      } else {
        const updatedAcademicCurriculum = academicCurriculum.filter(
          (academicCurriculum) => {
            return academicCurriculum._id !== id;
          }
        );
        setAcademicCurriculum(updatedAcademicCurriculum);
        toast.warning("Academic curriculum deleted successfully");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Failed to delete academic curriculum");
      }
    }
  };

  // function used to delete academicCurriculum
  const editAcademicCurriculumById = async (
    id,
    academicSession,
    newCurriculum,
    newPassTresholdAverage,
    newMaxSemester
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.patch(`/academicCurriculum/${id}`, {
        curriculum: newCurriculum,
        passTresholdAverage: newPassTresholdAverage,
        maxSemester: newMaxSemester,
      });

      if (response.status !== 200) {
        setError(response.data.error);
        setIsLoading(false);
        return false;
      } else {
        setError(null);
        setIsLoading(false);
        // fetchAcademicCurriculumByYear(academicSession);
        // const updatedAcademicCurriculums = academicCurriculum.map(
        //   (academicCurriculum) => {
        //     if (academicCurriculum._id === id) {
        //       return { ...academicCurriculum, ...response.data };
        //     }
        //     return academicCurriculum;
        //   }
        // );
        // setAcademicCurriculum(updatedAcademicCurriculums);
        fetchAcademicCurriculums();
        toast.info("Academic Curriculum updated successfully");
        return true;
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error("Failed to create academic curriculum");
        return false;
      }
    }
  };

  // shared operation between components
  const academicCurriculumOperation = {
    error,
    isLoading,
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
