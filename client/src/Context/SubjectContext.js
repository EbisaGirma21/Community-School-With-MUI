import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const SubjectContext = createContext();

function SubjectProvider({ children }) {
  const [subject, setSubject] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  //  function  used to fetch data from database
  const fetchSubjects = async (curriculumId, gradeId) => {
    const response = await axios.get(`/subject/${curriculumId}/${gradeId}`);
    setSubject(response.data);
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
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("/subject", {
        curriculumId,
        gradeId,
        subjects: modules,
        subjectLoad,
      });

      if (response.status !== 200) {
        setError(response.data.error);
        setIsLoading(false);
        return false;
      } else {
        setError(null);
        setIsLoading(false);
        fetchSubjects(curriculumId, gradeId);
        toast.success("Subject created successfully");
        return true;
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error("Failed to create subject");
        return false;
      }
    }
  };

  // function used to delete subject
  const deleteSubjectById = async (curriculumId, gradeId, id) => {
    try {
      const response = await axios.delete(
        `/subject/${curriculumId}/${gradeId}/${id}`
      );

      if (response.status !== 200) {
        toast.error(response.data.error);
      } else {
        const updatedSubject = subject.filter((subject) => {
          return subject._id !== id;
        });
        setSubject(updatedSubject);
        toast.warning("Subject deleted successfully");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Failed to delete subject");
      }
    }
  };

  // function used to delete subject
  const editSubjectById = async (curriculumId, gradeId, id, subjectLoad) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.patch(
        `/subject/${curriculumId}/${gradeId}/${id}`,
        {
          subjectLoad,
        }
      );

      if (response.status !== 200) {
        setError(response.data.error);
        setIsLoading(false);
        return false;
      } else {
        setError(null);
        setIsLoading(false);
        fetchSubjects(curriculumId, gradeId);
        toast.info("Subject updated successfully");
        return true;
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error("Failed to update subject");
        return false;
      }
    }
  };

  // shared operation between components
  const subjectOperation = {
    error,
    isLoading,
    subject,
    setError,
    setIsLoading,
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
