const TextInput = ({
  type,
  placeholder,
  className,
  value,
  setValue,
}) => {
  return (
    <div className={`flex flex-col w-full ${className}`}>
      <input
        type={type}
        placeholder={placeholder}
        className="p-2 text-sm border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default TextInput;
