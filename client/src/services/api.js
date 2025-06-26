import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, { username, password });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const register = async (user) => {
  const { username, password, fullname, birthdate, gender } = user;
  try {
    const response = await axios.post(`${API_URL}/api/auth/register`, {
      username, 
      password, 
      fullname, 
      birthdate, 
      gender
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export const getTodos = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${API_URL}/api/todo`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(error)
  }
};

export const addTodo = async (title) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.post(`${API_URL}/api/todo`, 
      { title }, 
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    console.log(response.data) 
  } catch (error) {
    console.error(error)
  }  
};

export const updateTodo = async (id, title) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.put(`${API_URL}/api/todo/${id}`, 
      { title }, 
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return response.data;
  } catch (error) {
    console.error(error)
  }
};

export const deleteTodo = async (id) => {
  const token = localStorage.getItem('token');
  try {
    await axios.delete(`${API_URL}/api/todo/${id}`, 
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    console.log(`Todo of id:${id} deleted...`) 
  } catch (error) {
    console.error(error)
  }
};
