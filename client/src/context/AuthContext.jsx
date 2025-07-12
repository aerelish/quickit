import { createContext, useContext, useState, useEffect } from "react";
import { validateToken } from '@/services/authServices';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {

    const setTokenValidation = async () => {

      const token = localStorage.getItem('token');  
      if (!token) {
        setIsLoggedIn(false); 
        return;
      }
      
      const response = await validateToken();
      if (!response.success) localStorage.removeItem('token');

      setIsLoggedIn(response.success); 
      setIsTokenValid(response.success);

    };

    setTokenValidation();

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