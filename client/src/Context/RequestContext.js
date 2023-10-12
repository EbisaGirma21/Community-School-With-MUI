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
    requestedAcademicCurriculum,
    requestedGrade,
    requestedSection,
    requestedSemester
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("/request", {
        requestedAcademicCurriculum,
        requestedGrade,
        requestedSection,
        requestedSemester,
        requestType: "rosterApproval",
      });
      if (response.status !== 200) {
        setError(response.data.error);
        setIsLoading(false);
        return false;
      } else {
        setError(null);
        setIsLoading(false);
        const updateRequest = [...request, response.data];
        setRequest(updateRequest);
        toast.success("Request sent successfully");
        return true;
      }
    } catch (error) {
      if (error.response) {
        toast.warning("Request already sent");
        setError(error.response.data.error);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error("Failed to sent request");
        return false;
      }
    }
  };
  // function used to create request
  const approveRequest = async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.patch(`/request/${id}`);
      if (response.status !== 200) {
        setError(response.data.error);
        setIsLoading(false);
        return false;
      } else {
        setError(null);
        setIsLoading(false);
        fetchRequests();
        toast.success("Request approved successfully");
        return true;
      }
    } catch (error) {
      if (error.response) {
        toast.warning("Request already approved");
        setError(error.response.data.error);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error("Failed to sent request");
        return false;
      }
    }
  };

  const approveStudent = async (studentResult) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.patch(`/request/`, { studentResult });
      console.log(response.data);
      if (response.status !== 200) {
        setError(response.data.error);
        setIsLoading(false);
        return false;
      } else {
        setError(null);
        setIsLoading(false);
        toast.success("Student result approved successfully");
        return true;
      }
    } catch (error) {
      if (error.response) {
        toast.warning(error.response.data.message);
        setError(error.response.data.message);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error("Failed to enroll student");
        return false;
      }
    }
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
    approveRequest,
    approveStudent,
  };

  return (
    <RequestContext.Provider value={requestOperation}>
      {children}
    </RequestContext.Provider>
  );
}

export { RequestProvider };
export default RequestContext;
