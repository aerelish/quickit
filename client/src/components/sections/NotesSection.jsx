import NoteList from "@/components/note/NoteList";

function NotesSection() {
  return (
    <>
      <h1 className="text-2xl py-2 lg:text-3xl">Notes</h1>
      <NoteList/>
    </>
  )
}

export default NotesSection