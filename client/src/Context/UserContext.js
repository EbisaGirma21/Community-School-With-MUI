import { createContext, useState } from "react";
import axios from "axios";

const UserContext = createContext();

function UserProvider({ children }) {
  const [userInfo, setUserInfo] = useState();

  const fetchUser = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      throw new Error("No Teacher ID found in local storage.");
    }
    const response = await axios.get(`/user/${user._id}`);
    setUserInfo(response.data);
  };

  // shared operation between components
  const userOperation = {
    userInfo,
    fetchUser,
  };

  return (
    <UserContext.Provider value={userOperation}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider };
export default UserContext;
