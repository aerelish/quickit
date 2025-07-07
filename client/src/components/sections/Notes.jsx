import { sampleNotes } from "../../data/sampleNotes"
import NoteItem from "../NoteItem";

function Notes() {

  const notesData = sampleNotes;

  return (
    <div className="mt-2">
      <h1 className="text-2xl py-2">Notes</h1>
      <div className="columns-2 md:columns-3 gap-3 space-y-3">
        {notesData.map((note) => {
          return (
            <NoteItem 
              note={note}
            />
        )})}
      </div>
    </div>
  )
}

export default Notes