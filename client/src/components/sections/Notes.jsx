import { sampleNotes } from "../../data/sampleNotes"
import NoteItem from "../note/NoteItem";

function Notes() {

  const notesData = sampleNotes;

  return (
    <div className="">
      <h1 className="text-2xl py-2 lg:text-3xl">Notes</h1>
      <div className="columns-2 md:columns-3 gap-3 space-y-3">
        {notesData.map((note) => {
          return (
            <NoteItem 
              key={note.id}
              note={note}
            />
        )})}
      </div>
    </div>
  )
}

export default Notes