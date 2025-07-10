import { 
  LuHeading1,
  LuBold,
  LuItalic,
  LuUnderline
} from "react-icons/lu";

const MenuBar = ({ 
  editor,
  className
}) => {

  if (!editor) {
    return null;
  }

  return (
    <div className={`flex justify-start items-baseline gap-1 ${className}`}>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is_active" : ""}
      >
        <LuBold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is_active" : ""}
      >
        <LuItalic />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "is_active" : ""}
      >
        <LuUnderline />
      </button>
    </div>
  );
};

export default MenuBar