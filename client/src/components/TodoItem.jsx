// packages and stuff
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faArrowUp, faArrowDown, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

// services
import { updateTodo } from '../services/todoServices';

// components
import ButtonIcon from './ButtonIcon'

function TodoItem({
  todo, 
  index, 
  moveUp, 
  moveDown, 
  editTodoItem, 
  deleteTodoItem
}){

  const [todoItem, setTodoItem] = useState(todo);
  const [isCompleted, setIsCompleted] = useState(todo.completed);

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

  return (
    <div className='flex flex-col gap-4 justify-between items-baseline py-3 border-b border-zinc-700 '>
      <div className='pl-0.5 flex flex-col gap-2 justify-center items-start w-full min-w-0'>
        {todoItem.completed && <FontAwesomeIcon className='text-green-400 text-base' icon={faCircleCheck} />}
        <h3 
          className={`break-words whitespace-normal w-full cursor-pointer px-0.5 ${isCompleted && 'line-through text-zinc-500'}`} 
          onClick={() => setTodoCompleted(todoItem.id, todoItem.completed)}
        >
          {todo.title} 
        </h3>
      </div>
      <div className='w-full flex gap-1.5 justify-end pr-1 items-center'>   
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
          onClick={() => editTodoItem(todo.id, todo.title)}
          hoverColor='[var(--accent-color)]'
        />       
        <ButtonIcon
          icon={faTrash}
          onClick={() => deleteTodoItem(todo.id)}
          hoverColor='red-500'
        />       
      </div>
    </div>
  )
}

export default TodoItem