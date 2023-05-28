import { createContext, useState } from "react";
import axios from "axios";

const SectionContext = createContext();

function SectionProvider({ children }) {
  const [section, setSection] = useState([]);

  //  function  used to fetch data from database
  const fetchSections = async () => {
    const response = await axios.get("/section");
    setSection(response.data);
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

  // shared operation between components
  const sectionOperation = {
    section,
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
