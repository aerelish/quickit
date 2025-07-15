import clsx from 'clsx';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faArrowUp, faArrowDown, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { updateTodo, deleteTodo } from '@/services/todoServices';
import ButtonIcon from '@/components/ButtonIcon'
import TipTapTextEditor from '@/components/texteditor/TipTapTextEditor';

function TodoItem({
  todo, 
  index, 
  moveUp, 
  moveDown,
  onDeleteSuccess,
}){

  const [todoItem, setTodoItem] = useState(todo);
  const [isCompleted, setIsCompleted] = useState(todo.completed);
  const [editing, setEditing] = useState(null);

  const updateTodoItem = async (editorContent) => {
    const data = { title: editorContent }
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

  const editTodoItem = (id) => { 
    if (editing !== null) return;
    setEditing(id);
  };

  if (editing) {
    return (
      <div className='px-3 py-2 border border-[var(--accent-color)]'>
        <TipTapTextEditor
          onSubmit={updateTodoItem}
          content={todoItem.title}
          icon='faFloppyDisk'
        />
      </div>
    )
  }

  return (
    <div className='group flex flex-col gap-1 justify-between items-start px-2 py-2 border-b border-zinc-700'>
      <h3 
        className={clsx("break-words whitespace-normal w-full cursor-pointer px-0.5", isCompleted && "line-through text-zinc-500")} 
        onClick={() => setTodoCompleted(todoItem.id, todoItem.completed)}
      >
        {todoItem.title} 
      </h3>
      <div className='w-full flex justify-between items-center'>
        {todoItem.completed && <FontAwesomeIcon className='pl-0.5 mb-1 text-green-400 text-base flex-shrink-0' icon={faCircleCheck} />}
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
            onClick={() => editTodoItem(todoItem.id)}
            hoverColor='[var(--accent-color)]'
          />       
          <ButtonIcon
            icon={faTrash}
            onClick={() => deleteTodoItem(todoItem.id)}
            hoverColor='red-500'
          />      
        </div>
      </div>
    </div>
  )
}

export default TodoItem