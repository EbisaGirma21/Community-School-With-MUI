import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const DepartmentContext = createContext();

function DepartmentProvider({ children }) {
  const [department, setDepartment] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  //  function  used to fetch data from database
  const fetchDepartments = async () => {
    const response = await axios.get("/department");
    setDepartment(response.data);
  };

  // function used to create department
  const createDepartment = async (departmentName, coordinator) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("/department", {
        departmentName,
        coordinator,
      });

      if (response.status !== 200) {
        setError(response.data.error);
        setIsLoading(false);
        return false;
      } else {
        setError(null);
        setIsLoading(false);
        fetchDepartments();
        toast.success("Department created successfully");
        return true;
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error("Failed to create department");
        return false;
      }
    }
  };

  // function used to delete department
  const deleteDepartmentById = async (id) => {
    try {
      const response = await axios.delete(`/department/${id}`);

      if (response.status !== 200) {
        toast.error(response.data.error);
      } else {
        const updatedDepartment = department.filter((department) => {
          return department._id !== id;
        });
        setDepartment(updatedDepartment);
        toast.warning("Department deleted successfully");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Failed to delete department");
      }
    }
  };

  // function used to delete department
  const editDepartmentById = async (id, newDepartmentName, newCoordinator) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.patch(`/department/${id}`, {
        departmentName: newDepartmentName,
        coordinator: newCoordinator,
      });

      if (response.status !== 200) {
        setError(response.data.error);
        setIsLoading(false);
        return false;
      } else {
        setError(null);
        setIsLoading(false);
        fetchDepartments();
        toast.info("Department updated successfully");
        return true;
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error("Failed to update department");
        return false;
      }
    }
  };

  // shared operation between components
  const departmentOperation = {
    error,
    isLoading,
    department,
    setError,
    setIsLoading,
    fetchDepartments,
    createDepartment,
    deleteDepartmentById,
    editDepartmentById,
  };

  return (
    <DepartmentContext.Provider value={departmentOperation}>
      {children}
    </DepartmentContext.Provider>
  );
}

export { DepartmentProvider };
export default DepartmentContext;
