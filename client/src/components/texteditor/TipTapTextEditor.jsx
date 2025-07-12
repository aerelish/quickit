import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from '@tiptap/extension-placeholder';
import MenuBar from "@/components/texteditor/MenuBar";
import ButtonIcon from "@/components/ButtonIcon";
import icons from "@/lib/icons";

const TipTapTextEditor = ({
  onSubmit, 
  content = "",
  placeholder,
  icon = 'faArrowRight',
}) => {

  const [ editorContent, setEditorContent ] = useState(content);

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
    content: editorContent,
    editorProps: {
      attributes: {
        class: "pl-0.5 prose prose-base md:prose-md lg:prose-lg xl:prose-2xl focus:outline-none",
      }
    },
    onUpdate: ({ editor }) => {
      // const html = editor.getHTML();
      const text = editor.getText();
      setEditorContent(text);
    },
  });

  useEffect(() => {
    if (!editor) return;
    const placeholderExt = editor.extensionManager.extensions.find(
      ext => ext.name === "placeholder"
    );
    if (placeholderExt) {
      placeholderExt.options.placeholder = placeholder;
      editor.commands.focus(); // Optional
    };
  }, [placeholder, editor]);

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(editorContent);
    
    if (!editor) return;
    editor.commands.clearContent();
    setEditorContent("");

  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-1 p-.5">
      <EditorContent editor={editor} />
      <div className="flex justify-between items-center">
        <MenuBar editor={editor} className="text-base text-zinc-400" />
        <ButtonIcon
          icon={icons[icon]}
          className='text-lg text-zinc-400 cursor-pointer'
        />
      </div>  
    </form>
  );
};

export default TipTapTextEditor