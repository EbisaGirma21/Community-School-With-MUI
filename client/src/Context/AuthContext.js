import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

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
        setIsLoading(false);
        return true;
      }
    } catch (error) {
      setIsLoading(false);
      setError("An error occurred during login. Please try again later.");
      return false;
    }
  };
  const valueToShare = {
    login,
    isLoading,
    error,
  };

  return (
    <AuthContext.Provider value={valueToShare}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
