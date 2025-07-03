import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ButtonIcon ({
  icon,
  onClick, 
  hoverColor = '',
  className = ''
}) {

  const defaultClassStyle = `text-sm text-gray-400 cursor-pointer transition-all duration-200 ${hoverColor && `hover:text-${hoverColor}`}`
  
  return (
    <button className={className ? className : defaultClassStyle}>
      <FontAwesomeIcon
        onClick={onClick}
        icon={icon}
      />
    </button>
  );
};

export default ButtonIcon;