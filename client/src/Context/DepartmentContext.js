import { createContext, useState } from "react";
import axios from "axios";

const DepartmentContext = createContext();

function DepartmentProvider({ children }) {
  const [department, setDepartment] = useState([]);

  //  function  used to fetch data from database
  const fetchDepartments = async () => {
    const response = await axios.get("/department");
    setDepartment(response.data);
  };

  // function used to create department
  const createDepartment = async (departmentName) => {
    const response = await axios.post("/department", {
      departmentName,
    });

    const updateDepartment = [...department, response.data];
    setDepartment(updateDepartment);
  };

  // function used to delete department
  const deleteDepartmentById = async (id) => {
    await axios.delete(`/department/${id}`);

    const updatedDepartment = department.filter((department) => {
      return department._id !== id;
    });

    setDepartment(updatedDepartment);
  };

  // function used to delete department
  const editDepartmentById = async (id, newDepartmentName) => {
    const response = await axios.patch(
      `/department/${id}`,
      {
        departmentName: newDepartmentName,
      }
    );

    const updatedDepartments = department.map((department) => {
      if (department._id === id) {
        return { ...department, ...response.data };
      }

      return department;
    });
    fetchDepartments();
    setDepartment(updatedDepartments);
  };

  // shared operation between components
  const departmentOperation = {
    department,
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
