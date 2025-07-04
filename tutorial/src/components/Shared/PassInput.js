const PassInput = ({ placeholder, value, setValue }) => {
  return (
    <div className="flex flex-col w-full">
      <input
        type="password"
        placeholder={placeholder}
        className="p-2 text-sm border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default PassInput;
