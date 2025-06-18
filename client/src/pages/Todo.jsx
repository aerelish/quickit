import { useState, useEffect } from 'react';
import TodoItem from '../components/TodoItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { getTodos, addTodo, updateTodo, deleteTodo } from '../services/api';
import '../css/Todo.css';

function Todo() {
    
  // initialize hooks
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('');
  const [updatedTodoTitle, setUpdatedTodoTitle] = useState('');
  const [editing, setEditing] = useState(0);

  const loadTodos = async () => {
    try { 
      const todos = await getTodos();
      setTodos(todos);
    } catch (error) {
      console.error(error)
    }
  };

  const addNewTodo = async () => {
    try {
      await addTodo(newTodo);
      loadTodos();
    } catch (error) {
      console.error(error)
    } 
  }
  
  const editTodoItem = async (id, title) => { 
    setEditing(id);
    setUpdatedTodoTitle(title);
  }

  const deleteTodoItem = async (id) => {
    try {
      await deleteTodo(id);
      loadTodos();
    } catch (error) {
      console.error(error)
    }
  }

  const addNewTodoItem = async (event) => {
    event.preventDefault();
    try {
      addNewTodo();
      setNewTodo('');
    } catch (error) {
      console.error(error)
    }
  }

  const updateSelectedTodoItem = async (event) => {
    event.preventDefault();
    try {
      const updatedTodo = await updateTodo(editing, updatedTodoTitle);
      console.log(updatedTodo);
      setEditing(null);
      loadTodos();
    } catch (error) {
      console.error(error)
    }
  }

  const moveUp = (index) => {
    if (index === 0) return;
    // copy of todos
    const newTodos = [...todos];
    // swap indexes for index and index-1
    // note: index start with 0, so moving up means -1 index
    [newTodos[index], newTodos[index - 1]] = [newTodos[index - 1], newTodos[index]];
    setTodos(newTodos);
  }

  const moveDown = (index) => {
    if (index === todos.length - 1) return;
    // copy of todos
    const newTodos = [...todos];
    // swap indexes for index and index+1
    // note: index start with 0, so moving down means +1 index
    
    [newTodos[index], newTodos[index + 1]] = [newTodos[index + 1], newTodos[index]];
    setTodos(newTodos);
  }

  useEffect(() => { loadTodos() }, []);

  return (
    <div className='todo-wrapper'>
      <form className='todo-form' onSubmit={addNewTodoItem}>
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
            <form className='todo-form edit' key={todo.id} onSubmit={updateSelectedTodoItem}>
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
}

export default Todo