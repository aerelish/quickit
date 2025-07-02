import { createContext, useContext, useState, useEffect } from "react";
import { validateToken } from '../services/authServices';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {

    const setTokenValidation = async () => {      
      const isValid = await validateToken();
      if (!isValid) localStorage.removeItem('token')
      setIsLoggedIn(isValid); 
      setIsTokenValid(isValid);
    };

    const token = localStorage.getItem('token');   
    if (token) setTokenValidation();

  }, []);

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      setIsLoggedIn,
      isTokenValid, 
      setIsTokenValid,
    }}>
      {children}
    </AuthContext.Provider>
  );

};

export const useAuthContext = () => useContext(AuthContext);