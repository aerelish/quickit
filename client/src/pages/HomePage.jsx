import HomeLayout from "@/layouts/HomeLayout"
import TodosSection from "@/components/sections/TodosSection"
import NotesSection from "@/components/sections/NotesSection"
import TextEditor from "@/components/texteditor/TextEditor"

function HomePage() {
  return (
    <>
      <HomeLayout 
        leftCol={
          <>
            <TextEditor/>
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