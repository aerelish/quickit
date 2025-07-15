import { useState } from 'react';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from '@/context/AppContext';
import { updateNote, deleteNote } from '@/services/noteServices';
import TipTapTextEditor from '@/components/texteditor/TipTapTextEditor';
import DialogBox from '@/components/DialogBox';
import ButtonIcon from '@/components/ButtonIcon';

function NoteItem({ 
  note,
}) {

  const { setNotes } = useAppContext();
  
  const [open, setOpen] = useState(false);
  const [noteItem, setNoteItem] = useState(note);

  const handleEdit = async (editorContent) => {
    const data = { content: editorContent }
    const response = await updateNote(noteItem.id, data);
    if (response.success) {
      setNoteItem({ ...noteItem, content: response.data.content })
    } else {
      console.error(response.message);
    };
    setOpen(false)
  }

  const handleDelete = async (id) => {
    const response = await deleteNote(id);
    if (response.success) {
      setNotes(prev => prev.filter(note => note.id !== id));
    } else {
      console.error(response.message);
    };
  };

  return (
    <div className='flex flex-col justify-center gap-2 break-inside-avoid border border-zinc-600 rounded-lg p-4 bg-neutral-800 shadow-sm'>
      <div 
        className=""
        dangerouslySetInnerHTML={{ __html: noteItem.content }}
      />
      <div className='flex gap-1.5 justify-end'>
        <ButtonIcon
          icon={faPenToSquare}
          onClick={() => setOpen(true)}
          hoverColor='[var(--accent-color)]'
        />       
        <ButtonIcon
          icon={faTrash}
          onClick={() => handleDelete(noteItem.id)}
          hoverColor='red-500'
        />   
      </div>
      <DialogBox
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Edit Note"
      >
        <TipTapTextEditor
          onSubmit={handleEdit}
          content={noteItem.content}
          icon='faFloppyDisk'
        />
      </DialogBox>
    </div>
  )
}

export default NoteItem