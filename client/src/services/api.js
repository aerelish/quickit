import axios from 'axios';

export const login = async (username, password) => {
  try {
    const response = await axios.post('http://localhost:8080/api/auth/login', { username, password });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getTodos = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/todo');
    return response.data;
  } catch (error) {
    console.error(error)
  }
};

export const addTodo = async (title) => {
  try {
    const response = await axios.post('http://localhost:8080/api/todo', { title })
    console.log(response.data) 
  } catch (error) {
    console.error(error)
  }  
};

export const updateTodo = async (id, title) => {
  try {
    const response = await axios.put(`http://localhost:8080/api/todo/${id}`, { title })
    return response.data;
  } catch (error) {
    console.error(error)
  }
};

export const deleteTodo = async (id) => {
  try {
    await axios.delete(`http://localhost:8080/api/todo/${id}`)
    console.log(`Todo of id:${id} deleted...`) 
  } catch (error) {
    console.error(error)
  }
};
