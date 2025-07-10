import clsx from 'clsx';
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
    <div className='group flex flex-col gap-3 justify-between items-baseline px-2 py-3 border-b border-zinc-700'>
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
            <div className="flex flex-col items-start gap-1 w-full">
              {todoItem.completed && <FontAwesomeIcon className='pl-0.5 mb-1 text-green-400 text-base flex-shrink-0' icon={faCircleCheck} />}
              <h3 
                className={clsx("break-words whitespace-normal w-full cursor-pointer px-0.5", isCompleted && "line-through text-zinc-500")} 
                onClick={() => setTodoCompleted(todoItem.id, todoItem.completed)}
              >
                {todoItem.title} 
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