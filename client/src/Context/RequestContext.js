import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const RequestContext = createContext();

function RequestProvider({ children }) {
  const [request, setRequest] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  //  function  used to fetch data from database
  const fetchRequests = async () => {
    const response = await axios.get("/request");
    setRequest(response.data);
  };



  // function used to create request
  const createRequest = async (
    requestLabel,
    academicCurriculum,
    grade,
    subjects
  ) => {
    const response = await axios.post("/request", {
      requestLabel,
      academicCurriculum,
      grade,
      subjects,
    });

    const updateRequest = [...request, response.data];
    setRequest(updateRequest);
  };

  // shared operation between components
  const requestOperation = {
    error,
    isLoading,
    request,
    setError,
    setIsLoading,
    fetchRequests,
    createRequest,
  };

  return (
    <RequestContext.Provider value={requestOperation}>
      {children}
    </RequestContext.Provider>
  );
}

export { RequestProvider };
export default RequestContext;
