import axios from 'axios';

export const login = async (username, password) => {
  try {
    const response = await axios.post('http://localhost:8080/api/auth/login', { username, password });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const register = async (user) => {
  const { username, password, fullname, birthdate, gender } = user;
  try {
    const response = await axios.post('http://localhost:8080/api/auth/register', {
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
    const response = await axios.get('http://localhost:8080/api/todo', {
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
    const response = await axios.post('http://localhost:8080/api/todo', 
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
    const response = await axios.put(`http://localhost:8080/api/todo/${id}`, 
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
    await axios.delete(`http://localhost:8080/api/todo/${id}`, 
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
