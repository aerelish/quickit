// packages
import { useState, useEffect } from 'react';

// components
import TodoItem from '../todo/TodoItem';
import TodoForm from '../todo/TodoForm';

// services
import { validateToken } from '../../services/authServices';
import { getTodos, addTodo, updateTodo, updateTodoPriority, deleteTodo} from '../../services/todoServices';

// custom hooks
import { useScreen } from '../../hooks/useScreen';

// context
import { useAuthContext } from '../../context/AuthContext';

function Todos() {
  
  // custom context
  const { isTokenValid, setIsTokenValid } = useAuthContext();

  // initialize hooks
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('');
  const [updatedTodoTitle, setUpdatedTodoTitle] = useState('');
  const [editing, setEditing] = useState(0);

  // custom hooks
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

  // TODO - try to move this to TodoItem instead

  const updateTodoItem = async (event) => {
    event.preventDefault();
    const data = { title: updatedTodoTitle }
    const response = await updateTodo(editing, data);
    if (response.success) {
      setEditing(null);
      setTodos(prev =>
        prev.map(todo =>
          todo.id === response.data.id ? { ...todo, title: response.data.title } : todo
        )
      );
    } else {
      console.error(response.message);
    };
  };

  // TODO - try to move this to TodoItem instead

  const deleteTodoItem = async (id) => {
    const response = await deleteTodo(id);
    if (response.success) {
      setTodos(todos.filter(todo => todo.id !== id))
    } else {
      console.error(response.message);
    };
  };  

  // TODO - try to move this to TodoItem instead

  const moveUp = async (index) => {
    if (index === 0) return;
    // copy of todos
    const newTodos = [...todos];
    
    const source = newTodos[index].id;
    const target = newTodos[index - 1].id;

    // source = todo that you want to increase/decrease in priority
    // target = todo that you are targeting, e.g. the one above or below
    const response = await updateTodoPriority(target, source);
    if (response.success) {
      // swap indexes for index and index-1
      // note: index start with 0, so moving up means -1 index
      [newTodos[index], newTodos[index - 1]] = [newTodos[index - 1], newTodos[index]];    
      setTodos(newTodos);
    } else {
      console.error(response.message);
    }
  };

  // TODO - try to move this to TodoItem instead

  const moveDown = async (index) => {
    if (index === todos.length - 1) return;
    // copy of todos
    const newTodos = [...todos];

    const source = newTodos[index].id;
    const target = newTodos[index + 1].id;

    // source = todo that you want to increase/decrease in priority
    // target = todo that you are targeting, e.g. the one above or below
    const response = await updateTodoPriority(source, target);
    if (response.success) {
      // swap indexes for index and index-1
      // note: index start with 0, so moving up means -1 index
      [newTodos[index], newTodos[index + 1]] = [newTodos[index + 1], newTodos[index]];    
      setTodos(newTodos);
    } else {
      console.error(response.message);
    };
  };

  // TODO - try to move this to TodoItem instead

  // for indicating that user is editing a todo item
  const editTodoItem = (id, title) => { 
    setEditing(id);
    setUpdatedTodoTitle(title);
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
        { isMobile && todos.length > 3 && (
          <p className='text-zinc-400 cursor-pointer'>view more...</p>
        )}
      </div>
    </div>
  )
};

export default Todos