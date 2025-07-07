import { useState, useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { useScreen } from '../../hooks/useScreen';
import { validateToken } from '../../services/authServices';
import { getTodos, addTodo, updateTodoPriority } from '../../services/todoServices';
import TodoItem from '../todo/TodoItem';
import TodoForm from '../todo/TodoForm';

function Todos() {
  
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('');
  const [editing, setEditing] = useState(0);

  const { isTokenValid, setIsTokenValid } = useAuthContext();
  const { isMobile } = useScreen();

  const loadTodos = async () => {
    if (!isTokenValid) {
      const isValid = await validateToken();
      if (!isValid) localStorage.removeItem('token');
      setIsTokenValid(isValid);
    }
    const response = await getTodos();
    if (response.success) { setTodos(response.data) };
  };

  const addTodoItem = async (event) => {
    event.preventDefault();
    const response = await addTodo(newTodo);
    if (response.success) { 
      setTodos([...todos, response.data])
      setNewTodo('');
    } else {
      console.error(response.message);
    };
  };
  
  const onDeleteSuccess = (deletedId) => {
    setTodos(prev => prev.filter(todo => todo.id !== deletedId));
  };

  const moveItem = async (sourceIndex, targetIndex) => {
    // copy of todos
    const newTodos = [...todos];
    // getting ids
    const source = newTodos[sourceIndex].id;
    const target = newTodos[targetIndex].id;
    // source = todo that you want to increase/decrease in priority
    // target = todo that you are targeting, e.g. the one above or below
    const response = await updateTodoPriority(target, source);
    if (response.success) {
      [newTodos[sourceIndex], newTodos[targetIndex]] = [newTodos[targetIndex], newTodos[sourceIndex]];    
      setTodos(newTodos);
    } else {
      console.error(response.message);
    };
  };

  const moveUp = async (index) => {
    if (index === 0) return;
    moveItem(index, index - 1);
  };

  const moveDown = async (index) => {
    if (index === todos.length - 1) return;
    moveItem(index, index + 1);
  };

  useEffect(() => { loadTodos() }, []);

  return (
    <div className='flex flex-col justify-center items-center'>
      <TodoForm 
        onSubmit={addTodoItem}
        placeholder='have something todo?'
        value={newTodo}
        onChange={(event) => setNewTodo(event.target.value)}
        onClick={() => (editing !== null && setEditing(0))}
        icon={'faArrowRight'}
      />
      <div className='w-full'>
        {todos.slice(0, isMobile ? 3 : todos.length).map((todo, index) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            index={index}
            moveUp={moveUp}
            moveDown={moveDown}
            onDeleteSuccess={onDeleteSuccess}
          />
        ))}
        { isMobile && todos.length > 3 && (
          <p className='text-zinc-400 cursor-pointer'>view more...</p>
        )}
      </div>
    </div>
  )
};

export default Todos