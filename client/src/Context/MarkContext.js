import { createContext, useState } from "react";
import axios from "axios";

const MarkContext = createContext();

function MarkProvider({ children }) {
  const [mark, setMark] = useState([]);
  const [markList, setMarkList] = useState([]);

  //  fetching marks(roster form database)
  const fetchMarks = async (gradeId, sectionId, semesterId) => {
    const response = await axios.get(
      `/mark/${gradeId}/${sectionId}/${semesterId}`
    );
    setMark(response.data);
  };

  //  fetching marks(roster form database)
  const fetchAverageMarks = async (gradeId,sectionId) => {
    const response = await axios.get(`/mark/${gradeId}/${sectionId}`);
    setMark(response.data);
  };

  // marklist fetched by semster
  const fetchMarkLists = async (gradeId, sectionId, subjectId, semesterId) => {
    const response = await axios.get(
      `/mark/markList/${gradeId}/${sectionId}/${subjectId}/${semesterId}`
    );
    setMarkList(response.data);
  };

  // average marklist
  const fetchAverageMarkLists = async (gradeId, sectionId, subjectId) => {
    const response = await axios.get(
      `/mark/markList/${gradeId}/${sectionId}/${subjectId}`
    );
    setMarkList(response.data);
  };

  const addSubjectMarks = async (
    rows,
    subjectId,
    semesterId,
    gradeId,
    sectionId
  ) => {
    const response = await axios.post("/mark/addMark", {
      updatedMark: rows,
    });
    fetchMarkLists(gradeId, sectionId, subjectId, semesterId);
  };

  // shared operation between components
  const markOperation = {
    mark,
    markList,
    fetchMarks,
    fetchMarkLists,
    addSubjectMarks,
    fetchAverageMarks,
    fetchAverageMarkLists,
  };

  return (
    <MarkContext.Provider value={markOperation}>
      {children}
    </MarkContext.Provider>
  );
}

export { MarkProvider };
export default MarkContext;
