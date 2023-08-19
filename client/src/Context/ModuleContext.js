import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ModuleContext = createContext();

function ModuleProvider({ children }) {
  const [module, setModule] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  //  function  used to fetch data from database
  const fetchModules = async () => {
    const response = await axios.get("/module");
    setModule(response.data);
  };

  // function used to create module
  const createModule = async (
    moduleTitle,
    categorizedDepartment,
    coordinatorTeacher
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("/module", {
        moduleTitle,
        department: categorizedDepartment,
        coordinator: coordinatorTeacher,
      });

      if (response.status !== 200) {
        setError(response.data.error);
        setIsLoading(false);
        return false;
      } else {
        setError(null);
        setIsLoading(false);
        fetchModules();
        toast.success("Module created successfully");
        return true;
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error("Failed to create module");
        return false;
      }
    }
  };

  // function used to delete module
  const deleteModuleById = async (id) => {
    try {
      const response = await axios.delete(`/module/${id}`);

      if (response.status !== 200) {
        toast.error(response.data.error);
      } else {
        const updatedModule = module.filter((module) => {
          return module._id !== id;
        });

        setModule(updatedModule);
        toast.warning("Module deleted successfully");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Failed to delete module");
      }
    }
  };

  // function used to delete module
  const editModuleById = async (
    id,
    newModuleTitle,
    newCategorizedDepartment,
    newCoordinatorTeacher
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.patch(`/module/${id}`, {
        moduleTitle: newModuleTitle,
        department: newCategorizedDepartment,
        coordinator: newCoordinatorTeacher,
      });

      if (response.status !== 200) {
        setError(response.data.error);
        setIsLoading(false);
        return false;
      } else {
        setError(null);
        setIsLoading(false);
        fetchModules();
        toast.info("Module updated successfully");
        return true;
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error("Failed to create module");
        return false;
      }
    }
  };

  // shared operation between components
  const moduleOperation = {
    module,
    error,
    isLoading,
    setError,
    setIsLoading,
    fetchModules,
    createModule,
    deleteModuleById,
    editModuleById,
  };

  return (
    <ModuleContext.Provider value={moduleOperation}>
      {children}
    </ModuleContext.Provider>
  );
}

export { ModuleProvider };
export default ModuleContext;
