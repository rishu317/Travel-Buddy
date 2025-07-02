const TextInput = ({
    type,
    label,
    placeholder,
    className,
    value,
    setValue,
    labelClassName,
}) => {
    return (
        <div className={`textInputDiv flex flex-col w-full ${className}`}>
            <input
                type={type}
                placeholder={placeholder}
                className="p-3 border border-gray-400 rounded-full placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
};

export default TextInput;
