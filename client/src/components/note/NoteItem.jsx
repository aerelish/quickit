function NoteItem({ 
  note,
}) {
  return (
    // <div className="border border-zinc-600 rounded-lg flex-shrink-0 basis-[calc(50%-0.25rem)] md:basis-[calc(33.333%-0.35rem)] p-2">
    //   <h1 className="text-lg font-medium pb-1">{note.title}</h1>
    //   <p className="text-sm">{note.content}</p>
    // </div>
    <div className="break-inside-avoid border border-zinc-600 rounded-lg p-4 bg-neutral-800 shadow-sm">
      <h1 className="text-base font-semibold mb-1">{note.title}</h1>
      <p className="text-sm whitespace-pre-wrap">{note.content}</p>
    </div>
  )
}

export default NoteItem