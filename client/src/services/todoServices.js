import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "";

// get all todo for user
export const getTodos = async () => {
  const token = localStorage.getItem('token');
  if (!token) return { success: false, message: 'Authentication token not found' };
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

// add new todo for user
export const addTodo = async (title) => {
  const token = localStorage.getItem('token');
  if (!token) return { success: false, message: 'Authentication token not found' };
  try {

    const response = await axios.post(`${API_URL}/api/todo`, 
      { title }, 
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

// update priority (swap up/down) for user
// source = todo that you want to increase/decrease in priority
// target = todo that you are targeting, e.g. the one above or below
export const updateTodoPriority = async ( source, target ) => {
  const token = localStorage.getItem('token');
  if (!token) return { success: false, message: 'Authentication token not found' };
  try {
    const response = await axios.put(`${API_URL}/api/todo/swap`,
      { source, target}, 
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
    }

  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Something went wrong' }
  }
};

// update selected todo for  user
export const updateTodo = async (id, data) => {
  const token = localStorage.getItem('token');
  if (!token) return { success: false, message: 'Authentication token not found' };
  try {
    const response = await axios.put(`${API_URL}/api/todo/${id}`, 
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
};

// deleted selected todo for user
export const deleteTodo = async (id) => {
  const token = localStorage.getItem('token');
  if (!token) return { success: false, message: 'Authentication token not found' };
  try {
    await axios.delete(`${API_URL}/api/todo/${id}`, 
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
};