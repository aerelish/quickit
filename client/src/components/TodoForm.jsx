import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

// components
import InputField from "./InputField"
import ButtonIcon from './ButtonIcon';

function TodoForm({ 
  onSubmit, 
  placeholder,
  value,
  onChange,
  onClick,
  icon
}) {

  const icons = {
    faArrowRight,
    faFloppyDisk,
  }

  return (
    <form className='w-full flex items-center' onSubmit={onSubmit}>
      <div className='relative w-full'>
        <InputField
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onClick={onClick}
          className='pr-6.5'
        />
        <ButtonIcon
          icon={icons[icon]}
          className='absolute right-1 top-1/2 transform -translate-y-1/2 text-lg text-gray-400 cursor-pointer hover:text-[var(--accent-color)]'
        />
      </div>
    </form>
  )
}

export default TodoForm