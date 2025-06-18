import axios from 'axios';

export const getTodos = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/todo');
    return response.data;
  } catch (error) {
    console.error(error)
  }
}

export const addTodo = async (data) => {
  try {
    const response = await axios.post('http://localhost:8080/api/todo', { title: data })
    console.log(response.data) 
  } catch (error) {
    console.error(error)
  }  
}
