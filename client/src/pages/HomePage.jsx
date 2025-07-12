import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { addTodo } from "@/services/todoServices";
import HomeLayout from "@/layouts/HomeLayout"
import TodosSection from "@/components/sections/TodosSection"
import NotesSection from "@/components/sections/NotesSection"
import ActionSelect from "@/components/ActionSelect";
import TipTapTextEditor from "@/components/texteditor/TipTapTextEditor"
import { STR_TODO, STR_TODO_PLACEHOLDER, STR_NOTE_PLACEHOLDER } from "@/lib/constants";

function HomePage() {

  const { 
    todos, setTodos
  } = useAppContext() 

  const [ placeholder, setPlaceholder ] = useState(STR_TODO_PLACEHOLDER)

  const handleOnclick = (action) => {
    action === STR_TODO ? 
      setPlaceholder(STR_TODO_PLACEHOLDER) :
      setPlaceholder(STR_NOTE_PLACEHOLDER)
  };

  const handleSubmit = async (editorContent) => {
    console.log(editorContent);
    const response = await addTodo(editorContent);
    if (response.success) { 
      setTodos([response.data, ...todos])
    } else {
      console.error(response.message);
    };
  };

  return (
    <>
      <HomeLayout 
        leftCol={
          <>
            <div 
              tabIndex={0}
              className="group w-full border border-zinc-600 rounded-lg p-4 flex flex-col gap-1 focus-within:ring-2 focus-within:ring-[var(--accent-color)] focus-within:outline-none"
            >
              <ActionSelect
                onClick={handleOnclick}
              />
              <TipTapTextEditor
                onSubmit={handleSubmit} 
                placeholder={placeholder}
                icon="faArrowRight"
              />  
            </div>
            <TodosSection/>
          </>
        }
        rightCol={
          <NotesSection/>
        }
      />
    </>
  )
}

export default HomePage