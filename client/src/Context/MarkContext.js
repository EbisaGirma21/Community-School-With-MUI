import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const MarkContext = createContext();

function MarkProvider({ children }) {
  const [mark, setMark] = useState([]);
  const [firstMark, setFirstMark] = useState([]);
  const [secondMark, setSecondMark] = useState([]);
  const [markList, setMarkList] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  //  fetching marks(roster form database)
  const fetchMarks = async (gradeId, sectionId, semesterId) => {
    const response = await axios.get(
      `/mark/${gradeId}/${sectionId}/${semesterId}`
    );
    setMark(response.data);
  };
  const fetchMarkFirstSemester = async (gradeId, sectionId, semesterId) => {
    const response = await axios.get(
      `/mark/${gradeId}/${sectionId}/${semesterId}`
    );
    setFirstMark(response.data);
  };
  const fetchMarkSecondSemester = async (gradeId, sectionId, semesterId) => {
    const response = await axios.get(
      `/mark/${gradeId}/${sectionId}/${semesterId}`
    );
    setSecondMark(response.data);
  };

  //  fetching marks(roster form database)
  const fetchAverageMarks = async (gradeId, sectionId) => {
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
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("/mark/addMark", {
        updatedMark: rows,
      });

      if (response.status !== 200) {
        setError(response.data.error);
        setIsLoading(false);
        return false;
      } else {
        setError(null);
        setIsLoading(false);
        fetchMarkLists(gradeId, sectionId, subjectId, semesterId);
        toast.success("student mark is updated  successfully");
        return true;
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error("Failed to update mark of student");
        return false;
      }
    }
  };

  // shared operation between components
  const markOperation = {
    mark,
    firstMark,
    secondMark,
    markList,
    fetchMarks,
    fetchMarkFirstSemester,
    fetchMarkSecondSemester,
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
