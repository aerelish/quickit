import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const validateToken = async () => {
  const token = localStorage.getItem('token');
  if (!token) return { success: false, message: 'Authentication token not found' };
  try {
    
    const response = await axios.get(`${API_URL}/api/auth/validate`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return { success: response.data.valid };

  } catch (error) {
    return { 
      success: error.response?.data?.valid,  
      status: error.response?.status,
      message: error.response?.data?.message || 'Something went wrong' 
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