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
        setUser(JSON.parse(localStorage.getItem("user")));
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
  const valueToShare = {
    login,
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
