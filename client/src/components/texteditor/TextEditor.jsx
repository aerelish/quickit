import TipTapTextEditor from "@/components/texteditor/TipTapTextEditor";
import ActionSelect from "@/components/ActionSelect";

function TextEditor() {

  const placeholder = "have something to do?"

  return (
    <div 
      tabIndex={0}
      className="group w-full border border-zinc-600 rounded-lg p-4 flex flex-col gap-4 focus-within:ring-2 focus-within:ring-[var(--accent-color)] focus-within:outline-none"
    >
      <ActionSelect/>
      <TipTapTextEditor 
        icon="faArrowRight" 
        placeholder={placeholder}
      />
    </div>
  )
}

export default TextEditor