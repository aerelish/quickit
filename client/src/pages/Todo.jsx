// packages
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

// components
import TodoItem from '../components/TodoItem';

// services
import { validateToken } from '../services/authServices';
import { getTodos, addTodo, updateTodo, deleteTodo} from '../services/todoServices';

// context
import { useAuthContext } from '../context/AuthContext';

// styling
import '../css/Todo.css';

function Todo() {
  
  const { isTokenValid, setIsTokenValid } = useAuthContext();

  // initialize hooks
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('');
  const [updatedTodoTitle, setUpdatedTodoTitle] = useState('');
  const [editing, setEditing] = useState(0);

  const loadTodos = async () => {
    if (!isTokenValid) {
      const isValid = await validateToken();
      if (!isValid) localStorage.removeItem('token');
      setIsTokenValid(isValid);
    }
    const response = await getTodos();
    if (response.success) setTodos(response.data)
  };

  const addTodoItem = async (event) => {
    event.preventDefault();
    const response = await addTodo(newTodo);
    if (response.success) { 
      setNewTodo('');
      loadTodos();
    } else {
      console.error(response.message);
    };
  };

  const updateTodoItem = async (event) => {
    event.preventDefault();
    const response = await updateTodo(editing, updatedTodoTitle);
    if (response.success) {
      setEditing(null);
      loadTodos();
    } else {
      console.error(response.message);
    };
  };

  const deleteTodoItem = async (id) => {
    const response = await deleteTodo(id);
    if (response.success) {
      loadTodos();
    } else {
      console.error(response.message);
    };
  };

  const editTodoItem = (id, title) => { 
    setEditing(id);
    setUpdatedTodoTitle(title);
  };

  const moveUp = (index) => {
    if (index === 0) return;
    // copy of todos
    const newTodos = [...todos];
    // swap indexes for index and index-1
    // note: index start with 0, so moving up means -1 index
    [newTodos[index], newTodos[index - 1]] = [newTodos[index - 1], newTodos[index]];
    setTodos(newTodos);
  };

  const moveDown = (index) => {
    if (index === todos.length - 1) return;
    // copy of todos
    const newTodos = [...todos];
    // swap indexes for index and index+1
    // note: index start with 0, so moving down means +1 index
    [newTodos[index], newTodos[index + 1]] = [newTodos[index + 1], newTodos[index]];
    setTodos(newTodos);
  };

  useEffect(() => { loadTodos() }, []);

  return (
    <div className='todo-wrapper'>
      <form className='todo-form' onSubmit={addTodoItem}>
        <input 
          className='todo-form-input' 
          type="text" 
          placeholder='enter todo here...'
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
          onClick={() => ( editing !== null && setEditing(0) )}
        />
        <button className='todo-form-btn' type='submit'>
          <FontAwesomeIcon icon={faArrowRight}/>
        </button>
      </form>
      <div className='todo-items'>
        {todos.map((todo, index) => (
          todo.id === editing ? (
            <form className='todo-form edit' key={todo.id} onSubmit={updateTodoItem}>
              <input 
                className='todo-form-input' 
                type="text" 
                value={updatedTodoTitle}
                onChange={(event) => setUpdatedTodoTitle(event.target.value)}
              />
              <button className='todo-form-btn' type='submit'>
                <FontAwesomeIcon className='action' icon={faFloppyDisk}/>
              </button>
            </form>
          ) : (
            <TodoItem
              key={todo.id}
              todo={todo}
              index={index}
              moveUp={moveUp}
              moveDown={moveDown}
              editTodoItem={editTodoItem}
              deleteTodoItem={deleteTodoItem}
            />
          )
        ))}
      </div>
    </div>
  )
};

export default Todo