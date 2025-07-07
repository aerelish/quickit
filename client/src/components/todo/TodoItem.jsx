import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faArrowUp, faArrowDown, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { updateTodo, deleteTodo } from '../../services/todoServices';
import TodoForm from './TodoForm';
import ButtonIcon from '../ButtonIcon'

function TodoItem({
  todo, 
  index, 
  moveUp, 
  moveDown, 
  onDeleteSuccess,
}){

  const [todoItem, setTodoItem] = useState(todo);
  const [todoInput, setTodoInput] = useState('');
  const [isCompleted, setIsCompleted] = useState(todo.completed);
  const [editing, setEditing] = useState(null);

  const updateTodoItem = async (event) => {
    event.preventDefault();
    const data = { title: todoInput }
    const response = await updateTodo(editing, data);
    if (response.success) {
      setTodoItem({ ...todoItem, title: response.data.title })
      setEditing(null);
    } else {
      console.error(response.message);
    };
  };

  const deleteTodoItem = async (id) => {
    const response = await deleteTodo(id);
    if (response.success) {
      onDeleteSuccess(todoItem.id)
    } else {
      console.error(response.message);
    };
  };  
  
  const setTodoCompleted = async (id, isCompleted) => {
    const data = { completed: !isCompleted }
    const response = await updateTodo(id, data);
    if (response.success) {
      setTodoItem({ ...todoItem, completed: response.data.completed })
      setIsCompleted(response.data.completed)
    } else {
      console.error(response.message);
    };
  };

  const editTodoItem = (id, title) => { 
    setEditing(id);
    setTodoInput(title);
  };
  const handleUpdateTodoChange = (event) => { setTodoInput(event.target.value) }

  return (
    <div className='flex justify-between items-center border-b border-zinc-700 py-1.5 my-3'>
      { todoItem.id === editing ? (
          <TodoForm
            onSubmit={updateTodoItem}
            placeholder='have something todo?'
            value={todoInput}
            onChange={(event) => handleUpdateTodoChange(event)}
            icon={'faFloppyDisk'}
          />
        ) : (
          <>
            <div className='pl-0.5 flex gap-1 items-center'>
              {todoItem.completed && <FontAwesomeIcon className='text-green-400 text-base' icon={faCircleCheck} />}
              <h3 
                className={`cursor-pointer px-0.5 ${isCompleted && 'line-through text-zinc-500'}`} 
                onClick={() => setTodoCompleted(todoItem.id, todoItem.completed)}
              >
                {todoItem.title} 
              </h3>
            </div>
            <div className='flex gap-1.5 pr-1 items-center'>   
              <ButtonIcon
                icon={faArrowUp}
                onClick={() => moveUp(index)}
                hoverColor='[var(--white)]'
              />       
              <ButtonIcon
                icon={faArrowDown}
                onClick={() => moveDown(index)}
                hoverColor='[var(--white)]'
              />       
              <ButtonIcon
                icon={faPenToSquare}
                onClick={() => editTodoItem(todoItem.id, todoItem.title)}
                hoverColor='[var(--accent-color)]'
              />       
              <ButtonIcon
                icon={faTrash}
                onClick={() => deleteTodoItem(todoItem.id)}
                hoverColor='red-500'
              />       
            </div>
          </>
        )
      }
    </div>
  )
}

export default TodoItem