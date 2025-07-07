import { useState } from "react"

function ActionSelect() {
  
  const [selected, setSelected] = useState('Todo')

  return (
    <div className='max-w-7xl mx-auto flex gap-2 text-sm'>
      <h3 
        className={`cursor-pointer ${selected === 'Todo' ? 'text-[var(--accent-color)]' : 'text-zinc-500'}`}
        onClick={() => setSelected('Todo')}
      >
        Todo
      </h3>
      <h3 
        className={`cursor-pointer ${selected === 'Note' ? 'text-[var(--accent-color)]' : 'text-zinc-500'}`}
        onClick={() => setSelected('Note')}
      >
        Note
      </h3>
    </div>
  )
}

export default ActionSelect