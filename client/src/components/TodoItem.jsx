import { faArrowUp, faArrowDown, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

// components
import ButtonIcon from './ButtonIcon'

function TodoItem({
  todo, 
  index, 
  moveUp, 
  moveDown, 
  editTodoItem, 
  deleteTodoItem}
){
  return (
    <div className='flex justify-between items-center border-b border-zinc-700 py-1.5 my-3'>
      <h3 className='px-0.5'>{todo.title}</h3>
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