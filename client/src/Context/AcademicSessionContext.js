import { createContext, useState } from "react";
import axios from "axios";

const AcademicSessionContext = createContext();

function AcademicSessionProvider({ children }) {
  const [academicSession, setAcademicSession] = useState([]);

  //  function  used to fetch data from database
  const fetchAcademicSessions = async () => {
    const response = await axios.get("http://localhost:8000/api/academicSession");
    setAcademicSession(response.data);
  };

  // function used to create academicSession
  const createAcademicSession = async (academicYear) => {
    const response = await axios.post("http://localhost:8000/api/academicSession", {
      academicYear,
    });

    const updateAcademicSession = [...academicSession, response.data];
    setAcademicSession(updateAcademicSession);
  };

  // function used to delete academicSession
  const deleteAcademicSessionById = async (id) => {
    await axios.delete(`http://localhost:8000/api/academicSession/${id}`);

    const updatedAcademicSession = academicSession.filter((academicSession) => {
      return academicSession._id !== id;
    });

    setAcademicSession(updatedAcademicSession);
  };

  // function used to delete academicSession
  const editAcademicSessionById = async (id, newAcademicYear) => {
    const response = await axios.patch(
      `http://localhost:8000/api/academicSession/${id}`,
      {
        academicYear: newAcademicYear,
      }
    );

    const updatedAcademicSessions = academicSession.map((academicSession) => {
      if (academicSession._id === id) {
        return { ...academicSession, ...response.data };
      }

      return academicSession;
    });
    fetchAcademicSessions();
    setAcademicSession(updatedAcademicSessions);
  };

  // shared operation between components
  const academicSessionOperation = {
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
