import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AcademicSessionContext = createContext();

function AcademicSessionProvider({ children }) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [academicSession, setAcademicSession] = useState([]);

  //  function  used to fetch data from database
  const fetchAcademicSessions = async () => {
    const response = await axios.get("/academicSession");
    setAcademicSession(response.data);
  };

  // function used to create academicSession
  const createAcademicSession = async (academicYear) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.post("/academicSession", {
        academicYear,
      });

      if (response.status !== 200) {
        setError(response.data.error);
        setIsLoading(false);
        return false;
      } else {
        setError(null);
        setIsLoading(false);
        fetchAcademicSessions();
        toast.success("Academic session created successfully");
        return true;
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error("Failed to create academic session");
        return false;
      }
    }
  };

  // function used to delete academicSession
  const deleteAcademicSessionById = async (id) => {
    try {
      const response = await axios.delete(`/academicSession/${id}`);
      if (response.status !== 200) {
        toast.error(response.data.error);
      } else {
        const updatedAcademicSession = academicSession.filter(
          (academicSession) => academicSession._id !== id
        );
        setAcademicSession(updatedAcademicSession);
        toast.warning("Academic session deleted successfully");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Failed to delete academic session");
      }
    }
  };

  // function used to delete academicSession
  const editAcademicSessionById = async (id, newAcademicYear) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.patch(`/academicSession/${id}`, {
        academicYear: newAcademicYear,
      });

      if (response.status !== 200) {
        setError(response.data.error);
        setIsLoading(false);
        return false;
      } else {
        setError(null);
        setIsLoading(false);
        fetchAcademicSessions();
        toast.info("Academic session updated successfully");
        return true;
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error("Failed to update academic session");
      }
    }
  };

  // shared operation between components
  const academicSessionOperation = {
    error,
    isLoading,
    academicSession,
    fetchAcademicSessions,
    createAcademicSession,
    deleteAcademicSessionById,
    editAcademicSessionById,
  };

  return (
    <AcademicSessionContext.Provider value={academicSessionOperation}>
      {children}
    </AcademicSessionContext.Provider>
  );
}

export { AcademicSessionProvider };
export default AcademicSessionContext;
