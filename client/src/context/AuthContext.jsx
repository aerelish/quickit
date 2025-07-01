import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem('token');  // may be null or string
    setIsLoggedIn(!!token);                       // true if token is a non-empty string, false if null
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn}}>
      {children}
    </AuthContext.Provider>
  );

};

export const useAuthContext = () => useContext(AuthContext);