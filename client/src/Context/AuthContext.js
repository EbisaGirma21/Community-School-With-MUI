import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error);
        return false;
      } else {
        localStorage.setItem("user", JSON.stringify(json));
        setUser(json);
        setIsLoading(false);
        console.log(json);
        return json;
      }
    } catch (error) {
      setIsLoading(false);
      setError(
        "An error occurred during login. Please try again later.",
        error.message
      );
      return false;
    }
  };

  // Add changePassword function
  const changePassword = async (currentPassword, newPassword) => {
    setIsLoading(true);
    setError(null);

    try {
      // Ensure the user is authenticated and we have their token
      if (!user || !user.token) {
        setError("You must be logged in to change your password.");
        setIsLoading(false);
        return false;
      }

      const response = await fetch(
        "http://localhost:8000/api/user/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`, // Include the user's token
          },
          body: JSON.stringify({ currentPassword, newPassword, id: user?._id }),
        }
      );

      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error);
        return false;
      } else {
        setIsLoading(false);
        console.log("Password changed successfully.");
        return true;
      }
    } catch (error) {
      setIsLoading(false);
      setError(
        "An error occurred while changing the password. Please try again later.",
        error.message
      );
      return false;
    }
  };

  const valueToShare = {
    login,
    changePassword, // Add this to the shared context value
    user,
    isLoading,
    error,
  };

  return (
    <AuthContext.Provider value={valueToShare}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
