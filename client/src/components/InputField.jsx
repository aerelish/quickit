function InputField({ 
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder = '',
  required = false,
  className = ''
}) {
  return (
    <div className="py-2 md:w-full">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1 lg:text-2xl">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full px-0.5 py-2 border-b border-[var(--white)] focus:outline-none focus:border-[var(--accent-color)] lg:text-xl ${className}`}
      />
    </div>
  )
}

export default InputField;