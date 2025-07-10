import HomeLayout from "@/components/layouts/HomeLayout"
import TodosSection from "@/components/sections/TodosSection"
import NotesSection from "@/components/sections/NotesSection"

function HomePage() {
  return (
    <>
      <HomeLayout 
        leftCol={
          <>
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