function NoteItem({ 
  note,
}) {
  return (
    <div 
      className="break-inside-avoid border border-zinc-600 rounded-lg p-4 bg-neutral-800 shadow-sm"
      dangerouslySetInnerHTML={{ __html: note.content }}
    />
  )
}

export default NoteItem