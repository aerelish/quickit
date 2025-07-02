import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const validateToken = async () => {
  const token = localStorage.getItem('token');
  try {
    
    const response = await axios.get(`${API_URL}/api/auth/validate`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data.valid;

  } catch (error) {
    
    const status = error.response?.status;
    const valid = error.response?.data?.valid;

    if (status === 401 || valid === false) {
      return false;
    }

    // log unexpected issues in development
    if (import.meta.env.DEV) {
      console.warn('Token validation failed:', error);
    };
  };
};

export const register = async (user) => {
  const { username, password, fullname, birthdate, gender } = user;
  try {
    
    const response = await axios.post(
      `${API_URL}/api/auth/register`, 
      {
        username, 
        password, 
        fullname, 
        birthdate, 
        gender
      }
    );

    return {
      success: true,
      data: response.data.token
    };
    
  } catch (error) {
    const message = error.response?.data?.message || 'Login failed';
    return {
      success: false,
      error: message
    };
  };
};

export const login = async (username, password) => {
  try {
    
    const response = await axios.post(`${API_URL}/api/auth/login`, { 
      username, 
      password 
    });

    return {
      success: true,
      data: response.data.token
    };
    
  } catch (error) {
    const message = error.response?.data?.message || 'Login failed';
    return {
      success: false,
      error: message
    };
  };
};