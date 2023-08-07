import { createContext, useState } from "react";
import axios from "axios";

const SubjectContext = createContext();

function SubjectProvider({ children }) {
  const [subject, setSubject] = useState([]);

  //  function  used to fetch data from database
  const fetchSubjects = async (curriculumId, gradeId) => {
    const response = await axios.get(`/subject/${curriculumId}/${gradeId}`);
    setSubject(response.data.data.subjects);
  };

  //  function  used to fetch data from database
  const fetchSubjectById = async (curriculumId, gradeId, id) => {
    const response = await axios.get(
      `/subject/year/${curriculumId}/${gradeId}/${id}`
    );
    setSubject(response.data.data.subject);
  };

  // function used to create subject
  const createSubjects = async (
    curriculumId,
    gradeId,
    modules,
    subjectLoad
  ) => {
    const response = await axios.post("/subject", {
      curriculumId,
      gradeId,
      subjects: modules,
      subjectLoad,
    });

    fetchSubjects(curriculumId, gradeId);
  };

  // function used to delete subject
  const deleteSubjectById = async (curriculumId, gradeId, id) => {
    await axios.delete(`/subject/${curriculumId}/${gradeId}/${id}`);

    const updatedSubject = subject.filter((subject) => {
      return subject._id !== id;
    });

    setSubject(updatedSubject);
  };

  // function used to delete subject
  const editSubjectById = async (curriculumId, gradeId, id, subjectLoad) => {
    const response = await axios.patch(
      `/subject/${curriculumId}/${gradeId}/${id}`,
      {
        subjectLoad,
      }
    );

    fetchSubjects(curriculumId, gradeId);
  };

  // shared operation between components
  const subjectOperation = {
    subject,
    fetchSubjectById,
    fetchSubjects,
    createSubjects,
    deleteSubjectById,
    editSubjectById,
  };

  return (
    <SubjectContext.Provider value={subjectOperation}>
      {children}
    </SubjectContext.Provider>
  );
}

export { SubjectProvider };
export default SubjectContext;
