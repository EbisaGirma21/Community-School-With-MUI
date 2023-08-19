import { createContext, useState } from "react";
import axios from "axios";

const MarkContext = createContext();

function MarkProvider({ children }) {
  const [mark, setMark] = useState([]);

  //  function  used to fetch data from database
  const fetchMarks = async (semesterId) => {
    const response = await axios.get(`/mark/${semesterId}`);
    setMark(response.data);
  };
  const fetchMarkLists = async (subjectId, semesterId) => {
    const response = await axios.get(
      `/mark/markList/${subjectId}/${semesterId}`
    );
    setMark(response.data);
  };

  const addSubjectMarks = async (rows, subjectId, semesterId) => {
    const response = await axios.post("/mark/addMark", {
      updatedMark: rows,
    });
    setMark(response.data);
  };

  // shared operation between components
  const markOperation = {
    mark,
    fetchMarks,
    fetchMarkLists,
    addSubjectMarks,
  };

  return (
    <MarkContext.Provider value={markOperation}>
      {children}
    </MarkContext.Provider>
  );
}

export { MarkProvider };
export default MarkContext;
