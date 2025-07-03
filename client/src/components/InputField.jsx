function InputField({ 
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder = '',
  required = false,
}) {
  return (
    <div className="my-2">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1 lg:text-2xl">
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
        className="w-full px-0.5 py-2 border-b border-[var(--white)] focus:outline-none focus:border-[var(--accent-color)] lg:text-xl "
      />
    </div>
  )
}

export default InputField;