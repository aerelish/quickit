import { faXmark } from "@fortawesome/free-solid-svg-icons";
import ButtonIcon from "@/components/ButtonIcon";

function DialogBox({ 
  isOpen, 
  onClose, 
  title, 
  children 
}) {

  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[var(--black)] rounded-lg shadow-lg p-6 max-w-md w-full">
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-[var(--accent-color)]">{title}</h2>
          <ButtonIcon
            icon={faXmark}
            onClick={onClose}
            className="text-xl text-gray-400 cursor-pointer transition-all duration-200"
            hoverColor='red-500'
          /> 
        </div>
  
        {children}
  
      </div>
    </div>
  );
}

export default DialogBox
