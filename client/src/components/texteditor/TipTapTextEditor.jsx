import { useEditor, EditorContent } from "@tiptap/react";
import { faArrowRight, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from '@tiptap/extension-placeholder';
import ButtonIcon from "@/components/ButtonIcon";
import MenuBar from "@/components/texteditor/MenuBar";

const TipTapTextEditor = ({ 
  setDescription, 
  icon,
  placeholder,
}) => {

  const icons = {
    faArrowRight,
    faFloppyDisk,
  }

  const editor = useEditor({
    extensions: [
      StarterKit, 
      Underline,
      Placeholder.configure({
        placeholder: placeholder,
        showOnlyWhenEditable: true,
        showOnlyCurrent: false, // show for all empty nodes
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: "prose prose-base md:prose-md lg:prose-lg xl:prose-2xl focus:outline-none",
      }
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setDescription(html);
    },
  });

  return (
    <>
      <EditorContent editor={editor} />
      <div className="flex justify-between items-center">
        <MenuBar editor={editor} className="text-base text-zinc-400" />
        <ButtonIcon
          icon={icons[icon]}
          className='text-lg text-zinc-400 cursor-pointer'
        />
      </div>      
    </>
  );
};

export default TipTapTextEditor