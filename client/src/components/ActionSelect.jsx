import { useState } from "react"
import { STR_TODO, STR_NOTE } from "@/lib/constants";

function ActionSelect({onClick}) {
  
  const [selected, setSelected] = useState(STR_TODO)

  const handleOnClick = (action) => {
    setSelected(action);
    onClick(action);
  }

  return (
    <div className='flex gap-2 text-sm'>
      <h3 
        className={`cursor-pointer ${selected === STR_TODO ? 'text-[var(--accent-color)]' : 'text-zinc-500'}`}
        onClick={() => handleOnClick(STR_TODO)}
      >
        Todo
      </h3>
      <h3 
        className={`cursor-pointer ${selected === STR_NOTE ? 'text-[var(--accent-color)]' : 'text-zinc-500'}`}
        onClick={() => handleOnClick(STR_NOTE)}
      >
        Note
      </h3>
    </div>
  )
}

export default ActionSelect