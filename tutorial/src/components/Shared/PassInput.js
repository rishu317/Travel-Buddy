const PassInput = ({ label, placeholder, value, setValue }) => {
    return (
        <div className="textInputDiv flex flex-col w-full my-4">
            <input
                type="password"
                placeholder={placeholder}
                className="p-3 border border-gray-400 rounded-full placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
};

export default PassInput;
