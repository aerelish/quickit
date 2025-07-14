import { useEffect } from 'react';
import { getNotes } from '@/services/noteServices';
import { useAppContext } from '@/context/AppContext';
import NoteItem from "@/components/note/NoteItem";

function NoteList() {

  const loadNotes = async () => {
    const response = await getNotes();
    if (response.success) { setNotes(response.data) };
  }

  const { notes, setNotes } = useAppContext(); 
  
  useEffect(() => { loadNotes }, [])

  useEffect(() => {
    setNotes(notes)
  } ,[notes])

  return (
    <div className="columns-2 md:columns-3 gap-3 space-y-3">
      {notes.map((note) => {
        return (
          <NoteItem 
            key={note.id}
            note={note}
          />
      )})}
    </div>
  )
}

export default NoteList