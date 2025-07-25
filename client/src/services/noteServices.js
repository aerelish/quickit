import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "";

export const getNotes = async () => {
  const token = localStorage.getItem('token');
  if (!token) return { success: false, message: 'Authentication token not found' };
  try {
    
    const response = await axios.get(`${API_URL}/api/note`, {
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
}

export const addNote = async (content) => {
  const token = localStorage.getItem('token');
  if (!token) return { success: false, message: 'Authentication token not found' };
  try {

    const response = await axios.post(`${API_URL}/api/note`, 
      { content }, 
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
      },
    );
    
    if (response.data) {
      return { success: true, data: response.data };
    } else {
      return { success: false, message: 'Something went wrong' }
    }

  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Something went wrong' }
  };  
};

export const updateNote = async (id, data) => {
  const token = localStorage.getItem('token');
  if (!token) return { success: false, message: 'Authentication token not found' };
  try {
    const response = await axios.put(`${API_URL}/api/note/${id}`, 
      { data }, 
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    if (response.data) {
      return { success: true, data: response.data };
    } else {
      return { success: false, message: 'Something went wrong' };
    };

  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Something went wrong' }
  }
}

export const deleteNote = async (id) => {
  const token = localStorage.getItem('token');
  if (!token) return { success: false, message: 'Authentication token not found' };
  try {
    await axios.delete(`${API_URL}/api/note/${id}`, 
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return { success: true };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Something went wrong' };
  }
}