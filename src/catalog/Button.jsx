export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`text-[#16161d] border-2 border-white bg-white py-3 px-6 mt-2 rounded-md font-medium whitespace-nowrap hover:bg-opacity-90 transition-colors focus:outline-none  focus:ring-offset-2 focus:ring-white hover:scale-105 cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}
