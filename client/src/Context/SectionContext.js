import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const SectionContext = createContext();

function SectionProvider({ children }) {
  const [section, setSection] = useState([]);
  const [sectionSubject, setSectionSubject] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  //  function  used to fetch data from database
  const fetchSections = async () => {
    const response = await axios.get("/section");
    setSection(response.data);
  };

  const fetchSectionSubject = async (acCurriculumId, gradeId, sectionId) => {
    const response = await axios.get(
      `/section/${acCurriculumId}/${gradeId}/${sectionId}`
    );
    setSectionSubject(response.data);
  };

  // function used to create section
  const createSection = async (
    sectionLabel,
    academicCurriculum,
    grade,
    subjects
  ) => {
    const response = await axios.post("/section", {
      sectionLabel,
      academicCurriculum,
      grade,
      subjects,
    });

    const updateSection = [...section, response.data];
    setSection(updateSection);
  };

  // function used to delete section
  const deleteSectionById = async (id) => {
    await axios.delete(`/section/${id}`);

    const updatedSection = section.filter((section) => {
      return section._id !== id;
    });

    setSection(updatedSection);
  };

  // function used to delete section
  // function used to delete newStudent
  const editSectionById = async (id, newSectionLabel) => {
    const response = await axios.patch(`/section/${id}`, {
      sectionLabel: newSectionLabel,
    });
    const updatedSections = section.map((section) => {
      if (section._id === id) {
        return { ...section, ...response.data };
      }

      return section;
    });
    fetchSections();
    setSection(updatedSections);
  };

  const assignTeacher = async (
    sectionId,
    subjectId,
    teacherId,
    acCurriculumId,
    gradeId
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`/section/${sectionId}`, {
        subjectId,
        teacherId,
      });

      if (response.status !== 200) {
        setError(response.data.error);
        setIsLoading(false);
        return false;
      } else {
        setError(null);
        setIsLoading(false);
        fetchSectionSubject(acCurriculumId, gradeId, sectionId);
        toast.success("Teacher assigned successfully");
        return true;
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error("Failed to assign teacher");
        return false;
      }
    }
  };
  const assignHomeRoomTeacher = async (sectionId, teacherId) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`/section/${sectionId}/${teacherId}`);

      if (response.status !== 200) {
        setError(response.data.error);
        setIsLoading(false);
        return false;
      } else {
        setError(null);
        setIsLoading(false);
        fetchSections();
        toast.success("Teacher assigned successfully");
        return true;
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error("Failed to assign teacher");
        return false;
      }
    }
  };

  // shared operation between components
  const sectionOperation = {
    error,
    isLoading,
    section,
    sectionSubject,
    setError,
    setIsLoading,
    assignHomeRoomTeacher,
    assignTeacher,
    fetchSectionSubject,
    fetchSections,
    createSection,
    deleteSectionById,
    editSectionById,
  };

  return (
    <SectionContext.Provider value={sectionOperation}>
      {children}
    </SectionContext.Provider>
  );
}

export { SectionProvider };
export default SectionContext;
