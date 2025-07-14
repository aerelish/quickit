import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import DOMPurify from 'dompurify';
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from '@tiptap/extension-placeholder';
import MenuBar from "@/components/texteditor/MenuBar";
import ButtonIcon from "@/components/ButtonIcon";
import icons from "@/lib/icons";
import { STR_TODO } from "@/lib/constants";

const TipTapTextEditor = ({
  onSubmit, 
  type = STR_TODO,
  placeholder,
  content = "",
  icon = 'faArrowRight',
}) => {

  const [ editorContent, setEditorContent ] = useState(content);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        showOnlyCurrent: false,
        showOnlyWhenEditable: true,
        placeholder: ({ node }) => {
          if (type === STR_TODO) return placeholder;
          if (node.type.name === "heading") return "Title";
          if (node.type.name === "paragraph") return placeholder;
          return null;
        },
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: "pl-0.5 prose prose-base md:prose-md lg:prose-lg xl:prose-2xl focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      const updated = type === STR_TODO
        ? editor.getText()
        : DOMPurify.sanitize(editor.getHTML());
      setEditorContent(updated);
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