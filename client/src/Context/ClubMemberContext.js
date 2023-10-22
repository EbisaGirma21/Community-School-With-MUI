import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ClubMemberContext = createContext();

function ClubMemberProvider({ children }) {
  const [clubMember, setClubMember] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  //  function  used to fetch data from database
  const fetchClubMembers = async () => {
    const response = await axios.get("/clubMember");
    setClubMember(response.data);
  };

  // function used to create clubMember
  const createClubMember = async (club, member, role) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("/clubMember", {
        club,
        member,
        role,
      });

      if (response.status !== 200) {
        setError(response.data.error);
        setIsLoading(false);
        return false;
      } else {
        setError(null);
        setIsLoading(false);
        fetchClubMembers();
        toast.success("Club Member created successfully");
        return true;
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error("Failed to create club Member");
        return false;
      }
    }
  };

  // function used to delete clubMember
  const deleteClubMemberById = async (id) => {
    try {
      const response = await axios.delete(`/clubMember/${id}`);

      if (response.status !== 200) {
        toast.error(response.data.error);
      } else {
        const updatedClubMember = clubMember.filter((clubMember) => {
          return clubMember._id !== id;
        });

        setClubMember(updatedClubMember);
        toast.warning("Club Member deleted successfully");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Failed to delete club member");
      }
    }
  };

  // function used to delete clubMember
  const editClubMemberById = async (id, newClub, newMember, newRole) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.patch(`/clubMember/${id}`, {
        club: newClub,
        member: newMember,
        role: newRole,
      });

      if (response.status !== 200) {
        setError(response.data.error);
        setIsLoading(false);
        return false;
      } else {
        setError(null);
        setIsLoading(false);
        fetchClubMembers();
        toast.info("ClubMember updated successfully");
        return true;
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error("Failed to update clubMember");
        return false;
      }
    }
  };

  // shared operation between components
  const clubMemberOperation = {
    clubMember,
    error,
    isLoading,
    setError,
    setIsLoading,
    fetchClubMembers,
    createClubMember,
    deleteClubMemberById,
    editClubMemberById,
  };

  return (
    <ClubMemberContext.Provider value={clubMemberOperation}>
      {children}
    </ClubMemberContext.Provider>
  );
}

export { ClubMemberProvider };
export default ClubMemberContext;
