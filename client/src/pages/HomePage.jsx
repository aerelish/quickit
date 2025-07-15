import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { addTodo } from "@/services/todoServices";
import { addNote } from "@/services/noteServices";
import HomeLayout from "@/layouts/HomeLayout"
import TodosSection from "@/components/sections/TodosSection"
import NotesSection from "@/components/sections/NotesSection"
import ActionSelect from "@/components/ActionSelect";
import TipTapTextEditor from "@/components/texteditor/TipTapTextEditor"
import { STR_TODO, STR_TODO_PLACEHOLDER, STR_NOTE_PLACEHOLDER } from "@/lib/constants";

function HomePage() {

  const { 
    todos, setTodos,
    notes, setNotes
  } = useAppContext() 

  const [ textEditorType, setTextEditorType ] = useState(STR_TODO)
  
  const handleOnclick = (action) => setTextEditorType(action);

  const handleSubmit = (editorContent) => {
    textEditorType === STR_TODO ? 
      handleSubmitTodo(editorContent) :
      handleSubmitNote(editorContent)
  }

  const handleSubmitTodo = async (editorContent) => {
    const response = await addTodo(editorContent);
    if (response.success) { 
      setTodos([response.data, ...todos])
    } else {
      console.error(response.message);
    };
  };

  const handleSubmitNote = async (editorContent) => {
    const response = await addNote(editorContent);
    if (response.success) { 
      setNotes([response.data, ...notes])
    } else {
      console.error(response.message);
    };
  };

  return (
    <>
      <HomeLayout 
        header={
          <div className="group mx-4 p-4 flex flex-col gap-1 border border-zinc-600 rounded-lg focus-within:ring-2 focus-within:ring-[var(--accent-color)] focus-within:outline-none">
            <ActionSelect
              onClick={handleOnclick}
            />
            <TipTapTextEditor
              onSubmit={handleSubmit} 
              type={textEditorType}
              placeholder={textEditorType === STR_TODO ? STR_TODO_PLACEHOLDER : STR_NOTE_PLACEHOLDER}
            /> 
          </div>
        }
        leftCol={
          <TodosSection/>
        }
        rightCol={
          <NotesSection/>
        }
      />
    </>
  )
}

export default HomePage