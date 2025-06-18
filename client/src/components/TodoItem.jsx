import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

import '../css/TodoItem.css';

function TodoItem({todo, index, moveUp, moveDown, editTodoItem, deleteTodoItem}) {
  return (
    <section>
      <h3 className='todo-item-task'>{todo.title}</h3>
      <div className='todo-item-actions'>
        <FontAwesomeIcon className='todo-item-action' onClick={() => moveUp(index)} icon={faArrowUp}/>
        <FontAwesomeIcon className='todo-item-action' onClick={() => moveDown(index)} icon={faArrowDown}/>
        <FontAwesomeIcon className='todo-item-action' onClick={() => editTodoItem(todo.id, todo.title)} id='icon-edit' icon={faPenToSquare}/>
        <FontAwesomeIcon className='todo-item-action' onClick={() => deleteTodoItem(todo.id)} id='icon-trash' icon={faTrash}/>
      </div>
    </section>
  )
}

export default TodoItem