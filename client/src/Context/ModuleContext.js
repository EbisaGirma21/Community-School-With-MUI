import { createContext, useState } from "react";
import axios from "axios";

const ModuleContext = createContext();

function ModuleProvider({ children }) {
  const [module, setModule] = useState([]);

  //  function  used to fetch data from database
  const fetchModules = async () => {
    const response = await axios.get("http://localhost:8000/api/module");
    setModule(response.data);
  };

  // function used to create module
  const createModule = async (moduleTitle) => {
    const response = await axios.post("http://localhost:8000/api/module", {
      moduleTitle,
    });

    const updateModule = [...module, response.data];
    setModule(updateModule);
  };

  // function used to delete module
  const deleteModuleById = async (id) => {
    await axios.delete(`http://localhost:8000/api/module/${id}`);

    const updatedModule = module.filter((module) => {
      return module._id !== id;
    });

    setModule(updatedModule);
  };

  // function used to delete module
  const editModuleById = async (id, newModuleTitle) => {
    const response = await axios.patch(
      `http://localhost:8000/api/module/${id}`,
      {
        moduleTitle: newModuleTitle,
      }
    );

    const updatedModules = module.map((module) => {
      if (module._id === id) {
        return { ...module, ...response.data };
      }

      return module;
    });
    fetchModules();
    setModule(updatedModules);
  };

  // shared operation between components
  const moduleOperation = {
    module,
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
