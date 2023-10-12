import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ClubContext = createContext();

function ClubProvider({ children }) {
  const [club, setClub] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  //  function  used to fetch data from database
  const fetchClubs = async () => {
    const response = await axios.get("/club");
    setClub(response.data);
  };

  // function used to create club
  const createClub = async (clubName, leader, coordinator) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("/club", {
        clubName,
        coordinator: coordinator,
        leader: leader,
      });

      if (response.status !== 200) {
        setError(response.data.error);
        setIsLoading(false);
        return false;
      } else {
        setError(null);
        setIsLoading(false);
        fetchClubs();
        toast.success("Club created successfully");
        return true;
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error("Failed to create club");
        return false;
      }
    }
  };

  // function used to delete club
  const deleteClubById = async (id) => {
    try {
      const response = await axios.delete(`/club/${id}`);

      if (response.status !== 200) {
        toast.error(response.data.error);
      } else {
        const updatedClub = club.filter((club) => {
          return club._id !== id;
        });

        setClub(updatedClub);
        toast.warning("Club deleted successfully");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Failed to delete club");
      }
    }
  };

  // function used to delete club
  const editClubById = async (id, newClubName, newLeader, newCoordinator) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.patch(`/club/${id}`, {
        clubName: newClubName,
        coordinator: newCoordinator,
        leader: newLeader,
      });

      if (response.status !== 200) {
        setError(response.data.error);
        setIsLoading(false);
        return false;
      } else {
        setError(null);
        setIsLoading(false);
        fetchClubs();
        toast.info("Club updated successfully");
        return true;
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error("Failed to update club");
        return false;
      }
    }
  };

  // shared operation between components
  const clubOperation = {
    club,
    error,
    isLoading,
    setError,
    setIsLoading,
    fetchClubs,
    createClub,
    deleteClubById,
    editClubById,
  };

  return (
    <ClubContext.Provider value={clubOperation}>
      {children}
    </ClubContext.Provider>
  );
}

export { ClubProvider };
export default ClubContext;
