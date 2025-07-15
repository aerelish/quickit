import { 
  LuHeading1,
  LuBold,
  LuItalic,
  LuUnderline
} from "react-icons/lu";

const MenuBarButton = ({
  children, 
  onClick,
  isActive
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-1.5 rounded cursor-pointer transition-colors duration-150 ${isActive ? "bg-[var(--accent-color)] text-white" : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"}`}
    >
      {children}
    </button>
  )
}

const MenuBar = ({ 
  editor,
  className
}) => {

  if (!editor) {
    return null;
  }

  return (
    <div className={`flex justify-start items-baseline gap-1 ${className}`}>
      <MenuBarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
      >
        <LuBold />
      </MenuBarButton>
      <MenuBarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
      >
        <LuItalic />
      </MenuBarButton>
      <MenuBarButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive("underline")}
      >
        <LuUnderline />
      </MenuBarButton>
    </div>
  );
};

export default MenuBar