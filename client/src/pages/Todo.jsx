// packages
import { useState, useEffect } from 'react';

// components
import TodoItem from '../components/TodoItem';

// services
import { validateToken } from '../services/authServices';
import { getTodos, addTodo, updateTodo, deleteTodo} from '../services/todoServices';

// context
import { useAuthContext } from '../context/AuthContext';
import TodoForm from '../components/TodoForm';

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

  useEffect(() => { loadTodos() });

  return (
    <div className='max-w-lg mx-auto flex flex-col justify-center items-center'>
      <TodoForm 
        onSubmit={addTodoItem}
        placeholder='have something todo?'
        value={newTodo}
        onChange={(event) => setNewTodo(event.target.value)}
        onClick={() => (editing !== null && setEditing(0))}
        icon={'faArrowRight'}
      />
      <div className='w-full'>
        {todos.map((todo, index) => (
          todo.id === editing ? (
            <TodoForm
              key={todo.id}
              onSubmit={updateTodoItem}
              placeholder='have something todo?'
              value={updatedTodoTitle}
              onChange={(event) => setUpdatedTodoTitle(event.target.value)}
              icon={'faFloppyDisk'}
            />
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