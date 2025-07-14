import { createContext, useContext, useState } from "react"

const AppContext = createContext()

export const AppProvider = ({ children }) => {

  const [todos, setTodos] = useState([]);
  const [notes, setNotes] = useState([]);
  const [editorContent, setEditorContent] = useState("");
  
  return (
    <AppContext.Provider value={{
      todos, setTodos,
      notes, setNotes,
      editorContent, setEditorContent,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
