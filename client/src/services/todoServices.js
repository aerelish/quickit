import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const getTodos = async () => {
  
  const token = localStorage.getItem('token');
  if (!token) {
    return {
      success: false,
      error: "Authentication token not found"
    }
  }

  try {
    
    const response = await axios.get(`${API_URL}/api/todo`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    return {
      success: true,
      data: response.data
    };

  } catch (error) {
    
    return {
      success: false,
      status: error.response?.status,
      error: error.response?.data?.message
    };

  };
};
