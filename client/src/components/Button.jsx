function Button({ 
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
}) {

  const variants = {
    primary: 'bg-[var(--white)] text-black hover:bg-blue-700 hover:text-[var(--white)]',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  }

  return (
    <button
      className={`w-full my-2 px-4 py-2 rounded-sm font-medium transition-all duration-200 cursor-pointer focus:outline-none ${variants[variant]} lg:text-xl`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button